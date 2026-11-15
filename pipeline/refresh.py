#!/usr/bin/env python3
"""Find which guide entries a Neurotrauma-CS update touches, and optionally refresh them with Claude.

Usage:
  python3 pipeline/refresh.py <path-to-Neurotrauma-CS> --old <commit> [--new HEAD]
                              [--report report.md] [--ai] [--ai-limit 25]

The extraction (pipeline/extract.py) is deterministic and is simply rerun. The
hand-checked mechanics in pipeline/mechanics/*.json are not: each entry cites
the mod files and line ranges it was read from in its `source` field. This
script diffs the mod between --old and --new and marks an entry stale when a
changed hunk overlaps a cited range (or touches a cited file with no range).

With --ai and ANTHROPIC_API_KEY set, each stale entry (up to --ai-limit) is
sent to Claude with the diff of its cited files, and the returned entry is
written back into pipeline/mechanics/. Rerun extract.py afterwards so the site
data picks the new text up. Every AI-rewritten entry is listed in the report
for a human to check before merging.

The report (Markdown) is meant to be used as the body of the review PR.
"""
import argparse
import json
import os
import re
import subprocess
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
MECH = HERE / "mechanics"
# (file, list key, label used in the report)
SECTIONS = [
    ("afflictions_mechanics.json", "afflictions", "Affliction"),
    ("afflictions_mechanics.json", "systems", "System"),
    ("items_mechanics.json", "items", "Item"),
    ("items_mechanics.json", "surgeryProcedures", "Surgery"),
]
MAX_DIFF_CHARS = 60_000


def git(repo, *args):
    return subprocess.run(["git", "-C", str(repo), *args], capture_output=True, text=True,
                          check=True).stdout


# ------------------------------------------------------------------ diff side
def changed_hunks(repo, old, new):
    """{path: [(start, end), ...]} of line ranges in the OLD file that changed.

    Pure insertions are recorded as a 1-line range at the insertion point so a
    line added inside a cited block still counts. Added files map to [].
    """
    out = git(repo, "diff", "-U0", "--no-color", "--find-renames", f"{old}..{new}")
    hunks, path = {}, None
    for line in out.splitlines():
        if line.startswith("--- "):
            path = line[6:] if line.startswith("--- a/") else None
        elif line.startswith("+++ ") and path is None and line.startswith("+++ b/"):
            hunks.setdefault(line[6:], [])  # new file: nothing cited it yet
        elif line.startswith("@@") and path:
            m = re.match(r"@@ -(\d+)(?:,(\d+))? ", line)
            start, count = int(m.group(1)), int(m.group(2) or 1)
            hunks.setdefault(path, []).append((max(start, 1), start + max(count, 1) - 1))
    return hunks


# ---------------------------------------------------------------- source side
SEG = re.compile(r"^\s*(?P<path>[^:;()]+?\.(?:cs|xml|lua|json|txt|md))(?::(?P<ranges>[\d\s,\-]+))?")


def parse_source(src):
    """'A.cs:1-5, 9; B.xml' -> [('A.cs', [(1,5),(9,9)]), ('B.xml', [])]"""
    cites = []
    for seg in (src or "").split(";"):
        m = SEG.match(seg)
        if not m:
            continue
        ranges = []
        for r in (m.group("ranges") or "").split(","):
            nums = [int(n) for n in re.findall(r"\d+", r)]
            if nums:
                ranges.append((nums[0], nums[-1]))
        cites.append((m.group("path").strip(), ranges))
    return cites


def resolve(path, changed_paths):
    """Cited paths are sometimes bare file names ('Blood.xml'); match on suffix."""
    if path in changed_paths:
        return [path]
    return [p for p in changed_paths if p.endswith("/" + path)]


def overlaps(a, b):
    return a[0] <= b[1] and b[0] <= a[1]


def stale_entries(hunks):
    found = []
    for fname, key, label in SECTIONS:
        data = json.loads((MECH / fname).read_text())
        for entry in data.get(key, []):
            hits = set()
            for path, ranges in parse_source(entry.get("source")):
                for real in resolve(path, hunks):
                    if not ranges or not hunks[real] or \
                            any(overlaps(r, h) for r in ranges for h in hunks[real]):
                        hits.add(real)
            if hits:
                found.append({"file": fname, "key": key, "label": label,
                              "id": entry["id"], "files": sorted(hits)})
    return found


# --------------------------------------------------------------- data changes
def data_diff(old_dir, new_dir):
    """Ids added/removed/changed per data file between two site/data folders."""
    res = {}
    for name in ("afflictions.json", "items.json"):
        def load(d):
            p = Path(d) / name
            return {e["id"]: e for e in json.loads(p.read_text())} if p.exists() else {}
        a, b = load(old_dir), load(new_dir)
        res[name] = {
            "added": sorted(set(b) - set(a)),
            "removed": sorted(set(a) - set(b)),
            "changed": sorted(k for k in set(a) & set(b) if a[k] != b[k]),
        }
    return res


# ------------------------------------------------------------------- AI step
PROMPT = """You maintain the player guide for Neurotrauma, a medical mod for the game Barotrauma.
The guide entry below was written from the mod's source code at commit {old}. The mod has
since changed; the diff of the files this entry cites ({old}..{new}) follows.

Update the entry so it is correct for the new code:
- Keep every key and the same JSON shape. Change only what the diff makes wrong or incomplete.
- Keep the plain-English style for players; keep numbers exact and taken from the code.
- Update the line numbers in "source" so they point at the new code.
- If the diff does not affect what the entry says, return it unchanged.

Reply with the full updated entry as one JSON object in a ```json code block, then one
line starting "CHANGED:" that says what you changed, or "CHANGED: nothing".

<entry>
{entry}
</entry>

<diff>
{diff}
</diff>"""


def ai_refresh(repo, old, new, stale, limit):
    import anthropic  # only needed for this step

    client = anthropic.Anthropic()
    model = os.environ.get("NT_AI_MODEL", "claude-opus-5-5")
    files = {}
    done = []
    for s in stale[:limit]:
        data = files.setdefault(s["file"], json.loads((MECH / s["file"]).read_text()))
        entries = data[s["key"]]
        idx = next(i for i, e in enumerate(entries) if e["id"] == s["id"])
        diff = git(repo, "diff", "--no-color", f"{old}..{new}", "--", *s["files"])
        if len(diff) > MAX_DIFF_CHARS:
            done.append({**s, "result": f"skipped: diff too large ({len(diff)} chars), update by hand"})
            continue
        try:
            resp = client.beta.messages.create(
                model=model,
                max_tokens=16000,
                betas=["server-side-fallback-2026-07-01"],
                fallbacks="default",
                output_config={"effort": "medium"},
                messages=[{"role": "user", "content": PROMPT.format(
                    old=old[:10], new=new[:10], entry=json.dumps(entries[idx], indent=1, ensure_ascii=False),
                    diff=diff)}],
            )
        except anthropic.APIError as e:
            done.append({**s, "result": f"skipped: API error ({type(e).__name__})"})
            continue
        if resp.stop_reason != "end_turn":
            done.append({**s, "result": f"skipped: stop_reason {resp.stop_reason}"})
            continue
        text = "".join(b.text for b in resp.content if b.type == "text")
        m = re.search(r"```json\s*(\{.*?\})\s*```", text, re.S)
        note = (re.search(r"CHANGED:\s*(.+)", text) or [None, "?"])[1].strip()
        try:
            new_entry = json.loads(m.group(1)) if m else None
        except json.JSONDecodeError:
            new_entry = None
        if not isinstance(new_entry, dict) or new_entry.get("id") != s["id"] or \
                set(new_entry) != set(entries[idx]):
            done.append({**s, "result": "skipped: reply was not a same-shape entry"})
            continue
        if new_entry != entries[idx]:
            entries[idx] = new_entry
        done.append({**s, "result": "AI: " + note})
    for fname, data in files.items():
        (MECH / fname).write_text(json.dumps(data, indent=1, ensure_ascii=False) + "\n", encoding="utf-8")
    for s in stale[limit:]:
        done.append({**s, "result": f"not sent: over --ai-limit {limit}"})
    return done


# -------------------------------------------------------------------- report
def report(old, new, repo_url, stale, ai, ddiff, ai_state):
    lines = [f"Neurotrauma-CS moved from `{old[:10]}` to `{new[:10]}` "
             f"([compare]({repo_url}/compare/{old}...{new})).", ""]
    if ddiff:
        lines += ["## Extracted data", "",
                  "Rerun of `pipeline/extract.py` (XML, localization, code headers). Deterministic.", ""]
        for name, d in ddiff.items():
            parts = [f"{len(d[k])} {k}" for k in ("added", "removed", "changed")]
            lines.append(f"- `{name}`: " + ", ".join(parts))
            for k in ("added", "removed"):
                if d[k]:
                    lines.append(f"  - {k}: " + ", ".join(f"`{i}`" for i in d[k][:40]))
        lines.append("")
    lines += ["## Guide text that may be out of date", ""]
    if not stale:
        lines += ["No hand-checked guide entry cites a changed line. Nothing to review here.", ""]
    else:
        lines += [f"{len(stale)} entries in `pipeline/mechanics/` cite code that changed. {ai_state}", "",
                  "| Entry | Changed files it cites | Status |", "|---|---|---|"]
        status = {(a["key"], a["id"]): a["result"] for a in ai or []}
        for s in stale:
            st = status.get((s["key"], s["id"]), "needs a manual check")
            lines.append(f"| {s['label']} `{s['id']}` | {', '.join(f'`{f}`' for f in s['files'])} | "
                         f"{st.replace('|', '/')} |")
        lines.append("")
    lines += ["## Review checklist", "",
              "- [ ] Spot-check a few changed entries on the preview (`cd site && python3 -m http.server`).",
              "- [ ] Every stale entry above is either AI-updated and read by a person, or checked by hand.",
              "- [ ] `site/data/meta.json` points at the new mod commit.", ""]
    return "\n".join(lines)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("repo", type=Path)
    ap.add_argument("--old", required=True)
    ap.add_argument("--new", default="HEAD")
    ap.add_argument("--old-data", help="site/data folder before extraction, for the data summary")
    ap.add_argument("--new-data", default=str(HERE.parent / "site" / "data"))
    ap.add_argument("--report", type=Path)
    ap.add_argument("--ai", action="store_true", help="rewrite stale entries with Claude")
    ap.add_argument("--ai-limit", type=int, default=25)
    args = ap.parse_args()

    new = git(args.repo, "rev-parse", args.new).strip()
    old = git(args.repo, "rev-parse", args.old).strip()
    stale = stale_entries(changed_hunks(args.repo, old, new))
    print(f"{len(stale)} stale guide entries", file=sys.stderr)

    ai = None
    if args.ai and stale and os.environ.get("ANTHROPIC_API_KEY"):
        ai = ai_refresh(args.repo, old, new, stale, args.ai_limit)
        ai_state = "Claude proposed updates; read each one before merging."
    elif args.ai and stale:
        ai_state = "No `ANTHROPIC_API_KEY` secret is set, so none were rewritten."
    else:
        ai_state = "AI rewriting was off."

    ddiff = data_diff(args.old_data, args.new_data) if args.old_data else None
    md = report(old, new, "https://github.com/LukakoE00/Neurotrauma-CS", stale, ai, ddiff, ai_state)
    if args.report:
        args.report.write_text(md, encoding="utf-8")
    else:
        print(md)


if __name__ == "__main__":
    main()

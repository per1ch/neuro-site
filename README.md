# Neurotrauma Field Guide

An interactive player guide for the [Neurotrauma](https://github.com/LukakoE00/Neurotrauma-CS)
medical mod for Barotrauma.

| Folder | What |
|---|---|
| `site/` | The static site (no build step). See `site/README.md`. |
| `pipeline/` | `extract.py` turns the mod's source into `site/data/*.json`; `refresh.py` finds guide text an update made stale. |
| `.github/workflows/` | Publishing and the automatic data refresh. |

Run locally: `cd site && python3 -m http.server 8000`.

## Publishing

`.github/workflows/pages.yml` uploads `site/` to GitHub Pages on every push to the
default branch that touches `site/`, and on demand (Actions tab, "Deploy site to Pages",
"Run workflow"). It first checks that the JSON data parses.

## Keeping the data current

`.github/workflows/refresh-data.yml` runs daily at 05:17 UTC and on demand. When
Neurotrauma-CS has commits newer than `site/data/meta.json`'s `modCommit`, it:

1. reruns `pipeline/extract.py` against the new mod code (deterministic: XML,
   localization and code headers);
2. runs `pipeline/refresh.py`, which diffs the mod and marks every hand-checked guide
   entry in `pipeline/mechanics/` whose cited source lines changed;
3. if the `ANTHROPIC_API_KEY` secret exists, asks Claude (`claude-opus-5-5`, override
   with the `NT_AI_MODEL` env var) to update only those stale entries, at most 25 per
   run, then extracts again;
4. opens or updates one pull request on branch `data-refresh/neurotrauma-cs` whose
   description lists what changed and which entries need a person to read them.

Nothing merges automatically. Without the secret, step 3 is skipped and the PR lists
the stale entries for a manual check.

Try it by hand:

```sh
git clone https://github.com/LukakoE00/Neurotrauma-CS ../Neurotrauma-CS
python3 pipeline/extract.py ../Neurotrauma-CS
python3 pipeline/refresh.py ../Neurotrauma-CS --old <old commit>   # prints the report
```

## One-time repository setup

These are settings only the repository owner can change.

1. **Make a `main` branch.** The current default branch is a work branch
   (`claude/project-thread-an60sv`). Once the open site PRs are merged into it, create
   `main` from its tip (Code → branches → New branch), then Settings → General →
   Default branch → `main`. Open PRs that target the old branch can be retargeted from
   their "Edit" button. The workflows follow whatever the default branch is, so they
   need no change; scheduled runs only run from the default branch.
2. **Turn on Pages.** Settings → Pages → Build and deployment → Source: **GitHub Actions**.
   Then run "Deploy site to Pages" once from the Actions tab. The site appears at
   `https://per1ch.github.io/neuro-site/`. Pages on a private repository needs a paid
   GitHub plan; on the free plan the repository has to be public.
3. **Let Actions open PRs.** Settings → Actions → General → Workflow permissions:
   tick **Allow GitHub Actions to create and approve pull requests**.
4. **Optional: AI rewriting.** Settings → Secrets and variables → Actions → New
   repository secret, name `ANTHROPIC_API_KEY`, value an API key from
   console.anthropic.com. Each stale entry is one request; a typical mod update touches
   a handful of entries.

PRs opened by the refresh workflow use the built-in token, so they do not trigger other
workflows; the site deploys when you merge them.

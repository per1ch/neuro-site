// Full-text search over afflictions, items, lessons, surgery and systems,
// plus the Ctrl+K / "/" command palette.
import db from "./data.js";
import { esc, clean, icon, affHref, itemHref } from "./ui.js";
import { procId } from "./views/learn.js";

let index = null;

const norm = (s) => String(s ?? "").toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "");

function build() {
  index = [];
  for (const a of db.afflictions) index.push({
    type: "Afflictions", entry: a, href: affHref(a.id), name: a.name || a.id,
    sub: clean(a.description), text: [a.id, a.description, a.guide && Object.values(a.guide).join(" "), a.code?.effects, a.code?.causedBy].join(" "),
  });
  for (const i of db.items) index.push({
    type: "Items", entry: i, href: itemHref(i.id), name: i.name || i.id,
    sub: i.summary || clean(i.description), text: [i.id, i.description, i.summary, i.usage, (i.tags || []).join(" ")].join(" "),
  });
  for (const l of db.lessons) index.push({
    type: "Lessons", href: `#/learn/${encodeURIComponent(l.slug)}`, name: l.title || l.slug,
    sub: l.description || l.summary || "", text: [l.description, l.summary, l.section, l._text].join(" "),
  });
  for (const s of db.surgery) index.push({
    type: "Surgery", href: `#/surgery#${encodeURIComponent(procId(s))}`, name: s.name || procId(s), sub: s.goal || "", text: [s.notes, ...(s.steps || []).map((x) => x.action)].join(" "),
  });
  for (const s of db.systems) index.push({
    type: "How it works", href: `#/systems#${encodeURIComponent(s.id)}`, name: s.title || s.id, sub: "", text: s.explanation,
  });
  for (const r of index) { r._n = norm(r.name); r._t = norm(r.text + " " + r.sub); }
}

function subseq(q, s) {
  let i = 0;
  for (const c of s) if (c === q[i]) i++;
  return i === q.length;
}

export function search(query, limit = 40) {
  if (!index) build();
  const q = norm(query).trim();
  if (!q) return [];
  const terms = q.split(/\s+/);
  const out = [];
  for (const r of index) {
    let score = 0;
    if (r._n === q) score = 100;
    else if (r._n.startsWith(q)) score = 80;
    else if (r._n.split(/[\s\-()]+/).some((w) => w.startsWith(q))) score = 65;
    else if (r._n.includes(q)) score = 50;
    else if (terms.every((t) => r._n.includes(t) || r._t.includes(t))) score = 25 + terms.filter((t) => r._n.includes(t)).length * 5;
    else if (q.length > 2 && subseq(q, r._n)) score = 12;
    if (score) out.push({ r, score: score + (r.type === "Afflictions" ? 1 : 0) });
  }
  return out.sort((a, b) => b.score - a.score || a.r.name.localeCompare(b.r.name)).slice(0, limit).map((x) => x.r);
}

export function invalidate() { index = null; }

export function highlight(text, query) {
  const t = esc(text);
  const q = query.trim();
  if (!q) return t;
  const re = new RegExp("(" + q.split(/\s+/).map((w) => esc(w).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|") + ")", "ig");
  return t.replace(re, "<mark>$1</mark>");
}

// ---------- palette ----------
let open = false;

export function openPalette(initial = "") {
  if (open) return;
  open = true;
  const prevFocus = document.activeElement;
  const back = document.createElement("div");
  back.className = "palette-backdrop";
  back.innerHTML = `
    <div class="palette" role="dialog" aria-modal="true" aria-label="Search the guide">
      <div class="palette-input">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
        <input type="search" placeholder="Search injuries, items, lessons…" aria-label="Search" role="combobox" aria-expanded="true" aria-controls="palette-results" autocomplete="off" spellcheck="false">
        <kbd>Esc</kbd>
      </div>
      <div class="palette-results" id="palette-results" role="listbox"></div>
      <div class="palette-foot"><span><kbd>↑</kbd> <kbd>↓</kbd> move</span><span><kbd>Enter</kbd> open</span><span><kbd>Esc</kbd> close</span></div>
    </div>`;
  document.body.appendChild(back);
  const input = back.querySelector("input");
  const list = back.querySelector(".palette-results");
  let results = [];
  let sel = 0;

  const close = () => { open = false; back.remove(); prevFocus?.focus?.(); };
  const go = (r) => { close(); location.hash = r.href; };

  function render() {
    const q = input.value;
    results = q.trim() ? search(q) : defaults();
    sel = Math.min(sel, Math.max(results.length - 1, 0));
    if (!results.length) { list.innerHTML = `<div class="empty">Nothing matches “${esc(q)}”.</div>`; return; }
    let html = "", group = "";
    results.forEach((r, i) => {
      if (r.type !== group) { group = r.type; html += `<div class="palette-group">${esc(group)}</div>`; }
      html += `<a class="list-row" role="option" id="pr-${i}" data-i="${i}" href="${r.href}" aria-selected="${i === sel}">
        ${r.entry ? icon(r.entry, 32) : `<span class="icon ph" style="--s:32px">${esc(r.name[0])}</span>`}
        <span class="grow"><span class="title">${highlight(r.name, q)}</span><span class="sub">${esc(r.sub || "")}</span></span></a>`;
    });
    list.innerHTML = html;
    input.setAttribute("aria-activedescendant", `pr-${sel}`);
  }
  function defaults() {
    if (!index) build();
    const pick = ["arterialcut", "cardiacarrest", "pneumothorax", "fracturedextremity", "tourniquet", "healthscanner"];
    const quick = index.filter((r) => r.entry && pick.includes(r.entry.id));
    return quick.length ? quick : index.slice(0, 8);
  }
  function move(d) {
    if (!results.length) return;
    sel = (sel + d + results.length) % results.length;
    list.querySelectorAll("[aria-selected]").forEach((el) => el.setAttribute("aria-selected", String(+el.dataset.i === sel)));
    list.querySelector(`#pr-${sel}`)?.scrollIntoView({ block: "nearest" });
    input.setAttribute("aria-activedescendant", `pr-${sel}`);
  }

  input.addEventListener("input", () => { sel = 0; render(); });
  input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); move(1); }
    else if (e.key === "ArrowUp") { e.preventDefault(); move(-1); }
    else if (e.key === "Enter" && results[sel]) { e.preventDefault(); go(results[sel]); }
  });
  back.addEventListener("keydown", (e) => { if (e.key === "Escape") { e.preventDefault(); close(); } });
  back.addEventListener("mousedown", (e) => { if (e.target === back) close(); });
  list.addEventListener("click", (e) => { const a = e.target.closest("a"); if (a) { e.preventDefault(); go(results[+a.dataset.i]); } });
  input.value = initial;
  render();
  input.focus();
}

export function bindPaletteKeys() {
  document.addEventListener("keydown", (e) => {
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName) || document.activeElement?.isContentEditable;
    if ((e.key === "k" && (e.ctrlKey || e.metaKey)) || (e.key === "/" && !typing)) {
      e.preventDefault();
      openPalette();
    }
  });
}

// Lessons (Markdown from site/content/lessons/), plus "How it works" systems and surgery procedures.
import db, { lessonText } from "../data.js";
import { esc, paras, refChip, setTitle } from "../ui.js";
import { parseFrontmatter, renderMarkdown } from "../lib/markdown.js";
import { notFound } from "./library.js";

const SECTIONS = { "getting-started": "Getting started", mechanics: "Mechanics", emergencies: "Emergencies", tips: "Tips & tricks" };

export async function lessonList(el) {
  setTitle("Lessons");
  // Pull front matter for lessons whose index entry lacks a title.
  await Promise.all(db.lessons.filter((l) => !l.title).map(async (l) => {
    try { Object.assign(l, parseFrontmatter(await lessonText(l)).data, { slug: l.slug, url: l.url }); } catch { /* listed without metadata */ }
  }));
  const groups = new Map();
  for (const l of db.lessons) {
    const s = l.section || "lessons";
    if (!groups.has(s)) groups.set(s, []);
    groups.get(s).push(l);
  }
  el.innerHTML = `
    <div class="eyebrow">Learn</div><h1>Lessons</h1>
    <p class="lead">Start at the top. Each lesson builds on the last, and every injury or item name links to its page.</p>
    ${db.lessons.length ? [...groups].map(([s, ls]) => `
      <div class="section-head"><h2>${esc(SECTIONS[s] || (s === "lessons" ? "All lessons" : s))}</h2></div>
      <div class="grid grid-2">${ls.map((l) => `
        <a class="card" href="#/learn/${encodeURIComponent(l.slug)}">
          <div class="eyebrow">Lesson ${esc(l.order)}${l.readingTime ? ` · ${esc(l.readingTime)} min` : ""}</div>
          <h3>${esc(l.title || l.slug)}</h3>
          <p class="dim" style="margin:0;font-size:.92rem">${esc(l.description || l.summary || "")}</p>
          ${l.difficulty || l.level ? `<div style="margin-top:10px"><span class="tag">${esc(l.difficulty || l.level)}</span></div>` : ""}
        </a>`).join("")}</div>`).join("") : `<div class="empty">Lessons are on their way.</div>`}`;
}

export async function lesson(el, slug) {
  const l = db.lessonBySlug.get(slug);
  if (!l) return notFound(el, "lesson", slug);
  el.innerHTML = `<div class="empty">Loading…</div>`;
  let text;
  try { text = await lessonText(l); } catch { el.innerHTML = `<div class="empty">Couldn't load this lesson.</div>`; return; }
  const { data, body } = parseFrontmatter(text);
  Object.assign(l, data, { slug: l.slug, url: l.url });
  setTitle(data.title || slug);
  const i = db.lessons.indexOf(l);
  const prev = db.lessons[i - 1], next = db.lessons[i + 1];
  const hasH1 = /^#\s/m.test(body);
  el.innerHTML = `
    <a href="#/learn" class="faint" style="font-size:.85rem">← Lessons</a>
    <article class="prose" style="margin-top:12px">
      <div class="eyebrow">Lesson ${esc(l.order)}${data.readingTime ? ` · ${esc(data.readingTime)} min read` : ""}${data.difficulty || data.level ? ` · ${esc(data.difficulty || data.level)}` : ""}</div>
      ${hasH1 ? "" : `<h1>${esc(data.title || slug)}</h1>`}
      ${renderMarkdown(body)}
    </article>
    <nav class="lesson-nav" aria-label="Lesson navigation">
      ${prev ? `<a class="btn" href="#/learn/${encodeURIComponent(prev.slug)}">← ${esc(prev.title || prev.slug)}</a>` : "<span></span>"}
      ${next ? `<a class="btn btn-primary" href="#/learn/${encodeURIComponent(next.slug)}">${esc(next.title || next.slug)} →</a>` : ""}
    </nav>`;
}

export function systems(el) {
  setTitle("How it works");
  el.innerHTML = `
    <div class="eyebrow">Under the hood</div><h1>How it works</h1>
    <p class="lead">The body systems Neurotrauma simulates, and the numbers that matter.</p>
    ${db.systems.length ? `<div class="grid" style="margin-top:20px">${db.systems.map((s) => `
      <section class="card" id="${esc(s.id)}">
        <h2 style="margin-top:0">${esc(s.title || s.id)}</h2>
        ${paras(s.explanation)}
        ${(s.keyNumbers || []).length ? `<dl class="kv">${s.keyNumbers.map((k) => `<dt>${esc(k.label)}</dt><dd class="mono">${esc(k.value)}</dd>`).join("")}</dl>` : ""}
      </section>`).join("")}</div>` : `<div class="empty" style="margin-top:20px">The systems write-ups are still being generated.</div>`}`;
  scrollToFragment();
}

export function surgery(el) {
  setTitle("Surgery");
  el.innerHTML = `
    <div class="eyebrow">Procedures</div><h1>Surgery</h1>
    <p class="lead">Step-by-step procedures. Follow the order: the mod checks for each prior step.</p>
    ${db.surgery.length ? `<div class="grid" style="margin-top:20px">${db.surgery.map((s) => `
      <section class="card" id="${esc(s.id)}">
        <h2 style="margin-top:0">${esc(s.name || s.id)}</h2>
        ${s.goal ? `<p class="dim">${esc(s.goal)}</p>` : ""}
        <ol class="treatment-steps">${(s.steps || []).map((st) => `<li>${esc(st.action || "")} ${st.item ? refChip(st.item, "item") : ""}${st.requires ? `<div class="faint" style="font-size:.85rem">Requires: ${esc(Array.isArray(st.requires) ? st.requires.join(", ") : st.requires)}</div>` : ""}</li>`).join("")}</ol>
        ${s.notes ? `<div style="margin-top:12px" class="dim">${paras(s.notes)}</div>` : ""}
      </section>`).join("")}</div>` : `<div class="empty" style="margin-top:20px">Surgery procedures are still being generated.</div>`}`;
  scrollToFragment();
}

function scrollToFragment() {
  const frag = location.hash.split("#")[2];
  if (frag) requestAnimationFrame(() => document.getElementById(decodeURIComponent(frag))?.scrollIntoView({ behavior: "smooth" }));
}

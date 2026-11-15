import db from "../data.js";
import { esc, affRow, setTitle } from "../ui.js";
import { ICONS } from "../icons.js";

export function home(el) {
  setTitle("");
  const lethal = db.afflictions.filter((a) => a.danger === "lethal").slice(0, 6);
  const featured = lethal.length ? lethal : db.afflictions.filter((a) => a.kind === "condition").slice(0, 6);
  const firstLesson = db.lessons[0];
  el.innerHTML = `
  <section class="hero">
    <div class="eyebrow">Barotrauma · Neurotrauma medical mod</div>
    <h1>Keep your crew <em>alive</em> down there.</h1>
    <p class="lead">An interactive field guide to every injury, symptom, drug and surgical tool in Neurotrauma. Click the body, read the symptoms, follow the treatment.</p>
    <div class="actions">
      ${firstLesson ? `<a class="btn btn-primary" href="#/learn/${encodeURIComponent(firstLesson.slug)}">Start learning</a>` : `<a class="btn btn-primary" href="#/learn">Start learning</a>`}
      <a class="btn" href="#/checker">${ICONS.pulse} Symptom checker</a>
      <a class="btn btn-ghost" href="#/body">${ICONS.body} Body map</a>
    </div>
    <div class="stats">
      <div class="stat"><b>${db.afflictions.length}</b><span>Afflictions</span></div>
      <div class="stat"><b>${db.items.length}</b><span>Items</span></div>
      <div class="stat"><b>${db.lessons.length}</b><span>Lessons</span></div>
    </div>
    <svg class="ecg" viewBox="0 0 600 120" aria-hidden="true"><path d="M0 70 H180 l14 -6 10 6 H250 l10 -50 14 90 12 -60 8 20 H360 l12 -8 12 8 H600"/></svg>
  </section>

  <div class="grid grid-3" style="margin-top:22px">
    ${feature("#/body", ICONS.body, "Body map", "Click a body part to see what can go wrong there and how bad it is.")}
    ${feature("#/checker", ICONS.pulse, "Symptom checker", "Pick what you see on the patient. Get likely causes and the treatment steps.")}
    ${feature("#/afflictions", ICONS.virus, "Afflictions", "Every condition, symptom and status the mod adds, with causes and cures.")}
    ${feature("#/items", ICONS.kit, "Items & tools", "Bandages to bone saws. What each one treats and how to use it.")}
    ${feature("#/learn", ICONS.book, "Lessons", "Step-by-step lessons from your first bandage to open-heart surgery.")}
    ${feature("#/systems", ICONS.cog, "How it works", "Blood pressure, oxygen, blood types: the systems under the hood.")}
  </div>

  <div class="section-head"><h2>Know these first</h2><a href="#/afflictions">All afflictions →</a></div>
  <div class="card" style="padding:8px">${featured.map((a) => affRow(a)).join("") || `<div class="empty">No data yet.</div>`}</div>
  <p class="faint" style="margin-top:24px;font-size:.85rem">Press <kbd>/</kbd> or <kbd>Ctrl</kbd> <kbd>K</kbd> anywhere to search.</p>`;
}

const feature = (href, ic, title, text) => `<a class="card feature" href="${href}"><div class="feature-icon">${ic}</div><h3>${esc(title)}</h3><p>${esc(text)}</p></a>`;

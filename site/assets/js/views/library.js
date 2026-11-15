// Affliction and item browsers plus their detail pages.
import db, { KIND_LABELS, DANGER_ORDER, BODY_PARTS, dangerRank } from "../data.js";
import { esc, clean, paras, icon, dangerBadge, kindTag, refChip, affRow, itemRow, miniBody, sourceLink, setTitle, itemHref } from "../ui.js";

// ---------- lists ----------
export function afflictionList(el, params) {
  setTitle("Afflictions");
  const kinds = count(db.afflictions, (a) => a.kind);
  const dangers = DANGER_ORDER.filter((d) => db.afflictions.some((a) => a.danger === d));
  el.innerHTML = `
    <div class="eyebrow">Library</div><h1>Afflictions</h1>
    <p class="lead">Every condition, symptom and status effect Neurotrauma can put on a character.</p>
    <div class="filters">
      <input class="input" id="q" type="search" placeholder="Filter by name…" style="flex:1;min-width:180px;max-width:320px" aria-label="Filter by name" value="${esc(params.get("q") || "")}">
      <select class="input" id="kind" aria-label="Type"><option value="">All types</option>${kinds.map(([k, n]) => `<option value="${esc(k)}">${esc(KIND_LABELS[k] || k)} (${n})</option>`).join("")}</select>
      ${dangers.length ? `<select class="input" id="danger" aria-label="Danger"><option value="">Any danger</option>${dangers.map((d) => `<option value="${d}">${d}</option>`).join("")}</select>` : ""}
      <select class="input" id="part" aria-label="Body part"><option value="">Any body part</option>${BODY_PARTS.map((p) => `<option value="${p.id}">${p.label}</option>`).join("")}<option value="systemic">Whole body</option></select>
      <span class="faint" id="n"></span>
    </div>
    <div class="card" style="padding:8px" id="list"></div>`;
  const $ = (s) => el.querySelector(s);
  if (params.get("kind")) $("#kind").value = params.get("kind");
  const run = () => {
    const q = $("#q").value.toLowerCase().trim(), k = $("#kind").value, d = $("#danger")?.value, p = $("#part").value;
    const res = db.afflictions.filter((a) =>
      (!q || (a.name || "").toLowerCase().includes(q) || a.id.includes(q)) && (!k || a.kind === k) && (!d || a.danger === d) &&
      (!p || (p === "systemic" ? !(a.bodyParts || []).length : (a.bodyParts || []).some((x) => x === p || x === "any"))));
    $("#n").textContent = `${res.length} shown`;
    $("#list").innerHTML = res.map((a) => affRow(a)).join("") || `<div class="empty">No matches.</div>`;
  };
  el.querySelectorAll("input,select").forEach((i) => i.addEventListener("input", run));
  run();
}

export function itemList(el, params) {
  setTitle("Items");
  const cats = count(db.items, (i) => i.category);
  el.innerHTML = `
    <div class="eyebrow">Library</div><h1>Items &amp; tools</h1>
    <p class="lead">Medicine, surgical instruments and equipment, with what each one treats.</p>
    <div class="filters">
      <input class="input" id="q" type="search" placeholder="Filter by name…" style="flex:1;min-width:180px;max-width:320px" aria-label="Filter by name">
      <div class="chip-row" id="cats"><button class="chip" style="padding-left:12px" data-c="" aria-pressed="true">All</button>
      ${cats.map(([c, n]) => `<button class="chip" style="padding-left:12px" data-c="${esc(c)}" aria-pressed="false">${esc(c)} <span class="faint mono">${n}</span></button>`).join("")}</div>
    </div>
    <div class="grid grid-2" id="list"></div>`;
  let cat = params.get("cat") || "";
  const $ = (s) => el.querySelector(s);
  const run = () => {
    const q = $("#q").value.toLowerCase().trim();
    $("#cats").querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.c === cat)));
    const res = db.items.filter((i) => (!cat || i.category === cat) && (!q || (i.name || "").toLowerCase().includes(q) || i.id.includes(q)));
    $("#list").innerHTML = res.map((i) => `<div class="card" style="padding:6px">${itemRow(i, i.treats?.length ? `Treats ${i.treats.length} · ${i.summary || clean(i.description)}` : undefined)}</div>`).join("") || `<div class="empty">No matches.</div>`;
  };
  $("#q").addEventListener("input", run);
  $("#cats").addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) { cat = b.dataset.c; run(); } });
  run();
}

// ---------- detail: affliction ----------
export function afflictionDetail(el, id) {
  const a = db.aff.get(id);
  if (!a) return notFound(el, "affliction", id);
  setTitle(a.name);
  const g = a.guide || {};
  const treats = [...(a._treatedBy || [])];
  const causedByItems = [...(a._causedByItems || [])];
  const causes = (a.causes || []);
  const parts = a.bodyParts || [];
  const partLabel = !parts.length ? "Whole body" : parts.includes("any") ? "Any limb or body part" : parts.map((p) => BODY_PARTS.find((b) => b.id === p)?.label || p).join(", ");
  const thresholds = (g.thresholds || []).filter((t) => t && t.value != null);
  const max = a.maxStrength || 100;
  const related = [...new Set([...(a._symptomOf || [])])];

  el.innerHTML = `
    <a href="#/afflictions" class="faint" style="font-size:.85rem">← Afflictions</a>
    <div class="detail-head" style="margin-top:10px">${icon(a, 88, "icon-lg")}
      <div><div class="eyebrow">${esc(KIND_LABELS[a.kind] || a.kind || "Affliction")}</div><h1>${esc(a.name || a.id)}</h1>
      <div class="detail-meta">${dangerBadge(a)}${a.limbSpecific ? `<span class="tag">Limb specific</span>` : ""}${a.isBuff ? `<span class="tag">Buff</span>` : ""}${a.causeOfDeath ? `<span class="badge d-lethal">Can kill</span>` : ""}</div></div>
    </div>
    <div class="detail-grid">
      <div>
        ${a.description ? `<div class="lead">${paras(a.description)}</div>` : `<p class="faint">The mod has no in-game description for this one.</p>`}
        ${guide("How you get it", g.howYouGetIt || a.code?.causedBy)}
        ${guide("What it does", g.whatItDoes || a.code?.effects)}
        ${guide("How to treat it", g.treatment)}
        ${guide("Natural recovery", g.naturalRecovery)}
        ${thresholds.length ? `<h2>Severity</h2>
          <div class="thresholds" role="img" aria-label="Severity thresholds">${thresholds.map((t) => `<div class="threshold" style="left:${Math.min(100, (t.value / max) * 100)}%"><span>${esc(t.value)}</span></div>`).join("")}</div>
          <ul class="threshold-list">${thresholds.map((t) => `<li><b>${esc(t.value)}+</b>${esc(t.meaning)}</li>`).join("")}</ul>` : ""}
        ${treats.length ? `<h2>Treated with</h2><div class="grid grid-2">${treats.map(([iid, note]) => { const it = db.item.get(iid); return it ? `<div class="card" style="padding:6px">${itemRow(it, note || it.summary || undefined)}</div>` : refChip(iid); }).join("")}</div>` : ""}
        ${(a.symptoms || []).length ? `<h2>Symptoms</h2><div class="chip-row">${a.symptoms.map((s) => refChip(s)).join("")}</div>` : ""}
        ${related.length ? `<h2>Symptom of</h2><div class="chip-row">${related.map((s) => refChip(s)).join("")}</div>` : ""}
        ${(a.leadsTo || []).length ? `<h2>Can lead to</h2><div class="chip-row">${a.leadsTo.map((s) => refChip(s)).join("")}</div>` : ""}
        ${causes.length || causedByItems.length ? `<h2>Causes</h2><div class="chip-row">
          ${causes.map((c) => c.id ? refChip(c.id, c.type === "item" ? "item" : undefined) : "").join("")}
          ${causedByItems.map((i) => refChip(i, "item")).join("")}</div>
          ${causes.filter((c) => !c.id && c.text).map((c) => `<p class="dim" style="margin-top:10px">${esc(clean(c.text))}</p>`).join("")}` : ""}
        ${(a.code?.notes || []).length ? `<h2>Notes</h2><ul>${a.code.notes.map((n) => `<li>${esc(n)}</li>`).join("")}</ul>` : ""}
        ${a.symptoms?.length ? `<p style="margin-top:24px"><a class="btn" href="#/checker?s=${a.symptoms.map(encodeURIComponent).join(",")}&step=2">Check these symptoms →</a></p>` : ""}
      </div>
      <aside class="detail-side">
        <div class="card" style="display:flex;gap:14px;align-items:center">${miniBody(parts.length ? parts : [])}
          <div><div class="faint" style="font-size:.78rem">Where</div><div>${esc(partLabel)}</div></div></div>
        <div class="card"><dl class="kv">
          <dt>ID</dt><dd class="mono">${esc(a.id)}</dd>
          ${a.category ? `<dt>Category</dt><dd>${esc(a.category)}</dd>` : ""}
          <dt>Max strength</dt><dd>${esc(a.maxStrength ?? "–")}</dd>
          ${a.detectedBy?.length ? `<dt>Detected by</dt><dd>${a.detectedBy.map((d) => db.item.has(d) ? `<a href="${itemHref(d)}">${esc(db.item.get(d).name)}</a>` : esc(d)).join(", ")}</dd>` : ""}
          ${a.showInScannerThreshold != null && a.showInScannerThreshold < 999 ? `<dt>Scanner shows at</dt><dd>${esc(a.showInScannerThreshold)}</dd>` : ""}
          ${a.causeOfDeath ? `<dt>Cause of death</dt><dd>${esc(typeof a.causeOfDeath === "string" ? a.causeOfDeath : "yes")}</dd>` : ""}
        </dl></div>
        ${a.source ? `<div class="faint" style="font-size:.8rem">Source: ${sourceLink(a.source) || esc(a.source)}</div>` : ""}
      </aside>
    </div>`;
}

// ---------- detail: item ----------
export function itemDetail(el, id) {
  const it = db.item.get(id);
  if (!it) return notFound(el, "item", id);
  setTitle(it.name);
  const tDetail = new Map((it.treatsDetail || []).map((d) => [d.affliction || d.id, d]));
  const cDetail = new Map((it.causesDetail || []).map((d) => [d.affliction || d.id, d]));
  const skill = it.skill || (it.skillHint ? { skill: it.skillHint.skill, required: it.skillHint.level } : null);
  const fab = it.fabricate;

  el.innerHTML = `
    <a href="#/items" class="faint" style="font-size:.85rem">← Items</a>
    <div class="detail-head" style="margin-top:10px">${icon(it, 88, "icon-lg")}
      <div><div class="eyebrow">${esc(it.category || "Item")}</div><h1>${esc(it.name || it.id)}</h1>
      <div class="detail-meta">${(it.tags || []).slice(0, 4).map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div></div>
    </div>
    <div class="detail-grid">
      <div>
        ${it.summary ? `<p class="lead">${esc(it.summary)}</p>` : ""}
        ${it.description ? paras(it.description) : ""}
        ${guide("How to use it", it.usage)}
        ${guide("If you fail the skill check", it.onFailure)}
        ${(it.treats || []).length ? `<h2>Treats</h2><div class="card" style="padding:8px">${it.treats.map((a) => db.aff.get(a) ? affRow(db.aff.get(a), amount(tDetail.get(a))) : "").join("")}</div>` : ""}
        ${(it.causes || []).length ? `<h2>Causes</h2><div class="card" style="padding:8px">${it.causes.map((a) => db.aff.get(a) ? affRow(db.aff.get(a), amount(cDetail.get(a))) : "").join("")}</div>` : ""}
        ${fab?.ingredients?.length ? `<h2>Crafting</h2><div class="card"><div class="chip-row">${fab.ingredients.map((g) => `${refChip(g.item, "item")}<span class="faint">×${esc(g.amount ?? 1)}</span>`).join(" ")}</div>
          <p class="faint" style="margin:10px 0 0;font-size:.85rem">${esc(fab.fabricator || "fabricator")}${fab.amount ? ` · makes ${esc(fab.amount)}` : ""}${(fab.skills || []).map((s) => ` · ${esc(s.skill)} ${esc(s.level)}`).join("")}</p></div>` : ""}
      </div>
      <aside class="detail-side">
        <div class="card"><dl class="kv">
          <dt>ID</dt><dd class="mono">${esc(it.id)}</dd>
          ${skill ? `<dt>Skill</dt><dd>${esc(skill.skill)} ${esc(skill.required ?? "")}${skill.notes ? `<div class="faint">${esc(skill.notes)}</div>` : ""}</dd>` : ""}
          ${it.price != null ? `<dt>Price</dt><dd>${esc(it.price)} mk</dd>` : ""}
          ${it.gameCategory ? `<dt>Store tab</dt><dd>${esc(it.gameCategory)}</dd>` : ""}
          ${it.useInHealthInterface != null ? `<dt>Health UI</dt><dd>${it.useInHealthInterface ? "Usable" : "No"}</dd>` : ""}
        </dl></div>
        ${it.source ? `<div class="faint" style="font-size:.8rem">Source: ${sourceLink(it.source) || esc(it.source)}</div>` : ""}
      </aside>
    </div>`;
}

function amount(d) {
  if (!d) return undefined;
  const bits = [];
  if (d.amount != null) bits.push(`${d.amount > 0 ? "+" : ""}${d.amount}`);
  if (d.notes) bits.push(d.notes);
  return bits.join(" · ") || undefined;
}
const guide = (title, text) => text ? `<div class="guide-block"><h3>${esc(title)}</h3>${paras(text)}</div>` : "";
function count(list, key) {
  const m = new Map();
  for (const x of list) { const k = key(x); if (k) m.set(k, (m.get(k) || 0) + 1); }
  return [...m].sort((a, b) => b[1] - a[1]);
}
export function notFound(el, what, id) {
  setTitle("Not found");
  el.innerHTML = `<div class="empty"><h2>No ${esc(what)} called “${esc(id)}”</h2><p>It may have been renamed in the mod. <a href="#/">Go home</a> or press <kbd>/</kbd> to search.</p></div>`;
}

// Symptom → diagnosis → treatment flow. State lives in the URL so results are shareable:
// #/checker?s=cough,fever&dx=pneumothorax
import db, { symptoms, diagnose } from "../data.js";
import { esc, clean, icon, dangerBadge, refChip, affHref, itemHref, setTitle, paras } from "../ui.js";

export function checker(el, params) {
  setTitle("Symptom checker");
  const chosen = (params.get("s") || "").split(",").filter((id) => db.aff.has(id));
  const dx = db.aff.has(params.get("dx")) ? params.get("dx") : null;
  const step = dx ? 3 : chosen.length && params.get("step") === "2" ? 2 : 1;
  const all = symptoms().sort((a, b) => a.name.localeCompare(b.name));
  const results = diagnose(chosen);

  const url = (s, d, st) => {
    const p = new URLSearchParams();
    if (s.length) p.set("s", s.join(","));
    if (d) p.set("dx", d);
    if (st) p.set("step", st);
    const q = p.toString();
    return `#/checker${q ? "?" + q : ""}`;
  };

  el.innerHTML = `
  <div class="eyebrow">Symptom checker</div>
  <h1>What's wrong with them?</h1>
  <p class="lead">Tick what you can see or what the health scanner shows. We'll rank the likely causes and walk you through treatment.</p>
  <nav class="stepper" aria-label="Steps">
    ${stepBtn(1, "Symptoms", step, url(chosen, null))}
    ${stepBtn(2, "Diagnosis", step, chosen.length ? url(chosen, null, "2") : null)}
    ${stepBtn(3, "Treatment", step, dx ? url(chosen, dx) : null)}
  </nav>
  <div id="checker-body"></div>`;
  const body = el.querySelector("#checker-body");

  if (step === 1) {
    body.innerHTML = `
      <div class="filters"><input class="input" id="sym-filter" type="search" placeholder="Filter symptoms…" style="flex:1;max-width:320px" aria-label="Filter symptoms">
      <span class="faint" id="sym-count">${chosen.length} selected</span></div>
      <div class="chip-row" id="sym-chips">
        ${all.map((s) => `<button class="chip" data-id="${esc(s.id)}" aria-pressed="${chosen.includes(s.id)}" title="${esc(clean(s.description))}">${icon(s, 24, "icon-sm")}${esc(s.name)}</button>`).join("") || `<div class="empty">No symptoms in the data yet.</div>`}
      </div>
      <div style="display:flex;gap:10px;margin-top:22px;align-items:center;flex-wrap:wrap">
        <a class="btn btn-primary" id="to-dx" href="${url(chosen, null, "2")}" ${chosen.length ? "" : 'aria-disabled="true" style="opacity:.4;pointer-events:none"'}>See likely causes →</a>
        ${chosen.length ? `<a class="btn btn-ghost" href="#/checker">Clear</a>` : ""}
        <span class="faint" id="live-hint">${chosen.length ? `${results.length} possible causes` : "Pick at least one symptom"}</span>
      </div>`;
    const sel = new Set(chosen);
    body.querySelector("#sym-chips").addEventListener("click", (e) => {
      const b = e.target.closest("button[data-id]");
      if (!b) return;
      sel.has(b.dataset.id) ? sel.delete(b.dataset.id) : sel.add(b.dataset.id);
      // Replace the hash without adding history entries for each tick.
      history.replaceState(null, "", url([...sel], null));
      checker(el, new URLSearchParams(location.hash.split("?")[1] || ""));
      el.querySelector(`button[data-id="${CSS.escape(b.dataset.id)}"]`)?.focus();
    });
    const f = body.querySelector("#sym-filter");
    f.addEventListener("input", () => {
      const q = f.value.toLowerCase();
      body.querySelectorAll("#sym-chips .chip").forEach((c) => { c.hidden = q && !c.textContent.toLowerCase().includes(q); });
    });
    return;
  }

  if (step === 2) {
    const top = results.slice(0, 12);
    const max = top[0]?.score || 1;
    body.innerHTML = `
      <p class="dim">Based on: ${chosen.map((id) => refChip(id)).join(" ")}</p>
      ${top.length ? `<div class="grid grid-2">${top.map((r) => `
        <a class="card" href="${url(chosen, r.a.id)}">
          <div style="display:flex;gap:12px;align-items:center">${icon(r.a, 44)}
            <div style="flex:1;min-width:0"><b>${esc(r.a.name)}</b><div class="faint" style="font-size:.82rem">matches ${r.hits} of ${chosen.length} symptoms</div></div>
            ${dangerBadge(r.a)}</div>
          <div class="match-bar"><i style="width:${Math.round((r.score / max) * 100)}%"></i></div>
          ${r.missing.length ? `<div class="faint" style="font-size:.8rem;margin-top:8px">Also check for: ${r.missing.slice(0, 4).map((id) => esc(db.aff.get(id)?.name || id)).join(", ")}</div>` : ""}
        </a>`).join("")}</div>` : `<div class="empty">No condition in the data lists these symptoms together. Try fewer symptoms.</div>`}
      <p class="faint" style="font-size:.82rem;margin-top:18px">Ranking counts how many of your symptoms each condition produces in the mod's data. It is a starting point, so confirm with a health scanner.</p>`;
    return;
  }

  const a = db.aff.get(dx);
  const treats = [...(a._treatedBy || new Map())];
  const g = a.guide || {};
  const steps = [];
  if (g.treatment) steps.push(`<li>${esc(clean(g.treatment))}</li>`);
  for (const [id, note] of treats) {
    const it = db.item.get(id);
    steps.push(`<li><a href="${itemHref(id)}"><b>${esc(it?.name || id)}</b></a>${note ? ` <span class="faint">(${esc(note)})</span>` : ""}${it?.summary ? `<div class="dim" style="font-size:.9rem">${esc(it.summary)}</div>` : ""}</li>`);
  }
  body.innerHTML = `
    <div class="card">
      <div class="detail-head">${icon(a, 64)}<div><h2 style="margin:0">${esc(a.name)}</h2><div class="detail-meta">${dangerBadge(a)}</div></div></div>
      <div style="margin-top:12px">${paras(a.description)}</div>
    </div>
    <h2>Treatment</h2>
    ${steps.length ? `<ol class="treatment-steps">${steps.join("")}</ol>` : `<div class="empty">No treatment recorded yet for this affliction.</div>`}
    ${g.naturalRecovery ? `<h3 style="margin-top:20px">If left alone</h3>${paras(g.naturalRecovery)}` : ""}
    <div style="display:flex;gap:10px;margin-top:24px;flex-wrap:wrap">
      <a class="btn btn-primary" href="${affHref(a.id)}">Full details</a>
      <a class="btn" href="${url(chosen, null, "2")}">← Other causes</a>
    </div>`;
}

function stepBtn(n, label, cur, href) {
  const cls = n === cur ? "active" : n < cur ? "done" : "";
  const inner = `<b>${n < cur ? "✓" : n}</b>${label}`;
  return href && n !== cur ? `<a class="step ${cls}" href="${href}">${inner}</a>` : `<span class="step ${cls}" ${n === cur ? 'aria-current="step"' : ""}>${inner}</span>`;
}

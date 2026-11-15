// Clickable body map: pick a region, see what afflicts it, sorted by danger.
import db, { BODY_PARTS, afflictionsForPart, dangerRank, KIND_LABELS } from "../data.js";
import { esc, affRow, bodyPaths, setTitle } from "../ui.js";

const PARTS = [...BODY_PARTS, { id: "systemic", label: "Whole body" }];
const LABEL_POS = { head: [100, 48], torso: [100, 160], rightarm: [30, 150], leftarm: [170, 150], rightleg: [82, 268], leftleg: [118, 268] };

export function bodymap(el, part) {
  if (!PARTS.some((p) => p.id === part)) part = "torso";
  const label = PARTS.find((p) => p.id === part).label;
  setTitle(`Body map: ${label}`);

  const counts = Object.fromEntries(PARTS.map((p) => [p.id, afflictionsForPart(p.id)]));
  const attr = (p) => {
    const list = counts[p];
    const lethal = list.some((a) => a.danger === "lethal");
    const name = PARTS.find((x) => x.id === p).label;
    return `class="part${p === part ? " selected" : ""}${lethal ? " has-lethal" : ""}" tabindex="0" role="button" aria-pressed="${p === part}" aria-label="${esc(name)}: ${list.length} afflictions"`;
  };

  const list = counts[part].slice().sort((a, b) => dangerRank(a) - dangerRank(b) || a.name.localeCompare(b.name));
  const kinds = [...new Set(list.map((a) => a.kind).filter(Boolean))];

  el.innerHTML = `
  <div class="eyebrow">Body map</div>
  <h1>Where does it hurt?</h1>
  <p class="lead">Click a region to see every affliction that can land there. Limb injuries apply to any arm or leg. The figure faces you, so the patient's right arm is on your left.</p>
  <div class="bodymap-layout" style="margin-top:20px">
    <div>
      <div class="bodymap-stage">
        <svg class="bodymap-svg" viewBox="0 0 200 300" role="group" aria-label="Body regions">
          ${[60, 120, 180, 240].map((y) => `<line class="grid-line" x1="0" x2="200" y1="${y}" y2="${y}"/>`).join("")}
          ${bodyPaths(attr)}
          ${Object.entries(LABEL_POS).map(([p, [x, y]]) => `<text class="part-count" x="${x}" y="${y}">${counts[p].length}</text>`).join("")}
        </svg>
      </div>
      <div class="chip-row" style="margin-top:12px;justify-content:center">
        ${PARTS.map((p) => `<a class="chip" style="padding-left:12px" href="#/body/${p.id}" aria-pressed="${p.id === part}">${esc(p.label)} <span class="faint mono">${counts[p.id].length}</span></a>`).join("")}
      </div>
    </div>
    <div>
      <div class="section-head" style="margin-top:0"><h2>${esc(label)}</h2><span class="faint">${list.length} afflictions</span></div>
      ${kinds.length > 1 ? `<div class="filters" id="kind-filter">
        <button class="chip" style="padding-left:12px" data-kind="" aria-pressed="true">All</button>
        ${kinds.map((k) => `<button class="chip" style="padding-left:12px" data-kind="${esc(k)}" aria-pressed="false">${esc(KIND_LABELS[k] || k)}</button>`).join("")}
      </div>` : ""}
      <div class="card" style="padding:8px" id="part-list">${renderList(list)}</div>
    </div>
  </div>`;

  el.querySelectorAll(".bodymap-svg .part").forEach((p) => {
    const go = () => { location.hash = `#/body/${p.dataset.part}`; };
    p.addEventListener("click", go);
    p.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } });
  });
  const filter = el.querySelector("#kind-filter");
  filter?.addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    filter.querySelectorAll("button").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
    const k = b.dataset.kind;
    el.querySelector("#part-list").innerHTML = renderList(k ? list.filter((a) => a.kind === k) : list);
  });
}

function renderList(list) {
  if (!list.length) return `<div class="empty">Nothing recorded for this region.</div>`;
  return list.map((a) => affRow(a)).join("");
}

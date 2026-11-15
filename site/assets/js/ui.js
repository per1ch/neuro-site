// Small rendering helpers shared by all views. Everything from data goes through esc().
import db, { iconUrl, KIND_LABELS } from "./data.js";

export const esc = (v) => String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/** Mod text sometimes carries ‖color:..‖ markup; strip it if the extractor didn't. */
export const clean = (t) => String(t ?? "").replace(/‖[^‖]*‖/g, "");

/** Plain text → paragraphs, preserving line breaks. */
export const paras = (t) => clean(t).split(/\n{2,}/).filter(Boolean).map((p) => `<p>${esc(p).replace(/\n/g, "<br>")}</p>`).join("");

export function icon(entry, size = 40, extra = "") {
  const ic = entry?.icon;
  const sq = entry && db.item.has(entry.id) && !db.aff.has(entry.id) ? " square" : "";
  if (!ic || !ic.w) {
    const letter = esc((entry?.name || entry?.id || "?").trim()[0] || "?");
    return `<span class="icon ph${sq} ${extra}" style="--s:${size}px" aria-hidden="true">${letter}</span>`;
  }
  const url = esc(iconUrl(ic.sheet));
  const scale = size / Math.max(ic.w, ic.h);
  const tint = ic.color && ic.color.toLowerCase() !== "#ffffff"
    ? `background-color:${esc(ic.color)};background-blend-mode:multiply;-webkit-mask:url('${url}') -${ic.x}px -${ic.y}px no-repeat;mask:url('${url}') -${ic.x}px -${ic.y}px no-repeat;`
    : "";
  return `<span class="icon${sq} ${extra}" style="--s:${size}px" aria-hidden="true"><span style="width:${ic.w}px;height:${ic.h}px;background-image:url('${url}');background-position:-${ic.x}px -${ic.y}px;transform:scale(${scale});${tint}"></span></span>`;
}

export function dangerBadge(a) {
  if (!a?.danger) return "";
  return `<span class="badge d-${esc(a.danger)}">${esc(a.danger[0].toUpperCase() + a.danger.slice(1))}</span>`;
}
export const kindTag = (a) => a?.kind ? `<span class="tag">${esc(KIND_LABELS[a.kind] || a.kind)}</span>` : "";

export const affHref = (id) => `#/affliction/${encodeURIComponent(id)}`;
export const itemHref = (id) => `#/item/${encodeURIComponent(id)}`;

export function nameOf(id) {
  return db.aff.get(id)?.name || db.item.get(id)?.name || id;
}

/** Chip linking to an affliction or item; unknown ids render as plain text. */
export function refChip(id, kind) {
  const isItem = kind === "item" || (!kind && !db.aff.has(id) && db.item.has(id));
  const e = isItem ? db.item.get(id) : db.aff.get(id);
  if (!e) return `<span class="chip" title="Not in the data">${esc(id)}</span>`;
  return `<a class="chip" href="${isItem ? itemHref(id) : affHref(id)}">${icon(e, 24, "icon-sm")}${esc(e.name || id)}</a>`;
}

export function affRow(a, sub) {
  return `<a class="list-row" href="${affHref(a.id)}">${icon(a, 40)}
    <span class="grow"><span class="title">${esc(a.name || a.id)}</span><span class="sub">${esc(sub ?? clean(a.description) ?? "")}</span></span>
    ${dangerBadge(a)}</a>`;
}
export function itemRow(it, sub) {
  return `<a class="list-row" href="${itemHref(it.id)}">${icon(it, 40)}
    <span class="grow"><span class="title">${esc(it.name || it.id)}</span><span class="sub">${esc(sub ?? it.summary ?? clean(it.description) ?? "")}</span></span>
    ${it.category ? `<span class="tag">${esc(it.category)}</span>` : ""}</a>`;
}

/** Small body silhouette with the given parts lit. Same geometry as the big map. */
export function miniBody(parts) {
  const on = (p) => parts.includes(p) || (parts.includes("any")) ? " on" : "";
  return `<svg class="mini-body" viewBox="0 0 200 300" aria-hidden="true">${bodyPaths((p) => `class="part${on(p)}"`)}</svg>`;
}

/** Body outline used by both maps. attr(part) returns extra attributes for that region. */
export function bodyPaths(attr) {
  return `
  <path data-part="head" ${attr("head")} d="M100 12c17 0 28 13 28 31s-11 33-28 33-28-15-28-33 11-31 28-31z"/>
  <path data-part="torso" ${attr("torso")} d="M74 84h52c12 0 20 8 21 20l3 64c1 12-6 22-18 26l-3 22H71l-3-22c-12-4-19-14-18-26l3-64c1-12 9-20 21-20z"/>
  <path data-part="rightarm" ${attr("rightarm")} d="M50 92c-10 3-15 10-17 21L22 178c-2 10 0 18 2 30l4 26c1 5 12 4 12-1l-1-30 5-26 11-60z"/>
  <path data-part="leftarm" ${attr("leftarm")} d="M150 92c10 3 15 10 17 21l11 65c2 10 0 18-2 30l-4 26c-1 5-12 4-12-1l1-30-5-26-11-60z"/>
  <path data-part="rightleg" ${attr("rightleg")} d="M71 220h27l-2 30-3 34c0 4-4 6-9 6H70c-5 0-6-4-4-8l2-30z"/>
  <path data-part="leftleg" ${attr("leftleg")} d="M129 220h-27l2 30 3 34c0 4 4 6 9 6h14c5 0 6-4 4-8l-2-30z"/>`;
}

export function sourceLink(src) {
  if (!src || src === "sample") return "";
  const repo = db.meta.modRepo || "https://github.com/LukakoE00/Neurotrauma-CS";
  const ref = db.meta.modCommit || "HEAD";
  return `<a class="source-link" href="${esc(repo)}/blob/${esc(ref)}/${esc(src)}" target="_blank" rel="noopener">${esc(src)} ↗</a>`;
}

export function setTitle(t) { document.title = t ? `${t} · Neurotrauma Field Guide` : "Neurotrauma Field Guide"; }

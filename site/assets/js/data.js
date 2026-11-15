// Data layer: loads the extraction output from data/ (falls back to data/sample/),
// filters hidden entries and builds the derived indexes the views need.
// Schema: see pipeline/SCHEMA.md (afflictions, items, surgery, systems, meta).

export const BODY_PARTS = [
  { id: "head", label: "Head" },
  { id: "torso", label: "Torso" },
  { id: "leftarm", label: "Left arm" },
  { id: "rightarm", label: "Right arm" },
  { id: "leftleg", label: "Left leg" },
  { id: "rightleg", label: "Right leg" },
];
export const LIMBS = ["leftarm", "rightarm", "leftleg", "rightleg"];
export const DANGER_ORDER = ["lethal", "serious", "moderate", "minor", "beneficial", "utility"];
export const KIND_LABELS = {
  condition: "Condition", symptom: "Symptom", vital: "Vital sign", surgical: "Surgical state",
  "drug-in-blood": "Drug in blood", indicator: "Indicator", utility: "Utility", bloodtype: "Blood type",
};

const db = {
  base: "data/", sample: false, meta: {}, afflictions: [], items: [], surgery: [], systems: [], lessons: [],
  aff: new Map(), item: new Map(), lessonBySlug: new Map(),
};

async function getJSON(url, fallback) {
  try {
    const r = await fetch(url, { cache: "no-cache" });
    if (!r.ok) throw new Error(r.status);
    return await r.json();
  } catch {
    return fallback;
  }
}
async function getText(url) {
  const r = await fetch(url, { cache: "no-cache" });
  if (!r.ok) throw new Error(`${url}: ${r.status}`);
  return r.text();
}

export async function loadData() {
  let affs = await getJSON("data/afflictions.json", null);
  if (!affs) { db.base = "data/sample/"; db.sample = true; affs = await getJSON(db.base + "afflictions.json", []); }
  const [items, surgery, systems, meta] = await Promise.all([
    getJSON(db.base + "items.json", []),
    getJSON(db.base + "surgery.json", []),
    getJSON(db.base + "systems.json", []),
    getJSON(db.base + "meta.json", {}),
  ]);
  db.meta = meta || {};
  if (db.meta.sample) db.sample = true;

  for (const a of affs) db.aff.set(a.id, a);
  for (const i of items) db.item.set(i.id, i);
  db.afflictions = affs.filter((a) => !a.hidden).sort(byName);
  db.items = items.filter((i) => !i.hidden).sort(byName);
  db.surgery = surgery || [];
  db.systems = systems || [];
  derive();
  await loadLessons();
  return db;
}

const byName = (a, b) => (a.name || a.id).localeCompare(b.name || b.id);

// Reverse links: which items treat / cause each affliction, which afflictions list it as symptom.
function derive() {
  for (const a of db.afflictions) {
    a._treatedBy = new Map();
    a._causedByItems = new Set();
    a._symptomOf = new Set(a.symptomOf || []);
  }
  for (const a of db.afflictions) {
    for (const s of a.symptoms || []) db.aff.get(s)?._symptomOf?.add(a.id);
    for (const t of a.treatments || []) if (t.item) addTreat(a, t.item, t.note);
  }
  for (const it of db.items) {
    const details = new Map((it.treatsDetail || []).map((d) => [d.affliction || d.id, d]));
    for (const id of it.treats || []) {
      const a = db.aff.get(id);
      if (a && a._treatedBy) addTreat(a, it.id, noteFor(details.get(id)));
    }
    for (const id of it.causes || []) db.aff.get(id)?._causedByItems?.add(it.id);
  }
}
function addTreat(a, itemId, note) {
  if (!a._treatedBy.has(itemId) || (note && !a._treatedBy.get(itemId))) a._treatedBy.set(itemId, note || null);
}
function noteFor(d) {
  if (!d) return null;
  const parts = [];
  if (d.amount != null) parts.push(`${d.amount > 0 ? "−" : ""}${Math.abs(d.amount)} strength`);
  if (d.notes) parts.push(d.notes);
  return parts.join(" · ") || null;
}

async function loadLessons() {
  let base = "content/lessons/";
  let index = await getJSON(base + "index.json", null);
  if (!index) { base = "data/sample/lessons/"; index = await getJSON(base + "index.json", []); }
  if (!Array.isArray(index)) index = index.lessons || [];
  db.lessons = index.map((e, n) => {
    const file = typeof e === "string" ? e : e.file || e.path || `${e.slug}.md`;
    const slug = (typeof e === "object" && e.slug) || file.replace(/\.md$/, "").replace(/^\d+-/, "");
    return { ...(typeof e === "object" ? e : {}), slug, file, url: base + file, order: e.order ?? n + 1 };
  }).sort((a, b) => a.order - b.order);
  for (const l of db.lessons) db.lessonBySlug.set(l.slug, l);
}

export async function lessonText(lesson) {
  if (lesson._text == null) lesson._text = await getText(lesson.url);
  return lesson._text;
}

export function iconUrl(sheet) {
  return db.base + "images/" + String(sheet).split("/").pop();
}

/** Afflictions shown for a body part. Limb-specific ("any") ones appear on every part. */
export function afflictionsForPart(part) {
  if (part === "systemic") return db.afflictions.filter((a) => !(a.bodyParts || []).length);
  return db.afflictions.filter((a) => {
    const p = a.bodyParts || [];
    return p.includes(part) || p.includes("any");
  });
}

export function symptoms() {
  return db.afflictions.filter((a) => a.kind === "symptom" || (a._symptomOf && a._symptomOf.size && a.kind !== "condition"));
}

/** Rank conditions by how many of the chosen symptoms they produce. */
export function diagnose(chosen) {
  if (!chosen.length) return [];
  const set = new Set(chosen);
  const scores = new Map();
  for (const id of chosen) {
    const s = db.aff.get(id);
    for (const c of s?._symptomOf || []) {
      const a = db.aff.get(c);
      if (!a || a.hidden) continue;
      scores.set(c, (scores.get(c) || 0) + 1);
    }
  }
  return [...scores].map(([id, hits]) => {
    const a = db.aff.get(id);
    const own = (a.symptoms || []).length || hits;
    const matched = (a.symptoms || []).filter((s) => set.has(s));
    const missing = (a.symptoms || []).filter((s) => !set.has(s));
    const score = hits / chosen.length * 0.7 + hits / Math.max(own, hits) * 0.3;
    return { a, hits, score, matched: matched.length ? matched : chosen.filter((s) => db.aff.get(s)?._symptomOf?.has(id)), missing };
  }).sort((x, y) => y.score - x.score || dangerRank(x.a) - dangerRank(y.a));
}

export function dangerRank(a) {
  const i = DANGER_ORDER.indexOf(a.danger);
  return i < 0 ? 3.5 : i;
}

export function db_() { return db; }
export default db;

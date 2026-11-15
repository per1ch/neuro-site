// Entry point: loads data, wires the shell (sidebar, palette) and routes hash URLs to views.
// Routes: #/ · #/body[/part] · #/checker?s=..&dx=.. · #/afflictions · #/affliction/:id
//         #/items · #/item/:id · #/learn · #/learn/:slug · #/systems · #/surgery
import db, { loadData } from "./data.js";
import { ICONS } from "./icons.js";
import { bindPaletteKeys, openPalette } from "./search.js";
import { home } from "./views/home.js";
import { bodymap } from "./views/bodymap.js";
import { checker } from "./views/checker.js";
import { afflictionList, itemList, afflictionDetail, itemDetail, notFound } from "./views/library.js";
import { lessonList, lesson, systems, surgery } from "./views/learn.js";

const NAV = [
  { group: "Guide" },
  { href: "#/", label: "Home", icon: "home", match: /^$/ },
  { href: "#/learn", label: "Lessons", icon: "book", match: /^learn/ },
  { group: "Tools" },
  { href: "#/body", label: "Body map", icon: "body", match: /^body/ },
  { href: "#/checker", label: "Symptom checker", icon: "pulse", match: /^checker/ },
  { group: "Reference" },
  { href: "#/afflictions", label: "Afflictions", icon: "virus", match: /^afflictions?/ },
  { href: "#/items", label: "Items & tools", icon: "kit", match: /^items?/ },
  { href: "#/surgery", label: "Surgery", icon: "scalpel", match: /^surgery/ },
  { href: "#/systems", label: "How it works", icon: "cog", match: /^systems/ },
];

const ROUTES = [
  [/^$/, (el) => home(el)],
  [/^body(?:\/([\w-]+))?$/, (el, m) => bodymap(el, m[1])],
  [/^checker$/, (el, m, q) => checker(el, q)],
  [/^afflictions$/, (el, m, q) => afflictionList(el, q)],
  [/^affliction\/(.+)$/, (el, m) => afflictionDetail(el, decodeURIComponent(m[1]))],
  [/^items$/, (el, m, q) => itemList(el, q)],
  [/^item\/(.+)$/, (el, m) => itemDetail(el, decodeURIComponent(m[1]))],
  [/^learn$/, (el) => lessonList(el)],
  [/^learn\/(.+)$/, (el, m) => lesson(el, decodeURIComponent(m[1]))],
  [/^systems$/, (el) => systems(el)],
  [/^surgery$/, (el) => surgery(el)],
];

function shell() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <header class="topbar">
      <button class="btn btn-ghost" id="menu-btn" aria-label="Open menu" aria-expanded="false" aria-controls="sidebar">${ICONS.menu}</button>
      <a class="brand" href="#/"><span class="brand-mark">N</span><span class="brand-text">Field Guide</span></a>
      <button class="btn btn-ghost" style="margin-left:auto" id="search-btn-m" aria-label="Search">${ICONS.search}</button>
    </header>
    <div class="scrim" id="scrim"></div>
    <div class="app">
      <aside class="sidebar" id="sidebar">
        <a class="brand" href="#/"><span class="brand-mark">N</span><span class="brand-text">Neurotrauma<small>Field Guide</small></span></a>
        <button class="search-trigger" id="search-btn">${ICONS.search}<span>Search</span><kbd>/</kbd></button>
        <nav class="nav" aria-label="Main">${NAV.map((n) => n.group ? `<div class="nav-label">${n.group}</div>` : `<a href="${n.href}" data-match="${n.match.source}">${ICONS[n.icon]}<span>${n.label}</span></a>`).join("")}</nav>
        <div class="sidebar-foot">Fan-made guide for the <a href="https://github.com/LukakoE00/Neurotrauma-CS" target="_blank" rel="noopener">Neurotrauma</a> mod. Content from the mod, GPL-3.0.<br><span id="data-ver"></span></div>
      </aside>
      <main class="main" id="main" tabindex="-1">
        <div id="banner"></div>
        <div class="page" id="view"></div>
      </main>
    </div>`;

  const sidebar = document.getElementById("sidebar"), scrim = document.getElementById("scrim"), menuBtn = document.getElementById("menu-btn");
  const setMenu = (open) => { sidebar.classList.toggle("open", open); scrim.classList.toggle("show", open); menuBtn.setAttribute("aria-expanded", String(open)); };
  menuBtn.addEventListener("click", () => setMenu(!sidebar.classList.contains("open")));
  scrim.addEventListener("click", () => setMenu(false));
  sidebar.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
  document.getElementById("search-btn").addEventListener("click", () => openPalette());
  document.getElementById("search-btn-m").addEventListener("click", () => openPalette());
  bindPaletteKeys();
}

let lastPath = null;
async function route() {
  const raw = location.hash;
  // Plain in-page anchors (e.g. lesson headings) scroll instead of routing.
  if (raw && !raw.startsWith("#/")) {
    document.getElementById(decodeURIComponent(raw.slice(1)))?.scrollIntoView({ behavior: "smooth" });
    return;
  }
  const [pathPart, query = ""] = raw.replace(/^#\/?/, "").split("#")[0].split("?");
  const path = pathPart.replace(/\/$/, "");
  const view = document.getElementById("view");
  document.querySelectorAll(".nav a").forEach((a) => {
    const on = new RegExp(a.dataset.match).test(path);
    a.classList.toggle("active", on);
    on ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current");
  });
  const hit = ROUTES.find(([re]) => re.test(path));
  view.style.animation = "none"; void view.offsetWidth; view.style.animation = "";
  try {
    if (hit) await hit[1](view, path.match(hit[0]), new URLSearchParams(query));
    else notFound(view, "page", path);
  } catch (err) {
    console.error(err);
    view.innerHTML = `<div class="empty">Something broke while drawing this page.</div>`;
  }
  // Keep scroll for in-view state changes (same path), reset when the page changes.
  if (path !== lastPath) { window.scrollTo(0, 0); document.getElementById("main").focus({ preventScroll: true }); }
  lastPath = path;
}

async function start() {
  shell();
  await loadData();
  if (db.sample) {
    document.getElementById("banner").innerHTML = `<div class="banner"><b>Sample data.</b> The real mod data hasn't been generated into <code>site/data/</code> yet, so names and numbers here are placeholders.</div>`;
  }
  const m = db.meta;
  if (m.modCommit) document.getElementById("data-ver").textContent = `Data: mod ${String(m.modCommit).slice(0, 7)}${m.generatedAt ? ` · ${String(m.generatedAt).slice(0, 10)}` : ""}`;
  window.addEventListener("hashchange", route);
  route();
}

start();

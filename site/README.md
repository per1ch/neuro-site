# Neurotrauma Field Guide (site)

Static site, no build step. Serve this folder as-is (GitHub Pages, any static host):

```sh
cd site && python3 -m http.server 8000   # then open http://localhost:8000
```

## Layout

| Path | Owner | What |
|---|---|---|
| `index.html`, `assets/` | site shell | Design system (`assets/css/main.css`), router and views (`assets/js/`) |
| `data/` | data pipeline (`pipeline/`) | `afflictions.json`, `items.json`, `surgery.json`, `systems.json`, `meta.json`, `images/` (schema: `pipeline/SCHEMA.md`) |
| `data/sample/` | site shell | Placeholder data used only when `data/afflictions.json` is missing |
| `content/lessons/` | lessons | Markdown lessons with front matter plus `index.json` for order |

## Routes

`#/` home · `#/body/<part>` body map · `#/checker?s=<symptom ids>&dx=<id>` symptom checker ·
`#/afflictions`, `#/affliction/<id>` · `#/items`, `#/item/<id>` · `#/learn`, `#/learn/<slug>` ·
`#/surgery` · `#/systems`. Press `/` or `Ctrl+K` anywhere to search.

Lesson Markdown can link to `#/affliction/<modId>` and `#/item/<modId>`. GitHub callouts
(`> [!TIP]`, `> [!WARNING]`, ...) render as styled boxes, and HTML comments are dropped.

## JS modules

- `data.js` loads and indexes the data (reverse links: which items treat an affliction, symptom → conditions).
- `ui.js` shared helpers. All data is escaped through `esc()` before it reaches `innerHTML`.
- `search.js` full-text search and the command palette.
- `views/` one module per page type. `lib/markdown.js` is a small, escaping Markdown renderer.

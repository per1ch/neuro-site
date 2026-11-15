// Inline stroke icons (no external icon font).
const s = (d) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
export const ICONS = {
  home: s('<path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/>'),
  body: s('<circle cx="12" cy="4.5" r="2.5"/><path d="M12 7v8m0 0-3 6m3-6 3 6M6 10l6-1 6 1"/>'),
  pulse: s('<path d="M3 12h4l2-6 4 12 2-6h6"/>'),
  virus: s('<circle cx="12" cy="12" r="5"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3M5 5l2 2m10 10 2 2M5 19l2-2M17 7l2-2"/>'),
  kit: s('<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M12 11v5m-2.5-2.5h5"/>'),
  book: s('<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19V5"/>'),
  cog: s('<circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.1-1.2l2-1.6-2-3.4-2.4 1a7 7 0 0 0-2-1.2L14 3h-4l-.5 2.6a7 7 0 0 0-2 1.2l-2.4-1-2 3.4 2 1.6a7 7 0 0 0 0 2.4l-2 1.6 2 3.4 2.4-1a7 7 0 0 0 2 1.2L10 21h4l.5-2.6a7 7 0 0 0 2-1.2l2.4 1 2-3.4-2-1.6c.1-.4.1-.8.1-1.2z"/>'),
  scalpel: s('<path d="M3 21 14 10l3 3L6 21z"/><path d="m14 10 6-6 1 1-4 8"/>'),
  menu: s('<path d="M4 6h16M4 12h16M4 18h16"/>'),
  search: s('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),
};

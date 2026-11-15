// Minimal, dependency-free Markdown renderer and front-matter parser.
// Every raw text run is HTML-escaped, so raw HTML in the source shows as text.

const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

// ---------- front matter ----------

const FM = /^---\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/;

function unquote(s) {
  const m = /^(["'])([\s\S]*)\1$/.exec(s);
  return m ? m[2] : s;
}

function parseValue(v) {
  if (v.startsWith('[') && v.endsWith(']')) {
    return v.slice(1, -1).split(',').map((s) => unquote(s.trim())).filter((s) => s !== '');
  }
  if (/^["']/.test(v)) return unquote(v);
  if (/^-?\d+(\.\d+)?$/.test(v)) return Number(v);
  return v;
}

export function parseFrontmatter(text) {
  const m = FM.exec(text);
  if (!m) return { data: {}, body: text };
  const data = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = /^\s*([\w-]+)\s*:\s*(.*?)\s*$/.exec(line);
    if (kv) data[kv[1]] = parseValue(kv[2]);
  }
  return { data, body: text.slice(m[0].length) };
}

// ---------- shared helpers ----------

const COMMENT = /<!--[\s\S]*?(?:-->|$)/g;

const HR = /^\s{0,3}([-*_])(\s*\1){2,}\s*$/;
const HEAD = /^(#{1,4})\s+(.*?)(?:\s+#+)?\s*$/;
const FENCE = /^\s*```\s*([\w+#.-]*)\s*$/;
const FENCE_END = /^\s*```\s*$/;
const ITEM = /^(\s*)([-*+]|\d+\.)\s+(.*)$/;
const QUOTE = /^\s*>\s?(.*)$/;
const CALLOUT = /^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*$/i;
const SEP = /^\s*\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)*\|?\s*$/;

const slugify = (text) => text
  .replace(/[`*_~[\]()!]/g, '')
  .toLowerCase()
  .trim()
  .replace(/[^\p{L}\p{N}\s-]/gu, '')
  .replace(/\s+/g, '-');

function safeHref(u) {
  if (/^(#|\/|\.\/|https?:\/\/)/i.test(u)) return u;
  // No scheme: the first ':' must come after any '/', '?' or '#'.
  return /^[^:/?#]*(?:[/?#]|$)/.test(u) ? u : null;
}

const isTable = (lines, i) => lines[i].includes('|') && i + 1 < lines.length
  && SEP.test(lines[i + 1]) && lines[i + 1].includes('|');

const startsBlock = (lines, i) => FENCE.test(lines[i]) || HEAD.test(lines[i])
  || HR.test(lines[i]) || QUOTE.test(lines[i]) || ITEM.test(lines[i]) || isTable(lines, i);

// ---------- inline ----------

const INLINE_SRC = '`([^`]+)`'
  + '|!\\[([^\\]]*)\\]\\(([^)\\s]+)\\)'
  + '|\\[([^\\]]+)\\]\\(([^)\\s]+)\\)'
  + '|\\*\\*(.+?)\\*\\*|__(.+?)__'
  + '|\\*(?=\\S)(.+?)\\*'
  + '|(?<!\\w)_(?=\\S)(.+?)_(?!\\w)';

function inline(s) {
  const re = new RegExp(INLINE_SRC, 'g'); // fresh per call: inline() recurses
  let out = '';
  let last = 0;
  let m;
  while ((m = re.exec(s))) {
    out += esc(s.slice(last, m.index));
    last = re.lastIndex;
    const [, code, imgAlt, imgSrc, linkText, linkUrl, b1, b2, i1, i2] = m;
    if (code !== undefined) {
      out += `<code>${esc(code)}</code>`;
    } else if (imgSrc !== undefined) {
      const href = safeHref(imgSrc);
      out += href ? `<img src="${esc(href)}" alt="${esc(imgAlt)}">` : esc(imgAlt);
    } else if (linkText !== undefined) {
      const href = safeHref(linkUrl);
      if (!href) {
        out += esc(linkText); // unsafe scheme: plain text only
      } else {
        const ext = /^https?:\/\//i.test(href) ? ' target="_blank" rel="noopener"' : '';
        out += `<a href="${esc(href)}"${ext}>${inline(linkText)}</a>`;
      }
    } else if (b1 !== undefined || b2 !== undefined) {
      out += `<strong>${inline(b1 ?? b2)}</strong>`;
    } else {
      out += `<em>${inline(i1 ?? i2)}</em>`;
    }
  }
  return out + esc(s.slice(last));
}

// ---------- blocks ----------

const cells = (line) => line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((c) => c.trim());
const alignOf = (c) => (c.startsWith(':') && c.endsWith(':') ? 'center'
  : c.endsWith(':') ? 'right' : c.startsWith(':') ? 'left' : '');
const cellHtml = (tag, text, align) => `<${tag}${align ? ` style="text-align:${align}"` : ''}>${inline(text)}</${tag}>`;

// Parses a list whose items sit at indent `base`; returns html and the next line index.
function parseList(lines, i, base) {
  const kind = (line) => (/\d/.test(ITEM.exec(line)[2]) ? 'ol' : 'ul');
  const tag = kind(lines[i]);
  const parts = [`<${tag}>`];
  let open = false;
  while (i < lines.length) {
    const line = lines[i];
    const m = ITEM.exec(line);
    if (!m) {
      // Indented continuation text belongs to the current item.
      if (open && /^\s+\S/.test(line)) { parts.push(` ${inline(line.trim())}`); i++; continue; }
      break;
    }
    if (m[1].length < base) break;
    if (m[1].length > base) {
      const sub = parseList(lines, i, m[1].length);
      parts.push(sub.html);
      i = sub.next;
      continue;
    }
    if (kind(line) !== tag) break;
    if (open) parts.push('</li>');
    parts.push(`<li>${inline(m[3])}`);
    open = true;
    i++;
  }
  if (open) parts.push('</li>');
  parts.push(`</${tag}>`);
  return { html: parts.join(''), next: i };
}

function renderBlocks(src) {
  const lines = src.split('\n');
  const out = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    let m;
    if (!line.trim()) {
      i++;
    } else if ((m = FENCE.exec(line))) {
      const code = [];
      for (i++; i < lines.length && !FENCE_END.test(lines[i]); i++) code.push(lines[i]);
      i++; // skip closing fence (or end of input)
      const cls = m[1] ? ` class="language-${esc(m[1])}"` : '';
      out.push(`<pre><code${cls}>${esc(code.join('\n'))}</code></pre>`);
    } else if ((m = HEAD.exec(line))) {
      const level = m[1].length;
      out.push(`<h${level} id="${slugify(m[2])}">${inline(m[2])}</h${level}>`);
      i++;
    } else if (HR.test(line)) {
      out.push('<hr>');
      i++;
    } else if (QUOTE.test(line)) {
      const q = [];
      while (i < lines.length && QUOTE.test(lines[i])) q.push(QUOTE.exec(lines[i++])[1]);
      const c = CALLOUT.exec(q[0] ?? '');
      if (c) {
        const type = c[1].toLowerCase();
        const title = type[0].toUpperCase() + type.slice(1);
        out.push(`<div class="callout callout-${type}"><div class="callout-title">${title}</div>`
          + `${renderBlocks(q.slice(1).join('\n'))}</div>`);
      } else {
        out.push(`<blockquote>${renderBlocks(q.join('\n'))}</blockquote>`);
      }
    } else if (isTable(lines, i)) {
      const heads = cells(line);
      const aligns = cells(lines[i + 1]).map(alignOf);
      i += 2;
      let body = '';
      while (i < lines.length && lines[i].includes('|') && lines[i].trim()) {
        body += `<tr>${cells(lines[i++]).map((c, j) => cellHtml('td', c, aligns[j])).join('')}</tr>`;
      }
      const head = heads.map((h, j) => cellHtml('th', h, aligns[j])).join('');
      out.push(`<table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`);
    } else if (ITEM.test(line)) {
      const r = parseList(lines, i, ITEM.exec(line)[1].length);
      out.push(r.html);
      i = r.next;
    } else {
      const p = [];
      while (i < lines.length && lines[i].trim() && !startsBlock(lines, i)) p.push(lines[i++].trim());
      out.push(`<p>${inline(p.join(' '))}</p>`);
    }
  }
  return out.join('\n');
}

export function renderMarkdown(md) {
  const body = parseFrontmatter(String(md)).body.replace(COMMENT, '').replace(/\r\n?/g, '\n');
  return renderBlocks(body);
}

export function extractHeadings(md) {
  const body = parseFrontmatter(String(md)).body.replace(COMMENT, '');
  const heads = [];
  let inFence = false;
  for (const line of body.split(/\r?\n/)) {
    if (FENCE.test(line)) { inFence = !inFence; continue; }
    if (inFence) continue;
    const m = HEAD.exec(line);
    if (m && m[1].length >= 2 && m[1].length <= 3) {
      heads.push({ level: m[1].length, text: m[2].replace(/[`*]/g, ''), id: slugify(m[2]) });
    }
  }
  return heads;
}

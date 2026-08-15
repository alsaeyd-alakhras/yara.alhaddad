# Yara Al-Haddad — Portfolio

Static portfolio built **pixel-faithful** from Figma (`Soft Editorial`).

## Pages

| Page | File |
|------|------|
| Home | `index.html` |
| Work | `work.html` |
| Project Single | `project.html` |
| About | `about.html` |
| Contact | `contact.html` |

## Stack

- **HTML** — semantic markup
- **Tailwind CSS v4** — npm build (no CDN, no custom component CSS)
- **Vanilla JS** — i18n, nav, mobile menu
- **JSON** — content in `assets/data/`

## Setup

```bash
npm install
npm run build:css
npm run serve
```

For development with CSS watch:

```bash
npm run dev        # terminal 1 — watches Tailwind
npm run serve      # terminal 2 — local server
```

## Docs

- [`design.md`](./design.md) — design tokens & Figma spec (updated from Figma link)
- [`AGENTS.md`](./AGENTS.md) — build rules for agents

## Status

✅ **Home (`index.html`)** — Figma `1:1626`  
✅ **Work (`work.html`)** — Figma `76:2`  
✅ **Project Single (`project.html`)** — Figma `110:913` (Sadded case study)  
⏳ About, Contact — pending

Legacy reference: `../figma-profile/` (unchanged, do not edit).

# AGENTS.md — Build Rules

> قواعد التنفيذ لأي agent يبني صفحات `yara-portfolio`.  
> التصميم البصري: [`design.md`](./design.md) — يُستخرج من Figma.

---

## Project

| | |
|---|---|
| **Folder** | `yara-portfolio/` |
| **Reference (do not edit)** | `../figma-profile/` |
| **Default language** | English (`lang="en"`, `dir="ltr"`) |
| **Translation** | Vanilla JS + `data-i18n` + JSON in `assets/data/i18n/` |

---

## Pages (5)

| # | File | Page |
|---|------|------|
| 1 | `index.html` | Home |
| 2 | `work.html` | Work |
| 3 | `project.html` | Project Single |
| 4 | `about.html` | About |
| 5 | `contact.html` | Contact |

---

## Phase 1 — Figma fidelity (current)

### Must
- **Pixel-faithful copy** from Figma — spacing, colors, typography, borders, shadows exactly as designed
- **No creative changes** — no extra sections, no layout changes, no new colors
- **Responsive** — match Figma breakpoints (mobile / tablet / desktop)
- **English first** — text in HTML; AR via i18n later

### Must not (Phase 1)
- ❌ GSAP / ScrollTrigger / Lenis / animations
- ❌ Creative interpretation or "improvements"
- ❌ Edit `figma-profile/`

### Phase 2 — Animation

- **Skill:** `.claude/skills/gsap-editorial/` (NOT `gsap-motion`)
- **File:** `assets/js/gsap-init.js`
- **Libraries:** GSAP 3.14 + ScrollTrigger + Lenis (CDN)
- **Motion level:** Editorial — see `motion-tokens.md` in skill references
- GSAP animations after all static pages are done (Phase 1 complete)

---

## CSS

- **Tailwind utility classes only** in HTML
- **Forbidden:** inline `style=""`, `<style>` blocks, custom component CSS files
- **Allowed:** `src/css/input.css` — `@import "tailwindcss"` + `@theme` tokens only
- **Tailwind via npm** → `npm run build:css` → `assets/css/main.css`

## Typography (font policy)

| Language | Font | Rule |
|----------|------|------|
| **EN** | Playfair Display | **All text** — headings, body, nav, labels. Figma uses Inter in places; override to Playfair for EN |
| **AR** | Inter | Temporary — all Arabic text |

```html
<!-- EN default -->
<body class="font-display">

<!-- AR via i18n -->
<html lang="ar" class="font-ar">
```


---

## JavaScript

- **Vanilla JS** — no jQuery
- Phase 1 minimum: language toggle, mobile menu, smooth scroll (if in Figma)
- i18n pattern:

```html
<h1 data-i18n="hero.title">English text here</h1>
```

```js
// assets/js/i18n.js
// 1. fetch assets/data/i18n/{lang}.json
// 2. [data-i18n] → textContent
// 3. html lang + dir
// 4. localStorage key: yara_lang
```

---

## Data

- **JSON** in `assets/data/` for reusable content (projects, site meta)
- **i18n:** `assets/data/i18n/en.json`, `ar.json`
- HTML holds English; i18n replaces on AR toggle

---

## Folder structure

```
yara-portfolio/
├── index.html
├── work.html
├── project.html
├── about.html
├── contact.html
├── design.md               # Design tokens (from Figma)
├── AGENTS.md               # This file — build rules
├── README.md
├── package.json
├── src/css/input.css
└── assets/
    ├── css/main.css        # built (gitignored)
    ├── js/
    ├── data/
    └── images/
        ├── icons/
        ├── profile/
        ├── projects/{slug}/
        └── ui/
```

### Image naming
- General: `{section}-{element}.webp`
- Projects: `assets/images/projects/{slug}/cover.webp`
- Icons: `assets/images/icons/{name}.svg`

---

## Git

- Local repo inside `yara-portfolio/` only
- **No push** unless explicitly requested
- **No commit** until first complete page is done

---

## Workflow

1. Receive Figma frame link per page
2. Extract measurements, colors, typography, assets → update `design.md`
3. Build HTML — Tailwind classes only, pixel-faithful
4. Export images → `assets/images/...`
5. Review side-by-side with Figma screenshot
6. After all pages static → add GSAP (Phase 2)

### Required from user per page
1. Figma link with `node-id`
2. Separate mobile frame if exists
3. Any placeholder text differences

---

## Commands

```bash
npm install
npm run build:css
npm run dev          # watch CSS
npm run serve        # http://localhost:3000
```

---

## Out of scope (now)

- GSAP / Lenis
- Vue / React / bundler
- Admin dashboard
- Dark mode (unless in Figma)
- Modifying `figma-profile/`

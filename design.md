# Design — Yara Al-Haddad Portfolio

> **مصدر التصميم:** Figma file `Yara Alhaddad`  
> **مستخرج من:** Home + About frames  
> **آخر تحديث:** Aug 13, 2026

---

## Figma

| | |
|---|---|
| **File** | Yara Alhaddad |
| **File key** | `MugajP9xtSQE2nPqEBd01o` |
| **Home frame** | [Yara Portfolio](https://www.figma.com/design/MugajP9xtSQE2nPqEBd01o/Yara-Alhaddad?node-id=1-1626) — `1:1626` — 1280 × 4319px |
| **About frame** | [About](https://www.figma.com/design/MugajP9xtSQE2nPqEBd01o/Yara-Alhaddad?node-id=73-3256) — `73:3256` — 1280 × 3328px |
| **Contact frame** | [Contact](https://www.figma.com/design/MugajP9xtSQE2nPqEBd01o/Yara-Alhaddad?node-id=71-2746) — `71:2746` — 1280 × 1449px |

---

## Brand Feel

- **Soft Editorial** — editorial، دافئ، هادئ، polished
- خلفية cream/off-white، نص charcoal، accent rose/burgundy
- whitespace واسع، borders رفيعة، shadows ناعمة
- asymmetric layouts (hero، work grid، methodology path)
- numbered sections على About (`01 - PERSPECTIVE`، `02 - WHAT I WORK ACROSS`…)
- italic rose highlights على عناوين About (`Practice`، `clear, calm, and human.`)
- **تجنّب:** SaaS blue، gradients loud، stock templates

---

## Typography

### Font policy (قرار التنفيذ)

| اللغة | الخط | ملاحظة |
|-------|------|--------|
| **English (EN)** | **Playfair Display** | خط واحد لكل النصوص — headings، body، nav، labels |
| **Arabic (AR)** | **Inter** | مؤقت — يُستبدل لاحقاً |

> **Figma يستخدم Inter** لبعض عناصر UI (nav links، body paragraphs، labels).  
> **عند التنفيذ:** أي نص إنجليزي = Playfair Display. أي نص عربي = Inter.

### Google Fonts

```
Playfair Display: 400, 400 italic, 500, 600, 600 italic
Inter: 400, 500, 600  (للعربي فقط حالياً)
```

### Type scale (from Figma)

| Style | Figma font | Size | Weight | Line height | Letter spacing | Color | Usage |
|-------|-----------|------|--------|-------------|----------------|-------|-------|
| **Brand / Logo** | Playfair Display | 32px | 400 | 41.6px | -0.8px | `#87504b` | Nav brand name |
| **Hero H1 (Home)** | Playfair Display | 48px | 600 | 57.6px | -0.96px | `#353229` | Home hero title |
| **Hero H1 (About)** | Playfair Display | 56px | 600 | 61.6px | -1.12px | `#1e1b15` | About main headline |
| **Hero H1 italic accent** | Playfair Display Italic | 56px | 600 | 61.6px | -1.12px | `#b97a74` | Highlight words |
| **Section H2** | Playfair Display | 48px | 600 | 57.6px | -0.96px | `#353229` | Selected Work، Methodology |
| **Numbered H2 (About)** | Playfair Display | 48px | 600 | 57.6px | -0.96px | `#353229` | `01 - PERSPECTIVE` |
| **Banner H2 (About)** | Playfair Display | 56px | 600 | 61.6px | -1.12px | `#f7f2ea` | Banner title |
| **Banner italic** | Playfair Display Italic | 56px | 600 | 61.6px | — | `#b97a74` | `Practice` |
| **Body large** | Inter → **Playfair EN** | 18px | 400 | 28.8px | — | `#625f54` | Hero description، paragraphs |
| **Nav / Label** | Inter → **Playfair EN** | 14px | 500 | 19.6px | 0.7px | `#625f54` / `#87504b` active | Nav links، CTA، badges |
| **Eyebrow / uppercase** | Inter → **Playfair EN** | 14px | 500 | 20px | 0.7px | `#6f5b4a` | Hero badge |
| **Stat number** | Playfair Display | 36px | — | 36px | — | `#353229` | `2+`، `32` |
| **Stat label** | Inter → **Playfair EN** | 12–16px | 500 | — | 0.7px uppercase | `#625f54` | YEARS EXP، PROJECTS |
| **Meta label (About)** | Inter → **Playfair EN** | 12px | — | 12px | — | muted | EXPERIENCE، LOCATION |
| **Meta value (About)** | Inter → **Playfair EN** | 16–24px | — | 24px | — | `#353229` | `2+ years`، `Gaza City` |
| **Card H3** | Playfair Display | ~28–42px | — | — | — | `#353229` | Project titles |
| **CTA H2** | Playfair Display | ~48px | 600 | — | — | `#353229` | CTA section headline |

---

## Colors

| Token | Hex / Value | Usage |
|-------|-------------|-------|
| **cream** | `#fef9f1` | Page background |
| **primary** | `#87504b` | Brand، CTA bg، active nav، accents |
| **on-primary** | `#fff7f6` | Text on primary buttons |
| **secondary** | `#56634e` | Secondary accent (sage) |
| **ink** | `#353229` | Primary text |
| **ink-strong** | `#1e1b15` | About hero headline |
| **muted** | `#625f54` | Body text، inactive nav |
| **muted-soft** | `#6f5b4a` | Badge text، tertiary |
| **rose** | `#b97a74` | Italic highlights، accents |
| **outline** | `#b6b2a5` | Borders |
| **outline-soft** | `rgba(182,178,165,0.3)` | Nav border |
| **cta-surface** | `#ede8dc` | CTA section bg |
| **hero-frame** | `#efd5c0` | Hero photo frame |
| **badge-dot** | `#8c9a82` | Status dot |
| **surface-tag** | `rgba(254,227,205,0.5)` | Project tag pills |
| **surface-image** | `rgba(237,232,220,0.3)` | Image overlays |
| **banner-text** | `#f7f2ea` | About banner heading |
| **badge-border** | `rgba(185,122,116,0.2)` | Hero badge border |
| **nav-bg** | `rgba(254,249,241,0.8)` | Nav glass background |
| **nav-shadow** | `rgba(135,80,75,0.05)` | Nav shadow |

### Tailwind mapping (`src/css/input.css`)

| Token | Class examples |
|-------|----------------|
| cream | `bg-cream` |
| primary | `bg-primary`, `text-primary` |
| on-primary | `text-on-primary` |
| ink | `text-ink` |
| ink-strong | `text-ink-strong` |
| muted | `text-muted` |
| rose | `text-rose` |
| outline | `border-outline` |

---

## Layout

| Token | Value | Notes |
|-------|-------|-------|
| **Page width** | 1280px | Desktop frame |
| **Page margin** | 70px | Nav، most sections |
| **Content max** | 1140px | Nav inner، CTA، Index |
| **Work grid max** | 1088px | Selected work cards |
| **Work section pad** | 96px horizontal | Work cards container |
| **Section pad (wide)** | 40px + 32px inner | Selected Work header |
| **Nav height** | 78px inner + 16px top + 16px bottom | Total ~110px |
| **Nav border radius** | 12px | TopNavBar shell |
| **Button radius** | 8px | Primary CTA |
| **Nav link radius** | 6px | Nav items |

### Section heights (desktop)

| Section | Height |
|---------|--------|
| Hero (Home) | 640px |
| Expertise Ribbon | ~119px |
| Methodology | 668px |
| Index & Experience | 553px |
| CTA | 494px |
| Footer | ~131px |
| About Banner | 400px |
| About Hero | 582px |
| Perspective | ~576px |
| Capability Index | ~482px |

---

## Shared Components

### TopNavBar (`2:21` / `73:3258`)

- Glass shell: `backdrop-blur-[6px]`, bg cream 80%, border outline-soft
- `rounded-[12px]`, shadow nav-shadow
- Padding: `px-[25px] py-[17px]`
- **Links:** Home · Work · About · Contact
- Active link: `text-primary` + 1px underline bottom
- Inactive: `text-muted`
- CTA: `bg-primary text-on-primary rounded-lg px-6 py-2`
- Lang toggle: `AR` — `text-muted`

### Footer (`72:3242` / `72:3243`)

- **Outer (`72:3242`):** `pt-[40px] px-[70px]`, `flex flex-col items-start justify-end`
- **Inner shell (`72:3243`):** `w-full max-w-[1200px]`, `border-t border-outline-20`, `rounded-t-[12px]`, `bg-cream`, `px-[32px] pt-[25px] pb-[24px]`
- **Layout:** single row — `flex items-center justify-between` (Brand · Links · Copyright)
- **Brand:** Playfair 32px / 41.6px, `font-medium`, `text-primary`
- **Links:** gap 24px — LinkedIn · Behance · العربية (`font-ar`)
- **Copyright:** 14px / 20px, `text-muted-soft`

### CTA Section (shared Home + About)

- Container: 1140px، padding 60px vertical
- Background: cta-surface with decorative bordered squares
- Primary button + secondary link with arrow icon
- **Home copy:** "Ready to build something structured and calm?"
- **About copy:** "Looking for a designer who understands both the interface and the system?"

### Index & Experience table

- 3 columns: Role · Description · Date range
- Row height ~77px، horizontal borders
- Shared between Home and About (About uses `03 -` prefix)

---

## Home — Sections (`1:1626`)

| # | Section | Node | Notes |
|---|---------|------|-------|
| 1 | Navigation | `2:21` | Sticky top |
| 2 | Hero | `1:1714` | 2-col: text + photo. Badge، H1 3 lines، 2 CTAs، quote، stats |
| 3 | Expertise Ribbon | `2:48` | Uppercase tagline + skill chips separated by `·` |
| 4 | Selected Work | `3:365` | H2 + divider. Sadded wide card، AdminEdu + WorkNest grid، "View all projects" |
| 5 | Methodology | `2:178` | 5 steps on dashed SVG path with icon nodes |
| 6 | Index & Experience | `2:338` | 4-row experience table |
| 7 | CTA | `2:177` | — |
| 8 | Footer | `72:3242` | — |

### Home Hero content

- **Badge:** `YARA AL-HADDAD — UI/UX DESIGNER & SYSTEM ANALYST`
- **H1:** I design clear digital / experiences from / complex systems.
- **Body:** Research-led mobile and web products…
- **CTAs:** Explore Selected Work (primary) · Start a conversation (outline)
- **Quote:** Designer, analyst, and software engineering.
- **Location:** Gaza · Available for remote opportunities
- **Stats:** 2+ YEARS EXP · 32 PROJECTS

### Selected Work projects

| Project | Layout | Tags |
|---------|--------|------|
| Sadded | Full-width 1088px | Mobile App · UX/UI Design |
| AdminEdu | 40% column | Web Dashboard · UX/UI Design |
| WorkNest | 60% column | Web App · UX/UI Design |

---

## About — Sections (`73:3256`)

| # | Section | Node | Notes |
|---|---------|------|-------|
| 1 | Navigation | `73:3258` | About active |
| 2 | Banner | `73:3276` | Dark editorial. `ABOUT` eyebrow + watermark. Decorative nested borders |
| 3 | About Hero | `73:3540` | H1 with rose italic. Bio + stats sidebar. Photo right |
| 4 | 01 - Perspective | `73:3574` | Quote left + 2 paragraphs right |
| 5 | 02 - Capability Index | `73:3611` | 4 columns: UI/UX · System Analysis · Design Systems · UX Research |
| 6 | 03 - Index & Experience | `73:3304` | Same table as Home |
| 7 | CTA | `73:3337` | About-specific copy |
| 8 | Footer | `73:3350` | — |

### About Banner content

- **Eyebrow:** ABOUT (with 52px underline)
- **H2:** The *Practice* of / Systemic Design
- **Sub:** Crafting elevated experiences that blend aesthetic precision with business objectives.
- **Meta chips:** 2+ Years · Gaza City · Remote Available

### About Hero content

- **Eyebrow:** UI/UX DESIGNER · SYSTEM ANALYST
- **H1:** I turn complex systems into / digital experiences that feel / *clear, calm, and human.*
- **Bio:** Yara is a UI/UX Designer and System Analyst with over 2 years…
- **Sidebar:** EXPERIENCE 2+ years · LOCATION Gaza City · AVAILABILITY Remote / Gaza

### Capability columns

Each: 40×40 icon box · title · 4 bullet items

1. UI/UX Design
2. System Analysis
3. Design Systems
4. UX Research

---

## Contact — Sections (`71:2746`)

| # | Section | Node | Notes |
|---|---------|------|-------|
| 1 | Navigation | `71:2748` | Contact active |
| 2 | Banner | `71:2766` | Dark editorial. `CONTACT` eyebrow (73px underline). Watermark `COntact` |
| 3 | Main Contact Area | `71:2996` | 2-col: Direct Contact + Socials · Send Inquiry form |
| 4 | Footer | `71:2841` | — |

### Contact Banner content

- **Eyebrow:** Contact (with 73px underline)
- **H1:** Have a project in mind? Let's *make* it clear, useful, and beautifully considered.
- **Sub:** I'm open to UI/UX opportunities, product collaborations, and thoughtful digital.

### Contact form fields

- NAME · EMAIL ADDRESS · PROJECT TYPE (select) · MESSAGE
- Submit: `Send inquiry` — primary button, 2px radius

---

## Work — Sections (`76:2`)

| # | Section | Node | Notes |
|---|---------|------|-------|
| 1 | Navigation | `76:4` | Work active |
| 2 | Banner | `84:133` | Dark editorial. `work` eyebrow + watermark. Decorative nested borders |
| 3 | Featured Project | `86:350` | Sadded full-width card (50/50 split) |
| 4 | Projects Grid | `84:203` | 2×2: WorkNest · AdminEdu · Sprout · Personal Finance |
| 5 | CTA | `76:83` | Work copy + email link |
| 6 | Footer | `76:101` | Shared footer |

### Work Banner content

- **Eyebrow:** work (44px underline)
- **H1:** *Interfaces* shaped by research, systems, and careful visual decisions.
- **Body:** A selection of mobile products, responsive platforms…
- **Tags:** Mobile · Web · Dashboards · UX Research

### Work projects

| Project | Layout | Tags |
|---------|--------|------|
| Sadded | Featured wide card | UX Research · Product Design · Mobile App |
| WorkNest | Grid card | Responsive Web · Mobile · UI/UX |
| AdminEdu | Grid card | Dashboard · Responsive UI · Dark & Light |
| Sprout | Grid card | Mobile App · Dashboard · Community |
| Personal Finance | Grid card (placeholder) | Mobile App · Product Design |

---

## Case Study — Sadded (`110:913`)

| # | Section | Node | Notes |
|---|---------|------|-------|
| 1 | Navigation | `110:915` | Work active |
| 2 | Header | `110:934` | Back link · title · tags |
| 3 | Cover Image | `110:957` | 21:9 hero mockup on `#f1e9e2` |
| 4 | Project Details | `110:960` | Heading + body copy |
| 5 | Project Gallery | `110:965` | 3 images · nav arrows · Figma link · next project |
| 6 | CTA | `110:999` | `#f7f2ea` outer bg |
| 7 | Footer | `110:1017` | Shared footer |

---

## Pages map

| Page | HTML | Figma frame | Status |
|------|------|-------------|--------|
| Home | `index.html` | `1:1626` | ✅ built |
| Work | `work.html` | `76:2` | ✅ built |
| Project Single | `project.html` | `110:913` | ✅ built |
| About | `about.html` | `73:3256` | ✅ built |
| Contact | `contact.html` | `71:2746` | ✅ built |

---

## Assets (from Figma export)

| Folder | Contents |
|--------|----------|
| `assets/images/icons/` | Nav arrows، methodology icons، capability icons |
| `assets/images/profile/` | Hero / About photos |
| `assets/images/projects/{slug}/` | Sadded، AdminEdu، WorkNest covers |
| `assets/images/ui/` | Methodology dashed path، banner decorations، CTA squares |

---

## Accessibility

- Strong contrast on cream bg
- Large touch targets on CTAs (min 36–52px height)
- Semantic heading hierarchy
- Responsive: _mobile frames pending from Figma_

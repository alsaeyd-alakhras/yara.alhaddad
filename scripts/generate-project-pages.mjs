import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "projects");

const PROJECTS = [
  {
    file: "trackly.html",
    i18nPage: "project-trackly",
    slug: "trackly",
    key: "trackly",
    gallery: [
      [1, 1920, 1440],
      [2, 1920, 1440],
      [3, 1920, 1440],
      [4, 1536, 1024],
    ],
    cover: [1672, 941],
    tags: ["webApp", "mobileApp", "uiUxDesign", "fintech"],
    figma:
      "https://www.figma.com/design/6Gsmocc7bZsxKQJdnCCjLu/final_proj_geeks?node-id=1-7121&t=gQzp8rcWdXrsklOY-1",
    nextHref: "sprout.html",
  },
  {
    file: "sprout.html",
    i18nPage: "project-sprout",
    slug: "sprout",
    key: "sprout",
    gallery: [
      [1, 1920, 1440],
      [2, 1920, 1440],
      [3, 1920, 1440],
      [4, 1672, 941],
    ],
    cover: [1672, 941],
    tags: ["mobileApp", "uxCaseStudy", "uiDesign", "communityPlatform"],
    figma:
      "https://www.figma.com/design/JUW2Y1EMVeGS7OlswayVSk/Sprout?node-id=15-63&t=V8zTDEl95CzYPNCM-1",
    nextHref: "edu-dashboard.html",
  },
  {
    file: "edu-dashboard.html",
    i18nPage: "project-edu-dashboard",
    slug: "edu-dashboard",
    key: "eduDashboard",
    gallery: [
      [1, 1672, 941],
      [2, 1672, 941],
      [3, 1672, 941],
      [4, 1672, 941],
    ],
    cover: [1672, 941],
    tags: ["webApp", "uxResearch", "uiDesign", "dashboardDesign"],
    figma:
      "https://www.figma.com/design/Gc2wO1UlZJgisncBdREZqg/edu-dashboard?node-id=1-7281&t=TC6iVMGgAlm8V6Qf-1",
    nextHref: "mywfp.html",
  },
  {
    file: "mywfp.html",
    i18nPage: "project-mywfp",
    slug: "mywfp",
    key: "mywfp",
    gallery: [
      [1, 1672, 941],
      [2, 1672, 941],
      [3, 1672, 941],
      [4, 1920, 1080],
      [5, 1920, 1080],
      [6, 1920, 1080],
    ],
    cover: [1672, 941],
    tags: ["mobileApp", "uxResearch", "uiDesign", "caseStudy"],
    figma:
      "https://www.figma.com/design/4qkLUh1atQm72EGXo0qhSk/%D8%A7%D9%84%D8%BA%D8%B0%D8%A7%D8%A1-%D8%A7%D9%84%D8%B9%D8%A7%D9%84%D9%85%D9%8A?node-id=0-1&t=elWxY4J8Iz13kdcz-1",
    nextHref: "trackly.html",
  },
];

function gallerySlides(project) {
  return project.gallery
    .map(([num, w, h]) => {
      const pad = String(num).padStart(2, "0");
      return `              <figure class="h-[300px] w-[calc(100%-3rem)] shrink-0 snap-start sm:w-[calc(50%-0.75rem)] lg:w-[calc((100%-3rem)/3)]" data-gallery-slide data-orientation="landscape">
                <img src="../assets/images/projects/${project.slug}/gallery-${pad}.webp" alt="" class="size-full rounded-[12px] object-cover shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" width="${w}" height="${h}" data-i18n-attr="alt:projects.${project.key}.gallery.alt${pad}">
              </figure>`;
    })
    .join("\n");
}

function tagSpans(project) {
  return project.tags
    .map(
      (tag) =>
        `            <span class="rounded-[12px] bg-icon-box px-4 py-2 text-[12px] font-semibold uppercase leading-3 tracking-[1.2px] text-meta-label" data-i18n="projects.${project.key}.tags.${tag}">${tag}</span>`
    )
    .join("\n");
}

function render(project) {
  const [cw, ch] = project.cover;
  return `<!doctype html>
<html lang="en" dir="ltr" class="font-display" data-i18n-page="${project.i18nPage}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Project | Yara Al-Haddad</title>
  <meta name="description" content="">
  <script>
  (function(){
    var l = localStorage.getItem('yara_lang');
    if (l === 'ar') {
      document.documentElement.lang = 'ar';
      document.documentElement.dir = 'rtl';
      document.documentElement.className = 'font-ar';
    }
  })();
  </script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,600&family=Tajawal:wght@400;500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../assets/css/main.css">
</head>
<body data-page="project" class="bg-cream text-ink antialiased">

  <header class="sticky top-0 z-50 bg-cream px-6 pt-4 lg:px-[70px]">
    <div class="relative mx-auto max-w-page pb-4">
      <div class="grid grid-cols-[1fr_auto] items-center gap-4 rounded-[12px] border border-outline-30 bg-nav-bg px-[25px] py-[17px] shadow-[0_1px_2px_0px_var(--color-nav-shadow)] backdrop-blur-[6px] lg:grid-cols-[1fr_auto_1fr]">
        <a href="../index.html" class="justify-self-start text-[32px] leading-[41.6px] tracking-[-0.025em] text-primary" data-i18n="nav.brandName">Yara Al-Haddad</a>

        <nav class="col-span-2 hidden items-center justify-center gap-8 lg:col-span-1 lg:flex" aria-label="Primary">
          <a href="../index.html" class="px-3 py-1.5 text-sm font-medium tracking-[0.07em] text-muted" data-i18n="nav.home">Home</a>
          <a href="../work.html" class="relative px-3 py-1.5 text-sm font-medium tracking-[0.07em] text-primary" aria-current="page">
            <span data-i18n="nav.work">Work</span>
            <span class="absolute inset-x-0 -bottom-[3.59px] h-px bg-primary"></span>
          </a>
          <a href="../about.html" class="px-3 py-1.5 text-sm font-medium tracking-[0.07em] text-muted" data-i18n="nav.about">About</a>
          <a href="../contact.html" class="px-3 py-1.5 text-sm font-medium tracking-[0.07em] text-muted" data-i18n="nav.contact">Contact</a>
        </nav>

        <div class="hidden items-center justify-end gap-4 lg:flex">
          <a href="../contact.html" data-btn-fill class="btn-fill rounded-lg bg-primary px-6 py-2 text-sm font-medium tracking-[0.07em] text-on-primary">
            <span class="btn-fill__layer" aria-hidden="true"></span>
            <span class="relative z-10" data-i18n="nav.cta">Start a Conversation</span>
          </a>
          <button type="button" class="min-w-[44px] rounded-lg border border-outline-30 px-4 py-2 text-sm font-semibold tracking-[0.12em] text-muted transition-all duration-200 hover:border-primary/35 hover:bg-primary/5 hover:text-primary active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25" data-lang-toggle data-i18n="nav.langToggle" data-i18n-attr="aria-label:nav.langToggleAria" aria-label="Switch to Arabic">AR</button>
        </div>

        <button id="menu-toggle" type="button" class="col-start-2 flex h-9 w-9 items-center justify-center justify-self-end rounded-lg border border-outline-30 lg:hidden" aria-expanded="false" aria-controls="mobile-menu" data-i18n-attr="aria-label:nav.menuOpen" aria-label="Open menu">
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" d="M4 7h16M4 12h16M4 17h16"/></svg>
        </button>
      </div>

      <div id="mobile-menu" class="absolute inset-x-0 top-full z-50 mt-2 hidden rounded-[12px] border border-outline-30 bg-cream p-4 shadow-[0_12px_40px_rgba(0,0,0,0.08)] lg:hidden">
        <nav class="flex flex-col gap-1" aria-label="Mobile">
          <a href="../index.html" class="nav-link-hover rounded-md px-3 py-2 text-sm font-medium tracking-[0.07em] text-muted" data-i18n="nav.home">Home</a>
          <a href="../work.html" class="nav-link-hover rounded-md px-3 py-2 text-sm font-medium tracking-[0.07em] text-primary" data-i18n="nav.work">Work</a>
          <a href="../about.html" class="nav-link-hover rounded-md px-3 py-2 text-sm font-medium tracking-[0.07em] text-muted" data-i18n="nav.about">About</a>
          <a href="../contact.html" class="nav-link-hover rounded-md px-3 py-2 text-sm font-medium tracking-[0.07em] text-muted" data-i18n="nav.contact">Contact</a>
          <div class="mt-2 flex items-stretch gap-2">
            <a href="../contact.html" data-btn-fill class="btn-fill flex-1 rounded-lg bg-primary px-4 py-3 text-center text-sm font-medium tracking-[0.07em] text-on-primary">
              <span class="btn-fill__layer" aria-hidden="true"></span>
              <span class="relative z-10" data-i18n="nav.cta">Start a Conversation</span>
            </a>
            <button type="button" class="shrink-0 rounded-lg border border-outline-30 px-4 py-3 text-sm font-semibold tracking-[0.12em] text-muted transition-all duration-200 hover:border-primary/35 hover:bg-primary/5 hover:text-primary active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25" data-lang-toggle data-i18n="nav.langToggle" data-i18n-attr="aria-label:nav.langToggleAria" aria-label="Switch to Arabic">AR</button>
          </div>
        </nav>
      </div>
    </div>
  </header>

  <main>

    <section class="px-6 py-[60px] lg:px-[70px]" data-hero>
      <div class="mx-auto max-w-page">
        <a href="../work.html" class="link-arrow link-arrow-back mb-5 inline-flex items-center gap-2 text-sm font-medium leading-[19.6px] text-meta-label transition-colors duration-300 hover:text-primary">
          <svg class="size-[10.667px] shrink-0 -scale-x-100 rtl:scale-x-100" viewBox="0 0 9.33333 9.33333" fill="none" aria-hidden="true">
            <path d="M7.10208 5.25H0V4.08333H7.10208L3.83542 0.816667L4.66667 0L9.33333 4.66667L4.66667 9.33333L3.83542 8.51667L7.10208 5.25V5.25" fill="currentColor"/>
          </svg>
          <span data-i18n="projectPage.backLink">All work</span>
        </a>

        <div class="flex flex-col gap-4">
          <h1 data-hero-item class="hero-title text-[32px] font-semibold leading-[1.1] tracking-[-1.12px] text-accent-dark sm:text-[40px] lg:text-[56px] lg:leading-[61.6px]" data-i18n="projects.${project.key}.header.title">Project</h1>
          <p data-hero-item class="hero-description text-[24px] font-semibold leading-[1.3] text-meta-label sm:text-[28px] lg:text-[32px] lg:leading-[41.6px]" data-i18n="projects.${project.key}.header.subtitle">Subtitle</p>
          <p data-hero-item class="hero-actions max-w-[672px] pt-[15px] text-lg leading-[28.8px] tracking-[-0.18px] text-body-muted" data-i18n="projects.${project.key}.header.description">Description</p>

          <div data-hero-item class="hero-badge flex flex-wrap gap-4 border-t border-case-tag-border pt-[25px]">
${tagSpans(project)}
          </div>
        </div>
      </div>
    </section>

    <section class="border-y border-outline-20 bg-case-cover px-6 py-[61px] lg:px-[70px]">
      <div class="mx-auto max-w-page overflow-hidden rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
        <img src="../assets/images/projects/${project.slug}/cover.webp" alt="" class="block w-full h-auto" width="${cw}" height="${ch}" data-i18n-attr="alt:projects.${project.key}.coverAlt">
      </div>
    </section>

    <section class="border-b border-section-border bg-case-cover px-6 pb-[97px] pt-24 lg:px-[70px]">
      <div class="mx-auto flex max-w-page flex-col gap-12">
        <h2 data-reveal class="text-[36px] leading-10 text-case-heading" data-i18n="projectPage.detailsTitle">Project Details</h2>
        <p data-reveal class="text-lg leading-[29.25px] text-case-body" data-i18n="projects.${project.key}.details.body">Details</p>
      </div>
    </section>

    <section class="relative border-b border-section-border bg-cream px-6 pb-[97px] pt-24 lg:px-[70px]">
      <div class="mx-auto max-w-page">
        <h2 data-reveal class="text-[36px] leading-10 text-case-heading" data-i18n="projectPage.galleryTitle">Project Gallery</h2>

        <div class="relative mt-12" data-project-gallery>
          <button type="button" data-gallery-prev class="gallery-nav-btn absolute start-2 top-[150px] z-20 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-[#e5e7eb] bg-white opacity-100 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] transition-[opacity,box-shadow,border-color,transform] duration-300 ease-out hover:border-[#d1d5db] hover:shadow-[0px_4px_12px_rgba(0,0,0,0.08)] active:scale-95 disabled:pointer-events-none disabled:cursor-default disabled:opacity-25 disabled:shadow-none max-sm:hidden lg:-start-5" data-i18n-attr="aria-label:projectPage.prevAria" aria-label="Previous gallery image">
            <img src="../assets/images/icons/gallery-prev.svg" alt="" class="pointer-events-none size-6 gallery-nav-icon" width="24" height="24">
          </button>

          <div class="overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" data-gallery-viewport>
            <div class="flex gap-6" data-gallery-track>
${gallerySlides(project)}
            </div>
          </div>

          <button type="button" data-gallery-next class="gallery-nav-btn absolute end-2 top-[150px] z-20 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-[#e5e7eb] bg-white opacity-100 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] transition-[opacity,box-shadow,border-color,transform] duration-300 ease-out hover:border-[#d1d5db] hover:shadow-[0px_4px_12px_rgba(0,0,0,0.08)] active:scale-95 disabled:pointer-events-none disabled:cursor-default disabled:opacity-25 disabled:shadow-none max-sm:hidden lg:-end-5" data-i18n-attr="aria-label:projectPage.nextAria" aria-label="Next gallery image">
            <img src="../assets/images/icons/gallery-next.svg" alt="" class="pointer-events-none size-6 gallery-nav-icon" width="24" height="24">
          </button>
        </div>

        <div class="mt-12 flex flex-col gap-6 border-t border-case-tag-border pt-[49px] sm:flex-row sm:items-center sm:justify-between">
          <a href="${project.figma}" target="_blank" rel="noopener noreferrer" class="link-arrow inline-flex items-center gap-2 text-base leading-6 text-accent-dark transition-colors duration-300 hover:text-primary">
            <span data-i18n="projectPage.figmaLink">View source in Figma</span>
            <svg class="size-[10.5px] shrink-0 rtl:-scale-x-100" viewBox="0 0 9.33333 9.33333" fill="none" aria-hidden="true">
              <path d="M7.10208 5.25H0V4.08333H7.10208L3.83542 0.816667L4.66667 0L9.33333 4.66667L4.66667 9.33333L3.83542 8.51667L7.10208 5.25V5.25" fill="currentColor"/>
            </svg>
          </a>
          <a href="${project.nextHref}" class="link-arrow inline-flex items-center gap-2 text-2xl font-medium leading-[33.6px] text-ink-strong transition-colors duration-300 hover:text-accent-dark">
            <span data-i18n="projects.${project.key}.nextProject">Next project</span>
            <svg class="size-4 shrink-0 rtl:-scale-x-100" viewBox="0 0 9.33333 9.33333" fill="none" aria-hidden="true">
              <path d="M7.10208 5.25H0V4.08333H7.10208L3.83542 0.816667L4.66667 0L9.33333 4.66667L4.66667 9.33333L3.83542 8.51667L7.10208 5.25V5.25" fill="currentColor"/>
            </svg>
          </a>
        </div>
      </div>
    </section>

    <section class="bg-surface-warm px-6 py-[60px] lg:px-[70px]">
      <div class="relative mx-auto max-w-page overflow-hidden rounded-[24px] border border-outline-30 bg-cta-surface p-8 text-center sm:p-12 lg:p-[97px]">
        <div class="pointer-events-none absolute -start-12 -top-12 size-48 rounded-full border border-outline opacity-50" aria-hidden="true"></div>
        <div class="pointer-events-none absolute -bottom-24 -end-24 size-64 rounded-full border border-outline opacity-50" aria-hidden="true"></div>
        <h2 data-reveal class="relative mx-auto max-w-[946px] text-[32px] leading-[1.2] text-ink sm:text-[48px] lg:leading-[48px]" data-i18n="projectPage.ctaTitle">Ready to build something structured and calm?</h2>
        <div data-reveal class="relative mt-8 flex flex-wrap items-center justify-center gap-6">
          <a href="../contact.html" data-btn-fill class="btn-fill rounded bg-primary px-8 py-4 text-sm font-medium tracking-[0.07em] text-cta-button-text shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
            <span class="btn-fill__layer" aria-hidden="true"></span>
            <span class="relative z-10" data-i18n="projectPage.ctaButton">Start a Conversation</span>
          </a>
          <a href="../work.html" class="link-arrow inline-flex items-center gap-2 text-sm font-medium tracking-[0.07em] text-cta-link underline decoration-[rgba(215,194,191,0.5)] underline-offset-2 transition-colors duration-300 hover:text-primary hover:decoration-primary/50">
            <span data-i18n="projectPage.ctaLink">View selected work</span>
            <svg class="size-3 shrink-0 rtl:-scale-x-100" viewBox="0 0 9.33333 9.33333" fill="none" aria-hidden="true">
              <path d="M7.10208 5.25H0V4.08333H7.10208L3.83542 0.816667L4.66667 0L9.33333 4.66667L4.66667 9.33333L3.83542 8.51667L7.10208 5.25V5.25" fill="currentColor"/>
            </svg>
          </a>
        </div>
      </div>
    </section>

  </main>

  <footer class="w-full bg-surface-warm px-6 pt-10 lg:px-[70px]">
    <div class="mx-auto w-full max-w-page shrink-0 rounded-t-[12px] border border-b-0 border-outline-20 bg-cream px-8 pb-6 pt-[25px]">
      <div class="flex flex-col items-center gap-5 text-center lg:grid lg:w-full lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-6 lg:text-start">
        <span class="shrink-0 text-[32px] font-medium leading-[41.6px] text-primary lg:justify-self-start" data-i18n="footer.brandName">Yara Al-Haddad</span>
        <div class="flex flex-col items-center gap-3 lg:flex-row lg:justify-center lg:gap-6">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="text-sm font-medium tracking-[0.07em] text-muted transition-colors duration-300 hover:text-primary" data-i18n="footer.linkedin">LinkedIn</a>
          <a href="https://behance.net" target="_blank" rel="noopener noreferrer" class="text-sm font-medium tracking-[0.07em] text-muted transition-colors duration-300 hover:text-primary" data-i18n="footer.behance">Behance</a>
          <button type="button" class="font-ar text-sm font-medium tracking-[0.07em] text-muted transition-colors duration-300 hover:text-primary" data-lang-toggle data-i18n="footer.langToggle" data-i18n-attr="aria-label:footer.langToggleAria" aria-label="Switch to Arabic">العربية</button>
        </div>
        <p class="shrink-0 text-sm leading-5 text-muted-soft lg:justify-self-end lg:text-end" data-i18n="footer.copyright">© 2024 Yara Al-Haddad. All rights reserved.</p>
      </div>
    </div>
  </footer>

  <script src="../assets/js/i18n.js"></script>
  <script src="../assets/js/main.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/ScrollTrigger.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/lenis@1.3.23/dist/lenis.min.js"></script>
  <script src="../assets/js/gsap-init.js"></script>
</body>
</html>
`;
}

await mkdir(OUT, { recursive: true });

for (const project of PROJECTS) {
  const html = render(project);
  await writeFile(path.join(OUT, project.file), html, "utf8");
  console.log("Wrote", project.file);
}

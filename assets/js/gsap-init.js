/**
 * yara-portfolio — GSAP Editorial init
 * CDN: gsap@3.14.2, ScrollTrigger, lenis@1.3.23
 * Skill: .claude/skills/gsap-editorial/
 */
;(function () {
  'use strict'

  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return

  gsap.registerPlugin(ScrollTrigger)

  let lenis = null
  let ctx = null

  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }

  function getPage() {
    return document.body.dataset.page || document.documentElement.dataset.i18nPage || ''
  }

  // ── 1. Lenis ──────────────────────────────────────────

  function initLenis() {
    if (typeof Lenis === 'undefined' || prefersReducedMotion()) return

    lenis = new Lenis({
      lerp: 0.1,
      autoRaf: false,
      syncTouch: false,
      touchMultiplier: 1.2,
    })

    gsap.ticker.add(function (time) {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop: function (value) {
        if (arguments.length) {
          lenis.scrollTo(value, { immediate: true })
        }
        var nativeScroll = window.scrollY || document.documentElement.scrollTop
        return Math.abs(lenis.scroll - nativeScroll) > 2 ? nativeScroll : lenis.scroll
      },
      getBoundingClientRect: function () {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        }
      },
    })

    lenis.on('scroll', ScrollTrigger.update)
    window.addEventListener('scroll', ScrollTrigger.update, { passive: true })
    ScrollTrigger.addEventListener('refresh', function () {
      lenis.resize()
    })

    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var href = a.getAttribute('href')
        if (!href || href === '#') return
        var target = document.querySelector(href)
        if (!target) return
        e.preventDefault()
        if (lenis) {
          lenis.scrollTo(target, { offset: -88 })
        } else {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      })
    })
  }

  // ── 2. Pre-hide ───────────────────────────────────────

  function preHide() {
    var page = getPage()

    gsap.set('[data-hero-item]', { opacity: 0, y: 36 })
    gsap.set('[data-reveal]:not([data-section] [data-reveal]):not([data-experience-row])', {
      opacity: 0,
      y: 36,
      scale: 0.97,
    })
    gsap.set('[data-page-banner] [data-reveal]', { scale: 1, transformOrigin: 'left center' })

    if (page !== 'about') {
      gsap.set('[data-accent]', { opacity: 0, y: 24 })
    }

    var heroImage = document.querySelector('[data-hero] .hero-image')
    if (heroImage) gsap.set(heroImage, { scale: 0.92 })

    if (page === 'home' || page === 'about') {
      gsap.set('[data-experience-row]', { opacity: 0, y: 28 })
    }
  }

  function showAllStatic() {
    gsap.set('[data-hero-item], [data-reveal], [data-accent], [data-banner-item]', {
      opacity: 1,
      y: 0,
      scale: 1,
      clearProps: 'transform',
    })
    gsap.set('.about-badge, .about-title, .about-bio, .about-link, .about-meta, .about-photo', {
      opacity: 1,
      y: 0,
      scale: 1,
      clearProps: 'transform',
    })
    gsap.set('.methodology-step, .methodology-mobile-step, [data-experience-row]', {
      opacity: 1,
      y: 0,
      scale: 1,
      clearProps: 'transform',
    })
    var methodologyMask = document.querySelector('[data-methodology-mask]')
    if (methodologyMask) {
      var len = methodologyMask.getTotalLength()
      gsap.set(methodologyMask, {
        strokeDasharray: len + ' ' + len,
        strokeDashoffset: 0,
      })
    }
  }

  // ── 3. Patterns ───────────────────────────────────────

  function initHeroTimeline() {
    var hero = document.querySelector('[data-hero]')
    if (!hero) return

    var items = hero.querySelectorAll('[data-hero-item]')
    if (!items.length) return

    var image = hero.querySelector('.hero-image')
    if (image) gsap.set(image, { scale: 0.92 })

    var tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    var position = 0

    items.forEach(function (item, index) {
      var isImage = item.classList.contains('hero-image')
      var duration = isImage ? 0.85 : index === 0 ? 0.55 : index === 1 ? 0.7 : 0.55
      var overlap = index === 0 ? 0 : index === 1 ? '-=0.35' : index === items.length - 1 && isImage ? '-=0.8' : '-=0.35'

      if (isImage) {
        tl.to(item, { y: 0, scale: 1, opacity: 1, duration: duration }, overlap)
      } else {
        tl.to(item, { y: 0, opacity: 1, duration: duration }, overlap)
      }
      position = index
    })

    tl.add(function () {
      initAmbientFloat()
    })
  }

  function initBatchReveal() {
    var els = document.querySelectorAll('[data-reveal]')
    var standalone = []
    els.forEach(function (el) {
      if (
        el.hasAttribute('data-experience-row') ||
        el.closest('[data-section]') ||
        el.closest('.methodology-track') ||
        el.closest('.methodology-track-mobile') ||
        el.closest('[data-page-banner]') ||
        el.closest('[data-about-hero]')
      ) {
        return
      }
      standalone.push(el)
    })
    if (!standalone.length) return

    ScrollTrigger.batch(standalone, {
      start: 'top 68%',
      once: true,
      onEnter: function (batch) {
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.75,
          stagger: 0.1,
          ease: 'power3.out',
          overwrite: true,
        })
      },
    })
  }

  function initSoftParallax() {
    var target = document.querySelector('[data-parallax]')
    if (!target) return

    var trigger = target.closest('section') || document.querySelector('[data-hero]')
    if (!trigger) return

    gsap.to(target, {
      yPercent: -8,
      ease: 'none',
      scrollTrigger: {
        trigger: trigger,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })
  }

  function initAmbientFloat() {
    var el = document.querySelector('[data-ambient]')
    if (!el) return

    gsap.to(el, {
      y: -12,
      duration: 2.8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
  }

  function initScrollIndicator() {
    var hero = document.querySelector('[data-hero]')
    var indicator = document.querySelector('.hero-scroll-indicator')
    if (!hero || !indicator) return

    gsap.to(indicator, {
      autoAlpha: 0,
      y: 18,
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'top+=220 top',
        scrub: true,
      },
    })

    gsap.to('.hero-scroll-dot', {
      y: 8,
      duration: 0.95,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
  }

  function initNavMicro() {
    document.querySelectorAll('header nav[aria-label="Primary"] a').forEach(function (link) {
      if (link.getAttribute('aria-current') === 'page') return
      if (link.querySelector('.absolute.inset-x-0')) return

      var underline = document.createElement('span')
      underline.className =
        'nav-link-underline pointer-events-none absolute inset-x-0 -bottom-[3.59px] block h-px origin-left scale-x-0 bg-primary rtl:origin-right'
      link.classList.add('relative')
      link.appendChild(underline)

      link.addEventListener('mouseenter', function () {
        gsap.to(underline, { scaleX: 1, duration: 0.3, ease: 'power3.out' })
        gsap.to(link, { color: '#87504b', duration: 0.3, ease: 'power2.out' })
      })
      link.addEventListener('mouseleave', function () {
        gsap.to(underline, { scaleX: 0, duration: 0.25, ease: 'power2.in' })
        gsap.to(link, { color: '#625f54', duration: 0.3, ease: 'power2.out' })
      })
    })
  }

  function initButtonFill() {
    if (prefersReducedMotion()) return

    var hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches

    document.querySelectorAll('[data-btn-fill]').forEach(function (btn) {
      var layer = btn.querySelector('.btn-fill__layer')
      if (!layer) return

      gsap.set(layer, {
        left: '50%',
        top: '50%',
        xPercent: -50,
        yPercent: -50,
        scale: 0,
        opacity: 0,
        transformOrigin: '50% 50%',
      })

      function moveLayer(clientX, clientY) {
        var rect = btn.getBoundingClientRect()
        var x = clientX - rect.left
        var y = clientY - rect.top
        gsap.to(layer, {
          left: x,
          top: y,
          xPercent: -50,
          yPercent: -50,
          duration: 0.45,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      }

      btn.addEventListener('mouseenter', function (e) {
        moveLayer(e.clientX, e.clientY)
        gsap.to(layer, { scale: 2.5, opacity: 1, duration: 0.45, ease: 'power3.out' })
      })

      if (hasHover) {
        btn.addEventListener('mousemove', function (e) {
          moveLayer(e.clientX, e.clientY)
        })
      }

      btn.addEventListener('mouseleave', function () {
        gsap.to(layer, { scale: 0, opacity: 0, duration: 0.35, ease: 'power2.in' })
      })

      if (!hasHover) {
        btn.addEventListener('touchstart', function () {
          gsap.set(layer, { left: '50%', top: '50%', xPercent: -50, yPercent: -50 })
          gsap.to(layer, { scale: 2.5, opacity: 1, duration: 0.35, ease: 'power3.out' })
        })
        btn.addEventListener('touchend', function () {
          gsap.to(layer, { scale: 0, opacity: 0, duration: 0.35, ease: 'power2.in', delay: 0.15 })
        })
      }
    })
  }

  function initExperienceRows() {
    var rows = document.querySelectorAll('[data-experience-row]')
    if (!rows.length) return

    gsap.set(rows, { opacity: 0, y: 28 })

    rows.forEach(function (row) {
      ScrollTrigger.create({
        trigger: row,
        start: function () {
          return getSectionEnterStart(row, 'top 82%')
        },
        invalidateOnRefresh: true,
        once: true,
        onEnter: function () {
          gsap.to(row, {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: 'power3.out',
          })
        },
      })
    })
  }

  function initNumberedSections() {
    document.querySelectorAll('[data-section]').forEach(function (section) {
      var items = section.querySelectorAll('[data-reveal]')
      if (!items.length) return

      gsap.set(items, { opacity: 0, y: 36 })

      ScrollTrigger.create({
        trigger: section,
        start: 'top 75%',
        once: true,
        onEnter: function () {
          gsap.to(items, {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.1,
            ease: 'power3.out',
          })
        },
      })
    })
  }

  function initItalicAccent() {
    var accents = document.querySelectorAll('[data-accent]')
    if (!accents.length) return

    gsap.set(accents, { opacity: 0, y: 24 })

    ScrollTrigger.batch(accents, {
      start: 'top 80%',
      once: true,
      onEnter: function (els) {
        gsap.to(els, {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.08,
          ease: 'power3.out',
        })
      },
    })
  }

  function getSectionEnterStart(el, defaultStart) {
    defaultStart = defaultStart || 'top 75%'
    var rect = el.getBoundingClientRect()
    var vh = window.innerHeight

    if (rect.top >= vh * 0.75) return defaultStart

    // Partially visible on load (common on mobile) — trigger just above current top edge
    var pct = Math.floor((rect.top / vh) * 100) - 2
    pct = Math.max(45, Math.min(pct, 74))
    return 'top ' + pct + '%'
  }

  function initAboutBanner() {
    var banner = document.querySelector('[data-page-banner]')
    if (!banner) return

    var items = banner.querySelectorAll('[data-banner-item]')
    var accent = banner.querySelector('[data-accent]')
    if (!items.length) return

    gsap.set(items, { opacity: 0, y: 32 })
    if (accent) gsap.set(accent, { opacity: 0, y: 18 })

    var tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.to(items[0], { opacity: 1, y: 0, duration: 0.5 })
    tl.to(items[1], { opacity: 1, y: 0, duration: 0.75 }, '-=0.28')
    if (accent) tl.to(accent, { opacity: 1, y: 0, duration: 0.55 }, '-=0.45')
    if (items[2]) tl.to(items[2], { opacity: 1, y: 0, duration: 0.55 }, '-=0.35')
    if (items[3]) tl.to(items[3], { opacity: 1, y: 0, duration: 0.45 }, '-=0.25')
  }

  function initAboutHero() {
    var hero = document.querySelector('[data-about-hero]')
    if (!hero) return

    var accent = hero.querySelector('[data-accent]')
    var photo = hero.querySelector('.about-photo')
    var items = [
      hero.querySelector('.about-badge'),
      hero.querySelector('.about-title'),
      accent,
      hero.querySelector('.about-bio'),
      hero.querySelector('.about-link'),
      hero.querySelector('.about-meta'),
      photo,
    ].filter(Boolean)

    gsap.set(items, { opacity: 0, y: 36 })
    if (photo) gsap.set(photo, { scale: 0.96 })

    ScrollTrigger.create({
      trigger: hero,
      start: function () {
        return getSectionEnterStart(hero)
      },
      invalidateOnRefresh: true,
      once: true,
      onEnter: function () {
        gsap.to(items, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.65,
          stagger: 0.1,
          ease: 'power3.out',
        })
      },
    })
  }

  function initAboutSections() {
    document.querySelectorAll('[data-section]').forEach(function (section) {
      var items = section.querySelectorAll('[data-reveal]')
      if (!items.length) return

      gsap.set(items, { opacity: 0, y: 36 })

      ScrollTrigger.create({
        trigger: section,
        start: 'top 75%',
        once: true,
        onEnter: function () {
          gsap.to(items, {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.1,
            ease: 'power3.out',
          })
        },
      })
    })
  }

  function initAboutAnimations() {
    initAboutBanner()
    initAboutHero()
    initAboutSections()
    initBatchReveal()
  }

  function initPageBannerReveal() {
    var banner = document.querySelector('[data-page-banner]')
    if (!banner) return

    var items = banner.querySelectorAll('[data-reveal]')
    if (!items.length) return

    gsap.set(items, { opacity: 0, y: 36, scale: 1, transformOrigin: 'left center' })

    ScrollTrigger.create({
      trigger: banner,
      start: 'top 85%',
      once: true,
      onEnter: function () {
        gsap.to(items, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.65,
          stagger: 0.1,
          ease: 'power3.out',
        })
      },
    })
  }

  function initMethodologyPath() {
    var section = document.querySelector('#process')
    if (!section) return

    var isDesktop = window.matchMedia('(min-width: 1024px)').matches

    if (!isDesktop) {
      var mobileSteps = section.querySelectorAll('.methodology-mobile-step')
      if (!mobileSteps.length) return

      gsap.set(mobileSteps, { opacity: 0, y: 28 })
      mobileSteps.forEach(function (step) {
        ScrollTrigger.create({
          trigger: step,
          start: function () {
            return getSectionEnterStart(step, 'top 88%')
          },
          invalidateOnRefresh: true,
          once: true,
          onEnter: function () {
            gsap.to(step, {
              opacity: 1,
              y: 0,
              duration: 0.62,
              ease: 'power3.out',
            })
          },
        })
      })
      return
    }

    var track = document.querySelector('.methodology-track')
    if (!section || !track) return

    var svg = track.querySelector('[data-methodology-svg]')
    var maskPath = track.querySelector('[data-methodology-mask]')
    var steps = track.querySelectorAll('.methodology-step')
    if (!steps.length) return

    if (!svg || !maskPath) return

    gsap.set(steps, { opacity: 0, y: 18, scale: 0.96, transformOrigin: '50% 40px' })

    function getStepProgress(step) {
      var icon = step.querySelector('.rounded-full')
      if (!icon) return 0

      var ctm = svg.getScreenCTM()
      if (!ctm) return 0

      var rect = icon.getBoundingClientRect()
      var point = svg.createSVGPoint()
      point.x = rect.left + rect.width / 2
      point.y = rect.top + rect.height / 2
      var svgPoint = point.matrixTransform(ctm.inverse())

      var len = maskPath.getTotalLength()
      var closest = 0
      var minDist = Infinity
      for (var i = 0; i <= len; i += 3) {
        var at = maskPath.getPointAtLength(i)
        var dx = at.x - svgPoint.x
        var dy = at.y - svgPoint.y
        var dist = dx * dx + dy * dy
        if (dist < minDist) {
          minDist = dist
          closest = i
        }
      }

      return closest / len
    }

    function setupDesktopPath() {
      var pathLength = maskPath.getTotalLength()
      var drawDuration = 3.2

      gsap.set(maskPath, {
        strokeDasharray: pathLength + ' ' + pathLength,
        strokeDashoffset: pathLength,
      })
      gsap.set(steps, { opacity: 0, y: 18, scale: 0.96, transformOrigin: '50% 40px' })

      var stepProgress = []
      steps.forEach(function (step) {
        stepProgress.push(getStepProgress(step))
      })

      var tl = gsap.timeline({
        paused: true,
        scrollTrigger: {
          trigger: section,
          start: 'top 72%',
          toggleActions: 'play none none none',
          once: true,
          invalidateOnRefresh: true,
        },
      })

      tl.to(
        maskPath,
        {
          strokeDashoffset: 0,
          ease: 'none',
          duration: drawDuration,
        },
        0,
      )

      steps.forEach(function (step, index) {
        var atTime = index === 0 ? 0 : stepProgress[index] * drawDuration * 0.98
        tl.to(
          step,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.55,
            ease: 'power3.out',
          },
          atTime,
        )
      })

      ScrollTrigger.refresh()

      // If section already in view (e.g. #process hash), play without extra scroll
      if (tl.progress() === 0) {
        var rect = section.getBoundingClientRect()
        if (rect.top < window.innerHeight * 0.88 && rect.bottom > 0) {
          tl.play()
        }
      }
    }

    if (document.readyState === 'complete') {
      setupDesktopPath()
    } else {
      window.addEventListener('load', setupDesktopPath, { once: true })
    }
  }

  // ── 4. Page router ────────────────────────────────────

  function initPageAnimations() {
    if (prefersReducedMotion()) {
      showAllStatic()
      return
    }

    preHide()

    var page = getPage()

    initNavMicro()
    initButtonFill()

    switch (page) {
      case 'home':
        initHeroTimeline()
        initSoftParallax()
        initScrollIndicator()
        initMethodologyPath()
        initExperienceRows()
        initBatchReveal()
        break
      case 'work':
        initPageBannerReveal()
        initBatchReveal()
        break
      case 'project':
        initHeroTimeline()
        initBatchReveal()
        break
      case 'about':
        initAboutAnimations()
        initExperienceRows()
        break
      case 'contact':
        initPageBannerReveal()
        initBatchReveal()
        break
      default:
        initBatchReveal()
    }
  }

  // ── 5. Refresh ────────────────────────────────────────

  function refreshScrollTriggers() {
    ScrollTrigger.refresh()
  }

  function initScrollRefresh() {
    var resizeTimer

    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(refreshScrollTriggers, 150)
    })

    window.addEventListener('orientationchange', function () {
      setTimeout(refreshScrollTriggers, 250)
    })
  }

  // ── Boot ──────────────────────────────────────────────

  document.addEventListener('DOMContentLoaded', function () {
    initLenis()
    ctx = gsap.context(function () {
      initPageAnimations()
    })
    initScrollRefresh()
    document.fonts.ready.then(refreshScrollTriggers)
    window.addEventListener('load', refreshScrollTriggers)
  })

  window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', function (e) {
    if (e.matches) {
      if (ctx) ctx.revert()
      ScrollTrigger.getAll().forEach(function (st) {
        st.kill()
      })
      showAllStatic()
      if (lenis) {
        lenis.destroy()
        lenis = null
      }
    }
  })

  window.__gsapCleanup = function () {
    if (ctx) ctx.revert()
    ScrollTrigger.getAll().forEach(function (st) {
      st.kill()
    })
    if (lenis) lenis.destroy()
  }
})()

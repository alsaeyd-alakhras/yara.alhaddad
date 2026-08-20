(function () {
  "use strict";

  function initMobileMenu() {
    var toggle = document.getElementById("menu-toggle");
    var menu = document.getElementById("mobile-menu");
    if (!toggle || !menu) return;

    toggle.addEventListener("click", function () {
      var isHidden = menu.classList.toggle("hidden");
      toggle.setAttribute("aria-expanded", isHidden ? "false" : "true");
    });
  }

  function initProjectGallery() {
    var root = document.querySelector("[data-project-gallery]");
    if (!root) return;

    var viewport = root.querySelector("[data-gallery-viewport]");
    var track = root.querySelector("[data-gallery-track]");
    var prev = root.querySelector("[data-gallery-prev]");
    var next = root.querySelector("[data-gallery-next]");
    if (!viewport || !track || !prev || !next) return;

    var slides = track.querySelectorAll("[data-gallery-slide]");
    if (!slides.length) return;

    var isAnimating = false;
    var activePageIndex = 0;
    var SCROLL_DURATION = 850;
    var SLIDE_GAP = 24;

    function syncViewportDir() {
      viewport.setAttribute("dir", document.documentElement.dir || "ltr");
    }

    function prefersReducedMotion() {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }

    /** How many slides fit in the viewport at once (1 mobile, 2 tablet, 3 desktop). */
    function getVisibleStep() {
      var viewWidth = viewport.clientWidth;
      var count = 0;
      var used = 0;

      for (var i = 0; i < slides.length; i++) {
        var width = slides[i].offsetWidth;

        if (count > 0) used += SLIDE_GAP;
        if (used + width > viewWidth + 1) break;

        used += width;
        count++;
      }

      return Math.max(1, count);
    }

    /** Slide index anchors for each gallery page (logical order: first → last). */
    function getPageAnchors() {
      var step = getVisibleStep();
      var anchors = [0];

      if (slides.length <= step) return anchors;

      for (var i = step; i < slides.length; i += step) {
        if (i >= slides.length - step) {
          if (anchors[anchors.length - 1] !== slides.length - 1) {
            anchors.push(slides.length - 1);
          }
          break;
        }

        anchors.push(i);
      }

      if (anchors[anchors.length - 1] !== slides.length - 1 && slides.length > step) {
        anchors.push(slides.length - 1);
      }

      return anchors;
    }

    function scrollToSlide(slideIndex, inlineAlign, onComplete) {
      var slide = slides[slideIndex];
      if (!slide) {
        if (onComplete) onComplete();
        return;
      }

      if (prefersReducedMotion()) {
        slide.scrollIntoView({ behavior: "auto", inline: inlineAlign, block: "nearest" });
        if (onComplete) onComplete();
        return;
      }

      isAnimating = true;
      slide.scrollIntoView({ behavior: "smooth", inline: inlineAlign, block: "nearest" });

      window.setTimeout(function () {
        isAnimating = false;
        if (onComplete) onComplete();
      }, SCROLL_DURATION);
    }

    function updateButtons() {
      var anchors = getPageAnchors();
      var atStart = activePageIndex <= 0;
      var atEnd = activePageIndex >= anchors.length - 1;

      prev.disabled = atStart;
      next.disabled = atEnd;
      prev.setAttribute("aria-disabled", atStart ? "true" : "false");
      next.setAttribute("aria-disabled", atEnd ? "true" : "false");
    }

    function goToPage(pageIndex) {
      if (isAnimating) return;

      var anchors = getPageAnchors();
      var targetIndex = Math.max(0, Math.min(anchors.length - 1, pageIndex));
      activePageIndex = targetIndex;

      var slideIndex = anchors[targetIndex];
      var isLastPage =
        targetIndex === anchors.length - 1 && slideIndex === slides.length - 1;

      scrollToSlide(slideIndex, isLastPage ? "end" : "start", function () {
        activePageIndex = targetIndex;
        updateButtons();
      });
      updateButtons();
    }

    function goNext() {
      if (isAnimating) return;

      var anchors = getPageAnchors();

      if (activePageIndex >= anchors.length - 1) return;
      goToPage(activePageIndex + 1);
    }

    function goPrev() {
      if (isAnimating) return;

      if (activePageIndex <= 0) return;
      goToPage(activePageIndex - 1);
    }

    function scrollToStart() {
      activePageIndex = 0;
      scrollToSlide(0, "start", updateButtons);
      updateButtons();
    }

    function clampToNearestPage() {
      if (isAnimating) return;
      goToPage(activePageIndex);
    }

    syncViewportDir();

    slides.forEach(function (slide) {
      var img = slide.querySelector("img");
      if (!img) return;

      function applyOrientation() {
        var isPortrait = img.naturalHeight > img.naturalWidth;
        slide.setAttribute("data-orientation", isPortrait ? "portrait" : "landscape");
        slide.classList.remove(
          "w-[calc(100%-3rem)]",
          "sm:w-[calc(50%-0.75rem)]",
          "lg:w-[calc((100%-3rem)/3)]",
          "w-[220px]",
          "sm:w-[220px]",
          "lg:w-[220px]"
        );

        if (isPortrait) {
          slide.classList.add("w-[220px]", "sm:w-[220px]", "lg:w-[220px]");
        } else {
          slide.classList.add(
            "w-[calc(100%-3rem)]",
            "sm:w-[calc(50%-0.75rem)]",
            "lg:w-[calc((100%-3rem)/3)]"
          );
        }

        if (!isAnimating) {
          clampToNearestPage();
        } else {
          updateButtons();
        }
      }

      if (img.complete) applyOrientation();
      else img.addEventListener("load", applyOrientation);
    });

    prev.addEventListener("click", goPrev);
    next.addEventListener("click", goNext);

    window.addEventListener("resize", function () {
      if (!isAnimating) {
        clampToNearestPage();
      } else {
        updateButtons();
      }
    });

    document.documentElement.addEventListener("yara:langchange", function () {
      syncViewportDir();
      scrollToStart();
    });

    updateButtons();
  }

  document.addEventListener("DOMContentLoaded", function () {
    if (window.YaraI18n) {
      window.YaraI18n.init();
    }
    initMobileMenu();
    initProjectGallery();
  });
})();

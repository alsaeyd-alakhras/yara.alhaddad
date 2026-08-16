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
    var scrollSyncTimer = null;
    var SCROLL_DURATION = 850;
    var SCROLL_EPSILON = 4;

    function easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function getMaxScroll() {
      return Math.max(0, track.scrollWidth - viewport.clientWidth);
    }

    /** How many slides fit in the viewport at once (1 mobile, 2 tablet, 3 desktop). */
    function getVisibleStep() {
      var viewWidth = viewport.clientWidth;
      var count = 0;

      for (var i = 0; i < slides.length; i++) {
        var slide = slides[i];
        if (slide.offsetLeft + slide.offsetWidth <= viewWidth + 1) {
          count++;
        } else {
          break;
        }
      }

      return Math.max(1, count);
    }

    /** Page stops: jump by visible batch, last page snaps to the end. */
    function getPagePositions() {
      var step = getVisibleStep();
      var maxScroll = getMaxScroll();
      var positions = [0];

      if (maxScroll <= 0) return positions;

      for (var i = step; i < slides.length; i += step) {
        var isLastBatch = i >= slides.length - step;

        if (isLastBatch) {
          if (maxScroll > positions[positions.length - 1] + SCROLL_EPSILON) {
            positions.push(maxScroll);
          }
          break;
        }

        positions.push(slides[i].offsetLeft);
      }

      var lastPosition = positions[positions.length - 1];
      if (maxScroll > lastPosition + SCROLL_EPSILON) {
        positions.push(maxScroll);
      }

      return positions;
    }

    function getCurrentPageIndex(positions) {
      var scrollLeft = viewport.scrollLeft;
      var current = 0;

      for (var i = 0; i < positions.length; i++) {
        if (positions[i] <= scrollLeft + SCROLL_EPSILON) {
          current = i;
        }
      }

      return current;
    }

    function smoothScrollTo(targetLeft, onComplete) {
      if (isAnimating) return;

      var startLeft = viewport.scrollLeft;
      var distance = targetLeft - startLeft;

      if (Math.abs(distance) < 1) {
        if (onComplete) onComplete();
        return;
      }

      isAnimating = true;
      var startTime = null;

      function step(timestamp) {
        if (!startTime) startTime = timestamp;

        var elapsed = timestamp - startTime;
        var progress = Math.min(elapsed / SCROLL_DURATION, 1);
        viewport.scrollLeft = startLeft + distance * easeInOutCubic(progress);

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          viewport.scrollLeft = targetLeft;
          isAnimating = false;
          if (onComplete) onComplete();
        }
      }

      requestAnimationFrame(step);
    }

    function updateButtons() {
      var positions = getPagePositions();
      var pageIndex = getCurrentPageIndex(positions);
      var atStart = pageIndex <= 0;
      var atEnd = pageIndex >= positions.length - 1;

      prev.disabled = atStart;
      next.disabled = atEnd;
      prev.setAttribute("aria-disabled", atStart ? "true" : "false");
      next.setAttribute("aria-disabled", atEnd ? "true" : "false");
    }

    function goToPage(pageIndex) {
      var positions = getPagePositions();
      var targetIndex = Math.max(0, Math.min(positions.length - 1, pageIndex));
      var targetLeft = positions[targetIndex];

      smoothScrollTo(targetLeft, updateButtons);
      updateButtons();
    }

    function goNext() {
      if (isAnimating) return;

      var positions = getPagePositions();
      var pageIndex = getCurrentPageIndex(positions);

      if (pageIndex >= positions.length - 1) return;
      goToPage(pageIndex + 1);
    }

    function goPrev() {
      if (isAnimating) return;

      var positions = getPagePositions();
      var pageIndex = getCurrentPageIndex(positions);

      if (pageIndex <= 0) return;
      goToPage(pageIndex - 1);
    }

    function clampToNearestPage() {
      if (isAnimating) return;

      var positions = getPagePositions();
      var pageIndex = getCurrentPageIndex(positions);
      var targetLeft = positions[pageIndex];

      if (Math.abs(viewport.scrollLeft - targetLeft) > SCROLL_EPSILON) {
        viewport.scrollLeft = targetLeft;
      }

      updateButtons();
    }

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

    viewport.addEventListener(
      "scroll",
      function () {
        if (isAnimating) return;

        clearTimeout(scrollSyncTimer);
        scrollSyncTimer = setTimeout(updateButtons, 120);
      },
      { passive: true }
    );

    window.addEventListener("resize", function () {
      if (!isAnimating) {
        clampToNearestPage();
      } else {
        updateButtons();
      }
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

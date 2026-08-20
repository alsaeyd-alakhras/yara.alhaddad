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

  function initWhatsAppFloat() {
    if (document.querySelector("[data-whatsapp-float]")) return;

    var root = document.createElement("div");
    root.className = "whatsapp-float fixed bottom-6 end-6 z-50";
    root.setAttribute("data-whatsapp-float", "");
    root.innerHTML =
      '<a href="https://wa.me/972598241068" ' +
      'target="_blank" rel="noopener noreferrer" ' +
      'class="whatsapp-float__link group flex flex-row-reverse items-center gap-3 outline-none" ' +
      'data-whatsapp-link data-whatsapp-phone="972598241068" ' +
      'data-i18n-attr="aria-label:whatsapp.aria">' +
      '<span class="relative shrink-0">' +
      '<span class="whatsapp-float__btn relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] shadow-lg">' +
      '<svg viewBox="0 0 24 24" class="h-7 w-7 text-white" fill="currentColor" aria-hidden="true">' +
      '<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path>' +
      "</svg></span>" +
      '<span class="absolute -top-1 -end-1 h-4 w-4 rounded-full border-2 border-white bg-red-500" aria-hidden="true"></span>' +
      "</span>" +
      '<span class="whatsapp-float__label" data-i18n="whatsapp.label">Contact via WhatsApp</span>' +
      "</a>";

    document.body.appendChild(root);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var boot = window.YaraI18n ? window.YaraI18n.init() : Promise.resolve();

    boot.then(function () {
      initWhatsAppFloat();
      if (window.YaraI18n) {
        window.YaraI18n.applyTranslations();
      }
    });

    initMobileMenu();
    initProjectGallery();
  });
})();

(function () {
  "use strict";

  var STORAGE_KEY = "yara_lang";
  var DEFAULT_LANG = "en";
  var SUPPORTED = { en: true, ar: true };

  var currentLang = DEFAULT_LANG;
  var dict = null;
  var initialized = false;

  function getStoredLang() {
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      return SUPPORTED[stored] ? stored : DEFAULT_LANG;
    } catch (err) {
      return DEFAULT_LANG;
    }
  }

  function getLang() {
    return currentLang;
  }

  function lookup(key) {
    if (!dict || !key) return undefined;

    var parts = key.split(".");
    var value = dict;

    for (var i = 0; i < parts.length; i++) {
      if (value == null || typeof value !== "object") return undefined;
      value = value[parts[i]];
    }

    return typeof value === "string" ? value : undefined;
  }

  function t(key) {
    return lookup(key) || key;
  }

  function applyDocumentLang(lang) {
    var html = document.documentElement;
    html.lang = lang;
    html.dir = lang === "ar" ? "rtl" : "ltr";
    html.classList.remove("font-display", "font-ar");
    html.classList.add(lang === "ar" ? "font-ar" : "font-display");
  }

  function applyMeta() {
    var page = document.documentElement.getAttribute("data-i18n-page");
    if (!page) return;

    var title = lookup("meta." + page + ".title");
    var description = lookup("meta." + page + ".description");

    if (title) document.title = title;

    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && description) metaDesc.setAttribute("content", description);
  }

  function applyTranslations() {
    if (!dict) return;

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      var value = lookup(key);
      if (value != null) el.textContent = value;
    });

    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-html");
      var value = lookup(key);
      if (value != null) el.innerHTML = value;
    });

    document.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      var spec = el.getAttribute("data-i18n-attr");
      if (!spec) return;

      spec.split(";").forEach(function (pair) {
        var trimmed = pair.trim();
        if (!trimmed) return;

        var colon = trimmed.indexOf(":");
        if (colon === -1) return;

        var attr = trimmed.slice(0, colon).trim();
        var key = trimmed.slice(colon + 1).trim();
        var value = lookup(key);

        if (value != null) el.setAttribute(attr, value);
      });
    });

    applyMeta();
    updateToggleButtons();
  }

  function updateToggleButtons() {
    document.querySelectorAll("[data-lang-toggle]").forEach(function (btn) {
      var inFooter = btn.closest("footer") !== null;
      var key = inFooter ? "footer.langToggle" : "nav.langToggle";
      var ariaKey = inFooter ? "footer.langToggleAria" : "nav.langToggleAria";
      var label = lookup(key);
      var aria = lookup(ariaKey);

      if (label != null) btn.textContent = label;
      if (aria != null) btn.setAttribute("aria-label", aria);
    });
  }

  function wireToggleButtons() {
    document.querySelectorAll("[data-lang-toggle]").forEach(function (btn) {
      if (btn.dataset.i18nBound === "true") return;
      btn.dataset.i18nBound = "true";
      btn.addEventListener("click", function () {
        toggle();
      });
    });
  }

  function fetchDict(lang) {
    return fetch("assets/data/i18n/" + lang + ".json")
      .then(function (res) {
        if (!res.ok) throw new Error("Failed to load translations");
        return res.json();
      });
  }

  function setLang(lang) {
    if (!SUPPORTED[lang]) lang = DEFAULT_LANG;

    return fetchDict(lang).then(function (data) {
      currentLang = lang;
      dict = data;

      try {
        localStorage.setItem(STORAGE_KEY, lang);
      } catch (err) {
        /* ignore storage errors */
      }

      applyDocumentLang(lang);
      applyTranslations();
      wireToggleButtons();
      return lang;
    });
  }

  function toggle() {
    return setLang(currentLang === "en" ? "ar" : "en");
  }

  function init() {
    if (initialized) {
      applyTranslations();
      return Promise.resolve(currentLang);
    }

    initialized = true;
    currentLang = getStoredLang();
    applyDocumentLang(currentLang);
    wireToggleButtons();

    return setLang(currentLang);
  }

  window.YaraI18n = {
    getLang: getLang,
    setLang: setLang,
    toggle: toggle,
    t: t,
    init: init,
  };

  document.addEventListener("DOMContentLoaded", function () {
    init();
  });
})();

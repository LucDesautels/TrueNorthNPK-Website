/* =============================================================
   True North NPK - theme + on-page "Website Controls" panel
   -------------------------------------------------------------
   Loaded in <head> so saved settings apply before the page paints
   (no flash). Provides:
     - light / dark theme (persisted)
     - a bottom-left controls panel for band members to experiment
       with colours and proportions, then copy their preferences.
   All changes are local to the visitor's browser (localStorage).
   ============================================================= */
(function () {
  "use strict";

  var THEME_KEY = "tnnpk-theme";
  var UI_KEY    = "tnnpk-ui";

  /* CSS variables the panel can override */
  var UI_VARS = ["--accent", "--accent-hi", "--secondary",
                 "--ui-text-scale", "--ui-logo", "--ui-icon",
                 "--nav-h", "--ui-navmax"];

  /* ---- icons ---- */
  var SUN  = '<svg viewBox="0 0 24 24"><path d="M12 7.5a4.5 4.5 0 1 0 4.5 4.5A4.5 4.5 0 0 0 12 7.5zm0-5.5v3m0 14v3M2 12h3m14 0h3M4.6 4.6l2.1 2.1m10.6 10.6l2.1 2.1M19.4 4.6l-2.1 2.1M6.7 17.3l-2.1 2.1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg>';
  var MOON = '<svg viewBox="0 0 24 24"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5z"/></svg>';
  var GEAR = '<svg viewBox="0 0 24 24"><path d="M4 7h7M16 7h4M4 12h4M13 12h7M4 17h10M19 17h1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/><circle cx="13.5" cy="7" r="2.5"/><circle cx="10.5" cy="12" r="2.5"/><circle cx="16.5" cy="17" r="2.5"/></svg>';

  /* exposed so js/shared.js can render the nav toggle with the right icon */
  window.tnnpkThemeIcon = function (theme) {
    return theme === "light" ? MOON : SUN;
  };

  /* ---- apply saved settings immediately (runs in <head>) ---- */
  var savedTheme = null, savedUI = {};
  try { savedTheme = localStorage.getItem(THEME_KEY); } catch (e) {}
  try { savedUI = JSON.parse(localStorage.getItem(UI_KEY) || "{}"); } catch (e) {}
  if (savedTheme) document.documentElement.setAttribute("data-theme", savedTheme);
  for (var k in savedUI) {
    if (savedUI.hasOwnProperty(k)) document.documentElement.style.setProperty(k, savedUI[k]);
  }

  function root() { return document.documentElement; }
  function currentTheme() { return root().getAttribute("data-theme") || "light"; }
  function readVar(name) {
    return getComputedStyle(root()).getPropertyValue(name).trim();
  }

  function persistUI() {
    var obj = {}, s = root().style;
    UI_VARS.forEach(function (v) {
      var val = s.getPropertyValue(v);
      if (val) obj[v] = val.trim();
    });
    try { localStorage.setItem(UI_KEY, JSON.stringify(obj)); } catch (e) {}
  }

  /* ---- theme ---- */
  function setTheme(theme) {
    root().setAttribute("data-theme", theme);
    try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}
    var tg = document.querySelector(".theme-toggle");
    if (tg) tg.innerHTML = window.tnnpkThemeIcon(theme);
    syncPanel();
  }
  document.addEventListener("click", function (e) {
    if (e.target.closest("[data-theme-toggle]")) {
      setTheme(currentTheme() === "light" ? "dark" : "light");
    }
  });

  /* ---- colour helper: lighten (+amt) / darken (-amt) a hex colour ---- */
  function shade(hex, amt) {
    hex = (hex || "").trim().replace("#", "");
    if (hex.length === 3) hex = hex.replace(/./g, function (c) { return c + c; });
    if (hex.length !== 6) return "#" + hex;
    var n = parseInt(hex, 16);
    var r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
    function adj(c) { return Math.max(0, Math.min(255, Math.round(c + 255 * amt))); }
    return "#" + ((1 << 24) + (adj(r) << 16) + (adj(g) << 8) + adj(b)).toString(16).slice(1);
  }

  /* ---- proportion controls ---- */
  var RANGES = [
    { v: "--ui-text-scale", label: "Text size",      min: 80, max: 130, step: 5,
      toCss: function (n) { return String(n / 100); },
      toNum: function (c) { return Math.round((parseFloat(c) || 1) * 100); },
      show:  function (n) { return n + "%"; } },
    { v: "--ui-logo", label: "Logo size", min: 30, max: 72, step: 1,
      toCss: function (n) { return n + "px"; },
      toNum: function (c) { return parseFloat(c) || 44; },
      show:  function (n) { return n + "px"; } },
    { v: "--ui-icon", label: "Streaming icon size", min: 14, max: 34, step: 1,
      toCss: function (n) { return n + "px"; },
      toNum: function (c) { return parseFloat(c) || 21; },
      show:  function (n) { return n + "px"; } },
    { v: "--nav-h", label: "Nav bar thickness", min: 50, max: 100, step: 1,
      toCss: function (n) { return n + "px"; },
      toNum: function (c) { return parseFloat(c) || 66; },
      show:  function (n) { return n + "px"; } },
    { v: "--ui-navmax", label: "Nav bar width", min: 60, max: 100, step: 1,
      toCss: function (n) { return n + "%"; },
      toNum: function (c) { return parseFloat(c) || 100; },
      show:  function (n) { return n + "%"; } }
  ];

  var panel, statusEl;

  function build() {
    var rangesHtml = RANGES.map(function (r, i) {
      return '<div class="cp-row">' +
        '<label>' + r.label + ' <span class="cp-val" data-val="' + i + '"></span></label>' +
        '<input type="range" class="slider" data-range="' + i + '" ' +
        'min="' + r.min + '" max="' + r.max + '" step="' + r.step + '"></div>';
    }).join("");

    var wrap = document.createElement("div");
    wrap.className = "site-controls";
    wrap.innerHTML =
      '<div class="controls-panel" id="controls-panel" role="dialog" aria-label="Website controls">' +
        '<button class="cp-close" data-cp-close aria-label="Close controls">&times;</button>' +
        '<h3>Website Controls</h3>' +
        '<p class="cp-intro">Experiment with the look - changes stay on your screen only. ' +
          'Use "Copy settings" to send your preferences back.</p>' +
        '<p class="cp-section">Theme</p>' +
        '<button class="cp-switch" data-theme-toggle aria-label="Toggle light or dark theme">' +
          '<span class="cp-switch-track"><span class="cp-switch-knob"></span></span>' +
          '<span class="cp-switch-label" data-theme-label></span>' +
        '</button>' +
        '<div class="cp-divider"></div>' +
        '<p class="cp-section">Accent colours</p>' +
        '<div class="cp-colors">' +
          '<div class="cp-row"><label>Primary</label>' +
            '<input type="color" data-color="accent"></div>' +
          '<div class="cp-row"><label>Secondary</label>' +
            '<input type="color" data-color="secondary"></div>' +
        '</div>' +
        '<div class="cp-divider"></div>' +
        '<p class="cp-section">Proportions</p>' +
        rangesHtml +
        '<div class="cp-actions">' +
          '<button data-cp-reset>Reset</button>' +
          '<button data-cp-copy>Copy settings</button>' +
        '</div>' +
        '<p class="cp-status" data-cp-status></p>' +
      '</div>' +
      '<button class="controls-btn" data-cp-toggle aria-label="Open website controls">' +
        GEAR + '<span>Controls</span></button>';
    document.body.appendChild(wrap);

    panel    = wrap.querySelector(".controls-panel");
    statusEl = wrap.querySelector("[data-cp-status]");

    wrap.querySelector("[data-cp-toggle]").addEventListener("click", function () {
      panel.classList.toggle("open");
      if (panel.classList.contains("open")) syncPanel();
    });
    wrap.querySelector("[data-cp-close]").addEventListener("click", function () {
      panel.classList.remove("open");
    });

    /* the theme switch uses [data-theme-toggle], handled by the
       document-level click listener above */

    /* colour pickers */
    wrap.querySelector('[data-color="accent"]').addEventListener("input", function () {
      var hex = this.value;
      root().style.setProperty("--accent", hex);
      root().style.setProperty("--accent-hi",
        shade(hex, currentTheme() === "light" ? -0.13 : 0.13));
      persistUI();
      status("");
    });
    wrap.querySelector('[data-color="secondary"]').addEventListener("input", function () {
      root().style.setProperty("--secondary", this.value);
      persistUI();
      status("");
    });

    /* proportion sliders */
    wrap.querySelectorAll("[data-range]").forEach(function (input) {
      input.addEventListener("input", function () {
        var spec = RANGES[+input.getAttribute("data-range")];
        var n = +input.value;
        root().style.setProperty(spec.v, spec.toCss(n));
        var lbl = wrap.querySelector('[data-val="' + input.getAttribute("data-range") + '"]');
        if (lbl) lbl.textContent = spec.show(n);
        persistUI();
        status("");
      });
    });

    wrap.querySelector("[data-cp-reset]").addEventListener("click", function () {
      UI_VARS.forEach(function (v) { root().style.removeProperty(v); });
      try { localStorage.removeItem(UI_KEY); } catch (e) {}
      syncPanel();
      status("Reset to defaults.");
    });
    wrap.querySelector("[data-cp-copy]").addEventListener("click", copySettings);

    syncPanel();
  }

  /* refresh every control to reflect the current state */
  function syncPanel() {
    if (!panel) return;
    var lbl = panel.querySelector("[data-theme-label]");
    if (lbl) lbl.textContent = currentTheme() === "dark" ? "Dark mode" : "Light mode";
    var acc = panel.querySelector('[data-color="accent"]');
    var sec = panel.querySelector('[data-color="secondary"]');
    if (acc) acc.value = normHex(readVar("--accent"));
    if (sec) sec.value = normHex(readVar("--secondary"));
    RANGES.forEach(function (spec, i) {
      var input = panel.querySelector('[data-range="' + i + '"]');
      var lbl   = panel.querySelector('[data-val="' + i + '"]');
      if (!input) return;
      var n = spec.toNum(readVar(spec.v));
      input.value = n;
      if (lbl) lbl.textContent = spec.show(n);
    });
  }

  function normHex(c) {
    c = (c || "").trim();
    if (c[0] !== "#") return "#000000";
    if (c.length === 4) c = "#" + c[1]+c[1]+c[2]+c[2]+c[3]+c[3];
    return c.slice(0, 7);
  }

  function copySettings() {
    var lines = ["True North NPK - website settings", "Theme: " + currentTheme()];
    lines.push("Primary colour: " + normHex(readVar("--accent")));
    lines.push("Secondary colour: " + normHex(readVar("--secondary")));
    RANGES.forEach(function (spec) {
      lines.push(spec.label + ": " + spec.show(spec.toNum(readVar(spec.v))));
    });
    var text = lines.join("\n");
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text)
        .then(function () { status("Settings copied - paste them into your reply."); })
        .catch(function () { status("Copy failed - here are your settings:\n" + text); });
    } else {
      status(text);
    }
  }

  function status(msg) { if (statusEl) statusEl.textContent = msg; }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", build);
  } else {
    build();
  }
})();

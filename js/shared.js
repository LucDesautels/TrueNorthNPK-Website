/* =============================================================
   True North NPK - shared navigation bar + footer
   Injected into every page so there is only one copy to maintain.
   ============================================================= */

/* Brand icons for each streaming platform (single-colour glyphs that
   inherit the surrounding text colour, so they fit the nav + footer). */
const STREAM_ICONS = {
  spotify: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>',
  apple: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701z"/></svg>',
  youtube: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.104c-3.924 0-7.104-3.18-7.104-7.104S8.076 4.896 12 4.896s7.104 3.18 7.104 7.104-3.18 7.104-7.104 7.104zm0-13.332c-3.432 0-6.228 2.796-6.228 6.228S8.568 18.228 12 18.228s6.228-2.796 6.228-6.228S15.432 5.772 12 5.772zM9.684 15.54V8.46L15.816 12z"/></svg>',
  hearnow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a9 9 0 0 0-9 9v5a3 3 0 0 0 3 3h1a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1H5v-0a7 7 0 0 1 14 0v0h-2a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h1a3 3 0 0 0 3-3v-5a9 9 0 0 0-9-9z"/></svg>',
  bandcamp: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M0 18.75l7.437-13.5H24l-7.438 13.5H0z"/></svg>',
  amazon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.6 17.2c-2 1.5-4.9 2.3-7.4 2.3-3.5 0-6.6-1.3-9-3.4-.2-.2 0-.4.2-.3 2.6 1.5 5.7 2.4 9 2.4 2.2 0 4.6-.5 6.8-1.4.3-.1.6.2.4.4zm.8-1c-.3-.3-1.7-.2-2.4-.1-.2 0-.2-.2 0-.3 1.1-.8 3-.5 3.2-.3.2.3-.1 2.1-1.1 3-.2.1-.3 0-.3-.1.2-.7.6-2 .6-2.1zM12 4c3.3 0 5 2.5 5 5.7v.7c0 .9 0 1.7.4 2.5.2.4.5.8.8 1.1.1.1.1.3 0 .4l-1.4 1.2c-.2.1-.4.1-.5 0-.6-.5-.9-1-1.2-1.6-.9 1-1.6 1.6-3.2 1.6-2 0-3.6-1.2-3.6-3.7 0-1.9 1-3.2 2.5-3.9 1.3-.6 3-.7 4-.8v-.3c0-.7 0-1.5-.4-2-.4-.5-1-.7-1.5-.7-1 0-1.9.5-2.1 1.6-.1.3-.2.4-.4.4l-1.8-.2c-.2 0-.4-.2-.3-.4C9 4.8 10.7 4 12 4zm.6 6.7c-.6 0-1.2.1-1.7.4-.5.3-.8.8-.8 1.5 0 .9.5 1.5 1.3 1.5.6 0 1.1-.4 1.4-1 .3-.6.3-1.1.3-1.8v-.4c-.2 0-.5-.1-.8-.1z"/></svg>',
  pandora: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 3h6.7C15 3 18 5.5 18 9.3s-3 6.4-7.5 6.4H9.2V21H4V3zm5.2 4.3v4.2h1.5c1.6 0 2.6-.8 2.6-2.1s-1-2.1-2.6-2.1H9.2z"/></svg>',
  deezer: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 15h3.2v3H2v-3zm4.7-3.5h3.2V18H6.7v-6.5zM11.4 7h3.2v11h-3.2V7zm4.7-2H19v13h-3.2V5z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></svg>'
};

/* Whether the Instagram links should be shown. Driven by SHOW_INSTAGRAM
   in js/data.js (set it to false to hide them everywhere). Defaults to
   shown if that flag is not defined. */
function instagramVisible() {
  return (typeof SHOW_INSTAGRAM === "undefined") ? true : SHOW_INSTAGRAM;
}

function buildStreamingLinks(extraClass, items) {
  const list = items || STREAMING;
  return list.map(function (s) {
    const external = s.url !== "#";
    const icon = STREAM_ICONS[s.icon] || STREAM_ICONS.hearnow;
    return `<a class="stream-link ${extraClass || ""}" href="${s.url}"
      title="${s.name}" aria-label="${s.name}"
      ${external ? 'target="_blank" rel="noopener"' : ""}>
      ${icon}<span class="stream-name">${s.name}</span></a>`;
  }).join("");
}

/* Sun / moon icon for the nav theme toggle. js/controls.js owns the
   theme logic; if it is loaded it provides the icon, otherwise we
   fall back to a local copy. */
function themeToggleIcon() {
  const theme = document.documentElement.getAttribute("data-theme") || "dark";
  if (window.tnnpkThemeIcon) return window.tnnpkThemeIcon(theme);
  return theme === "light"
    ? '<svg viewBox="0 0 24 24"><path d="M12 3a9 9 0 1 0 9 9 7 7 0 0 1-9-9z"/></svg>'
    : '<svg viewBox="0 0 24 24"><path d="M12 7a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0-5v3m0 14v3M2 12h3m14 0h3M4.2 4.2l2.1 2.1m11.4 11.4l2.1 2.1M19.8 4.2l-2.1 2.1M6.3 17.7l-2.1 2.1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg>';
}

function buildHeader() {
  const page = document.body.getAttribute("data-page") || "";
  const links = [
    { id: "home",   label: "Home",    href: "index.html" },
    { id: "music",  label: "Music",   href: "music.html" },
    { id: "lyrics", label: "Lyrics",  href: "lyrics.html" },
    { id: "photos", label: "Photos",  href: "photos.html" },
    { id: "about",  label: "About",   href: "about.html" },
    { id: "contact",label: "Contact", href: "about.html#contact" }
  ];

  const navItems = links.map(function (l) {
    const active = l.id === page ? ' class="active"' : "";
    return `<li><a${active} href="${l.href}">${l.label}</a></li>`;
  }).join("");

  /* Instagram sits in its own group (with a divider line). When it is
     hidden we drop that group entirely, leaving pages | streaming. */
  const igGroup = instagramVisible()
    ? `<div class="nav-streaming nav-streaming-ig">${buildStreamingLinks("nav-stream", STREAMING.filter(function (s) { return s.icon === "instagram"; }))}</div>`
    : "";
  const streamGroup =
    `<div class="nav-streaming">${buildStreamingLinks("nav-stream", STREAMING.filter(function (s) { return s.icon !== "instagram"; }))}</div>`;

  document.getElementById("site-header").innerHTML = `
    <nav class="navbar" aria-label="Main navigation">
      <a class="brand" href="index.html">
        <img src="assets/img/badge.png" alt="True North NPK badge" class="brand-badge">
        <span class="brand-text"><span class="brand-true">True North</span><span class="brand-npk">NPK</span></span>
      </a>
      <button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
      <div class="nav-collapse">
        <ul class="nav-links">${navItems}</ul>
        <div class="nav-streaming-wrap">${igGroup}${streamGroup}</div>
      </div>
    </nav>`;

  const toggle = document.querySelector(".nav-toggle");
  const collapse = document.querySelector(".nav-collapse");
  toggle.addEventListener("click", function () {
    const open = collapse.classList.toggle("open");
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
}

function buildFooter() {
  const footerStream = instagramVisible()
    ? STREAMING
    : STREAMING.filter(function (s) { return s.icon !== "instagram"; });

  document.getElementById("site-footer").innerHTML = `
    <div class="footer-inner">
      <div class="footer-col footer-brand">
        <img src="assets/img/badge.png" alt="" class="footer-badge">
        <p class="footer-name">True North NPK</p>
        <p class="footer-tagline" data-content="footer.tagline"></p>
      </div>
      <div class="footer-col">
        <h4>Listen</h4>
        <div class="footer-streaming">${buildStreamingLinks("footer-stream", footerStream)}</div>
      </div>
      <div class="footer-col">
        <h4>Explore</h4>
        <ul class="footer-nav">
          <li><a href="index.html">Home</a></li>
          <li><a href="music.html">Music</a></li>
          <li><a href="lyrics.html">Lyrics</a></li>
          <li><a href="photos.html">Photos</a></li>
          <li><a href="about.html">About</a></li>
          <li><a href="about.html#contact">Contact</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="footer-bottom-text">
        <p>&copy; 2026 True North NPK. All songs &copy; 2026 Noel Desautels, Paul Cusenza &amp; Kevin Zarnett.</p>
        <p class="footer-luc-credit" data-content="about.siteCredit"></p>
      </div>
      <button class="theme-toggle footer-theme-toggle" data-theme-toggle
        aria-label="Toggle light or dark theme" title="Toggle light / dark">${themeToggleIcon()}</button>
    </div>`;
}

/* Walks the page and fills anything tagged with a data-content
   attribute from the matching path inside js/content.js (CONTENT).
   Also handles the special-case contact wiring: email, listen URL
   and the band-member contact list. */
function applyContent() {
  if (typeof CONTENT === "undefined") return;

  document.querySelectorAll("[data-content]").forEach(function (el) {
    var path = el.getAttribute("data-content");
    var val = path.split(".").reduce(function (o, k) {
      return (o == null) ? null : o[k];
    }, CONTENT);
    if (val != null) el.textContent = val;
  });

  var email = CONTENT.contact && CONTENT.contact.email;
  if (email) {
    document.querySelectorAll("[data-content-email]").forEach(function (a) {
      a.href = "mailto:" + email;
      a.textContent = email;
    });
  }

  var listenUrl = CONTENT.contact && CONTENT.contact.listenUrl;
  if (listenUrl) {
    document.querySelectorAll("[data-content-listen]").forEach(function (a) {
      a.href = listenUrl;
      a.textContent = listenUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");
    });
  }

  var bandcamp = CONTENT.contact && CONTENT.contact.bandcamp;
  if (bandcamp) {
    document.querySelectorAll("[data-content-bandcamp]").forEach(function (a) {
      a.href = bandcamp;
      a.textContent = bandcamp.replace(/^https?:\/\//, "").replace(/\/$/, "");
    });
  }

  var instagram = CONTENT.contact && CONTENT.contact.instagram;
  if (instagram && instagramVisible()) {
    var handle = instagram.replace(/^@/, "");
    document.querySelectorAll("[data-content-instagram]").forEach(function (a) {
      a.href = "https://instagram.com/" + handle;
      a.textContent = "@" + handle;
    });
  } else {
    /* Instagram hidden (or no handle set): hide the whole contact row. */
    document.querySelectorAll("[data-content-instagram]").forEach(function (a) {
      var detail = a.closest(".contact-detail");
      (detail || a).style.display = "none";
    });
  }

  var bioEl = document.querySelector("[data-content-bio]");
  if (bioEl && CONTENT.about && Array.isArray(CONTENT.about.bio)) {
    bioEl.innerHTML = CONTENT.about.bio.map(function (block) {
      var tag = (block.type === "h3") ? "h3" : "p";
      return "<" + tag + ">" + escapeHtml(block.text || "") + "</" + tag + ">";
    }).join("");
  }

  var memberList = document.querySelector("[data-content-member-list]");
  if (memberList && Array.isArray(CONTENT.members)) {
    memberList.innerHTML = CONTENT.members.map(function (m) {
      return "<li>" + escapeHtml(m.name || "") + " - " +
                      escapeHtml(m.contact || "[contact placeholder]") + "</li>";
    }).join("");
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
}

/* =============================================================
   Idle prefetch - once the current page is interactive, quietly
   warm the browser cache so moving between tabs feels instant:
     - every other page's HTML document (tiny), and
     - every optimized image EXCEPT the photos-page gallery, which
       stays lazy so a quick bounce never pulls the heaviest set.
   Skipped on data-saver / 2g, prefers WebP, and runs in small
   idle batches at the lowest priority so it never competes with
   the page the visitor is actually looking at.
   ============================================================= */
function prefetchSite() {
  var c = navigator.connection || {};
  if (c.saveData) return;
  if (c.effectiveType && /2g$/.test(c.effectiveType)) return;

  var webp = (function () {
    try {
      return document.createElement("canvas")
        .toDataURL("image/webp").indexOf("data:image/webp") === 0;
    } catch (e) { return false; }
  })();

  var here = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  var pages = ["index.html", "music.html", "lyrics.html", "photos.html", "about.html"];
  var head = document.head, seen = {};

  function hint(href, as) {
    if (!href || seen[href]) return;
    seen[href] = 1;
    var l = document.createElement("link");
    l.rel = "prefetch";
    l.href = href;
    if (as) l.as = as;
    head.appendChild(l);
  }

  pages.forEach(function (p) { if (p !== here) hint(p, "document"); });

  var imgs = [];
  if (window.IMG_MANIFEST) {
    Object.keys(IMG_MANIFEST).forEach(function (key) {
      if (key.indexOf("assets/img/photos/") === 0) return;   /* keep gallery lazy */
      var entry = IMG_MANIFEST[key];
      imgs.push((webp && entry && entry.webp) ? entry.webp : key);
    });
  }

  var i = 0;
  (function pump() {
    for (var n = 0; i < imgs.length && n < 4; n++) hint(imgs[i++], "image");
    if (i < imgs.length) {
      if ("requestIdleCallback" in window) requestIdleCallback(pump, { timeout: 2000 });
      else setTimeout(pump, 250);
    }
  })();
}

document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("site-header")) buildHeader();
  if (document.getElementById("site-footer")) buildFooter();
  applyContent();

  if ("requestIdleCallback" in window) requestIdleCallback(prefetchSite, { timeout: 4000 });
  else setTimeout(prefetchSite, 2000);
});

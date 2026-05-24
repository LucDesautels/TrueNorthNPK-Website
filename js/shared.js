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
  hearnow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a9 9 0 0 0-9 9v5a3 3 0 0 0 3 3h1a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1H5v-0a7 7 0 0 1 14 0v0h-2a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h1a3 3 0 0 0 3-3v-5a9 9 0 0 0-9-9z"/></svg>'
};

function buildStreamingLinks(extraClass) {
  return STREAMING.map(function (s) {
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
  const theme = document.documentElement.getAttribute("data-theme") || "light";
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
        <div class="nav-streaming">${buildStreamingLinks("nav-stream")}</div>
        <button class="theme-toggle" data-theme-toggle
          aria-label="Toggle light or dark theme" title="Toggle light / dark">${themeToggleIcon()}</button>
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
  document.getElementById("site-footer").innerHTML = `
    <div class="footer-inner">
      <div class="footer-col footer-brand">
        <img src="assets/img/badge.png" alt="" class="footer-badge">
        <p class="footer-name">True North NPK</p>
        <p class="footer-tagline" data-content="footer.tagline"></p>
      </div>
      <div class="footer-col">
        <h4>Listen</h4>
        <div class="footer-streaming">${buildStreamingLinks("footer-stream")}</div>
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
      <p>&copy; 2026 True North NPK. All songs &copy; 2026 Noel Desautels, Paul Cusenza &amp; Kevin Zarnett.</p>
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

document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("site-header")) buildHeader();
  if (document.getElementById("site-footer")) buildFooter();
  applyContent();
});

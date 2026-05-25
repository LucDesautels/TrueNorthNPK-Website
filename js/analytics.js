/* =============================================================
   True North NPK - traffic analytics (Google Analytics 4)
   -------------------------------------------------------------
   Disabled by default. To turn it on:
     1. Create a free GA4 property at https://analytics.google.com
        (Admin > Create > Property > Web data stream).
     2. Copy the Measurement ID (looks like  G-XXXXXXXXXX ).
     3. Paste it between the quotes below and reload the site.

   While the ID is empty, no analytics script is loaded and no
   tracking happens.
   ============================================================= */
const TNNPK_GA_ID = "";  /* e.g. "G-XXXXXXXXXX" */

(function () {
  if (!TNNPK_GA_ID) return;
  var s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + TNNPK_GA_ID;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", TNNPK_GA_ID);
})();

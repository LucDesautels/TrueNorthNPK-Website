/* =============================================================
   True North NPK - photo gallery masonry
   -------------------------------------------------------------
   The page ships a flat list of <figure class="photo-item"> inside
   .photos-grid. Without this script the CSS falls back to a column
   masonry (tight packing, but fills top-to-bottom per column).

   This script keeps the tight packing while making the images read
   LEFT-TO-RIGHT: it spreads them round-robin across N flex columns
   (item i -> column i % N), so the top row is 1, 2, 3, the next row
   4, 5, 6, and so on. Column count tracks the same breakpoints as
   the CSS fallback (3 / 2 / 1).
   ============================================================= */
(function () {
  "use strict";

  var grid = document.querySelector(".photos-grid");
  if (!grid) return;

  /* Capture the figures once, in source order, so every re-layout
     redistributes from the same canonical sequence. */
  var items = Array.prototype.slice.call(grid.querySelectorAll(".photo-item"));
  if (!items.length) return;

  function colCount() {
    var w = window.innerWidth;
    if (w <= 520) return 1;
    if (w <= 920) return 2;
    return 3;
  }

  var current = 0;
  function layout() {
    var n = colCount();
    if (n === current) return;   /* column count unchanged - nothing to do */
    current = n;

    grid.classList.add("photos-grid--cols");
    grid.textContent = "";       /* detach figures (they're held in `items`) */

    var cols = [];
    for (var c = 0; c < n; c++) {
      var col = document.createElement("div");
      col.className = "photos-col";
      grid.appendChild(col);
      cols.push(col);
    }
    for (var i = 0; i < items.length; i++) {
      cols[i % n].appendChild(items[i]);
    }
  }

  layout();

  var t;
  window.addEventListener("resize", function () {
    clearTimeout(t);
    t = setTimeout(layout, 150);
  });
})();

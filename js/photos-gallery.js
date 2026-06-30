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

   Items with class "photo-item--more" are hidden until the user
   clicks "See more"; they then animate in and join the grid seamlessly.
   ============================================================= */
(function () {
  "use strict";

  var grid = document.querySelector(".photos-grid");
  if (!grid) return;

  /* Capture all figures once, in source order. */
  var allItems = Array.prototype.slice.call(grid.querySelectorAll(".photo-item"));
  if (!allItems.length) return;

  var mainItems = allItems.filter(function (el) { return !el.classList.contains("photo-item--more"); });
  var moreItems = allItems.filter(function (el) { return  el.classList.contains("photo-item--more"); });

  /* Start with only the main batch visible. */
  var items = mainItems;

  function colCount() {
    var w = window.innerWidth;
    if (w <= 520) return 1;
    if (w <= 920) return 2;
    return 3;
  }

  var current = 0;
  function layout(force) {
    var n = colCount();
    if (n === current && !force) return;
    current = n;

    grid.classList.add("photos-grid--cols");
    grid.textContent = "";   /* detach all figures (held in `items`) */

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

  layout(false);

  var t;
  window.addEventListener("resize", function () {
    clearTimeout(t);
    t = setTimeout(function () { layout(false); }, 150);
  });

  /* "See more" button — show only if there are more items. */
  var btn = document.querySelector(".photos-see-more-btn");
  var btnWrap = document.querySelector(".photos-see-more");

  if (!moreItems.length) {
    if (btnWrap) btnWrap.style.display = "none";
    return;
  }

  if (btn) {
    btn.addEventListener("click", function () {
      /* Mark new items so CSS can animate them in. */
      for (var j = 0; j < moreItems.length; j++) {
        moreItems[j].classList.add("photo-item--revealing");
      }

      items = allItems;
      layout(true);

      /* Hide the button after expansion. */
      if (btnWrap) btnWrap.style.display = "none";

      /* Scroll so the first new photo comes just into view. */
      if (moreItems[0]) {
        moreItems[0].scrollIntoView({ behavior: "smooth", block: "nearest" });
      }

      /* Clean up animation class once done. */
      var first = moreItems[0];
      if (first) {
        first.addEventListener("animationend", function cleanup() {
          for (var k = 0; k < moreItems.length; k++) {
            moreItems[k].classList.remove("photo-item--revealing");
          }
          first.removeEventListener("animationend", cleanup);
        });
      }
    });
  }
})();

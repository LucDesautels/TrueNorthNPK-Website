/* =============================================================
   True North NPK - lyrics page: file-tree + lyrics modal
   ============================================================= */
(function () {
  "use strict";

  var FOLDER = '<svg viewBox="0 0 24 24"><path d="M3 6a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>';
  var NOTE   = '<svg viewBox="0 0 24 24"><path d="M9 18V5l9-2v11" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="6" cy="18" r="3"/><circle cx="15" cy="16" r="3"/></svg>';

  var rootEl = document.getElementById("tree-root");

  /* ---- build the tree ---- */
  var albumsHtml = ALBUMS.map(function (album, ai) {
    var children;
    if (album.songs.length) {
      children = album.songs.map(function (song, si) {
        return '' +
          '<li class="tree-node">' +
            '<div class="tree-label tree-song" data-ai="' + ai + '" data-si="' + si + '">' +
              '<span class="tree-icon">' + NOTE + '</span>' +
              '<span>' + esc(song.title) + '</span>' +
              '<span class="t-len">' + song.length + '</span>' +
            '</div>' +
          '</li>';
      }).join("");
    } else {
      children = '<li class="tree-node"><div class="tree-album-empty">Songs coming soon…</div></li>';
    }
    return '' +
      '<li class="tree-node">' +
        '<div class="tree-label">' +
          '<span class="tree-icon">' + FOLDER + '</span>' +
          '<span>' + esc(album.title) + '</span>' +
        '</div>' +
        '<ul class="tree-children">' + children + '</ul>' +
      '</li>';
  }).join("");

  rootEl.innerHTML =
    '<ul class="tree-root">' +
      '<li class="tree-node">' +
        '<div class="tree-label">' +
          '<span class="tree-icon">' + FOLDER + '</span>' +
          '<span>True North NPK</span>' +
        '</div>' +
        '<ul class="tree-children">' + albumsHtml + '</ul>' +
      '</li>' +
    '</ul>';

  /* ---- modal ---- */
  var overlay  = document.getElementById("lyrics-modal");
  var mTitle   = document.getElementById("modal-title");
  var mSub     = document.getElementById("modal-sub");
  var mLyrics  = document.getElementById("modal-lyrics");
  var mMeaning = document.getElementById("modal-meaning");

  /* True only if the song has real meaning text - empty strings and the
     "The band can add..." auto-placeholders count as no meaning. */
  function hasMeaning(s) {
    if (!s) return false;
    s = String(s).trim();
    if (!s) return false;
    if (s.indexOf("The band can add") === 0) return false;
    if (/\bplaceholder\b/i.test(s)) return false;
    return true;
  }

  var modalEl = overlay.querySelector(".modal");
  var lastKey = null;
  rootEl.addEventListener("click", function (e) {
    var node = e.target.closest(".tree-song");
    if (!node) return;
    var ai = +node.dataset.ai, si = +node.dataset.si;
    var album = ALBUMS[ai];
    var song  = album.songs[si];
    var key = ai + ":" + si;
    mTitle.childNodes[0].nodeValue = song.title;
    mSub.textContent = album.title + " . " + song.length;
    mLyrics.textContent = song.lyrics;
    if (hasMeaning(song.meaning)) {
      mMeaning.textContent = song.meaning;
      modalEl.classList.remove("no-meaning");
    } else {
      mMeaning.textContent = "";
      modalEl.classList.add("no-meaning");
    }
    overlay.classList.add("open");
    /* reset scroll only for a different song - and only once the
       modal is visible, otherwise scrollTop does not apply */
    if (key !== lastKey) {
      mLyrics.scrollTop = 0;
      mMeaning.scrollTop = 0;
    }
    lastKey = key;
  });

  function close() { overlay.classList.remove("open"); }
  document.getElementById("modal-close").addEventListener("click", close);
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) close();   /* click outside the modal */
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") close();
  });

  function esc(str) {
    return String(str).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
})();

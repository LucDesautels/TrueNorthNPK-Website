/* =============================================================
   True North NPK - music page: album rendering + audio player
   - Renders every album in ALBUMS as a full-height panel.
   - Released albums get a working player + a turntable whose
     label spins on play and whose tonearm tracks song position.
   - Upcoming albums render as a wireframe placeholder.
   - The lyrics panel is a sidebar INSIDE the album box: opening it
     adds a third column and narrows the song list (durations stay).
   - Each song's audio may be a file path/URL (custom player) or a
     { embed: "..." } streaming link (Spotify/YouTube iframe).
   ============================================================= */
(function () {
  "use strict";

  /* ---- icons ---- */
  var ICON = {
    play:  '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>',
    pause: '<svg viewBox="0 0 24 24"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>',
    prev:  '<svg viewBox="0 0 24 24"><path d="M7 6h2v12H7zM20 6v12L9 12z"/></svg>',
    next:  '<svg viewBox="0 0 24 24"><path d="M15 6h2v12h-2zM4 6l11 6L4 18z"/></svg>',
    vol:   '<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9zm13.5 3a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4z"/></svg>',
    back10: '<svg viewBox="0 0 24 24"><path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/><text x="12" y="15.6" font-size="7.4" text-anchor="middle">10</text></svg>',
    fwd10:  '<svg viewBox="0 0 24 24"><path transform="translate(24,0) scale(-1,1)" d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/><text x="12" y="15.6" font-size="7.4" text-anchor="middle">10</text></svg>'
  };

  /* tonearm rotation (degrees): sweeps from the outer groove
     (song start) to the inner groove (end). Parked angle lives
     in the CSS default for .tonearm. */
  var TA_OUTER = 10, TA_INNER = 30;

  var audio = new Audio();
  audio.preload = "metadata";

  var queue = [];      /* flat list of file-based songs for next/prev */
  var current = -1;    /* index into queue */

  var root = document.getElementById("albums-root");

  /* ---------- render all albums ---------- */
  ALBUMS.forEach(function (album, ai) {
    var panel = document.createElement("section");
    panel.className = "album-panel" + (album.songs.length ? "" : " wireframe");
    panel.id = "album-" + album.id;
    panel.innerHTML = (album.songs.length)
      ? releasedPanel(album, ai)
      : wireframePanel(album, ai);
    root.appendChild(panel);
  });

  function releasedPanel(album, ai) {
    var rows = album.songs.map(function (song, si) {
      var isEmbed = song.audio && typeof song.audio === "object";
      var pi = -1;
      if (!isEmbed) { pi = queue.length; queue.push({ ai: ai, si: si, song: song, album: album }); }
      return '' +
        '<li class="song-row" data-ai="' + ai + '" data-si="' + si + '" data-pi="' + pi + '">' +
          '<span class="song-num">' + song.num + '</span>' +
          '<span class="song-play-icon">' + ICON.play + '</span>' +
          '<div class="song-info">' +
            '<div class="song-title">' + esc(song.title) + '</div>' +
            '<div class="song-sub">True North NPK</div>' +
          '</div>' +
          '<button class="song-lyrics-btn" data-lyrics>Lyrics</button>' +
          '<span class="song-length">' + song.length + '</span>' +
        '</li>';
    }).join("");

    return '' +
      '<div class="album-head">' +
        '<p class="eyebrow">Album 1</p>' +
        '<h2>' + esc(album.title) + '</h2>' +
        '<p class="album-meta">' + album.year + ' . ' + album.songs.length + ' songs</p>' +
      '</div>' +
      '<div class="titanium-bar thin divider-ti" style="margin-bottom:26px"></div>' +
      '<div class="album-body" id="body-' + album.id + '">' +
        '<div class="album-left">' +
          '<div class="album-art"><img src="' + album.cover + '" alt="' + esc(album.title) + ' album cover"></div>' +
          recordPlayerHtml(album) +
        '</div>' +
        '<div class="album-right">' +
          '<p class="album-desc">' + esc(album.description) + '</p>' +
          '<ul class="song-list">' + rows + '</ul>' +
          '<div class="embed-wrap" id="embed-' + album.id + '"></div>' +
        '</div>' +
        lyricsSidebarHtml(album) +
      '</div>';
  }

  function recordPlayerHtml(album) {
    return '' +
      '<div class="record-player">' +
        '<div class="turntable">' +
          '<div class="record">' +
            '<div class="vinyl-grooves"></div>' +
            '<div class="record-label" id="label-' + album.id + '">' +
              '<img class="record-label-img" src="assets/img/badge.png" alt="">' +
            '</div>' +
            '<div class="vinyl-sheen"></div>' +
            '<div class="record-spindle"></div>' +
          '</div>' +
          '<div class="tonearm-rest"></div>' +
          '<div class="tonearm" id="tonearm-' + album.id + '">' +
            '<div class="ta-counterweight"></div>' +
            '<div class="ta-pivot"></div>' +
            '<div class="ta-tube"></div>' +
            '<div class="ta-headshell"></div>' +
          '</div>' +
        '</div>' +
        '<p class="record-caption">Spins while the music plays</p>' +
      '</div>';
  }

  function lyricsSidebarHtml(album) {
    return '' +
      '<aside class="lyrics-sidebar" id="lyrics-' + album.id + '" aria-hidden="true">' +
        '<div class="lyrics-sidebar-head">' +
          '<h3><span class="ls-title">Lyrics</span><span class="ls-sub"></span></h3>' +
          '<button class="lyrics-close" data-close-lyrics aria-label="Close lyrics">&times;</button>' +
        '</div>' +
        '<div class="lyrics-sidebar-body"></div>' +
      '</aside>';
  }

  function wireframePanel(album, ai) {
    var slots = "";
    for (var i = 1; i <= 6; i++) {
      slots += '<div class="wf-box wf-song">Song ' + i + ' - 0:00</div>';
    }
    return '' +
      '<div class="album-head">' +
        '<p class="eyebrow">Album ' + (ai + 1) + ' - Placeholder</p>' +
        '<h2>' + esc(album.title) + '</h2>' +
        '<p class="album-meta">' + album.year + '</p>' +
      '</div>' +
      '<div class="titanium-bar thin divider-ti" style="margin-bottom:26px"></div>' +
      '<div class="album-body">' +
        '<div class="album-left">' +
          '<div class="wf-box wf-art">Album<br>Art</div>' +
        '</div>' +
        '<div class="album-right">' +
          '<div class="wf-box" style="padding:22px;margin-bottom:14px">Album Description</div>' +
          '<div class="wf-list">' + slots + '</div>' +
          '<p class="wf-note">' + esc(album.description) + '</p>' +
        '</div>' +
      '</div>';
  }

  /* ---------- player bar wiring ---------- */
  var bar      = document.getElementById("player-bar");
  var elTitle  = document.getElementById("pb-title");
  var elAlbum  = document.getElementById("pb-album");
  var btnPlay  = document.getElementById("pb-play");
  var btnPrev  = document.getElementById("pb-prev");
  var btnNext  = document.getElementById("pb-next");
  var btnBack  = document.getElementById("pb-back10");
  var btnFwd   = document.getElementById("pb-fwd10");
  var seek     = document.getElementById("pb-seek");
  var elCur    = document.getElementById("pb-cur");
  var elDur    = document.getElementById("pb-dur");
  var vol      = document.getElementById("pb-vol");
  var volIcon  = document.getElementById("pb-vol-icon");

  btnPlay.innerHTML = ICON.play;
  btnPrev.innerHTML = ICON.prev;
  btnNext.innerHTML = ICON.next;
  btnBack.innerHTML = ICON.back10;
  btnFwd.innerHTML  = ICON.fwd10;
  volIcon.innerHTML = ICON.vol;

  audio.volume = vol.value / 100;
  vol.style.setProperty("--fill", vol.value);

  /* skip 10 seconds backward / forward within the current track */
  btnBack.addEventListener("click", function () {
    if (current < 0) return;
    audio.currentTime = Math.max(0, audio.currentTime - 10);
    updateRecord();
  });
  btnFwd.addEventListener("click", function () {
    if (current < 0) return;
    var d = audio.duration || 0;
    audio.currentTime = Math.min(d, audio.currentTime + 10);
    updateRecord();
  });

  btnPlay.addEventListener("click", function () {
    if (current < 0) { playQueue(0); return; }
    if (audio.paused) audio.play(); else audio.pause();
  });
  btnPrev.addEventListener("click", function () {
    if (!queue.length) return;
    playQueue((current - 1 + queue.length) % queue.length);
  });
  btnNext.addEventListener("click", function () {
    if (!queue.length) return;
    playQueue((current + 1) % queue.length);
  });

  var seeking = false;
  seek.addEventListener("input", function () {
    seeking = true;
    seek.style.setProperty("--fill", seek.value / 10);
  });
  seek.addEventListener("change", function () {
    if (audio.duration) audio.currentTime = (seek.value / 1000) * audio.duration;
    seeking = false;
    updateRecord();
  });
  vol.addEventListener("input", function () {
    audio.volume = vol.value / 100;
    vol.style.setProperty("--fill", vol.value);
  });

  audio.addEventListener("play",  function () { setPlayingUI(true); });
  audio.addEventListener("pause", function () { setPlayingUI(false); });
  audio.addEventListener("ended", function () {
    if (queue.length) playQueue((current + 1) % queue.length);
  });
  audio.addEventListener("timeupdate", function () {
    if (!seeking && audio.duration) {
      seek.value = (audio.currentTime / audio.duration) * 1000;
      seek.style.setProperty("--fill", seek.value / 10);
    }
    elCur.textContent = fmt(audio.currentTime);
    updateRecord();
  });
  audio.addEventListener("loadedmetadata", function () {
    elDur.textContent = fmt(audio.duration);
    updateRecord();
  });
  audio.addEventListener("error", function () {
    elAlbum.textContent = "Audio unavailable - check the track file in assets/audio/.";
  });

  /* ---------- song clicks ---------- */
  root.addEventListener("click", function (e) {
    if (e.target.closest("[data-close-lyrics]")) { closeLyrics(); return; }

    var row = e.target.closest(".song-row");
    if (!row) return;
    var ai = +row.dataset.ai, si = +row.dataset.si;
    var album = ALBUMS[ai], song = album.songs[si];

    if (e.target.closest("[data-lyrics]")) {
      openLyrics(album, song);
      return;
    }

    if (song.audio && typeof song.audio === "object") {
      showEmbed(album, song);
      openLyrics(album, song);
      return;
    }

    var pi = +row.dataset.pi;
    if (pi >= 0) {
      if (pi === current) {
        if (audio.paused) audio.play(); else audio.pause();
      } else {
        playQueue(pi);
      }
    }
    openLyrics(album, song);
  });

  /* ---------- playback ---------- */
  function playQueue(i) {
    var item = queue[i];
    if (!item) return;
    current = i;
    clearEmbeds();
    audio.src = item.song.audio;
    seek.value = 0;
    seek.style.setProperty("--fill", 0);
    elCur.textContent = "0:00";
    audio.play().catch(function () {/* autoplay blocked: user can press play */});

    elTitle.textContent = item.song.title;
    elAlbum.textContent = item.album.title;
    bar.classList.add("active");
    highlightRow();
  }

  function setPlayingUI(playing) {
    btnPlay.innerHTML = playing ? ICON.pause : ICON.play;
    btnPlay.setAttribute("aria-label", playing ? "Pause" : "Play");
    highlightRow();
    updateRecord();
  }

  /* Updates the turntable for the current song: spins the label
     (pause/resume keeps its angle) and sweeps the tonearm to match
     the playback position. */
  function updateRecord() {
    var item = queue[current];
    if (!item) return;
    var label = document.getElementById("label-" + item.album.id);
    var arm   = document.getElementById("tonearm-" + item.album.id);
    if (label) label.classList.toggle("playing", !audio.paused);
    if (arm) {
      var prog = audio.duration ? audio.currentTime / audio.duration : 0;
      prog = Math.max(0, Math.min(1, prog));
      var ang = TA_OUTER + prog * (TA_INNER - TA_OUTER);
      arm.style.transform = "rotate(" + ang + "deg)";
    }
  }

  function highlightRow() {
    root.querySelectorAll(".song-row").forEach(function (r) {
      r.classList.remove("playing");
      var icon = r.querySelector(".song-play-icon");
      if (icon) icon.innerHTML = ICON.play;
    });
    var item = queue[current];
    if (!item) return;
    var row = root.querySelector('.song-row[data-ai="' + item.ai + '"][data-si="' + item.si + '"]');
    if (row) {
      row.classList.add("playing");
      var icon = row.querySelector(".song-play-icon");
      if (icon) icon.innerHTML = audio.paused ? ICON.play : ICON.pause;
    }
  }

  /* ---------- streaming embeds ---------- */
  function showEmbed(album, song) {
    clearEmbeds();
    audio.pause();
    var wrap = document.getElementById("embed-" + album.id);
    if (!wrap) return;
    wrap.innerHTML =
      '<iframe src="' + song.audio.embed + '" height="' + (song.audio.height || 152) + '" ' +
      'allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" ' +
      'loading="lazy" title="' + esc(song.title) + '"></iframe>';
    wrap.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  function clearEmbeds() {
    root.querySelectorAll(".embed-wrap").forEach(function (w) { w.innerHTML = ""; });
  }

  /* ---------- lyrics sidebar (inside the album box) ---------- */
  function openLyrics(album, song) {
    var side = document.getElementById("lyrics-" + album.id);
    var body = document.getElementById("body-" + album.id);
    if (!side || !body) return;
    side.querySelector(".ls-title").textContent = song.title;
    side.querySelector(".ls-sub").textContent = album.title + " . " + song.length;
    var sb = side.querySelector(".lyrics-sidebar-body");
    sb.innerHTML = "";
    var words = document.createElement("div");
    words.className = "ls-lyrics";
    words.textContent = song.lyrics;
    var meaning = document.createElement("div");
    meaning.className = "ls-meaning";
    meaning.textContent = song.meaning;
    sb.append(words, meaning);
    body.classList.add("lyrics-open");
    side.setAttribute("aria-hidden", "false");
    sb.scrollTop = 0;   /* after the sidebar is visible, so it applies */
  }
  function closeLyrics() {
    root.querySelectorAll(".album-body").forEach(function (b) {
      b.classList.remove("lyrics-open");
    });
    root.querySelectorAll(".lyrics-sidebar").forEach(function (s) {
      s.setAttribute("aria-hidden", "true");
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeLyrics();
  });

  /* ---------- helpers ---------- */
  function fmt(s) {
    if (!s || isNaN(s)) return "0:00";
    var m = Math.floor(s / 60), sec = Math.floor(s % 60);
    return m + ":" + (sec < 10 ? "0" : "") + sec;
  }
  function esc(str) {
    return String(str).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
})();

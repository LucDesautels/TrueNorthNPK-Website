#!/usr/bin/env python3
"""
True North NPK - image optimizer.

Why this exists
---------------
The site is self-hosted, so every byte a visitor downloads is bandwidth the
band pays for and can take the server down under launch traffic. The source
images shipped huge (badge.png was 2048px / 6.7 MB, shown at 44 px on every
page). This script turns each source image into web-ready derivatives:

  1. A right-sized, recompressed copy in the SAME path/format the site already
     references (progressive JPEG) - so the bytes shrink for everyone, even
     with JavaScript disabled.
  2. A .webp sibling next to it - ~30% smaller again for modern browsers.
  3. A tiny blurred base64 placeholder (LQIP) written into js/img-manifest.js,
     used by js/img.js for the instant "blur-up" effect.

It is non-destructive and re-runnable: the FIRST run snapshots every pristine
source into assets/img/_originals/, and every run processes FROM that snapshot,
so quality never degrades no matter how many times you run it.

Usage
-----
  python tools/optimize_images.py            # optimize everything
  python tools/optimize_images.py --report   # just print sizes, change nothing

Requires Pillow:  pip install Pillow
"""

import base64
import glob
import io
import json
import os
import shutil
import sys

from PIL import Image, ImageFilter

# ---------------------------------------------------------------------------
# Paths
# ---------------------------------------------------------------------------
ROOT      = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMG_DIR   = os.path.join(ROOT, "assets", "img")
ORIG_DIR  = os.path.join(IMG_DIR, "_originals")   # pristine source snapshot
MANIFEST  = os.path.join(ROOT, "js", "img-manifest.js")

# ---------------------------------------------------------------------------
# What to optimize.
#   mode "contain": longest side capped at `size`  (covers, member photos)
#   mode "width":   width capped at `size`         (full-bleed backgrounds)
#   lqip:           generate a blur-up placeholder for it (skip for tiny icons)
# Paths are relative to the project root and match the references already in
# the HTML / CSS / JS, so the optimized files drop straight in.
# ---------------------------------------------------------------------------
TARGETS = [
    # logo / badge - shown at 44-100px everywhere; keep alpha (PNG + WebP)
    {"path": "assets/img/badge.png",                 "mode": "contain", "size": 192, "q": 86, "lqip": False},

    # album art (home preview + music page) and its hover image
    {"path": "assets/img/album-titanium-attitude.jpg", "mode": "contain", "size": 900, "q": 82},
    {"path": "assets/img/cd.jpg",                      "mode": "contain", "size": 900, "q": 82},

    # band member photos (square cards, retina)
    {"path": "assets/img/noel-1.jpg",  "mode": "contain", "size": 840, "q": 82},
    {"path": "assets/img/noel-2.jpg",  "mode": "contain", "size": 840, "q": 82},
    {"path": "assets/img/paul-1.jpg",  "mode": "contain", "size": 840, "q": 82},
    {"path": "assets/img/paul-2.jpg",  "mode": "contain", "size": 840, "q": 82},
    {"path": "assets/img/kevin-1.jpg", "mode": "contain", "size": 840, "q": 82},
    {"path": "assets/img/kevin-2.jpg", "mode": "contain", "size": 840, "q": 82},

    # full-bleed background images (hero + lyrics page). These sit behind a
    # dark overlay, so low quality is invisible - trade fidelity for bytes.
    {"path": "assets/img/band-placeholder.jpg", "mode": "width", "size": 1600, "q": 70},
    {"path": "assets/img/raven.jpg",            "mode": "width", "size": 1600, "q": 68},
]

# Every photo in the gallery folder, optimized with one rule. Opaque PNG
# illustrations are palette-quantized so the non-WebP fallback isn't huge.
# NB: only source formats here - never .webp, or the script's own generated
# siblings would get picked up as inputs on the next run.
for p in sorted(glob.glob(os.path.join(IMG_DIR, "photos", "*.*"))):
    if p.lower().endswith((".jpg", ".jpeg", ".png")):
        rel = os.path.relpath(p, ROOT).replace(os.sep, "/")
        TARGETS.append({"path": rel, "mode": "contain", "size": 1000, "q": 72,
                        "png_palette": True})

LQIP_MAX = 26   # px, longest side of the blurred placeholder


def human(n):
    for unit in ("B", "KB", "MB"):
        if n < 1024 or unit == "MB":
            return "%.0f%s" % (n, unit) if unit == "B" else "%.1f%s" % (n, unit)
        n /= 1024.0


def original_of(rel_path):
    """Map a served path to its pristine snapshot under _originals/."""
    inside = rel_path[len("assets/img/"):]          # e.g. "badge.png" or "photos/x.jpg"
    return os.path.join(ORIG_DIR, inside.replace("/", os.sep))


def snapshot(rel_path):
    """Copy the current served file into _originals/ on first run, then
    return the pristine source path to process from."""
    served = os.path.join(ROOT, rel_path.replace("/", os.sep))
    orig   = original_of(rel_path)
    if not os.path.exists(orig):
        os.makedirs(os.path.dirname(orig), exist_ok=True)
        shutil.copy2(served, orig)
    return orig


def resized(im, mode, size):
    w, h = im.size
    if mode == "width":
        scale = size / float(w) if w > size else 1.0
    else:  # contain
        longest = max(w, h)
        scale = size / float(longest) if longest > size else 1.0
    if scale >= 1.0:
        return im  # never upscale
    return im.resize((max(1, round(w * scale)), max(1, round(h * scale))), Image.LANCZOS)


def make_lqip(im):
    """Tiny blurred JPEG, base64-encoded, for the instant placeholder."""
    tiny = resized(im, "contain", LQIP_MAX).convert("RGB")
    tiny = tiny.filter(ImageFilter.GaussianBlur(1))
    buf = io.BytesIO()
    tiny.save(buf, format="JPEG", quality=40)
    return "data:image/jpeg;base64," + base64.b64encode(buf.getvalue()).decode("ascii")


def optimize_one(t, report_only):
    rel = t["path"]
    served = os.path.join(ROOT, rel.replace("/", os.sep))
    src = snapshot(rel) if not report_only else served

    im = Image.open(src)
    has_alpha = im.mode in ("RGBA", "LA", "P")
    out = resized(im, t["mode"], t["size"])

    base, ext = os.path.splitext(rel)
    webp_rel = base + ".webp"
    webp_path = os.path.join(ROOT, webp_rel.replace("/", os.sep))

    before = os.path.getsize(served) if os.path.exists(served) else 0

    if not report_only:
        # 1. fallback in the original format/path
        if ext.lower() in (".jpg", ".jpeg"):
            out.convert("RGB").save(served, format="JPEG", quality=t["q"],
                                    optimize=True, progressive=True)
        elif ext.lower() == ".png":
            if t.get("png_palette"):
                out.convert("RGBA").quantize(colors=256, method=Image.FASTOCTREE) \
                   .save(served, format="PNG", optimize=True)
            else:
                out.save(served, format="PNG", optimize=True)
        # 2. webp sibling
        if has_alpha:
            out.convert("RGBA").save(webp_path, format="WEBP",
                                     quality=t.get("q", 80), method=6)
        else:
            out.convert("RGB").save(webp_path, format="WEBP",
                                    quality=t.get("q", 80), method=6)

    after = os.path.getsize(served)
    webp_after = os.path.getsize(webp_path) if os.path.exists(webp_path) else 0

    entry = {"w": out.size[0], "h": out.size[1], "webp": webp_rel}
    if t.get("lqip", True) and not report_only:
        entry["lqip"] = make_lqip(Image.open(src))

    return rel, entry, before, after, webp_after


def main():
    report_only = "--report" in sys.argv
    if not os.path.isdir(IMG_DIR):
        print("Cannot find", IMG_DIR); sys.exit(1)

    manifest = {}
    tot_before = tot_after = tot_webp = 0
    print("%-46s %10s %10s %10s" % ("image", "before", "jpeg/png", "webp"))
    print("-" * 80)
    for t in TARGETS:
        if not os.path.exists(os.path.join(ROOT, t["path"].replace("/", os.sep))):
            print("SKIP (missing):", t["path"]); continue
        rel, entry, before, after, webp = optimize_one(t, report_only)
        manifest[rel] = entry
        tot_before += before; tot_after += after; tot_webp += webp
        print("%-46s %10s %10s %10s" % (os.path.basename(rel),
              human(before), human(after), human(webp)))

    print("-" * 80)
    print("%-46s %10s %10s %10s" % ("TOTAL", human(tot_before),
          human(tot_after), human(tot_webp)))
    print("\nModern browsers download the WebP column; the saving vs. the "
          "originals is %s -> %s." % (human(tot_before), human(tot_webp)))

    if not report_only:
        body = ("/* AUTO-GENERATED by tools/optimize_images.py - do not edit by hand.\n"
                "   Maps each image path to its WebP version, intrinsic size and a\n"
                "   tiny blurred placeholder (LQIP) used by js/img.js for blur-up. */\n"
                "window.IMG_MANIFEST = " + json.dumps(manifest, indent=0,
                ensure_ascii=False).replace("\n", "") + ";\n")
        with open(MANIFEST, "w", encoding="utf-8") as f:
            f.write(body)
        print("\nWrote", os.path.relpath(MANIFEST, ROOT))


if __name__ == "__main__":
    main()

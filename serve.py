#!/usr/bin/env python3
"""
True North NPK - local preview server.

Python's built-in `http.server` cannot serve HTTP Range requests, which
means you cannot scrub/seek inside a song. This tiny server adds Range
support so the music player behaves locally exactly as it will once the
site is hosted with nginx (which supports Range out of the box).

Usage:   python serve.py            (serves on http://localhost:8000)
         python serve.py 8080       (choose a different port)
"""
import http.server
import os
import sys


class RangeRequestHandler(http.server.SimpleHTTPRequestHandler):
    """SimpleHTTPRequestHandler that honours the Range header."""

    # How long each kind of file may be cached. Pages must revalidate so
    # content edits show up immediately; static assets cache long enough
    # that prefetch + repeat visits during a launch spike don't re-hit the
    # server for the same bytes.
    @staticmethod
    def cache_control_for(path):
        ext = os.path.splitext(path)[1].lower()
        # Pages + code change most often (content tweaks, launch hotfixes) so
        # they revalidate quickly; heavy, stable media caches hard so a launch
        # spike or repeat visit never re-downloads it.
        if ext in (".html", ".htm"):
            return "public, max-age=60"               # pages: instant nav, fresh in 1 min
        if ext in (".css", ".js"):
            return "public, max-age=300"              # styles/scripts: fresh in 5 min
        if ext in (".woff", ".woff2", ".ttf", ".otf"):
            return "public, max-age=2592000"          # fonts: 30 days
        if ext in (".webp", ".jpg", ".jpeg", ".png", ".gif", ".svg", ".ico",
                   ".mp3", ".m4a", ".ogg", ".wav", ".flac"):
            return "public, max-age=86400"            # images/audio: 1 day
        return "public, max-age=3600"

    def send_head(self):
        self._range = None
        path = self.translate_path(self.path)
        if os.path.isdir(path):
            return super().send_head()
        try:
            f = open(path, "rb")
        except OSError:
            self.send_error(404, "File not found")
            return None

        size = os.fstat(f.fileno()).st_size
        ctype = self.guess_type(path)
        cache = self.cache_control_for(path)
        rng = self.headers.get("Range")
        self._range = None

        if rng and rng.startswith("bytes="):
            try:
                start_s, end_s = rng[6:].split("-", 1)
                start = int(start_s) if start_s else 0
                end = int(end_s) if end_s else size - 1
            except ValueError:
                start, end = 0, size - 1
            if start >= size:
                self.send_error(416, "Requested range not satisfiable")
                f.close()
                return None
            end = min(end, size - 1)
            self._range = (start, end)
            self.send_response(206)
            self.send_header("Content-Type", ctype)
            self.send_header("Cache-Control", cache)
            self.send_header("Content-Range",
                             "bytes %d-%d/%d" % (start, end, size))
            self.send_header("Content-Length", str(end - start + 1))
            self.send_header("Accept-Ranges", "bytes")
            self.end_headers()
            f.seek(start)
            return f

        self.send_response(200)
        self.send_header("Content-Type", ctype)
        self.send_header("Cache-Control", cache)
        self.send_header("Content-Length", str(size))
        self.send_header("Accept-Ranges", "bytes")
        self.end_headers()
        return f

    def copyfile(self, source, outputfile):
        rng = getattr(self, "_range", None)
        if rng is None:
            super().copyfile(source, outputfile)
            return
        start, end = rng
        remaining = end - start + 1
        while remaining > 0:
            chunk = source.read(min(64 * 1024, remaining))
            if not chunk:
                break
            outputfile.write(chunk)
            remaining -= len(chunk)


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    server = http.server.ThreadingHTTPServer(("", port), RangeRequestHandler)
    print("True North NPK - serving on http://localhost:%d  (Ctrl+C to stop)" % port)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopped.")

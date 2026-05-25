### Currently viewable on preview.truenorthnpk.com
# Note from Luc:
### To edit any text in the website go to the [content file](https://github.com/LucDesautels/TrueNorthNPK-Website/blob/main/js/content.js) and click the edit pencil. from there you can edit the text and create a "pull request", which once I approve will update within 5 minutes.

# True North NPK - Website

A static website for the band **True North NPK** (Noel, Paul & Kevin).

It is plain **HTML, CSS and JavaScript** - no build step, no framework, no
database. That makes it easy to self-host on an Ubuntu server: you just serve
the folder with any web server.

---

## Pages

| File          | Page                                                              |
|---------------|-------------------------------------------------------------------|
| `index.html`  | Home - hero, debut-album preview, placeholder for a second album. |
| `music.html`  | Music - full album with a built-in player + spinning record player. |
| `lyrics.html` | Lyrics - a song tree; click a song for full lyrics in a pop-up.   |
| `about.html`  | About / Contact - band info, member cards, contact form.          |

The nav bar has both an **About** and a **Contact** link; both lead to
`about.html` (Contact jumps to the contact section).

---

## Running it locally (to preview before uploading)

You need [Python](https://www.python.org/) (already on most systems).

From inside this folder, run:

```bash
python serve.py
```

Then open <http://localhost:8000> in a browser. Press `Ctrl+C` to stop.
(Use `python serve.py 8080` to pick a different port.)

> `serve.py` is a tiny local preview server. Use it rather than
> `python -m http.server` - the built-in server cannot serve audio
> "Range" requests, so song scrubbing/seeking would not work locally.
> A real host such as nginx supports this automatically.
>
> Always view the site through a web server like this - opening the
> `.html` files directly (double-clicking) can break some features.

---

## Hosting it on an Ubuntu server

The whole site is just static files, so any web server works. Using **nginx**:

```bash
sudo apt update
sudo apt install nginx

# copy the website folder onto the server, e.g.:
sudo cp -r "TrueNorthNPK Website"/* /var/www/truenorthnpk/
```

Create `/etc/nginx/sites-available/truenorthnpk`:

```nginx
server {
    listen 80;
    server_name truenorthnpk.com www.truenorthnpk.com;   # your domain
    root /var/www/truenorthnpk;
    index index.html;
}
```

Enable it and reload:

```bash
sudo ln -s /etc/nginx/sites-available/truenorthnpk /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

For HTTPS, install a free certificate with Certbot:
`sudo apt install certbot python3-certbot-nginx && sudo certbot --nginx`.

(Apache or `python3 -m http.server` behind a reverse proxy work just as well -
nothing special is required.)

---

## Editing text - `js/content.js`

**Every piece of text the band might want to reword lives in one file:
`js/content.js`.** Open it, edit the values between the quote marks, save,
reload. Don't touch the keys (the words before the colon) or the commas at
the end of each line.

`content.js` covers:

- the home hero description
- both album descriptions
- the three member cards (name, role, bio, contact)
- the about-page paragraphs and section subtitles
- the lyrics + photos page lead text
- the footer tagline
- the contact email and HearNow listen URL
- all 10 song "Significance & Meaning" paragraphs

## Editing songs, lyrics and players - `js/data.js`

Structural content (the things that need new files alongside them) lives
in `js/data.js`:

- **Streaming links** (`STREAMING`) - the nav-bar icons. They are placeholders
  (`"#"`) until the band's profiles go live; replace `"#"` with the real URLs.
- **Member photos** (`MEMBER_PHOTOS`) - which image files go with which member.
- **Albums** (`ALBUMS`) - album titles, years, cover image, song list,
  per-song lyrics, audio file paths and lengths.

### The music player works two ways

Each song's `audio` field can be **either**:

1. A self-hosted file - `"audio": "assets/audio/my-song.mp3"`
2. A direct audio URL - `"audio": "https://example.com/my-song.mp3"`
3. A streaming embed - `"audio": { "embed": "https://open.spotify.com/embed/track/XXXX" }`

Files/URLs use the site's own player (play, pause, skip, volume, record
player). Embeds show the streaming platform's own player instead.

### Album audio

The 10 real *Titanium Attitude* recordings are already in `assets/audio/`
as MP3 files (`01-mclean-refugees.mp3` … `10-beware-the-broken-beast.mp3`).
They were converted from the supplied WAV files to MP3 (224 kbps) so the
site loads quickly. To replace a track later, drop a new file into
`assets/audio/` and point that song's `audio` value at it in `js/data.js`.

### Adding a second (or third…) album

In `js/data.js`, edit the `"album-two"` placeholder object - or add another
album object to the `ALBUMS` array. Give it `status: "released"` and a list of
`songs`. It will automatically appear on the Music page (with its own player)
and in the Lyrics tree. The home page shows the first album as the headline
release.

---

## Other things to update

- **Band group photo** - the home hero and the About page use
  `assets/img/band-placeholder.jpg` (a placeholder). Replace that file with the
  real photo of the three members (keep the same filename, landscape works
  best).
- **Contact email** - currently `contact@truenorthnpk.com`.
  Update `contact.email` in `js/content.js`; the contact details and the
  mail-to form will both pick it up.
- **Contact form** - it opens the visitor's email app with the message ready to
  send (works with no server). To receive submissions directly instead, connect
  the form to a service such as Formspree or Web3Forms later.

---

## Traffic analytics (optional)

The site is wired for Google Analytics 4 but disabled by default. To turn
it on, open `js/analytics.js`, create a free GA4 property at
[analytics.google.com](https://analytics.google.com/), and paste your
Measurement ID (looks like `G-XXXXXXXXXX`) between the empty quotes:

```js
const TNNPK_GA_ID = "G-XXXXXXXXXX";
```

While that string is empty, no analytics script is loaded and no tracking
happens.

---

## Folder structure

```
index.html, music.html, lyrics.html, about.html   pages
serve.py          local preview server (not needed once hosted)
css/style.css                                      all styling
js/content.js     ALL editable text - the one file the band edits
js/data.js        structural content: songs, lyrics, audio paths, links
js/shared.js      nav bar + footer (shared by every page)
js/player.js      music page: album rendering + audio/record player
js/lyrics.js      lyrics page: song tree + pop-up
js/controls.js    light/dark theme + the on-page Website Controls panel
js/analytics.js   Google Analytics stub (paste a Measurement ID to enable)
assets/img/       images
assets/audio/     the 10 album track MP3s
assets/docs/      the full PDF lyric book
```

---

## A note on the lyrics

Lyrics were transcribed from the supplied PDF lyric book. A few obvious
mechanical typos in the source were corrected (e.g. `runnin;` → `runnin'`,
`twrilin'` → `twirlin'` in *McLean Refugees*). Please proofread the lyrics in
`js/data.js` against the band's master copy and edit freely.

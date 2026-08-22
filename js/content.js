/* =============================================================
   True North NPK - editable content
   -------------------------------------------------------------
   This is the ONE file to edit when changing any text on the
   site. Each piece of text used to be labelled with a letter
   ([A], [B], [C]...) on the page so you could identify it; the
   matching letters are now in the comments below.

   How to edit:
     - Change the value between the quote marks ("...").
     - Do NOT change the keys (the words before the colon).
     - Don't remove the commas at the end of each line.
     - Save the file, reload the page.

   For long text, you can break a string across lines like:
       myText:
         "First line of text " +
         "and the rest of the text on the next line.",
   ============================================================= */

const CONTENT = {

  /* ------------------------------------------------------------
     HOME PAGE
     ------------------------------------------------------------ */
  home: {
    // [A] - Hero description (under the band name on the landing page)
    heroDescription:
      "True North NPK is Noel, Paul and Kevin with a little help from their friends. " +
      "Their debut rock album, Titanium Attitude, is out now."
  },

  /* ------------------------------------------------------------
     ALBUMS  (descriptions shown on Home preview + Music page)
     ------------------------------------------------------------ */
  albums: {
    // [B] - Titanium Attitude (debut album)
    titaniumAttitudeDescription:
      "True North NPK's debut album.",

    // [C] - Album two placeholder
    albumTwoDescription:
      "True North NPK's second album is on the way.",

    // [X] - Full liner-note credits shown below the Titanium Attitude
    //       song list on the Music page. Blank lines start new sections.
    titaniumAttitudeCredits:
      "All songs © 2026 Noel Desautels, Paul Cusenza, and Kevin Zarnett\n" +
      "Additional co-writing contributions: Luc Desautels (3), Norm Weins (7), Kent E.M. Groves (8).\n" +
      "\n" +
      "Noel: Vocals, banjo, & guitar\n" +
      "Paul: Vocals\n" +
      "Kevin: Vocals and instrumentation\n" +
      "\n" +
      "Additional musicians:\n" +
      "Mark Kelso: Drums & Percussion (1-7, 9-10)\n" +
      "Deborah Treger: Vocals (5)\n" +
      "Lawrie Ingles: Piano (9)\n" +
      "Laurelle Augustyn & Michelle White: Vocals (9)\n" +
      "\n" +
      "Produced by True North NPK\n" +
      "Artwork Concept: True North NPK\n" +
      "Artwork Design & Photography: Paul Cusenza\n" +
      "Recorded and mixed by Kevin Zarnett\n" +
      "Drums recorded by Mark Kelso at Groovy Drums Studio\n" +
      "Additional recording by Noel Desautels & Paul Cusenza\n" +
      "Mastered by brilliantfish @ TELEPHONE\n" +
      "Physical Copy Pressed by Train Records in Canada"
  },

  /* ------------------------------------------------------------
     ABOUT PAGE
     ------------------------------------------------------------ */
  about: {
    // [G] - Official band biography, rendered as headings + paragraphs
    bio: [
      { type: "p", text:
        "True North NPK isn't just a band — it's a story of three lives that converged " +
        "across decades, continents, and careers, ultimately forming a sound shaped by " +
        "resilience, gratitude, and the kind of hard-earned wisdom that only comes from " +
        "living deeply." },
      { type: "p", text:
        "The trio — Noel Desautels, Paul Cusenza, and Kevin Zarnett — bring together " +
        "more than 150 years of combined life experience. Between them, they've survived " +
        "cancer, supported spouses through their own battles, navigated divorce, celebrated " +
        "forty-year marriages, raised children and grandchildren, and mourned the people " +
        "they've loved. Their music carries all of it: the scars, the hope, the humor, the " +
        "grit, and the unmistakable sense that life is still worth singing about." },
      { type: "p", text:
        "Their origin story is as unexpected as it is compelling. Noel and Paul first met " +
        "while attending Harvard, forming a friendship that would quietly simmer for years. " +
        "Noel and Kevin connected later as business colleagues, discovering a shared " +
        "creative pulse that eventually pulled all three men into the same orbit. What began " +
        "as friends writing songs together became True North NPK — a name built from " +
        "their initials, but also a nod to the compass point that guides their music: " +
        "honesty, heart, and the courage to keep moving forward." },
      { type: "p", text:
        "Their debut album, Titanium Attitude (May 2026), produced entirely by the band, " +
        "blends rock, folk, country, and blues — often drawing comparisons to Tom Petty " +
        "for its warm Americana spirit and storytelling depth. The band's message is simple " +
        "but powerful: meet life's challenges by being bold, kind, and strong. In their " +
        "words, have a Titanium Attitude." },
      { type: "h3", text: "The Creative Chemistry Behind the Music" },
      { type: "p", text:
        "Every song is co-written by all three members — a collaborative process that " +
        "defines the band's identity. Kevin, a multi-instrumentalist, shapes much of the " +
        "musical landscape. His guitar, bass, harmonica, keys, and production instincts form " +
        "the backbone of their sound, with Noel adding guitar and banjo textures that deepen " +
        "the band's folk-rock roots. Vocally, Kevin leads seven tracks, Noel leads two, and " +
        "Paul leads one, with Noel and Paul layering harmonies and accents that give each " +
        "song its emotional lift." },
      { type: "p", text:
        "Their signature track, “Titanium Attitude,” captures the band's identity " +
        "more than any other. It's the anthem that defines their message — resilience, " +
        "courage, and the belief that people can choose strength even in the hardest " +
        "moments. Songs like “Underdog,” “Send a Smile,” and “McLean " +
        "Refugees” have already resonated strongly with listeners, but “Titanium " +
        "Attitude” remains the heart of who they are." },
      { type: "p", text:
        "If True North NPK has a visual or emotional vibe, it's grounded in nature, warmth, " +
        "and authenticity. Their sound sits comfortably in Heartland Rock, woven with Folk, " +
        "Blues, and Country — music that feels lived-in, supportive, and honest." },
      { type: "p", text:
        "Their hope is simple: that someone hearing them for the first time feels " +
        "emotionally moved. That the lyrics spark reflection. That the music nudges " +
        "listeners toward better choices, deeper gratitude, and a clearer sense of what " +
        "matters." },
      { type: "h3", text: "A Band Built Across Distances" },
      { type: "p", text:
        "One of the most surprising elements of their process is how the band creates " +
        "together while living in different locations. Ideas travel across cities and " +
        "states, and Kevin brings it all home — mixing and mastering the recordings " +
        "into cohesive, fully realized songs." },
      { type: "p", text:
        "Noel's role sits at the emotional center of the band's creative chemistry. His " +
        "instinct for melody, his ability to add warmth through guitar and banjo, and his " +
        "vocal presence give the songs their human pulse. Noel's contributions often shape " +
        "the tone of a track — grounding the music in authenticity and giving it the " +
        "lived-in quality that defines True North NPK's sound." },
      { type: "p", text:
        "For Paul, creativity is shaped by a life lived widely and deeply. Though known for " +
        "a successful business career — including being one of the co-founders of " +
        "23andMe — art and music have always been his true passion. He has seen over " +
        "400 musical acts live, from artists representing every letter of the alphabet, and " +
        "his experiences as a grandfather, a cancer survivor, and a traveler who has " +
        "explored all 50 U.S. states, six Canadian provinces, 39 countries, and 31 national " +
        "parks all feed into his perspective as a songwriter. His love for people, places, " +
        "and stories is woven into every lyric he touches." },
      { type: "p", text:
        "Paul jokes, “We just did a band DNA test and we're 100% titanium!” — " +
        "a line that captures the band's spirit perfectly: grounded, humorous, and " +
        "unshakably optimistic." },
      { type: "h3", text: "Three Artists, One Voice" },
      { type: "p", text:
        "Together, Kevin, Noel, and Paul form a band of multitalented individuals whose " +
        "combined skills, experiences, and perspectives create a sound that is both deeply " +
        "personal and universally resonant. Their story is real. Their bond is deep. Their " +
        "music is timeless." },
      { type: "p", text:
        "True North NPK is entering a new creative chapter — with two more albums " +
        "already in development — and their voice is one the world is ready to hear." }
    ],

    // [Y] - Small credit shown at the very bottom of the About page
    siteCredit: "Website created and maintained by Luc Desautels."

    // (The Contact section subtitle is intentionally absent - there is no
    //  subtitle line under the Contact heading on the About page.)
  },

  /* ------------------------------------------------------------
     MEMBERS  (cards on the About page)
     - "name", "role", "bio" and "contact" are all editable.
     - "contact" appears in the "Band Members" list in the
       Contact section.
     ------------------------------------------------------------ */
  members: [
    {
      // [D]
      name: "Noel Desautels",
      role: "Vocals, Banjo & Guitar",
      bio:  "Noel brings strings to True North NPK - banjo, guitar and vocals woven through the record; co-writer of all songs."
    },
    {
      // [E]
      name: "Paul Cusenza",
      role: "Vocals & Artwork Design",
      bio:  "Paul lends his voice to the band and designed the Titanium Attitude artwork; co-writer of all songs."
    },
    {
      // [F]
      name: "Kevin Zarnett",
      role: "Vocals & Instrumentation",
      bio:  "Kevin handles vocals and instrumentation, and recorded and mixed the album; co-writer of all songs.",
      link: { url: "https://kevinzarnett.com/", label: "kevinzarnett.com" }
    }
  ],

  /* ------------------------------------------------------------
     CONTACT  (email + listen link in the Contact section)
     ------------------------------------------------------------ */
  contact: {
    email:     "contact@truenorthnpk.com",
    listenUrl: "https://truenorthnpk.hearnow.com/",
    bandcamp:  "https://truenorthnpk.bandcamp.com/album/titanium-attitude",
    instagram: "true_north_npk_band"            /* handle only, no @ */
  },

  /* ------------------------------------------------------------
     LYRICS PAGE
     ------------------------------------------------------------ */
  lyrics: {
    // [K]
    pageLead:
      "Browse the song tree below - click any song to open its full lyrics. " +
      "Prefer to read the whole book at once?"
  },

  /* ------------------------------------------------------------
     PHOTOS PAGE
     ------------------------------------------------------------ */
  photos: {
    // [W]
     //(Placeholders for now - drop real images into assets/img/photos/.)
    pageLead:
      "A growing gallery of band photos."
  },

  /* ------------------------------------------------------------
     FOOTER  (shown on every page)
     ------------------------------------------------------------ */
  footer: {
    // [L]
    tagline: "Titanium Attitude - out now."
  },

  /* ------------------------------------------------------------
     SONG "SIGNIFICANCE & MEANING" PARAGRAPHS
     - Keys must match each song's title exactly.
     - Shown on the Lyrics page pop-up and the Music page side panel.
     ------------------------------------------------------------ */
  songMeanings: {
    // [M]
    "McLean Refugees":
      "The band can add the story and meaning behind \"McLean Refugees\" here.",

    // [N]
    "Nowhere or Norway (Singing Sands)":
      "The band can add the story and meaning behind \"Nowhere or Norway (Singing Sands)\" here.",

    // [O]
    "Underdog":
      "The band can add the story and meaning behind \"Underdog\" here.",

    // [P]
    "Send a Smile":
      "The band can add the story and meaning behind \"Send a Smile\" here.",

    // [Q]
    "Titanium Attitude":
      "The band can add the story and meaning behind \"Titanium Attitude\" here.",

    // [R]
    "Didn't Die in '22":
      "The band can add the story and meaning behind \"Didn't Die in '22\" here.",

    // [S]
    "Busy":
      "The band can add the story and meaning behind \"Busy\" here.",

    // [T]
    "Half Full":
      "The band can add the story and meaning behind \"Half Full\" here.",

    // [U]
    "Count on Me":
      "The band can add the story and meaning behind \"Count on Me\" here.",

    // [V]
    "Beware the Broken Beast (Krampus Song)":
      "The band can add the story and meaning behind \"Beware the Broken Beast (Krampus Song)\" here."
  }
};

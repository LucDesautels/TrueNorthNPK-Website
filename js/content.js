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
    // [G] - Band description, paragraph 1
    paragraph1:
      "True North NPK is a rock band comprised of Noel Desautels, Paul Cusenza and " +
      "Kevin Zarnett. The \"NPK\" is simply the three of them: friends who write " +
      "and record songs together with a little help from their friends.",

    // [H] - Band description, paragraph 2
    paragraph2:
      "Their music leans on folk and rock roots, with lyrics about resilience, " +
      "gratitude, family and finding the sun-lit route through hard times. Their debut " +
      "album, Titanium Attitude, was produced by the band, with artwork in the style of " +
      "Canadian West Coast art.",

    // [I] - "The Members" subtitle
    membersSectionLead:
      "Hover over a card to see a second photo of each member.",

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
    instagram: "True_North_NPK"            /* handle only, no @ */
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
    pageLead:
      "A growing gallery of band photos. (Placeholders for now - drop real images into assets/img/photos/.)"
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

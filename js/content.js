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
      "True North NPK is a three-piece band of friends - Noel, Paul and Kevin - " +
      "writing honest songs about resilience, gratitude and the long way home. " +
      "Their debut album, Titanium Attitude, is out now."
  },

  /* ------------------------------------------------------------
     ALBUMS  (descriptions shown on Home preview + Music page)
     ------------------------------------------------------------ */
  albums: {
    // [B] - Titanium Attitude (debut album)
    titaniumAttitudeDescription:
      "True North NPK's debut album. Ten songs about resilience, gratitude and " +
      "finding the sun-lit route - wrapped in West Coast art and a titanium spirit.",

    // [C] - Album two placeholder
    albumTwoDescription:
      "True North NPK's second album is on the way. This space is a placeholder - " +
      "when the record is ready, it will appear here automatically with its own player."
  },

  /* ------------------------------------------------------------
     ABOUT PAGE
     ------------------------------------------------------------ */
  about: {
    // [G] - Band description, paragraph 1
    paragraph1:
      "True North NPK is a three-piece band - Noel Desautels, Paul Cusenza and " +
      "Kevin Zarnett. The \"NPK\" is simply the three of them: friends who write " +
      "and record songs together.",

    // [H] - Band description, paragraph 2
    paragraph2:
      "Their music leans on folk and rock roots, with honest lyrics about resilience, " +
      "gratitude, family and finding the sun-lit route through hard times. Their debut " +
      "album, Titanium Attitude, was produced by the band, with artwork in the style of " +
      "West Coast art.",

    // [I] - "The Members" subtitle
    membersSectionLead:
      "Hover over a card to see a second photo of each member.",

    // [J] - "Contact" subtitle
    contactLead:
      "Booking, press or just saying hello - reach out below."
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
      name:    "Noel Desautels",
      role:    "Vocals, Banjo & Guitar",
      bio:     "Noel brings the strings to True North NPK - banjo, guitar and vocals woven through the record.",
      contact: "[contact placeholder]"
    },
    {
      // [E]
      name:    "Paul Cusenza",
      role:    "Vocals & Artwork Design",
      bio:     "Paul lends his voice to the band and designed the Titanium Attitude artwork.",
      contact: "[contact placeholder]"
    },
    {
      // [F]
      name:    "Kevin Zarnett",
      role:    "Vocals & Instrumentation",
      bio:     "Kevin handles vocals and instrumentation, and recorded and mixed the album.",
      contact: "[contact placeholder]"
    }
  ],

  /* ------------------------------------------------------------
     CONTACT  (email + listen link in the Contact section)
     ------------------------------------------------------------ */
  contact: {
    email:     "hello@truenorthnpk.com",
    listenUrl: "https://truenorthnpk.hearnow.com/"
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

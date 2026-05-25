/* =============================================================
   True North NPK - site data
   -------------------------------------------------------------
   This is the only file the band needs to edit to update content.
   - Add a new album: push another object onto ALBUMS.
   - Each song's `audio` is the playable source. It accepts EITHER:
       * a self-hosted / uploaded file ........ "assets/audio/song.mp3"
       * a direct audio URL ................... "https://.../song.mp3"
       * a streaming embed (Spotify/YouTube) .. { embed: "https://open.spotify.com/embed/track/XXXX" }
     The player automatically uses the right mode per song.
   - `meaning` is the paragraph shown on the Lyrics page. Edit freely.
   ============================================================= */

/* ---- Streaming platforms (nav bar links) ----
   Links are placeholders ("#") until the band's profiles go live.
   HearNow is already live. Swap "#" for real URLs when ready.      */
const STREAMING = [
  { name: "Spotify",       url: "#", icon: "spotify" },
  { name: "Apple Music",   url: "#", icon: "apple" },
  { name: "YouTube Music", url: "#", icon: "youtube" },
  { name: "HearNow",       url: "https://truenorthnpk.hearnow.com/", icon: "hearnow" },
  { name: "Bandcamp",      url: "https://truenorthnpk.bandcamp.com/album/titanium-attitude", icon: "bandcamp" }
];

/* ---- Band members ----
   Names / roles / bios / contacts live in js/content.js. Photos are
   here because they are tied to specific image files in assets/img/. */
const MEMBER_PHOTOS = [
  { photo: "assets/img/noel-1.jpg",  photoHover: "assets/img/noel-2.jpg"  },
  { photo: "assets/img/paul-1.jpg",  photoHover: "assets/img/paul-2.jpg"  },
  { photo: "assets/img/kevin-2.jpg", photoHover: "assets/img/kevin-1.jpg" }
];
const MEMBERS = (CONTENT.members || []).map(function (m, i) {
  return Object.assign({}, m, MEMBER_PHOTOS[i] || {});
});

/* ---- Albums ---- */
const ALBUMS = [
  {
    id: "titanium-attitude",
    title: "Titanium Attitude",
    eyebrow: "NPK-001",
    year: "2026",
    status: "released",          // "released" or "upcoming"
    cover: "assets/img/album-titanium-attitude.jpg",
    description: CONTENT.albums.titaniumAttitudeDescription,
    credits: CONTENT.albums.titaniumAttitudeCredits,
    songs: [
      {
        num: 1,
        title: "McLean Refugees",
        length: "3:35",
        credits: "© 2026 Noel Desautels, Paul Cusenza & Kevin Zarnett",
        audio: "assets/audio/01-mclean-refugees.mp3",
        lyrics:
`Now there's a
Couple of girls, playing back by the hollies
Couple of girls secrets after midnight
Couple of girls make believe with some dollies
(And) guinea pig Coco she's about to take flight

One girl a swimmin' a swimmin' a swim swim
Loves every dog in the 10-acre 'hood
One girl's a whimsy, a whimsy collectin'
Nose in a script and her lines comin' good

Dozen nests in a copper top bird house
Laurel's under the East oak trees
Deer and fox at the brook with a field mouse
Woods of the Grosse Pointe refugees
Woods of the Grosse Pointe refugees

Couple of girls runnin' runnin' a runnin'
Couple of girls runnin' runnin' a run
Couple of girls twirlin' twirlin' a twirlin'
Couple girls twirlin' twirlin' some fun

Where are they goin' a goin' a go go
What's up ahead for McLean refugees
Pup licks the air, licks the air licks the air slow
At squirrels and whirls and two girls in trees

Dozen nests in a copper top bird house
Laurel's under the East oak trees
Deer and fox at the brook with a field mouse
Woods of the Grosse Pointe refugees
Woods of the Grosse Pointe refugees

Couple of girls go roamin' roam a roamin'
Couple of girls will always come home

Dozen nests in a copper top bird house
Laurels under the East oak trees
Deer and fox at the brook with a field mouse
Woods of the Grosse Pointe refugees
Woods of the future McLean refugees
Woods of the future McLean refugees

Couple of girls runnin' runnin' a runnin'
Couple of girls runnin' - yeah
Couple of girls… future McLean refugees
Couple of girls… the future McLean refugees`,
      },
      {
        num: 2,
        title: "Nowhere or Norway (Singing Sands)",
        length: "4:28",
        credits: "© 2026 Noel Desautels, Paul Cusenza & Kevin Zarnett",
        audio: "assets/audio/02-nowhere-or-norway.mp3",
        lyrics:
`Well, a quarter note can last a lifetime depending on the score
What sends life into a black abyss is doin' the same old chore
When standing's more disastrous than walking through the door
It's pain and pain and pain and nothing more

And I watched her drowning her good life,
so sad to see it dead
And the float she threw to me, an anchor - sinking lead
And if I prayed, I'd pray some day in other distant lands
She'd find her glowing growing life adventure on singing sands

Maybe all I've got is three years left, but it's twenty-three I bet
Maybe five thousand sunrises, less one lonesome sunset
But darlin' eyes, you probably like Dylan, and I can't wait to enquire
I'll take you out and see what sets you on fire

But I watched her drowning her good life, so sad to see it dead
And the float she threw to me, an anchor - sinking lead
And if I prayed, I'd pray some day in other distant lands
She'd find her glowing growing life adventure on singing sands

Given a second chance would you give up some control?
Given a second chance are there friends you would keep close?
Given a second chance… Given a second chance…
Given a second chance… Give it a second chance

Yeah maybe all I've got is three years left, but it's twenty-three I bet
Maybe five thousand sunrises, less one lonesome sunset
Maybe five thousand sunrises, less one lonesome sunset
But I want to see Dylan one more time and Chapin and Denver and Gord

And wake up in Tahiti or a North Atlantic fjord
And wake up in Kenya or Peru
And I want to wake up with you`,
      },
      {
        num: 3,
        title: "Underdog",
        length: "5:26",
        credits: "© 2026 Noel Desautels, Paul Cusenza, Kevin Zarnett & Luc Desautels",
        audio: "assets/audio/03-underdog.mp3",
        lyrics:
`Couldn't follow as other kids skipped
Standing all alone the last one picked
My numbers and letters were reversed
They thought my progress would be the worst

But my mother, she believed in me
She realized that I couldn't see
Saw what others could not discover
Showing the deep love of a mother

They don't expect me to ever win
They don't believe I have the right stuff
But I know who I've always been
I am the Underdog, I am the Underdog
I am the Underdog, bold, strong and tough

Didn't ask to lead just always did
Couldn't standby watching as things slid
Finding paths to attain a vision
Making it happen is the mission

Underdogs thrive as a loyal pack
Persevering and staying on track
Doing what no one thought could be done
Making it a reality is fun

They don't expect me to ever win
They don't believe I have the right stuff
But I know who I've always been
I am the Underdog, I am the Underdog
I am the Underdog, bold, strong and tough

Entering the terrifying infinite fog
They call me the outmatched Underdog
Shining a light the kindly creator
Diligent working innovator

Working all day and nine nights a week
Creating companies so unique
Many new businesses saw their dawn
Sometimes a duckling is really a swan

They don't expect me to ever win
They don't believe I have the right stuff
But I know who I've always been
I am the Underdog, I am the Underdog
I am the Underdog, bold, strong and tough

Two times, might be luck
Five times, not so much
Rarely acknowledged or even seen
Working away like a smart machine

Emerging to shocking victory
Creating beacons for history
Rocky rising the Philly art steps
The Karate Kid doing his reps
Eminem making it on 8 mile
Legally Blonde winning with a smile

They don't expect me to ever win
They don't believe I have the right stuff
But I know who I've always been

I am the Underdog, I am the Underdog
I am the Underdog, bold, strong and tough
I am the Underdog, bold, strong and tough
I am the Underdog, I am the Underdog
I am the Underdog, bold, strong and tough`,
      },
      {
        num: 4,
        title: "Send a Smile",
        length: "3:28",
        credits: "© 2026 Noel Desautels, Paul Cusenza & Kevin Zarnett",
        audio: "assets/audio/04-send-a-smile.mp3",
        lyrics:
`You and I, laughing for laughing's sake
Sharing thoughts, and making time,
yeah, the give and take
Seeing your smile, oh boy!
My heart fills with joy

No matter where you are, send a smile
Your soulful eyes travel in style
It's not complicated, but so worthwhile
To send a smile

You and I, a collage fills my mind
Out for a walk, music playing, our B.C. beach find
And if we're feeling blue
One thing I know to be true

No matter where you are, send a smile
Your soulful eyes travel in style
It's not complicated, but so worthwhile
To send a smile

So happy that I know you
You get me through life's trials
Come with me to high tea
Thinking of you, I'm all smiles

You and I, we don't know what comes next
Northern lights, films all night, Seven's art fest
Today I just want to hear your laugh
Reminding me our love will last

No matter where you are, send a smile
Your soulful eyes travel in style
It's not complicated, but so worthwhile
To send a smile

Send a smile
Send a smile`,
      },
      {
        num: 5,
        title: "Titanium Attitude",
        length: "4:20",
        credits: "© 2026 Noel Desautels, Paul Cusenza & Kevin Zarnett",
        audio: "assets/audio/05-titanium-attitude.mp3",
        lyrics:
`Things will happen out of our control
Choosing how to respond is our role
Cut me open took my organ out
Chose to fight and took the sun-lit route

Keeping track of my medication
Going daily to radiation
Lost my strength and drive, and lost my hair
I see rainbows dancing on the stairs

Got time to live, got time to give
Living with much gratitude
Got time to live, got time to give
Titanium Attitude, Titanium Attitude

Many places to-go and love to share
Time's short I know, longer with a prayer
Forest floors a-live with trillium
Nature blooms in equilibrium

Got time to live, got time to give
Living with much gratitude
Got time to live, got time to give
Titanium Attitude, Titanium Attitude

Titanium Attitude
Titanium Attitude

Dress rehearsal's over; helmets on
Can't get me down 'cause the rising of the sun

Music makes me get up and just dance
Movies send me into a deep trance
My team winning is conceivable
Live dream moments, that's achievable

Got time to live, got time to give
Living with much gratitude
Got time to live, got time to give
Titanium Attitude

Got love to live, got love to give
Living with much gratitude
Got love to live, got love to give
Titanium Attitude

Shiny chrome heart attitude
Titanium Attitude`,
      },
      {
        num: 6,
        title: "Didn't Die in '22",
        length: "3:32",
        credits: "© 2026 Noel Desautels, Paul Cusenza & Kevin Zarnett",
        audio: "assets/audio/06-didnt-die-in-22.mp3",
        lyrics:
`Ruskies stormed the Donbas, and they burned it all to hell
Whole world hates America, dark days here, can you tell?
Fell into a cactus, needles stayed and I'm to blame
Don't know if that's a metaphor, it hurts the bloody same

Ripped and zapped my innards but they didn't get it all
Drugs saved me and destroyed me, slowed me to a crawl
JazzFest in a thunderstorm with mud above my toes
Joe sued me for millions over wording, so it goes

At least I didn't die in '22
Hey there Mister Reaper, how do you do?
At least I didn't die in '22
I'm still here… so gratitude

Helen turned a hundred sad she died in twenty-two
Tried to fly to Frankfurt, ended up in Katmandu
They said, "stay and help us," then told us, "get out!"
Windows glitched me daily, that's what Microsoft's about

Attacked left, right and center - I'm too woke or not enough
Set up for a sucker-punch, I thought it was a bluff
Went to test my luck in Vegas; came out a loser
Gave some work to Jason, found out he was a boozer

At least I didn't die in '22
Hey there Mister Reaper, joke's on you
At least I didn't die in '22
I'm still here… so gratitude

I'm still here...
What else is on my mind?

Led Andy to the money but he took it with a smile
Katie lost her memory, denies it all the while
Made millions in the market, then it fell right down to zero
Tried to save my closest friend, but I am not a hero

At least I didn't die in '22
Hey there Mister Reaper, how are you?
At least I didn't die in '22
I'm still here but my time is overdue

At least I didn't die in '22
Hey there Mister Reaper, have you got me any news?
At least I didn't die in '22
I'm still here… so gratitude`,
      },
      {
        num: 7,
        title: "Busy",
        length: "3:39",
        credits: "© 2026 Noel Desautels, Paul Cusenza, Kevin Zarnett & Norm Weins",
        audio: "assets/audio/07-busy.mp3",
        lyrics:
`Busy, busy like the rain in a storm
Busy like a bee in a swarm
Busy, seems I'm doin' all that I could
But I ain't doin' what I should

Like a caffeinated cat on a fly factory floor
A family reunion of rabbits galore
A bead collector dancing Mardi Gras
Where an artist is frantically trying to draw

I'm busy, busy like the rain in a storm
Busy like a bee in a swarm
Busy, seems I'm doin' all that I could
But I ain't doin' what I should

Like a dog alone in a butcher store
A pizza box lid on a teenager's floor
A G-chord played over a folk-singer's rhyme
A telemarketer at dinnertime

I'm busy, busy like the rain in a storm
Busy like a bee in a swarm
Busy, seems I'm doin' all that I could
But I ain't doin' what I should

(Ain't doin') ain't doin', (ain't doin') ain't doin',
(ain't doin') ain't doin' what I should
(Ain't doin') ain't doin', (ain't doin') ain't doin',
(ain't doin') ain't doin' what I should

Forget the flies on a garbage dump
I look busy but I'm up to no good

Like a crooked preacher in a den of sin
A termite down in a sawdust bin
A vacuum cleaner on a Spanish beach
A lie detector at a President's speech

I'm busy, busy like the rain in a storm
Busy like a bee in a swarm
Busy, seems I'm doin' all that I could
But I ain't doin' what I should

Ain't doin' what I should
Aaaaain't doin' what I should`,
      },
      {
        num: 8,
        title: "Half Full",
        length: "4:10",
        credits: "© 2026 Noel Desautels, Paul Cusenza, Kevin Zarnett & Kent E.M. Groves",
        audio: "assets/audio/08-half-full.mp3",
        lyrics:
`When his number hit fifty-something
It was time for a little shift
He'd gone from nothing to stuffed garages
Some drama, some baggage, some shit

So he downsized to a few guitars
Dropped a few folks along the way
Lost a couple he'd rather have not
Picked a few new to join the fray

Now he's finding glasses half full
Makin' days a laugh-full
Flies the world fixin' health plans and givin' a hand
Marilyn's his hero
Regrets are down to zero
Got his honey over there in Florence land

So he gathers his dozen reprobates
To a beach where they've never been
Where they all lose some crap that's a-weighing-em down
Through scotch, or song, or Zen

There's sun and stars and sails and tales
And cookin' and breeze and dark seas
Then as the camera zooms out
I heard Jack Taylor shout
"We can never go back to the freeze!"

Now he's finding glasses half full
Makin' days a laugh-full
Flies the world fixin' health plans and givin' a hand
Marilyn's his hero
Regrets are down to zero
Got his honey over there in Florence land

Ditched the suits for maritime roots
And put the travel shoes on
Ditched his jailors for Martins and Taylors
To rock and folk and blues on… yeah

So his future's full of sailing
Collecting countries like ball-card sets
Got a couple of places on Anna Maria
No cars; three pools; no pets

And he's running on sand in the morning
And he's singing guitar at night
Ain't so bad just to have in a suitcase
All you need to do epic right

Now he's finding glasses half full
Makin' days a laugh-full
Flies the world fixin' health plans and givin' a hand
Marilyn's his hero
Regrets are down to zero
Got his honey over there in Florence land
Got Jen there in Florence land
Jennifer in Florence that's just grand`,
      },
      {
        num: 9,
        title: "Count on Me",
        length: "3:56",
        credits: "© 2026 Noel Desautels, Paul Cusenza & Kevin Zarnett",
        audio: "assets/audio/09-count-on-me.mp3",
        lyrics:
`What can you count on?
What can you count on?

Cannot count on Cronkite, not since '81
What goes around never comes around for some
Allies don't come through, well that's just the ugly truth
Clouds have no silver linings, and the ends have overtaken the means
Patience is not a virtue sight unseen
You go through the pain, but you never attain the gain
As unlikely as it seems

(What can you count on?)
Odd as this may be
(What can you count on?)
One thing you can count on
Breathe deep - and count on me

Not reaping what you're sowing and time's not healing wounds
When one door closes you've been locked into the room
When it comes to taxes and death, you can only delay at best
As unlikely as it seems

(What can you count on?)
Odd as this may be
(What can you count on?)
One thing you can count on
Breathe deep - and count on me

I might be slow to the punch
Yet when it gets down to the crunch
I'll be your one, two, three
'cos you can count on me

Practice does not make perfect and this too shall not pass
Everything happens for no good reason, you just get a pain in the ass
Stopping at the starting gate, good things don't come to those who wait
As unlikely as it seems
Odd as this may be
There's one thing you can count on -

As unlikely as it seems
(What can you count on?)
Odd as this may be
(What can you count on?)
One thing you can count on
Breathe deep - and count on me

Close your eyes baby and count on
Breathe deep and count on me
Count on me (repeated)`,
      },
      {
        num: 10,
        title: "Beware the Broken Beast (Krampus Song)",
        length: "5:23",
        credits: "© 2026 Noel Desautels, Paul Cusenza & Kevin Zarnett",
        audio: "assets/audio/10-beware-the-broken-beast.mp3",
        lyrics:
`He'll never give you reasons
For his inner dark demons
He lurks in shallow shadows
Adorned in clever camos

Beware the hidden psychopath
Who does not fear a black bloodbath
Any conscience is concealed -
To his coy charms you should not yield

When the Krampus comes to Campus
Beware the broken beast
He offers fleshy fruits
But there are no treats…
Beware the broken beast

He will meet you at rooftop bars
Alluring your eyes to stunning stars
He'll take you to your hallowed home
Then trap you 'neath his darkened dome

He'll calmly keep his hidden list
And disappear into the mist
Seeking only his private joy
By using you, a broken toy

When the Krampus comes to Campus
Beware the broken beast
He offers fleshy fruits
But I beg you, do not eat
Beware the broken beast

Beware... Beware... Beware... Beware...

Through dark solstice is joy confirmed?
Or Krampus, your cold karma earned?
Time to look into the mirror
As it's all becoming clearer

It's now long past the time to leave
Appearing during darkest eve
Krampus is creeping at your door
Your undeserved predator

When the Krampus comes to Campus
Beware the broken beast
He offers fleshy fruits
But there are no treats…
Beware the broken beast

He smiles upon your family
Hiding menacing malady
Seeking his ghoulish ghastly gain
Willing to unleash any pain

By now I hope you get the gist
Beware his hellish hidden fist
Pretending to be sweet and coy
Don't let the dark demon destroy

When the Krampus comes to Campus
Beware the broken beast
He offers fleshy fruits
But I beg you, do not eat
When the Krampus comes to Campus

Beware the devil's priest
Avoid his fetid feast
He could not care the least
Beware the broken beast`,
      }
    ]
  },

  /* ---- Album 2: placeholder / wireframe for a future release ---- */
  {
    id: "album-two",
    title: "Coming Soon",
    eyebrow: "NPK-002",
    year: "",
    status: "upcoming",
    cover: null,
    description: CONTENT.albums.albumTwoDescription,
    songs: []
  }
];

/* ---- Wire each song's "meaning" paragraph from CONTENT.songMeanings ---- */
ALBUMS.forEach(function (album) {
  album.songs.forEach(function (song) {
    song.meaning = (CONTENT.songMeanings && CONTENT.songMeanings[song.title]) || "";
  });
});

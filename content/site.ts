// All site copy lives here, separated from presentation, so it can be
// updated without touching component code.

export const nav = {
  logo: 'Lena in the Wild',
  menuLogo: 'Lena',
  links: [
    { label: 'About', href: '#about' },
    { label: 'Who I Help', href: '/life-design' },
    { label: 'The Freedom Seeker', href: '#freedom-seeker', expandable: true },
    { label: 'Journal Entries', href: '/journal' },
    { label: "Let's Connect", href: '#contact' },
  ],
  subscribeLabel: 'Subscribe',
  closeLabel: 'Close',
};

export const hero = {
  kinetic: 'LITW',
  headline: 'Lena in the Wild',
  sub: 'Just a girl who left it all behind at 36 to go after her dream life.',
  subSmall: 'If I can reinvent my life, so can you',
  scrollLabel: 'Scroll to Begin',
  badgeText: 'LENA IN THE WILD • LENA IN THE WILD • ',
  ctaLabel: 'Come along',
  ctaHref: '#story',
  imageSrc: '/images/hero.jpg' as string | null,
};

export const welcome = {
  eyebrow: 'Welcome to Lena in the Wild',
  headline: "For the person who knows there's more to life and is ready to find it.",
  supportLeft:
    "You've been feeling that pull, little nudges to go after your dream. You're standing in the life you thought you wanted, feeling stuck, stagnant, unfulfilled, searching for answers.",
  supportRight: "I feel you. That was me. Trust me, you're in the right place.",
  cta: "Here's how it all started",
  ctaHref: '#about',
  chapterLabel: 'Lena in the Wild',
  bigLead: 'Reinvent',
  bigMoving: 'Your',
  bigWord: 'LIFE',
  // Matches the menu links.
  chapters: nav.links.map((link, i) => ({ number: String(i + 1).padStart(2, '0'), label: link.label, href: link.href })),
  statBlock: {
    text: '36 years old when I walked away from the life everyone said I should want — and I never looked back.',
  },
};

export const myStory = {
  label: 'My Story',
  quote: "I just had a deep, undeniable knowing that this life wasn't for me anymore.",
  body:
    "Hi, I'm Lena. I was 36 when I uprooted my life from Sydney and leapt into the unknown, leaving behind the successful personal training business I'd spent 8 years building in the busiest gym in Bondi, which was once my dream. But for the last 2 years of my PT career, I just couldn't shake the feeling that surely this wasn't it?\n\nSo when I finally worked up the courage, I threw my life up in the air and broke free from the hustle and the rat race, and I've been rebuilding life on my own terms ever since. Lena in the Wild was born from my own search for freedom, and it's where I document the whole journey of starting over in my late 30s: from unlearning hustle conditioning to slow living and building a life in a new country, making new friends, being single, all things wellness and healing, solo travel and so much more, sharing the real, unfiltered version of what it actually takes to reinvent your life.",
  cta: 'Read the full story',
  ctaHref: '/my-story',
};

export const socialLinks: Record<string, string> = {
  Instagram: 'https://www.instagram.com/lenainthewild/',
  TikTok: 'https://www.tiktok.com/@lenainthewild',
};

// Where each offer lives on The Leap. Used by the offer cards and the footer.
export const offerLinks: Record<string, string> = {
  'The 5 Day Reconnect': 'https://theleap.co/@naluri/course/the-5-day-reconnect',
  'The Freedom Frequency':
    'https://theleap.co/@naluri/email_capture/the-freedom-frequency-your-next-chapter',
};

// Web3Forms access key: the contact form and waitlist sign-ups are emailed
// to the address it was created with. Safe to be public.
export const web3formsKey = '221a0644-2570-46ec-976a-9da12c946f82';

// Offers that have their own page on this site. The page tells the whole
// story; only the final sign-up step goes out to The Leap.
export const offerPages: Record<string, string> = {
  'The Freedom Frequency': '/freedom-frequency',
  'The 5 Day Reconnect': '/5-day-reconnect',
};

// Offers that aren't open yet: their sign-up is the waitlist on their page.
export const waitlistOffers = ['The Freedom Frequency'];

// The 5 Day Reconnect page (/5-day-reconnect). Buying still happens on
// The Leap, which takes payment and delivers the audio.
export const fiveDayReconnectPage = {
  label: 'The Freedom Seeker · 02',
  title: 'The 5 Day Reconnect',
  subtitle: 'Five days of simple practices to help you get out of your head and back into your body.',
  cta: 'I’m Ready',
  forHeading: 'This is for you if:',
  forList: [
    'You’re stuck in a life that looks fine on paper but feels off on the inside',
    'You’re overwhelmed, burnt out and running on empty',
    'You’ve been searching for answers everywhere but inside yourself',
    'You know something needs to change but you don’t know where to start',
  ],
  insideHeading: 'What’s inside',
  inside: 'Five short audio sessions: one per day, each one a simple tool to help you slow down, tune in and reconnect with yourself.',
  days: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
  notAnother:
    'This isn’t another self-improvement course. It’s five days of real tools I wish I’d had sooner, collected over years of being stuck, investing in healers, coaches and modalities, and eventually finding my way out.',
  minutes: 'And it starts with just a few minutes a day.',
  closing: 'You don’t need to have it all figured out. You just need to start.',
  next: { lead: 'Ready to go deeper?', label: 'Explore The Freedom Frequency', href: '/freedom-frequency' },
};

// The Freedom Frequency page (/freedom-frequency).
export const freedomFrequencyPage = {
  label: 'The Freedom Seeker · 01',
  title: 'The Freedom Frequency',
  subtitle: 'Your next chapter',
  cta: 'Join the Waitlist',
  waitlistHeading: 'Be the first to know',
  waitlistBody: 'Pop your details in and I’ll let you know as soon as The Freedom Frequency opens.',
  waitlistSent: 'You’re on the list! I’ll be in touch as soon as The Freedom Frequency opens.',
  forHeading: 'This is for the ambitious woman who feels stuck and stagnant.',
  forParagraphs: [
    'You did all the things you were meant to do. The things society told us to do. You built the career, the home, the income… maybe even the relationship. You created the life you once dreamt of.',
  ],
  forPullQuote: 'But now you’re standing in it wondering, why am I not fulfilled?',
  forParagraphs2: [
    'On the outside, things look good. You “should” be happy. But every week you’re up and down. Restless. Flat. Questioning how the fuck to get out of a life you were meant to want.',
    'You keep searching for answers from everyone and anyone. Trying to gain clarity on what’s next. Caught between stagnation, comfort, and fear of the unknown. Not even fully sure what kind of help you actually need.',
  ],
  questions: ['Another healing session?', 'Another course?', 'A psychic to tell you your future so you finally know what step to take?'],
  knowing: 'You just know there has to be something more to life. Surely this isn’t it.',
  storyLead: 'I teach and share a lifetime of tools, lessons, and learnings because I was exactly where you are four years ago.',
  storyParagraphs: [
    'I was lost and confused. I didn’t understand why I wasn’t happy when I had what I thought I wanted. I was a successful PT, making great money, living a good life in Sydney… but I couldn’t stop thinking, this can’t be it. There has to be more.',
    'That thought stayed with me for years.',
    'I felt stuck. Stagnant. Directionless.',
    'I had a deep knowing that I wanted freedom… but I had no idea how to actually get it.',
    'So I tried to control everything. My future. The variables. The outcomes.',
    'I invested over $100k into coaches, healers, therapy, modalities — trying to “figure myself out.”',
    'I was caught in the rat race and didn’t even realise how unconscious and burnt out I was. I had worked my ass off for years and felt completely depleted, even though on paper my life looked good.',
    'Then I went on what was meant to be my dream Europe trip… and it turned into a nightmare.',
    'I was so burnt out I was sick for most of it. Low energy. Low state. Attracting the worst experiences. And that was the moment it really hit me — something had to change.',
    'Because the life I was living was no longer sustainable.',
  ],
  turningPoint: ['So I pulled back.', 'I cut clients.', 'I prioritised rest, self-care, and space for the first time in years.'],
  shifting: 'And that’s when things actually started shifting.',
  courseHeading: 'This course is everything I learned from being stuck… to breaking free.',
  courseParagraphs: [
    'From the years of confusion. From the burnout. From the leap. And from now living on the other side — in a life that feels abundant, free, and fully led by my intuition.',
    'It’s all the tools, teachings, and realisations I wish I had when I was in that phase of feeling up and down, unfulfilled, and searching for answers outside of myself.',
  ],
  gives: ['The understanding.', 'The guidance.', 'The clarity.'],
  seen: 'And the feeling of finally being seen in what you’re going through.',
  whyParagraphs: [
    'Because the truth is, no one around me truly got it at the time.',
    'I was trapped in that cycle for years, mentally going in circles and banging my head against the same questions.',
    'And if I had known then what I know now, I would have gotten out of that stuck, stagnant phase so much faster.',
    'That’s exactly why I created this.',
  ],
  closing: 'For the woman who knows deep down there has to be more… but doesn’t know how to access it yet.',
  next: { lead: 'Not ready to go all in?', label: 'Start with The 5 Day Reconnect', href: '/5-day-reconnect' },
};

type Tier = {
  number: string;
  // Leave out to hide the price pill on that card.
  price?: string;
  // A banner across the cover (e.g. 'Coming soon') instead of a price.
  banner?: string;
  title: string;
  body: string;
  tags: string[];
};

export const freedomSeeker = {
  heading: 'Your Next Chapter Starts Here',
  label: 'The Freedom Seeker',
  headline: 'Your next chapter starts here:',
  sub: "You built the career, the home, the income. And now you're wondering why you still feel restless. Start here.",
  tiers: [
    {
      number: '(01)',
      price: '$555',
      title: 'The Freedom Frequency',
      body: "An embodied, self-paced course to help you create the freedom you've been craving.",
      tags: ['Embodied Practice', 'Self-Paced Course'],
    },
    {
      number: '(02)',
      price: '$33',
      title: 'The 5 Day Reconnect',
      body: 'An audio journey to help you slow down, get out of your head, and hear yourself again.',
      tags: ['Audio Journey', 'Self-Paced'],
    },
    {
      number: '(03)',
      price: '$333',
      banner: 'Coming soon',
      title: 'Your Freedom Roadmap',
      body: "A personal deep dive into where you're at and where you want to go. Send me your questions, and I'll create your own personalised roadmap to guide your next steps.",
      tags: ['Personalised', 'Your Questions Answered'],
    },
  ] as Tier[],
  cta: "Yes, I'm ready to reconnect",
  ctaHref: '#freedom-seeker',
  experienceLabel: 'My Experience',
  experienceClosing: 'I’m not here to tell you how to live. I’m here to show you what’s possible when you choose you.',
  experienceCredentials: 'And for those of you who need a little more certainty…I’ve got the credentials to back it up, too.',
  // `details` lines are plain text, or { text, italic } for a school/business name.
  credentials: {
    title: 'My credentials',
    subtitle: 'Feeler & Healer',
    items: [
      {
        title: 'Life Experimenter',
        details: ['(AKA Serial Starter-Over-er)', '6+ career chapters · Lived in multiple countries & cities · Countless fresh starts'],
      },
      { title: 'Reiki Healer', details: ['Reiki Level I · Reiki Level II · Reiki Master', { text: 'Wildfire Healing', italic: true }] },
      { title: 'Embodiment Coach', details: ['Embodiment Coaching Certification', { text: 'Dharma Coaching Institute', italic: true }] },
      { title: 'Hosted Wellness Workshops & Women’s Circles', details: [{ text: 'Active Instinct Wellness', italic: true }] },
      { title: 'Personal Trainer & Wellness Coach', details: ['8+ years · Certificate III & Certificate IV', { text: 'Active Instinct Fitness', italic: true }] },
    ],
  },
  experienceSub: 'I’ve lived it.',
  experienceLead: 'I walked away from a career that looked perfect on paper, moved overseas, and rebuilt my life from the ground up.',
  experienceHighlight: 'I’ve started over more times than I can count',
  experienceTail:
    'I’ve led myself through the exact reconnection, uncertainty and rebuild I now guide others through.',

  noteCard: {
    label: 'Note to Self',
    body: 'You can’t go back and change the beginning, but you can start where you are and change the ending.',
    author: 'James R. Sherman',
  },
  creativeWork: {
    leadItalic: 'A Life',
    leadBold: 'THAT ACTUALLY FEELS LIKE YOU',
    body: [
      'After a decade chasing the version of success everyone else wanted for me, I’m finally choosing what feels right for me.',
      'I was stuck for years, desperately wishing someone had the answers I was missing. I needed those experiences to become who I am today. And now I get to be the person I wish I’d had back then: to hold the light and help you find your way without spending years figuring it out alone.',
      'Whatever chapter you’re in right now, where you are isn’t where you have to stay. You get to rewrite the script, change the plot and decide what comes next. This is your story. Nobody else gets to write it for you.',
    ],
    cta: 'Rewrite Your Story',
    ctaHref: '#freedom-seeker',
  },

  pillarsLabel: 'Entries From My Journal',
  pillarsCta: { label: 'Read more on Substack', href: 'https://lenainthewild.substack.com' },
  pillarsIntro: 'I don’t really do plans. I wake up, see how I feel, follow my intuition and let the day unfold.',
  // A pillar with a `slug` links to that article in the journal on this
  // site; otherwise one with an `href` links to its Substack post.
  pillars: [
    {
      category: 'Travel',
      title: 'Overcoming My Fear of Riding a Scooter',
      slug: 'overcoming-fear-of-riding-a-scooter-week-2',
      roles: 'FEAR, CHILDHOOD WOUNDS, SELF COMPASSION',
      excerpt: 'Little did I know it would trigger old childhood wounds.',
      href: 'https://substack.com/home/post/p-209897527',
    },
    {
      category: 'Wellness',
      title: 'Leaping into the Unknown: Part 1',
      slug: 'leaping-into-the-unknown-part-1',
      roles: 'LEAVING SYDNEY, TRUSTING YOUR INTUITION, BALI',
      excerpt: 'At 36, I threw my life up in the air.',
      href: 'https://substack.com/home/post/p-190792316',
    },
    {
      category: 'Healing',
      title: 'What I’m Learning About Slowing Down',
      slug: 'living-in-fight-or-flight',
      roles: 'FIGHT OR FLIGHT, NERVOUS SYSTEM, SLOWING DOWN',
      excerpt: 'For years I didn’t even realise I was living in fight or flight.',
      href: 'https://lenainthewild.substack.com/p/for-years-i-didnt-even-realise-i',
    },
    {
      category: 'Wild',
      title: 'Breaking Free From the System',
      slug: 'breaking-free-from-the-system',
      roles: 'FIRST LEAP, FREEDOM, ISLAND LIFE',
      excerpt: 'At 21, I packed my bags and moved to a remote island.',
      href: 'https://substack.com/home/post/p-189725048',
    },
  ],

  brandCampaigns: {
    heading: 'Little moments from life in the wild',
    sub: 'Oh yeah, I’m also a photographer.',
    body: 'When you finally start choosing yourself, all those creative parts of you that got buried along the way start finding their way back out.',
  },

  contentJourney: {
    label: 'Follow Along My Journey',
    lead: "I'm forever evolving and still figuring it out as I go,",
    tail: "exploring just how good life can really get and turning the ordinary into something extraordinary.",
    colBold: "Always looking for where else I can create more freedom, lately I've been questioning why we have to pick one place and stay there.",
    colRest: "So after falling in love with Vietnam on a recent trip, I figured, why not spend six months there and six months in Bali? And that's where I'm at right now.",
  },

  envelope: {
    leadBold: 'Every polaroid in here is a moment I almost let slip by —',
    leadRest: 'the ones that don’t make the feed, but are the whole reason I did this.',
    cardLabel: 'Current Goal',
    cardText: 'Make every day feel like a holiday.',
    ribbon: 'Chasing Freedom',
    // Printed on the front of the envelope
    frontItalic: 'My Journey:',
    frontTitle: 'SYD → BALI → VIETNAM → NEXT STOP',
  },

  modelingCard: {
    label: 'In Real Life:',
    headline: 'BEHIND THE SCENES',
  },
  bigStatement: 'COME SAY HI',

  contact: {
    label: 'Get in Touch',
    kicker: 'Let’s Connect',
    headline: 'Have Something on Your Mind?',
    body: 'Whether you’re curious about my work, exploring your own path to freedom, or simply want to say hello, I’d love to hear from you.',
    listIntro: 'Get in touch about:',
    listLabel: 'Drop a message below and I’ll get back to you shortly',
    list: ['The Freedom Frequency', 'The 5 Day Reconnect', 'Your Freedom Roadmap', 'General Inquiries'],
    fields: { name: 'Name', email: 'Email', message: 'Message' },
    cta: 'Send',
    sent: 'Thanks, that’s landed with me. I’ll get back to you shortly.',
    failed: 'Sorry, that didn’t send. Please try again, or message me on Instagram.',
  },
};

export const listen = {
  eyebrow: 'Press play',
  headline: 'Romanticise Your Life',
  body: 'A little soundtrack for starting over, romanticising the everyday, getting lost in nostalgia, and making ordinary moments feel a little more magical.',
  note: 'And I encourage you to create your own little playlist, too - fill it with the songs that make you feel the most free and happy.',
  title: 'Romanticise Your Life on Spotify',
  embedSrc: 'https://open.spotify.com/embed/track/3R1Xa7LkesYpNI3v6fslKi?utm_source=generator&theme=0',
} as const;

// Questions people ask Google and AI assistants in Lena's niche, answered in
// her own words (each answer is a list of paragraphs). Shown on the home page as plain
// text that search engines and AI assistants can read (no FAQ markup:
// Google only shows FAQ results for government and health sites).
export const faq = {
  label: 'Questions',
  heading: 'Feeling stuck? Start here',
  items: [
    {
      q: 'How do I get unstuck and figure out what I want in life?',
      a: [
        'When you’re constantly questioning your career, your future and what you actually want, it can feel like you’re going around in circles searching for answers. Maybe life feels like it’s on repeat, you’re exhausted by work, or you know something needs to change but can’t figure out what.',
        'I’ve been there. The first step isn’t necessarily finding the perfect answer. It’s slowing down, reconnecting with yourself and exploring what genuinely matters to you, rather than what you think you should want. You don’t need to have your entire future figured out to start finding your direction.',
      ],
    },
    {
      q: 'How do I find my purpose when I don’t know what I want anymore?',
      a: [
        'Finding your purpose can feel overwhelming when you’ve spent years following a path that no longer feels right. You might be questioning your career, your priorities or the future you once imagined for yourself.',
        'Rather than putting pressure on yourself to discover one big purpose, start by getting curious about who you are now, what makes you feel alive and what no longer feels right. You don’t have to figure everything out at once. Understanding yourself is a place to begin.',
      ],
    },
    {
      q: 'What if I’ve worked so hard to build a life I don’t want anymore?',
      a: [
        'It can be confronting to question a life you’ve spent years building. You’ve invested time, energy and effort into your career, business or lifestyle, so the thought of wanting something different can feel like throwing it all away.',
        'For me, burnout became a wake-up call. It made me question whether the life I was working so hard to build was actually the life I wanted. I’ve learned that you’re allowed to change your mind, reassess what success means to you and create a different path, even when you’ve already invested years in the old one.',
      ],
    },
    {
      q: 'How do I start changing my life when I don’t know where to begin?',
      a: [
        'You don’t need a perfect plan or a clear vision of your future before you begin. Start by creating space to understand what isn’t working, what matters to you and what you’d like your life to feel like instead.',
        'The Freedom Frequency is my self-paced course for people who feel stuck and want to explore a different way forward. It draws on what I’ve learned through my own journey from stagnation to creating a life that feels more like me.',
        'If you’d like a smaller first step, The 5 Day Reconnect ($33) is five short audio sessions to help you slow down and reconnect with yourself.',
      ],
    },
    {
      q: 'Who do you help?',
      a: [
        'I created Lena in the Wild for people who know there’s more to life but aren’t quite sure how to find it. Maybe you’ve spent years working towards the life you thought you wanted, only to find yourself feeling stuck, unfulfilled or questioning what comes next.',
        'If you’re constantly searching for answers about your purpose, career or future, I share the lessons, experiences and practices that have helped me navigate my own journey of personal reinvention. My hope is to help you reconnect with yourself, discover what you genuinely want and find the courage to create a life that feels like your own.',
      ],
    },
    {
      q: 'How can The Freedom Frequency help me?',
      a: [
        'The Freedom Frequency is my self-paced course for people who feel stuck in their lives and are ready to explore a different way forward.',
        'Drawing on what I’ve learned through my own journey from stagnation to creating a life that feels more like me, it brings together the insights and practices that helped me question the path I was on and start creating something different.',
        'If you’re constantly searching for answers about your purpose, career or future, The Freedom Frequency offers an opportunity to turn that questioning inward, explore what you genuinely want and begin finding your own way forward.',
        'The Freedom Frequency is $555, with the waitlist currently open.',
      ],
    },
    {
      q: 'Do I have to change everything to create a different life?',
      a: [
        'Not at all. Creating a life that feels more like you doesn’t necessarily mean quitting your job, moving overseas or starting from scratch.',
        'For me, that journey included leaving Sydney and moving to Bali at 36. But your path doesn’t have to look anything like mine. It might mean changing careers, exploring a creative passion, rethinking your priorities or making smaller changes that bring you closer to the life you want.',
        'This is about discovering what feels right for you, not following someone else’s version of success.',
      ],
    },
    {
      q: 'Who is Lena in the Wild?',
      a: [
        'I’m Elena Louise, the person behind Lena in the Wild. After years of working towards the version of success I thought I wanted, I reached a point where I had to question whether the life I was building was actually right for me.',
        'Burnout became a turning point. I started exploring what I genuinely wanted, questioning the expectations I’d been living by and finding a different direction for my life. That journey eventually led me to leave Sydney and move to Bali at 36.',
        'Today, Lena in the Wild is where I share the lessons, experiences and inner work behind personal reinvention, self-discovery and creating a life that feels like your own.',
      ],
    },
  ],
};

export const newsletter = {
  eyebrow: 'Letters From Me to You',
  headline: 'Stories in your inbox',
  body: "Unfiltered stories from a life I'm building from scratch in Southeast Asia. Everything I'm learning, feeling and discovering, straight to your inbox.",
  cta: 'Subscribe on Substack',
  ctaHref: 'https://lenainthewild.substack.com/subscribe',
};

export const footer = {
  columns: [
    {
      label: 'Explore',
      links: ['The Freedom Frequency', 'The 5 Day Reconnect', 'Your Freedom Roadmap', 'Dream Life Workbook', 'Wellness Studio'],
    },
    {
      label: 'Get to Know Me',
      links: ['About', 'Who I Help', 'Blog', 'Travel', 'Wellness', 'Healing'],
    },
    {
      label: 'Connect',
      // Socials show as icons, Contact as a link underneath
      links: ['Instagram', 'TikTok', 'Substack', 'Contact'],
    },
  ],
  currently: {
    label: 'Currently',
    body: 'Currently in Southeast Asia, romanticising the everyday and seeing where life takes me.',
  },
};

// The "not sure what you want from life" page (/life-design): who Lena
// helps, the problems her work explores, her story and what's actually on
// offer. Only offers that really exist on this site.
export const lifeDesignPage = {
  eyebrow: 'Life design & personal reinvention',
  title: 'Not Sure What You Want From Life Anymore?',
  lead: 'You don’t need to know exactly what you want before you start exploring what a different future could look like.',
  byline: 'By Elena Louise, the person behind Lena in the Wild',
  intro: [
    'If you’re constantly trying to figure out your life, wondering what you should be doing, why you feel stuck or why a good life still doesn’t feel like yours, this page is for you.',
    'Lena in the Wild is my personal brand, all about self-discovery, finding your own direction and creating a life that feels like you. I’m not here to hand you the answers. I’m here to share what I’ve learned, so you can start finding your own.',
  ],

  recogniseHeading: 'Does any of this sound familiar?',
  recognise: [
    {
      heading: 'You feel stuck, and every day looks the same',
      body: 'You’re going around in circles. Same routine, same thoughts, same feeling that life is on repeat. You want something to change, but you don’t know what, or where to start.',
      asks: ['Why do I feel stuck in life?', 'How do I get out of this rut?', 'Why does my life feel like it’s going nowhere?'],
    },
    {
      heading: 'You have a good life, so why aren’t you happy?',
      body: 'The job, the security, the comfortable life. All things you know you should be grateful for. And you are. But something still feels missing, and you feel guilty for even wanting more.',
      asks: ['Why am I unhappy when I have a good life?', 'Why do I feel like something is missing?', 'Why am I not happy with the life I’ve built?'],
    },
    {
      heading: 'You’re constantly trying to figure out what you want',
      body: 'Maybe it’s a career change. Maybe a different lifestyle, a new city or something you can’t name yet. You’re searching for answers, asking everyone for their opinion, and still not sure what you actually want.',
      asks: ['What should I do with my life?', 'How do I figure out what I really want?', 'How do I find direction, or my purpose?'],
    },
    {
      heading: 'You’re questioning the career you worked so hard to build',
      body: 'You’ve spent years building a business, climbing the ladder or chasing a version of success. Now, after burnout or a long stretch of feeling flat, you’re not sure you want to keep going. And you feel torn, because you’ve invested so much.',
      asks: ['How do I know if I’m on the wrong career path?', 'What do I do when I hate my job but don’t know what else to do?', 'What if I don’t want the life I worked so hard for?'],
    },
    {
      heading: 'You want a different life, but don’t know how to create it',
      body: 'More freedom, flexibility, adventure, meaningful work. Maybe you’ve thought about starting over, moving overseas or building something online. But you don’t know what’s realistic, or what you genuinely want.',
      asks: ['How do I change my life when I don’t know where to start?', 'How do I start over in my 30s?', 'How do I build a life with more freedom?'],
    },
  ],

  hardHeading: 'Why figuring out your life feels so hard',
  hard: [
    'Questioning your life is uncomfortable, especially when it looks good from the outside. You might have put years of time, energy and money into your career or business. People might rely on you, or expect you to keep going. And walking away from something you worked so hard to create can feel like giving up.',
    'On top of that, most of us were never taught how to work out what we want. We were taught to follow a path: school, a good job, climb the ladder, build the life. So when that path stops feeling right, there’s no map for what comes next.',
    'And it’s hard to hear yourself clearly when you’re exhausted. When you’re burnt out and running on stress, everything feels urgent and nothing feels clear.',
  ],
  hardQuote: 'Wanting something different doesn’t mean the life you built was a mistake. It might just mean you’ve outgrown it.',

  exploreHeading: 'What you can explore, before you have it all figured out',
  exploreIntro: 'You don’t need a five-year plan. You need a little space, some honest questions and the willingness to explore. These are the things I come back to again and again:',
  explore: [
    {
      heading: 'Slowing down enough to hear yourself',
      body: 'Clarity rarely comes when you’re running on empty. Rest, slowing down and getting out of your head and back into your body are often the first steps, not a reward for later.',
    },
    {
      heading: 'Why your current life no longer feels right',
      body: 'Notice what drains you and what lights you up. Often the feeling of being stuck is a sign you’ve outgrown an old version of yourself, or an old ambition you never questioned.',
    },
    {
      heading: 'What you want, not what you think you should want',
      body: 'So many of our goals are borrowed from family, society or social media. Try separating the “shoulds” from what genuinely excites you.',
    },
    {
      heading: 'Your own definition of success',
      body: 'Who decided success means working Monday to Friday, owning a house by a certain age or always doing more? You get to decide what a good life means to you.',
    },
    {
      heading: 'Different ways of working and living',
      body: 'Working fewer days, working online, living somewhere new, or staying exactly where you are and changing how you spend your days. There are more options than the one path we were handed.',
    },
    {
      heading: 'Your next step, not your whole life',
      body: 'You don’t have to reinvent everything. Sometimes you just need clarity on the next step, then the one after that.',
    },
  ],
  promptsHeading: 'A few questions to start with',
  prompts: [
    'When do I feel most like myself?',
    'What would I do if no one else’s opinion mattered?',
    'What am I tolerating that I’ve quietly outgrown?',
    'What does freedom actually look like for me, day to day?',
    'What’s one small thing I could try this month?',
  ],

  storyHeading: 'Why this matters to me',
  story: [
    'I spent years working hard to build a life and a business I thought I wanted. Then burnout hit, and it made me question whether the life I had worked so hard to build was actually the life I wanted anymore.',
    'I was exhausted by work. I started questioning my career, my business and the direction my life was heading. And I felt torn. Part of me knew something needed to change, but another part couldn’t imagine walking away from something I’d put so much into.',
    'My life felt like it was on repeat. I knew I wanted something different, I just didn’t know what that looked like. So I was constantly trying to figure out my life: searching for answers, asking other people for their perspective, questioning what I should do with my career and trying to work out what I genuinely wanted.',
    'I was also searching for my purpose. I wanted to understand what I was meant to do with my life and what would make me feel fulfilled. I wanted a sense of direction, and to understand what I was truly here to do, both personally and professionally.',
    'I wasn’t just looking for a new job. I was trying to understand what I wanted my life to look like, and how I could create it, including how to build something online and create more freedom.',
    'That’s why I created Lena in the Wild. Not because I have all the answers, but because I know how lonely and confusing that stage can feel, and I want you to feel understood while you find your own way.',
  ],
  storyLink: 'Read my full story',

  helpHeading: 'How Lena in the Wild can help',
  helpIntro: 'Everything here is self-paced, so you can explore in your own time, wherever you are.',
  help: [
    {
      heading: 'The journal (free)',
      body: 'Honest stories about feeling stuck, burnout, questioning success, healing and building a life on my own terms. A good place to start if you just want to feel less alone in it.',
      href: '/journal',
      cta: 'Read the journal',
    },
    {
      heading: 'The 5 Day Reconnect ($33)',
      body: 'Five short audio sessions, one a day. Simple practices to help you slow down, get out of your head and hear yourself again. A gentle first step when you don’t know where to start.',
      href: '/5-day-reconnect',
      cta: 'Explore The 5 Day Reconnect',
    },
    {
      heading: 'The Freedom Frequency ($555, waitlist open)',
      body: 'An embodied, self-paced online course with everything I learned going from stuck to breaking free. For when you’re ready to go deeper.',
      href: '/freedom-frequency',
      cta: 'Join the waitlist',
    },
    {
      heading: 'Your Freedom Roadmap ($333, coming soon)',
      body: 'A personal deep dive into where you’re at and where you want to go. Send me your questions, and I’ll create your own personalised roadmap to guide your next steps.',
      href: '/#freedom-seeker',
      cta: 'See all offers',
    },
  ],
  articlesHeading: 'Start reading',
  articles: [
    'living-in-fight-or-flight',
    'work-life-balance-mindfulness',
    'who-decided-monday-to-friday',
    'perfectionism-feeling-behind-in-life',
    'leaping-into-the-unknown-part-1',
  ],
  note: 'Lena in the Wild shares lived experience, not therapy or medical advice. If you’re struggling with your mental health, please reach out to a qualified professional.',

  nextHeading: 'Where to start',
  next: 'You don’t need to have it all figured out. You just need to start.',
};

// The My Story page (/my-story). A paragraph starting with "## " is a
// subheading.
export const storyPage = {
  storyTitle: 'My Story',
  paragraphs: [
    "Hi, I'm Lena. I was 36 years old when I uprooted my life from Sydney to Bali and leapt into the unknown, but it wasn't my first leap. I first threw my life up in the air at 21, when I'd just been dumped by my high school boyfriend of 8 years. I'd spent years managing a restaurant for his parents while working my way through a graphic design degree, and with my degree finished and the relationship over, I decided to leave it all behind and move to a remote island in the Whitsundays, then another, spending two years living the island life before moving to Canada on a whim after meeting a Canadian girlie who told me I should come over (23 year old me: yeah ok, why not!).",
    '## Rock bottom, and a new start as a personal trainer',
    "I won't bore you with my whole resume, but when I returned to Sydney I went from barista work, hospitality and bartending to retail and then graphic design. Five years into my graphic design career, I hit rock bottom. I was in a toxic relationship with a drug dealer and alcoholic, and I was anxious af, waking up every day dizzy and in a constant brain fog without knowing why, with never-ending thoughts and stress. I literally hated my life. I was partying and drinking every day and racking coke most days, using drugs and alcohol to numb the pain and escape my reality, which only made everything 50 times worse when I was sober. Given my environment and the company I was keeping, that was just the life I had, and I felt dead on the inside. It was a very dark time for me, with severe depression and suicidal thoughts. Living in that state every day, I just couldn't handle it. Everything was shit, the relationship, my health and my job, which was in the most depressing office, where everyone was older and no one smiled or even wanted to talk to you when you came in, and I was such a depressing person in that environment. I'd started seeing a psychologist, but very quickly became dependent on her. Meditation wasn't even optional, because without it my mind would spiral, but the gym was the one thing that made me feel better. It was something I could control, and in the middle of all that darkness it became my lifeline.",
    "I knew something had to change, and I wanted change, so I started with my career. I asked myself what other job I could do and what I actually enjoyed, and I kept coming back to the gym, so I thought, what if I became a trainer? The gym was the only thing lighting me up, and maybe it was telling me something, so I followed it. I started studying to become a PT while juggling my full-time graphic design job, going to class at night after work and secretly studying at my desk. The owners always seemed to have their attention elsewhere, so I could get away with doing the bare minimum at a job that was completely unfulfilling, and after I finally quit, the business went under and I found out why. The owners were corrupt, busy stealing money, and my boss ended up in jail (lol). Looking back, it was all meant to work out that way.",
    "But when I started my PT career I was still in that toxic relationship and still anxious af. Every ounce of my body had told me not to move in with him, but I did, and six months later we got kicked out. We moved in with my sister, and one week in we had a huge blow up and it was finally over.",
    "What I know now is that you can't truly start over or begin a new chapter while the wrong people are still around you and you're clinging on to the past. Once he was gone, I could finally start mine, and I went on to spend 8 years building a successful personal training business in the busiest gym in Bondi, a life I had once dreamed of.",
    "And don't get me wrong, it was an incredibly rewarding job. It taught me everything I know about business, I got to meet so many amazing people and work with the most incredible clients, many of whom became close friends, and I got to help, inspire and change the lives of everyone from teens to adults. It was such an era of growth for me, personally, mentally, physically and spiritually. But in those last few years I'd reached the peak of my career. I was the busiest trainer in the gym, fully booked with 50+ sessions a week and making great money, so I should have been happy, right? This was what I was meant to want, what I'd been reaching for for so long, but there I was again, miserable and depressed, standing in the life I thought I wanted. I couldn't shake the feeling that surely this can't be it, there has to be more to life?",
    '## Burning out in Bondi',
    "In the lead up to my \"dream\" trip to Europe in 2021, I'd run myself into the ground with back to back sessions and an overbooked schedule, telling myself I just had to get through these few months and before I knew it I'd be sitting on a beach in Italy sipping a marg. That whole time I was a mental wreck, crying out of nowhere, up one second and down the next. I'd also been dealing with a breakup with my best friend of 7 years, and I'd just come out of another relationship with the wrong guy (again). My intuition had told me he wasn't right, but I'd chosen to date him almost as a punishment. He was the complete opposite of my drug dealer ex, a total straighty 180, and I figured doing the extreme opposite would be good for me (hello ADHD brain, lol). He was a bodybuilder who counted the calories in every meal, to the point where he'd bring his own meal prep to a restaurant, and let's just say the personality wasn't there. I'd honestly had better conversations with a goddamn tree, and while he was good looking, I'll give him that, that was about it for me.",
    "That Euro trip ended up being an absolute nightmare. I was in such a low vibe state that I was attracting in all of the bad things, from luggage theft and getting mugged in a dodgy underground train station near Naples to being scammed countless times. Then in Greece it all came tumbling down. We went out partying and got on all the drugs, which was misalignment AGAIN, because I'd barely been drinking and had kept drugs to a minimum for years. The very next day my quad bike was stolen, and I caught the flu from my friend, which completely took me out for the rest of the two month trip. I ended up bedridden with pneumonia, and the second I felt the tiniest bit better I'd try to enjoy what was left of the trip, only to get 100 times sicker and end up bedridden all over again (classic me, not listening to my body).",
    "I came back from that trip still recovering from extreme burnout and knew something had to change, so I started cutting back sessions and doing less, because I wanted rest and I was seeking freedom.",
    '## My first solo trip to Bali',
    "In 2023 I visited Bali for the first time, and it was my first ever solo trip. I'd done parts of other trips on my own before but never the whole thing, so I was anxious and honestly pretty scared. But as soon as I landed and made my way to Ubud, I just knew this was where I was meant to be. It's hard to explain because I'd never felt anything like it before, but it felt familiar, like I'd been there before, and it felt like home.",
    "Not only did I have the best trip of my life, it made me remember what it felt like to be free. Before this I'd been stuck in a constant tug of war, caught up in the do-more machine, chasing productivity and trying to figure out my life and build my online business, while also trying to do less, heal and look after my mental health. But on this trip, on my own, experiencing new things, meeting people from all over the world, slowing down and just being present, I got a taste of freedom again and realised I'd forgotten what that even felt like.",
    "I remember dreading going home. If anything I felt even more lost, because I knew the life I was going back to was so far from what I wanted. I was racking my brain for a way out of my job, and the one thing I knew for sure was that I needed to set myself up online so I could travel and work from anywhere in the world. Figuring out how to get there, though, is a whole other story.",
    "But when I got back to Sydney, I was surprised to find I was actually enjoying it. Being welcomed back by all my friends and clients had me thinking, oh, maybe it's not so bad. What I didn't realise back then was that it only felt good because it was familiar. It was my comfort zone, the known.",
    "Before I knew it I was back in the same old routines and that same tug of war. I was spending so much time on the inner work, healing, meditation, being in nature, grounding and reiki, doing all the things I thought were the 'right' things to do, but it wasn't enough, and I still felt up and down, stuck and confused.",
    '## Deciding to leave Sydney',
    "Nine months later I needed a break again, so I ran back to Bali. I already knew I wanted to move, I just didn't have the \"right plan\". This trip was even better than the first. Bali has an energy like nowhere else. Some say it's the ley lines, but all I know is that something about this island fast-forwards your healing and opens you up to what's possible. On this trip I learnt how to surf and made so many new friends, and this time I was like, no, this is it, I'm committing to the move. I gave myself six months once I got home to save some money, and then I was out of there no matter what.",
    "It ended up taking me eight months, including the three months' notice I had to give. There was no huge moment that pushed me over the edge, but I remember the day clearly. I was at the gym with a client when an entitled idiot got in our faces, trying to staunch us for taking too long on the equipment, and I remember laughing to myself thinking, ok universe, I get it, we're done here, I'm not putting up with this shit anymore. (Honestly, I'd thank him now.) That afternoon I asked the universe and my grandma, who passed a long time ago, for a sign. I asked to see a rainbow in the next 24 hours, and if I saw one, it meant yes to quitting my job and moving to Bali.",
    "That very afternoon after work, I was meant to go to the gym, but instead I felt called to go down to the beach. It was raining and I was like, are you sure, intuition? But I just felt I needed to go. And as I sat there in the rain on the edge of the cliff overlooking Balmoral beach, there it was, my sign, a beautiful big rainbow. The next day I resigned.",
    "And of course, once I'd finally resigned, the universe decided to throw all kinds of tests my way, dangling high-paying opportunities, collabs, gifts, all the reasons to stay. I backpedalled on my decision a few times and even convinced myself to take a job in Sydney for a week. The uncertainty of the leap and not having a proper plan, especially for my income, had me changing my mind every two seconds, and I was letting other people's opinions pull me back towards safety way too easily. It was a difficult period because I kept doubting myself, and I guess that's what happens when you no longer have that \"safety\", your mind is just trying to keep you safe. But I stuck to my decision.",
    "I ran myself into the ground one more time before I went, selling everything I owned and packing up my whole apartment and life all on my own while juggling work, and then before I knew it, the day was finally here. I boarded that one-way flight to Bali and I never looked back.",
    '## Moving to Bali at 36 with no plan',
    "When I landed in Bali I didn't have a proper plan or any work locked in, just a deep, undeniable knowing that if I'd found the courage to leap like this, there was no other option but for the universe to reward me and for it all to work out, and I genuinely believed that to my core. The moment I arrived, everything started to flow. I made a group of friends on my very first night, and a week later I'd found my new home, after a friend of someone I'd met turned out to be looking for a roommate in her beautiful villa in Canggu. Everything was falling into place, apart from the work.",
    "I hadn't saved much money for this new chapter, because I was so damn eager to get out of my old life that I wasn't really thinking about money at all. I thought my work was sorted, since the advertising agencies I'd been working with in Sydney said they'd keep working with me once I was in Bali, but it all fell through.",
    '## Falling apart in paradise',
    "Three months in, on the surface I was living my dream life in Bali, but underneath I was lowkey falling apart. I was feeling all the same things I'd felt back in Sydney, up and down, depressed and anxious, and I couldn't understand it, because I'd uprooted my whole life to get away from all of that and here we were again, like seriously, universe? I was so pissed.",
    "I was doing all the things, with my days structured down to the hour. I was up at 5am for my morning walk to get my steps in, then oracle cards, meditation and coffee before working on my new UGC business, applying for freelance roles and reaching out to businesses and brands to collab, then the gym, hitting my protein goal, catching the sunset and in bed by 10 to start all over again.",
    "I was doing everything that had worked for me in my old life, still caught up in the hustle without even realising it. I was stuck in this limbo between trying to be responsible, building my career so I could keep on top of my finances, and trying to slow down and actually enjoy the present moment and my life in Bali. The one thing I kept doing was running off to Ubud, and any time I had a meltdown or felt anxious I'd escape back there for the week or the weekend.",
    "Around the same time, my dad got really sick and I flew back to Sydney so I could be with him after his surgery. I'd already maxed out my credit card by then, so while I was home I was applying for UGC roles, and I actually landed a great gig with exactly what I needed, consistent, good pay. But when I returned to Bali, the job fell through, again.",
    '## Down to my last $500 in Ubud',
    "Four months in, things were not looking good. I was down to my last $500 and had sold the last of my Bitcoin, and I literally couldn't afford my rent anymore, so I made the super tough decision to tell my villa I was moving out. I had no choice but to leave, so I went to Ubud.",
    "That first day in Ubud, I'd paid for a couple of nights at a homestay while I decided whether to stay or go back home, and I'd lined up two inspections for monthly places within my very minimal budget (5.5 million IDR was all I had). One fell through, and on the way to the other, something already felt off. The Grab couldn't find the location and took me to the wrong place twice, so I got off and walked until I eventually found it.",
    "The room was fine and had everything I needed, but it was in a really busy spot right next to a school, and the bigger red flag was the landlord, who was giving majorly creepy vibes. But I was desperate, and it was one of the very few places that was clean, decent and within my budget, so I went to pay the deposit. It failed, and then it failed again, and the whole time my hand was shaking like crazy without me really knowing why. Before I tried a third time I thought, ok, I think this is a sign, and I walked away.",
    "I was so angry at the universe, because this was my last resort and I had $500 to my name, no backup and no savings. That night I went back to the homestay so upset and overwhelmed that I gave in and decided I had to go back home, because I literally had no other option. I'd checked flights the night before and found one just within my budget, the exact amount I could afford to get back to Sydney, but when I went to book it, the price had tripled since the day before. That was the moment I hit absolute rock bottom (again), sitting on the floor of a mouldy shower in a rundown homestay, sobbing under a handheld shower, thinking I'm so damn broke I can't even afford a shower head attached to the wall, and wondering how the hell I'd ended up here. I'd sold everything, spent everything and maxed out all my cards, and somehow I was completely broke and broken.",
    "I allowed myself the pity party that night, but when I woke up the next morning I had no option but to trust that this was all happening for me. I was meant to go to the gym, but it had started raining, so I decided to go to Pilates instead on the last class pass points I had left.",
    "There I ended up meeting a girl who invited me over for coffee, and it turned out she lived right where I'd been the night before, aimlessly walking the streets. I remember standing on that very corner and it was like time stopped. Everyone around me almost disappeared, and all I could see was this golden sign glistening in the light, and I had this feeling that I'd been here before, like something was really familiar and felt right.",
    "She told me there were a bunch of places behind hers with rooms available and that I should go check them out, so that's what I did. And the wildest part is that I walked into one of them to see a room, and my name was already written up on their wall with a room allocated to me (but that's a story for another time). That place ended up being my new home, and I've stayed there ever since.",
    "Sometimes, when an old way of living and an old identity no longer fit the person you're becoming, the universe strips everything away so you can rebuild your foundations and step into your new identity and your new life. Looking back, this was my dark night of the soul.",
    '## The turning point',
    "That day became my turning point, and within 24 hours things started to shift, beginning with a \"random\" $777 refund from my health insurance. The next day a client reached out about a photoshoot that paid for my next month's rent, and from there came new clients, new jobs, new energy and money landing in my bank account.",
    "Bit by bit things started to flow in, and the strangest part was that I wasn't even trying. I wasn't applying for work, pushing my business or trying to be productive, I was just finally giving my body the rest it so desperately needed, living in the moment and taking small steps of aligned action.",
    "I could honestly go on forever, but I'll save the rest for our journey together.",
    '## Reinventing life on my own terms',
    "I've been reinventing life on my own terms ever since. Lena in the Wild was born from choosing this new life and this new way of being, and I continue to pursue freedom in every area of my life, including my business.",
    "I truly believe I went through everything I did so I could come out the other side and help others do the same, and I know it's part of why I'm here. My purpose is to inspire people who feel stuck, who know they want more from life but are scared to go after it, and to show them what's possible. I've literally been through it ALL to get here, and I'm still on the journey of continuously bettering my life, so I want to help others create the same freedom for themselves that I've created for myself, through everything I've learned from my own struggles. That's what my writing, my teachings, my offerings and my healing are all about, and this beautiful business I've created is built entirely on freedom.",
    "It hasn't all been easy. There have been rock bottom moments on the other side of the leap, alongside the signs and synchronicities that kept me going, a lot of learning, a lot of tears and a hell of a lot of growth, but it's also been the most freeing, magical chapter of my life so far. I've always believed in the law of attraction, but once I got through all those hurdles and unlearned the hustle and everything we've been told about how to be successful and how we're meant to live, I found a whole different way of living and being on the other side, where things really can be that easy. I'm honestly a completely different person to who I was back in Sydney two years ago. I share all of it, the unfiltered reality, not my highlight reel, not to scare you but to show you it's possible and what it really takes.",
    "Life has ups and downs no matter which path you choose, so you may as well spend them building the life you actually dream of.",
    "If any of this feels familiar, I've poured everything I've learned into The Freedom Frequency, an embodied, self-paced course to help you find your own answers and create the freedom you've been craving, wherever you're at in your journey. It's made for the person who knows there's more to life and is ready to find it.",
  ],
  cta: 'Explore The Freedom Frequency',
  closing:
    "If something here resonates, a story, a photograph, a feeling, I'd love to hear from you, so come say hi.",
};


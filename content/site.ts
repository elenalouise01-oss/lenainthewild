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
  sub: 'Break free from the life you’ve been living by default and build a life beyond your wildest dreams.',
  subSmall: 'It’s time to rewrite your story...',
  scrollLabel: 'Scroll to Begin',
  badgeText: 'EXPLORE HERE • EXPLORE HERE • ',
  ctaLabel: 'Your next chapter awaits',
  ctaHref: '#story',
  imageSrc: '/images/hero.jpg' as string | null,
};

export const welcome = {
  eyebrow: 'Welcome to Lena in the Wild',
  headline: 'For the person who knows there’s more to life and is ready to find it.',
  // The line under the headline (from Lena).
  pillars: 'Have you been feeling that pull, those little nudges telling you it’s time to make a big change in your life?',
  supportLeft: [
    'Maybe you’re standing in the life you once dreamed of, wondering why you’re not happy when everything looks good from the outside, and starting to question if this is even what you want anymore.',
    'Maybe you’re burnt out or just coming out of it, realising the busy life you’ve been living is no longer sustainable.',
    'Or maybe you’ve been searching for answers for a while now. You find something that feels like it might be the missing piece, you’re motivated for a few months, and then it doesn’t work out and you end up back at square one, stuck and confused. Still trying to piece together what your dream life looks like and how to actually create it.',
  ],
  supportRight: 'Wherever you are in that process, I’ve been there too, and you’re in the right place.',
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
    "Hi, I'm Lena. I was 36 when I uprooted my life from Sydney and leapt into the unknown, leaving behind the successful personal training business I'd spent 8 years building in the busiest gym in Bondi, which was once my dream. But for the last 2 years of my PT career, I just couldn't shake the feeling that surely this wasn't it?\n\nI threw my life up in the air. Left it all behind in Sydney and booked a one-way ticket to Bali…",
  cta: 'Read the full story',
  ctaHref: '/my-story',
};

export const socialLinks: Record<string, string> = {
  Instagram: 'https://www.instagram.com/lenainthewild/',
  TikTok: 'https://www.tiktok.com/@lenainthewild',
};

// Where each offer lives on The Leap. Used by the offer cards and the footer.
export const offerLinks: Record<string, string> = {
  // The Freedom Frequency has no Leap link: its waitlist is on this site.
  'The 5 Day Reconnect': 'https://theleap.co/@Lenainthewild/course/the-5-day-reconnect',
};

// Web3Forms access key: the contact form and waitlist sign-ups are emailed
// to the address it was created with. Safe to be public.
export const web3formsKey = '221a0644-2570-46ec-976a-9da12c946f82';

// Lena's waitlist Google Sheet: the web app URL of its Apps Script (ends in
// /exec). Each waitlist sign-up is also added as a row. Empty = off.
export const waitlistSheetUrl = 'https://script.google.com/macros/s/AKfycbw7mZO4CaMWJNjlV-Vlu1dBhECbvm41bFI7zP3LOsWAOwKM8qEWDJ1sFdGN8NeXjNwW4A/exec';

// The calls to action through the home page, from least to most commitment.
export const homeCtas = {
  // Thin strip under the hero: opens the free practice pop-up
  freeTop: {
    line: 'Tap into your intuition with my free guided tapping practice.',
    button: 'Send me the free practice',
  },
  // After My Experience
  reconnect: {
    line: 'Quiet the noise and reconnect with what you truly want.',
    button: 'Take the first step towards your dream life',
  },
  // Before the FAQ
  waitlist: {
    question: 'Ready to break free from what’s been holding you back and start creating the life you’ve always wanted?',
    button: 'Join the Freedom Frequency waitlist',
  },
};

// Free tapping tutorial sign-ups: the Apps Script of Lena's "Free Tutorial
// Sign-ups" Google Sheet, which adds a row and emails them the video link.
export const tutorialSheetUrl = 'https://script.google.com/macros/s/AKfycbwOpzuNhXz_KSGX3631LmkxhpqkSBvTVjSuaeVX3UqG-3FBWpLdThpjTwj_kN-vXhNxEA/exec';

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
// The free EFT tapping video (lead magnet), offered on the home page. The
// button opens a pop-up sign-up; once they've joined, the video plays right
// in the pop-up (from Lena's YouTube). Sign-ups go to her inbox and the
// waitlist Google Sheet.
export const leadMagnet = {
  label: 'Free guided tapping practice',
  // The small label above the home page section's headline
  sectionLabel: 'Free guided tapping practice',
  headline: 'Feeling overwhelmed, stuck in your head and unsure what you really want?',
  body: 'Quiet the noise, reconnect with yourself and create space to hear what you truly want from life.',
  closing: 'Take the first step.',
  cta: 'Send me the free practice',
  photo: '/images/tapping-harbour.webp',
  photoAlt: 'Lena sitting cross-legged on a rock by Sydney Harbour, eyes closed, tapping on her chest',
  popup: {
    hook: 'Tap into your Intuition',
    body: 'A free, step-by-step EFT tapping practice you can come back to any time. The same simple daily practice that helped me reconnect with my intuition and finally start hearing what I truly wanted.',
  },
  title: 'Tap into your Intuition',
  // Lena's YouTube Short: played in the pop-up, and linked from the button
  videoId: 'ftCp6dJRSZo',
  videoUrl: 'https://youtube.com/shorts/ftCp6dJRSZo',
  sent: {
    heading: 'It’s yours!',
    body: 'Thank you, {name}. Your free tapping practice is ready whenever you are.',
  },
  watch: 'Start Your Free Practice',
  // The card that appears when the video finishes, leading on to the 5 Day Reconnect
  next: {
    line: 'If you’re ready to reconnect with yourself, this is for you…',
    title: 'The 5 Day Reconnect: an audio series',
    cta: 'Explore here',
    again: 'watch again',
  },
};

export const fiveDayReconnectPage = {
  label: 'The Freedom Seeker',
  title: 'The 5 Day Reconnect',
  subtitle: 'Five days of simple grounding practices to help you get out of your head and back into your body.',
  collective: 'A Lena in the Wild offering, part of Naluri Collective',
  cta: 'I’m Ready',
  forHeading: 'This is for you if:',
  forList: [
    'You’ve reached a point where you know you can’t keep living the way you have been, but you’re not quite sure what comes next.',
    'You’ve been running on autopilot, constantly doing, achieving or pushing through, and you’ve forgotten what it feels like to simply be.',
    'You’re beginning to question the life you’ve built and feel a pull towards something different, even if you can’t quite put it into words yet.',
    'You’re ready to slow down, reconnect with yourself and start listening to your own intuition instead of constantly searching for answers outside yourself.',
  ],
  insideHeading: 'What’s inside',
  inside: 'Five short audio sessions: one per day, each one a simple tool to help you slow down, tune in and reconnect with yourself.',
  days: [
    {
      title: 'The Non-Negotiable That Shifts Your Whole Day',
      body: 'Start your day feeling more grounded, calm and present, creating space for yourself before the noise of everyday life takes over.',
      image: '/images/reconnect/day-1-photo.jpg',
      alt: 'Feet up on a clifftop overlooking the ocean and headlands',
    },
    {
      title: 'The Practice That Attracts Abundance',
      body: 'Shift your focus towards what’s already good in your life and begin cultivating a deeper sense of gratitude, appreciation and abundance.',
      image: '/images/reconnect/day-2-photo.jpg',
      alt: 'A double rainbow over a quiet suburban street after rain',
    },
    {
      title: 'Move Like Nobody’s Watching',
      body: 'Get out of your head, reconnect with your body and rediscover the joy and freedom of moving simply because it feels good.',
      image: '/images/reconnect/day-3.jpg',
      alt: 'Lena laughing on a rope swing on a white sand beach',
    },
    {
      title: 'Self-Care That Recharges You',
      body: 'Reconnect with what you genuinely need to feel refreshed and recharged, and give yourself permission to make time for it.',
      image: '/images/reconnect/day-4-photo.jpg',
      alt: 'A beach towel, journal and book on the rocks above a sunny beach',
    },
    {
      title: 'Coming Home to Yourself',
      body: 'Quiet the outside noise, tune into your inner voice and begin building trust in yourself and your own guidance.',
      image: '/images/reconnect/day-5.jpg',
      alt: 'A pink-lit cloud above treetops at sunset',
    },
  ],
  notAnother:
    'Five days of sharing what I’ve learnt through years of feeling stuck, searching for answers, investing in healers and coaches, and figuring out what actually helped me find my way back to myself.',
  minutes: 'Just a few minutes a day to start reconnecting with yourself.',
  closing: 'Slow down, quiet the noise and start hearing yourself again.',
  closingCta: 'I’m ready to reconnect',
  next: { lead: 'Ready to go deeper?', label: 'Explore The Freedom Frequency', href: '/freedom-frequency' },
  faqHeading: 'Questions about The 5 Day Reconnect',
  faq: [
    {
      q: 'What’s included?',
      a: [
        'Five short audio sessions, one per day. Each one is a simple tool to help you slow down, tune in and reconnect with yourself.',
      ],
    },
    {
      q: 'How much time does it take?',
      a: [
        'Just a few minutes a day for five days. It’s self-paced, so you can start whenever it suits you.',
      ],
    },
    {
      q: 'How much is it, and how do I get it?',
      a: [
        'It’s $33 AUD. When you tap “I’m Ready” you’ll go to The Leap, where you pay and get access to the audio sessions.',
      ],
    },
    {
      q: 'Who is it for?',
      a: [
        'If you’re stuck in a life that looks fine from the outside but feels off on the inside, overwhelmed or running on empty, or you know something needs to change but don’t know where to start, this is a gentle place to begin.',
      ],
    },
    {
      q: 'How is it different from The Freedom Frequency?',
      a: [
        'The 5 Day Reconnect is a short, simple starting point to help you slow down and hear yourself again. The Freedom Frequency is my deeper, self-paced course on reconnecting with yourself, releasing the patterns keeping you stuck and creating a life that feels like yours.',
      ],
      link: { href: '/freedom-frequency', label: 'Explore The Freedom Frequency' },
    },
  ] as FaqItem[],
};

// The Freedom Frequency page (/freedom-frequency).
export const freedomFrequencyPage = {
  label: 'The Freedom Seeker',
  title: 'The Freedom Frequency',
  subtitle: 'Your next chapter starts within.',
  // The intro under the title on this page only (the home page card keeps its own short text).
  heroBody: [
    'An embodied, self-paced journey to understand what’s keeping you stuck and create a life that feels genuinely like yours.',
  ],
  cta: 'Join the Waitlist',
  // Shown above the title and under the button while it's waitlist only
  status: 'Coming soon · Waitlist open',
  waitlistNote: 'The waitlist is free to join. You’ll be the first to know when doors open.',
  priceNote: 'at launch',
  waitlistHeading: 'Be the first to know',
  waitlistBody: 'Pop your details in and I’ll let you know as soon as The Freedom Frequency opens. Joining the waitlist is free, there’s nothing to pay now.',
  waitlistSent: {
    heading: 'You’re in!',
    body: 'Thank you for joining. I’ll email you as soon as The Freedom Frequency opens.',
  },
  storyLead: 'I teach and share a lifetime of tools, lessons, and learnings because I was exactly where you are four years ago.',
  storyParagraphs: [
    'I was lost and confused. I didn’t understand why I wasn’t happy when I had what I thought I wanted. I was a successful PT, making great money, living a good life in Sydney… but I couldn’t stop thinking, this can’t be it. There has to be more.',
    'That thought stayed with me for years.',
    'I felt stuck. Stagnant. Directionless.',
    'I had a deep knowing that I wanted freedom… but I had no idea how to actually get it.',
    'So I tried to control everything. My future. The variables. The outcomes.',
    'I invested over $100k into coaches, healers, therapy, modalities — trying to “figure myself out.”',
    'I kept thinking that if I could just find the right person, the right course or the right approach, everything would finally click into place. And sometimes, I genuinely felt like it had. I’d feel hopeful, gain a new perspective and build momentum, convinced I’d found the missing piece.',
    'But over time, I’d find myself questioning everything again, feeling stuck and searching for the next answer.',
    'I didn’t realise how easily the search itself had become a pattern. I was so focused on figuring everything out that I hadn’t fully explored the deeper fears, beliefs and conditioning influencing my choices or why I kept returning to the same questions.',
    'I was caught in the rat race and didn’t even realise how unconscious and burnt out I was. I had worked my ass off for years and felt completely depleted, even though on paper my life looked good.',
    'Then I went on what was meant to be my dream Europe trip… and it turned into a nightmare.',
    'I was so burnt out I was sick for most of it. Low energy. Low state. Attracting the worst experiences. And that was the moment it really hit me — something had to change.',
    'Because the life I was living was no longer sustainable.',
  ],
  turningPoint: ['So I pulled back.', 'I cut clients.', 'I prioritised rest, self-care, and space for the first time in years.'],
  shifting: 'And that’s when things actually started shifting.',
  courseHeading: 'This course brings together what I’ve learned about moving from stagnation to a life that feels like mine.',
  courseParagraphs: [
    'Over time, I began to realise that creating a different life wasn’t just about finding the right strategy, career or next step. It was about understanding the fears, beliefs and conditioning influencing my choices, reconnecting with the parts of myself I’d pushed aside, and learning to trust my own answers. That deeper exploration changed the way I understood myself, what I believed was possible and how I wanted to live.',
    'Because sometimes, the answer isn’t another strategy, another person telling you what to do or another attempt to figure everything out.',
  ],
  courseHighlight: 'Sometimes, the starting point is understanding yourself.',
  closing: 'For the person who knows deep down there has to be more… but doesn’t know how to access it yet.',
  next: { lead: 'Want to start reconnecting now?', label: 'Start with The 5 Day Reconnect', href: '/5-day-reconnect' },
  // The six-part overview near the top of the page (structure Lena chose).
  overview: {
    whatItIs: {
      heading: 'What it is',
      body: [
        'The Freedom Frequency is an embodied, self-paced journey to help you understand what’s keeping you stuck, reconnect with who you are beneath the conditioning, and create a life that feels genuinely like yours.',
        'Through shadow work, embodied practices and a deeper exploration of your relationship with freedom and abundance, you’ll begin uncovering the fears, beliefs and patterns influencing your choices, reconnecting with what you genuinely want, and expanding what’s possible for your life.',
        'This is about more than figuring out your next step. It’s about understanding yourself well enough to stop repeating the same patterns, trust your own answers and begin creating a life that reflects who you truly are.',
      ],
    },
    delivered: {
      heading: 'How it’s delivered',
      intro: [
        'A self-paced online experience you can move through in your own time and return to whenever you need. Everything lives in your private course portal, so you can access the lessons and practices from your computer or phone.',
        'The journey combines inner exploration with embodied practices and practical exercises, helping you move beyond simply understanding your patterns intellectually and begin integrating what you learn into your everyday life.',
      ],
      lead: 'Inside:',
      items: [
        { title: 'Video lessons', body: 'short lessons where I teach each stage and share what I went through' },
        { title: 'Guided audio practices', body: 'reflection, visualisation and gentle somatic practices to help you connect with your body, explore your inner world and integrate what you’re learning beyond the intellectual level' },
        { title: 'A digital workbook', body: 'journalling prompts, reflective exercises and practical tools' },
        { title: 'Integration exercises', body: 'one at the end of each module, to turn what you learn into real change' },
        { title: 'Built-in accountability', body: 'progress trackers, personal commitments and reflection prompts to help you follow through' },
      ],
    },
    whoFor: {
      heading: 'Who it’s for',
      body: [
        'The Freedom Frequency is for you if you built the career, the home, the income… maybe even the relationship. You created the life you once dreamt of.',
      ],
      quote: 'But now you’re standing in it wondering, why am I not fulfilled?',
      body2: [
        'On the outside, things look good. You “should” be happy. But you’re up and down. Restless. Flat. Something feels missing, even if you’re not sure why or how to change it.',
        'You’ve spent years following expectations, putting others first, trying to do the right thing or chasing a version of success that no longer feels right. Somewhere along the way, you lost touch with who you are and what you genuinely want.',
        'Maybe you keep searching for answers. Another healing session? Another course? A psychic to tell you your future? You just know there has to be something more to life. Surely this isn’t it.',
      ],
    },
    length: {
      heading: 'Its length',
      intro: [
        'A six-week guided journey: five core modules and a final integration week. It’s self-paced, with a suggested weekly rhythm to keep you moving without rushing the inner work.',
        'Each module has 3–5 short video lessons (about 5–10 minutes each), guided audio practices, journalling prompts and practical exercises. Allow around 1–2 hours a week, depending on how deeply you go.',
      ],
      weeks: [
        { focus: 'Reconnect', body: 'Reconnect with yourself, your emotions and your body. Explore where you are now, what you’re feeling and what you genuinely want, creating space to hear your own voice beneath the noise of everyday life.' },
        { focus: 'Understand', body: 'Explore your emotional triggers, recurring patterns, limiting beliefs and the deeper fears influencing your choices. Begin recognising the conditioning and unconscious patterns that may be keeping you stuck.' },
        { focus: 'Release', body: 'Question the expectations, identities and beliefs you’ve built your life around. Through self-inquiry and inner exploration, begin loosening the grip of old conditioning and making space for new ways of thinking, feeling and responding.' },
        { focus: 'Rediscover', body: 'Reconnect with your desires, values, intuition and authentic self. Explore what freedom, abundance and fulfilment mean to you, beyond the definitions you’ve inherited from others.' },
        { focus: 'Recreate', body: 'Bring your insights into everyday life. Clarify your vision for the future, strengthen your self-trust and begin taking meaningful steps towards a life that reflects who you are and what matters to you.' },
        { focus: 'Integrate', body: 'Reflect on what you’ve discovered, recognise the shifts you’ve begun making and create your personal freedom plan, with practical next steps to continue building a life that feels like yours.' },
      ],
      closing: 'Six weeks gives you structure and momentum, but personal growth doesn’t run on a deadline. Move through the journey at your own pace and take longer whenever you need to.',
    },
    outcomes: {
      heading: 'What you’ll walk away with',
      intro: [
        'By the end of this journey, you’ll have a deeper understanding of yourself, greater awareness of the patterns influencing your life, and a clearer vision for what you want to create moving forward.',
        'Through inner exploration, shadow work, embodied practices and practical exercises, you’ll begin developing the awareness and self-trust to make choices that feel more aligned with who you are.',
      ],
      lead: 'You’ll learn to:',
      // Each point: a bold opening phrase, then the rest.
      items: [
        { lead: 'Understand what’s been keeping you stuck.', rest: 'Explore the fears, limiting beliefs, emotional triggers and conditioning that have been influencing your thoughts, behaviours and choices.' },
        { lead: 'Recognise recurring patterns.', rest: 'Begin understanding why certain situations trigger you, why you might repeat familiar behaviours and how you can create more space to respond differently.' },
        { lead: 'Reconnect with yourself.', rest: 'Rediscover the parts of yourself you may have pushed aside to fit in, meet expectations or gain approval, and reconnect with what genuinely matters to you.' },
        { lead: 'Develop a deeper connection with your body and emotions.', rest: 'Use embodied practices to become more aware of your internal experience and move beyond intellectual understanding alone.' },
        { lead: 'Question the beliefs that limit you.', rest: 'Explore the assumptions you’ve made about who you need to be, what you can have and what’s possible for your life.' },
        { lead: 'Explore your relationship with abundance.', rest: 'Begin questioning scarcity-based beliefs and consider what a more expansive life could look like, on your own terms.' },
        { lead: 'Reconnect with your intuition and desires.', rest: 'Get clearer on what you genuinely want, beyond other people’s expectations and the life you thought you were supposed to want.' },
        { lead: 'Build self-trust.', rest: 'Learn to find your own answers, honour your needs and values, and make decisions without constantly seeking external validation or permission.' },
        { lead: 'Give yourself permission to want more.', rest: 'Explore the guilt, fear of judgement and need for approval that may be keeping you from pursuing what matters to you.' },
        { lead: 'Create a vision for your life.', rest: 'Define what freedom, success and fulfilment mean to you, and begin imagining a future that reflects those values.' },
        { lead: 'Turn insight into action.', rest: 'Develop practical next steps to help you move beyond familiar patterns and begin creating meaningful change in your everyday life.' },
      ],
      outro: 'The goal isn’t to have your entire life figured out or to resolve every pattern in six weeks. It’s to understand yourself more deeply, reconnect with what you want and develop the self-trust to begin creating a life that feels like yours.',
      closing:
        'Because when you understand yourself, release what holds you back and learn to trust your own decisions, you can stop living by default and start creating a life by design.',
    },
  },
  faqHeading: 'Questions about The Freedom Frequency',
  faq: [
    {
      q: 'How does the waitlist work?',
      a: [
        'The Freedom Frequency isn’t open just yet. Join the waitlist for free and I’ll email you as soon as doors open, so you can be one of the first inside. The course will be $777 AUD when it launches.',
      ],
    },
    {
      q: 'Who is The Freedom Frequency for?',
      a: [
        'For anyone who has built the life they thought they wanted but still feels stuck or unfulfilled. If you know there’s more to life but aren’t sure how to create it, this is for you.',
      ],
    },
    {
      q: 'How does it work?',
      a: [
        'It’s an embodied, self-paced online course you can move through in your own time, wherever you are in the world. It follows a suggested six-week structure, but you can take longer whenever you need to.',
      ],
    },
    {
      q: 'How is it different from The 5 Day Reconnect?',
      a: [
        'The 5 Day Reconnect ($33 AUD) is five short audio sessions to help you slow down and hear yourself again. It’s a gentle first step.',
        'The Freedom Frequency goes deeper into the inner work: reconnecting with yourself, the patterns and fears keeping you stuck, and creating a life that feels like yours.',
      ],
      link: { href: '/5-day-reconnect', label: 'Explore The 5 Day Reconnect' },
    },
    {
      q: 'Is it therapy?',
      a: [
        'No. It’s everything I’ve learned through my own journey, not therapy or medical advice. If you’re struggling with your mental health, please reach out to a qualified professional.',
      ],
    },
  ] as FaqItem[],
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
  heading: 'Explore Your Next Chapter',
  label: 'The Freedom Seeker',
  swipeHint: 'Swipe to see all 3 offerings',
  swipeHintDesktop: 'Use the arrows to see all 3 offerings',
  headline: 'Your next chapter starts here:',
  sub: "You built the career, the home, the income. And now you're wondering why you still feel restless. Start here.",
  tiers: [
    {
      number: '(01)',
      price: '$33 AUD',
      title: 'The 5 Day Reconnect',
      body: 'An audio journey to help you slow down, get out of your head, and hear yourself again.',
      tags: ['Audio Journey', 'Self-Paced'],
    },
    {
      number: '(02)',
      price: '$777 AUD',
      banner: 'Waitlist open',
      title: 'The Freedom Frequency',
      body: "An embodied, self-paced course to reconnect with yourself, release the patterns keeping you stuck and create the freedom you've been craving.",
      tags: ['Embodied Practice', 'Self-Paced Course'],
    },
    {
      number: '(03)',
      price: '$333 AUD',
      banner: 'Coming soon',
      title: 'Your Freedom Roadmap',
      body: "A personal deep dive into where you're at and where you want to go. Send me your questions, and I'll create your own personalised roadmap to guide your next steps.",
      tags: ['Personalised', 'Your Questions Answered'],
    },
  ] as Tier[],
  cta: "Yes, I'm ready to reconnect",
  ctaHref: '#freedom-seeker',
  experienceLabel: 'My Experience',
  experienceClosing: 'I’m not here to tell you how to live. I’m here to help you explore what’s possible when you start choosing yourself.',
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
      { title: 'Personal Trainer & Life Coach', details: ['8+ years · Certificate III & Certificate IV', { text: 'Active Instinct Fitness', italic: true }] },
    ],
  },
  experienceSub: 'I’ve lived it.',
  experienceContrast: 'I’ve been the PT in Bondi who had it all, the girl in a foreign country who lost it all, and now the woman living her dream life,',
  // Follows the line above in the heading font, a size smaller
  experienceContrastEnd: 'on her own terms, with more freedom than she’s ever had.',
  experienceHighlight: 'I rebuilt my life from the ground up, from rock bottom.',
  experienceTail:
    'I know what it takes to reinvent yourself and create a life beyond what you once thought possible. Now, I help others break free from the limits they’ve placed on themselves and step into a life that truly lights them up.',

  noteCard: {
    label: 'Note to Self',
    body: 'You can’t go back and change the beginning, but you can start where you are and change the ending.',
    author: 'James R. Sherman',
  },
  creativeWork: {
    leadItalic: 'A Life',
    leadBold: 'THAT ACTUALLY FEELS LIKE YOU',
    body: [
      'I was stuck for years, wishing someone had the answers I was missing. Now I get to be the person I wish I’d had back then.',
      'Whatever chapter you’re in right now, where you are isn’t where you have to stay. You get to rewrite the script, change the plot and decide what comes next. This is your story. Nobody else gets to write it for you.',
    ],
    cta: 'Rewrite Your Story',
    ctaHref: '#freedom-seeker',
  },

  pillarsLabel: 'Entries From My Journal',
  pillarsCta: { label: 'Read more on Substack', href: 'https://substack.com/@lenainthewild' },
  pillarsIntro: 'A little life, a lot of inner work, and everything I’m learning along the way.',
  // A pillar with a `slug` links to that article in the journal on this
  // site; otherwise one with an `href` links to its Substack post.
  pillars: [
    {
      category: 'The Leap',
      title: 'Overcoming My Fear of Riding a Scooter',
      slug: 'overcoming-fear-of-riding-a-scooter-week-2',
      roles: 'FEAR, CHILDHOOD WOUNDS, SELF COMPASSION',
      excerpt: 'Little did I know it would trigger old childhood wounds.',
      href: 'https://substack.com/home/post/p-209897527',
    },
    {
      category: 'The Leap',
      title: 'Leaping into the Unknown: Part 1',
      slug: 'leaping-into-the-unknown-part-1',
      roles: 'LEAVING SYDNEY, TRUSTING YOUR INTUITION, BALI',
      excerpt: 'At 36, I threw my life up in the air.',
      href: 'https://substack.com/home/post/p-190792316',
    },
    {
      category: 'Inner Work',
      title: 'What I’m Learning About Slowing Down',
      slug: 'living-in-fight-or-flight',
      roles: 'FIGHT OR FLIGHT, NERVOUS SYSTEM, SLOWING DOWN',
      excerpt: 'For years I didn’t even realise I was living in fight or flight.',
      href: 'https://lenainthewild.substack.com/p/for-years-i-didnt-even-realise-i',
    },
    {
      category: 'Inner Work',
      title: 'Triggers Are Clues',
      slug: 'triggers-are-clues-healing-core-wounds',
      roles: 'TRIGGERS, CORE WOUNDS, INNER CHILD',
      excerpt: 'What if the things that trigger you are pointing to what’s ready to heal?',
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
    list: ['The 5 Day Reconnect', 'The Freedom Frequency', 'Your Freedom Roadmap', 'General Inquiries'],
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
type FaqLink = { href: string; label: string };
export type FaqItem = { q: string; a: string[]; link?: FaqLink | FaqLink[] };

export const faq: { label: string; heading: string; items: FaqItem[] } = {
  label: 'Questions',
  heading: 'Feeling stuck? Start here',
  items: [
    {
      q: 'Who is Lena in the Wild for?',
      a: [
        'For people who’ve built the life they thought they wanted and still feel like something’s missing. You might feel stuck, unfulfilled or unsure what comes next, and you know there’s more to life but don’t know how to find it.',
        'I’m Lena. After severe burnout made me question the life I’d worked so hard to build, I left Sydney for Bali at 36. Lena in the Wild is where I share what helped me reconnect with myself, release the patterns keeping me stuck and create a life that feels like mine.',
      ],
      link: { href: '/my-story', label: 'Read my story' },
    },
    {
      q: 'Why do I constantly feel stuck in life?',
      a: [
        'Because the life you built may never have been fully yours. Often you’ve followed the expected path, put everyone else’s needs first or chased someone else’s version of success.',
        'Wanting something different doesn’t mean the life you built was a mistake. It usually means you’ve outgrown it.',
      ],
    },
    {
      q: 'How do I figure out what I really want?',
      a: [
        'When you’ve lost touch with what you actually want, start by slowing down. It’s hard to hear yourself when you’re exhausted and running on autopilot. Get curious about who you are now, what makes you feel alive and what no longer feels right, rather than what you think you should want.',
        'The thing is, you already have the answers. They’re in your intuition, which has usually been quietly nudging you all along. It’s just hard to hear under all the noise and everyone else’s opinions. The more you slow down, the louder it gets, and the more you learn to trust it.',
        'You don’t need your whole future figured out. Understanding yourself is the place to begin.',
      ],
    },
    {
      q: 'Why do I keep repeating the same patterns?',
      a: [
        'Usually because those patterns once kept you safe. Some of the most common are people-pleasing, perfectionism, shrinking around certain people and rejecting others before they can reject you. They often start as protection, and keep running long after you need them.',
        'The shift starts with awareness: catching the pattern as it happens, getting curious about where it came from and meeting yourself with compassion. Then you get to choose differently.',
      ],
      link: { href: '/journal/living-out-an-old-story', label: 'Read: I Was Still Living Out a Story That Was No Longer Mine' },
    },
    {
      q: 'How do I deal with emotional triggers?',
      a: [
        'I like to think of triggers as clues. That strong reaction you can’t quite explain is usually pointing to something underneath that’s still waiting to be seen and healed.',
        'When I’m triggered, I pause, notice what’s happening in my body, get curious about what the feeling is really about and talk to myself with kindness. That space is what lets you respond instead of react.',
      ],
      link: { href: '/journal/triggers-are-clues-healing-core-wounds', label: 'Read: Triggers are clues' },
    },
    {
      q: 'Why does going after my dream feel so selfish?',
      a: [
        'Because most of us were taught that putting ourselves first is wrong. When you’ve spent years meeting everyone else’s expectations, choosing yourself can feel like letting people down, even when it’s exactly what you need.',
        'But going after your dream isn’t selfish. You can love the people around you and still choose a life that feels like yours. The more fulfilled you are, the more you have to give.',
        'When I decided to leave Sydney, I backpedalled more than once and kept finding reasons to stay. Giving myself permission to go was the first step to creating the life I wanted.',
      ],
    },
    {
      q: 'What’s the difference between The 5 Day Reconnect, The Freedom Frequency and Your Freedom Roadmap?',
      a: [
        'Each offer supports a different stage of your journey, depending on where you are and what you’re looking for.',
        'The 5 Day Reconnect is a gentle starting point for when you’re ready to slow down, step out of autopilot and feel more connected to yourself. Over five days, you’ll create space to quiet the noise, feel more present in your body, reconnect with what brings you joy, recognise what you need and begin trusting your own inner guidance.',
        'The Freedom Frequency takes this work deeper. It’s a guided, self-paced journey designed to help you understand the patterns, fears and beliefs keeping you stuck, explore the conditioning influencing your choices, and reconnect with what you genuinely want. Through shadow work, embodied practices and an exploration of abundance, you’ll begin developing the self-trust and clarity to create a life that feels genuinely like yours.',
        'Your Freedom Roadmap (coming soon) is a personalised experience for when you’re ready to explore your own direction and work out what comes next. It’s an opportunity to get clear on where you are now, where you want to go and the practical steps you can take to create a life that feels more aligned with who you are and what matters to you.',
      ],
      link: [
        { href: '/5-day-reconnect', label: 'Explore The 5 Day Reconnect' },
        { href: '/freedom-frequency', label: 'Explore The Freedom Frequency' },
        { href: '/#freedom-seeker', label: 'Explore Your Freedom Roadmap' },
      ],
    },
    {
      q: 'Where do I start?',
      a: [
        'If you want to slow down, reconnect with yourself and create space to hear your own needs and desires, start with The 5 Day Reconnect.',
        'If you’re ready to understand what’s been keeping you stuck, explore the deeper patterns influencing your life and begin creating meaningful change, The Freedom Frequency is for you.',
        'If you’re looking for personalised clarity around your direction and practical next steps, explore Your Freedom Roadmap.',
        'There’s no required order. Choose the experience that best reflects where you are right now.',
      ],
      link: [
        { href: '/5-day-reconnect', label: 'Explore The 5 Day Reconnect' },
        { href: '/freedom-frequency', label: 'Explore The Freedom Frequency' },
        { href: '/#freedom-seeker', label: 'Explore Your Freedom Roadmap' },
      ],
    },
  ],
};

export const newsletter = {
  eyebrow: 'Letters From Me to You',
  headline: 'Stories in your inbox',
  body: "Unfiltered stories from a life I'm building from scratch in Southeast Asia. Everything I'm learning, feeling and discovering, straight to your inbox.",
  cta: 'Subscribe on Substack',
  ctaHref: 'https://substack.com/@lenainthewild',
};

export const footer = {
  columns: [
    {
      label: 'Explore',
      links: ['The 5 Day Reconnect', 'The Freedom Frequency', 'Your Freedom Roadmap', 'Dream Life Workbook', 'Wellness Studio'],
    },
    {
      label: 'Get to Know Me',
      links: ['About', 'Who I Help', 'Journal Entries'],
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
  title: 'What If the Life You’ve Built Isn’t the Life You Want?',
  lead: 'You can build a life that looks good on paper, do everything you’re supposed to do, and still feel like something is missing.',
  intro: [
    'Maybe you’ve outgrown the life you’ve built, lost touch with what you really want, or started questioning whether the path you’re on is truly yours.',
    'Maybe you’ve spent years following expectations, putting others first or trying to get everything right, only to find yourself questioning what you actually want.',
    'Lena in the Wild helps you understand what’s keeping you stuck, reconnect with who you are beneath the conditioning, and find the clarity, self-trust and freedom to create a life that feels genuinely like yours.',
    'You don’t need to have all the answers. You just need to start discovering them for yourself.',
  ],

  recogniseHeading: 'Does any of this sound familiar?',
  recognise: [
    {
      heading: 'You feel stuck, and every day looks the same',
      body: [
        'You’re going around in circles. Same routine, same thoughts, same feeling that life is on repeat. You know you want something to change, but you can’t quite figure out what or where to start.',
      ],
      asks: ['Why do I feel stuck in life?', 'How do I get out of this rut?'],
    },
    {
      heading: 'You’ve built a good life, but something still feels missing',
      body: [
        'You have the job, security or lifestyle you thought you wanted. You know you should be grateful, and you are. But something doesn’t feel right, and you feel guilty for wanting more when nothing seems particularly wrong.',
      ],
      asks: ['Why am I unhappy when I have a good life?', 'Surely there’s got to be more to life than this?'],
    },
    {
      heading: 'You keep looking for answers, but struggle to trust your own',
      body: [
        'You’ve researched your options, asked for advice and thought about every possible direction. Yet you still find yourself second-guessing your decisions and wondering whether you’re making the right choice.',
        'You want to find the perfect plan, the right path.',
      ],
      asks: ['How do I figure out what I really want?', 'How do I learn to trust my intuition?'],
    },
    {
      heading: 'You keep repeating patterns that drain your energy',
      body: [
        'People-pleasing, overgiving, struggling to say no or reacting in ways you later regret. You might recognise these patterns but still struggle to understand why they keep happening.',
        'Sometimes, the behaviours that hold us back began as ways to feel safe, accepted or loved. Understanding what’s underneath them can help you begin responding differently.',
      ],
      asks: ['Why do I keep repeating the same patterns?', 'Why do I get so triggered by certain people or situations?'],
    },
    {
      heading: 'You keep searching for answers, but somehow end up back where you started',
      body: [
        'You find a new course, mentor, book or approach that makes everything click. You feel hopeful, inspired and convinced you’ve finally found what you’ve been looking for. You build momentum, start making changes and believe you’re moving forward.',
        'But a few months later, you’re back at square one, questioning everything and searching for the next thing that might finally help you figure it all out.',
      ],
      asks: ['Why do I keep ending up back where I started?', 'Why do I feel motivated to change but struggle to make lasting progress?', 'What am I missing?'],
    },
    {
      heading: 'You’re questioning the version of success you’ve been chasing',
      body: [
        'You’ve spent years working towards something you thought you wanted. Maybe you’ve built a career, started a business or followed a path that made sense at the time. But now you’re questioning whether it actually reflects who you are or what you want anymore.',
      ],
      asks: ['What if I don’t want the life I’ve worked so hard for?', 'What does success actually mean to me?'],
    },
    {
      heading: 'You want more freedom, but something keeps holding you back',
      body: [
        'You dream about a different lifestyle, more meaningful work or the courage to pursue something you’ve always wanted. But when you imagine making a change, the doubts creep in.',
        'What if you fail? What will people think? What if you lose what you’ve already built?',
        'Sometimes, the hardest part isn’t figuring out what you want. It’s understanding what’s stopping you from pursuing it.',
      ],
      asks: ['How do I stop letting fear hold me back?', 'How do I start creating a life that feels like mine?'],
    },
  ],

  hardHeading: 'Why figuring out your life feels so hard',
  hard: [
    'Sometimes, the difficulty isn’t that you don’t know what you want. It’s that you’ve spent so long focusing on what you should want that you’ve lost touch with what you actually do.',
    'We’re taught to follow certain paths, meet expectations, be sensible and keep everyone happy. Over time, those expectations can become so familiar that we stop questioning whether they reflect who we really are.',
    'You might know you want something different but struggle to understand why you keep holding yourself back. Perhaps you’re repeating familiar patterns, second-guessing your decisions or searching outside yourself for answers.',
    'When you begin exploring the fears, beliefs and conditioning influencing your choices, you can start to understand yourself more deeply, reconnect with what matters to you and see possibilities you may not have considered before.',
  ],
  hardQuote: 'Wanting something different doesn’t mean the life you’ve built was a mistake. It might simply mean you’re ready to create something that fits who you’re becoming.',

  loopHeading: 'The stagnation loop: why you keep ending up back at square one',
  loop: [
    'You’ve tried to figure it out. You’ve read the books, listened to the podcasts, bought the courses, worked with mentors and searched for the thing that will finally help everything click into place.',
    'And for a while, it does.',
    'You find something that resonates. You feel inspired, hopeful and full of possibility. You start making changes, building momentum and believing you’re finally onto something.',
    'But then, a few months later, you’re back where you started.',
    'The motivation fades. The same doubts creep in. You find yourself questioning your direction, wondering why you still feel stuck and searching for the next thing that might finally give you the answers.',
    'It’s exhausting to keep starting over when all you want is to move forward.',
    'I know this cycle because I lived it myself.',
    'For years, I kept looking outside myself for the answers. I’d find a new course, a new mentor or a new approach that made me feel like I’d finally figured it out. I’d get excited about the possibilities and throw myself into making a change, convinced this was the missing piece.',
    'But eventually, I’d find myself back at square one, feeling defeated and questioning everything all over again.',
    'What I didn’t understand back then was that I wasn’t just missing the right strategy, the right guidance or the right next step. There were deeper patterns, fears and beliefs influencing the way I thought, the choices I made and what I believed was possible for me.',
    'I was so focused on finding the answers that I hadn’t stopped to understand what was keeping me stuck in the first place.',
    'Sometimes, the way forward isn’t about finding another answer outside yourself. It’s about turning inward, understanding the patterns you’ve been repeating, reconnecting with what you genuinely want, and learning to trust yourself enough to move forward differently.',
  ],
  loopQuote: 'Because lasting change isn’t just about finding something new that inspires you. It’s about understanding yourself well enough to stop returning to the same place.',

  pillarsLabel: 'How I can help',
  pillarsHeading: 'Three Pillars of Self-Discovery & Life Design',
  pillarsIntro: 'Creating a life that feels like yours starts with understanding yourself. Through self-discovery, inner exploration and practical life design, you can begin understanding what you want, what’s been holding you back and how to move towards a life that feels more authentic to you.',
  pillars: [
    {
      heading: 'Reconnect With Yourself',
      tagline: 'Get back in touch with who you are, what you want and what feels right for you.',
      body: [
        'When you’ve spent years meeting expectations, putting others first or looking outside yourself for answers, it can be difficult to know what you genuinely want.',
        'Reconnecting means creating space to hear your own voice again, explore your desires and values, and develop a deeper sense of self-trust.',
        'Through self-discovery, intuition and embodiment, you can begin reconnecting with the parts of yourself that may have been overlooked while trying to meet everyone else’s expectations.',
      ],
      explore: 'Intuition, self-discovery and embodiment.',
    },
    {
      heading: 'Understand & Release the Patterns Keeping You Stuck',
      tagline: 'Explore what’s underneath your fears, triggers and recurring patterns so you can begin choosing differently.',
      body: [
        'The patterns that hold us back can show up in many ways: people-pleasing, self-doubt, fear of judgement, emotional reactions or feeling like we’re not allowed to want more.',
        'Through inner exploration and shadow work, you can begin recognising the beliefs, experiences and conditioning influencing your choices.',
        'The goal isn’t to judge yourself or force yourself to change overnight. It’s to understand yourself more deeply, question what no longer serves you and create more space to respond differently.',
      ],
      explore: 'Emotional triggers, shadow work, limiting beliefs and conditioning.',
    },
    {
      heading: 'Create a Life That Feels Like Yours',
      tagline: 'Turn what you discover about yourself into a clearer vision and meaningful steps towards the life you want.',
      body: [
        'Creating a life that feels like yours means moving beyond someone else’s definition of success and exploring what freedom, abundance and fulfilment mean to you.',
        'Maybe that means changing careers, building something of your own, creating more flexibility, pursuing a dream you’ve been putting off or simply making your everyday life feel more aligned with who you are.',
        'Whatever your vision looks like, you can begin expanding what’s possible, gaining clarity on your direction and taking meaningful steps towards a future that reflects what matters to you.',
      ],
      explore: 'Life design, abundance and personal reinvention.',
    },
  ],

  storyHeading: 'My story: from questioning my life to creating one that feels like mine',
  story: [
    'For years, I followed a path that made sense on paper. I built a career, worked hard and did what I thought I was supposed to do. But I began to question whether the life I was working towards was actually the life I wanted.',
    'I experienced burnout, felt disconnected from myself and struggled to imagine returning to the way I’d been living. I knew something needed to change, but figuring out what that change looked like wasn’t straightforward.',
    'I spent a lot of time questioning my direction, searching for answers and trying to understand why the life I’d worked so hard to build no longer felt right.',
    'I kept searching for the missing piece without fully understanding the patterns, fears and beliefs that were influencing my choices and keeping me stuck.',
    'What I gradually began to realise was that figuring out my life wasn’t just about finding the right career, location or next step. It was also about understanding myself — the beliefs I’d built decisions around, the expectations I’d been living by, the fears that made it difficult to trust myself and the patterns that kept pulling me back into familiar ways of being.',
    'I needed to reconnect with what I genuinely wanted, question assumptions and become more comfortable making choices that didn’t necessarily make sense to everyone else.',
    'The more I explored that relationship with myself, the more I began to understand that creating a different life wasn’t just about changing circumstances. It was about changing how I related to myself, what I believed was possible and how I wanted to move through the world.',
    'My own journey continues to shape the way I approach self-discovery, inner healing and personal reinvention.',
    'I believe we can spend years trying to figure out what to do with our lives without realising that understanding ourselves is an important part of finding the answer.',
    'We don’t need to follow someone else’s blueprint for a fulfilling life. We can question what we’ve been taught, reconnect with what genuinely matters to us, and start making choices that reflect who we are and who we want to become.',
    'That’s the heart of Lena in the Wild: helping you understand yourself, trust your own answers and create a life that feels like yours.',
  ],
  storyLink: 'Read my full story',

  helpHeading: 'Explore the next step in your journey',
  helpIntro: [
    'You don’t need to have your entire future figured out to begin making a change.',
    'Whether you’re just starting to question your direction or you’re ready to explore the patterns that have been holding you back, there are different ways to begin.',
  ],
  help: [
    {
      heading: 'The Freedom Frequency',
      badge: 'Waitlist open',
      tagline: 'Reconnect with yourself. Release what holds you back. Create a life that feels like yours.',
      body: [
        'The Freedom Frequency is a guided, self-paced journey to help you understand the patterns keeping you stuck, reconnect with your intuition and desires, and build the clarity and self-trust to begin creating a life that reflects who you truly are.',
        'Through inner exploration, shadow work, guided embodiment practices and practical exercises, you’ll learn to question old conditioning, explore what’s possible and take meaningful steps towards the future you want.',
      ],
      href: '/freedom-frequency',
      cta: 'Explore The Freedom Frequency',
    },
    {
      heading: 'The 5 Day Reconnect',
      tagline: 'A gentle starting point for slowing down, reconnecting with yourself and creating space to hear your own voice again.',
      body: ['Through guided audio experiences, begin tuning in to what you need, what you want and what feels right for you.'],
      href: '/5-day-reconnect',
      cta: 'Explore The 5 Day Reconnect',
    },
    {
      heading: 'Your Freedom Roadmap',
      badge: 'Coming soon',
      tagline: '',
      body: ['A personalised opportunity to explore where you are now, what you want to move towards, and practical steps to create a life more aligned with who you are and what matters to you.'],
      href: '/#freedom-seeker',
      cta: 'Explore Your Freedom Roadmap',
    },
  ],
  articlesHeading: 'Start reading',
  articles: [
    'living-in-fight-or-flight',
    'triggers-are-clues-healing-core-wounds',
    'living-out-an-old-story',
    'performative-energy-wearing-a-mask',
    'who-decided-monday-to-friday',
    'perfectionism-feeling-behind-in-life',
    'leaping-into-the-unknown-part-1',
  ],
  note: 'Lena in the Wild shares lived experience, not therapy or medical advice. If you’re struggling with your mental health, please reach out to a qualified professional.',
};

// The My Story page (/my-story). A paragraph starting with "## " is a
// subheading.
// A photo placed between paragraphs of the story.
// `cutout` photos have no background and sit beside the text with a sticker.
// `small` photos sit tucked into the right-hand side of the paragraph that follows.
type StoryPhoto = { image: string; width: number; height: number; alt: string; caption?: string; cutout?: boolean; small?: boolean; side?: 'left' | 'right'; polaroid?: boolean };
// A dashed line leading from the text to the photo below it
type StoryConnector = { connector: 'short-curl' | 'swoop-left' | 'long-drop' | 'swoop-right' | 'long-wander' };
// A row of polaroids that pop up onto the page
type StoryPolaroids = { polaroids: { image: string; alt: string; pos?: string }[] };

export const storyPage: {
  storyTitle: string;
  song: string;
  highlights: string[];
  paragraphs: (string | StoryPhoto | StoryPolaroids | StoryConnector)[];
  cta: string;
  closing: string;
} = {
  storyTitle: 'My Story',
  song: '🎧 Riptide - Vance Joy',
  // Lines inside the story marked with a highlighter (wording unchanged)
  highlights: [
    "it wasn't my first leap",
    'remember what it felt like to be free',
    'there it was, my sign, a beautiful big rainbow',
    'I boarded that one-way flight to Bali and I never looked back',
    'the universe strips everything away',
    'building the life you actually dream of',
  ],
  paragraphs: [
    {
      image: '/images/story/island-bestie.jpg',
      width: 604,
      height: 453,
      alt: 'Lena and her friend in their resort uniforms on a balcony above the beach on an island in the Whitsundays',
      small: true,
    },
    "Hi, I'm Lena. I was 36 years old when I uprooted my life from Sydney to Bali and leapt into the unknown, but it wasn't my first leap. I first threw my life up in the air at 21, when I was going through a break up with my high school boyfriend of 8 years. I'd spent years managing a restaurant for his parents while working my way through a graphic design degree, and with my degree finished and the relationship over, I decided to leave it all behind and move to a remote island in the Whitsundays, then another, spending two years living the island life before moving to Canada on a whim after meeting a Canadian girlie who told me I should come over (23 year old me: yeah ok, why not!).",
    {
      polaroids: [
        { image: '/images/story/canada-snowboard.jpg', alt: 'Lena sitting in the snow with her snowboard, mountains behind her in Canada', pos: '68% 50%' },
        { image: '/images/story/canada-elk.jpg', alt: 'An elk resting in the snow among the pine trees in Canada' },
      ],
    },
    '## Rock bottom, and a new start as a personal trainer',
    "I won't bore you with my whole resume, but when I returned to Sydney I went from barista work, hospitality and bartending to retail and then graphic design. Five years into my graphic design career, I hit rock bottom. I was in a toxic relationship with someone who struggled with alcoholism and drug abuse, and I was anxious AF, waking up every day feeling dizzy and stuck in a constant brain fog without knowing why. My mind never switched off, and the stress felt never-ending. I literally hated my life.",
    "I was partying and drinking every day, using drugs multiple times a week to numb the pain and escape my reality. I even started smoking again after having quit years earlier. But all of it only made everything feel 50 times worse when I was sober. Given my environment and the company I was keeping, that was just the life I had, and I felt dead on the inside. It was a very dark time for me, with severe depression and suicidal thoughts. Living in that state every day, I just couldn't handle it. Everything felt shit. My relationship, my health, my job. I was working in a really depressing office environment where everyone seemed stuck in their own world, and there was barely a smile or a conversation when you walked through the door. I felt like I was becoming just as miserable as the environment I was in, and I knew deep down that this wasn't how I wanted to live. I'd started seeing a psychologist, but very quickly became dependent on her. Meditation wasn't even optional, because without it my mind would spiral, but the gym was the one thing that made me feel better. It was something I could control, and in the middle of all that darkness it became my lifeline.",
    { connector: 'swoop-left' },
    {
      image: '/images/story/pt-polaroid.jpg',
      width: 800,
      height: 800,
      alt: 'Lena smiling with her hands on her hips in her personal trainer uniform',
      cutout: true,
      polaroid: true,
      side: 'left',
    },
    "I knew something had to change, and I wanted change, so I started with my career. I asked myself what other job I could do and what I actually enjoyed, and I kept coming back to the gym, so I thought, what if I became a trainer? The gym was the only thing lighting me up, and maybe it was telling me something, so I followed it. I started studying to become a PT while juggling my full-time graphic design job, going to class at night after work and secretly studying at my desk. The owners always seemed to have their attention elsewhere, so I could get away with doing the bare minimum at a job that was completely unfulfilling, and after I finally quit, the business went under. Apparently, the owners were corrupt, busy embezzling money and I heard my boss ended up in jail (lol). Looking back, it was all meant to work out that way.",
    "But when I started my PT career I was still in that toxic relationship and still anxious af. Every ounce of my body had told me not to move in with him, but I did, and six months later we got kicked out. We moved in with my sister, and one week in we had a huge blow up and it was finally over.",
    "What I know now is that you can't truly start over or begin a new chapter while the wrong people are still around you and you're clinging on to the past. Once he was gone, I could finally start mine, and I went on to spend 8 years building a successful personal training business in the busiest gym in Bondi, a life I had once dreamed of.",
    {
      image: '/images/story/pt-client.jpg',
      width: 1400,
      height: 1050,
      alt: 'Lena in her personal trainer uniform smiling in a selfie with a client at the gym',
      side: 'right',
    },
    "And don't get me wrong, it was an incredibly rewarding job. It taught me everything I know about business, I got to meet so many amazing people and work with the most incredible clients, many of whom became close friends, and I got to help, inspire and change the lives of everyone from teens to adults. It was such an era of growth for me, personally, mentally, physically and spiritually. But in those last few years I'd reached the peak of my career. I was the busiest trainer in the gym, fully booked with 50+ sessions a week and making great money, so I should have been happy, right? This was what I was meant to want, what I'd been reaching for for so long, but there I was again, miserable and depressed, standing in the life I thought I wanted. I couldn't shake the feeling that surely this can't be it, there has to be more to life?",
    { connector: 'long-drop' },
    '## Burning out in Bondi',
    "In the lead up to my \"dream\" trip to Europe in 2021, I'd run myself into the ground with back to back sessions and an overbooked schedule, telling myself I just had to get through these few months and before I knew it I'd be sitting on a beach in Italy sipping a marg. That whole time I was a mental wreck, crying out of nowhere, up one second and down the next. I'd also been dealing with a breakup with my best friend of 7 years, and I'd just come out of another relationship with the wrong guy (again). My intuition had told me he wasn't right, but I'd chosen to date him almost as a punishment. He was the complete opposite of my ex, a total straighty 180, and I figured doing the extreme opposite would be good for me (hello ADHD brain, lol). He was a bodybuilder who counted the calories in every meal, to the point where date night involved him bringing his own prepped food to the restaurant. Let’s just say we didn’t exactly have the deepest conversations.",
    {
      image: '/images/story/greece-quad.jpg',
      width: 1050,
      height: 1400,
      alt: 'A quad bike parked below whitewashed buildings and stone walls on a Greek island',
      small: true,
      side: 'left',
    },
    "That Euro trip ended up being an absolute nightmare. I was in such a low vibe state that I was attracting in all of the bad things, from luggage theft and getting mugged in a dodgy underground train station near Naples to being scammed countless times. Then in Greece it all came tumbling down. We went out partying and got on all the drugs, which was misalignment AGAIN, because I'd barely been drinking and had kept drugs to a minimum for years. The very next day my quad bike was stolen, and I caught the flu from my friend, which completely took me out for the rest of the two month trip.",
    {
      image: '/images/story/bedridden.jpg',
      width: 1050,
      height: 1400,
      alt: 'Lena lying in a hotel bed with her feet up and the TV on, sick during her Europe trip',
      side: 'right',
    },
    "I ended up bedridden with pneumonia, and the second I felt the tiniest bit better I'd try to enjoy what was left of the trip, only to get 100 times sicker and end up bedridden all over again (classic me, not listening to my body).",
    "I came back from that trip still recovering from extreme burnout and knew something had to change, so I started cutting back sessions and doing less, because I wanted rest and I was seeking freedom.",
    '## My first solo trip to Bali',
    "In 2023 I visited Bali for the first time, and it was my first ever solo trip. I'd done parts of other trips on my own before but never the whole thing, so I was anxious and honestly pretty scared. But as soon as I landed and made my way to Ubud, I just knew this was where I was meant to be. It's hard to explain because I'd never felt anything like it before, but it felt familiar, like I'd been there before, and it felt like home.",
    "Not only did I have the best trip of my life, it made me remember what it felt like to be free. Before this I'd been stuck in a constant tug of war, caught up in the do-more machine, chasing productivity and trying to figure out my life and build my online business, while also trying to do less, heal and look after my mental health. But on this trip, on my own, experiencing new things, meeting people from all over the world, slowing down and just being present, I got a taste of freedom again and realised I'd forgotten what that even felt like.",
    "I remember dreading going home. If anything I felt even more lost, because I knew the life I was going back to was so far from what I wanted. I was racking my brain for a way out of my job, and the one thing I knew for sure was that I needed to set myself up online so I could travel and work from anywhere in the world. Figuring out how to get there, though, is a whole other story.",
    "But when I got back to Sydney, I was surprised to find I was actually enjoying it. Being welcomed back by all my friends and clients had me thinking, oh, maybe it's not so bad. What I didn't realise back then was that it only felt good because it was familiar. It was my comfort zone, the known.",
    "Before I knew it I was back in the same old routines and that same tug of war. I was spending so much time on the inner work, healing, meditation, being in nature, grounding and reiki, doing all the things I thought were the 'right' things to do, but it wasn't enough, and I still felt up and down, stuck and confused.",
    '## Deciding to leave Sydney',
    "Nine months later I needed a break again, so I ran back to Bali. I already knew I wanted to uproot my life, I just didn't have the \"right plan\". This trip was even better than the first. Bali has an energy like nowhere else. Some say it's the ley lines, but all I know is that something about this island fast-forwards your healing and opens you up to what's possible. On this trip I learnt how to surf and made so many new friends, and this time I was like, no, this is it, I'm committing to the leap. I gave myself six months once I got home to save some money, and then I was out of there no matter what.",
    "It ended up taking me eight months, including the three months' notice I had to give. There was no huge moment that pushed me over the edge, but I remember the day clearly. I was at the gym with a client when an entitled idiot got in our faces, trying to staunch us for taking too long on the equipment, and I remember laughing to myself thinking, ok universe, I get it, we're done here, I'm not putting up with this shit anymore. (Honestly, I'd thank him now.) That afternoon I asked the universe and my grandma, who passed a long time ago, for a sign. I asked to see a rainbow in the next 24 hours, and if I saw one, it meant yes to quitting my job and uprooting my life to Bali.",
    "That very afternoon after work, I was meant to go to the gym, but instead I felt called to go down to the beach. It was raining and I was like, are you sure, intuition? But I just felt I needed to go. And as I sat there in the rain on the edge of the cliff overlooking Balmoral beach, there it was, my sign, a beautiful big rainbow. The next day I resigned.",
    { connector: 'short-curl' },
    {
      image: '/images/story-grandma-full.jpg',
      width: 1125,
      height: 1500,
      alt: 'Lena’s hand resting on her grandma’s memorial plaque beside an oracle card reading “Yes, just say yes”',
    },
    "And of course, once I'd finally resigned, the universe decided to throw all kinds of tests my way, dangling high-paying opportunities, collabs, gifts, all the reasons to stay. I backpedalled on my decision a few times and even convinced myself to take a job in Sydney for a week. The uncertainty of the leap and not having a proper plan, especially for my income, had me changing my mind every two seconds, and I was letting other people's opinions pull me back towards safety way too easily. It was a difficult period because I kept doubting myself, and I guess that's what happens when you no longer have that \"safety\", your mind is just trying to keep you safe. But I stuck to my decision.",
    "I ran myself into the ground one more time before I went, selling everything I owned and packing up my whole apartment and life all on my own while juggling work, and then before I knew it, the day was finally here. I boarded that one-way flight to Bali and I never looked back.",
    '## Uprooting my life to Bali at 36 with no plan',
    {
      image: '/images/story-packing-up.webp',
      width: 856,
      height: 1200,
      alt: 'Lena smiling with her suitcase in her empty apartment, ready to leave for Bali',
      caption: 'packing up my whole life',
      cutout: true,
    },
    "When I landed in Bali I didn't have a proper plan or any work locked in, just a deep, undeniable knowing that if I'd found the courage to leap like this, there was no other option but for the universe to reward me and for it all to work out, and I genuinely believed that to my core. The moment I arrived, everything started to flow. I made a group of friends on my very first night, and a week later I'd found my new home, after a friend of someone I'd met turned out to be looking for a roommate in her beautiful villa in Canggu. Everything was falling into place, apart from the work.",
    "I hadn't saved much money for this new chapter, because I was so damn eager to get out of my old life that I wasn't really thinking about money at all. I thought my work was sorted, since the advertising agencies I'd been working with in Sydney said they'd keep working with me once I was in Bali, but it all fell through.",
    '## Falling apart in paradise',
    "Three months in, on the surface I was living my dream life in Bali, but underneath I was lowkey falling apart. I was feeling all the same things I'd felt back in Sydney, up and down, depressed and anxious, and I couldn't understand it, because I'd uprooted my whole life to get away from all of that and here we were again, like seriously, universe? I was so pissed.",
    "I was doing all the things, with my days structured down to the hour. I was up at 5am for my morning walk to get my steps in, then oracle cards, meditation and coffee before working on my new UGC business, applying for freelance roles and reaching out to businesses and brands to collab, then the gym, hitting my protein goal, catching the sunset and in bed by 10 to start all over again.",
    "I was doing everything that had worked for me in my old life, still caught up in the hustle without even realising it. I was stuck in this limbo between trying to be responsible, building my career so I could keep on top of my finances, and trying to slow down and actually enjoy the present moment and my life in Bali. The one thing I kept doing was running off to Ubud, and any time I had a meltdown or felt anxious I'd escape back there for the week or the weekend.",
    "Around the same time, my dad got really sick and I flew back to Sydney so I could be with him after his surgery. I'd already maxed out my credit card by then, so while I was home I was applying for UGC roles, and I actually landed a great gig with exactly what I needed, consistent, good pay. But when I returned to Bali, the job fell through, again.",
    { connector: 'swoop-right' },
    '## Down to my last $500 in Ubud',
    "Four months in, things were not looking good. I was down to my last $500 and had sold the last of my Bitcoin, and I literally couldn't afford my rent anymore, so I made the super tough decision to tell my villa I was moving out. I had no choice but to leave, so I went to Ubud.",
    "That first day in Ubud, I'd paid for a couple of nights at a homestay while I decided whether to stay or go back home, and I'd lined up two inspections for monthly places within my very minimal budget (5.5 million IDR was all I had). One fell through, and on the way to the other, something already felt off. The Grab couldn't find the location and took me to the wrong place twice, so I got off and walked until I eventually found it.",
    "The room was fine and had everything I needed, but it was in a really busy spot right next to a school, and the bigger red flag was the landlord, who was giving majorly creepy vibes. But I was desperate, and it was one of the very few places that was clean, decent and within my budget, so I went to pay the deposit. It failed, and then it failed again, and the whole time my hand was shaking like crazy without me really knowing why. Before I tried a third time I thought, ok, I think this is a sign, and I walked away.",
    "I was so angry at the universe, because this was my last resort and I had $500 to my name, no backup and no savings. That night I went back to the homestay so upset and overwhelmed that I gave in and decided I had to go back home, because I literally had no other option. I'd checked flights the night before and found one just within my budget, the exact amount I could afford to get back to Sydney, but when I went to book it, the price had tripled since the day before. That was the moment I hit absolute rock bottom (again), sitting on the floor of a mouldy shower in a rundown homestay, sobbing under a handheld shower, thinking I'm so damn broke I can't even afford a shower head attached to the wall, and wondering how the hell I'd ended up here. I'd sold everything, spent everything and maxed out all my cards, and somehow I was completely broke and broken.",
    "I allowed myself the pity party that night, but when I woke up the next morning I had no option but to trust that this was all happening for me. I was meant to go to the gym, but it had started raining, so I decided to go to Pilates instead on the last class pass points I had left.",
    "There I ended up meeting a girl who invited me over for coffee, and it turned out she lived right where I'd been the night before, aimlessly walking the streets. I remember standing on that very corner and it was like time stopped. Everyone around me almost disappeared, and all I could see was this golden sign glistening in the light, and I had this feeling that I'd been here before, like something was really familiar and felt right.",
    "She told me there were a bunch of places behind hers with rooms available and that I should go check them out, so that's what I did. And the wildest part is that I walked into one of them to see a room, and my name was already written up on their wall with a room allocated to me (but that's a story for another time). That place ended up being my new home, and I've stayed there ever since.",
    "Sometimes, when an old way of living and an old identity no longer fit the person you're becoming, the universe strips everything away so you can rebuild your foundations and step into your new identity and your new life. Looking back, this was my dark night of the soul.",
    { connector: 'long-wander' },
    '## The turning point',
    "That day became my turning point, and within 24 hours things started to shift, beginning with a \"random\" $777 refund from my health insurance. The next day a client reached out about a photoshoot that paid for my next month's rent, and from there came new clients, new jobs, new energy and money landing in my bank account.",
    "Bit by bit things started to flow in, and the strangest part was that I wasn't even trying. I wasn't applying for work, pushing my business or trying to be productive, I was just finally giving my body the rest it so desperately needed, living in the moment and taking small steps of aligned action.",
    "I could honestly go on forever, but I'll save the rest for our journey together.",
    '## Reinventing life on my own terms',
    "I've been reinventing life on my own terms ever since. Lena in the Wild was born from choosing this new life and this new way of being, and I continue to pursue freedom in every area of my life, including my business. It's where I document the whole journey of starting over in my late 30s: from unlearning hustle conditioning and old patterns to slow living and building a life in a new country, making new friends, being single, all things wellness and healing, solo travel and so much more.",
    "I truly believe I went through everything I did so I could come out the other side and help others do the same, and I know it's part of why I'm here. My purpose is to inspire people who feel stuck, who know they want more from life but are scared to go after it, and to show them what's possible. I've literally been through it ALL to get here, and I'm still on the journey of continuously bettering my life, so I want to help others create the same freedom for themselves that I've created for myself, through everything I've learned from my own struggles. That's what my writing, my teachings, my offerings and my healing are all about, and this beautiful business I've created is built entirely on freedom.",
    "It hasn't all been easy. There have been rock bottom moments on the other side of the leap, alongside the signs and synchronicities that kept me going, a lot of learning, a lot of tears and a hell of a lot of growth, but it's also been the most freeing, magical chapter of my life so far. I've always believed in the law of attraction, but once I got through all those hurdles and unlearned the hustle and everything we've been told about how to be successful and how we're meant to live, I found a whole different way of living and being on the other side, where things really can be that easy. I'm honestly a completely different person to who I was back in Sydney two years ago. I share all of it, the unfiltered reality, not my highlight reel, not to scare you but to show you it's possible and what it really takes.",
    "Life has ups and downs no matter which path you choose, so you may as well spend them building the life you actually dream of.",
    "If any of this feels familiar, I've poured everything I've learned into The Freedom Frequency, an embodied, self-paced course to help you find your own answers and create the freedom you've been craving, wherever you're at in your journey. It's made for the person who knows there's more to life and is ready to find it.",
  ],
  cta: 'Explore The Freedom Frequency',
  closing:
    "If something here resonates, a story, a photograph, a feeling, I'd love to hear from you, so come say hi.",
};


// The photography page (/photography): the "Let Me Reintroduce Myself"
// photoshoot, mostly in Lena's own words from her notes. `brand` is the
// working name until she decides. The gallery photos are stand-ins from her
// own library: swap them for portfolio images as it grows (each needs a src
// and alt; `tall` makes it a portrait-shaped tile).
export const photographyPage = {
  brand: 'Naluri Photography',
  title: 'Let me reintroduce myself.',
  lead: 'An immersive photography experience for the version of you that fought so damn hard to be here.',
  cta: 'Begin your reintroduction',
  // Client photos (location data stripped). Swap or add more any time.
  hero: { src: '/images/photography/client-banana-leaves.webp', alt: 'A client smiling between giant banana leaves, in a pink top' },
  still: { src: '/images/photography/lotus-pool.webp', alt: 'A pink lotus flower in front of a pool' },
  celebrationPhoto: { src: '/images/photography/client-garden-smile.webp', alt: 'A client smiling, long hair over her shoulders, in a tropical garden' },
  who: {
    label: 'Who it’s for',
    body: [
      'It’s for the person stepping into a new version of themselves. Maybe you’ve just gone through a huge life transition, started a new chapter, or been through an awakening. You had to turn inward and do a lot of deep internal work.',
      'Now you’re ready to step back into the world and show off the new you. To reintroduce yourself.',
      'But none of your camera roll really connects with who you are now. Sure, they’re nice photos, but they don’t represent the new you. This new version of who you’ve become.',
      'So when was the last time you saw a photo of yourself and thought, wow, I’m so damn proud of her. Look at me.',
    ],
  },
  era: 'Step into your most confident, magnetic, expansive era yet. It’s time to show the world the new you!',
  why: {
    label: 'A celebration of self',
    body: [
      'This is a celebration of the hard work. Of the transformational period you’ve just been through. Of the courage it took, the inner work, the letting go, the death of your old identity and stepping into the new.',
      'This is a pivotal moment, and it deserves to be documented as big as a wedding or an anniversary.',
    ],
    quote: 'You did the work. Now step into the light.',
  },
  story: {
    label: 'Why I do this',
    body: [
      'I’ve been through multiple transitions over the past few years. The leap, uprooting my life from Sydney to Bali. The death of my old identity, and stepping into a new one. Letting go of old conditioning and an old way of living, for a life on my terms. And now, the next layer of that.',
      'Every one of those moments was a pivotal transformation, and every one deserved celebrating. I want to be able to look back at them and say: wow, look how far I’ve come.',
      'But when I looked at my old photos, there was a disconnect. They didn’t reflect who I am now. I wanted to show the new me. Feminine, embodied, in my power, in this new era.',
      'That’s what I want to give you.',
    ],
    photo: { src: '/images/lena-sunrise-smile.jpg', alt: 'Lena smiling over her shoulder at sunrise' },
  },
  gives: {
    label: 'What this experience gives you',
    items: [
      { title: 'Permission', body: 'To take up space. To be bold, soft, sensual, playful, all of it. To stop shrinking.' },
      { title: 'To be witnessed', body: 'Someone holding space for you to shine, and catching the moment you light up.' },
      { title: 'A celebration', body: 'Of the courage it took, the parts of you that you let go, and the person who stayed.' },
      { title: 'Proof', body: 'Images you’ll come back to on the hard days, to remember exactly who you are.' },
    ],
  },
  experience: {
    label: 'The experience',
    body: 'One on one, guided from start to finish. We shape the mood, styling and location together, then I’ll hold the space while you play, laugh, move and let go. No stiff poses. Just you, fully you. Afterwards, you’ll receive a curated gallery of edited images.',
    hype: 'I’ll be behind the camera cheering you on, hyping you up and celebrating the woman you’ve become.',
    note: 'Pricing and dates on enquiry.',
  },
  galleryLabel: 'Portfolio',
  // Portraits with a few nature shots between them, to give the eye a rest
  // Portraits with a few nature shots between them, ordered so the pinks,
  // blues and greens spread evenly across the grid
  gallery: [
    { src: '/images/photography/client-rice-field-palm.webp', alt: 'A client laughing against a palm by the rice fields', tall: true },
    { src: '/images/photography/client-hands-in-hair.webp', alt: 'A client laughing with her hands in her hair', tall: true },
    { src: '/images/road/road-8.jpg', alt: 'A palm leaning over a quiet blue bay', tall: true },
    { src: '/images/photography/client-namaste-bamboo.webp', alt: 'A client in quiet reflection under a bamboo roof', tall: true },
    { src: '/images/reconnect/day-5.jpg', alt: 'A pink-lit cloud above the treetops at sunset', tall: true },
    { src: '/images/photography/client-palms-back.webp', alt: 'A client looking up at the palms', tall: true },
    { src: '/images/photography/client-arm-raised-tree.webp', alt: 'A client with an arm raised under a leafy tree', tall: true },
    { src: '/images/photography/client-palms-laughing.webp', alt: 'A client laughing in the sun beneath tall palms', tall: true },
    { src: '/images/photography/client-rice-field-dress.webp', alt: 'A client in a leopard dress in a green rice field', tall: true },
  ],
  enquiry: {
    heading: 'Ready to reintroduce yourself?',
    body: 'Tell me a little about you and the version of yourself you’re stepping into. I’ll be in touch.',
    dm: 'Or message me on Instagram',
    chapterPlaceholder: 'Tell me about the new you',
    button: 'Send enquiry',
    sending: 'Sending…',
    sentHeading: 'Thank you!',
    sentBody: 'Your enquiry is in. I’ll be in touch soon.',
  },
  connection: {
    line: 'The inner side of this work lives at Lena in the Wild.',
    label: 'Read my story',
    href: '/my-story',
  },
};

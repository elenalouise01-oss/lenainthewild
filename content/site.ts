// All site copy lives here, separated from presentation, so it can be
// updated without touching component code.

export const nav = {
  logo: 'Lena in the Wild',
  menuLogo: 'Lena',
  links: [
    { label: 'About', href: '#about' },
    { label: 'The Freedom Seeker', href: '#freedom-seeker', expandable: true },
    { label: 'Blog', href: '#blog', expandable: true },
    { label: 'Wellness Studio', href: '#wellness-studio' },
    { label: 'Shop', href: '#shop' },
  ],
  subscribeLabel: 'Subscribe',
  closeLabel: 'Close',
};

export const hero = {
  kinetic: 'LITW',
  headline: 'Lena in the Wild',
  sub: 'Unfiltered, behind the scenes, out in it — this is what happens off-camera.',
  scrollLabel: 'Scroll to Begin',
  badgeText: 'LENA IN THE WILD • LENA IN THE WILD • ',
  ctaLabel: 'Come along',
  ctaHref: '#next',
  imageSrc: '/images/hero.jpg' as string | null,
};

export const welcome = {
  eyebrow: 'Welcome to Lena in the Wild',
  headline: "For the person who knows there's more to life and is ready to find it.",
  supportLeft:
    "You've been feeling that pull, little nudges to go after your dream. You're standing in the life you thought you wanted, feeling stuck, stagnant, unfulfilled, searching for answers.",
  supportRight: "I feel you. That was me. Trust me, you're in the right place.",
  cta: "Here's how it all started",
  ctaHref: '#story',
  chapterLabel: 'Lena in the Wild',
  bigWord: 'LIFE',
  chapters: [
    { number: '01', label: 'My Story' },
    { number: '02', label: 'Freedom' },
    { number: '03', label: 'Blog' },
    { number: '04', label: 'Wellness' },
    { number: '05', label: 'Shop' },
  ],
  statBlock: {
    text: '36 years old when I walked away from the life everyone said I should want — and I never looked back.',
  },
};

export const myStory = {
  label: 'My Story',
  quote: "I just had a deep, undeniable knowing that this life wasn't for me anymore.",
  body: "I'm Lena. I was 36 when I uprooted my life from Sydney and leapt into the unknown, leaving behind a successful personal training business in Bondi that once felt like the dream. I couldn't shake the feeling that surely this can't be it. So I broke free, from the hustle, the system, the rat race, and I've been rebuilding on my own terms ever since. Lena in the Wild is where I document that journey: slow living, travel, wellness, healing, and the real, unfiltered version of what it actually takes to rebuild a life on your terms.",
  cta: 'Read My Story',
  ctaHref: '#about',
};

export const freedomSeeker = {
  label: 'The Freedom Seeker',
  headline: 'From stagnation to a life that feels like you.',
  sub: "You built the career, the home, the income. And now you're wondering why you still feel restless. Start here.",
  tiers: [
    {
      number: '(01)',
      price: 'Free',
      title: 'The 5 Day Reconnect',
      body: 'A free audio journey to help you slow down, get out of your head, and hear yourself again.',
      tags: ['Audio Journey', 'Self-Paced', 'Free Access'],
    },
    {
      number: '(02)',
      price: '$555',
      title: 'The Freedom Frequency',
      body: 'An embodied self-paced course for people ready to choose themselves.',
      tags: ['Embodied Practice', 'Self-Paced Course', 'Lifetime Access'],
    },
    {
      number: '(03)',
      price: '$4,444',
      title: 'The Aligned Circle',
      body: 'A 3-month intimate mastermind for people ready to live this new chapter.',
      tags: ['3-Month Mastermind', 'Small Group', '1:1 Support'],
    },
  ],
  cta: "Yes, I'm ready to reconnect",
  ctaHref: '#freedom-seeker',
  experienceLabel: 'My Experience',
  experienceLead: "I've walked away from a career that looked perfect on paper",
  experienceHighlight: 'BURNOUT, REBUILDING, SLOW LIVING, TRAVEL',
  experienceTail:
    "to build a life in South East Asia that actually fits. I've led myself through the exact reconnection, uncertainty and rebuild I now guide others through.",

  noteCard: {
    label: 'Note to Self',
    body: "Some days this still feels like the scariest, most alive thing I've ever done. I'm not doing it perfectly — I'm just doing it honestly.",
  },
  creativeWork: {
    leadItalic: 'A Life',
    leadBold: 'THAT ACTUALLY FEELS FREE',
    body: "After a decade chasing the version of success everyone else wanted for me, I'm learning what actually feels good — one honest day at a time.",
    cta: "Let's Connect",
    ctaHref: '#subscribe',
  },

  pillarsLabel: 'On the Road',
  pillarsIntro: 'I move easily between the plan and whatever actually happens — that’s usually the better story.',
  pillars: [
    {
      category: 'Travel',
      title: 'On the Move',
      roles: 'SLOW TRAVEL, SOLO TRIPS, STORYTELLING',
      excerpt: 'Slow travel through South East Asia.',
    },
    {
      category: 'Wellness',
      title: 'Grounded Mornings',
      roles: 'DAILY RITUALS, JOURNALING, STILLNESS',
      excerpt: 'Small rituals that keep me steady.',
    },
    {
      category: 'Healing',
      title: 'The Hard Parts',
      roles: 'REBUILDING, UNCERTAINTY, HONESTY',
      excerpt: 'What rebuilding actually looks like.',
    },
    {
      category: 'Wild',
      title: 'Out There',
      roles: 'ADVENTURE, RISK, WONDER',
      excerpt: 'Where the comfort zone ends.',
    },
  ],

  brandCampaigns: {
    label: 'Snapshots',
    body: 'A look at the everyday moments — the ones I actually stopped to capture.',
  },

  contentJourney: {
    label: 'My Journey',
    lead: "I've walked through burnout, uncertainty, and starting over more than once,",
    tail: "building a life that's actually mine — one honest step at a time.",
    colBold: 'Alongside the big moves, I try to stay close to the small stuff —',
    colRest: "the mornings, the walks, the quiet days that don't make it to a highlight reel but are just as real.",
  },

  envelope: {
    leadBold: 'Every polaroid in here is a moment I almost let slip by —',
    leadRest: 'the ones that don’t make the feed, but are the whole reason I did this.',
    cardLabel: 'MOMENTS FROM',
    places: ['Bali', 'Hanoi', 'Chiang Mai', 'Ho Chi Minh City', 'Ubud'],
    ribbon: 'Featured Moment',
  },

  modelingCard: {
    label: 'In Real Life:',
    headline: 'BEHIND THE SCENES',
  },
  bigStatement: 'COME SAY HI',

  contact: {
    label: 'Get in Touch',
    kicker: 'Ready to Reconnect?',
    headline: "Let's Talk",
    body: "Have a brand, question, or idea in mind? I'd love to hear about it. Whether you're curious about The Freedom Seeker, or just want to connect, let's talk.",
    listLabel: 'Drop a message below and I’ll get back to you shortly',
    list: ['The 5 Day Reconnect', 'The Freedom Frequency', 'The Aligned Circle', 'General Inquiries'],
    fields: { name: 'Name', email: 'Email', message: 'Message' },
    cta: 'Send',
  },
};

export const blog = {
  eyebrow: 'Latest Stories',
  headline: 'From the Blog',
  posts: [
    {
      category: 'Travel',
      title: 'Solo Travel in Vietnam',
      excerpt: "On learning to let Bali unfold on its own terms.",
    },
    {
      category: 'Wellness',
      title: 'My Daily Grounding Practice',
      excerpt: 'What happens when you stop optimising your mornings and start feeling them instead.',
    },
    {
      category: 'Healing',
      title: 'Overcoming My Fear of Riding a Scooter',
      excerpt: "A visual journal from two weeks shooting film along Bali's southern coastline.",
    },
  ],
  cta: 'Read all stories',
  ctaHref: '#blog',
};

export const newsletter = {
  eyebrow: 'Letters From Me to You',
  headline: 'Stories in your inbox',
  body: "Unfiltered stories from a life I'm building from scratch in South East Asia. Everything I'm learning, feeling and discovering, straight to your inbox.",
  cta: 'Subscribe on Substack',
  ctaHref: '#subscribe',
};

export const footer = {
  columns: [
    {
      label: 'Read',
      links: ['Blog', 'Travel', 'Wellness', 'Healing'],
    },
    {
      label: 'Explore',
      links: ['The 5 Day Reconnect', 'The Freedom Frequency', 'Dream Life Workbook', 'Wellness Studio'],
    },
    {
      label: 'Connect',
      links: ['About', 'Instagram', 'Substack'],
    },
  ],
  currently: {
    label: 'Currently',
    body: 'Currently in South East Asia, figuring it out as I go.',
  },
};

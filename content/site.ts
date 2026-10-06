// All site copy lives here, separated from presentation, so it can be
// updated without touching component code.

export const nav = {
  logo: 'Lena in the Wild',
  menuLogo: 'Lena',
  links: [
    { label: 'About', href: '#about' },
    { label: 'The Freedom Seeker', href: '#freedom-seeker', expandable: true },
    { label: 'Blog', href: '#blog', expandable: true },
    { label: 'Contact', href: '#contact' },
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
  body: "I'm Lena. I was 36 when I uprooted my life from Sydney and leapt into the unknown, leaving behind a successful personal training business in Bondi that once felt like the dream. I couldn't shake the feeling that surely this can't be it. So I broke free, from the hustle, the system, the rat race, and I've been rebuilding on my own terms ever since. Lena in the Wild is where I document that journey: slow living, travel, wellness, healing, and the real, unfiltered version of what it actually takes to rebuild a life on your terms.",
  cta: 'Read My Story',
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

type Tier = {
  number: string;
  // Leave out to hide the price pill on that card.
  price?: string;
  title: string;
  body: string;
  tags: string[];
};

export const freedomSeeker = {
  label: 'The Freedom Seeker',
  headline: 'From stagnation to a life that feels like you.',
  sub: "You built the career, the home, the income. And now you're wondering why you still feel restless. Start here.",
  tiers: [
    {
      number: '(01)',
      price: '$22',
      title: 'The 5 Day Reconnect',
      body: 'An audio journey to help you slow down, get out of your head, and hear yourself again.',
      tags: ['Audio Journey', 'Self-Paced'],
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
  ] as Tier[],
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
    ctaHref: '#contact',
  },

  pillarsLabel: 'My Journal',
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
    // Printed on the front of the envelope
    frontItalic: 'My Journey:',
    frontTitle: 'Snapshots From the Road',
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
      links: ['About', 'Instagram', 'TikTok', 'Substack'],
    },
  ],
  currently: {
    label: 'Currently',
    body: 'Currently in South East Asia, figuring it out as I go.',
  },
};

// The My Story page (/my-story).
export const storyPage = {
  welcomeTitle: 'Welcome to Lena in the Wild',
  welcome:
    "If you've been feeling the pull to want more for your life, feeling stuck, stagnant, searching for answers but not knowing how to get there… feeling like there's more to life… seeking freedom… you've been up and down. I feel you. That was me. You're in the right place.",
  storyTitle: 'My Story',
  paragraphs: [
    "I'm Lena. I was 36 years old when I uprooted my life from Sydney and leapt into the unknown. I was running a successful personal training business in the busiest gym in Bondi for 8 years, a life I had once dreamed of. But there I was, chasing the life I'd been sold to want… and I was miserable. I couldn't shake the feeling that surely this can't be it, there has to be more to life?",
    "I had extreme burnout after a trip to Europe in 2021. I'd run myself into the ground in the lead-up to it, and when I came back I knew something had to change. I started cutting back sessions, doing less. I wanted rest, and I was seeking freedom.",
    "It took a couple of years to reach the point of realising I wanted to move to Bali. The first time I visited, I remembered what it felt like to be free, and from the first time I went to Ubud, I knew that was where I was meant to be. But I came back to hustle, to my comforts. I stayed in Sydney a while longer, doing less, doing more healing, inner child work, grounding, regulating, reiki, until I finally committed. I gave myself six months to move. The universe tested that decision the whole way, dangling high-paying opportunities, collabs, gifts, all the reasons to stay. I doubted myself. I ran myself into the ground one more time before I left, selling everything I owned, all on my own, and then I left.",
    'So I broke free. From the hustle, from being caught in the system, from the rat race, and started reinventing life on my own terms. Lena in the Wild is where I document that journey: slow living, travel, wellness, healing, and the deep, ongoing work of rebuilding at 36, unlearning old beliefs, stepping into a new reality, saying goodbye to who I used to be.',
    "It hasn't all been easy, there's been rock bottom moments on the other side of the leap, alongside the signs and synchronicities that kept me going. I share all of it, the real version, not the Instagram highlight reel, because that's what actually helps people. Not to deter you, but to show you it's possible, and what it really takes.",
    "Life has ups and downs no matter which path you choose, so you may as well spend them building the life you actually dream of. I'm figuring it out as I go, and sharing what I find along the way.",
    "If any of this feels familiar, I've turned what I've learned into practical tools to help you find your own answers, wherever you're at in your journey. Start with The 5 Day Reconnect, or if you're ready to go deeper, explore The Freedom Frequency, all made for the person who knows there's more, and is ready to find it.",
  ],
  cta: 'Start with The 5 Day Reconnect',
  closing:
    'If something here resonates, a story, a photograph, a feeling, I would love to hear from you. The best way in is the newsletter.',
};


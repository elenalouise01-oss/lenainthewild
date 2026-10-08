// All site copy lives here, separated from presentation, so it can be
// updated without touching component code.

export const nav = {
  logo: 'Lena in the Wild',
  menuLogo: 'Lena',
  links: [
    { label: 'About', href: '#about' },
    { label: 'The Freedom Seeker', href: '#freedom-seeker', expandable: true },
    { label: 'Journal', href: '#blog', expandable: true },
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
  credentials: {
    title: 'My credentials',
    items: [
      { title: 'Reiki Master', detail: '' },
      { title: 'Embodiment Coach', detail: '' },
      { title: 'Personal Trainer & Wellness Coach', detail: '8+ years · Certificate III & Certificate IV' },
    ],
  },
  experienceSub: 'I’ve lived it.',
  experienceLead: 'I walked away from a career that looked perfect on paper, moved overseas, and rebuilt my life from the ground up.',
  experienceHighlight: 'BURNOUT, REBUILDING, SLOW LIVING, TRAVEL',
  experienceTail:
    "I've led myself through the exact reconnection, uncertainty and rebuild I now guide others through.",

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
    list: ['The Freedom Frequency', 'The 5 Day Reconnect', 'Your Freedom Roadmap', 'General Inquiries'],
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

export const listen = {
  eyebrow: 'Press play',
  headline: 'Romanticise Your Life',
  body: 'A little soundtrack for starting over, romanticising the everyday, getting lost in nostalgia, and making ordinary moments feel a little more magical.',
  note: 'And I encourage you to create your own little playlist, too - fill it with the songs that make you feel the most free and happy.',
  title: 'Romanticise Your Life on Spotify',
  embedSrc: 'https://open.spotify.com/embed/track/3R1Xa7LkesYpNI3v6fslKi?utm_source=generator&theme=0',
} as const;

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
      links: ['The Freedom Frequency', 'The 5 Day Reconnect', 'Dream Life Workbook', 'Wellness Studio'],
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
  storyTitle: 'My Story',
  paragraphs: [
    "I'm Lena. I was 36 years old when I uprooted my life from Sydney and leapt into the unknown. I was running a successful personal training business in the busiest gym in Bondi for 8 years, a life I had once dreamed of. But there I was, chasing the life I'd been sold to want… and I was miserable. I couldn't shake the feeling that surely this can't be it, there has to be more to life?",
    "I had extreme burnout after a trip to Europe in 2021. I'd run myself into the ground in the lead-up to it, and when I came back I knew something had to change. I started cutting back sessions, doing less. I wanted rest, and I was seeking freedom.",
    "In 2023 I visited Bali for the first time, and it was my first ever solo trip. I'd done parts of trips on my own before but never the whole thing, so I was anxious and honestly pretty scared. But as soon as I landed and made my way to Ubud, I just knew this was where I was meant to be. It's hard to explain because I'd never felt anything like it before, but it felt like home.",
    "Not only did I have the best trip of my life, it made me remember what it felt like to be free. Before this I'd been caught up in the do-more machine, chasing productivity and hustling, but on this trip, on my own, experiencing new things, meeting people from all over the world, slowing down and just being present, I got a taste of freedom again and realised I'd forgotten what that even felt like.",
    "I remember dreading going home. If anything I felt even more lost, because I knew the life I was going back to was so far from what I wanted. I was racking my brain for a way out of my job, and the one thing I knew for sure was that I needed to set myself up online so I could travel and work from anywhere in the world. Figuring out how to get there, though, is a whole other story.",
    "But when I got back to Sydney, I was surprised to find I was actually enjoying it. Being welcomed back by all my friends and clients had me thinking, oh, maybe it's not so bad. What I didn't realise back then was that it only felt good because it was familiar. It was my comfort zone, the known.",
    "Before I knew it I was back in the same routines, hustling and chasing productivity again. I was constantly battling with work life balance, trying to do less and prioritise myself while working towards my online business goals and juggling my PT job. I was also spending so much time on the inner work, healing, meditation, being in nature, grounding and reiki, but it wasn't enough, and I still felt up and down, stuck and confused.",
    "Nine months later I needed a break again, so I ran back to Bali. I already knew I wanted to move, I just didn't have the \"right plan\". This trip was even better than the first, I learnt how to surf and made so many new friends, and this time I was like, no, this is it, I'm committing to the move. I gave myself six months once I got home to save some money, and then I was out of there no matter what.",
    "It ended up taking me eight months, including the three months' notice I had to give. There was no huge moment that pushed me over the edge, but I remember the day clearly. I was at the gym with a client when an entitled idiot got in our faces, trying to staunch us for taking too long on the equipment, and I remember laughing to myself thinking, ok universe, I get it, we're done here, I'm not putting up with this shit anymore. (Honestly, I'd thank him now.) That afternoon I asked the universe and my grandma, who passed a long time ago, for a sign. I asked to see a rainbow in the next 24 hours, and if I saw one, it meant yes to quitting my job and moving to Bali.",
    "That very afternoon after work, I was meant to go to the gym, but instead I felt called to go down to the beach. It was raining and I was like, are you sure, intuition? But I just felt I needed to go. And as I sat there in the rain on the edge of the cliff overlooking Balmoral beach, there it was, my sign, a beautiful big rainbow. The next day I resigned.",
    "And of course, once I'd finally resigned, the universe decided to throw all kinds of tests my way, dangling high-paying opportunities, collabs, gifts, all the reasons to stay. I backpedalled on my decision a few times and even convinced myself to take a job in Sydney for a week. The uncertainty of the leap and not having a proper plan, especially for my income, had me changing my mind every two seconds, and I was letting other people's opinions pull me back towards safety way too easily. It was a difficult period because I kept doubting myself, and I guess that's what happens when you no longer have that \"safety\", your mind is just trying to keep you safe. But I stuck to my decision.",
    "I ran myself into the ground one more time before I went, selling everything I owned and packing up my whole apartment and life all on my own while juggling work, and then before I knew it, the day was finally here. I boarded that one-way flight to Bali and I never looked back.",
    "I could honestly go on forever, but I'll save the rest for our journey together.",
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


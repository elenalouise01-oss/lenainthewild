// All site copy lives here, separated from presentation, so it can be
// updated without touching component code.

export const nav = {
  logo: 'Lena in the Wild',
  menuLogo: 'Lena',
  links: [
    { label: 'About', href: '#about' },
    { label: 'The Freedom Seeker', href: '#freedom-seeker', expandable: true },
    { label: 'Journal', href: '#on-the-road', expandable: true },
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
    "I've led myself through the exact reconnection, uncertainty and rebuild I now guide others through.",

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
    ctaHref: '#contact',
  },

  pillarsLabel: 'My Journal',
  pillarsCta: { label: 'Read more on Substack', href: 'https://lenainthewild.substack.com' },
  pillarsIntro: 'I don’t really do plans. I wake up, see how I feel, follow my intuition and let the day unfold.',
  // A pillar with an `href` links to its Substack post; without one it's a plain card.
  pillars: [
    {
      category: 'Travel',
      title: 'Overcoming My Fear of Riding a Scooter',
      roles: 'FEAR, CHILDHOOD WOUNDS, SELF COMPASSION',
      excerpt: 'Little did I know it would trigger old childhood wounds.',
      href: 'https://substack.com/home/post/p-209897527',
    },
    {
      category: 'Wellness',
      title: 'Leaping into the Unknown: Part 1',
      roles: 'LEAVING SYDNEY, TRUSTING YOUR INTUITION, BALI',
      excerpt: 'At 36, I threw my life up in the air.',
      href: 'https://substack.com/home/post/p-190792316',
    },
    {
      category: 'Healing',
      title: 'What I’m Learning About Slowing Down',
      roles: 'FIGHT OR FLIGHT, NERVOUS SYSTEM, SLOWING DOWN',
      excerpt: 'For years I didn’t even realise I was living in fight or flight.',
      href: 'https://lenainthewild.substack.com/p/for-years-i-didnt-even-realise-i',
    },
    {
      category: 'Wild',
      title: 'Breaking Free From the System',
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
    "Hi, I'm Lena. I was 36 years old when I uprooted my life from Sydney to Bali and leapt into the unknown, but it wasn't my first leap. I first threw my life up in the air at 21, when I'd just been dumped by my high school boyfriend of 8 years. I'd spent years managing a restaurant for his parents while working my way through a graphic design degree, and with my degree finished and the relationship over, I decided to leave it all behind and move to a remote island in the Whitsundays, then another, spending two years living the island life before moving to Canada on a whim after meeting a Canadian girlie who told me I should come over (23 year old me: yeah ok, why not!).",
    "I won't bore you with my whole resume, but when I returned to Sydney I went from barista work, hospitality and bartending to retail and then graphic design. Five years into my graphic design career, I hit rock bottom. I was in a toxic relationship with a drug dealer who was a drug abuser and alcoholic, I was depressed and anxious af, waking up every day dizzy and in a constant brain fog without knowing why, with never-ending thoughts and stress, and I literally hated my life. Meditation wasn't even optional, because without it my mind would spiral, but the gym was the only thing that made me feel good. It was the one thing I could control, and in the middle of all that darkness it became my lifeline.",
    "Slowly I started to realise that if the gym was the only thing keeping me going, maybe it was trying to tell me something, so I decided to follow it. I started studying to become a PT while juggling my full-time graphic design job, going to class at night after work and secretly studying at my desk. The owners always seemed to have their attention elsewhere, so I could get away with doing the bare minimum at a job that was completely unfulfilling, and it was only after I finally quit that the business went under and I found out why. The owners were corrupt, busy stealing money, and my boss ended up in jail (lol). Looking back, it was all meant to work out that way.",
    "But when I started my PT career I was still in that toxic relationship and still anxious af, and I was drinking and doing drugs to numb the pain and block out the thoughts, because given my environment and the company I was keeping, that was just the life I had. Every ounce of my body had told me not to move in with him, but I did, and six months later we got kicked out. We moved in with my sister, and one week in we had a huge blow up and it was finally over.",
    "What I know now is that you can't truly start over or begin a new chapter while the wrong people are still around you and you're clinging on to the past. Once he was gone, I could finally start mine, and I went on to spend 8 years building a successful personal training business in the busiest gym in Bondi, a life I had once dreamed of.",
    "And don't get me wrong, it was an incredibly rewarding job. It taught me everything I know about business, I got to meet so many amazing people and work with the most incredible clients, many of whom became close friends, and I got to help everyone from teens to adults. It was such an era of growth for me, personally, mentally, physically and spiritually. But in those last few years I'd reached the high point of my career. I was the busiest trainer in the gym, fully booked with 50+ sessions a week and making great money, so I should have been happy, right? This was what I was meant to want, what I'd been reaching for for so long, but there I was again, miserable and depressed, chasing the life I'd been sold to want. I couldn't shake the feeling that surely this can't be it, there has to be more to life?",
    "In the lead up to my \"dream\" trip to Europe in 2021, I'd run myself into the ground with back to back sessions and an overbooked schedule, telling myself I just had to get through these few months and before I knew it I'd be sitting on a beach in Italy sipping a marg. That whole time I was a mental wreck, crying out of nowhere, up one second and down the next. I'd also just been through a breakup with my best friend of 7 years, and I was dating the wrong guy (again). My intuition told me he wasn't right, but I chose to date him almost as a punishment. He was the complete opposite of my drug dealer ex, a total straighty 180, and I figured doing the extreme opposite would be good for me (hello ADHD brain, lol). He was a bodybuilder and boring as bad shit, I'd honestly had better conversations with a goddamn tree, and while he was good looking, I'll give him that, that was about it.",
    "That trip ended up being an absolute nightmare. I was in such a low vibe state that I was attracting in all the bad things, from luggage theft and getting mugged in a dodgy underground train station near Naples to being scammed countless times. Then in Greece it all came tumbling down. We went out partying and got on all the drugs, the very next day my quad bike was stolen, and I caught the flu from my friend, which completely took me out for the rest of the two month trip. I ended up bedridden with pneumonia, and the second I felt the tiniest bit better I'd try to enjoy what was left of the trip, only to get 100 times sicker and end up bedridden all over again (classic me, not listening to my body).",
    "I came back from that trip with extreme burnout and knew something had to change, so I started cutting back sessions and doing less, because I wanted rest and I was seeking freedom.",
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
    "When I landed in Bali I didn't have a proper plan or any work locked in, just a deep, undeniable knowing that if I'd found the courage to leap like this, there was no other option but for the universe to reward me and for it all to work out, and I genuinely believed that to my core. The moment I arrived, everything started to flow. I made a group of friends on my very first night, and a week later I'd found my new home, after a friend of someone I'd met turned out to be looking for a roommate in her beautiful villa in Canggu. Everything was falling into place, apart from the work.",
    "I hadn't saved much money for this new chapter, because I was so damn eager to get out of my old life that I wasn't really thinking about money at all. I thought my work was sorted, since the advertising agencies I'd been working with in Sydney said they'd keep working with me once I was in Bali, but it all fell through.",
    "Three months in, on the surface I was living my dream life in Bali, but underneath I was lowkey falling apart. I was feeling all the same things I'd felt back in Sydney, up and down, depressed and anxious, and I couldn't understand it, because I'd uprooted my whole life to get away from all of that and here we were again, like seriously, universe? I was so pissed.",
    "I was doing all the things, with my days structured down to the hour. I was up at 5am for my morning walk to get my steps in, then oracle cards, meditation and coffee before working on my new UGC business, applying for freelance roles and reaching out to businesses and brands to collab, then the gym, hitting my protein goal, catching the sunset and in bed by 10 to start all over again.",
    "I was doing everything that had worked for me in my old life, still caught up in the hustle without even realising it. I was stuck in this limbo between trying to be responsible, building my career so I could keep on top of my finances, and trying to slow down and actually enjoy the present moment and my life in Bali. The one thing I kept doing was running off to Ubud, and any time I had a meltdown or felt anxious I'd escape back there for the week or the weekend.",
    "Around the same time, my dad got really sick and I flew back to Sydney so I could be with him after his surgery. I'd already maxed out my credit card by then, so while I was home I was applying for UGC roles, and I actually landed a great gig with exactly what I needed, consistent, good pay. But when I returned to Bali, the job fell through, again.",
    "Four months in, things were not looking good. I was down to my last $500 and had sold the last of my Bitcoin, and I literally couldn't afford my rent anymore, so I made the super tough decision to tell my villa I was moving out. I had no choice but to leave, so I went to Ubud.",
    "That first day in Ubud, I'd paid for a couple of nights at a homestay while I decided whether to stay or go back home, and I'd lined up two inspections for monthly places within my very minimal budget (5.5 million IDR was all I had). One fell through, and on the way to the other, something already felt off. The Grab couldn't find the location and took me to the wrong place twice, so I got off and walked until I eventually found it.",
    "The room was fine and had everything I needed, but it was in a really busy spot right next to a school, and the bigger red flag was the landlord, who was giving majorly creepy vibes. But I was desperate, and it was one of the very few places that was clean, decent and within my budget, so I went to pay the deposit. It failed, and then it failed again, and the whole time my hand was shaking like crazy without me really knowing why. Before I tried a third time I thought, ok, I think this is a sign, and I walked away.",
    "I was so angry at the universe, because this was my last resort and I had $500 to my name, no backup and no savings. That night I went back to the homestay so upset and overwhelmed that I gave in and decided I had to go back home, because I literally had no other option. I'd checked flights the night before and found one just within my budget, the exact amount I could afford to get back to Sydney, but when I went to book it, the price had tripled since the day before. That was the moment I hit absolute rock bottom (again), sitting on the floor of a mouldy shower in a rundown homestay, sobbing under a handheld shower, thinking I'm so damn broke I can't even afford a shower head attached to the wall, and wondering how the hell I'd ended up here. I'd sold everything, spent everything and maxed out all my cards, and somehow I was completely broke and broken.",
    "I allowed myself the pity party that night, but when I woke up the next morning I had no option but to trust that this was all happening for me. I was meant to go to the gym, but it had started raining, so I decided to go to Pilates instead on the last class pass points I had left.",
    "There I ended up meeting a girl who invited me over for coffee, and it turned out she lived right where I'd been the night before, aimlessly walking the streets. I remember standing on that very corner and it was like time stopped. Everyone around me almost disappeared, and all I could see was this golden sign glistening in the light, and I had this feeling that I'd been here before, like something was really familiar and felt right.",
    "She told me there were a bunch of places behind hers with rooms available and that I should go check them out, so that's what I did. And the wildest part is that I walked into one of them to see a room, and my name was already written up on their wall with a room allocated to me (but that's a story for another time). That place ended up being my new home, and I've stayed there ever since.",
    "Sometimes, when an old way of living and an old identity no longer fit the person you're becoming, the universe strips everything away so you can rebuild your foundations and step into your new identity and your new life. Looking back, this was my dark night of the soul.",
    "That day became my turning point, and within 24 hours things started to shift, beginning with a \"random\" $777 refund from my health insurance. The next day a client reached out about a photoshoot that paid for my next month's rent, and from there came new clients, new jobs, new energy and money landing in my bank account.",
    "Bit by bit things started to flow in, and the strangest part was that I wasn't even trying. I wasn't applying for work, pushing my business or trying to be productive, I was just finally giving my body the rest it so desperately needed, living in the moment and taking small steps of aligned action.",
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


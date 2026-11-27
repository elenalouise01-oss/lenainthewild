// The Naluri Socials AI page (/naluri-socials-ai), in Lena's words.
// Positioning and voice: docs/naluri-socials-ai.md.

export const naluriSocialsAi = {
  label: 'Naluri Socials AI',
  eyebrow: 'For anyone building their dream business',
  title: 'You didn’t start a business to become a full-time content creator.',
  intro:
    'I set you up with AI that does most of your social media for you, in your branding and your voice, so you can put your time into your business.',
  photo: { src: '/images/naluri-socials-ai-lena.webp', alt: 'Lena smiling in a yellow outfit among tropical plants', pos: '39% 40%' },

  pain: {
    heading: 'If this is you',
    items: [
      'You know you need to post, but by the time you sit down you’re exhausted',
      'You’re coming up with every idea, caption and video from scratch',
      'Social media is taking hours you’d rather spend on your business',
      'You want freedom, not a second job as a content creator',
    ],
  },

  setup: {
    heading: 'What I set up for you',
    intro:
      'Custom Claude skills, made for your business. I’ve worked in social media and digital marketing for nine years, and these skills do the jobs I’d normally do for a client:',
    items: [
      'Your social media strategy',
      'Your content plan and ideas',
      'Reel editing',
      'Carousels and static posts, designed in your branding',
      'Custom GIFs',
      'Captions and content writing',
      'DM replies',
      'Content scheduling',
      'And anything else that fits how you work',
    ],
  },

  story: {
    heading: 'Why I made this',
    body: 'For years, I ran a full-time personal training business while building my online business on the side, posting daily on socials. Did it work? Sure. But it also led to burnout, exhaustion, and eventually going MIA from socials for months. Since then I’ve worked as a social media specialist and learnt everything I can about automation and AI. I used to spend 5 to 10+ hours editing every reel from scratch in CapCut — now that happens in the background while I work on my business. And when I cut back from posting daily to just a couple of times a week, nothing dropped: not my following, not my engagement. Now I post less and work less, but I’ve built more than I ever did back then, and this is the system I wish I’d had.',
  },

  how: {
    heading: 'How it works',
    steps: [
      {
        title: 'We get to know your business',
        body: 'We spend time really understanding your business, your audience and how you want to show up, and teach your AI all of it.',
      },
      {
        title: 'I build your content system',
        body: 'All your social media processes, set up to sound like you, speak straight to your niche, and look the way you like. Human, not AI slop.',
      },
      {
        title: 'You run it, with support when you need it',
        body: 'I show you how to use everything, and I’m here if you need changes or help along the way.',
      },
    ],
    // Short vertical demo clips showing step 2 (the content system) in action.
    // Up to 3 slots — add a video's src/poster here and it replaces the
    // placeholder; leave a slot as null until its clip is ready.
    demoHeading: 'See it in action',
    demos: [
      {
        src: '/videos/naluri-hub-landing.mp4',
        poster: '/videos/naluri-hub-landing-poster.jpg',
        alt: 'A whole week of content laid out in a client’s own content hub',
      },
      {
        src: '/videos/naluri-reel-editor.mp4',
        poster: '/videos/naluri-reel-editor-poster.jpg',
        alt: 'Claude editing a reel inside a client’s own reel editor',
      },
      {
        src: '/videos/naluri-carousel-editor.mp4',
        poster: '/videos/naluri-carousel-editor-poster.jpg',
        alt: 'Claude building a carousel inside a client’s own carousel editor',
      },
    ] as Array<{ src: string; poster: string; alt: string } | null>,
  },

  faq: {
    heading: 'Questions',
    items: [
      { q: 'Do I need to be techy?', a: 'Not at all. I set everything up for you and show you exactly how to use it.' },
      { q: 'What do I need to have?', a: 'A Claude account with Claude Code. I’ll walk you through setting it up.' },
      { q: 'Will it sound like me?', a: 'Yes. Your skills are built around your brand, your voice and the way you talk to your audience.' },
      { q: 'What if I get stuck after handover?', a: 'You’re not on your own. Ongoing support is there if you need changes, troubleshooting or extra help.' },
    ],
  },

  closing: 'Your business should support the life you want, not take all your time.',
  spots: 'I’m taking 2 founding clients.',
  // The buttons jump down to the form at the bottom of the page
  cta: { label: 'Book a free chat', href: '#book-a-chat' },
  form: {
    businessPlaceholder: 'What’s your business? (or your Instagram)',
    goalPlaceholder: 'What’s your main goal with social media right now?',
    readyQuestion: 'Are you ready to invest time, energy & money into this right now?',
    readyOptions: ['Yes, I’m all in!', 'I’m curious but have a few questions', 'Not sure yet'],
    button: 'Book a free chat',
    sentHeading: 'Thank you!',
    sentBody: 'I’ll be in touch by email within a couple of days to find a time to chat.',
    failed: 'Sorry, that didn’t go through. Please try again, or email me at nalurisocials@gmail.com.',
  },
};

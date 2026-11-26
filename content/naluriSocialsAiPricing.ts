// The Naluri Socials AI pricing page (/naluri-socials-ai/pricing), in
// Lena's words (given to Claude 26 Nov 2026). Not linked from the nav or
// the main /naluri-socials-ai page — shared as a direct link after a chat.

export const naluriSocialsAiPricing = {
  back: { label: 'Naluri Socials AI', href: '/naluri-socials-ai' },
  heading: 'Custom AI Content System',
  price: '$3,750 AUD',
  priceNote: 'One-time investment',
  intro: 'A content system built around your business, brand and way of creating content.',

  includedHeading: 'What’s Included',
  modules: [
    {
      title: 'Custom Content Studio',
      tagline: 'Your own branded space for content ideas, planning and performance.',
      bullets: [
        'Dashboard: See upcoming posts, content awaiting approval, key numbers and what’s working',
        'Strategy: content strategy, goals, niche, audience pain points, content pillars and offers in one place.',
        'Content Calendar: Plan content ahead of time, weekly or monthly, with picture previews, colour-coded formats, drag-and-drop and easy editing',
        'Idea Generator: Create ideas based on your strategy, then save them or add them to the calendar',
        'Performance Insights: Review what worked, what didn’t, and analyse viral content in your niche and what to try next',
      ],
    },
    {
      title: 'Custom Reel Editor',
      tagline: 'Turns raw footage into a finished reel, edited the way you like it.',
      image: { src: '/videos/naluri-reel-editor-poster.jpg', alt: 'The custom reel editor, showing fonts, captions and style controls' },
      bullets: [
        'Edits regular reels and short-form reels',
        'Pulls transcripts from talking videos',
        'Selects the best moments or the sections you choose from your transcript, then cleanly edits them into a shorter reel.',
        'Cuts pauses, stumbles and repeats, while keeping the video flowing naturally.',
        'Reframes the shot and adds video animation effects',
        'Adds animated text, captions timed to your voice, graphics, photo pop-ups and sound effects',
        'Review the reel and request edits before final rendering',
        'Reel cover design',
      ],
    },
    {
      title: 'Custom Carousel Editor',
      tagline: 'Turns your existing content, such as blogs and newsletters, into a complete branded carousel.',
      image: { src: '/videos/naluri-carousel-editor-poster.jpg', alt: 'The custom carousel editor, showing a branded slide and its editing controls' },
      bullets: [
        'Automatically lays out your content across slides, with editable text, images and design elements.',
        'Writes a matching caption',
        'Includes branded single-post and full-carousel templates.',
        'Edits text, colours, photos, layouts and graphics',
      ],
    },
  ],

  alsoIncludedHeading: 'Also Included',
  alsoIncluded: [
    'Comment keyword DM automation with a custom message, link and public reply — no ManyChat or separate DM automation subscription needed.',
    'Weekly content planned for approval, with talking points for talking reels',
    'Content writing and captions in your brand voice.',
    'Content scheduling.',
    'Custom GIFs for reels, powered by OpenAI. (optional, approx. $10 AUD/month in usage credits)',
  ],

  buildHeading: 'Build & Payment',
  build: [
    {
      label: 'Initial Strategy & Setup Call',
      value:
        'We’ll go through your brand, audience, content preferences, offers and goals, as well as your current content workflow and how you like to create content. We’ll also get the required account access, complete 2FA and connect the tools needed for your system.',
    },
    {
      label: 'Build Process',
      value:
        'The system will be developed in stages over approximately 6–8 weeks. We’ll work through each part progressively, allowing for Claude’s weekly usage limits.',
    },
    { label: 'Deposit', value: '50% to begin ($1,875)' },
    { label: 'Final payment', value: '50% on completion, before handover ($1,875)' },
    {
      label: 'System Setup & Handover',
      value:
        'System setup, testing, a final walkthrough of how to use your system, and handover so you can continue using it independently.',
    },
    {
      label: 'Support',
      value: '30 days after handover for bugs, technical issues and help getting started. New features aren’t included.',
    },
  ],

  care: {
    heading: 'Optional System Care',
    price: '$350 AUD/month',
    priceNote: 'after the included support',
    body:
      'Troubleshooting, minor refinements and technical help with your existing system, plus one monthly support call. New features and additional workflows are quoted separately. Content creation, posting and social media management aren’t included.',
  },

  goodToKnowHeading: 'Good to Know',
  goodToKnow: [
    'This isn’t a standalone app. It runs through custom skills in Claude Code.',
    'You’ll need a Claude Pro subscription with Claude Code (roughly A$30–35/month) and an Instagram professional account. Insights require connecting Instagram and aren’t live; they update when an analysis is run.',
    'DM automation needs extra setup, including web hosting, and may need Meta’s approval.',
    'Hosting, third-party subscriptions and usage fees are separate.',
  ],

  cta: { label: 'Book a free chat', href: '/naluri-socials-ai#book-a-chat' },
};

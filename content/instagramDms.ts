// Instagram comment-to-DM automation (replaces a ManyChat membership).
// When someone comments one of these keywords on a post or reel, they get a
// private DM with the link, and (optionally) a short public reply.
//
// DRAFT WORDING: Lena has not approved it yet. Do not push until she has.
// Setup and how it works: docs/instagram-dms.md

export type InstagramKeyword = {
  /** The word people comment. Matched on its own, any capitalisation. */
  keyword: string;
  /** The private DM they receive. One version is picked at random each time. */
  dms: string[];
};

const QUIZ = 'https://www.lenainthewild.com/intuition-blueprint';
const PRACTICE = 'https://www.lenainthewild.com/#free-practice';
const PRACTICE_NOTE = 'Pop in your name and email and the video is yours.';

export const instagramKeywords: InstagramKeyword[] = [
  {
    keyword: 'LEAP',
    dms: [
      `Hi! Here’s your free intuition quiz 💜 ${QUIZ}\n\nLena`,
      `Hey! Your free intuition quiz is here ✨ ${QUIZ}\n\nLena`,
      `Here you go! Your free intuition quiz 🦋 ${QUIZ}\n\nLena`,
    ],
  },
  {
    keyword: 'UNSTUCK',
    dms: [
      `Hi! Here’s your free mindfulness practice 💜 ${PRACTICE}\n\n${PRACTICE_NOTE}\n\nLena`,
      `Hey! Your free mindfulness practice is here ✨ ${PRACTICE}\n\n${PRACTICE_NOTE}\n\nLena`,
      `Here you go! Your free mindfulness practice 🦋 ${PRACTICE}\n\n${PRACTICE_NOTE}\n\nLena`,
    ],
  },
];

// Short public replies under their comment; one is picked at random each time.
// Use an empty list to turn the public reply off.
export const instagramPublicReplies: string[] = [
  'Sent! Check your DMs 💜',
  'Just sent it to your DMs ✨',
  'On its way to your DMs 🤍',
  'It’s in your DMs now 🦋',
];

/** Picks one of several versions at random, so the messages don't all look identical. */
export const pickOne = <T,>(options: T[]): T | undefined => options[Math.floor(Math.random() * options.length)];

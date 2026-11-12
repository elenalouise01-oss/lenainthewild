// Instagram comment-to-DM automation (replaces a ManyChat membership).
// When someone comments one of these keywords on a post or reel, they get a
// private DM with the link, and (optionally) a short public reply.
//
// DRAFT WORDING: Lena has not approved it yet. Do not push until she has.
// Setup and how it works: docs/instagram-dms.md

export type InstagramKeyword = {
  /** The word people comment. Matched on its own, any capitalisation. */
  keyword: string;
  /** The private DM they receive. */
  dm: string;
};

export const instagramKeywords: InstagramKeyword[] = [
  {
    keyword: 'LEAP',
    dm: 'Hi! Here’s your free intuition quiz 💜 https://www.lenainthewild.com/intuition-blueprint\n\nLena',
  },
  {
    keyword: 'UNSTUCK',
    dm: 'Hi! Here’s your free guided tapping practice 💜 https://www.lenainthewild.com/#free-practice\n\nPop in your name and email and the video is yours.\n\nLena',
  },
];

// A short public reply under their comment. Set to '' to turn it off.
export const instagramPublicReply = 'Sent! Check your DMs 💜';

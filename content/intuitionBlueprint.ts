import type { AuthorityKey } from '@/lib/intuition/bodygraph';

// Every word of The Intuition Blueprint (/intuition-blueprint) lives here,
// so the copy can be edited without touching the code.

export const intuitionBlueprint = {
  label: 'A free Lena in the Wild experience',
  title: 'The Intuition Blueprint',
  subheading: 'Discover your Human Design authority and explore how you’re designed to make decisions.',
  intro:
    'Ever wondered why some decisions feel like an immediate yes or no, while others leave you going around in circles? Your Human Design chart offers a framework for exploring how you make decisions and reconnecting with your inner guidance.',
  cta: 'Discover Your Authority',
  // The little tilted label on the photo
  sticker: 'How do you decide?',
  how: {
    label: 'How it works',
    steps: [
      { title: 'Your birth details', body: 'Your date, time and place of birth. That’s all I need.' },
      { title: 'Your chart, calculated', body: 'The positions of the Sun, Moon and planets at your birth, and about three months before it, mapped onto your Human Design chart.' },
      { title: 'Your authority', body: 'The part of your chart that describes how you’re designed to make decisions, with prompts and a practice to explore it.' },
    ],
  },
  note: 'Human Design isn’t science, and it doesn’t decide anything for you. Think of it as a lens: a different way of looking at how you make decisions, so you can get to know your own inner guidance again.',

  form: {
    label: 'Step 1 of 2',
    heading: 'When and where were you born?',
    dateLabel: 'Date of birth',
    timeLabel: 'Exact birth time',
    timeHelp:
      'The time matters. Some parts of your chart change within minutes, and your authority can change within a few hours. Your birth certificate is the best place to find it. If you only know roughly, use your best guess and treat the result as a starting point.',
    placeLabel: 'Birth town or city',
    placePlaceholder: 'Start typing, e.g. Sydney',
    placeHelp: 'Pick your town from the list. If it isn’t there, choose the nearest bigger town in the same time zone.',
    placeEmpty: 'No places found. Try a nearby bigger town, or add the country after a comma.',
    privacy: 'Your birth details are only used to calculate your chart. They aren’t saved.',
    submit: 'Calculate my authority',
    back: 'Back',
    calculating: 'Calculating your chart…',
    skippedTime:
      'The clocks jumped forward that night where you were born, so that exact time never showed on a clock there. Please double-check your birth time (your birth certificate is the best source).',
    ambiguousTime: 'The clocks went back an hour that night where you were born, so that time happened twice. Which one were you born in?',
    error: 'Something went wrong calculating your chart. Please try again in a moment.',
    attribution: 'Place names from GeoNames (CC BY 4.0).',
  },

  reveal: {
    label: 'Your authority',
    prefix: 'You have',
  },

  email: {
    label: 'Step 2 of 2',
    heading: 'Where should I send your Intuition Blueprint?',
    body: 'Your full guide, straight to your inbox: what your authority means, how it shows up in decisions, journal prompts and a simple practice to start trusting yourself again. Keep it, come back to it, try it on your next big decision.',
    nameLabel: 'First name (optional)',
    emailLabel: 'Email',
    consent: 'Yes, also send me emails from Lena in the Wild: new journal entries, practices and offers. I can unsubscribe at any time.',
    privacy:
      'I’ll only use your email to send your guide and, if you tick the box, Lena in the Wild emails. Your email, first name, authority and your choice about emails are saved securely so I can do that. Your birth details are never saved. Ask me to delete your details any time at nalurisocials@gmail.com.',
    submit: 'Send me my guide',
    sending: 'Sending…',
    skip: 'Not now, just show me my result',
    invalidEmail: 'Please enter a valid email address.',
    failed: 'Sorry, your guide didn’t send. Please try again, or read your result below.',
    sent: 'Done! Your Intuition Blueprint is on its way to {email}. If you can’t see it in a few minutes, check your promotions or spam folder.',
  },

  result: {
    meaningLabel: 'What it means',
    decisionsLabel: 'How it guides decisions',
    promptsLabel: 'Questions to sit with',
    promptsIntro: 'Grab a journal. There are no right answers, only what’s true for you.',
    exerciseLabel: 'Try this',
    calculatedLabel: 'What I calculated',
    typeLabel: 'Type',
    profileLabel: 'Profile',
    centersLabel: 'Defined centres',
    birthLabel: 'Born',
    beforeNineteenSeventy:
      'Time zone records from before 1970 are less complete in some places. If your birthplace used different clock rules back then, your result may differ.',
    save: 'Save or print this page',
    again: 'Calculate another chart',
    guideLink: 'Open your guide’s own page',
    emailMe: 'Email me this guide',
    noCenters: 'None (every centre is open)',
    reminder: 'Human Design is a tool for reflection, not a rulebook. Take what feels true and leave the rest.',
  },

  invitation: {
    label: 'Keep going',
    heading: 'Ready to hear yourself again?',
    body: 'Knowing your authority is one thing. Trusting it takes practice, and a little quiet. That’s what I’m here for.',
    links: [
      { label: 'Read: How to trust your intuition and stop abandoning yourself', href: '/journal/trust-your-intuition-stop-abandoning-yourself' },
      { label: 'Try The 5 Day Reconnect', href: '/5-day-reconnect' },
      { label: 'Read my story', href: '/my-story' },
    ],
  },

  // The guide pages (/intuition-blueprint/[authority]) for people coming back
  guidePage: {
    label: 'The Intuition Blueprint',
    notYours: 'Don’t know your authority yet?',
    calculate: 'Calculate yours',
  },
};

export type AuthorityContent = {
  slug: string;
  name: string;
  alsoCalled?: string;
  oneLine: string;
  meaning: string[];
  decisions: string[];
  prompts: string[];
  exercise: { title: string; steps: string[] };
};

// The internal authority keys from the chart map onto these seven guides.
// Ego authority has two forms; the guide notes which one the chart shows.
export const AUTHORITY_FOR: Record<AuthorityKey, keyof typeof authorities> = {
  emotional: 'emotional',
  sacral: 'sacral',
  splenic: 'splenic',
  'ego-manifested': 'ego',
  'ego-projected': 'ego',
  'self-projected': 'selfProjected',
  mental: 'mental',
  lunar: 'lunar',
};

export const EGO_VARIANTS: Record<'ego-manifested' | 'ego-projected', string> = {
  'ego-manifested':
    'Your chart shows Ego Manifested authority: your Heart centre connects straight to your Throat, so your truth tends to come out in what you say in the moment. Listen to the words that come out of your mouth before your mind tidies them up.',
  'ego-projected':
    'Your chart shows Ego Projected authority: your Heart centre connects to your G centre (your sense of self and direction). Your clarity comes from talking it out with someone you trust and hearing what you actually want.',
};

export const authorities: Record<'emotional' | 'sacral' | 'splenic' | 'ego' | 'selfProjected' | 'mental' | 'lunar', AuthorityContent> = {
  emotional: {
    slug: 'emotional',
    name: 'Emotional Authority',
    alsoCalled: 'Solar Plexus Authority',
    oneLine: 'There’s no truth in the moment. Your clarity comes with time.',
    meaning: [
      'In Human Design, Emotional Authority comes from a defined Solar Plexus, the centre linked to feelings, moods and desire. It’s the most common authority: around half of all charts have it.',
      'Your emotions move in a wave. Some days everything feels exciting and possible, other days the same thing feels heavy or wrong. Neither the high nor the low is the full truth. The truth is what stays steady once you’ve felt your way through both.',
    ],
    decisions: [
      'The traditional advice is simple, and not always easy: don’t decide in the heat of the moment. When something lands in front of you, notice the first rush of yes or no, then give it time. Sleep on it. Then sleep on it again.',
      'Clarity tends to arrive as a calm, settled feeling rather than a spike of excitement. For bigger decisions that might take days or weeks. You’re allowed to say “Let me get back to you”.',
    ],
    prompts: [
      'Think of a decision you made on a high or a low that you later regretted. What were you feeling at the time?',
      'What does “calm clarity” feel like in your body, compared with excitement or panic?',
      'Where in your life do you feel pressured to answer straight away? Who or what is creating that pressure?',
      'What decision are you holding right now? How has your feeling about it changed over the past week?',
    ],
    exercise: {
      title: 'Track your wave for seven days',
      steps: [
        'Pick one decision you’re currently sitting with.',
        'Each evening for a week, write down how you feel about it from 1 (a clear no) to 10 (a clear yes), plus one word for your overall mood that day.',
        'At the end of the week, read it back. Notice what stays the same underneath the ups and downs.',
        'That steady thread is the clarity worth trusting.',
      ],
    },
  },

  sacral: {
    slug: 'sacral',
    name: 'Sacral Authority',
    oneLine: 'Your gut knows, right now, before your mind catches up.',
    meaning: [
      'In Human Design, Sacral Authority comes from a defined Sacral centre: your life-force energy, the centre linked to work, vitality and what you have energy for. It belongs to Generators and Manifesting Generators.',
      'Your Sacral speaks in the moment, through your body rather than your thoughts. It often shows up as a sound or a pull: an “uh-huh” that moves you towards something, or an “uh-uh” that pulls you away.',
    ],
    decisions: [
      'Traditionally, your guidance comes from responding to what’s in front of you rather than trying to think your way to an answer. Something comes up, and your gut gives an instant yes or no.',
      'Your mind will happily jump in with “but you should” or “but what if”. The practice is noticing the first response and giving it a voice before the reasons and stories pile on.',
    ],
    prompts: [
      'When did your body say yes to something before you could explain why?',
      'What are you currently saying yes to that your gut quietly says no to?',
      'How does your energy feel at the end of a day spent on things you actually wanted to do, compared with things you felt you should do?',
      'Whose voice do you hear when you talk yourself out of a gut response?',
    ],
    exercise: {
      title: 'The yes/no question game',
      steps: [
        'Ask a friend to ask you simple yes/no questions, out loud, without warning: “Do you want toast?” “Do you want to go to the beach today?”',
        'Answer with a sound before words: “uh-huh” or “uh-uh”. Don’t think about it.',
        'Notice the feeling in your belly with each answer: expansion and pull, or contraction and heaviness.',
        'Once you know that feeling, start asking yourself yes/no questions about small everyday choices, and work up to bigger ones.',
      ],
    },
  },

  splenic: {
    slug: 'splenic',
    name: 'Splenic Authority',
    oneLine: 'A quiet, instant knowing. It speaks once, so listen the first time.',
    meaning: [
      'In Human Design, Splenic Authority comes from a defined Spleen, the oldest awareness centre, linked to intuition, instinct and what keeps you safe and well.',
      'Your intuition is spontaneous and quiet. It doesn’t shout and it doesn’t repeat itself. It might be a subtle hit, a feeling about a person or place, or a sense that you should (or shouldn’t) go somewhere, often with no logical reason attached.',
    ],
    decisions: [
      'Traditionally, your guidance lives in the moment. The instinct you feel right now is about right now. It doesn’t build or wait like emotional clarity does, so if you sit on it for too long, it can be gone.',
      'The practice is trusting that first quiet hit, especially when your mind wants a reason. Your mind can come up with the reasons later.',
    ],
    prompts: [
      'Think of a time your instinct was right and you didn’t listen. What did it feel like when the hit came?',
      'Where in your body do you notice those quiet nudges?',
      'What gets in the way of hearing them: noise, rushing, other people’s opinions?',
      'When have you followed a feeling about a person or place, and how did it turn out?',
    ],
    exercise: {
      title: 'The first-hit journal',
      steps: [
        'For one week, carry a note on your phone called “First hits”.',
        'Every time you get a quick instinct (take this road, call that friend, don’t eat that, leave now), write it down with the time.',
        'Write whether you followed it, then what happened.',
        'At the end of the week, read it back and notice how often that quiet voice knew.',
      ],
    },
  },

  ego: {
    slug: 'ego',
    name: 'Ego Authority',
    alsoCalled: 'Heart Authority',
    oneLine: 'Your truth lives in what you actually want and what you’re willing to commit to.',
    meaning: [
      'In Human Design, Ego Authority comes from a defined Heart (or Ego) centre, linked to willpower, self-worth and keeping your promises. It’s one of the rarer authorities.',
      '“Ego” here doesn’t mean arrogance. It means your will: what you genuinely want, and what you have the heart to give your energy to.',
    ],
    decisions: [
      'Traditionally, the question for you is “Do I really want this?” Is your heart in it? If you commit to something your heart isn’t in, your willpower runs dry and keeping your word becomes a struggle.',
      'Your clarity often comes through your own voice, in the words you say about what you want, more than through careful thinking.',
    ],
    prompts: [
      'What do I want, for me, without justifying it?',
      'Where have I said yes when my heart wasn’t in it? What did it cost me?',
      'Which promises in my life feel light to keep, and which feel heavy?',
      'Where am I proving my worth instead of following what I want?',
    ],
    exercise: {
      title: 'The “I want” voice note',
      steps: [
        'Choose a decision in front of you.',
        'Record a voice note starting every sentence with “I want…”. Keep going for two minutes without editing yourself.',
        'Play it back and listen for the sentences that sound alive, and the ones that sound like obligation.',
        'Ask yourself: what am I willing to commit to, fully?',
      ],
    },
  },

  selfProjected: {
    slug: 'self-projected',
    name: 'Self-Projected Authority',
    oneLine: 'You find your truth by hearing yourself say it out loud.',
    meaning: [
      'In Human Design, Self-Projected Authority comes from a defined G centre (linked to identity, direction and love) connected to the Throat. It’s found in Projectors.',
      'Your guidance isn’t a gut feeling or an emotional wave. It shows up in your own voice: as you talk something through, you hear what feels like you, and what doesn’t.',
    ],
    decisions: [
      'Traditionally, you find clarity by talking things out with people you trust, not to get their advice but to hear yourself. The other person is a sounding board.',
      'Listen for whether what you’re saying sounds like your direction and your identity. Does it feel true to who you are, and does it bring you joy?',
    ],
    prompts: [
      'Who are the people you can talk to without them trying to fix or advise you?',
      'When did you last surprise yourself by what you said out loud?',
      'Which choices in your life feel like “me”, and which feel like someone else’s idea of me?',
      'What direction do you keep talking about but haven’t taken yet?',
    ],
    exercise: {
      title: 'Talk it out, then listen back',
      steps: [
        'Pick a decision and ask someone you trust to just listen for ten minutes. No advice, no opinions.',
        'Talk it through out loud. If no one’s around, record yourself talking instead.',
        'Afterwards, write down the sentences that felt true as you said them.',
        'Notice the difference between what you think you should do and what you heard yourself say.',
      ],
    },
  },

  mental: {
    slug: 'mental',
    name: 'Mental Authority',
    alsoCalled: 'Environmental or Outer Authority, sometimes described as no inner authority',
    oneLine: 'Your clarity comes from the right people, the right places, and time.',
    meaning: [
      'In Human Design, Mental Authority describes a Projector chart with no defined centres below the Throat, so the definition sits in the Head, Ajna and Throat. Because none of the inner authorities apply, it’s sometimes called “no inner authority”.',
      'That doesn’t mean your mind should make your decisions. Your mind is brilliant at gathering perspectives, but it can argue both sides forever. Your clarity comes from outside your head: from people you trust and environments that feel good.',
    ],
    decisions: [
      'Traditionally, the practice is to talk through your decisions with a few trusted sounding boards, and to notice how you feel in different places. You’re hearing yourself, not taking their advice.',
      'Give yourself time, and notice which environments help you think clearly. Sometimes the answer is to change where you are, then decide.',
    ],
    prompts: [
      'Which people help you think clearly, and which leave you more confused?',
      'Where do you feel most like yourself: by the ocean, in a café, at home, in nature?',
      'What decision have you been going around in circles on? Have you said it out loud to anyone?',
      'When has a change of environment changed your mind?',
    ],
    exercise: {
      title: 'Three places, three conversations',
      steps: [
        'Choose a decision you’re weighing up.',
        'Talk it through with three different people you trust, ideally in three different places.',
        'After each conversation, write a few lines about what you heard yourself say and how the place felt.',
        'Read them together. Notice what kept coming up in your own words.',
      ],
    },
  },

  lunar: {
    slug: 'lunar',
    name: 'Lunar Authority',
    oneLine: 'Big decisions deserve a full moon cycle.',
    meaning: [
      'In Human Design, Lunar Authority belongs to Reflectors, the rarest type (around 1% of people), whose charts have no defined centres at all.',
      'You’re deeply open to the people and places around you, sampling and reflecting back the energy of your environment. That makes you incredibly wise about others, and means your own clarity takes time to settle.',
    ],
    decisions: [
      'Traditionally, the advice is to take around a full lunar cycle, about 28 days, before making a big decision. The Moon moves through every part of your chart in that time, so you get to experience the decision from every angle.',
      'Talk it through with trusted people along the way, and notice where you are when you feel most clear. Your environment matters a lot.',
    ],
    prompts: [
      'Which places and people feel good for you to be around?',
      'When have you felt rushed into a big decision? What happened?',
      'How do you know when you’re feeling your own feelings versus someone else’s?',
      'What would change if you gave yourself a full month for your next big decision?',
    ],
    exercise: {
      title: 'A 28-day decision diary',
      steps: [
        'Choose one big decision and give yourself a full moon cycle (about 28 days) before committing.',
        'Every few days, jot down how you feel about it, where you were and who you’d been with.',
        'Talk it through with two or three trusted people over the month.',
        'At the end, read it all back. Notice what stayed consistent across different days, places and people.',
      ],
    },
  },
};

export function authorityBySlug(slug: string): AuthorityContent | undefined {
  return Object.values(authorities).find((a) => a.slug === slug);
}

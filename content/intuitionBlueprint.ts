import type { AuthorityKey } from '@/lib/intuition/bodygraph';

// Every word of The Intuition Blueprint (/intuition-blueprint) lives here,
// so the copy can be edited without touching the code. Kept short on
// purpose: it's a lead magnet, not an essay.

export const intuitionBlueprint = {
  label: 'Free Intuition Quiz',
  title: 'The Intuition Blueprint',
  subheading: 'Use your Human Design to find out how you’re designed to make decisions, so you can stop overthinking and start trusting yourself.',
  intro: 'Free, takes 1 minute, and all you need is your birth date, time and place.',
  cta: 'Find out how I make decisions',
  // Handwritten caption on the polaroid, and the spinning badge beside it
  polaroidCaption: 'trust the first yes',
  badge: 'free · human design · free · human design · ',
  // The lilac tape that scrolls across under the opening
  tape: 'Stop overthinking · Hear yourself again · Trust your own yes',
  // Handwritten note beside the button
  scribble: 'takes 1 minute!',
  // The explainer for anyone new to Human Design
  explainer: {
    what: {
      label: 'What is Human Design?',
      body: [
        'Human Design is a self-discovery tool. It uses your birth date, time and place to create a chart of how you’re wired, drawing on astrology, the I Ching, the Kabbalah and the chakras.',
        'Your chart shows how your energy works, where you soak up other people’s energy, and how you’re designed to make decisions.',
      ],
    },
    // Lena's Human Design overview image, in the "What's an authority?" section
    overview: {
      src: '/images/intuition/human-design-overview.webp',
      alt: 'Human Design overview: a meditating silhouette with the nine bodygraph centres glowing over it, and the four main parts of a chart: your Type (your natural energy), your Strategy (how to work with your energy), your Authority (your inner decision-making guidance) and your Profile (the lens through which you experience life).',
      // The middle part gets the lilac tape
      focusStart: 'Your Human Design is made up of all four of these: your Type, Strategy, Authority and Profile.',
      focusTape: 'This quiz focuses on your Authority: how you’re designed to make decisions.',
    },
    authority: {
      label: 'What’s an “authority”?',
      body: 'It’s Human Design’s word for your inner compass: the part of you that knows what’s right for you. For some people it’s a gut feeling. For others it’s a quiet instinct, emotions settling over time, or hearing themselves talk it through.',
    },
    why: {
      label: 'Why find yours?',
      body: 'Most of us were taught to decide with our heads: weigh it up, ask everyone else, do what we “should”. If you feel stuck, overthink everything or have lost touch with what you actually want, knowing how you’re designed to decide is a simple place to start trusting yourself again.',
    },
    disclaimer: 'Human Design isn’t science. Use it as a tool for self-reflection.',
    // The little example chart beside "What is Human Design?"
    diagram: {
      caption: 'This is what a Human Design chart looks like. It’s called a bodygraph: the nine shapes are your energy centres, and the lines are the channels that connect them.',
      // The nine centres, labelled on the chart (top to bottom)
      centres: {
        head: { name: 'Head', meaning: 'inspiration' },
        ajna: { name: 'Ajna', meaning: 'thinking' },
        throat: { name: 'Throat', meaning: 'communication' },
        g: { name: 'G centre', meaning: 'identity and direction' },
        heart: { name: 'Heart', meaning: 'willpower, self-worth' },
        solarPlexus: { name: 'Solar Plexus', meaning: 'emotions' },
        spleen: { name: 'Spleen', meaning: 'instinct, intuition' },
        sacral: { name: 'Sacral', meaning: 'life force, gut response' },
        root: { name: 'Root', meaning: 'pressure and drive' },
      },
      defined: 'coloured in = defined',
      open: 'white = open',
    },
  },

  form: {
    label: 'Step 1 of 2',
    heading: 'When and where were you born?',
    // The form reads as one sentence: "I was born on … at … in …"
    sentence: { start: 'I was born on', at: 'at', in: 'in' },
    timeNote: 'the exact time matters! check your birth certificate',
    dateLabel: 'Date of birth',
    timeLabel: 'Exact birth time',
    timeHelp: 'Don’t know the exact time? Use your best guess.',
    placeLabel: 'Birth town or city',
    placePlaceholder: 'Start typing, e.g. Sydney',
    placeHelp: 'Can’t find your town? Pick the nearest bigger one.',
    placeEmpty: 'Nothing found. Try a nearby bigger town.',
    privacy: 'Your birth details aren’t saved.',
    submit: 'Calculate my authority',
    back: 'Back',
    calculating: 'Calculating…',
    skippedTime: 'The clocks jumped forward that night, so that time didn’t exist there. Please double-check your birth time.',
    ambiguousTime: 'The clocks went back that night, so that time happened twice. Which one were you?',
    error: 'Something went wrong. Please try again.',
    attribution: 'Place names from GeoNames (CC BY 4.0).',
  },

  reveal: {
    label: 'Your authority',
    prefix: 'You have',
    scribble: 'ooh, you have…',
    chartCaption: 'your chart',
  },

  email: {
    label: 'Step 2 of 2',
    heading: 'Where should I send your results?',
    scribble: 'nearly there!',
    body: 'Pop in your name and email to see your full results: what it means, how to use it, journal prompts and a simple practice.',
    // Added when the guide emails are set up
    bodyEmailCopy: 'I’ll email you a copy too.',
    nameLabel: 'First name',
    nameError: 'Please add your first name.',
    emailLabel: 'Email',
    consent: 'By ticking this box, you agree to receive emails from Lena in the Wild, including your results, tips, updates and offers. You can unsubscribe at any time.',
    consentError: 'Please tick the box to get your results.',
    privacy: 'I only save your email, name and result. Never your birth details. Want them deleted? Email nalurisocials@gmail.com.',
    submit: 'Show me my results',
    sending: 'Sending…',
    invalidEmail: 'Please enter a valid email.',
    failed: 'Your guide didn’t send. Please try again later. Here’s your result.',
    sent: 'Sent to {email}! Check your promotions folder if you can’t see it.',
  },

  result: {
    meaningLabel: 'What it means',
    whereLabel: 'Where you feel it',
    decisionsLabel: 'How to use it',
    promptsLabel: 'Ask yourself',
    promptsIntro: 'Grab a journal.',
    exerciseLabel: 'Try this',
    calculatedLabel: 'Your chart details',
    typeLabel: 'Type',
    profileLabel: 'Profile',
    centersLabel: 'Defined centres',
    birthLabel: 'Born',
    beforeNineteenSeventy: 'Born before 1970? Old time zone records can be patchy, so double-check if it doesn’t feel right.',
    save: 'Save or print',
    again: 'Try another chart',
    guideLink: 'Your guide’s page',
    noCenters: 'None (all open)',
    reminder: 'Take what feels true. Leave the rest.',
  },

  invitation: {
    label: 'Keep going',
    offer: {
      title: 'The 5 Day Reconnect',
      body: 'Five short audio practices to get out of your head and hear yourself again.',
      cta: 'Have a look',
      href: '/5-day-reconnect',
      image: '/images/cover-reconnect-monkey.webp',
      scribble: 'start here',
    },
    heading: 'Ready to trust yourself again?',
    body: 'Knowing your authority is step one. Hearing it takes a little quiet.',
    links: [
      { label: 'Read: How to trust your intuition', href: '/journal/trust-your-intuition-stop-abandoning-yourself' },
      { label: 'Read my story', href: '/my-story' },
    ],
  },

  // The end of the results email: one main button, two small links
  emailEnd: {
    label: 'Your next step',
    body: 'Ready to start hearing yourself again? The 5 Day Reconnect is five short audio practices to get out of your head and back into your body.',
    cta: 'Start the 5 Day Reconnect',
    href: '/5-day-reconnect',
    resultsLink: 'See your results again',
    siteLink: 'Visit lenainthewild.com',
  },

  // Lena's book recommendation, at the end of every result
  book: {
    label: 'Want to go deeper?',
    line: 'If you want to explore the rest of your Human Design, I’d recommend',
    title: 'Human Design',
    author: 'Jenna Zoe',
    href: 'https://www.penguinrandomhouse.com/books/717075/human-design-by-jenna-zoe',
  },

  // The guide pages (/intuition-blueprint/[authority]) for people coming back
  guidePage: {
    label: 'The Intuition Blueprint',
    notYours: 'Don’t know yours yet?',
    calculate: 'Find out here',
  },
};

export type AuthorityContent = {
  slug: string;
  name: string;
  alsoCalled?: string;
  oneLine: string;
  // Where in the body it is, for people who want to know where to listen
  where: string;
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
  'ego-manifested': 'Yours is Ego Manifested: your truth comes out in what you say. Listen to your words before your mind edits them.',
  'ego-projected': 'Yours is Ego Projected: talk it out with someone you trust, and listen for what you actually want.',
};

export const authorities: Record<'emotional' | 'sacral' | 'splenic' | 'ego' | 'selfProjected' | 'mental' | 'lunar', AuthorityContent> = {
  emotional: {
    slug: 'emotional',
    name: 'Emotional Authority',
    alsoCalled: 'Solar Plexus Authority',
    oneLine: 'No decisions in the heat of the moment. Your clarity comes with time.',
    where: 'Your Solar Plexus, around your stomach (the solar plexus chakra).',
    meaning: ['Your emotions move in waves: high one day, low the next. Neither is the full truth. What stays steady through both is. (About half of all people have this.)'],
    decisions: ['Feel the first rush, then wait.', 'Sleep on it. Then sleep on it again.', 'Clarity feels calm, not hyped. “Let me get back to you” is a full sentence.'],
    prompts: ['What have I said yes to on a high, then regretted?', 'What does calm clarity feel like in my body?', 'Who pressures me to answer straight away?'],
    exercise: {
      title: 'The 24-hour rule',
      steps: ['Next time someone asks you for something (a plan, a favour, a yes), say: “Let me get back to you.”', 'Sleep on it.', 'Check in tomorrow. Still a yes? Then it’s a yes.'],
    },
  },

  sacral: {
    slug: 'sacral',
    name: 'Sacral Authority',
    oneLine: 'Your gut knows, right now, before your mind catches up.',
    where: 'Your Sacral centre, in your lower belly just below your belly button (the sacral chakra).',
    meaning: ['Your answer is an instant body response: a pull towards (“uh-huh”) or a pull away (“uh-uh”). It speaks before you think.'],
    decisions: ['Respond to what’s in front of you, don’t think your way there.', 'Notice your first gut yes or no.', 'Act on it before your mind piles on the “shoulds”.'],
    prompts: ['When did my body say yes before I could explain why?', 'What am I saying yes to that my gut says no to?', 'Whose voice talks me out of my gut?'],
    exercise: {
      title: 'Ask your gut a yes/no question',
      steps: ['Next small choice (what to eat, whether to go out), ask yourself: “Do I want this? Yes or no?”', 'Notice your body’s first reaction: a pull towards it, or a pull away.', 'Go with it, before your head jumps in.'],
    },
  },

  splenic: {
    slug: 'splenic',
    name: 'Splenic Authority',
    oneLine: 'A quiet, instant knowing. It speaks once, so listen the first time.',
    where: 'Your Spleen centre, on the left side of your body: your body’s instinct for what’s safe and good for you.',
    meaning: ['Your intuition is a quiet hit in the moment: a feeling about a person, a place, a choice. No logic attached, and it won’t repeat itself.'],
    decisions: ['Trust the first quiet hit.', 'Don’t wait for a reason. It might never come.', 'Slow down enough to hear it.'],
    prompts: ['When was my instinct right, and I ignored it?', 'Where do I feel those quiet nudges in my body?', 'What drowns them out?'],
    exercise: {
      title: 'Follow one hunch today',
      steps: ['Today, notice one quiet hunch: take a different way home, message someone, skip something.', 'Follow it, even if you can’t explain why.', 'See what happens.'],
    },
  },

  ego: {
    slug: 'ego',
    name: 'Ego Authority',
    alsoCalled: 'Heart Authority',
    oneLine: 'If your heart’s not in it, it’s a no.',
    where: 'Your Heart centre, in your chest around your heart.',
    meaning: ['Your answer comes from your will: what you genuinely want and are willing to commit to. Not arrogance. Heart.'],
    decisions: ['Ask: do I really want this?', 'Only commit when your heart’s in it.', 'Listen to what you say you want, out loud.'],
    prompts: ['What do I want, without justifying it?', 'Where have I said yes when my heart wasn’t in it?', 'Where am I still trying to prove myself?'],
    exercise: {
      title: 'The “do I want this?” check',
      steps: ['Before you say yes to anything today, ask: “Do I actually want this?”', 'If your heart’s not in it, say no (or “not right now”).', 'Notice how much lighter you feel.'],
    },
  },

  selfProjected: {
    slug: 'self-projected',
    name: 'Self-Projected Authority',
    oneLine: 'You find your truth by hearing yourself say it out loud.',
    where: 'Your G centre, in the middle of your chest (the heart chakra area): your sense of who you are.',
    meaning: ['Your clarity comes through your voice. As you talk things through, you hear what feels like you and what doesn’t.'],
    decisions: ['Talk it out with someone you trust.', 'You’re not after their advice. You’re listening to yourself.', 'Ask: does this sound like me?'],
    prompts: ['Who can I talk to without them trying to fix me?', 'When did I surprise myself with what I said?', 'Which choices feel like me, and which feel like someone else’s idea of me?'],
    exercise: {
      title: 'Say it out loud',
      steps: ['Pick something you’re deciding.', 'Record a one-minute voice note talking it through.', 'Play it back. What sounded most like you?'],
    },
  },

  mental: {
    slug: 'mental',
    name: 'Mental Authority',
    alsoCalled: 'Environmental Authority',
    oneLine: 'Your clarity comes from the right people, the right places, and time.',
    where: 'Your head: your mind (around the third eye) and your voice.',
    meaning: ['There’s no single place in your body that holds your answer. Your mind is great at gathering perspectives, but it shouldn’t be the boss.'],
    decisions: ['Talk it out with a few trusted people.', 'Notice how different places make you feel.', 'Take your time. Change where you are, then decide.'],
    prompts: ['Who helps me think clearly, and who leaves me confused?', 'Where do I feel most like myself?', 'What have I been going around in circles on?'],
    exercise: {
      title: 'Change the scene',
      steps: ['Take a decision you keep going around in circles on somewhere new: a walk, a café, the beach.', 'Say it out loud to someone you trust (or to yourself).', 'Notice what you hear yourself say.'],
    },
  },

  lunar: {
    slug: 'lunar',
    name: 'Lunar Authority',
    oneLine: 'Big decisions deserve a full moon cycle.',
    where: 'Nowhere fixed. All your centres are open, so it’s about your surroundings, like the moon’s cycle.',
    meaning: ['You’re deeply open to the people and places around you, so your clarity takes time to settle. It’s the rarest authority (about 1% of people).'],
    decisions: ['Give big decisions about 28 days.', 'Talk it through along the way.', 'Notice where you feel most clear. Your environment matters.'],
    prompts: ['Which places and people feel good to be around?', 'When was I rushed into a big decision?', 'Am I feeling my own feelings, or someone else’s?'],
    exercise: {
      title: 'Give it a month',
      steps: ['Write the decision in your phone notes with today’s date.', 'Once a week, add one line: how does it feel now?', 'Decide after about a month.'],
    },
  },
};

// Where each authority lives in the chart, for the handwritten note on the drawing
export const AUTHORITY_CENTER: Record<AuthorityKey, { center: 'head' | 'ajna' | 'throat' | 'g' | 'heart' | 'sacral' | 'solarPlexus' | 'spleen' | 'root' | null; note: string }> = {
  emotional: { center: 'solarPlexus', note: 'your emotions' },
  sacral: { center: 'sacral', note: 'your gut' },
  splenic: { center: 'spleen', note: 'your instinct' },
  'ego-manifested': { center: 'heart', note: 'your heart' },
  'ego-projected': { center: 'heart', note: 'your heart' },
  'self-projected': { center: 'g', note: 'your sense of self' },
  mental: { center: 'ajna', note: 'your mind: a sounding board' },
  lunar: { center: null, note: 'all open, like the moon' },
};

// "How you'll know you're on track": each Type's feeling of alignment, and
// the feeling that says something's off (Human Design's "not-self" theme)
export const TYPE_SIGNALS: Record<'Generator' | 'Manifesting Generator' | 'Projector' | 'Manifestor' | 'Reflector', { signature: string; notSelf: string; body: string }> = {
  Generator: { signature: 'Satisfaction', notSelf: 'Frustration', body: 'Satisfaction is that settled, full feeling after doing something your gut said yes to. Frustration means you said yes to something it didn’t want.' },
  'Manifesting Generator': { signature: 'Satisfaction', notSelf: 'Frustration or anger', body: 'Satisfaction (and a sense of peace) means you followed your gut. Frustration or anger means you skipped it and pushed ahead anyway.' },
  Projector: { signature: 'Success', notSelf: 'Bitterness', body: 'Success feels like being seen, valued and invited in. Bitterness means you’re giving your energy where it isn’t valued.' },
  Manifestor: { signature: 'Peace', notSelf: 'Anger', body: 'Peace feels like moving freely on your own impulses. Anger means you feel controlled, or you acted without letting people know.' },
  Reflector: { signature: 'Surprise', notSelf: 'Disappointment', body: 'Surprise is that delight when life feels fresh and right. Disappointment means your environment isn’t right for you.' },
};

// "What can drown out your inner voice": open centres take in other people's
// energy. Each has a classic question to catch the pattern.
export const OPEN_CENTRES: Record<string, { name: string; question: string }> = {
  head: { name: 'Head', question: 'Am I stuck thinking about things that don’t matter to me?' },
  ajna: { name: 'Mind', question: 'Am I pretending to be certain?' },
  throat: { name: 'Throat', question: 'Am I talking just to be seen or fill the silence?' },
  g: { name: 'Identity', question: 'Am I looking to others for love and direction?' },
  heart: { name: 'Heart', question: 'Am I still trying to prove myself?' },
  solarPlexus: { name: 'Emotions', question: 'Am I avoiding the truth to keep the peace?' },
  sacral: { name: 'Energy', question: 'Do I know when enough is enough?' },
  spleen: { name: 'Instinct', question: 'Am I holding on to what isn’t good for me?' },
  root: { name: 'Pressure', question: 'Am I rushing just to make the pressure stop?' },
};

export const extras = {
  signalsLabel: 'How you’ll know',
  signalsIntro: 'After a decision, check in with how you feel.',
  signatureLabel: 'On track',
  notSelfLabel: 'Off track',
  openLabel: 'What drowns out your inner voice',
  openIntro: 'Your open (white) centres are where you soak up other people’s energy. Catch yourself with these:',
  noOpen: 'All your centres are defined. Your work is staying true to yourself when others want otherwise.',
};

export function authorityBySlug(slug: string): AuthorityContent | undefined {
  return Object.values(authorities).find((a) => a.slug === slug);
}

import { authorities } from '@/content/intuitionBlueprint';
import { sortedJournal } from '@/content/journal';
import { fiveDayReconnectPage, freedomFrequencyPage, hero } from '@/content/site';
import { SITE_NAME, absoluteUrl } from '@/lib/seo';

// /llms.txt: a plain-text guide to the site for AI assistants (ChatGPT,
// Perplexity, Claude and the like), so they describe Lena and her offers
// accurately and link to the right pages. Built from the site's own copy.
export const dynamic = 'force-static';

export function GET() {
  const articles = sortedJournal()
    .map((a) => `- [${a.title}](${absoluteUrl(`/journal/${a.slug}`)}): ${a.description}`)
    .join('\n');

  const guides = Object.values(authorities)
    .map((a) => `- [${a.name}](${absoluteUrl(`/intuition-blueprint/${a.slug}`)}): ${a.oneLine}`)
    .join('\n');

  const body = `# ${SITE_NAME}

> ${hero.sub} ${SITE_NAME} is Lena's space for anyone who has built the life they thought they wanted but still feels stuck, unfulfilled or unsure what they really want. At 36, Lena uprooted her life from Sydney to Bali and started again from scratch; she now shares the tools, lessons and inner work that helped her reconnect with herself.

Lena is a Reiki Master and certified embodiment coach, and a former personal trainer. Topics: feeling stuck in life, starting over, reinventing your life in your 30s, self-trust and intuition, people-pleasing, emotional triggers, old patterns, burnout and slowing down.

## Pages

- [Home](${absoluteUrl('/')}): who Lena is, her offers and a free guided tapping practice
- [My Story](${absoluteUrl('/my-story')}): uprooting her life to Bali at 36 and what starting over really looked like
- [Who I Help](${absoluteUrl('/life-design')}): for anyone feeling stuck or unsure what they want from life
- [Journal](${absoluteUrl('/journal')}): personal essays
- [Photography](${absoluteUrl('/photography')}): The Wild Soul, an immersive portrait photography experience by Naluri Photography, for the woman who has reclaimed her power and is ready to be seen

## Offers

- [${fiveDayReconnectPage.title}](${absoluteUrl('/5-day-reconnect')}): ${fiveDayReconnectPage.subtitle} Self-paced audio journey, $33 AUD.
- [${freedomFrequencyPage.title}](${absoluteUrl('/freedom-frequency')}): an embodied, self-paced six-week online course to understand what's keeping you stuck and create a life that feels like yours. Coming soon; the waitlist is open and free to join.

## Free: The Intuition Blueprint

- [The Intuition Blueprint](${absoluteUrl('/intuition-blueprint')}): a free tool that calculates your Human Design chart from your birth date, time and place and shows your Inner Authority (how you're designed to make decisions), with journal prompts and a practice. Human Design is offered as a tool for reflection, not science.

Guides to each authority:

${guides}

## Journal

${articles}
`;

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}

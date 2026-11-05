import { AUTHORITY_FOR, authorities } from '@/content/intuitionBlueprint';
import { CENTERS, type AuthorityKey, type Center, type HdType } from './bodygraph';

// A link back to someone's own result, used in their email. It carries only
// what's needed to redraw their chart (which centres are defined, which
// channels join them, their Type and authority): never their birth details.

const TYPES: Record<string, HdType> = {
  generator: 'Generator',
  mg: 'Manifesting Generator',
  projector: 'Projector',
  manifestor: 'Manifestor',
  reflector: 'Reflector',
};
const TYPE_CODE = Object.fromEntries(Object.entries(TYPES).map(([k, v]) => [v, k])) as Record<HdType, string>;
const AUTHORITY_KEYS = Object.keys(AUTHORITY_FOR) as AuthorityKey[];

export type SharedChart = { authority: AuthorityKey; type: HdType; centers: Center[]; links: [Center, Center][] };

export function chartPath(chart: SharedChart): string {
  const slug = authorities[AUTHORITY_FOR[chart.authority]].slug;
  const q = new URLSearchParams({
    a: chart.authority,
    t: TYPE_CODE[chart.type],
    c: chart.centers.join('.'),
    l: chart.links.map(([x, y]) => `${x}-${y}`).join('.'),
  });
  return `/intuition-blueprint/${slug}?${q.toString()}`;
}

// Reads the link back, ignoring anything that isn't a real centre, Type or
// authority. Returns null unless the authority matches the page's guide.
export function readChart(params: Record<string, string | string[] | undefined>, pageSlug: string): SharedChart | null {
  const one = (k: string) => (Array.isArray(params[k]) ? params[k]![0] : params[k]) ?? '';
  const authority = one('a') as AuthorityKey;
  const type = TYPES[one('t')];
  if (!AUTHORITY_KEYS.includes(authority) || !type) return null;
  if (authorities[AUTHORITY_FOR[authority]].slug !== pageSlug) return null;
  const isCenter = (x: string): x is Center => (CENTERS as string[]).includes(x);
  const centers = one('c').split('.').filter(isCenter);
  const links = one('l')
    .split('.')
    .map((pair) => pair.split('-'))
    .filter((p): p is [Center, Center] => p.length === 2 && isCenter(p[0]) && isCenter(p[1]));
  return { authority, type, centers, links };
}

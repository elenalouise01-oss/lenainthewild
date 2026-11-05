import type { CenterId } from './BodygraphArt';

// The nine centres, top of the body to bottom
export const CENTER_ORDER: CenterId[] = ['head', 'ajna', 'throat', 'g', 'heart', 'solarPlexus', 'sacral', 'spleen', 'root'];

// Open centres, most relevant to Lena's audience first (proving yourself,
// people-pleasing, identity, burnout, hustle...). Only the first few are shown.
export const OPEN_PRIORITY: CenterId[] = ['heart', 'solarPlexus', 'g', 'sacral', 'root', 'spleen', 'ajna', 'head', 'throat'];
export const MAX_OPEN_SHOWN = 3;

export function openCentresToShow(defined: CenterId[]): CenterId[] {
  return OPEN_PRIORITY.filter((c) => !defined.includes(c)).slice(0, MAX_OPEN_SHOWN);
}

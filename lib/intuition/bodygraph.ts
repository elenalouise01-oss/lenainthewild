import { BODIES, type Body } from './ephemeris';

// The Human Design bodygraph: the fixed mapping of the 64 gates onto the
// zodiac wheel, the 9 centres and the 36 channels, and the standard rules
// that turn planetary positions into defined centres, Type and Authority.
// Tables cross-checked against two independent open-source implementations.

export type Center = 'head' | 'ajna' | 'throat' | 'g' | 'heart' | 'sacral' | 'solarPlexus' | 'spleen' | 'root';

export const CENTERS: Center[] = ['head', 'ajna', 'throat', 'g', 'heart', 'sacral', 'solarPlexus', 'spleen', 'root'];

export const CENTER_NAMES: Record<Center, string> = {
  head: 'Head',
  ajna: 'Ajna',
  throat: 'Throat',
  g: 'G (Identity)',
  heart: 'Heart (Ego)',
  sacral: 'Sacral',
  solarPlexus: 'Solar Plexus',
  spleen: 'Spleen',
  root: 'Root',
};

// The gates in zodiac order. Gate 41 begins at 2° Aquarius (302° of
// tropical longitude); each gate spans 5.625° and each line 0.9375°.
const WHEEL = [
  41, 19, 13, 49, 30, 55, 37, 63, 22, 36, 25, 17, 21, 51, 42, 3, 27, 24, 2, 23, 8, 20, 16, 35, 45, 12, 15, 52, 39, 53, 62, 56,
  31, 33, 7, 4, 29, 59, 40, 64, 47, 6, 46, 18, 48, 57, 32, 50, 28, 44, 1, 43, 14, 34, 9, 5, 26, 11, 10, 58, 38, 54, 61, 60,
];
const WHEEL_START = 302;
const GATE_WIDTH = 360 / 64;

export type Activation = { body: Body; longitude: number; gate: number; line: number };

export function gateAndLine(longitude: number): { gate: number; line: number } {
  const offset = (((longitude - WHEEL_START) % 360) + 360) % 360;
  const index = Math.floor(offset / GATE_WIDTH);
  const line = Math.floor(((offset - index * GATE_WIDTH) / GATE_WIDTH) * 6) + 1;
  return { gate: WHEEL[index], line: Math.min(line, 6) };
}

const GATES_BY_CENTER: Record<Center, number[]> = {
  head: [64, 61, 63],
  ajna: [47, 24, 4, 17, 43, 11],
  throat: [62, 23, 56, 35, 12, 45, 33, 8, 31, 20, 16],
  g: [7, 1, 13, 25, 46, 2, 15, 10],
  heart: [21, 40, 26, 51],
  sacral: [34, 5, 14, 29, 59, 9, 3, 42, 27],
  solarPlexus: [36, 22, 37, 6, 49, 55, 30],
  spleen: [48, 57, 44, 50, 32, 28, 18],
  root: [53, 60, 52, 19, 39, 41, 58, 38, 54],
};

export const GATE_CENTER: Record<number, Center> = Object.fromEntries(
  (Object.entries(GATES_BY_CENTER) as [Center, number[]][]).flatMap(([center, gates]) => gates.map((g) => [g, center])),
);

export const CHANNELS: [number, number][] = [
  [1, 8], [2, 14], [3, 60], [4, 63], [5, 15], [6, 59], [7, 31], [9, 52], [10, 20], [10, 34], [10, 57], [11, 56],
  [12, 22], [13, 33], [16, 48], [17, 62], [18, 58], [19, 49], [20, 34], [20, 57], [21, 45], [23, 43], [24, 61], [25, 51],
  [26, 44], [27, 50], [28, 38], [29, 46], [30, 41], [32, 54], [34, 57], [35, 36], [37, 40], [39, 55], [42, 53], [47, 64],
];

const MOTORS: Center[] = ['sacral', 'heart', 'solarPlexus', 'root'];

export type HdType = 'Manifestor' | 'Generator' | 'Manifesting Generator' | 'Projector' | 'Reflector';

// The authority as the chart defines it. Ego authority comes in two forms:
// "manifested" (the Heart connects straight to the Throat, in Manifestors)
// and "projected" (the Heart connects to the G centre, in Projectors).
export type AuthorityKey =
  | 'emotional'
  | 'sacral'
  | 'splenic'
  | 'ego-manifested'
  | 'ego-projected'
  | 'self-projected'
  | 'mental'
  | 'lunar';

export type Bodygraph = {
  personality: Activation[];
  design: Activation[];
  definedChannels: [number, number][];
  definedCenters: Center[];
  type: HdType;
  authority: AuthorityKey;
  profile: string;
};

export function activations(longitudes: Record<Body, number>): Activation[] {
  return BODIES.map((body) => ({ body, longitude: longitudes[body], ...gateAndLine(longitudes[body]) }));
}

// Can `from` reach `to` through defined channels?
function connected(from: Center, to: Center, channels: [number, number][]): boolean {
  const seen = new Set<Center>([from]);
  const queue: Center[] = [from];
  while (queue.length) {
    const here = queue.shift()!;
    if (here === to) return true;
    for (const [a, b] of channels) {
      const ca = GATE_CENTER[a];
      const cb = GATE_CENTER[b];
      const next = ca === here ? cb : cb === here ? ca : null;
      if (next && !seen.has(next)) {
        seen.add(next);
        queue.push(next);
      }
    }
  }
  return false;
}

function directlyConnected(x: Center, y: Center, channels: [number, number][]): boolean {
  return channels.some(([a, b]) => {
    const ca = GATE_CENTER[a];
    const cb = GATE_CENTER[b];
    return (ca === x && cb === y) || (ca === y && cb === x);
  });
}

export function determineType(defined: Set<Center>, channels: [number, number][]): HdType {
  if (defined.size === 0) return 'Reflector';
  const motorToThroat = defined.has('throat') && MOTORS.some((m) => defined.has(m) && connected(m, 'throat', channels));
  if (defined.has('sacral')) return motorToThroat ? 'Manifesting Generator' : 'Generator';
  return motorToThroat ? 'Manifestor' : 'Projector';
}

// The standard hierarchy: Solar Plexus, then Sacral, Spleen, Heart, G.
// With none of those defined there is no inner authority: Mental (also called
// Environmental or Outer) authority for Projectors, Lunar for Reflectors.
export function determineAuthority(defined: Set<Center>, channels: [number, number][]): AuthorityKey {
  if (defined.size === 0) return 'lunar';
  if (defined.has('solarPlexus')) return 'emotional';
  if (defined.has('sacral')) return 'sacral';
  if (defined.has('spleen')) return 'splenic';
  if (defined.has('heart')) {
    // Once the Solar Plexus, Sacral and Spleen are undefined, the Heart can
    // only be defined by 21-45 (to the Throat) or 25-51 (to the G centre).
    return directlyConnected('heart', 'throat', channels) ? 'ego-manifested' : 'ego-projected';
  }
  if (defined.has('g') && connected('g', 'throat', channels)) return 'self-projected';
  return 'mental';
}

export function bodygraph(personalityLongitudes: Record<Body, number>, designLongitudes: Record<Body, number>): Bodygraph {
  const personality = activations(personalityLongitudes);
  const design = activations(designLongitudes);
  const gates = new Set([...personality, ...design].map((a) => a.gate));
  const definedChannels = CHANNELS.filter(([a, b]) => gates.has(a) && gates.has(b));
  const definedSet = new Set<Center>(definedChannels.flatMap(([a, b]) => [GATE_CENTER[a], GATE_CENTER[b]]));
  const pSun = personality.find((a) => a.body === 'sun')!;
  const dSun = design.find((a) => a.body === 'sun')!;
  return {
    personality,
    design,
    definedChannels,
    definedCenters: CENTERS.filter((c) => definedSet.has(c)),
    type: determineType(definedSet, definedChannels),
    authority: determineAuthority(definedSet, definedChannels),
    profile: `${pSun.line}/${dSun.line}`,
  };
}

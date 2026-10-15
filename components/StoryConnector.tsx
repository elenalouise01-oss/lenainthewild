import DrawnLine from '@/components/DrawnLine';

// Dashed lines that lead the eye from a line of the story to the photo that
// goes with it, like a doodle in a scrapbook.
const SHAPES = {
  // short: a quick curl from the middle of the text down to a photo on the left
  'short-curl': {
    viewBox: '0 0 400 80',
    height: 'h-12 sm:h-14',
    d: 'M150 4 C 140 30, 112 40, 98 34 C 86 28, 96 14, 106 22 C 118 32, 92 58, 46 74',
    arrow: 'M54 64 L44 75 L58 78',
  },
  // medium: sweeps across from the right, loops once, and lands on a photo on the left
  'swoop-left': {
    viewBox: '0 0 400 120',
    height: 'h-20 sm:h-24',
    d: 'M330 4 C 340 40, 300 58, 270 50 C 244 44, 250 18, 272 26 C 300 36, 270 84, 190 96 C 130 104, 80 104, 40 114',
    arrow: 'M50 104 L38 115 L52 120',
  },
  // long: drops down the right-hand side, curls, and heads into the next chapter
  'long-drop': {
    viewBox: '0 0 400 220',
    height: 'h-36 sm:h-48',
    d: 'M300 4 C 360 40, 372 92, 334 112 C 304 128, 290 100, 312 92 C 338 84, 352 132, 300 168 C 260 196, 180 204, 110 212',
    arrow: 'M122 202 L108 212 L122 220',
  },
  // medium: starts on the left, loops, and sweeps across to the right
  'swoop-right': {
    viewBox: '0 0 400 130',
    height: 'h-24 sm:h-28',
    d: 'M60 4 C 40 44, 70 66, 104 58 C 132 52, 126 24, 104 30 C 76 38, 100 92, 190 104 C 260 112, 320 108, 362 122',
    arrow: 'M350 112 L364 122 L350 129',
  },
  // long: wanders down the left with two little loops, then into the chapter
  'long-wander': {
    viewBox: '0 0 400 240',
    height: 'h-40 sm:h-52',
    d: 'M120 4 C 60 30, 40 70, 70 92 C 92 108, 108 84, 90 76 C 66 66, 40 110, 64 140 C 84 164, 120 160, 116 140 C 112 122, 80 136, 76 168 C 72 196, 90 216, 120 232',
    arrow: 'M106 228 L121 233 L114 219',
  },
} as const;

export type ConnectorShape = keyof typeof SHAPES;

export default function StoryConnector({ shape }: { shape: ConnectorShape }) {
  const s = SHAPES[shape];
  return <DrawnLine d={s.d} arrow={s.arrow} viewBox={s.viewBox} stretch className={`-mb-2 -mt-2 block w-full ${s.height}`} />;
}

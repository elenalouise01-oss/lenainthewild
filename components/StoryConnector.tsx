// Dashed lines that lead the eye from a line of the story to the photo that
// goes with it, each one drawn differently (long and loopy, or a short curl),
// like doodles in a scrapbook.
const SHAPES = {
  // long: from the end of the text on the right, a wide loop, then down into
  // the photos in the middle
  'long-loop': {
    viewBox: '0 0 400 200',
    height: 'h-36 sm:h-44',
    d: 'M372 4 C 392 52, 360 86, 318 80 C 280 74, 286 38, 316 44 C 352 52, 344 112, 284 136 C 244 152, 210 164, 198 194',
    arrow: 'M188 184 L198 196 L208 184',
  },
  // short: a quick curl from the middle of the text down to a photo on the left
  'short-curl': {
    viewBox: '0 0 400 80',
    height: 'h-12 sm:h-14',
    d: 'M150 4 C 140 30, 112 40, 98 34 C 86 28, 96 14, 106 22 C 118 32, 92 58, 46 74',
    arrow: 'M54 64 L44 75 L58 78',
  },
} as const;

export type ConnectorShape = keyof typeof SHAPES;

export default function StoryConnector({ shape }: { shape: ConnectorShape }) {
  const s = SHAPES[shape];
  return (
    <svg aria-hidden="true" viewBox={s.viewBox} fill="none" preserveAspectRatio="none" className={`pointer-events-none -mt-2 block w-full ${s.height} ${shape === 'long-loop' ? '-mb-8' : '-mb-2'}`}>
      <path d={s.d} stroke="#a97bb5" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="7 8" vectorEffect="non-scaling-stroke" />
      <path d={s.arrow} stroke="#a97bb5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

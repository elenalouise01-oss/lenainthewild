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
} as const;

export type ConnectorShape = keyof typeof SHAPES;

export default function StoryConnector({ shape }: { shape: ConnectorShape }) {
  const s = SHAPES[shape];
  return (
    <svg aria-hidden="true" viewBox={s.viewBox} fill="none" preserveAspectRatio="none" className={`pointer-events-none -mt-2 block w-full ${s.height} -mb-2`}>
      <path d={s.d} stroke="#3b2d0e" strokeOpacity="0.55" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="7 8" vectorEffect="non-scaling-stroke" />
      <path d={s.arrow} stroke="#3b2d0e" strokeOpacity="0.55" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

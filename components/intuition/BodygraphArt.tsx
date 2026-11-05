// A simple, editorial drawing of a Human Design bodygraph: the nine centres
// in their usual places, joined by the channels. Defined centres fill with
// colour, open ones stay as outlines, and the centre the authority comes from
// gets a dashed doodle ring (the same dashed line as the rest of the site).

export type CenterId = 'head' | 'ajna' | 'throat' | 'g' | 'heart' | 'spleen' | 'sacral' | 'solarPlexus' | 'root';

export const SHAPES: Record<CenterId, { points?: string; rect?: [number, number, number, number]; cx: number; cy: number; r: number }> = {
  head: { points: '150,16 184,70 116,70', cx: 150, cy: 52, r: 38 },
  ajna: { points: '116,90 184,90 150,144', cx: 150, cy: 108, r: 38 },
  throat: { rect: [123, 166, 54, 54], cx: 150, cy: 193, r: 40 },
  g: { points: '150,244 188,282 150,320 112,282', cx: 150, cy: 282, r: 44 },
  heart: { points: '200,300 238,282 234,322', cx: 224, cy: 302, r: 32 },
  spleen: { points: '30,336 30,406 92,371', cx: 51, cy: 371, r: 44 },
  sacral: { rect: [123, 344, 54, 54], cx: 150, cy: 371, r: 40 },
  solarPlexus: { points: '270,336 270,406 208,371', cx: 249, cy: 371, r: 44 },
  root: { rect: [123, 424, 54, 54], cx: 150, cy: 451, r: 40 },
};

// Centre pairs joined by at least one channel
const LINKS: [CenterId, CenterId][] = [
  ['head', 'ajna'], ['ajna', 'throat'], ['throat', 'g'], ['throat', 'heart'], ['throat', 'spleen'], ['throat', 'sacral'],
  ['throat', 'solarPlexus'], ['g', 'heart'], ['g', 'sacral'], ['g', 'spleen'], ['heart', 'spleen'], ['heart', 'solarPlexus'],
  ['sacral', 'spleen'], ['sacral', 'solarPlexus'], ['sacral', 'root'], ['spleen', 'root'], ['solarPlexus', 'root'],
];

export default function BodygraphArt({
  defined = [],
  definedLinks = [],
  highlight = null,
  fill = '#fffba0',
  ink = '#3b2d0e',
  paper = '#ffffff',
  className = '',
  label = 'Human Design bodygraph',
}: {
  defined?: CenterId[];
  definedLinks?: [CenterId, CenterId][];
  highlight?: CenterId | null;
  fill?: string;
  ink?: string;
  paper?: string;
  className?: string;
  label?: string;
}) {
  const on = new Set(defined);
  const linkOn = (a: CenterId, b: CenterId) => definedLinks.some(([x, y]) => (x === a && y === b) || (x === b && y === a));
  const ring = highlight ? SHAPES[highlight] : null;
  return (
    <svg viewBox="0 0 300 490" className={className} role="img" aria-label={label}>
      {LINKS.map(([a, b]) => (
        <line
          key={`${a}-${b}`}
          x1={SHAPES[a].cx}
          y1={SHAPES[a].cy}
          x2={SHAPES[b].cx}
          y2={SHAPES[b].cy}
          stroke={ink}
          strokeOpacity={linkOn(a, b) ? 1 : 0.16}
          strokeWidth={linkOn(a, b) ? 5 : 1.5}
          strokeLinecap="round"
        />
      ))}
      {(Object.keys(SHAPES) as CenterId[]).map((id) => {
        const s = SHAPES[id];
        const common = { fill: on.has(id) ? fill : paper, stroke: ink, strokeWidth: 2.2, strokeLinejoin: 'round' as const };
        return s.rect ? (
          <rect key={id} x={s.rect[0]} y={s.rect[1]} width={s.rect[2]} height={s.rect[3]} rx={7} {...common} />
        ) : (
          <polygon key={id} points={s.points} {...common} />
        );
      })}
      {ring && (
        <ellipse
          cx={ring.cx}
          cy={ring.cy}
          rx={ring.r + 4}
          ry={ring.r - 2}
          transform={`rotate(-8 ${ring.cx} ${ring.cy})`}
          fill="none"
          stroke={ink}
          strokeWidth={2.5}
          strokeOpacity={0.8}
          strokeDasharray="7 7"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}

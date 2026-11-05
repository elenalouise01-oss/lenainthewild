import { LINKS, SHAPES, type CenterId } from './BodygraphArt';

// The example chart on the quiz page, with each of the nine centres named and
// a dashed line from the name to its shape. On a phone only the names fit
// (bigger, so they're readable); the meanings show from tablet size up.
const OFFSET_X = 210;
const OFFSET_Y = 10;

const LABELS: { id: CenterId; side: 'left' | 'right'; y: number; to: [number, number] }[] = [
  { id: 'head', side: 'left', y: 50, to: [128, 52] },
  { id: 'ajna', side: 'right', y: 106, to: [170, 104] },
  { id: 'throat', side: 'left', y: 196, to: [123, 193] },
  { id: 'g', side: 'left', y: 286, to: [114, 282] },
  { id: 'heart', side: 'right', y: 284, to: [236, 290] },
  { id: 'solarPlexus', side: 'right', y: 372, to: [270, 371] },
  { id: 'spleen', side: 'left', y: 384, to: [30, 371] },
  { id: 'sacral', side: 'right', y: 462, to: [177, 398] },
  { id: 'root', side: 'left', y: 468, to: [123, 451] },
];

export default function BodygraphLabelled({
  names,
  defined = [],
  links = [],
  fill = '#CBA1D4',
}: {
  names: Record<CenterId, { name: string; meaning: string }>;
  defined?: CenterId[];
  links?: [CenterId, CenterId][];
  fill?: string;
}) {
  const on = new Set(defined);
  const linkOn = (a: CenterId, b: CenterId) => links.some(([x, y]) => (x === a && y === b) || (x === b && y === a));
  return (
    <svg viewBox="0 0 720 500" className="h-auto w-full" role="img" aria-label="An example Human Design chart with its nine energy centres labelled">
      <g transform={`translate(${OFFSET_X} ${OFFSET_Y})`}>
        {LINKS.map(([a, b]) => (
          <line
            key={`${a}-${b}`}
            x1={SHAPES[a].cx}
            y1={SHAPES[a].cy}
            x2={SHAPES[b].cx}
            y2={SHAPES[b].cy}
            stroke="#3b2d0e"
            strokeOpacity={linkOn(a, b) ? 1 : 0.16}
            strokeWidth={linkOn(a, b) ? 5 : 1.5}
            strokeLinecap="round"
          />
        ))}
        {(Object.keys(SHAPES) as CenterId[]).map((id) => {
          const s = SHAPES[id];
          const common = { fill: on.has(id) ? fill : '#ffffff', stroke: '#3b2d0e', strokeWidth: 2.2, strokeLinejoin: 'round' as const };
          return s.rect ? (
            <rect key={id} x={s.rect[0]} y={s.rect[1]} width={s.rect[2]} height={s.rect[3]} rx={7} {...common} />
          ) : (
            <polygon key={id} points={s.points} {...common} />
          );
        })}
      </g>
      {LABELS.map(({ id, side, y, to }) => {
        const left = side === 'left';
        const textX = left ? 196 : 524;
        const lineStart = left ? 204 : 516;
        return (
          <g key={id}>
            <line
              x1={lineStart}
              y1={y - 6}
              x2={to[0] + OFFSET_X}
              y2={to[1] + OFFSET_Y}
              stroke="#3b2d0e"
              strokeOpacity={0.55}
              strokeWidth={1.6}
              strokeDasharray="4 4"
              strokeLinecap="round"
            />
            <circle cx={to[0] + OFFSET_X} cy={to[1] + OFFSET_Y} r={3} fill="#3b2d0e" />
            <text x={textX} y={y} textAnchor={left ? 'end' : 'start'} className="fill-bark font-body">
              <tspan className="text-[30px] font-semibold sm:text-[17px]">{names[id].name}</tspan>
              <tspan x={textX} dy="1.25em" className="hidden fill-umber text-[14px] sm:inline">
                {names[id].meaning}
              </tspan>
            </text>
          </g>
        );
      })}
    </svg>
  );
}

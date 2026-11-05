import type { CenterId } from './BodygraphArt';
import { IllustrationArt } from './BodygraphIllustration';

// The quiz page's chart: the same illustration as the home page, with each of
// the nine centres named and a fine dashed line from the name to its shape.
// On a phone only the names fit (bigger, so they're readable); the meanings
// show from tablet size up.

// The illustration (600 x 660) sits in the middle of a 1060-wide picture
const X = 230;
const Y = 10;
const SCALE = 0.9;
const at = (x: number, y: number): [number, number] => [X + x * SCALE, Y + y * SCALE];

// Each label: which side, its height (in illustration units) and the point on
// the shape the line runs to
const LABELS: { id: CenterId; side: 'left' | 'right'; y: number; to: [number, number] }[] = [
  { id: 'head', side: 'left', y: 92, to: [281, 99] },
  { id: 'ajna', side: 'right', y: 160, to: [325, 160] },
  { id: 'throat', side: 'left', y: 252, to: [273, 256] },
  { id: 'g', side: 'left', y: 352, to: [257, 357] },
  { id: 'heart', side: 'right', y: 400, to: [393, 410] },
  { id: 'solarPlexus', side: 'right', y: 478, to: [448, 470] },
  { id: 'spleen', side: 'left', y: 478, to: [152, 470] },
  { id: 'sacral', side: 'right', y: 575, to: [331, 518] },
  { id: 'root', side: 'left', y: 590, to: [266, 585] },
];

// Open (white) centres in the example, so the key makes sense
const OPEN: CenterId[] = ['head', 'ajna', 'heart', 'solarPlexus'];

export default function BodygraphLabelled({ names }: { names: Record<CenterId, { name: string; meaning: string }> }) {
  return (
    <svg viewBox="0 0 1060 620" className="h-auto w-full" role="img" aria-label="An illustrated Human Design chart with its nine energy centres labelled">
      <g transform={`translate(${X} ${Y}) scale(${SCALE})`}>
        <IllustrationArt open={OPEN} />
      </g>
      {LABELS.map(({ id, side, y, to }) => {
        const left = side === 'left';
        const [tx, ty] = at(to[0], to[1]);
        const [, ly] = at(0, y);
        const textX = left ? 214 : 800;
        const lineStart = left ? 222 : 792;
        return (
          <g key={id}>
            <line x1={lineStart} y1={ly - 6} x2={tx} y2={ty} stroke="#a8834f" strokeOpacity={0.9} strokeWidth={1.4} strokeDasharray="4 4" strokeLinecap="round" />
            <circle cx={tx} cy={ty} r={3.2} fill="#3b2d0e" />
            <text x={textX} y={ly} textAnchor={left ? 'end' : 'start'} className="fill-bark font-body">
              <tspan className="text-[36px] font-semibold sm:text-[24px]">{names[id].name}</tspan>
              <tspan x={textX} dy="1.3em" className="hidden fill-umber text-[19px] sm:inline">
                {names[id].meaning}
              </tspan>
            </text>
          </g>
        );
      })}
    </svg>
  );
}

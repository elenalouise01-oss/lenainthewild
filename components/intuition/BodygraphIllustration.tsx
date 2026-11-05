// An illustrated Human Design bodygraph in Lena in the Wild's colours, drawn
// to the proportions of Lena's reference: fine gold linework (figure, rays,
// dotted halo, sparkles, moons, channels) and softly painted centres with a
// light paper grain. Decorative.

const GOLD = '#a8834f';
const INK = '#3b2d0e';
// Each centre colour as a soft wash: lighter at the top, deeper at the bottom
const WASH: Record<string, [string, string]> = {
  pink: ['#fbe1ea', '#efb7ca'],
  lilac: ['#e4cdea', '#bf93c9'],
  yellow: ['#fff6cf', '#f6dd8e'],
  green: ['#dcf0d3', '#a9d69a'],
  brown: ['#7a6236', '#4a3a17'],
};

function Sparkle({ x, y, s }: { x: number; y: number; s: number }) {
  const k = s * 0.12;
  return (
    <path
      d={`M${x} ${y - s} Q${x + k} ${y - k} ${x + s} ${y} Q${x + k} ${y + k} ${x} ${y + s} Q${x - k} ${y + k} ${x - s} ${y} Q${x - k} ${y - k} ${x} ${y - s} Z`}
      fill={GOLD}
    />
  );
}

function Moon({ x, y, r, flip = false }: { x: number; y: number; r: number; flip?: boolean }) {
  const d = `M${x} ${y - r} A${r} ${r} 0 1 0 ${x} ${y + r} A${r * 0.55} ${r} 0 1 1 ${x} ${y - r} Z`;
  return <path d={d} fill={GOLD} fillOpacity={0.85} transform={flip ? `translate(${2 * x} 0) scale(-1 1)` : undefined} />;
}

// The left half of the figure, from the bottom of the body up to the top of
// the head: widening body, arm, sloping shoulder, short neck, jaw, cheek and
// forehead.
const HALF_FIGURE =
  'M118 520 C 125 495 136 460 140 440 C 150 410 156 380 158 350 C 160 320 162 300 172 290 C 180 278 190 271 205 267 C 225 262 250 257 260 252 C 266 248 267 240 267 226 L 266 212 C 260 205 252 196 250 186 C 248 180 246 176 244 168 C 240 155 240 145 241 138 C 244 108 268 86 300 86';

// The drawing itself, in a 600 x 660 space, so it can also be placed inside a
// bigger picture (the labelled version on the quiz page)
// Where each centre sits in the drawing, for the dashed ring around one
const CENTRE_AT: Record<string, [number, number, number]> = {
  head: [300, 106, 44],
  ajna: [300, 168, 44],
  throat: [300, 256, 44],
  g: [300, 357, 52],
  heart: [360, 410, 38],
  spleen: [176, 470, 48],
  solarPlexus: [424, 470, 48],
  sacral: [300, 496, 46],
  root: [300, 585, 48],
};

export function IllustrationArt({ open = [], highlight = null }: { open?: string[]; highlight?: string | null }) {
  // Rays around the head, alternating long and short
  const rays = Array.from({ length: 15 }, (_, i) => {
    const a = ((-178.2 + i * 12.6) * Math.PI) / 180; // centred on straight up (-90°)
    const len = i % 2 ? 100 : 116;
    return { x1: 300 + Math.cos(a) * 72, y1: 143 + Math.sin(a) * 72, x2: 300 + Math.cos(a) * len, y2: 143 + Math.sin(a) * len };
  });
  const gold = { fill: 'none', stroke: GOLD, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  // An open centre is left white; a defined one is softly painted
  const centre = (colour: keyof typeof WASH, id: string) => ({
    fill: open.includes(id) ? '#ffffff' : `url(#litw-wash-${colour})`,
    stroke: INK,
    strokeWidth: 1.6,
    strokeLinejoin: 'round' as const,
    filter: open.includes(id) ? undefined : 'url(#litw-grain)',
  });

  return (
    <g>
      <defs>
        {Object.entries(WASH).map(([name, [light, deep]]) => (
          <linearGradient key={name} id={`litw-wash-${name}`} x1="0" y1="0" x2="0.35" y2="1">
            <stop offset="0%" stopColor={light} />
            <stop offset="100%" stopColor={deep} />
          </linearGradient>
        ))}
        {/* A light paper grain over the painted centres */}
        <filter id="litw-grain" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="7" result="noise" />
          <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0.3  0 0 0 0 0.22  0 0 0 0 0.1  0 0 0 0.16 0" result="grain" />
          <feComposite in="grain" in2="SourceGraphic" operator="in" result="grainIn" />
          <feMerge>
            <feMergeNode in="SourceGraphic" />
            <feMergeNode in="grainIn" />
          </feMerge>
        </filter>
      </defs>

      {/* Rays and dotted halo */}
      {rays.map((r, i) => (
        <line key={i} {...r} stroke={GOLD} strokeOpacity={0.85} strokeWidth={1.2} strokeLinecap="round" />
      ))}
      <path d="M58 400 A 263 263 0 1 1 542 400" {...gold} strokeWidth={2.6} strokeDasharray="0.1 11" />

      {/* Sparkles and moons */}
      <Sparkle x={300} y={24} s={20} />
      <Sparkle x={88} y={312} s={11} />
      <Sparkle x={512} y={312} s={11} />
      <Sparkle x={300} y={642} s={12} />
      <Moon x={100} y={182} r={20} />
      <Moon x={500} y={182} r={20} flip />

      {/* The figure: one half traced from Lena's reference, mirrored so both
          sides match exactly */}
      <path d={HALF_FIGURE} {...gold} strokeWidth={1.4} />
      <path d={HALF_FIGURE} {...gold} strokeWidth={1.4} transform="translate(600 0) scale(-1 1)" />

      {/* Channels: fine gold column with a darker centre line, curved loops and the crossing curve */}
      <line x1={294} y1={127} x2={294} y2={560} stroke={GOLD} strokeWidth={1} />
      <line x1={306} y1={127} x2={306} y2={560} stroke={GOLD} strokeWidth={1} />
      <line x1={300} y1={127} x2={300} y2={560} stroke={INK} strokeOpacity={0.75} strokeWidth={2.2} />
      <ellipse cx={300} cy={427} rx={133} ry={170} fill="none" stroke={INK} strokeOpacity={0.7} strokeWidth={2.4} />
      <ellipse cx={300} cy={432} rx={143} ry={180} {...gold} strokeWidth={1} />
      <ellipse cx={300} cy={422} rx={123} ry={160} {...gold} strokeWidth={1} />
      <path d="M214 470 C 262 428, 302 410, 341 410" {...gold} strokeWidth={1} />
      <path d="M214 478 C 264 438, 304 420, 341 420" {...gold} strokeWidth={1} />

      {/* The nine centres, softly painted */}
      <polygon points="300,70 337,127 263,127" {...centre('pink', 'head')} />
      <polygon points="263,148 337,148 300,205" {...centre('lilac', 'ajna')} />
      <rect x={273} y={230} width={54} height={53} rx={7} {...centre('yellow', 'throat')} />
      <polygon points="300,314 343,357 300,400 257,357" {...centre('pink', 'g')} />
      <polygon points="341,383 393,410 341,437" {...centre('brown', 'heart')} />
      <polygon points="152,433 152,507 214,470" {...centre('lilac', 'spleen')} />
      <polygon points="448,433 448,507 386,470" {...centre('pink', 'solarPlexus')} />
      <rect x={268.5} y={465} width={63} height={62} rx={7} {...centre('green', 'sacral')} />
      <rect x={266} y={553} width={68} height={64} rx={7} {...centre('brown', 'root')} />
      {highlight && CENTRE_AT[highlight] && (
        <ellipse
          cx={CENTRE_AT[highlight][0]}
          cy={CENTRE_AT[highlight][1]}
          rx={CENTRE_AT[highlight][2] + 6}
          ry={CENTRE_AT[highlight][2]}
          transform={`rotate(-8 ${CENTRE_AT[highlight][0]} ${CENTRE_AT[highlight][1]})`}
          fill="none"
          stroke="#3b2d0e"
          strokeWidth={2.4}
          strokeDasharray="7 7"
          strokeLinecap="round"
        />
      )}
    </g>
  );
}

export default function BodygraphIllustration({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 660" className={className} role="img" aria-label="An illustrated Human Design chart">
      <IllustrationArt />
    </svg>
  );
}

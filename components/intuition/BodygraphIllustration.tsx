// An illustrated Human Design bodygraph in Lena in the Wild's colours: a soft
// sun behind a fine-line figure, the nine centres, curved channels, little
// sparkles, crescent moons and leaves. Decorative (used on the home page).

const INK = '#3b2d0e';
const COLOURS = {
  lilac: '#CBA1D4',
  yellow: '#FDECA8',
  pink: '#f8c8dc',
  green: '#bee5b0',
  blush: '#e8cfc1',
  brown: '#52421b',
};

function Sparkle({ x, y, s }: { x: number; y: number; s: number }) {
  const k = s * 0.14;
  return (
    <path
      d={`M${x} ${y - s} Q${x + k} ${y - k} ${x + s} ${y} Q${x + k} ${y + k} ${x} ${y + s} Q${x - k} ${y + k} ${x - s} ${y} Q${x - k} ${y - k} ${x} ${y - s} Z`}
      fill={COLOURS.brown}
      fillOpacity={0.75}
    />
  );
}

function Moon({ x, y, r, flip = false }: { x: number; y: number; r: number; flip?: boolean }) {
  // A crescent: the outer arc of one circle and the inner arc of a smaller one
  const d = `M${x} ${y - r} A${r} ${r} 0 1 0 ${x} ${y + r} A${r * 0.5} ${r} 0 1 1 ${x} ${y - r} Z`;
  return <path d={d} fill={COLOURS.brown} fillOpacity={0.7} transform={flip ? `translate(${2 * x} 0) scale(-1 1)` : undefined} />;
}

// One leaf, pointing right from the origin
const LEAF = 'M0 0 C 20 -19 64 -19 88 0 C 64 19 20 19 0 0 Z';

function Sprig() {
  const leaves: [number, number, number, string][] = [
    [44, 742, -115, COLOURS.green],
    [52, 724, -40, COLOURS.lilac],
    [70, 690, -125, COLOURS.green],
    [80, 668, -55, COLOURS.green],
    [100, 636, -130, COLOURS.lilac],
    [112, 612, -70, COLOURS.green],
  ];
  return (
    <g>
      <path d="M36 770 C 60 720, 90 660, 120 580" fill="none" stroke={COLOURS.brown} strokeOpacity={0.5} strokeWidth={1.6} strokeLinecap="round" />
      {leaves.map(([x, y, rot, fill], i) => (
        <path key={i} d={LEAF} transform={`translate(${x} ${y}) rotate(${rot})`} fill={fill} stroke={COLOURS.brown} strokeOpacity={0.35} strokeWidth={1} />
      ))}
    </g>
  );
}

export default function BodygraphIllustration({ className = '' }: { className?: string }) {
  const rays = Array.from({ length: 13 }, (_, i) => {
    const a = ((-168 + i * 13) * Math.PI) / 180;
    const cx = 300;
    const cy = 168;
    return { x1: cx + Math.cos(a) * 104, y1: cy + Math.sin(a) * 104, x2: cx + Math.cos(a) * (i % 2 ? 140 : 156), y2: cy + Math.sin(a) * (i % 2 ? 140 : 156) };
  });
  const shape = { stroke: INK, strokeWidth: 2, strokeLinejoin: 'round' as const };

  return (
    <svg viewBox="0 0 600 770" className={className} role="img" aria-label="An illustrated Human Design chart">
      <defs>
        <radialGradient id="litw-sun" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={COLOURS.yellow} stopOpacity={0.95} />
          <stop offset="70%" stopColor={COLOURS.blush} stopOpacity={0.55} />
          <stop offset="100%" stopColor={COLOURS.blush} stopOpacity={0} />
        </radialGradient>
      </defs>

      {/* Sun, rays, dotted halo */}
      <circle cx={300} cy={300} r={232} fill={COLOURS.blush} fillOpacity={0.55} />
      <circle cx={300} cy={190} r={120} fill="url(#litw-sun)" />
      {rays.map((r, i) => (
        <line key={i} {...r} stroke={COLOURS.brown} strokeOpacity={0.55} strokeWidth={1.6} strokeLinecap="round" />
      ))}
      <circle cx={300} cy={340} r={268} fill="none" stroke={COLOURS.brown} strokeOpacity={0.5} strokeWidth={3.2} strokeDasharray="0.1 13" strokeLinecap="round" />

      {/* Sparkles and moons */}
      <Sparkle x={300} y={34} s={26} />
      <Sparkle x={58} y={430} s={14} />
      <Sparkle x={542} y={430} s={14} />
      <Sparkle x={300} y={752} s={14} />
      <Moon x={92} y={238} r={26} />
      <Moon x={508} y={238} r={26} flip />

      {/* Leaves */}
      <Sprig />
      <g transform="translate(600 0) scale(-1 1)">
        <Sprig />
      </g>

      {/* The figure */}
      <path
        d="M96 770 C 100 560, 140 462, 204 432 C 244 412, 274 400, 278 360 L 280 274 C 250 262, 226 224, 226 172 C 226 116, 262 78, 300 78 C 338 78, 374 116, 374 172 C 374 224, 350 262, 320 274 L 322 360 C 326 400, 356 412, 396 432 C 460 462, 500 560, 504 770"
        fill="none"
        stroke={COLOURS.brown}
        strokeOpacity={0.5}
        strokeWidth={1.6}
      />

      {/* Channels: the central column and the curved loops */}
      {[292, 300, 308].map((x) => (
        <line key={x} x1={x} y1={165} x2={x} y2={640} stroke={COLOURS.brown} strokeOpacity={0.55} strokeWidth={x === 300 ? 2.6 : 1.2} />
      ))}
      <ellipse cx={300} cy={520} rx={150} ry={178} fill="none" stroke={COLOURS.brown} strokeOpacity={0.85} strokeWidth={3} />
      <ellipse cx={300} cy={524} rx={162} ry={190} fill="none" stroke={COLOURS.brown} strokeOpacity={0.4} strokeWidth={1.2} />
      <ellipse cx={300} cy={516} rx={138} ry={166} fill="none" stroke={COLOURS.brown} strokeOpacity={0.4} strokeWidth={1.2} />
      <path d="M222 575 C 290 505, 352 482, 430 492" fill="none" stroke={COLOURS.brown} strokeOpacity={0.5} strokeWidth={1.2} />
      <path d="M222 583 C 292 515, 354 494, 430 502" fill="none" stroke={COLOURS.brown} strokeOpacity={0.5} strokeWidth={1.2} />

      {/* The nine centres */}
      <polygon points="300,94 346,166 254,166" fill={COLOURS.pink} {...shape} />
      <polygon points="254,186 346,186 300,254" fill={COLOURS.lilac} {...shape} />
      <rect x={264} y={288} width={72} height={72} rx={9} fill={COLOURS.yellow} {...shape} />
      <polygon points="300,392 348,440 300,488 252,440" fill={COLOURS.pink} {...shape} />
      <polygon points="378,468 432,492 380,516" fill={COLOURS.brown} {...shape} />
      <polygon points="150,535 150,615 224,575" fill={COLOURS.lilac} {...shape} />
      <polygon points="450,535 450,615 376,575" fill={COLOURS.pink} {...shape} />
      <rect x={264} y={540} width={72} height={72} rx={9} fill={COLOURS.green} {...shape} />
      <rect x={262} y={640} width={76} height={74} rx={9} fill={COLOURS.brown} {...shape} />
    </svg>
  );
}

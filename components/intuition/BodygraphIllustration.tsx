// An illustrated Human Design bodygraph in Lena in the Wild's colours, drawn
// to the proportions of Lena's reference: a soft sun behind a fine-line
// head-and-shoulders figure, the nine centres, curved channels, sparkles,
// crescent moons, a dotted halo and outline-only leaves. Decorative.

const BROWN = '#52421b';
const INK = '#3b2d0e';
const C = {
  lilac: '#CBA1D4',
  yellow: '#FDECA8',
  pink: '#f8c8dc',
  green: '#bee5b0',
  blush: '#e8cfc1',
};

function Sparkle({ x, y, s }: { x: number; y: number; s: number }) {
  const k = s * 0.14;
  return (
    <path
      d={`M${x} ${y - s} Q${x + k} ${y - k} ${x + s} ${y} Q${x + k} ${y + k} ${x} ${y + s} Q${x - k} ${y + k} ${x - s} ${y} Q${x - k} ${y - k} ${x} ${y - s} Z`}
      fill={BROWN}
      fillOpacity={0.7}
    />
  );
}

function Moon({ x, y, r, flip = false }: { x: number; y: number; r: number; flip?: boolean }) {
  const d = `M${x} ${y - r} A${r} ${r} 0 1 0 ${x} ${y + r} A${r * 0.5} ${r} 0 1 1 ${x} ${y - r} Z`;
  return <path d={d} fill={BROWN} fillOpacity={0.6} transform={flip ? `translate(${2 * x} 0) scale(-1 1)` : undefined} />;
}

// One outline-only leaf, pointing right from the origin
const LEAF = 'M0 0 C 16 -14 50 -14 70 0 C 50 14 16 14 0 0 Z M6 0 L 64 0';

function Sprig() {
  const leaves: [number, number, number][] = [
    [62, 610, -150],
    [70, 596, -60],
    [84, 566, -160],
    [92, 548, -75],
    [106, 516, -170],
    [112, 498, -90],
  ];
  return (
    <g fill="none" stroke={BROWN} strokeOpacity={0.55} strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round">
      <path d="M140 640 C 110 600, 96 560, 112 486" />
      {leaves.map(([x, y, rot], i) => (
        <path key={i} d={LEAF} transform={`translate(${x + 40} ${y}) rotate(${rot})`} />
      ))}
    </g>
  );
}

export default function BodygraphIllustration({ className = '' }: { className?: string }) {
  // Rays around the head
  const rays = Array.from({ length: 15 }, (_, i) => {
    const a = ((-176 + i * 12.6) * Math.PI) / 180;
    const len = i % 2 ? 98 : 112;
    return { x1: 300 + Math.cos(a) * 70, y1: 143 + Math.sin(a) * 70, x2: 300 + Math.cos(a) * len, y2: 143 + Math.sin(a) * len };
  });
  // Dotted halo: the top of a big circle, over the head and down both sides
  const halo = 'M58 400 A 263 263 0 1 1 542 400';
  const shape = { stroke: INK, strokeWidth: 1.8, strokeLinejoin: 'round' as const };
  const line = { fill: 'none', stroke: BROWN, strokeLinecap: 'round' as const };

  return (
    <svg viewBox="0 0 600 660" className={className} role="img" aria-label="An illustrated Human Design chart">
      {/* Sun, rays, dotted halo */}
      <circle cx={300} cy={180} r={180} fill={C.blush} fillOpacity={0.6} />
      {rays.map((r, i) => (
        <line key={i} {...r} stroke={BROWN} strokeOpacity={0.55} strokeWidth={1.3} strokeLinecap="round" />
      ))}
      <path d={halo} {...line} strokeOpacity={0.55} strokeWidth={2.6} strokeDasharray="0.1 11" />

      {/* Sparkles and moons */}
      <Sparkle x={300} y={22} s={20} />
      <Sparkle x={88} y={312} s={11} />
      <Sparkle x={512} y={312} s={11} />
      <Sparkle x={300} y={640} s={12} />
      <Moon x={100} y={182} r={20} />
      <Moon x={500} y={182} r={20} flip />

      {/* Outline-only leaves in the bottom corners */}
      <Sprig />
      <g transform="translate(600 0) scale(-1 1)">
        <Sprig />
      </g>

      {/* The figure: head, neck and shoulders */}
      <path
        d="M153 440 C 154 410 155 380 157 340 C 160 300 175 266 200 254 C 225 244 255 236 267 226 L 267 210 C 263 204 255 198 250 190 C 243 180 239 165 241 140 C 244 108 270 88 300 88 C 330 88 356 108 359 140 C 361 165 357 180 350 190 C 345 198 337 204 333 210 L 333 226 C 345 236 375 244 400 254 C 425 266 440 300 443 340 C 445 380 446 410 447 440"
        {...line}
        strokeOpacity={0.6}
        strokeWidth={1.5}
      />

      {/* Channels: the central column, the curved loops and the crossing curve */}
      {[294, 300, 306].map((x) => (
        <line key={x} x1={x} y1={127} x2={x} y2={560} stroke={BROWN} strokeOpacity={0.6} strokeWidth={x === 300 ? 2.4 : 1.1} />
      ))}
      <ellipse cx={303} cy={427} rx={133} ry={170} {...line} strokeOpacity={0.85} strokeWidth={2.8} />
      <ellipse cx={303} cy={432} rx={143} ry={180} {...line} strokeOpacity={0.4} strokeWidth={1.1} />
      <ellipse cx={303} cy={422} rx={123} ry={160} {...line} strokeOpacity={0.4} strokeWidth={1.1} />
      <path d="M213 470 C 262 428, 302 410, 341 410" {...line} strokeOpacity={0.5} strokeWidth={1.1} />
      <path d="M213 478 C 264 438, 304 420, 341 420" {...line} strokeOpacity={0.5} strokeWidth={1.1} />

      {/* The nine centres */}
      <polygon points="300,70 337,127 263,127" fill={C.pink} {...shape} />
      <polygon points="263,148 337,148 300,205" fill={C.lilac} {...shape} />
      <rect x={273} y={230} width={54} height={53} rx={7} fill={C.yellow} {...shape} />
      <polygon points="300,314 343,357 300,400 257,357" fill={C.pink} {...shape} />
      <polygon points="341,383 393,410 341,437" fill={BROWN} {...shape} />
      <polygon points="152,433 152,507 213,470" fill={C.lilac} {...shape} />
      <polygon points="445,433 445,507 385,470" fill={C.pink} {...shape} />
      <rect x={268} y={465} width={63} height={62} rx={7} fill={C.green} {...shape} />
      <rect x={265} y={553} width={68} height={64} rx={7} fill={BROWN} {...shape} />
    </svg>
  );
}

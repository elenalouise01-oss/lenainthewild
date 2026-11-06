import Image from 'next/image';
import { storyRoadmap, type RoadmapKind, type RoadmapStop } from '@/content/site';

// "My story at a glance": Lena's life as a winding road on a little map.
//
// One continuous dashed road winds down the page: along a lap, a round
// U-turn at the edge, back along the next lap, starting where she was born
// and ending at now. At every stop a map pin stands on the road; above the
// pin, a small taped polaroid (or one of Lena's own stickers, or a scrap of
// torn paper); below it, the year and a few words. Planes on the road mark
// the moves. Four stops a lap on a laptop, three on a tablet, two on a phone.
//
// On a laptop or tablet the road runs in gently arched rows joined by true
// half-circle loops; on a phone it is one even S-curve down the middle.

const INK = '#3b2d0e';
const COLOUR: Record<RoadmapKind, { bg: string; hex: string }> = {
  start: { bg: 'bg-zing-green', hex: '#bee5b0' },
  step: { bg: 'bg-white', hex: '#ffffff' },
  leap: { bg: 'bg-zing-yellow', hex: '#fffba0' },
  'rock bottom': { bg: 'bg-sage', hex: '#CBA1D4' },
  low: { bg: 'bg-zing-babypink', hex: '#f8c8dc' },
  sign: { bg: 'bg-zing-babypink', hex: '#f8c8dc' },
  'turning point': { bg: 'bg-zing-green', hex: '#bee5b0' },
  now: { bg: 'bg-zing-yellow', hex: '#fffba0' },
};

const STICKER = {
  flower: { src: '/images/sticker-flower.png', w: 241, h: 231 },
  star: { src: '/images/sticker-star.png', w: 169, h: 161 },
  'star-scribble': { src: '/images/sticker-star-scribble.png', w: 186, h: 167 },
  butterfly: { src: '/images/butterfly.png', w: 396, h: 500 },
  bow: { src: '/images/bow.png', w: 202, h: 226 },
};

// Torn ends, like a strip of washi tape
const TAPE_EDGE =
  'polygon(0 8%, 3% 0, 97% 6%, 100% 0, 98% 35%, 100% 60%, 97% 85%, 100% 100%, 4% 94%, 0 100%, 2% 65%, 0 40%)';

function Tape({ text, kind, className = '' }: { text: string; kind: RoadmapKind; className?: string }) {
  return (
    <span
      className={`inline-block whitespace-nowrap ${COLOUR[kind].bg} px-2 py-0.5 font-body text-[0.5rem] font-semibold uppercase tracking-[0.16em] text-bark shadow-sm sm:text-[0.55rem] ${className}`}
      style={{ clipPath: TAPE_EDGE }}
    >
      {text}
    </span>
  );
}

// A map pin standing on the road, in the colour of the moment
function Pin({ kind }: { kind: RoadmapKind }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 32" className="h-7 w-[1.3rem] drop-shadow-sm">
      <path d="M12 31 C 12 31, 2 19, 2 11.5 A 10 10 0 0 1 22 11.5 C 22 19, 12 31, 12 31 Z" fill={COLOUR[kind].hex} stroke={INK} strokeWidth={1.5} />
      <circle cx={12} cy={11.5} r={3.6} fill="#ffffff" stroke={INK} strokeWidth={1.3} />
    </svg>
  );
}

// A little plane sticker on the road (white die-cut edge), facing the way the road goes
function Plane({ dir }: { dir: 'left' | 'right' | 'down' }) {
  const turn = { left: '-rotate-90', right: 'rotate-90', down: 'rotate-180' }[dir];
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={`h-6 w-6 drop-shadow-sm ${turn}`}>
      <path
        d="M21 16v-2l-8-5V3.5C13 2.67 12.33 2 11.5 2S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
        fill={INK}
        stroke="#ffffff"
        strokeWidth={2.2}
        strokeLinejoin="round"
        paintOrder="stroke"
      />
    </svg>
  );
}

function Heart() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 22" className="h-5 w-5 drop-shadow-sm">
      <path d="M12 21 C 4 14, 0 9, 4 4 C 7 1, 11 2, 12 6 C 13 2, 17 1, 20 4 C 24 9, 20 14, 12 21 Z" fill="#efb7ca" stroke="#ffffff" strokeWidth={2.4} paintOrder="stroke" />
    </svg>
  );
}

// A place sticker: round lilac stamp with a white die-cut edge
function Stamp({ text, className }: { text: string; className: string }) {
  const id = `stamp-${text.replace(/\W/g, '')}`;
  return (
    <svg aria-hidden="true" viewBox="0 0 100 100" className={`drop-shadow ${className}`}>
      <defs>
        <path id={id} d="M 20 52 A 30 30 0 0 1 80 52" />
      </defs>
      <circle cx={50} cy={50} r={47} fill="#ffffff" />
      <circle cx={50} cy={50} r={41} fill="#e4cdea" stroke={INK} strokeWidth={1.5} />
      <circle cx={50} cy={50} r={34} fill="none" stroke={INK} strokeOpacity={0.7} strokeWidth={1} strokeDasharray="3 3" />
      <text fill={INK} fontSize={13} fontWeight={700} letterSpacing={2} textAnchor="middle" className="font-body uppercase">
        <textPath href={`#${id}`} startOffset="50%">
          {text}
        </textPath>
      </text>
      <path d="M36 64 L66 55 L47 68 Z M47 68 L66 55 L55 75 Z" fill={INK} />
    </svg>
  );
}

// What sits above the pin: a polaroid, a sticker, a scrap of torn paper or a stamp
function Visual({ stop, i, photoW }: { stop: RoadmapStop; i: number; photoW: string }) {
  const tilt = i % 2 ? 'rotate-3' : '-rotate-3';
  if (stop.photo) {
    return (
      <figure className={`relative ${photoW} ${tilt} bg-white p-1 pb-4 shadow-md`}>
        {stop.flag && <Tape text={stop.flag} kind={stop.kind} className="absolute -top-2 left-1/2 z-10 -translate-x-1/2" />}
        <div className="relative aspect-square overflow-hidden bg-sand">
          <Image src={stop.photo.src} alt={stop.photo.alt} fill sizes="6rem" className="object-cover" style={{ objectPosition: stop.photo.pos }} />
        </div>
        <figcaption className="absolute inset-x-0 bottom-0.5 truncate px-1 text-center font-hand text-[0.6rem] leading-tight text-bark">{stop.photo.caption}</figcaption>
        {stop.stamp && <Stamp text={stop.stamp} className="absolute -bottom-3 -left-5 h-10 w-10 -rotate-12" />}
      </figure>
    );
  }
  if (stop.sticker) {
    const s = STICKER[stop.sticker];
    return (
      <span className="relative flex flex-col items-center">
        {stop.flag && <Tape text={stop.flag} kind={stop.kind} className={`relative z-10 -mb-1 ${tilt}`} />}
        <Image src={s.src} alt="" width={s.w} height={s.h} sizes="4rem" className="h-14 w-auto drop-shadow-md" />
        {stop.stamp && <Stamp text={stop.stamp} className="absolute -left-8 bottom-0 h-10 w-10 -rotate-12" />}
      </span>
    );
  }
  if (stop.flag) {
    // A scrap of torn paper with the moment written on it
    return (
      <span className={`relative flex h-14 w-28 items-center justify-center ${tilt}`}>
        <Image src="/images/torn-paper.png" alt="" fill sizes="7rem" className="object-contain drop-shadow-md" />
        <span className="relative px-3 text-center font-hand text-base leading-tight text-bark">{stop.flag.toLowerCase()}</span>
        {stop.stamp && <Stamp text={stop.stamp} className="absolute -right-5 -top-4 h-10 w-10 rotate-12" />}
      </span>
    );
  }
  return stop.stamp ? <Stamp text={stop.stamp} className="h-14 w-14 -rotate-12" /> : null;
}

// The words under a stop: the year as a small label, the heading in Lena's
// handwriting, and a line or two of plain text
function StopText({ stop, lines, className = '' }: { stop: RoadmapStop; lines: boolean; className?: string }) {
  return (
    <span className={`block text-center ${className}`}>
      <span className="block font-body text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-stone">{stop.when}</span>
      <span className="mt-0.5 block font-hand text-lg leading-tight text-bark">{stop.title}</span>
      {lines &&
        stop.lines?.map((line) => (
          <span key={line} className="mt-0.5 block font-body text-[0.7rem] leading-snug text-umber">
            {line}
          </span>
        ))}
    </span>
  );
}

const DASH = { fill: 'none', stroke: INK, strokeOpacity: 0.75, strokeWidth: 3, strokeDasharray: '9 8', strokeLinecap: 'round' as const, vectorEffect: 'non-scaling-stroke' as const };

// Laptop and tablet: the road runs across the page in rows with a gentle
// arch, joined at the ends by true half circles, every one the same size.
type Laps = { per: number; r: number; arch: number; top: number; bottom: number; textW: string; photoW: string; show: string };
const LAPS: Laps[] = [
  { per: 2, r: 150, arch: 22, top: 160, bottom: 140, textW: 'w-36', photoW: 'w-20', show: 'hidden sm:block lg:hidden' },
  { per: 4, r: 165, arch: 26, top: 160, bottom: 150, textW: 'w-40', photoW: 'w-[5.5rem]', show: 'hidden lg:block' },
];

function LapMap({ l }: { l: Laps }) {
  const stops = storyRoadmap.stops;
  const laps = Math.ceil(stops.length / l.per);
  const lap = 2 * l.r; // rows are a loop's height apart
  const height = l.top + (laps - 1) * lap + l.bottom;
  const rowY = (row: number) => l.top + row * lap;
  const place = (i: number) => {
    const row = Math.floor(i / l.per);
    const k = i % l.per;
    const back = row % 2 === 1;
    const col = back ? l.per - 1 - k : k;
    return { row, k, back, t: (col + 0.5) / l.per };
  };
  const archY = (t: number) => l.arch * Math.sin(Math.PI * t) ** 2; // 0 at the ends of a row
  const x = (t: number) => `calc(${l.r}px + ${t} * (100% - ${2 * l.r}px))`;
  const pinY = (i: number) => rowY(place(i).row) - archY(place(i).t);
  const first = place(0);
  const last = place(stops.length - 1);

  return (
    <div className={`relative ${l.show}`} style={{ height }}>
      {Array.from({ length: laps }, (_, row) => {
        // The row: only from the first stop on the first row, and to the last stop on the last
        const t0 = row === 0 ? first.t : row === laps - 1 && last.back ? last.t : 0;
        const t1 = row === laps - 1 && !last.back ? last.t : 1;
        const pts: string[] = [];
        for (let n = 0; n <= 100; n++) {
          const t = t0 + ((t1 - t0) * n) / 100;
          pts.push(`${t * 1000},${l.arch + 2 - archY(t)}`);
        }
        const back = row % 2 === 1;
        return (
          <div key={row}>
            <svg aria-hidden="true" viewBox={`0 0 1000 ${l.arch + 4}`} preserveAspectRatio="none" className="absolute overflow-visible" style={{ left: l.r, width: `calc(100% - ${2 * l.r}px)`, top: rowY(row) - l.arch - 2, height: l.arch + 4 }}>
              <polyline points={pts.join(' ')} {...DASH} />
            </svg>
            {row < laps - 1 && (
              <svg aria-hidden="true" viewBox={`0 0 ${l.r} ${lap}`} className="absolute overflow-visible" style={{ top: rowY(row), width: l.r, height: lap, [back ? 'left' : 'right']: 0 }}>
                <path d={back ? `M ${l.r} 0 A ${l.r} ${l.r} 0 0 0 ${l.r} ${lap}` : `M 0 0 A ${l.r} ${l.r} 0 0 1 0 ${lap}`} {...DASH} />
              </svg>
            )}
          </div>
        );
      })}

      <span aria-hidden="true" className="absolute -translate-x-full -translate-y-1/2 -rotate-6 whitespace-nowrap pr-6 font-hand text-xl text-bark" style={{ top: pinY(0), left: x(first.t) }}>
        {storyRoadmap.start}
      </span>

      <ol>
        {stops.map((stop, i) => {
          const p = place(i);
          return (
            <li key={stop.title} className="absolute" style={{ top: pinY(i), left: x(p.t) }}>
              <span className="absolute bottom-7 left-0 flex -translate-x-1/2 flex-col items-center">
                <Visual stop={stop} i={i} photoW={l.photoW} />
              </span>
              <span className="absolute bottom-0 left-0 -translate-x-1/2">
                <Pin kind={stop.kind} />
              </span>
              <StopText stop={stop} lines className={`absolute left-0 top-3 -translate-x-1/2 ${l.textW}`} />
            </li>
          );
        })}
      </ol>

      {/* A plane on the road into each move, a heart into the good bits */}
      {stops.map((stop, i) => {
        if (!stop.road || i === 0) return null;
        const a = place(i - 1);
        const b = place(i);
        const onLoop = a.row !== b.row;
        const tm = (a.t + b.t) / 2;
        const pos = onLoop
          ? { top: rowY(a.row) + l.r, left: a.back ? '0px' : '100%' }
          : { top: rowY(b.row) - archY(tm), left: x(tm) };
        return (
          <span key={`road-${stop.title}`} aria-hidden="true" className="absolute -translate-x-1/2 -translate-y-1/2" style={pos}>
            {stop.road === 'plane' ? <Plane dir={onLoop ? 'down' : b.back ? 'left' : 'right'} /> : <Heart />}
          </span>
        );
      })}
    </div>
  );
}

// Phone: one even S-curve down the middle, the stops alternating sides
function SnakeMap() {
  const stops = storyRoadmap.stops;
  const top = 70;
  const step = 160; // px between stops
  const swing = 17; // % the road swings either side of the middle
  const height = top + (stops.length - 1) * step + 150;
  const side = (i: number) => (i % 2 === 0 ? -1 : 1); // the road bends left for the first stop
  const pts: string[] = [];
  for (let y = top; y <= top + (stops.length - 1) * step; y += 4) {
    pts.push(`${50 - swing * Math.cos((Math.PI * (y - top)) / step)},${y}`);
  }
  return (
    <div className="relative sm:hidden" style={{ height }}>
      <svg aria-hidden="true" viewBox={`0 0 100 ${height}`} preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
        <polyline points={pts.join(' ')} {...DASH} />
      </svg>
      <span aria-hidden="true" className="absolute -translate-x-1/2 -rotate-6 whitespace-nowrap font-hand text-xl text-bark" style={{ top: top - 58, left: `${50 - swing}%` }}>
        {storyRoadmap.start}
      </span>
      <ol>
        {stops.map((stop, i) => {
          const pinX = 50 + side(i) * swing;
          const y = top + i * step;
          return (
            <li key={stop.title}>
              <span className="absolute -translate-x-1/2 -translate-y-full" style={{ top: y, left: `${pinX}%` }}>
                <Pin kind={stop.kind} />
              </span>
              {/* The stop's picture and words, on the other side of the road */}
              <span className="absolute flex w-[44%] -translate-y-1/2 flex-col items-center" style={{ top: y, [side(i) < 0 ? 'right' : 'left']: '1%' }}>
                <Visual stop={stop} i={i} photoW="w-[4.25rem]" />
                <StopText stop={stop} lines={false} className="mt-2" />
              </span>
              {stop.road && i > 0 && (
                <span aria-hidden="true" className="absolute -translate-x-1/2 -translate-y-1/2" style={{ top: y - step / 2, left: '50%' }}>
                  {stop.road === 'plane' ? <Plane dir="down" /> : <Heart />}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default function StoryRoadmap() {
  const r = storyRoadmap;
  return (
    <section aria-labelledby="roadmap-heading" className="overflow-x-clip bg-sand px-5 pb-16 pt-28 sm:px-12 sm:pb-24 sm:pt-32">
      <div className="mx-auto max-w-5xl">
        <header className="text-center">
          <p className="font-body text-xs font-semibold uppercase tracking-widest2 text-stone">{r.label}</p>
          <h2 id="roadmap-heading" className="mt-4 font-display text-display-4 italic text-bark">
            {r.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-md font-body text-base leading-relaxed text-umber">{r.intro}</p>
        </header>

        <div className="mt-6">
          <SnakeMap />
          {LAPS.map((l) => (
            <LapMap key={l.per} l={l} />
          ))}
        </div>

        <p className="mt-6 text-center">
          <a href="#full-story" className="font-hand text-2xl text-bark underline decoration-sage decoration-2 underline-offset-4 hover:decoration-bark">
            {r.readOn}
          </a>
        </p>
      </div>
    </section>
  );
}

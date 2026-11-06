import Image from 'next/image';
import { storyRoadmap, type RoadmapKind, type RoadmapStop } from '@/content/site';
import { ROAD_PATH, ROAD_VIEWBOX } from './roadmapRoad';

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


// Laptop: Lena's winding road (traced from her artwork) as a map, 900 px
// wide. Each stop has a pin on the road and its own clear space beside it
// for the picture and words. Positions are in the drawing's 1024 x 1536 space.
const MAP_W = 900;
const K = MAP_W / 1024;
type Spot = { pin: [number, number]; box: [number, number, number]; stack?: boolean };
const SPOTS: Spot[] = [
  { pin: [190, 230], box: [40, 36, 300] }, // born
  { pin: [430, 231], box: [365, 70, 200], stack: true }, // high school
  { pin: [650, 211], box: [600, 40, 300] }, // college
  { pin: [620, 298], box: [795, 262, 215], stack: true }, // break up, Leap 1.0
  { pin: [601, 432], box: [40, 300, 400] }, // Canada
  { pin: [450, 526], box: [330, 546, 440] }, // back to Sydney
  { pin: [250, 694], box: [40, 728, 330] }, // corporate career
  { pin: [561, 664], box: [400, 728, 200], stack: true }, // corporate job 2.0
  { pin: [740, 756], box: [850, 585, 165], stack: true }, // personal trainer, Leap 3.0
  { pin: [781, 872], box: [440, 924, 370] }, // burnout
  { pin: [854, 1047], box: [720, 1100, 290] }, // first solo trip to Bali
  { pin: [559, 1066], box: [330, 1100, 370] }, // the sign
  { pin: [197, 1079], box: [40, 885, 370] }, // uprooted to Bali, Leap 4.0
  { pin: [39, 1169], box: [80, 1100, 230], stack: true }, // Ubud, rock bottom 2.0
  { pin: [641, 1284], box: [730, 1335, 280] }, // turning point
  { pin: [455, 1460], box: [60, 1335, 360] }, // now
];

function ArtMap() {
  const stops = storyRoadmap.stops;
  return (
    <div className="relative mx-auto hidden lg:block" style={{ width: MAP_W, height: 1536 * K }}>
      <svg aria-hidden="true" viewBox={ROAD_VIEWBOX} className="absolute inset-0 h-full w-full">
        <path d={ROAD_PATH} fill="none" stroke="#7A6236" strokeWidth={22} strokeLinecap="round" strokeLinejoin="round" />
        <path d={ROAD_PATH} fill="none" stroke="#ffffff" strokeWidth={2.2} strokeDasharray="10 9" />
      </svg>
      <span aria-hidden="true" className="absolute -rotate-6 whitespace-nowrap font-hand text-2xl text-bark" style={{ left: 50 * K, top: 212 * K }}>
        {storyRoadmap.start}
      </span>
      <ol>
        {stops.map((stop, i) => {
          const s = SPOTS[i];
          if (!s) return null;
          return (
            <li key={stop.title}>
              <span className="absolute z-10 -translate-x-1/2 -translate-y-full" style={{ left: s.pin[0] * K, top: s.pin[1] * K + 3 }}>
                <Pin kind={stop.kind} />
              </span>
              <div
                className={`absolute flex ${s.stack ? 'flex-col items-center gap-2' : 'items-center gap-4'}`}
                style={{ left: s.box[0] * K, top: s.box[1] * K, width: s.box[2] * K }}
              >
                <span className="flex shrink-0 justify-center">
                  <Visual stop={stop} i={i} photoW="w-[5.25rem]" />
                </span>
                <StopText stop={stop} lines className={s.stack ? '' : '!text-left'} />
              </div>
            </li>
          );
        })}
      </ol>
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
    <div className="relative lg:hidden" style={{ height }}>
      <svg aria-hidden="true" viewBox={`0 0 100 ${height}`} preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
        <polyline points={pts.join(' ')} fill="none" stroke="#7A6236" strokeWidth={16} strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        <polyline points={pts.join(' ')} fill="none" stroke="#ffffff" strokeWidth={1.6} strokeDasharray="8 7" vectorEffect="non-scaling-stroke" />
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
          <ArtMap />
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

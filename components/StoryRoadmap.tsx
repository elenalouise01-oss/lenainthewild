import Image from 'next/image';
import DrawnLine from '@/components/DrawnLine';
import { storyRoadmap, type RoadmapKind, type RoadmapStop } from '@/content/site';

// "My story at a glance": Lena's life as a winding road. The dashed road runs
// across the page, U-turns at the edge and comes back the other way, like a
// road trip map, with the stops sitting along it: taped polaroids, washi tape
// naming each moment (Leap 1.0, Rock bottom...), passport stamps for each
// place, and paper planes and hearts on the road. Three stops a row on a
// laptop, two on a phone. Scrapbook feel, kept tidy.

const INK = '#3b2d0e';
const TAPE: Record<RoadmapKind, string> = {
  start: 'bg-zing-green',
  step: 'bg-white',
  leap: 'bg-zing-yellow',
  'rock bottom': 'bg-sage',
  low: 'bg-zing-babypink',
  sign: 'bg-zing-babypink',
  'turning point': 'bg-zing-green',
  now: 'bg-zing-yellow',
};

// Torn ends, like a strip of washi tape
const TAPE_EDGE =
  'polygon(0 8%, 3% 0, 97% 6%, 100% 0, 98% 35%, 100% 60%, 97% 85%, 100% 100%, 4% 94%, 0 100%, 2% 65%, 0 40%)';

function Tape({ text, kind, tilt }: { text: string; kind: RoadmapKind; tilt: string }) {
  return (
    <span
      className={`inline-block whitespace-nowrap ${tilt} ${TAPE[kind]} px-3 py-1 font-body text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-bark shadow-sm md:px-4 md:py-1.5 md:text-[0.65rem] md:tracking-widest2`}
      style={{ clipPath: TAPE_EDGE }}
    >
      {text}
    </span>
  );
}

function Heart({ className, fill }: { className: string; fill: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 22" className={className}>
      <path d="M12 21 C 4 14, 0 9, 4 4 C 7 1, 11 2, 12 6 C 13 2, 17 1, 20 4 C 24 9, 20 14, 12 21 Z" fill={fill} stroke={INK} strokeWidth={1.2} strokeLinejoin="round" />
    </svg>
  );
}

function PaperPlane({ className }: { className: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 44 32" className={className}>
      <path d="M2 15 L42 2 L18 20 Z" fill="#fbe1ea" stroke={INK} strokeWidth={1.3} strokeLinejoin="round" />
      <path d="M18 20 L42 2 L28 30 Z" fill="#efb7ca" stroke={INK} strokeWidth={1.3} strokeLinejoin="round" />
      <path d="M18 20 L17 29 L23 24" fill="none" stroke={INK} strokeWidth={1.3} strokeLinejoin="round" />
    </svg>
  );
}

function PaperClip({ className }: { className: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 52" className={className}>
      <path d="M6 16 V40 a6 6 0 0 0 12 0 V10 a5 5 0 0 0 -10 0 V38 a2 2 0 0 0 4 0 V16" fill="none" stroke="#7b776f" strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
}

// A passport stamp: two rings, the place around the top, a little plane in the middle
function Stamp({ text, className }: { text: string; className: string }) {
  const id = `stamp-${text.replace(/\W/g, '')}`;
  return (
    <svg aria-hidden="true" viewBox="0 0 100 100" className={className}>
      <defs>
        <path id={id} d="M 18 50 A 32 32 0 0 1 82 50" />
      </defs>
      <circle cx={50} cy={50} r={46} fill="#f1efe7" fillOpacity={0.85} stroke={INK} strokeOpacity={0.6} strokeWidth={2.5} />
      <circle cx={50} cy={50} r={38} fill="none" stroke={INK} strokeOpacity={0.6} strokeWidth={1} strokeDasharray="3 3" />
      <text fill={INK} fillOpacity={0.7} fontSize={12} fontWeight={700} letterSpacing={2} textAnchor="middle" className="font-body uppercase">
        <textPath href={`#${id}`} startOffset="50%">
          {text}
        </textPath>
      </text>
      <path d="M34 62 L66 52 L46 66 Z M46 66 L66 52 L54 74 Z" fill={INK} fillOpacity={0.6} />
    </svg>
  );
}

function Stop({ stop, index }: { stop: RoadmapStop; index: number }) {
  const tilt = index % 2 ? 'rotate-2' : '-rotate-2';
  const hearts = stop.kind === 'turning point' || stop.kind === 'now' || stop.kind === 'sign';
  return (
    <div className="flex flex-col items-center text-center">
      {stop.photo ? (
        <figure className={`relative w-28 bg-white p-1.5 pb-6 shadow-lg md:w-40 md:p-2 md:pb-8 ${index % 2 ? '-rotate-2' : 'rotate-2'}`}>
          {stop.flag && (
            <span className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 md:-top-4">
              <Tape text={stop.flag} kind={stop.kind} tilt={tilt} />
            </span>
          )}
          {index % 3 === 1 && !hearts && <PaperClip className="absolute -top-5 right-2 z-10 h-10 w-4 md:h-12 md:w-5" />}
          {hearts && (
            <span className="absolute -bottom-3 -right-4 z-10 flex">
              <Heart className="h-4 w-4 -rotate-12 md:h-5 md:w-5" fill="#fff6cf" />
              <Heart className="-ml-1 mt-2 h-5 w-5 rotate-12 md:h-6 md:w-6" fill="#efb7ca" />
            </span>
          )}
          <div className="relative aspect-square overflow-hidden bg-sand">
            <Image src={stop.photo.src} alt={stop.photo.alt} fill sizes="10rem" className="object-cover" style={{ objectPosition: stop.photo.pos }} />
          </div>
          <figcaption className="absolute inset-x-0 bottom-1 text-center font-hand text-sm text-bark md:bottom-1.5 md:text-base">{stop.photo.caption}</figcaption>
          {stop.stamp && <Stamp text={stop.stamp} className="absolute -bottom-5 -left-7 h-14 w-14 -rotate-12 md:-left-10 md:h-[4.5rem] md:w-[4.5rem]" />}
        </figure>
      ) : (
        <>
          {stop.stamp && <Stamp text={stop.stamp} className="mb-1 h-14 w-14 -rotate-12 md:h-[4.5rem] md:w-[4.5rem]" />}
          {stop.flag && <Tape text={stop.flag} kind={stop.kind} tilt={tilt} />}
        </>
      )}
      <p className={`font-hand text-xl text-stone md:text-2xl ${stop.photo || stop.flag ? 'mt-2 md:mt-3' : ''}`}>{stop.when}</p>
      <h3 className="mt-0.5 font-display text-base italic leading-snug text-bark md:text-xl">{stop.title}</h3>
      {stop.lines && (
        <ul className="mt-1.5 space-y-1 font-body text-xs leading-relaxed text-umber md:text-sm">
          {stop.lines.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

// One row of the road. The box is stretched to the row, so the road is
// drawn in a 100 x 100 space: across the bottom with a gentle wave, and for
// every row after the first, a U-turn down the side it comes in from.
function roadFor(row: number, end?: number) {
  const wave = (from: number, to: number) => `C ${from + (to - from) / 3} 94, ${from + ((to - from) * 2) / 3} 106, ${to} 100`;
  const across = row % 2 ? wave(100, end ?? 0) : wave(0, end ?? 100);
  return row % 2 ? `M100 0 C 109 0, 109 100, 100 100 ${across}` : `M0 0 C -9 0, -9 100, 0 100 ${across}`;
}

function Road({ per, className }: { per: number; className: string }) {
  const stops = storyRoadmap.stops;
  const rows: (RoadmapStop | null)[][] = [];
  for (let i = 0; i < stops.length; i += per) rows.push(stops.slice(i, i + per));
  return (
    <div className={className}>
      {rows.map((row, r) => {
        const rtl = r % 2 === 1;
        // Right to left rows run backwards, starting from the right
        const cells = rtl ? [...Array(per - row.length).fill(null), ...[...row].reverse()] : row;
        // The last row's road stops at the last stop, with a heart
        const last = r === rows.length - 1;
        const end = last ? (rtl ? 100 - ((row.length - 0.5) / per) * 100 : ((row.length - 0.5) / per) * 100) : undefined;
        return (
          <div key={r} className="relative">
            <DrawnLine viewBox="0 0 100 100" d={roadFor(r, end)} stretch bold className="absolute inset-0 h-full w-full overflow-visible" />
            {r === 0 && (
              <span aria-hidden="true" className="absolute -left-1.5 -top-1.5 h-3 w-3 rounded-full bg-bark">
                <span className="absolute bottom-4 left-0 -rotate-6 whitespace-nowrap font-hand text-2xl text-bark md:text-3xl">{storyRoadmap.start}</span>
              </span>
            )}
            {last && end !== undefined && (
              <span className="absolute -bottom-4 -translate-x-1/2" style={{ left: `${end}%` }}>
                <Heart className="h-8 w-8 md:h-9 md:w-9" fill="#efb7ca" />
              </span>
            )}
            <ol className="relative grid gap-x-3 pb-10 pt-12 md:gap-x-8 md:pb-14 md:pt-16" style={{ gridTemplateColumns: `repeat(${per}, minmax(0, 1fr))` }}>
              {cells.map((stop, c) =>
                stop ? (
                  <li key={stop.title} className="relative flex flex-col justify-end">
                    <Stop stop={stop} index={stops.indexOf(stop)} />
                    {/* On the road below: a paper plane for a move, a heart for the good bits */}
                    {stop.road === 'plane' && (
                      <PaperPlane className={`absolute -bottom-[3.2rem] h-7 w-9 md:-bottom-[4.1rem] md:h-9 md:w-12 ${rtl ? 'right-0 -scale-x-100' : 'left-0'}`} />
                    )}
                    {stop.road === 'heart' && <Heart className={`absolute -bottom-[3.05rem] h-6 w-6 md:-bottom-[3.95rem] md:h-7 md:w-7 ${rtl ? 'right-2' : 'left-2'}`} fill="#efb7ca" />}
                  </li>
                ) : (
                  <li key={`empty-${c}`} aria-hidden="true" />
                ),
              )}
            </ol>
          </div>
        );
      })}
    </div>
  );
}

export default function StoryRoadmap() {
  const r = storyRoadmap;
  return (
    <section aria-labelledby="roadmap-heading" className="overflow-x-clip bg-sand px-8 pb-24 pt-28 sm:px-14 sm:pb-32 sm:pt-36">
      <div className="mx-auto max-w-5xl">
        <header className="relative text-center">
          <p className="font-body text-xs font-semibold uppercase tracking-widest2 text-stone">{r.label}</p>
          <h2 id="roadmap-heading" className="mt-4 font-display text-display-4 italic text-bark">
            {r.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-md font-body text-base leading-relaxed text-umber">{r.intro}</p>
          {/* Paper planes either side of the heading, with looping trails */}
          <span aria-hidden="true" className="absolute -top-2 left-0 hidden items-end md:flex">
            <DrawnLine viewBox="0 0 90 50" d="M4 46 C 20 46, 30 20, 18 18 C 6 16, 14 40, 40 30 C 56 24, 70 14, 84 8" className="h-12 w-24" />
            <PaperPlane className="-ml-2 mb-6 h-8 w-11 -rotate-12" />
          </span>
          <span aria-hidden="true" className="absolute -top-2 right-0 hidden -scale-x-100 items-end md:flex">
            <DrawnLine viewBox="0 0 90 50" d="M4 46 C 20 46, 30 20, 18 18 C 6 16, 14 40, 40 30 C 56 24, 70 14, 84 8" className="h-12 w-24" />
            <PaperPlane className="-ml-2 mb-6 h-8 w-11 -rotate-12" />
          </span>
        </header>

        <div className="mt-20 md:mt-16">
          <Road per={2} className="md:hidden" />
          <Road per={3} className="hidden md:block" />
        </div>

        <p className="mt-20 text-center">
          <a href="#full-story" className="font-hand text-2xl text-bark underline decoration-sage decoration-2 underline-offset-4 hover:decoration-bark">
            {r.readOn}
          </a>
        </p>
      </div>
    </section>
  );
}

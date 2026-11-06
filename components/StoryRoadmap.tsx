import Image from 'next/image';
import DrawnLine from '@/components/DrawnLine';
import { storyRoadmap, type RoadmapKind, type RoadmapStop } from '@/content/site';

// "My story at a glance": Lena's life as a winding road, like a little road
// trip map. A dashed road snakes across the page and back; at each stop a year flag stands on the road, with a pinned polaroid,
// a strip of tape naming the moment (Leap 1.0, Rock bottom...) and place
// stickers. Three stops a row on a laptop, two on a phone, kept tight so it
// reads at a glance.

const INK = '#3b2d0e';
// Flag and tape colours for each kind of moment
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

// Torn ends, like a strip of washi tape
const TAPE_EDGE =
  'polygon(0 8%, 3% 0, 97% 6%, 100% 0, 98% 35%, 100% 60%, 97% 85%, 100% 100%, 4% 94%, 0 100%, 2% 65%, 0 40%)';

function Tape({ text, kind, tilt }: { text: string; kind: RoadmapKind; tilt: string }) {
  return (
    <span
      className={`inline-block whitespace-nowrap ${tilt} ${COLOUR[kind].bg} px-2.5 py-0.5 font-body text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-bark shadow-sm md:px-3 md:py-1 md:text-[0.62rem]`}
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

// A map pin, like on a travel map
function Pin({ className }: { className: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 32" className={className}>
      <path d="M12 31 C 12 31, 2 19, 2 11.5 A 10 10 0 0 1 22 11.5 C 22 19, 12 31, 12 31 Z" fill="#efb7ca" stroke={INK} strokeWidth={1.4} />
      <circle cx={12} cy={11.5} r={3.8} fill="#ffffff" stroke={INK} strokeWidth={1.2} />
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

// A place sticker: a round lilac stamp with a white die-cut border, the
// place around the top and a little plane in the middle
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
      <text fill={INK} fontSize={12.5} fontWeight={700} letterSpacing={2} textAnchor="middle" className="font-body uppercase">
        <textPath href={`#${id}`} startOffset="50%">
          {text}
        </textPath>
      </text>
      <path d="M36 64 L66 55 L47 68 Z M47 68 L66 55 L55 75 Z" fill={INK} />
    </svg>
  );
}

// The year, on a little pennant flag standing on the road
function YearFlag({ when, kind, flip }: { when: string; kind: RoadmapKind; flip: boolean }) {
  return (
    <span aria-hidden="true" className={`absolute bottom-0 flex items-start ${flip ? 'right-[12%] flex-row-reverse' : 'left-[12%]'}`}>
      <span className="block h-11 w-[2px] rounded-full bg-bark md:h-14" />
      <span
        className="-mt-px whitespace-nowrap px-2.5 py-0.5 font-hand text-sm leading-tight text-bark shadow-sm md:px-3 md:text-base"
        style={{
          background: COLOUR[kind].hex,
          clipPath: flip ? 'polygon(0 50%, 12% 0, 100% 0, 100% 100%, 12% 100%)' : 'polygon(0 0, 100% 0, 88% 50%, 100% 100%, 0 100%)',
          paddingLeft: flip ? '0.9rem' : undefined,
          paddingRight: flip ? undefined : '0.9rem',
        }}
      >
        {when}
      </span>
    </span>
  );
}

function Stop({ stop, index }: { stop: RoadmapStop; index: number }) {
  const tilt = index % 2 ? 'rotate-2' : '-rotate-2';
  const hearts = stop.kind === 'turning point' || stop.kind === 'now' || stop.kind === 'sign';
  return (
    <div className="flex flex-col items-center text-center">
      {stop.photo ? (
        <figure className={`relative w-24 bg-white p-1.5 pb-5 shadow-md md:w-32 md:pb-6 ${index % 2 ? '-rotate-2' : 'rotate-2'}`}>
          {stop.flag && (
            <span className="absolute -top-2.5 left-1/2 z-10 -translate-x-1/2">
              <Tape text={stop.flag} kind={stop.kind} tilt={tilt} />
            </span>
          )}
          <Pin className="absolute -right-4 -top-6 z-20 h-7 w-5 rotate-12 md:h-8 md:w-6" />
          {hearts && (
            <span className="absolute -bottom-3 -right-4 z-10 flex">
              <Heart className="h-4 w-4 -rotate-12" fill="#fff6cf" />
              <Heart className="-ml-1 mt-2 h-5 w-5 rotate-12" fill="#efb7ca" />
            </span>
          )}
          <div className="relative aspect-square overflow-hidden bg-sand">
            <Image src={stop.photo.src} alt={stop.photo.alt} fill sizes="8rem" className="object-cover" style={{ objectPosition: stop.photo.pos }} />
          </div>
          <figcaption className="absolute inset-x-0 bottom-0.5 text-center font-hand text-xs text-bark md:bottom-1 md:text-sm">{stop.photo.caption}</figcaption>
          {stop.stamp && <Stamp text={stop.stamp} className="absolute -bottom-4 -left-6 h-12 w-12 -rotate-12 md:-left-8 md:h-14 md:w-14" />}
        </figure>
      ) : (
        <span className="flex items-center gap-1">
          {stop.stamp && <Stamp text={stop.stamp} className="h-12 w-12 -rotate-12 md:h-14 md:w-14" />}
          {stop.flag && <Tape text={stop.flag} kind={stop.kind} tilt={tilt} />}
        </span>
      )}
      <p className="sr-only">{stop.when}</p>
      <h3 className={`font-display text-sm italic leading-snug text-bark md:text-lg ${stop.photo ? 'mt-3' : 'mt-2'}`}>{stop.title}</h3>
      {stop.lines && (
        <ul className="mt-1 space-y-0.5 font-body text-[0.68rem] leading-snug text-umber md:text-[0.8rem]">
          {stop.lines.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

// One row of the road, drawn in a 100 x 100 box stretched to the row: across
// the bottom with a gentle wave, after a U-turn down the side it comes in from.
function roadFor(row: number, end?: number) {
  const wave = (from: number, to: number) => `C ${from + (to - from) / 3} 92, ${from + ((to - from) * 2) / 3} 108, ${to} 100`;
  const across = row % 2 ? wave(100, end ?? 0) : wave(0, end ?? 100);
  return row % 2 ? `M100 0 C 111 0, 111 100, 100 100 ${across}` : `M0 0 C -11 0, -11 100, 0 100 ${across}`;
}

// The road itself: a dashed line that draws itself as you scroll
function RoadBand({ d }: { d: string }) {
  return <DrawnLine viewBox="0 0 100 100" d={d} stretch bold className="absolute inset-0 h-full w-full overflow-visible" />;
}

function Road({ per, className }: { per: number; className: string }) {
  const stops = storyRoadmap.stops;
  const rows: RoadmapStop[][] = [];
  for (let i = 0; i < stops.length; i += per) rows.push(stops.slice(i, i + per));
  return (
    <div className={className}>
      {rows.map((row, r) => {
        const rtl = r % 2 === 1;
        // Right to left rows run backwards, starting from the right
        const cells: (RoadmapStop | null)[] = rtl ? [...Array(per - row.length).fill(null), ...[...row].reverse()] : row;
        // The last row's road stops at the last stop, with a heart
        const last = r === rows.length - 1;
        const end = last ? (rtl ? 100 - ((row.length - 0.5) / per) * 100 : ((row.length - 0.5) / per) * 100) : undefined;
        return (
          <div key={r} className="relative">
            <RoadBand d={roadFor(r, end)} />
            {r === 0 && (
              <span aria-hidden="true" className="absolute -left-2 -top-2 z-10">
                <span className="block h-4 w-4 rounded-full border-2 border-bark bg-zing-yellow" />
                <span className="absolute bottom-5 left-0 -rotate-6 whitespace-nowrap font-hand text-2xl text-bark md:text-3xl">{storyRoadmap.start}</span>
              </span>
            )}
            {last && end !== undefined && (
              <span className="absolute -bottom-4 z-10 -translate-x-1/2" style={{ left: `${end}%` }}>
                <Heart className="h-8 w-8 md:h-9 md:w-9" fill="#efb7ca" />
              </span>
            )}
            <ol className="relative grid gap-x-2 pb-16 pt-9 md:gap-x-8 md:pb-20 md:pt-10" style={{ gridTemplateColumns: `repeat(${per}, minmax(0, 1fr))` }}>
              {cells.map((stop, c) =>
                stop ? (
                  <li key={stop.title} className="relative flex flex-col justify-end">
                    <Stop stop={stop} index={stops.indexOf(stop)} />
                    {/* Standing on the road: the year flag, and a paper plane for a move */}
                    <span className="absolute -bottom-16 left-0 right-0 h-16 md:-bottom-20 md:h-20">
                      <YearFlag when={stop.when} kind={stop.kind} flip={rtl} />
                      {stop.road === 'plane' && (
                        <PaperPlane className={`absolute -bottom-3 h-6 w-8 md:h-8 md:w-11 ${rtl ? 'left-[8%] -scale-x-100' : 'right-[8%]'}`} />
                      )}
                      {stop.road === 'heart' && <Heart className={`absolute -bottom-3 h-6 w-6 ${rtl ? 'left-[10%]' : 'right-[10%]'}`} fill="#efb7ca" />}
                    </span>
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
    <section aria-labelledby="roadmap-heading" className="overflow-x-clip bg-sand px-8 pb-20 pt-28 sm:px-14 sm:pb-28 sm:pt-32">
      <div className="mx-auto max-w-5xl">
        <header className="relative text-center">
          <p className="font-body text-xs font-semibold uppercase tracking-widest2 text-stone">{r.label}</p>
          <h2 id="roadmap-heading" className="mt-4 font-display text-display-4 italic text-bark">
            {r.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-md font-body text-base leading-relaxed text-umber">{r.intro}</p>
          <PaperPlane className="absolute -top-2 left-[6%] hidden h-9 w-12 -rotate-12 md:block" />
          <PaperPlane className="absolute -top-2 right-[6%] hidden h-9 w-12 -scale-x-100 rotate-12 md:block" />
        </header>

        <div className="mt-20 md:mt-16">
          <Road per={2} className="md:hidden" />
          <Road per={3} className="hidden md:block" />
        </div>

        <p className="mt-16 text-center">
          <a href="#full-story" className="font-hand text-2xl text-bark underline decoration-sage decoration-2 underline-offset-4 hover:decoration-bark">
            {r.readOn}
          </a>
        </p>
      </div>
    </section>
  );
}

import Image from 'next/image';
import Link from 'next/link';
import DrawnLine from '@/components/DrawnLine';
import LeadDown from './LeadDown';
import TapeMark from '@/components/TapeMark';
import {
  AUTHORITY_CENTER,
  AUTHORITY_FOR,
  EGO_VARIANTS,
  authorities,
  intuitionBlueprint as copy,
} from '@/content/intuitionBlueprint';
import type { AuthorityKey } from '@/lib/intuition/bodygraph';
import type { CenterId } from './BodygraphArt';
import { IllustrationArt } from './BodygraphIllustration';

const CENTRE_IDS: CenterId[] = ['head', 'ajna', 'throat', 'g', 'heart', 'solarPlexus', 'sacral', 'spleen', 'root'];

const label = 'font-body text-[0.65rem] font-semibold uppercase tracking-[0.35em]';
const body = 'font-body text-base leading-[1.85] text-umber sm:text-[1.05rem]';
const YELLOW_TAPE = 'rgba(255,251,160,0.95)';

// One authority's result: the reveal with their chart, then the guide.
// Used for a freshly calculated result and for the saved guide pages, so
// every authority shares one layout.
export default function AuthorityResult({
  authority,
  chart,
  generic = false,
  lead = copy.reveal.scribble,
  eyebrow = copy.reveal.label,
  headingId,
}: {
  authority: AuthorityKey;
  // Their calculated chart, to draw. Guide pages leave it out.
  chart?: { centerIds: CenterId[]; links: [CenterId, CenterId][]; caption: string };
  // Guide pages: general content, no Ego variant note
  generic?: boolean;
  lead?: string;
  eyebrow?: string;
  headingId?: string;
}) {
  const a = authorities[AUTHORITY_FOR[authority]];
  const variant = !generic && (authority === 'ego-manifested' || authority === 'ego-projected') ? EGO_VARIANTS[authority] : null;
  const where = AUTHORITY_CENTER[authority];
  const shortName = a.name.replace(/ Authority$/, '');

  return (
    <article>
      {/* The reveal */}
      <header className="overflow-hidden bg-bark px-6 pb-20 pt-16 text-cream sm:px-12 sm:pb-28 sm:pt-24">
        <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="relative mx-auto w-full max-w-[22rem] lg:order-none">
            <div className="rounded-[1.75rem] bg-cream px-5 pb-5 pt-6 shadow-2xl">
              <svg
                viewBox="0 0 600 660"
                className="mx-auto h-auto w-full"
                role="img"
                aria-label={chart ? 'Your Human Design chart, with your defined centres coloured in and your open centres white' : `A Human Design chart, highlighting the ${a.name.toLowerCase()} centre`}
              >
                <IllustrationArt
                  open={CENTRE_IDS.filter((c) => !(chart ? chart.centerIds : where.center ? [where.center] : []).includes(c))}
                  highlight={where.center}
                />
              </svg>
              <p className="mt-3 text-center font-type text-[0.7rem] leading-snug text-bark">{chart ? chart.caption : a.name.toLowerCase()}</p>
            </div>
            <div className="relative mt-2 flex items-start gap-1 pl-4">
              <DrawnLine
                viewBox="0 0 90 70"
                d="M80 64 C 60 60, 30 50, 22 10"
                arrow="M12 20 L22 8 L32 20"
                colour="#fffef5"
                className="h-14 w-20 shrink-0"
              />
              <p className="pt-8 font-hand text-xl leading-tight text-zing-yellow">{where.note}</p>
            </div>
          </div>

          <div className="text-center lg:text-left">
            <p className={`${label} text-sage`}>{eyebrow}</p>
            {lead && <p className="mt-6 font-hand text-3xl text-zing-yellow sm:text-4xl">{lead}</p>}
            <h1 id={headingId} tabIndex={-1} className="mt-2 font-display text-[3.6rem] leading-[0.88] tracking-tight focus:outline-none sm:text-8xl lg:text-[7.5rem]">
              {shortName}
              <br />
              <em className="text-zing-yellow">Authority</em>
            </h1>
            {a.alsoCalled && <p className="mt-5 font-body text-sm text-cream/60">Also called {a.alsoCalled}</p>}
            <p className="mx-auto mt-8 max-w-md font-display text-2xl italic leading-snug text-cream/90 lg:mx-0 sm:text-3xl">{a.oneLine}</p>
          </div>
        </div>
      </header>

      {/* The guide */}
      <div className="bg-cream px-6 pt-20 sm:px-12 sm:pt-28">
        <div className="mx-auto max-w-3xl">
          <section>
            <h2 className="font-display text-4xl text-bark sm:text-5xl">
              <TapeMark>{copy.result.meaningLabel}</TapeMark>
            </h2>
            <p className="mt-8 border-l-4 border-sage bg-sage/15 px-5 py-4 font-body text-base leading-relaxed text-bark sm:text-[1.05rem]">
              <span className="block font-body text-[0.65rem] font-semibold uppercase tracking-widest2 text-stone">{copy.result.whereLabel}</span>
              <span className="mt-1 block font-display text-xl italic leading-snug">{a.where}</span>
            </p>
            <div className="mt-6 space-y-5">
              {a.meaning.map((p) => (
                <p key={p.slice(0, 30)} className={body}>
                  {p}
                </p>
              ))}
              {variant && <p className={`${body} border-l-4 border-sage pl-5`}>{variant}</p>}
            </div>
          </section>

          <LeadDown />

          <section>
            <h2 className="font-display text-4xl text-bark sm:text-5xl">
              <TapeMark colour={YELLOW_TAPE}>{copy.result.decisionsLabel}</TapeMark>
            </h2>
            <ul className="mt-8 space-y-4">
              {a.decisions.map((p) => (
                <li key={p.slice(0, 30)} className="grid grid-cols-[1.75rem_1fr] items-baseline">
                  <span className="font-hand text-2xl text-bark" aria-hidden="true">
                    →
                  </span>
                  <span className="font-display text-xl leading-snug text-bark sm:text-2xl">{p}</span>
                </li>
              ))}
            </ul>
          </section>

          <LeadDown />

          <section className="-rotate-1 bg-zing-babypink px-6 py-12 shadow-sm sm:px-12">
            <div className="rotate-1">
              <h2 className="font-display text-4xl italic text-bark sm:text-5xl">{copy.result.promptsLabel}</h2>
              <p className="mt-3 font-hand text-xl text-bark/80">{copy.result.promptsIntro}</p>
              <ol className="mt-8 space-y-6">
                {a.prompts.map((q, i) => (
                  <li key={q.slice(0, 30)} className="grid grid-cols-[2.5rem_1fr] items-baseline gap-2">
                    <span className="font-hand text-3xl text-bark">{i + 1}.</span>
                    <span className="font-display text-xl leading-snug text-bark sm:text-2xl">{q}</span>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <LeadDown />

          <section className="bg-sage/40 p-3">
            <div className="border-2 border-dashed border-bark/40 px-6 py-10 sm:px-10">
              <p className={`${label} text-bark/70`}>{copy.result.exerciseLabel}</p>
              <h2 className="mt-4 font-display text-3xl italic text-bark sm:text-5xl">{a.exercise.title}</h2>
              <ol className="mt-8 space-y-4">
                {a.exercise.steps.map((s, i) => (
                  <li key={s.slice(0, 30)} className="grid grid-cols-[2rem_1fr] items-baseline">
                    <span className="font-hand text-2xl text-bark">{i + 1}</span>
                    <span className={body}>{s}</span>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <p className="mx-auto mt-14 max-w-xl text-center font-hand text-2xl leading-snug text-bark">{copy.result.reminder}</p>

          <aside className="mx-auto mt-14 max-w-xl border-t border-dashed border-bark/30 pt-10 text-center">
            <p className={`${label} text-stone`}>{copy.book.label}</p>
            <p className="mt-4 font-body text-base leading-relaxed text-umber sm:text-lg">
              {copy.book.line}{' '}
              <a href={copy.book.href} target="_blank" rel="noopener noreferrer" className="font-display italic text-bark underline decoration-sage decoration-2 underline-offset-4 hover:decoration-bark">
                {copy.book.title}
              </a>{' '}
              by {copy.book.author}.
            </p>
          </aside>
        </div>
      </div>
    </article>
  );
}

// The gentle next step under every result: the 5 Day Reconnect as a polaroid
export function BlueprintInvitation() {
  const inv = copy.invitation;
  return (
    <section className="bg-sand px-6 py-24 sm:px-12 sm:py-32">
      <div className="mx-auto grid max-w-5xl items-center gap-14 md:grid-cols-[0.8fr_1.2fr]">
        <div className="relative mx-auto w-56 sm:w-64">
          <Link href={inv.offer.href} className="block rotate-3 bg-white p-3 pb-12 shadow-xl transition-transform hover:rotate-0">
            <Image src={inv.offer.image} alt={`${inv.offer.title} cover art`} width={400} height={400} className="h-auto w-full" />
            <span className="absolute bottom-3 left-0 right-0 text-center font-hand text-xl text-bark">{inv.offer.title}</span>
          </Link>
          <p className="absolute -left-6 -top-10 -rotate-6 font-hand text-2xl text-bark">{inv.offer.scribble}</p>
          <DrawnLine viewBox="0 0 60 60" d="M8 6 C 10 30, 24 44, 50 50" arrow="M40 42 L52 50 L40 58" className="absolute -left-2 -top-4 h-12 w-12" />
        </div>
        <div className="text-center md:text-left">
          <p className={`${label} text-stone`}>{inv.label}</p>
          <h2 className="mt-5 font-display text-4xl leading-tight text-bark sm:text-6xl">{inv.heading}</h2>
          <p className={`mx-auto mt-5 max-w-lg md:mx-0 ${body}`}>{inv.body}</p>
          <p className={`mx-auto mt-4 max-w-lg md:mx-0 ${body}`}>{inv.offer.body}</p>
          <Link
            href={inv.offer.href}
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-sage px-8 py-4 font-body text-[0.7rem] font-semibold uppercase tracking-widest2 text-bark transition-opacity hover:opacity-85"
          >
            {inv.offer.cta} →
          </Link>
          <ul className="mt-10 flex flex-col items-center gap-3 md:items-start">
            {inv.links
              .filter((l) => l.href !== inv.offer.href)
              .map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="border-b border-bark/40 pb-1 font-body text-sm text-bark transition-opacity hover:opacity-60">
                    {l.label} →
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

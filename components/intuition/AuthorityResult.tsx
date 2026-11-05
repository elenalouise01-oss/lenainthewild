import Link from 'next/link';
import { AUTHORITY_FOR, EGO_VARIANTS, authorities, intuitionBlueprint as copy, type AuthorityContent } from '@/content/intuitionBlueprint';
import type { AuthorityKey } from '@/lib/intuition/bodygraph';

const label = 'font-body text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-stone';
const body = 'font-body text-base leading-[1.85] text-umber sm:text-[1.05rem]';

// One authority's guide. Used for a freshly calculated result and for the
// saved guide pages, so every authority shares the same layout.
export default function AuthorityResult({
  authority,
  content,
  lead,
  headingId,
  eyebrow = copy.reveal.label,
}: {
  // The small label at the top
  eyebrow?: string;
  // From a calculation: gives the exact authority, including the Ego variant
  authority?: AuthorityKey;
  // From a guide page: the guide's content
  content?: AuthorityContent;
  // Small line above the name, e.g. "You have"
  lead?: string;
  headingId?: string;
}) {
  const a = content ?? authorities[AUTHORITY_FOR[authority!]];
  const variant = authority === 'ego-manifested' || authority === 'ego-projected' ? EGO_VARIANTS[authority] : null;

  return (
    <article className="mx-auto max-w-3xl">
      <header className="text-center">
        <p className={label}>{eyebrow}</p>
        {lead && <p className="mt-6 font-display text-2xl italic text-bark sm:text-3xl">{lead}</p>}
        <h1 id={headingId} tabIndex={-1} className="mt-2 font-display text-5xl leading-[1] tracking-tight text-bark focus:outline-none sm:text-7xl">
          <span className="bg-[linear-gradient(transparent_62%,#fffba0_62%)] px-1">{a.name}</span>
        </h1>
        {a.alsoCalled && <p className="mt-4 font-body text-sm text-stone">Also called {a.alsoCalled}</p>}
        <p className="mx-auto mt-8 max-w-xl font-display text-2xl italic leading-snug text-bark sm:text-3xl">{a.oneLine}</p>
      </header>

      <section className="mt-20 grid gap-10 border-t border-bark/15 pt-10 sm:grid-cols-[11rem_1fr]">
        <h2 className={label}>{copy.result.meaningLabel}</h2>
        <div className="space-y-5">
          {a.meaning.map((p) => (
            <p key={p.slice(0, 30)} className={body}>
              {p}
            </p>
          ))}
          {variant && <p className={`${body} border-l-2 border-sage pl-5`}>{variant}</p>}
        </div>
      </section>

      <section className="mt-14 grid gap-10 border-t border-bark/15 pt-10 sm:grid-cols-[11rem_1fr]">
        <h2 className={label}>{copy.result.decisionsLabel}</h2>
        <div className="space-y-5">
          {a.decisions.map((p) => (
            <p key={p.slice(0, 30)} className={body}>
              {p}
            </p>
          ))}
        </div>
      </section>

      <section className="mt-14 bg-sand px-6 py-12 sm:px-12">
        <h2 className={label}>{copy.result.promptsLabel}</h2>
        <p className="mt-4 font-body text-sm text-stone">{copy.result.promptsIntro}</p>
        <ol className="mt-8 space-y-6">
          {a.prompts.map((q, i) => (
            <li key={q.slice(0, 30)} className="grid grid-cols-[2.5rem_1fr] items-baseline">
              <span className="font-display text-2xl italic text-sage">{String(i + 1).padStart(2, '0')}</span>
              <span className="font-display text-xl leading-snug text-bark sm:text-2xl">{q}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-14 border border-bark/15 px-6 py-12 sm:px-12">
        <p className={label}>{copy.result.exerciseLabel}</p>
        <h2 className="mt-4 font-display text-3xl italic text-bark sm:text-4xl">{a.exercise.title}</h2>
        <ol className="mt-8 space-y-4">
          {a.exercise.steps.map((s, i) => (
            <li key={s.slice(0, 30)} className="grid grid-cols-[2rem_1fr] items-baseline">
              <span className="font-body text-sm font-semibold text-bark">{i + 1}.</span>
              <span className={body}>{s}</span>
            </li>
          ))}
        </ol>
      </section>

      <p className="mx-auto mt-14 max-w-xl text-center font-body text-sm italic leading-relaxed text-stone">{copy.result.reminder}</p>
    </article>
  );
}

// The gentle next step, shown under every result
export function BlueprintInvitation() {
  const inv = copy.invitation;
  return (
    <section className="mx-auto mt-24 max-w-3xl bg-sage/25 px-6 py-14 text-center sm:px-12">
      <p className={label}>{inv.label}</p>
      <h2 className="mt-5 font-display text-4xl leading-tight text-bark sm:text-5xl">{inv.heading}</h2>
      <p className={`mx-auto mt-5 max-w-lg ${body}`}>{inv.body}</p>
      <ul className="mt-8 flex flex-col items-center gap-4">
        {inv.links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="border-b border-bark/40 pb-1 font-body text-sm text-bark transition-opacity hover:opacity-60">
              {l.label} →
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

import StoryConnector from '@/components/StoryConnector';
import TapeMark from '@/components/TapeMark';
import { CENTER_ORDER } from '@/components/intuition/centres';
import { OPEN_CENTRES, TYPE_SIGNALS, extras } from '@/content/intuitionBlueprint';
import type { HdType } from '@/lib/intuition/bodygraph';
import type { CenterId } from './BodygraphArt';

const body = 'font-body text-base leading-[1.85] text-umber sm:text-[1.05rem]';

// The two personal extras under a calculated result: the Type's feeling of
// being on track, and the open centres that can drown out their intuition.
export default function ChartExtras({ type, definedCenters }: { type: HdType; definedCenters: CenterId[] }) {
  const signal = TYPE_SIGNALS[type];
  const open = CENTER_ORDER.filter((c) => !definedCenters.includes(c));

  return (
    <div className="bg-cream px-6 sm:px-12">
      <div className="mx-auto max-w-3xl">
        <StoryConnector shape="swoop-right" />

        <section>
          <h2 className="font-display text-4xl text-bark sm:text-5xl">
            <TapeMark>{extras.signalsLabel}</TapeMark>
          </h2>
          <p className={`mt-6 ${body}`}>{extras.signalsIntro}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="bg-zing-green/70 px-6 py-6">
              <p className="font-hand text-xl text-bark">{extras.signatureLabel}</p>
              <p className="mt-1 font-display text-3xl italic text-bark">{signal.signature}</p>
            </div>
            <div className="bg-blush/60 px-6 py-6">
              <p className="font-hand text-xl text-bark">{extras.notSelfLabel}</p>
              <p className="mt-1 font-display text-3xl italic text-bark">{signal.notSelf}</p>
            </div>
          </div>
          <p className={`mt-6 ${body}`}>{signal.body}</p>
        </section>

        <StoryConnector shape="swoop-left" />

        <section>
          <h2 className="font-display text-4xl text-bark sm:text-5xl">
            <TapeMark colour="rgba(255,251,160,0.95)">{extras.openLabel}</TapeMark>
          </h2>
          {open.length ? (
            <>
              <p className={`mt-6 ${body}`}>{extras.openIntro}</p>
              <ul className="mt-8 divide-y divide-dashed divide-bark/30 border-y border-dashed border-bark/30">
                {open.map((c) => (
                  <li key={c} className="grid gap-1 py-5 sm:grid-cols-[13rem_1fr] sm:gap-6">
                    <span className="font-body text-[0.7rem] font-semibold uppercase tracking-widest2 text-stone">Open {OPEN_CENTRES[c].name}</span>
                    <span className="font-display text-xl italic leading-snug text-bark sm:text-2xl">{OPEN_CENTRES[c].question}</span>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className={`mt-6 ${body}`}>{extras.noOpen}</p>
          )}
        </section>
      </div>
    </div>
  );
}

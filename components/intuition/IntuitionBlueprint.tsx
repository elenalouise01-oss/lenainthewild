'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import DrawnLine from '@/components/DrawnLine';
import SpinningBadge from '@/components/SpinningBadge';
import TapeBanner from '@/components/TapeBanner';
import TapeMark from '@/components/TapeMark';
import { AUTHORITY_CENTER, AUTHORITY_FOR, authorities, intuitionBlueprint as copy } from '@/content/intuitionBlueprint';
import { validateBirthInput, type FieldErrors } from '@/lib/intuition/birthInput';
import type { CalculateOutcome, ChartSummary } from '@/lib/intuition/calculate';
import { isValidEmail } from '@/lib/intuition/email';
import { useReducedMotion } from '@/lib/useReducedMotion';
import AuthorityResult, { BlueprintInvitation } from './AuthorityResult';
import BodygraphArt from './BodygraphArt';
import ChartExtras from './ChartExtras';
import PlaceSearch, { type PickedPlace } from './PlaceSearch';

type Stage = 'intro' | 'birth' | 'email' | 'result';

const label = 'font-body text-[0.65rem] font-semibold uppercase tracking-[0.35em]';
const body = 'font-body text-base leading-[1.85] text-umber';
const pill =
  'inline-flex items-center justify-center gap-3 rounded-full px-9 py-4 font-body text-[0.7rem] font-semibold uppercase tracking-widest2 transition-opacity hover:opacity-85 disabled:cursor-wait disabled:opacity-60';
const quiet = 'font-body text-[0.7rem] font-semibold uppercase tracking-widest2 text-bark/70 underline-offset-4 hover:text-bark hover:underline';
const errorText = 'font-body text-sm font-medium text-[#8f2328]';
// The blanks in the sentence-style form
const blank =
  'w-full rounded-none border-0 border-b-2 bg-transparent px-1 py-1 font-display text-[1.9rem] italic text-bark placeholder:text-bark/35 focus:outline-none sm:w-auto sm:text-5xl [color-scheme:light]';

function today(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export default function IntuitionBlueprint() {
  const reduced = useReducedMotion();
  const [stage, setStage] = useState<Stage>('intro');
  const top = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  // Birth details
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [place, setPlace] = useState<PickedPlace | null>(null);
  const [offsetMinutes, setOffsetMinutes] = useState<number | undefined>();
  const [errors, setErrors] = useState<FieldErrors>({});
  const [ambiguous, setAmbiguous] = useState<{ offsetMinutes: number; label: string }[] | null>(null);
  const [notice, setNotice] = useState('');
  const [calculating, setCalculating] = useState(false);

  // Result
  const [chart, setChart] = useState<ChartSummary | null>(null);
  const [emailEnabled, setEmailEnabled] = useState(false);

  // Email
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [consent, setConsent] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [sending, setSending] = useState(false);
  const [sentTo, setSentTo] = useState('');
  const [sendFailed, setSendFailed] = useState(false);

  // Each new step starts at the top, with focus on its heading
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    top.current?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    // The new step appears once the old one has faded out, so wait for it
    let frames = 0;
    let raf = 0;
    const focusHeading = () => {
      const heading = document.getElementById(`step-${stage}`);
      if (heading) heading.focus({ preventScroll: true });
      else if (frames++ < 120) raf = requestAnimationFrame(focusHeading);
    };
    focusHeading();
    return () => cancelAnimationFrame(raf);
  }, [stage, reduced]);

  const birth = () => ({ date, time, placeId: place?.id, offsetMinutes });

  const calculate = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (calculating) return;
    setNotice('');
    const found = validateBirthInput(birth());
    setErrors(found);
    if (Object.keys(found).length) return;

    setCalculating(true);
    try {
      const res = await fetch('/api/intuition-blueprint/chart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(birth()),
      });
      const json = (await res.json()) as (CalculateOutcome & { emailEnabled?: boolean }) | { status: 'error'; message: string };
      if (json.status === 'ok') {
        setChart(json.chart);
        setEmailEnabled(Boolean(json.emailEnabled));
        setStage(json.emailEnabled ? 'email' : 'result');
      } else if (json.status === 'invalid') {
        setErrors(json.errors);
      } else if (json.status === 'ambiguous-time') {
        setAmbiguous(json.options);
      } else if (json.status === 'skipped-time') {
        setErrors({ time: copy.form.skippedTime });
      } else {
        setNotice(json.message || copy.form.error);
      }
    } catch {
      setNotice(copy.form.error);
    } finally {
      setCalculating(false);
    }
  };

  const sendGuide = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;
    const trimmed = email.trim();
    if (!isValidEmail(trimmed)) {
      setEmailError(copy.email.invalidEmail);
      return;
    }
    setEmailError('');
    setSendFailed(false);
    setSending(true);
    const company = (new FormData(e.currentTarget).get('company') as string) || '';
    try {
      const res = await fetch('/api/intuition-blueprint/guide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ birth: birth(), email: trimmed, firstName, marketingConsent: consent, company }),
      });
      const json = (await res.json()) as { ok: boolean; field?: string; message?: string };
      if (json.ok) {
        setSentTo(trimmed);
        setStage('result');
      } else if (json.field === 'email') {
        setEmailError(json.message || copy.email.invalidEmail);
      } else {
        setSendFailed(true);
        setStage('result');
      }
    } catch {
      setSendFailed(true);
      setStage('result');
    } finally {
      setSending(false);
    }
  };

  const restart = () => {
    setChart(null);
    setSentTo('');
    setSendFailed(false);
    setAmbiguous(null);
    setOffsetMinutes(undefined);
    setStage('birth');
  };

  const fade = reduced
    ? {}
    : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 }, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } };

  const content = chart ? authorities[AUTHORITY_FOR[chart.authority]] : null;
  const errorList = (['date', 'time', 'place'] as const).filter((k) => errors[k]);

  return (
    <div ref={top} className="scroll-mt-16">
      <AnimatePresence mode="wait" initial={false}>
        {stage === 'intro' && (
          <motion.div key="intro" {...fade}>
            {/* Opening: bold and dark, like the home page */}
            <section aria-labelledby="step-intro" className="overflow-hidden bg-bark px-6 pb-16 pt-14 text-cream sm:px-12 sm:pb-20 sm:pt-24">
              <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.25fr_1fr]">
                <div>
                  <p className={`${label} text-sage`}>{copy.label}</p>
                  <h1 id="step-intro" tabIndex={-1} className="mt-6 font-display text-[3.5rem] leading-[0.88] tracking-tight focus:outline-none sm:text-[7rem] lg:text-[8.5rem]">
                    The <em className="text-zing-yellow">Intuition</em>
                    <br />
                    Blueprint
                  </h1>
                  <p className="mt-8 max-w-lg font-display text-2xl italic leading-snug text-cream/90">{copy.subheading}</p>
                  <p className="mt-5 max-w-lg font-body text-base leading-[1.85] text-cream/75">{copy.intro}</p>
                  <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2">
                    <button type="button" onClick={() => setStage('birth')} className={`${pill} bg-sage text-bark`}>
                      {copy.cta} <span aria-hidden="true">→</span>
                    </button>
                    <span className="flex items-center gap-1" aria-hidden="true">
                      <DrawnLine viewBox="0 0 80 50" d="M76 30 C 56 44, 30 44, 8 22" arrow="M18 16 L6 20 L12 32" colour="#fffef5" className="h-10 w-16" />
                      <span className="-rotate-3 font-hand text-2xl text-zing-yellow">{copy.scribble}</span>
                    </span>
                  </div>
                </div>

                <div className="relative mx-auto w-64 sm:w-80">
                  <div className="rotate-[4deg] bg-white p-3 pb-14 shadow-2xl">
                    <div className="relative aspect-[4/5]">
                      <Image
                        src="/images/lena-sunrise-smile.jpg"
                        alt="Lena smiling over her shoulder at sunrise above the clouds"
                        fill
                        priority
                        sizes="20rem"
                        className="object-cover"
                        style={{ objectPosition: '82% 55%' }}
                      />
                    </div>
                    <p className="absolute bottom-4 left-0 right-0 text-center font-hand text-2xl text-bark">{copy.polaroidCaption}</p>
                  </div>
                  <SpinningBadge text={copy.badge} className="absolute -left-10 -top-10" />
                  <div className="absolute -bottom-8 -right-6 flex h-20 w-20 rotate-[-10deg] items-center justify-center rounded-full bg-sage shadow-lg sm:h-24 sm:w-24">
                    <Image src="/images/litw-logo-yellow.png" alt="" width={120} height={60} className="w-14 sm:w-16" />
                  </div>
                </div>
              </div>
            </section>
            <TapeBanner text={copy.tape} strip="bg-sage text-bark" className="-mt-8 bg-transparent" />

            {/* Human Design, for fresh eyes: short and sweet */}
            <section className="bg-cream px-6 pb-24 pt-16 sm:px-12 sm:pb-32 sm:pt-20">
              <div className="mx-auto max-w-5xl">
                <div className="grid items-start gap-12 md:grid-cols-[7rem_1fr_1fr] md:gap-10">
                  <div className="flex items-center gap-4 md:block">
                    <BodygraphArt className="w-20 shrink-0 md:w-24" defined={['throat', 'g', 'sacral', 'root']} definedLinks={[['throat', 'g'], ['sacral', 'root']]} fill="#CBA1D4" label="An example Human Design chart" />
                    <p className="font-hand text-lg leading-snug text-bark md:mt-3">
                      coloured in = defined
                      <br />
                      white = open
                    </p>
                  </div>
                  <div>
                    <h2 className="font-display text-3xl text-bark sm:text-4xl">
                      <TapeMark>{copy.explainer.what.label}</TapeMark>
                    </h2>
                    <p className={`mt-5 ${body}`}>{copy.explainer.what.body}</p>
                  </div>
                  <div>
                    <h2 className="font-display text-3xl text-bark sm:text-4xl">
                      <TapeMark colour="rgba(255,251,160,0.95)">{copy.explainer.focus.label}</TapeMark>
                    </h2>
                    <p className={`mt-5 ${body}`}>{copy.explainer.focus.body}</p>
                  </div>
                </div>
                <div className="mt-14 flex flex-col items-center gap-6 text-center">
                  <p className="max-w-2xl font-body text-sm leading-relaxed text-stone">
                    {copy.note.start} <TapeMark>{copy.note.tape}</TapeMark> {copy.note.end}
                  </p>
                  <button type="button" onClick={() => setStage('birth')} className={`${pill} bg-bark text-cream`}>
                    {copy.cta} <span aria-hidden="true">→</span>
                  </button>
                </div>
              </div>
            </section>
          </motion.div>
        )}

        {stage === 'birth' && (
          <motion.section key="birth" {...fade} aria-labelledby="step-birth" className="min-h-[90vh] bg-sage px-6 py-12 sm:px-12 sm:py-20">
            <div className="mx-auto max-w-5xl">
              <div className="flex items-center justify-between">
                <button type="button" onClick={() => setStage('intro')} className={quiet}>
                  ← {copy.form.back}
                </button>
                <p className={`${label} text-bark/70`} aria-hidden="true">
                  ● ○
                </p>
              </div>
              <p className={`${label} mt-12 text-bark/70`}>{copy.form.label}</p>
              <h1 id="step-birth" tabIndex={-1} className="mt-4 font-display text-3xl text-bark focus:outline-none sm:text-4xl">
                {copy.form.heading}
              </h1>

              <form onSubmit={calculate} noValidate className="mt-10">
                {/* The form reads as one sentence */}
                <div className="font-display text-[1.9rem] italic leading-[1.7] text-bark sm:text-5xl sm:leading-[1.6]">
                  <span>{copy.form.sentence.start} </span>
                  <label htmlFor="ib-date" className="sr-only">
                    {copy.form.dateLabel}
                  </label>
                  <input
                    id="ib-date"
                    type="date"
                    min="1900-01-01"
                    max={today()}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    aria-invalid={Boolean(errors.date)}
                    aria-describedby={errors.date ? 'ib-date-error' : undefined}
                    className={`${blank} ${errors.date ? 'border-[#8f2328]' : 'border-bark'} sm:min-w-[8.5em]`}
                  />
                  <span> {copy.form.sentence.at} </span>
                  <label htmlFor="ib-time" className="sr-only">
                    {copy.form.timeLabel}
                  </label>
                  <input
                    id="ib-time"
                    type="time"
                    value={time}
                    onChange={(e) => {
                      setTime(e.target.value);
                      setAmbiguous(null);
                      setOffsetMinutes(undefined);
                    }}
                    aria-invalid={Boolean(errors.time)}
                    aria-describedby={`ib-time-help${errors.time ? ' ib-time-error' : ''}`}
                    className={`${blank} ${errors.time ? 'border-[#8f2328]' : 'border-bark'} sm:min-w-[4.5em]`}
                  />
                  <span> {copy.form.sentence.in} </span>
                  <PlaceSearch
                    inline
                    value={place}
                    onChange={(p) => {
                      setPlace(p);
                      setAmbiguous(null);
                      setOffsetMinutes(undefined);
                    }}
                    label={copy.form.placeLabel}
                    placeholder="your town"
                    help={copy.form.placeHelp}
                    empty={copy.form.placeEmpty}
                    error={errors.place}
                    describedBy={`ib-place-help${errors.place ? ' ib-place-error' : ''}`}
                    inputClassName={`${blank} ${errors.place ? 'border-[#8f2328]' : 'border-bark'} sm:w-[11em]`}
                  />
                </div>

                {/* Handwritten note about the time */}
                <div className="mt-6 flex items-start gap-2" aria-hidden="true">
                  <DrawnLine viewBox="0 0 70 60" d="M60 56 C 40 54, 20 40, 16 8" arrow="M6 18 L16 6 L26 18" className="h-12 w-14 shrink-0" />
                  <p className="pt-6 font-hand text-2xl leading-tight text-bark">{copy.form.timeNote}</p>
                </div>

                {errorList.length > 0 && (
                  <ul className="mt-6 space-y-2 bg-white/60 px-5 py-4" aria-live="polite">
                    {errorList.map((k) => (
                      <li key={k} id={`ib-${k}-error`} className={errorText}>
                        {errors[k]}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-8 grid gap-4 font-body text-xs leading-relaxed text-bark/75 sm:grid-cols-2">
                  <p id="ib-time-help">{copy.form.timeHelp}</p>
                  <p id="ib-place-help">{copy.form.placeHelp}</p>
                </div>

                {ambiguous && (
                  <fieldset className="mt-8 bg-white/70 p-6">
                    <legend className="px-1 font-body text-sm text-bark">{copy.form.ambiguousTime}</legend>
                    <div className="mt-2 space-y-3">
                      {ambiguous.map((o) => (
                        <label key={o.offsetMinutes} className="flex cursor-pointer items-start gap-3 font-body text-sm text-umber">
                          <input
                            type="radio"
                            name="ib-offset"
                            checked={offsetMinutes === o.offsetMinutes}
                            onChange={() => setOffsetMinutes(o.offsetMinutes)}
                            className="mt-1 accent-bark"
                          />
                          {o.label}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                )}

                <div aria-live="polite" className="mt-6 min-h-[1.5rem]">
                  {notice && <p className={errorText}>{notice}</p>}
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-6">
                  <button type="submit" disabled={calculating || (ambiguous !== null && offsetMinutes === undefined)} className={`${pill} bg-bark text-cream`}>
                    {calculating ? (
                      <>
                        <span className="h-3 w-3 animate-spin rounded-full border-2 border-cream/40 border-t-cream" aria-hidden="true" />
                        {copy.form.calculating}
                      </>
                    ) : (
                      <>
                        {copy.form.submit} <span aria-hidden="true">→</span>
                      </>
                    )}
                  </button>
                  <p className="font-body text-xs text-bark/75">{copy.form.privacy}</p>
                </div>
                <p className="mt-10 font-body text-[0.65rem] text-bark/60">{copy.form.attribution}</p>
              </form>
            </div>
          </motion.section>
        )}

        {stage === 'email' && chart && content && (
          <motion.section key="email" {...fade} aria-labelledby="step-email" className="bg-zing-yellow px-6 py-14 sm:px-12 sm:py-20">
            <div className="mx-auto grid max-w-6xl items-start gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
              {/* The reveal: their authority and chart */}
              <div className="text-center lg:pt-6 lg:text-left">
                <p className={`${label} text-bark/70`}>{copy.reveal.label}</p>
                <p className="mt-5 font-hand text-3xl text-bark">{copy.reveal.scribble}</p>
                <p className="mt-1 font-display text-[3.4rem] leading-[0.88] tracking-tight text-bark sm:text-8xl">
                  {content.name.replace(/ Authority$/, '')}
                  <br />
                  <em>Authority</em>
                </p>
                <p className="mx-auto mt-6 max-w-md font-display text-2xl italic leading-snug text-bark lg:mx-0">{content.oneLine}</p>
                <div className="mx-auto mt-10 w-44 -rotate-3 bg-white px-4 pb-4 pt-5 shadow-xl lg:mx-0">
                  <BodygraphArt
                    defined={chart.centerIds}
                    definedLinks={chart.links}
                    highlight={AUTHORITY_CENTER[chart.authority].center}
                    fill="#CBA1D4"
                    label="Your Human Design chart"
                  />
                  <p className="mt-2 text-center font-type text-[0.6rem] text-bark">{copy.reveal.chartCaption}</p>
                </div>
              </div>

              {/* Step 2: email */}
              <div className="relative bg-white px-6 py-10 shadow-xl sm:px-10">
                <p className="absolute -top-9 right-4 rotate-3 font-hand text-2xl text-bark sm:right-10">{copy.email.scribble}</p>
                <p className={`${label} text-stone`}>{copy.email.label}</p>
                <h1 id="step-email" tabIndex={-1} className="mt-4 font-display text-3xl leading-tight text-bark focus:outline-none sm:text-4xl">
                  {copy.email.heading}
                </h1>
                <p className={`mt-5 ${body}`}>{copy.email.body}</p>

                <form onSubmit={sendGuide} noValidate className="mt-8 space-y-7">
                  {/* Spam trap: hidden from people, bots fill it in */}
                  <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                  <div>
                    <label htmlFor="ib-name" className="block font-body text-[0.7rem] font-semibold uppercase tracking-widest2 text-bark">
                      {copy.email.nameLabel}
                    </label>
                    <input
                      id="ib-name"
                      type="text"
                      autoComplete="given-name"
                      maxLength={60}
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="mt-2 w-full rounded-none border-0 border-b-2 border-bark/30 bg-transparent px-0 py-2 font-display text-2xl text-bark focus:border-bark focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="ib-email" className="block font-body text-[0.7rem] font-semibold uppercase tracking-widest2 text-bark">
                      {copy.email.emailLabel}
                    </label>
                    <input
                      id="ib-email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      aria-invalid={Boolean(emailError)}
                      aria-describedby={emailError ? 'ib-email-error' : undefined}
                      className={`mt-2 w-full rounded-none border-0 border-b-2 bg-transparent px-0 py-2 font-display text-2xl text-bark focus:outline-none ${
                        emailError ? 'border-[#8f2328]' : 'border-bark/30 focus:border-bark'
                      }`}
                    />
                    {emailError && (
                      <p id="ib-email-error" className={`mt-2 ${errorText}`}>
                        {emailError}
                      </p>
                    )}
                  </div>
                  <label className="flex cursor-pointer items-start gap-3 font-body text-sm leading-relaxed text-umber">
                    <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 h-4 w-4 shrink-0 accent-bark" />
                    {copy.email.consent}
                  </label>
                  <p className="font-body text-xs leading-relaxed text-stone">{copy.email.privacy}</p>
                  <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                    <button type="submit" disabled={sending} className={`${pill} bg-bark text-cream`}>
                      {sending ? copy.email.sending : copy.email.submit}
                    </button>
                    <button type="button" onClick={() => setStage('result')} className={quiet}>
                      {copy.email.skip}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </motion.section>
        )}

        {stage === 'result' && chart && (
          <motion.section key="result" {...fade} aria-labelledby="step-result">
            <div aria-live="polite">
              {sentTo && (
                <p role="status" className="bg-zing-green px-6 py-4 text-center font-body text-sm text-bark">
                  {copy.email.sent.replace('{email}', sentTo)}
                </p>
              )}
              {sendFailed && (
                <p role="alert" className="bg-blush px-6 py-4 text-center font-body text-sm text-bark">
                  {copy.email.failed}
                </p>
              )}
            </div>

            <AuthorityResult
              authority={chart.authority}
              headingId="step-result"
              chart={{ centerIds: chart.centerIds, links: chart.links, caption: `${copy.reveal.chartCaption} · ${chart.birth.localTime.split(',')[0]}` }}
            />
            <ChartExtras type={chart.type} definedCenters={chart.centerIds} />

            <div className="bg-cream px-6 pb-20 pt-16 sm:px-12">
              <aside className="mx-auto max-w-3xl border border-dashed border-bark/40 bg-sand/60 px-6 py-8 sm:px-10">
                <h2 className={`${label} text-stone`}>{copy.result.calculatedLabel}</h2>
                <dl className="mt-6 grid gap-x-10 gap-y-4 font-type text-sm text-bark sm:grid-cols-2">
                  <div>
                    <dt className="text-stone">{copy.result.birthLabel}</dt>
                    <dd>
                      {chart.birth.localTime} ({chart.birth.offset}), {chart.birth.place}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-stone">{copy.result.typeLabel}</dt>
                    <dd>{chart.type}</dd>
                  </div>
                  <div>
                    <dt className="text-stone">{copy.result.profileLabel}</dt>
                    <dd>{chart.profile}</dd>
                  </div>
                  <div>
                    <dt className="text-stone">{copy.result.centersLabel}</dt>
                    <dd>{chart.definedCenters.length ? chart.definedCenters.join(', ') : copy.result.noCenters}</dd>
                  </div>
                </dl>
                {chart.birth.approximateHistory && <p className="mt-6 font-body text-xs italic leading-relaxed text-stone">{copy.result.beforeNineteenSeventy}</p>}
                <div className="mt-8 flex flex-wrap gap-6 print:hidden">
                  <button type="button" onClick={() => window.print()} className={quiet}>
                    {copy.result.save}
                  </button>
                  {content && (
                    <a href={`/intuition-blueprint/${content.slug}`} className={quiet}>
                      {copy.result.guideLink}
                    </a>
                  )}
                  <button type="button" onClick={restart} className={quiet}>
                    {copy.result.again}
                  </button>
                  {!sentTo && emailEnabled && (
                    <button type="button" onClick={() => setStage('email')} className={quiet}>
                      {copy.result.emailMe}
                    </button>
                  )}
                </div>
              </aside>
            </div>

            <div className="print:hidden">
              <BlueprintInvitation />
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}

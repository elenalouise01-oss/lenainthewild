'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { AUTHORITY_FOR, authorities, intuitionBlueprint as copy } from '@/content/intuitionBlueprint';
import { validateBirthInput, type FieldErrors } from '@/lib/intuition/birthInput';
import type { CalculateOutcome, ChartSummary } from '@/lib/intuition/calculate';
import { isValidEmail } from '@/lib/intuition/email';
import { useReducedMotion } from '@/lib/useReducedMotion';
import AuthorityResult, { BlueprintInvitation } from './AuthorityResult';
import PlaceSearch, { type PickedPlace } from './PlaceSearch';

type Stage = 'intro' | 'birth' | 'email' | 'result';

const label = 'font-body text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-stone';
const fieldLabel = 'block font-body text-[0.7rem] font-semibold uppercase tracking-widest2 text-bark';
const input =
  'mt-3 w-full rounded-none border-b bg-transparent px-0 py-3 font-body text-lg text-bark placeholder:text-stone/70 focus:outline-none [color-scheme:light]';
const primary =
  'inline-flex items-center justify-center gap-3 rounded-full bg-bark px-9 py-4 font-body text-[0.7rem] font-semibold uppercase tracking-widest2 text-cream transition-opacity hover:opacity-85 disabled:cursor-wait disabled:opacity-60';
const quiet = 'font-body text-[0.7rem] font-semibold uppercase tracking-widest2 text-stone underline-offset-4 hover:text-bark hover:underline';
const errorText = 'mt-2 font-body text-sm text-[#a2363a]';

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

  return (
    <div ref={top} className="scroll-mt-20">
      <AnimatePresence mode="wait" initial={false}>
        {stage === 'intro' && (
          <motion.section key="intro" {...fade} aria-labelledby="step-intro">
            <div className="px-6 pb-24 pt-14 sm:px-12 sm:pb-36 sm:pt-24">
              <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
                <div>
                  <p className={label}>{copy.label}</p>
                  <h1 id="step-intro" tabIndex={-1} className="mt-8 font-display text-[3.3rem] leading-[0.95] tracking-tight text-bark focus:outline-none sm:text-8xl lg:text-[7rem]">
                    The Intuition
                    <br />
                    <em className="bg-[linear-gradient(transparent_60%,#fffba0_60%)] px-1">Blueprint</em>
                  </h1>
                  <p className="mt-10 max-w-lg font-display text-xl italic leading-snug text-bark sm:text-2xl">{copy.subheading}</p>
                  <p className="mt-6 max-w-lg font-body text-base leading-[1.85] text-umber">{copy.intro}</p>
                  <button type="button" onClick={() => setStage('birth')} className={`${primary} mt-10`}>
                    {copy.cta} <span aria-hidden="true">→</span>
                  </button>
                </div>
                <div className="relative mx-auto w-full max-w-md">
                  <div className="relative aspect-[4/5] overflow-hidden bg-linen">
                    <Image
                      src="/images/lena-sunrise-smile.jpg"
                      alt="Lena smiling over her shoulder at sunrise above the clouds"
                      fill
                      priority
                      sizes="(min-width: 1024px) 28rem, 90vw"
                      className="object-cover"
                      style={{ objectPosition: '82% 55%' }}
                    />
                  </div>
                  <p className="absolute -bottom-6 -left-4 rotate-[-4deg] bg-sage px-5 py-3 font-display text-lg italic text-bark shadow-sm sm:-left-10">
                    {copy.sticker}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-sand px-6 py-24 sm:px-12 sm:py-32">
              <div className="mx-auto max-w-6xl">
                <h2 className={label}>{copy.how.label}</h2>
                <ol className="mt-12 grid gap-12 sm:grid-cols-3 sm:gap-10">
                  {copy.how.steps.map((s, i) => (
                    <li key={s.title} className="border-t border-bark/20 pt-6">
                      <span className="font-display text-5xl italic text-sage">{String(i + 1).padStart(2, '0')}</span>
                      <h3 className="mt-4 font-display text-2xl text-bark">{s.title}</h3>
                      <p className="mt-3 font-body text-sm leading-relaxed text-umber">{s.body}</p>
                    </li>
                  ))}
                </ol>
                <p className="mt-16 max-w-2xl font-body text-sm italic leading-relaxed text-stone">{copy.note}</p>
                <button type="button" onClick={() => setStage('birth')} className={`${primary} mt-10`}>
                  {copy.cta} <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>
          </motion.section>
        )}

        {stage === 'birth' && (
          <motion.section key="birth" {...fade} aria-labelledby="step-birth" className="px-6 py-16 sm:px-12 sm:py-24">
            <div className="mx-auto max-w-xl">
              <button type="button" onClick={() => setStage('intro')} className={quiet}>
                ← {copy.form.back}
              </button>
              <p className={`${label} mt-12`}>{copy.form.label}</p>
              <h1 id="step-birth" tabIndex={-1} className="mt-5 font-display text-4xl leading-tight text-bark focus:outline-none sm:text-6xl">
                {copy.form.heading}
              </h1>

              <form onSubmit={calculate} noValidate className="mt-12 space-y-10">
                <div>
                  <label htmlFor="ib-date" className={fieldLabel}>
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
                    className={`${input} ${errors.date ? 'border-rose' : 'border-bark/30 focus:border-bark'}`}
                  />
                  {errors.date && (
                    <p id="ib-date-error" className={errorText}>
                      {errors.date}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="ib-time" className={fieldLabel}>
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
                    className={`${input} ${errors.time ? 'border-rose' : 'border-bark/30 focus:border-bark'}`}
                  />
                  <p id="ib-time-help" className="mt-2 font-body text-xs leading-relaxed text-stone">
                    {copy.form.timeHelp}
                  </p>
                  {errors.time && (
                    <p id="ib-time-error" className={errorText}>
                      {errors.time}
                    </p>
                  )}
                </div>

                <PlaceSearch
                  value={place}
                  onChange={(p) => {
                    setPlace(p);
                    setAmbiguous(null);
                    setOffsetMinutes(undefined);
                  }}
                  label={copy.form.placeLabel}
                  placeholder={copy.form.placePlaceholder}
                  help={copy.form.placeHelp}
                  empty={copy.form.placeEmpty}
                  error={errors.place}
                />

                {ambiguous && (
                  <fieldset className="border border-bark/15 bg-sand p-6">
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

                <p className="font-body text-xs text-stone">{copy.form.privacy}</p>

                <div aria-live="polite" className="min-h-[1.5rem]">
                  {notice && <p className={errorText}>{notice}</p>}
                  {calculating && <p className="font-body text-sm text-stone">{copy.form.calculating}</p>}
                </div>

                <button type="submit" disabled={calculating || (ambiguous !== null && offsetMinutes === undefined)} className={primary}>
                  {calculating ? (
                    <>
                      <span className="h-3 w-3 animate-spin rounded-full border-2 border-cream/40 border-t-cream" aria-hidden="true" />
                      {copy.form.calculating}
                    </>
                  ) : (
                    copy.form.submit
                  )}
                </button>
                <p className="font-body text-[0.65rem] text-stone/80">{copy.form.attribution}</p>
              </form>
            </div>
          </motion.section>
        )}

        {stage === 'email' && chart && content && (
          <motion.section key="email" {...fade} aria-labelledby="step-email" className="px-6 py-16 sm:px-12 sm:py-24">
            <div className="mx-auto max-w-2xl text-center">
              <p className={label}>{copy.reveal.label}</p>
              <p className="mt-6 font-display text-2xl italic text-bark sm:text-3xl">{copy.reveal.prefix}</p>
              <p className="mt-2 font-display text-5xl leading-none tracking-tight text-bark sm:text-7xl">
                <span className="bg-[linear-gradient(transparent_62%,#fffba0_62%)] px-1">{content.name}</span>
              </p>
              <p className="mx-auto mt-8 max-w-lg font-display text-xl italic leading-snug text-bark sm:text-2xl">{content.oneLine}</p>
            </div>

            <div className="mx-auto mt-16 max-w-xl border-t border-bark/15 pt-14">
              <p className={label}>{copy.email.label}</p>
              <h1 id="step-email" tabIndex={-1} className="mt-5 font-display text-4xl leading-tight text-bark focus:outline-none sm:text-5xl">
                {copy.email.heading}
              </h1>
              <p className="mt-6 font-body text-base leading-[1.85] text-umber">{copy.email.body}</p>

              <form onSubmit={sendGuide} noValidate className="mt-10 space-y-8">
                {/* Spam trap: hidden from people, bots fill it in */}
                <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                <div>
                  <label htmlFor="ib-name" className={fieldLabel}>
                    {copy.email.nameLabel}
                  </label>
                  <input
                    id="ib-name"
                    type="text"
                    autoComplete="given-name"
                    maxLength={60}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className={`${input} border-bark/30 focus:border-bark`}
                  />
                </div>
                <div>
                  <label htmlFor="ib-email" className={fieldLabel}>
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
                    className={`${input} ${emailError ? 'border-rose' : 'border-bark/30 focus:border-bark'}`}
                  />
                  {emailError && (
                    <p id="ib-email-error" className={errorText}>
                      {emailError}
                    </p>
                  )}
                </div>
                <label className="flex cursor-pointer items-start gap-3 font-body text-sm leading-relaxed text-umber">
                  <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 h-4 w-4 shrink-0 accent-bark" />
                  {copy.email.consent}
                </label>
                <p className="font-body text-xs leading-relaxed text-stone">{copy.email.privacy}</p>
                <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
                  <button type="submit" disabled={sending} className={primary}>
                    {sending ? copy.email.sending : copy.email.submit}
                  </button>
                  <button type="button" onClick={() => setStage('result')} className={quiet}>
                    {copy.email.skip}
                  </button>
                </div>
              </form>
            </div>
          </motion.section>
        )}

        {stage === 'result' && chart && (
          <motion.section key="result" {...fade} aria-labelledby="step-result" className="px-6 py-16 sm:px-12 sm:py-24">
            <div aria-live="polite">
              {sentTo && (
                <p role="status" className="mx-auto mb-14 max-w-2xl bg-zing-green/60 px-6 py-4 text-center font-body text-sm text-bark">
                  {copy.email.sent.replace('{email}', sentTo)}
                </p>
              )}
              {sendFailed && (
                <p role="alert" className="mx-auto mb-14 max-w-2xl bg-blush/60 px-6 py-4 text-center font-body text-sm text-bark">
                  {copy.email.failed}
                </p>
              )}
            </div>

            <AuthorityResult authority={chart.authority} lead={copy.reveal.prefix} headingId="step-result" />

            <aside className="mx-auto mt-16 max-w-3xl border-t border-bark/15 pt-10">
              <h2 className={label}>{copy.result.calculatedLabel}</h2>
              <dl className="mt-6 grid gap-x-10 gap-y-4 font-body text-sm text-umber sm:grid-cols-2">
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
              <div className="mt-10 flex flex-wrap gap-6 print:hidden">
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

            <div className="print:hidden">
              <BlueprintInvitation />
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}

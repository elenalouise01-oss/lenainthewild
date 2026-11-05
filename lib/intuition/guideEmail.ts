import { AUTHORITY_FOR, EGO_VARIANTS, OPEN_CENTRES, TYPE_SIGNALS, authorities, extras, intuitionBlueprint as copy } from '@/content/intuitionBlueprint';
import { absoluteUrl } from '@/lib/seo';
import { openCentresToShow } from '@/components/intuition/centres';
import { type AuthorityKey, type Center, type HdType } from './bodygraph';

// The personalised guide email, built from the same content file as the
// result page so the two always match the authority that was calculated.

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// `chart` adds the personal extras: the Type's on-track feeling and the open centres
export function guideEmail(authority: AuthorityKey, firstName?: string, chart?: { type: HdType; definedCenters: Center[] }) {
  const signal = chart ? TYPE_SIGNALS[chart.type] : null;
  const open = chart ? openCentresToShow(chart.definedCenters) : [];
  const a = authorities[AUTHORITY_FOR[authority]];
  const variant = authority === 'ego-manifested' || authority === 'ego-projected' ? EGO_VARIANTS[authority] : null;
  const url = absoluteUrl(`/intuition-blueprint/${a.slug}`);
  const hello = firstName ? `Hi ${firstName},` : 'Hi there,';
  const subject = `Your Intuition Blueprint: ${a.name}`;

  const text = [
    hello,
    '',
    `Your Human Design chart shows ${a.name}${a.alsoCalled ? ` (${a.alsoCalled})` : ''}.`,
    a.oneLine,
    '',
    copy.result.meaningLabel.toUpperCase(),
    ...a.meaning,
    ...(variant ? [variant] : []),
    '',
    copy.result.decisionsLabel.toUpperCase(),
    ...a.decisions,
    '',
    copy.result.promptsLabel.toUpperCase(),
    copy.result.promptsIntro,
    ...a.prompts.map((p) => `- ${p}`),
    '',
    `${copy.result.exerciseLabel.toUpperCase()}: ${a.exercise.title}`,
    ...a.exercise.steps.map((s, i) => `${i + 1}. ${s}`),
    '',
    ...(signal ? [extras.signalsLabel.toUpperCase(), `${extras.signatureLabel}: ${signal.signature}. ${extras.notSelfLabel}: ${signal.notSelf}.`, signal.body, ''] : []),
    ...(chart ? [extras.openLabel.toUpperCase(), ...(open.length ? [extras.openIntro, ...open.map((c) => `- Open ${OPEN_CENTRES[c].name}: ${OPEN_CENTRES[c].question}`)] : [extras.noOpen]), ''] : []),
    copy.result.reminder,
    '',
    'Sending positive vibes your way,',
    'Lena x',
    '',
    copy.emailEnd.label.toUpperCase(),
    copy.emailEnd.body,
    `${copy.emailEnd.cta}: ${absoluteUrl(copy.emailEnd.href)}`,
    '',
    `${copy.emailEnd.resultsLink}: ${url}`,
    `${copy.emailEnd.siteLink}: ${absoluteUrl('/')}`,
    '',
    'www.lenainthewild.com',
    '@lenainthewild on Instagram: https://www.instagram.com/lenainthewild/',
  ].join('\n');

  const p = (s: string, extra = '') => `<p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:#52421b;${extra}">${esc(s)}</p>`;
  const label = (s: string) =>
    `<p style="margin:32px 0 12px;font-size:11px;font-weight:600;letter-spacing:3px;text-transform:uppercase;color:#7b776f;">${esc(s)}</p>`;

  const html = `<!doctype html><html><body style="margin:0;padding:0;background:#f1efe7;">
<div style="max-width:560px;margin:0 auto;padding:40px 24px;font-family:Montserrat,Helvetica,Arial,sans-serif;background:#ffffff;">
${p(hello)}
<p style="margin:0 0 8px;font-size:11px;font-weight:600;letter-spacing:3px;text-transform:uppercase;color:#7b776f;">${esc(copy.title)}</p>
<h1 style="margin:0 0 12px;font-family:Georgia,serif;font-weight:400;font-size:34px;line-height:1.1;color:#3b2d0e;">${esc(a.name)}</h1>
${a.alsoCalled ? p(`Also called ${a.alsoCalled}.`, 'font-size:14px;color:#7b776f;') : ''}
<p style="margin:0 0 8px;padding:16px 20px;background:#fffba0;font-family:Georgia,serif;font-style:italic;font-size:20px;line-height:1.4;color:#3b2d0e;">${esc(a.oneLine)}</p>
${label(copy.result.meaningLabel)}
${a.meaning.map((s) => p(s)).join('')}
${variant ? p(variant) : ''}
${label(copy.result.decisionsLabel)}
${a.decisions.map((s) => p(s)).join('')}
${label(copy.result.promptsLabel)}
${p(copy.result.promptsIntro)}
<ol style="margin:0 0 16px;padding-left:20px;color:#52421b;font-size:16px;line-height:1.7;">${a.prompts.map((q) => `<li style="margin-bottom:10px;">${esc(q)}</li>`).join('')}</ol>
${label(`${copy.result.exerciseLabel}: ${a.exercise.title}`)}
<ol style="margin:0 0 16px;padding-left:20px;color:#52421b;font-size:16px;line-height:1.7;">${a.exercise.steps.map((s) => `<li style="margin-bottom:10px;">${esc(s)}</li>`).join('')}</ol>
${signal ? `${label(extras.signalsLabel)}${p(`${extras.signatureLabel}: ${signal.signature}. ${extras.notSelfLabel}: ${signal.notSelf}.`, 'font-weight:600;')}${p(signal.body)}` : ''}
${chart ? `${label(extras.openLabel)}${open.length ? `${p(extras.openIntro)}<ul style="margin:0 0 16px;padding-left:20px;color:#52421b;font-size:16px;line-height:1.7;">${open.map((c) => `<li style="margin-bottom:10px;"><strong>Open ${esc(OPEN_CENTRES[c].name)}:</strong> ${esc(OPEN_CENTRES[c].question)}</li>`).join('')}</ul>` : p(extras.noOpen)}` : ''}
${p(copy.result.reminder, 'font-style:italic;')}
${p('Sending positive vibes your way,')}
<p style="margin:0 0 32px;font-family:Georgia,serif;font-style:italic;font-size:22px;color:#3b2d0e;">Lena x</p>
<div style="background:#f1efe7;padding:28px 24px;text-align:center;">
<p style="margin:0 0 10px;font-size:11px;font-weight:600;letter-spacing:3px;text-transform:uppercase;color:#7b776f;">${esc(copy.emailEnd.label)}</p>
<p style="margin:0 0 20px;font-size:16px;line-height:1.7;color:#52421b;">${esc(copy.emailEnd.body)}</p>
<a href="${esc(absoluteUrl(copy.emailEnd.href))}" style="display:inline-block;padding:14px 28px;border-radius:999px;background:#CBA1D4;color:#3b2d0e;text-decoration:none;font-size:12px;font-weight:600;letter-spacing:2px;text-transform:uppercase;">${esc(copy.emailEnd.cta)}</a>
</div>
<p style="margin:24px 0 0;text-align:center;font-size:14px;"><a href="${esc(url)}" style="color:#3b2d0e;">${esc(copy.emailEnd.resultsLink)}</a> &nbsp;·&nbsp; <a href="${esc(absoluteUrl('/'))}" style="color:#3b2d0e;">${esc(copy.emailEnd.siteLink)}</a></p>
<div style="margin-top:32px;border-top:1px solid #e6e6dd;padding-top:20px;text-align:center;font-size:13px;line-height:1.8;color:#7b776f;">
<a href="${esc(absoluteUrl('/'))}"><img src="${esc(absoluteUrl('/images/litw-logo-brown.png'))}" alt="Lena in the Wild" width="80" height="37" style="display:inline-block;width:80px;height:auto;border:0;margin-bottom:8px;" /></a><br />
<a href="${esc(absoluteUrl('/'))}" style="color:#3b2d0e;text-decoration:none;font-weight:600;">www.lenainthewild.com</a><br />
<a href="https://www.instagram.com/lenainthewild/" style="color:#7b776f;text-decoration:none;">@lenainthewild on Instagram</a>
</div>
</div></body></html>`;

  return { subject, text, html };
}

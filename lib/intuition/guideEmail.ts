import { AUTHORITY_FOR, EGO_VARIANTS, OPEN_CENTRES, TYPE_SIGNALS, authorities, extras, intuitionBlueprint as copy } from '@/content/intuitionBlueprint';
import { absoluteUrl } from '@/lib/seo';
import { openCentresToShow } from '@/components/intuition/centres';
import { chartPath } from './chartLink';
import { type AuthorityKey, type Center, type HdType } from './bodygraph';

// The personalised guide email, built from the same content file as the
// result page so the two always match the authority that was calculated.

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// `chart` adds the personal extras: the Type's on-track feeling and the open centres
export function guideEmail(authority: AuthorityKey, firstName?: string, chart?: { type: HdType; definedCenters: Center[]; links?: [Center, Center][] }) {
  // Their own results page, with their chart drawn (no birth details in the link)
  const chartUrl = chart ? absoluteUrl(chartPath({ authority, type: chart.type, centers: chart.definedCenters, links: chart.links ?? [] })) : null;
  const signal = chart ? TYPE_SIGNALS[chart.type] : null;
  const open = chart ? openCentresToShow(chart.definedCenters) : [];
  const a = authorities[AUTHORITY_FOR[authority]];
  const variant = authority === 'ego-manifested' || authority === 'ego-projected' ? EGO_VARIANTS[authority] : null;
  const hello = firstName ? `Hi ${firstName},` : 'Hi there,';
  const subject = `Your Intuition Blueprint: ${a.name}`;

  const text = [
    hello,
    '',
    `Your Human Design chart shows ${a.name}${a.alsoCalled ? ` (${a.alsoCalled})` : ''}.`,
    a.oneLine,
    '',
    copy.result.meaningLabel.toUpperCase(),
    `${copy.result.whereLabel}: ${a.where}`,
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
    ...(chart ? [extras.openLabel.toUpperCase(), ...(open.length ? [extras.openIntro, ...open.map((c) => `- Open ${OPEN_CENTRES[c].name}: ${OPEN_CENTRES[c].question}`)] : [extras.noOpen]), ...(chartUrl ? [`${copy.emailEnd.chartLink}: ${chartUrl}`] : []), ''] : []),
    copy.result.reminder,
    '',
    'Sending positive vibes your way,',
    'Lena x',
    '',
    copy.emailEnd.label.toUpperCase(),
    copy.emailEnd.body,
    `${copy.emailEnd.cta}: ${absoluteUrl(copy.emailEnd.href)}`,
    '',
    `${copy.emailEnd.siteLink}: ${absoluteUrl('/')}`,
    '',
    'www.lenainthewild.com',
    '@lenainthewild on Instagram: https://www.instagram.com/lenainthewild/',
  ].join('\n');

  // Email-safe styling: everything inline, simple blocks, a table only where
  // two boxes sit side by side. Colours and type follow the results page.
  const p = (s: string, extra = '') => `<p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:#52421b;${extra}">${esc(s)}</p>`;
  const heading = (s: string) =>
    `<h2 style="margin:36px 0 6px;font-family:Georgia,serif;font-weight:400;font-size:26px;line-height:1.2;color:#3b2d0e;">${esc(s)}</h2><div style="width:44px;height:4px;background:#CBA1D4;margin:0 0 18px;"></div>`;
  const box = (bg: string, inner: string, extra = '') => `<div style="margin:24px 0 0;padding:24px 22px;background:${bg};${extra}">${inner}</div>`;
  const smallLabel = (s: string) =>
    `<p style="margin:0 0 6px;font-size:11px;font-weight:600;letter-spacing:3px;text-transform:uppercase;color:#7b776f;">${esc(s)}</p>`;

  const html = `<!doctype html><html><body style="margin:0;padding:24px 12px;background:#f1efe7;">
<div style="max-width:560px;margin:0 auto;background:#ffffff;font-family:Montserrat,Helvetica,Arial,sans-serif;">
<div style="height:6px;background:#CBA1D4;"></div>
<div style="padding:36px 28px 32px;">
${p(hello, 'font-size:17px;')}
${smallLabel(copy.title)}
<h1 style="margin:0 0 10px;font-family:Georgia,serif;font-weight:400;font-size:38px;line-height:1.05;color:#3b2d0e;">${esc(a.name)}</h1>
${a.alsoCalled ? p(`Also called ${a.alsoCalled}.`, 'font-size:14px;color:#7b776f;margin-bottom:12px;') : ''}
<p style="margin:12px 0 0;padding:18px 20px;background:#fffba0;font-family:Georgia,serif;font-style:italic;font-size:20px;line-height:1.4;color:#3b2d0e;">${esc(a.oneLine)}</p>

${heading(copy.result.meaningLabel)}
<div style="margin:0 0 18px;padding:14px 18px;background:#f3e6f6;border-left:4px solid #CBA1D4;">${smallLabel(copy.result.whereLabel)}<p style="margin:0;font-family:Georgia,serif;font-style:italic;font-size:18px;line-height:1.45;color:#3b2d0e;">${esc(a.where)}</p></div>
${a.meaning.map((s) => p(s)).join('')}
${variant ? p(variant, 'border-left:3px solid #CBA1D4;padding-left:14px;') : ''}

${heading(copy.result.decisionsLabel)}
${a.decisions.map((s) => `<p style="margin:0 0 10px;font-family:Georgia,serif;font-size:18px;line-height:1.5;color:#3b2d0e;">&rarr;&nbsp; ${esc(s)}</p>`).join('')}

${box(
  '#fbe1ea',
  `<p style="margin:0 0 4px;font-family:Georgia,serif;font-style:italic;font-size:26px;color:#3b2d0e;">${esc(copy.result.promptsLabel)}</p>
<p style="margin:0 0 16px;font-size:14px;color:#52421b;">${esc(copy.result.promptsIntro)}</p>
${a.prompts.map((q, i) => `<p style="margin:0 0 12px;font-family:Georgia,serif;font-size:18px;line-height:1.45;color:#3b2d0e;"><strong style="font-family:Montserrat,Helvetica,Arial,sans-serif;font-size:15px;">${i + 1}.</strong>&nbsp; ${esc(q)}</p>`).join('')}`,
)}

${box(
  '#f3e6f6',
  `${smallLabel(copy.result.exerciseLabel)}
<p style="margin:0 0 14px;font-family:Georgia,serif;font-style:italic;font-size:24px;line-height:1.2;color:#3b2d0e;">${esc(a.exercise.title)}</p>
${a.exercise.steps.map((st, i) => `<p style="margin:0 0 10px;font-size:15px;line-height:1.65;color:#52421b;"><strong>${i + 1}.</strong>&nbsp; ${esc(st)}</p>`).join('')}`,
  'border:2px dashed #cbb8a0;',
)}

${
  signal
    ? `${heading(extras.signalsLabel)}${p(extras.signalsIntro)}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;border-spacing:8px 0;margin:0 -8px 14px;"><tr>
<td width="50%" style="background:#dcf0d3;padding:16px 16px;vertical-align:top;"><p style="margin:0;font-size:13px;color:#52421b;">${esc(extras.signatureLabel)}</p><p style="margin:4px 0 0;font-family:Georgia,serif;font-style:italic;font-size:22px;color:#3b2d0e;">${esc(signal.signature)}</p></td>
<td width="50%" style="background:#f3dccf;padding:16px 16px;vertical-align:top;"><p style="margin:0;font-size:13px;color:#52421b;">${esc(extras.notSelfLabel)}</p><p style="margin:4px 0 0;font-family:Georgia,serif;font-style:italic;font-size:22px;color:#3b2d0e;">${esc(signal.notSelf)}</p></td>
</tr></table>
${p(signal.body)}`
    : ''
}

${
  chart
    ? `${heading(extras.openLabel)}${
        open.length
          ? `${p(extras.openIntro)}${chartUrl ? `<p style="margin:-6px 0 16px;font-size:15px;"><a href="${esc(chartUrl)}" style="color:#3b2d0e;font-weight:600;">${esc(copy.emailEnd.chartLink)} &rarr;</a></p>` : ''}${open
              .map(
                (c) =>
                  `<div style="border-top:1px dashed #cbb8a0;padding:12px 0;"><p style="margin:0 0 2px;font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#7b776f;">Open ${esc(OPEN_CENTRES[c].name)}</p><p style="margin:0;font-family:Georgia,serif;font-style:italic;font-size:18px;line-height:1.4;color:#3b2d0e;">${esc(OPEN_CENTRES[c].question)}</p></div>`,
              )
              .join('')}<div style="border-top:1px dashed #cbb8a0;"></div>`
          : p(extras.noOpen)
      }`
    : ''
}

<p style="margin:36px 0 28px;text-align:center;font-family:Georgia,serif;font-style:italic;font-size:19px;color:#3b2d0e;">${esc(copy.result.reminder)}</p>
${p('Sending positive vibes your way,', 'margin-bottom:4px;')}
<p style="margin:0 0 32px;font-family:Georgia,serif;font-style:italic;font-size:24px;color:#3b2d0e;">Lena x</p>

<div style="background:#f1efe7;padding:28px 22px;text-align:center;">
${smallLabel(copy.emailEnd.label)}
<p style="margin:0 0 20px;font-size:16px;line-height:1.7;color:#52421b;">${esc(copy.emailEnd.body)}</p>
<a href="${esc(absoluteUrl(copy.emailEnd.href))}" style="display:inline-block;padding:14px 28px;border-radius:999px;background:#CBA1D4;color:#3b2d0e;text-decoration:none;font-size:12px;font-weight:600;letter-spacing:2px;text-transform:uppercase;">${esc(copy.emailEnd.cta)}</a>
</div>
<p style="margin:22px 0 0;text-align:center;font-size:14px;"><a href="${esc(absoluteUrl('/'))}" style="color:#3b2d0e;">${esc(copy.emailEnd.siteLink)}</a></p>
</div>
<div style="border-top:1px solid #e6e6dd;padding:24px 28px 28px;text-align:center;font-size:13px;line-height:1.8;color:#7b776f;">
<a href="${esc(absoluteUrl('/'))}"><img src="${esc(absoluteUrl('/images/litw-logo-brown.png'))}" alt="Lena in the Wild" width="80" height="37" style="display:inline-block;width:80px;height:auto;border:0;margin-bottom:8px;" /></a><br />
<a href="${esc(absoluteUrl('/'))}" style="color:#3b2d0e;text-decoration:none;font-weight:600;">www.lenainthewild.com</a><br />
<a href="https://www.instagram.com/lenainthewild/" style="color:#7b776f;text-decoration:none;">@lenainthewild on Instagram</a>
</div>
</div></body></html>`;

  return { subject, text, html };
}

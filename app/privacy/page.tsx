import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import SiteHeader from '@/components/SiteHeader';
import { privacyPage as page } from '@/content/privacy';

export const metadata: Metadata = {
  title: { absolute: page.metaTitle },
  description: page.metaDescription,
  alternates: { canonical: '/privacy' },
};

const body = 'font-body text-base leading-relaxed text-umber sm:text-lg';
const h2 = 'font-display text-3xl italic text-bark sm:text-4xl';
const h3 = 'font-body text-xs font-semibold uppercase tracking-widest2 text-bark';

// Privacy policy and disclaimer. Also the privacy link Meta needs for the
// Instagram automation (docs/instagram-dms.md).
export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-cream px-6 py-24 sm:py-32">
        <article className="mx-auto max-w-2xl">
          <h1 className="font-display text-5xl italic leading-tight text-bark sm:text-6xl">{page.title}</h1>
          <p className="mt-4 font-body text-sm text-stone">{page.updated}</p>

          <h2 className={`mt-14 ${h2}`}>{page.privacyHeading}</h2>
          <p className={`mt-5 ${body}`}>{page.intro}</p>

          {page.sections.map((s) => (
            <section key={s.heading} className="mt-10">
              <h3 className={h3}>{s.heading}</h3>
              {'bullets' in s && s.bullets ? (
                <ul className="mt-4 space-y-4">
                  {s.bullets.map((b) => (
                    <li key={b.lead} className={body}>
                      <strong className="font-semibold text-bark">{b.lead}</strong> {b.text}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className={`mt-4 ${body}`}>{'text' in s ? s.text : ''}</p>
              )}
            </section>
          ))}

          <h2 className={`mt-16 ${h2}`}>{page.disclaimerHeading}</h2>
          <p className={`mt-5 ${body}`}>{page.disclaimer}</p>
        </article>
      </main>
      <Footer />
    </>
  );
}

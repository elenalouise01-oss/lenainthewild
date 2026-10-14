import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import CutoutSticker from '@/components/CutoutSticker';
import Footer from '@/components/Footer';
import PolaroidPop from '@/components/PolaroidPop';
import TapeMark from '@/components/TapeMark';
import JsonLd from '@/components/JsonLd';
import { breadcrumbs } from '@/lib/seo';
import ScrollReveal from '@/components/ScrollReveal';
import SiteHeader from '@/components/SiteHeader';
import TapeBanner from '@/components/TapeBanner';
import Listen from '@/components/sections/Listen';
import Newsletter from '@/components/sections/Newsletter';
import { offerPages, storyPage } from '@/content/site';

const title = 'My Story: Starting Over at 36 and Moving to Bali — Lena in the Wild';
const description =
  'At 36 I left my PT business in Bondi, sold everything and moved to Bali. The burnout, the leap and what starting over in your 30s really looks like.';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: '/my-story' },
  openGraph: {
    type: 'profile',
    url: '/my-story',
    title,
    description,
    images: [{ url: '/images/lena-sunrise-hero.jpg', width: 2400, height: 1800, alt: 'Lena at sunrise above the clouds' }],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/images/lena-sunrise-hero.jpg'] },
};

const outlineButton =
  'inline-flex items-center gap-2 border border-bark px-6 py-3 font-body text-[0.65rem] font-semibold uppercase tracking-widest2 text-bark transition-colors hover:bg-bark hover:text-cream';

// Scrapbook chapter titles: some on a strip of torn tape (tilted a little),
// some with a brush stroke underneath, and the rest plain, so the page
// breathes. Titles not listed here stay plain.
type Look = { kind: 'tape'; colour: string; tilt: string } | { kind: 'brush'; colour: string } | { kind: 'hand' };
const CHAPTER_LOOKS: Record<string, Look> = {
  'Burning out in Bondi': { kind: 'tape', colour: 'bg-sage/80', tilt: '-rotate-2' },
  'My first solo trip to Bali': { kind: 'brush', colour: 'text-zing-green' },
  'Moving to Bali at 36 with no plan': { kind: 'tape', colour: 'bg-zing-yellow', tilt: 'rotate-1' },
  'Down to my last $500 in Ubud': { kind: 'brush', colour: 'text-sage' },
  'The turning point': { kind: 'tape', colour: 'bg-zing-green', tilt: '-rotate-1' },
  'Deciding to leave Sydney': { kind: 'hand' },
  'Reinventing life on my own terms': { kind: 'hand' },
};
// Torn ends, like a strip of washi tape
const TAPE_EDGE =
  'polygon(0 6%, 2% 0, 98% 4%, 100% 0, 99% 30%, 100% 55%, 98% 80%, 100% 100%, 3% 96%, 0 100%, 1% 70%, 0 45%, 2% 22%)';

function ChapterTitle({ children }: { children: string }) {
  const look = CHAPTER_LOOKS[children];
  if (!look) return <>{children}</>;
  // Written by hand, like a note in the margin
  if (look.kind === 'hand') return <span className="inline-block -rotate-1 font-script text-4xl sm:text-[2.6rem]">{children}</span>;
  if (look.kind === 'tape') {
    return (
      <span className={`inline-block ${look.tilt} ${look.colour} px-4 py-1 shadow-sm`} style={{ clipPath: TAPE_EDGE }}>
        {children}
      </span>
    );
  }
  return (
    <span className="relative inline-block">
      <svg aria-hidden="true" viewBox="0 0 300 20" preserveAspectRatio="none" className={`absolute -bottom-1.5 left-0 h-5 w-full ${look.colour}`}>
        <path d="M4 10 C 80 8, 160 12, 220 10 S 280 9, 296 10" stroke="currentColor" strokeWidth="12" fill="none" strokeLinecap="round" />
      </svg>
      <span className="relative">{children}</span>
    </span>
  );
}

// Highlighter pen over a few lines of the story, taking turns in lilac,
// yellow and green
const TAPED = ["it wasn't my first leap"];
const MARKERS = ['rgba(203,161,212,0.7)', 'rgba(255,251,160,1)', 'rgba(190,229,176,0.9)'];
function Highlighted({ text }: { text: string }) {
  const hit = storyPage.highlights.find((h) => text.includes(h));
  if (!hit) return <>{text}</>;
  const [before, after] = [text.slice(0, text.indexOf(hit)), text.slice(text.indexOf(hit) + hit.length)];
  const colour = MARKERS[storyPage.highlights.indexOf(hit) % MARKERS.length];
  // The opening line gets a strip of tape that unrolls as you scroll to it
  if (TAPED.includes(hit)) {
    return (
      <>
        {before}
        <TapeMark>{hit}</TapeMark>
        {after}
      </>
    );
  }
  return (
    <>
      {before}
      <mark
        className="box-decoration-clone rounded-sm px-0.5 text-bark"
        style={{ background: `linear-gradient(transparent 18%, ${colour} 18%, ${colour} 88%, transparent 88%)` }}
      >
        {hit}
      </mark>
      {after}
    </>
  );
}

// Laid out like the old site's My Story page: sticky nav, full-width photo,
// a single readable column of story text, a full-width landscape break,
// then a short invitation to stay in touch.
export default function MyStoryPage() {
  return (
    <>
      <JsonLd data={breadcrumbs('My Story', '/my-story')} />
      <SiteHeader active="About" />
      <main>
        <div className="relative h-[60vh] min-h-[22rem] w-full bg-sand sm:h-[75vh]">
          <Image
            src="/images/lena-sunrise-hero.jpg"
            alt="Lena at sunrise above the clouds"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: '62% 55%' }}
          />
        </div>

        {/* Tape across the bottom of the photo */}
        <TapeBanner text="leaping into the unknown" mark="heart" className="relative z-10 -mt-12 -mb-12" />

        <section className="bg-cream px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-2xl">
            <ScrollReveal>
              <h1 className="font-display text-4xl leading-tight text-bark sm:text-6xl">{storyPage.storyTitle}</h1>
              <p className="mt-8 font-body text-base text-umber sm:text-lg">{storyPage.song}</p>
              <div className="mt-8 space-y-6">
                {storyPage.paragraphs.map((p) =>
                  typeof p !== 'string' && 'polaroids' in p ? (
                    <PolaroidPop key={p.polaroids[0].image} shots={p.polaroids} />
                  ) : typeof p !== 'string' ? (
                    p.cutout ? (
                      // A cut-out of Lena beside the text, stuck on like a sticker
                      <CutoutSticker
                        key={p.image}
                        src={p.image}
                        alt={p.alt}
                        width={p.width}
                        height={p.height}
                        caption={p.caption}
                        className="mx-auto w-56 sm:float-right sm:-mr-24 sm:mb-2 sm:ml-8 sm:mt-2 sm:w-60"
                      />
                    ) : p.small ? (
                      // A small, narrow print tucked into the text
                      <figure key={p.image} className="relative float-right mb-2 ml-4 mt-1.5 w-20 rotate-3 bg-white p-1 pb-3.5 shadow-lg sm:-mr-10 sm:ml-6 sm:w-24 sm:pb-5">
                        <div className="relative aspect-[3/4] overflow-hidden">
                          <Image src={p.image} alt={p.alt} fill sizes="8rem" className="object-cover" style={{ objectPosition: '30% 50%' }} />
                        </div>
                      </figure>
                    ) : (
                      // A photo in the story: a tilted print, taped on, with a handwritten caption
                      <figure key={p.image} className="relative mx-auto w-60 -rotate-2 bg-white p-2.5 pb-5 shadow-lg sm:float-left sm:-ml-24 sm:mb-4 sm:mr-8 sm:mt-2 sm:w-64">
                        <span aria-hidden="true" className="absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 rotate-2 bg-zing-pink/60" />
                        <Image src={p.image} alt={p.alt} width={p.width} height={p.height} sizes="16rem" className="h-auto w-full" />
                        {p.caption && <figcaption className="mt-3 text-center font-script text-2xl text-bark">{p.caption}</figcaption>}
                      </figure>
                    )
                  ) : p.startsWith('## ') ? (
                    <h2 key={p} className="clear-both pt-8 font-display text-3xl leading-snug text-bark">
                      <ChapterTitle>{p.slice(3)}</ChapterTitle>
                    </h2>
                  ) : (
                    <p key={p.slice(0, 24)} className="font-body text-base leading-relaxed text-umber sm:text-lg">
                      <Highlighted text={p} />
                    </p>
                  ),
                )}
              </div>
              <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
                <Link href={offerPages['The Freedom Frequency']} className={outlineButton}>
                  {storyPage.cta} →
                </Link>
                <Link
                  href="/life-design"
                  className="py-2 font-body text-[0.65rem] font-semibold uppercase tracking-widest2 text-bark underline decoration-sage decoration-2 underline-offset-8 transition-colors hover:decoration-bark"
                >
                  See who I help →
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <TapeBanner text="SYD → BALI → VIETNAM → NEXT STOP" strip="bg-sage text-bark" tilt="rotate-1" className="relative z-10 -mb-12" />
        <div className="relative h-[45vh] min-h-[18rem] w-full bg-sand">
          <Image
            src="/images/road/road-5.jpg"
            alt="Feet up on a hillside, looking out over the sea at sunset"
            fill
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: '50% 30%' }}
          />
        </div>

        <section className="bg-cream px-6 py-24 sm:py-32">
          <ScrollReveal className="mx-auto max-w-2xl">
            <p className="font-body text-base leading-relaxed text-umber sm:text-lg">{storyPage.closing}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/#contact" className={outlineButton}>
                Let&apos;s Connect
              </Link>
              {/* The newsletter sits at the bottom of this page, so stay here */}
              <Link href="#subscribe" className={outlineButton}>
                Join the newsletter
              </Link>
            </div>
          </ScrollReveal>
        </section>

        <Listen />

        <Newsletter />
      </main>
      <Footer />
    </>
  );
}

'use client';

import { useState } from 'react';
import ScrollReveal from '@/components/ScrollReveal';

type Demo = { src: string; poster: string; alt: string } | null;

function DemoCard({ demo, onExpand }: { demo: Demo; onExpand: () => void }) {
  return (
    <div className="mx-auto w-full max-w-[14rem] shadow-2xl">
      <div className="relative aspect-[9/16] overflow-hidden rounded-2xl bg-bark">
        {demo ? (
          <button
            type="button"
            onClick={onExpand}
            aria-label={`Expand video: ${demo.alt}`}
            className="group absolute inset-0 h-full w-full cursor-zoom-in"
          >
            <video
              poster={demo.poster}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
            >
              <source src={demo.src} type="video/mp4" />
            </video>
            <span className="absolute inset-0 flex items-center justify-center bg-bark/0 transition-colors duration-300 group-hover:bg-bark/20">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-cream/0 text-cream opacity-0 shadow-lg transition-all duration-300 group-hover:bg-cream/90 group-hover:text-bark group-hover:opacity-100">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </span>
          </button>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 border border-dashed border-cream/25 bg-bark text-center">
            <span className="font-hand text-2xl text-cream/60">+ your video</span>
            <p className="font-body text-[0.65rem] font-medium uppercase tracking-widest2 text-cream/60">More coming soon</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function DemoVideoGrid({ heading, demos }: { heading: string; demos: Demo[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const open = openIndex !== null ? demos[openIndex] : null;

  return (
    <>
      <ScrollReveal delay={0.1} className="mx-auto max-w-4xl">
        <p className="text-center font-hand text-2xl text-bark sm:text-3xl">{heading}</p>
        <div className="mx-auto mt-8 grid max-w-4xl gap-10 sm:grid-cols-3 sm:gap-14">
          {demos.map((demo, i) => (
            <DemoCard key={demo?.src ?? i} demo={demo} onExpand={() => setOpenIndex(i)} />
          ))}
        </div>
      </ScrollReveal>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={open.alt}
          className="fixed inset-0 z-50 flex items-center justify-center bg-bark/90 px-6 py-10"
          onClick={() => setOpenIndex(null)}
        >
          <button
            type="button"
            onClick={() => setOpenIndex(null)}
            aria-label="Close video"
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-cream/10 text-cream transition-colors hover:bg-cream/20"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="relative aspect-[9/16] w-full max-w-sm overflow-hidden rounded-2xl shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <video
              poster={open.poster}
              controls
              autoPlay
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            >
              <source src={open.src} type="video/mp4" />
            </video>
          </div>
        </div>
      )}
    </>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

// An image you can tap to see bigger: it opens over the page, and closes
// with the close button, a tap anywhere, or Escape.
export default function ImageZoom({
  src,
  alt,
  width,
  height,
  sizes,
  className = '',
  hint,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  className?: string;
  hint?: string;
}) {
  const [open, setOpen] = useState(false);
  const opener = useRef<HTMLButtonElement>(null);
  const closer = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const back = opener.current;
    closer.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
      back?.focus();
    };
  }, [open]);

  return (
    <>
      <button ref={opener} type="button" onClick={() => setOpen(true)} className="group relative block w-full cursor-zoom-in" aria-label={`Enlarge image: ${alt}`}>
        <Image src={src} alt={alt} width={width} height={height} sizes={sizes} className={className} />
        <span className="absolute bottom-3 right-3 rounded-full bg-white/90 px-3 py-1.5 font-body text-[0.65rem] font-semibold uppercase tracking-widest2 text-bark shadow transition-transform group-hover:scale-105">
          ⤢ {hint ?? 'Tap to enlarge'}
        </span>
      </button>
      {open && (
        <div role="dialog" aria-modal="true" aria-label={alt} className="fixed inset-0 z-50 bg-bark/90">
          {/* The picture fills the screen: on a laptop that's much bigger than on
              the page; on a phone, turning it sideways makes it bigger. Tap the
              dark area to close. */}
          <div onClick={() => setOpen(false)} className="h-full w-full cursor-zoom-out overflow-auto overscroll-contain">
            <div className="flex min-h-full items-center justify-center p-3 py-14">
              <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                sizes="100vw"
                loading="eager"
                onClick={(e) => e.stopPropagation()}
                className="h-auto max-w-none cursor-default shadow-2xl"
                // As big as the screen allows; never smaller than it is on the page
                style={{
                  width: `max(min(calc(100vw - 1.5rem), calc((100dvh - 7rem) * ${width / height})), min(calc(100vw - 1.5rem), 900px))`,
                }}
              />
            </div>
          </div>
          <button
            ref={closer}
            type="button"
            onClick={() => setOpen(false)}
            className="fixed right-3 top-3 z-10 rounded-full bg-cream px-4 py-2 font-body text-xs font-semibold uppercase tracking-widest2 text-bark shadow"
          >
            Close ×
          </button>
          <p className="pointer-events-none fixed bottom-4 left-0 right-0 hidden text-center font-body text-xs text-cream/80 portrait:block sm:portrait:hidden">Turn your phone sideways to see it bigger</p>
        </div>
      )}
    </>
  );
}

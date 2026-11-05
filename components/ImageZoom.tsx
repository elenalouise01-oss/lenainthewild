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
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-bark/85 p-3 sm:p-8"
        >
          <button
            ref={closer}
            type="button"
            onClick={() => setOpen(false)}
            className="absolute right-3 top-3 rounded-full bg-cream px-4 py-2 font-body text-xs font-semibold uppercase tracking-widest2 text-bark"
          >
            Close ×
          </button>
          <Image src={src} alt={alt} width={width} height={height} sizes="100vw" className="max-h-full w-auto max-w-full object-contain shadow-2xl" />
        </div>
      )}
    </>
  );
}

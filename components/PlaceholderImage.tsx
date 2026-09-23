import Image from 'next/image';

type Tone = 'sage' | 'porcelain' | 'rose' | 'bark' | 'sand';

type PlaceholderImageProps = {
  src?: string;
  alt: string;
  label?: string;
  tone?: Tone;
  className?: string;
  priority?: boolean;
  sizes?: string;
  compact?: boolean;
  quality?: number;
};

const toneStyles: Record<Tone, string> = {
  sage: 'from-sage/25 via-porcelain to-linen',
  porcelain: 'from-porcelain via-sand to-linen',
  rose: 'from-rose/35 via-porcelain to-sand',
  bark: 'from-bark via-umber to-bark',
  sand: 'from-sand via-linen to-porcelain',
};

const textTone: Record<Tone, string> = {
  sage: 'text-bark/50',
  porcelain: 'text-bark/50',
  rose: 'text-bark/50',
  bark: 'text-cream/60',
  sand: 'text-bark/50',
};

export default function PlaceholderImage({
  src,
  alt,
  label = 'Replace with your photography',
  tone = 'porcelain',
  className = '',
  priority = false,
  sizes = '(min-width: 1024px) 50vw, 100vw',
  compact = false,
  quality = 90,
}: PlaceholderImageProps) {
  if (src) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          quality={quality}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br ${toneStyles[tone]} ${className}`}
      role="img"
      aria-label={alt}
    >
      <svg className="absolute inset-0 h-full w-full opacity-[0.06] mix-blend-multiply" aria-hidden="true">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>

      {!compact && (
        <div className="absolute inset-3 flex flex-col items-center justify-center gap-3 border border-dashed border-current/25 text-center">
          <span className="font-hand text-2xl text-current" style={{ color: 'inherit' }}>
            <span className={textTone[tone]}>+ your photo</span>
          </span>
          {label && (
            <p className={`max-w-[16ch] font-body text-[0.65rem] font-medium uppercase tracking-widest2 ${textTone[tone]}`}>
              {label}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

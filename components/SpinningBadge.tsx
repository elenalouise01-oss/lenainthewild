'use client';

import { useId } from 'react';

type SpinningBadgeProps = {
  text: string;
  tone?: 'light' | 'dark';
  className?: string;
};

const toneStyles: Record<'light' | 'dark', { fill: string; dot: string }> = {
  light: { fill: 'fill-cream', dot: 'bg-cream' },
  dark: { fill: 'fill-bark', dot: 'bg-bark' },
};

// A continuously-rotating circular tag with text running around its rim —
// spins forever, independent of scroll (like a stamp/seal).
export default function SpinningBadge({ text, tone = 'light', className = '' }: SpinningBadgeProps) {
  const pathId = useId();
  const { fill, dot } = toneStyles[tone];

  return (
    <div className={`relative h-20 w-20 animate-spin-slow sm:h-24 sm:w-24 ${className}`} aria-hidden="true">
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <defs>
          <path id={pathId} d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
        </defs>
        <text className={`${fill} font-body font-bold`} style={{ fontSize: '9.5px', letterSpacing: '0.13em' }}>
          <textPath href={`#${pathId}`} startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>
      <span className="absolute inset-0 m-auto flex h-5 w-5 flex-col items-center justify-center gap-[3px]">
        <span className={`h-[2px] w-4 ${dot}`} />
        <span className={`h-[2px] w-4 ${dot}`} />
        <span className={`h-[2px] w-4 ${dot}`} />
      </span>
    </div>
  );
}

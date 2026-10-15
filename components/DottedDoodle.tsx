// A hand-drawn dashed line with a little loop, like a doodle in the margin of
// a scrapbook. Purely decorative.
const PATHS = {
  // swoops down, loops, and trails off
  loop: 'M20 6 C 4 40, 6 90, 40 104 C 70 116, 84 92, 66 82 C 48 72, 40 100, 62 112 C 92 128, 120 140, 112 190',
  // a gentle wave with a curl at the end
  wave: 'M6 40 C 40 6, 70 70, 104 36 C 130 10, 160 50, 150 70 C 142 86, 120 76, 128 60 C 136 44, 172 52, 194 30',
  // an arrow-ish curve pointing down into the text
  arrow: 'M100 6 C 60 20, 30 60, 46 100 C 58 130, 92 128, 86 104 C 80 84, 50 96, 58 126 C 64 150, 80 166, 96 176',
};

export default function DottedDoodle({ shape = 'loop', className = '' }: { shape?: keyof typeof PATHS; className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 200 200" fill="none" className={`pointer-events-none absolute ${className}`}>
      <path d={PATHS[shape]} stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeDasharray="6 7" />
    </svg>
  );
}

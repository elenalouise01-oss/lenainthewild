// A strip of tape running across the page with a line repeated along it,
// drifting slowly sideways (still for anyone who prefers less motion).
export default function TapeBanner({
  text,
  className = '',
  strip = 'bg-white text-bark',
  tilt = '-rotate-2',
  mark = 'star',
}: {
  text: string;
  className?: string;
  strip?: string;
  tilt?: string;
  // What sits between the words: a little star or a butterfly
  mark?: 'star' | 'butterfly';
}) {
  const run = Array.from({ length: 8 }, () => text);
  return (
    <div aria-hidden="true" className={`relative overflow-hidden py-8 ${className}`}>
      <div className={`-mx-8 ${tilt} ${strip} py-2 shadow-md`}>
        <div className="flex w-max animate-tape-scroll motion-reduce:animate-none">
          {[0, 1].map((half) => (
            <span key={half} className="flex shrink-0">
              {run.map((t, i) => (
                <span key={i} className="flex items-center whitespace-nowrap px-4 font-body text-sm font-bold sm:text-base">
                  {t}
                  {mark === 'butterfly' ? <Butterfly /> : <span className="ml-8 text-base">✶</span>}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Butterfly() {
  return (
    <svg viewBox="0 0 24 24" className="ml-8 h-5 w-5" fill="currentColor">
      <path d="M11.4 7.2C10 4.4 6.6 2.4 3.9 3.3 1.7 4 1.6 7 3.3 9.3c.9 1.2 2.2 2 3.4 2.4-1.6.6-3 2.1-2.9 3.9.1 2.2 2.4 3.4 4.6 2.4 1.5-.7 2.6-2.3 3-3.9V7.2Z" />
      <path d="M12.6 7.2c1.4-2.8 4.8-4.8 7.5-3.9 2.2.7 2.3 3.7.6 6-.9 1.2-2.2 2-3.4 2.4 1.6.6 3 2.1 2.9 3.9-.1 2.2-2.4 3.4-4.6 2.4-1.5-.7-2.6-2.3-3-3.9V7.2Z" />
      <path d="M12 6.4v12.2" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M11.6 6.2 10.2 3.4M12.4 6.2l1.4-2.8" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" fill="none" />
    </svg>
  );
}

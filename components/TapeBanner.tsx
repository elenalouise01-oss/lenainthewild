// A strip of tape running across the page with a line repeated along it,
// drifting slowly sideways (still for anyone who prefers less motion).
export default function TapeBanner({
  text,
  className = '',
  strip = 'bg-white text-bark',
  tilt = '-rotate-2',
}: {
  text: string;
  className?: string;
  strip?: string;
  tilt?: string;
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
                  <span className="ml-8 text-base">✶</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

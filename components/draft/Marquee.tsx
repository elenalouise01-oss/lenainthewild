type MarqueeProps = {
  items: string[];
  className?: string;
  textClassName?: string;
  speed?: 'slow' | 'normal';
  separator?: string;
};

export default function Marquee({
  items,
  className = '',
  textClassName = '',
  speed = 'normal',
  separator = '•',
}: MarqueeProps) {
  const track = items.join(` ${separator} `) + ` ${separator} `;

  return (
    <div className={`relative overflow-hidden ${className}`} aria-hidden="true">
      <div className={`flex w-max ${speed === 'slow' ? 'animate-marquee-slow' : 'animate-marquee'} motion-reduce:animate-none`}>
        {[0, 1].map((i) => (
          <span
            key={i}
            className={`flex-none whitespace-nowrap pr-6 ${textClassName}`}
          >
            {track}
          </span>
        ))}
      </div>
    </div>
  );
}

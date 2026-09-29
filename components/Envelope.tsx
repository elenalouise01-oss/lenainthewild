import Image from 'next/image';
import { freedomSeeker } from '@/content/site';

// An open white envelope with photos, a card and a ribbon spilling out of
// the top, and a title printed on the front — laid out to match the
// envelope reference. Everything is positioned on an 886 × 660 grid and
// converted to percentages, so it scales as one piece down to phone width.
const W = 886;
const H = 660;
const box = (x: number, y: number, w: number, h: number) => ({
  left: `${(x / W) * 100}%`,
  top: `${(y / H) * 100}%`,
  width: `${(w / W) * 100}%`,
  height: `${(h / H) * 100}%`,
});

const PHOTOS: { src: string; pos: string; x: number; y: number; w: number; h: number; rotate: number; z: number }[] = [
  // big landscape print tucked at the back
  { src: '/images/lena-sunrise.jpg', pos: '50% 40%', x: 296, y: 28, w: 338, h: 240, rotate: 0, z: 1 },
  { src: '/images/rainbow-beach.jpg', pos: '30% 80%', x: 62, y: 122, w: 112, h: 112, rotate: -8, z: 3 },
  { src: '/images/hero.jpg', pos: '70% 20%', x: 133, y: 142, w: 135, h: 130, rotate: 3, z: 4 },
  { src: '/images/lena-sunrise.jpg', pos: '78% 50%', x: 402, y: 88, w: 132, h: 180, rotate: -6, z: 5 },
  { src: '/images/rainbow-beach.jpg', pos: '55% 60%', x: 533, y: 118, w: 185, h: 175, rotate: 2, z: 5 },
  { src: '/images/hero.jpg', pos: '30% 40%', x: 700, y: 88, w: 158, h: 140, rotate: -3, z: 4 },
];

export default function Envelope() {
  const { envelope } = freedomSeeker;

  return (
    <div
      className="relative mx-auto w-full max-w-3xl"
      style={{ aspectRatio: `${W} / ${H}`, containerType: 'inline-size' }}
    >
      {/* Dashed doodle trailing off the top */}
      <svg
        aria-hidden="true"
        className="absolute text-bark/40"
        style={box(150, -40, 50, 70)}
        viewBox="0 0 50 70"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="5 6"
        strokeLinecap="round"
      >
        <path d="M40 2 C 38 25, 20 40, 8 66" />
      </svg>

      {/* Back of the envelope */}
      <svg aria-hidden="true" className="absolute inset-0 h-full w-full" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
        <path d="M0,190 Q0,172 18,172 L868,172 Q886,172 886,190 L886,640 L0,640 Z" fill="#ecebe6" />
      </svg>

      {/* What's spilling out */}
      {PHOTOS.map((p, i) => (
        <div
          key={i}
          className="absolute bg-cream p-[1.1%] shadow-[0_6px_18px_rgba(59,45,14,0.22)]"
          style={{ ...box(p.x, p.y, p.w, p.h), transform: `rotate(${p.rotate}deg)`, zIndex: p.z }}
        >
          <div className="relative h-full w-full overflow-hidden">
            <Image src={p.src} alt="" fill sizes="(min-width: 768px) 20rem, 40vw" className="object-cover" style={{ objectPosition: p.pos }} aria-hidden="true" />
          </div>
        </div>
      ))}

      {/* Green card with the places */}
      <div
        className="absolute flex flex-col bg-zing-green px-[3%] py-[3.5%] text-bark shadow-[0_6px_18px_rgba(59,45,14,0.2)]"
        style={{ ...box(160, 52, 280, 238), transform: 'rotate(-5deg)', zIndex: 2 }}
      >
        <p className="font-body font-semibold uppercase tracking-wide" style={{ fontSize: '1.45cqw' }}>
          {envelope.cardLabel}
        </p>
        <p className="mt-[4%] font-display leading-[1.05]" style={{ fontSize: '3.6cqw' }}>
          {envelope.places.join(', ')}
        </p>
      </div>

      {/* Lilac ribbon */}
      <div
        className="absolute flex flex-col items-center justify-between bg-sage py-[1.2%] text-bark shadow-[0_6px_18px_rgba(59,45,14,0.2)] [writing-mode:vertical-rl]"
        style={{ ...box(712, -8, 46, 262), transform: 'rotate(12deg)', zIndex: 6 }}
      >
        <span className="font-body font-semibold uppercase tracking-widest2" style={{ fontSize: '1.2cqw' }}>
          ✦
        </span>
        <span className="font-display italic" style={{ fontSize: '2.6cqw' }}>
          {envelope.ribbon}
        </span>
        <span className="font-body font-semibold uppercase tracking-widest2" style={{ fontSize: '1.2cqw' }}>
          ✦
        </span>
      </div>

      {/* Front pocket: two raised shoulders with a dip in the middle, and the
          faint fold lines of the bottom flap */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 z-10 h-full w-full drop-shadow-[0_18px_30px_rgba(59,45,14,0.18)]"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
      >
        <path
          d="M0,236 Q0,216 20,219 L318,288 Q334,305 352,305 L534,305 Q552,305 568,288 L866,219 Q886,216 886,236 L886,640 Q886,652 874,652 L12,652 Q0,652 0,640 Z"
          fill="#fbfbf8"
        />
        <path
          d="M6,648 L236,318 Q244,307 258,307 L628,307 Q642,307 650,318 L880,648"
          fill="#f7f6f2"
          stroke="rgba(59,45,14,0.08)"
          strokeWidth="1.5"
        />
      </svg>

      {/* Paperclip over the pocket edge */}
      <svg
        aria-hidden="true"
        className="absolute z-20 text-stone"
        style={box(150, 232, 34, 104)}
        viewBox="0 0 34 104"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      >
        <path d="M10 20 V82 a9 9 0 0 0 18 0 V14 a12 12 0 0 0 -24 0 V88" />
      </svg>

      {/* Title printed on the front */}
      <div className="absolute inset-x-0 z-20 text-center text-bark" style={{ top: `${(470 / H) * 100}%` }}>
        <p className="font-display italic leading-none" style={{ fontSize: '6.4cqw' }}>
          {envelope.frontItalic}
        </p>
        <p className="mt-[1.5%] font-display uppercase leading-none tracking-tight" style={{ fontSize: '5.2cqw' }}>
          {envelope.frontTitle}
        </p>
      </div>
    </div>
  );
}

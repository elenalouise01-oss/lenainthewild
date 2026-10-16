// Lena's little monkey butterfly, bopping along beside the menu circle to
// show people where the menu is. (An animated image; Next's optimiser
// doesn't handle animation, so it's a plain img.)
export default function WavingMonkey({ className = '' }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/images/monkey-walk.webp" alt="" aria-hidden="true" className={`block h-auto ${className}`} />
  );
}

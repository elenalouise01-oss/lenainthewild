// Canva-style "Scrapbook" motion: instead of gliding, a piece jumps into
// place over a few choppy frames with a little wobble, like stop-motion.

// Holds each keyframe, then jumps to the next (stop-motion look). `frames`
// is how many tiny steps each jump takes: 1 is a pure snap.
export const choppy = (frames: number) => (t: number) => (t >= 1 ? 1 : Math.floor(t * frames) / frames);

// The frames a piece goes through as it's stuck down, like Canva's
// "Scrapbook" animation: it appears slightly off, then jitters a few times
// (small turns and nudges) before settling at `tilt`. No big zoom or pop.
export function scrapbookFrames(tilt: number, from: 1 | -1 = 1) {
  return {
    opacity: [0, 1, 1, 1, 1, 1, 1, 1],
    scale: [1.04, 1.04, 1.02, 1.03, 1.01, 1.01, 1, 1],
    rotate: [tilt + 7 * from, tilt + 7 * from, tilt - 4 * from, tilt + 3 * from, tilt - 2 * from, tilt + 1 * from, tilt - 0.5 * from, tilt],
    x: [10 * from, 10 * from, -5 * from, 4 * from, -2 * from, 1 * from, 0, 0],
    y: [-8, -8, 3, -3, 2, -1, 0, 0],
  };
}

// How long a piece takes to settle (slow enough to see each frame).
export const SCRAPBOOK_SECONDS = 1.6;

export const hidden = { opacity: 0 };

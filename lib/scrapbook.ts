// Canva-style "Scrapbook" motion: instead of gliding, a piece jumps into
// place over a few choppy frames with a little wobble, like stop-motion.

// Holds each keyframe, then jumps to the next (stop-motion look). `frames`
// is how many tiny steps each jump takes: 1 is a pure snap.
export const choppy = (frames: number) => (t: number) => (t >= 1 ? 1 : Math.floor(t * frames) / frames);

// The frames a cut-out goes through as it's placed: big and tipped, then
// wobbling down onto the page. `tilt` is where it ends up.
export function scrapbookFrames(tilt: number, from: 1 | -1 = 1) {
  return {
    opacity: [0, 1, 1, 1, 1],
    scale: [1.3, 1.12, 0.96, 1.02, 1],
    rotate: [tilt + 14 * from, tilt - 6 * from, tilt + 3 * from, tilt - 1 * from, tilt],
    x: [24 * from, -8 * from, 4 * from, 0, 0],
    y: [-18, 6, -2, 0, 0],
  };
}

export const hidden = { opacity: 0 };

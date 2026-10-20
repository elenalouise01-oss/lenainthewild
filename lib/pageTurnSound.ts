// Lena's page-turn sound (public/sounds/page-turn.mp3), played through Web
// Audio so it can be started from the click and timed to the turn. Call
// `loadPageTurn` when the page loads; `playPageTurn(delay)` from the click
// itself so browsers allow the sound (`delay` in seconds).
let ctx: AudioContext | null = null;
let buffer: AudioBuffer | null = null;
let loading: Promise<void> | null = null;

function context() {
  const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctx) return null;
  ctx ??= new Ctx();
  return ctx;
}

export function loadPageTurn() {
  if (loading) return loading;
  loading = fetch('/sounds/page-turn.mp3')
    .then((r) => r.arrayBuffer())
    .then((data) => {
      const c = context();
      return c ? c.decodeAudioData(data) : null;
    })
    .then((b) => {
      buffer = b;
    })
    .catch(() => {
      loading = null;
    });
  return loading;
}

export function playPageTurn(delay = 0) {
  try {
    const c = context();
    if (!c) return;
    if (c.state === 'suspended') void c.resume();
    const start = () => {
      if (!buffer) return;
      const source = c.createBufferSource();
      source.buffer = buffer;
      const gain = c.createGain();
      gain.gain.value = 0.8;
      source.connect(gain).connect(c.destination);
      source.start(c.currentTime + delay);
    };
    if (buffer) start();
    else void loadPageTurn().then(start);
  } catch {
    // Sound is a nice extra; never let it break turning the page.
  }
}

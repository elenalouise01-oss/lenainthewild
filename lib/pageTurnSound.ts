// A soft paper page-turn sound, made in the browser (no audio file to load):
// filtered noise that swells as the sheet moves through the air, with a few
// crinkles and a light flap as it lands. Call it from the click itself so
// browsers allow the sound; `delay` (seconds) starts it later.
let ctx: AudioContext | null = null;

export function playPageTurn(delay = 0) {
  try {
    const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;
    ctx ??= new Ctx();
    if (ctx.state === 'suspended') void ctx.resume();

    const rate = ctx.sampleRate;
    const length = 0.8;
    const buffer = ctx.createBuffer(1, Math.floor(rate * length), rate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      const t = i / rate;
      // the whoosh: rises quickly, then eases off
      const swell = Math.pow(Math.sin(Math.PI * Math.min(1, t / 0.7)), 2) * Math.min(1, t / 0.12);
      // little crinkles of the paper
      const crinkle = Math.random() < 0.006 ? (Math.random() * 2 - 1) * 2.5 : 0;
      // the flap as the page settles
      const flap = t > 0.62 && t < 0.7 ? (Math.random() * 2 - 1) * 1.6 * (1 - (t - 0.62) / 0.08) : 0;
      data[i] = ((Math.random() * 2 - 1) + crinkle) * swell + flap;
    }

    const at = ctx.currentTime + delay;
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    const highpass = ctx.createBiquadFilter();
    highpass.type = 'highpass';
    highpass.frequency.value = 600;
    const band = ctx.createBiquadFilter();
    band.type = 'bandpass';
    band.Q.value = 0.8;
    band.frequency.setValueAtTime(4200, at);
    band.frequency.exponentialRampToValueAtTime(1400, at + length);
    const gain = ctx.createGain();
    gain.gain.value = 0.16;
    source.connect(highpass).connect(band).connect(gain).connect(ctx.destination);
    source.start(at);
  } catch {
    // Sound is a nice extra; never let it break turning the page.
  }
}

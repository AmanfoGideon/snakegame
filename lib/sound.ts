let audioContext: AudioContext | null = null;

function getContext(): AudioContext {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  return audioContext;
}

function playTone(
  frequency: number,
  duration: number,
  type: OscillatorType = "sine",
  volume = 0.15
) {
  try {
    const ctx = getContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.value = frequency;
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(
      0.001,
      ctx.currentTime + duration
    );

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Audio not available
  }
}

export const sounds = {
  eat: (enabled: boolean) => {
    if (!enabled) return;
    playTone(600, 0.1, "square", 0.12);
    setTimeout(() => playTone(800, 0.08, "square", 0.1), 50);
  },
  gameOver: (enabled: boolean) => {
    if (!enabled) return;
    playTone(400, 0.2, "sawtooth", 0.12);
    setTimeout(() => playTone(300, 0.2, "sawtooth", 0.1), 150);
    setTimeout(() => playTone(200, 0.3, "sawtooth", 0.08), 300);
  },
  levelUp: (enabled: boolean) => {
    if (!enabled) return;
    playTone(500, 0.1, "sine", 0.12);
    setTimeout(() => playTone(700, 0.1, "sine", 0.12), 80);
    setTimeout(() => playTone(900, 0.15, "sine", 0.1), 160);
  },
  start: (enabled: boolean) => {
    if (!enabled) return;
    playTone(440, 0.1, "sine", 0.1);
    setTimeout(() => playTone(550, 0.1, "sine", 0.1), 100);
  },
  click: (enabled: boolean) => {
    if (!enabled) return;
    playTone(800, 0.05, "square", 0.08);
  },
};

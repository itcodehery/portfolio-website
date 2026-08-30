// Sound Engine — Web Audio API based synthesizer for the 8×8 pad grid
import { writable } from 'svelte/store';

export interface PadConfig {
  id: number;
  label: string;
  category: 'drums' | 'perc' | 'bass-sub' | 'bass-growl' | 'synth-lead' | 'synth-pad' | 'synth-bright' | 'fx';
  key?: string; // keyboard shortcut
}

// Note frequencies (Hz)
const NOTE_FREQ: Record<string, number> = {
  'C2': 65.41, 'D2': 73.42, 'E2': 82.41, 'F2': 87.31, 'G2': 98.00, 'A2': 110.00, 'B2': 123.47, 'C3': 130.81,
  'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23, 'G4': 392.00, 'A4': 440.00, 'B4': 493.88, 'C5': 523.25,
  'C5h': 523.25, 'D5': 587.33, 'E5': 659.25, 'F5': 698.46, 'G5': 783.99, 'A5': 880.00, 'B5': 987.77, 'C6': 1046.50,
};

// Pad definitions for 8 rows × 8 columns
export const PAD_GRID: PadConfig[][] = [
  // Row 1: Drums
  [
    { id: 0,  label: 'Kick',    category: 'drums', key: '1' },
    { id: 1,  label: 'Snare',   category: 'drums', key: '2' },
    { id: 2,  label: 'HH Open', category: 'drums', key: '3' },
    { id: 3,  label: 'HH Shut', category: 'drums', key: '4' },
    { id: 4,  label: 'Clap',    category: 'drums', key: '5' },
    { id: 5,  label: 'Rim',     category: 'drums', key: '6' },
    { id: 6,  label: 'Tom Hi',  category: 'drums', key: '7' },
    { id: 7,  label: 'Tom Lo',  category: 'drums', key: '8' },
  ],
  // Row 2: Pad
  [
    { id: 8,  label: 'C5', category: 'synth-pad', key: 'q' },
    { id: 9,  label: 'D5', category: 'synth-pad', key: 'w' },
    { id: 10, label: 'E5', category: 'synth-pad', key: 'e' },
    { id: 11, label: 'F5', category: 'synth-pad', key: 'r' },
    { id: 12, label: 'G5', category: 'synth-pad', key: 't' },
    { id: 13, label: 'A5', category: 'synth-pad', key: 'y' },
    { id: 14, label: 'B5', category: 'synth-pad', key: 'u' },
    { id: 15, label: 'C6', category: 'synth-pad', key: 'i' },
  ],

  // Row 5: Synth Lead (Square)
  [
    { id: 32, label: 'C4', category: 'synth-lead', key: 'a' },
    { id: 33, label: 'D4', category: 'synth-lead', key: 's' },
    { id: 34, label: 'E4', category: 'synth-lead', key: 'd' },
    { id: 35, label: 'F4', category: 'synth-lead', key: 'f' },
    { id: 36, label: 'G4', category: 'synth-lead', key: 'g' },
    { id: 37, label: 'A4', category: 'synth-lead', key: 'h' },
    { id: 38, label: 'B4', category: 'synth-lead', key: 'j' },
    { id: 39, label: 'C5', category: 'synth-lead', key: 'k' },
  ],
  // Row 6: FX & Chords
  [
    { id: 56, label: 'C maj', category: 'fx', key: 'z' },
    { id: 57, label: 'D min', category: 'fx', key: 'x' },
    { id: 58, label: 'E min', category: 'fx', key: 'c' },
    { id: 59, label: 'F maj', category: 'fx', key: 'v' },
    { id: 60, label: 'G maj', category: 'fx', key: 'b' },
    { id: 61, label: 'A min', category: 'fx', key: 'n' },
    { id: 62, label: 'Rise',  category: 'fx', key: 'm' },
    { id: 63, label: 'Drop',  category: 'fx', key: ',' },
  ],
];

// Row category labels
export const ROW_LABELS = [
  'Drums', 'Pad', 'Lead', 'FX'
];

// Category color map (CSS class suffixes)
export const CATEGORY_COLORS: Record<PadConfig['category'], string> = {
  'drums':       'cat-drums',
  'perc':        'cat-perc',
  'bass-sub':    'cat-bass-sub',
  'bass-growl':  'cat-bass-growl',
  'synth-lead':  'cat-synth-lead',
  'synth-pad':   'cat-synth-pad',
  'synth-bright':'cat-synth-bright',
  'fx':          'cat-fx',
};

// Build keyboard-to-padId lookup
export const KEY_TO_PAD: Record<string, number> = {};
for (const row of PAD_GRID) {
  for (const pad of row) {
    if (pad.key) {
      KEY_TO_PAD[pad.key.toLowerCase()] = pad.id;
    }
  }
}

// ─── Audio Engine ───

let ctx: AudioContext | null = null;
let analyser: AnalyserNode | null = null;
let masterGain: GainNode | null = null;

function ensureContext(): AudioContext {
  if (!ctx) {
    ctx = new AudioContext();
    analyser = ctx.createAnalyser();
    analyser.fftSize = 256;
    analyser.smoothingTimeConstant = 0.8;
    masterGain = ctx.createGain();
    masterGain.gain.value = 2.5; // Significantly increased volume
    masterGain.connect(analyser);
    analyser.connect(ctx.destination);
  }
  if (ctx.state === 'suspended') {
    ctx.resume();
  }
  return ctx;
}

export function getAnalyser(): AnalyserNode | null {
  return analyser;
}

if (typeof window !== 'undefined') {
  (window as any).__soundAnalyser = getAnalyser;
}

// ─── Noise buffer (cached) ───
let noiseBuffer: AudioBuffer | null = null;

function getNoiseBuffer(): AudioBuffer {
  const c = ensureContext();
  if (!noiseBuffer) {
    const bufferSize = c.sampleRate * 0.5; // 0.5 seconds
    noiseBuffer = c.createBuffer(1, bufferSize, c.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
  }
  return noiseBuffer;
}

// ─── Sound Synthesis ───

function playNoise(filterFreq: number, filterQ: number, duration: number, filterType: BiquadFilterType = 'bandpass', gain = 0.4) {
  const c = ensureContext();
  const source = c.createBufferSource();
  source.buffer = getNoiseBuffer();

  const filter = c.createBiquadFilter();
  filter.type = filterType;
  filter.frequency.value = filterFreq;
  filter.Q.value = filterQ;

  const env = c.createGain();
  env.gain.setValueAtTime(gain, c.currentTime);
  env.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration);

  source.connect(filter);
  filter.connect(env);
  env.connect(masterGain!);

  source.start(c.currentTime);
  source.stop(c.currentTime + duration);
}

function playTone(freq: number, type: OscillatorType, attack: number, decay: number, gain = 0.3) {
  const c = ensureContext();
  const osc = c.createOscillator();
  osc.type = type;
  osc.frequency.value = freq;

  const env = c.createGain();
  env.gain.setValueAtTime(0, c.currentTime);
  env.gain.linearRampToValueAtTime(gain, c.currentTime + attack);
  env.gain.exponentialRampToValueAtTime(0.001, c.currentTime + attack + decay);

  osc.connect(env);
  env.connect(masterGain!);

  osc.start(c.currentTime);
  osc.stop(c.currentTime + attack + decay + 0.05);
}

function playChord(notes: number[], type: OscillatorType, attack: number, decay: number) {
  for (const freq of notes) {
    playTone(freq, type, attack, decay, 0.15);
  }
}

function playKick() {
  const c = ensureContext();
  const osc = c.createOscillator();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(150, c.currentTime);
  osc.frequency.exponentialRampToValueAtTime(30, c.currentTime + 0.15);

  const env = c.createGain();
  env.gain.setValueAtTime(0.8, c.currentTime);
  env.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.3);

  osc.connect(env);
  env.connect(masterGain!);
  osc.start(c.currentTime);
  osc.stop(c.currentTime + 0.35);

  // Click layer
  playNoise(4000, 1, 0.02, 'highpass', 0.3);
}

function playRiseFx() {
  const c = ensureContext();
  const osc = c.createOscillator();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(200, c.currentTime);
  osc.frequency.exponentialRampToValueAtTime(2000, c.currentTime + 0.8);

  const env = c.createGain();
  env.gain.setValueAtTime(0.01, c.currentTime);
  env.gain.linearRampToValueAtTime(0.3, c.currentTime + 0.6);
  env.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.85);

  osc.connect(env);
  env.connect(masterGain!);
  osc.start(c.currentTime);
  osc.stop(c.currentTime + 0.9);
}

function playDropFx() {
  const c = ensureContext();
  const osc = c.createOscillator();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(1500, c.currentTime);
  osc.frequency.exponentialRampToValueAtTime(50, c.currentTime + 0.6);

  const env = c.createGain();
  env.gain.setValueAtTime(0.35, c.currentTime);
  env.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.7);

  osc.connect(env);
  env.connect(masterGain!);
  osc.start(c.currentTime);
  osc.stop(c.currentTime + 0.75);
}

// ─── Main play function ───

let currentAudioElement: HTMLAudioElement | null = null;
let currentAudioSource: MediaElementAudioSourceNode | null = null;

export const currentlyPlaying = writable<{ name: string, isPlaying: boolean } | null>(null);
export const trackProgress = writable({ currentTime: 0, duration: 0 });

export function seekTrack(time: number) {
  if (currentAudioElement) {
    currentAudioElement.currentTime = time;
    trackProgress.update(p => ({ ...p, currentTime: time }));
  }
}

export function playTrack(url: string, name: string) {
  const c = ensureContext();
  if (currentAudioElement) {
    currentAudioElement.pause();
    currentAudioElement.currentTime = 0;
  } else {
    currentAudioElement = new Audio();
    currentAudioElement.crossOrigin = "anonymous";
    currentAudioSource = c.createMediaElementSource(currentAudioElement);
    currentAudioSource.connect(analyser!);
    
    currentAudioElement.addEventListener('timeupdate', () => {
      trackProgress.set({
        currentTime: currentAudioElement!.currentTime,
        duration: currentAudioElement!.duration || 0
      });
    });
    
    currentAudioElement.addEventListener('loadedmetadata', () => {
      trackProgress.set({
        currentTime: currentAudioElement!.currentTime,
        duration: currentAudioElement!.duration || 0
      });
    });
    
    currentAudioElement.addEventListener('ended', () => {
      currentlyPlaying.update(s => s ? { ...s, isPlaying: false } : null);
    });
  }
  currentAudioElement.src = url;
  currentAudioElement.play();
  
  currentlyPlaying.set({ name, isPlaying: true });
}

export function pauseTrack() {
  if (currentAudioElement) {
    currentAudioElement.pause();
    currentlyPlaying.update(state => {
      if (state) return { ...state, isPlaying: false };
      return state;
    });
  }
}

export function resumeTrack() {
  if (currentAudioElement && currentAudioElement.src) {
    currentAudioElement.play();
    currentlyPlaying.update(state => {
      if (state) return { ...state, isPlaying: true };
      return state;
    });
  }
}

export function playMetronomeClick() {
  const c = ensureContext();
  const osc = c.createOscillator();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(1000, c.currentTime);
  osc.frequency.exponentialRampToValueAtTime(100, c.currentTime + 0.05);

  const env = c.createGain();
  env.gain.setValueAtTime(0.4, c.currentTime);
  env.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.05);

  osc.connect(env);
  env.connect(masterGain!);
  osc.start(c.currentTime);
  osc.stop(c.currentTime + 0.06);
}

export function playSound(padId: number): void {
  ensureContext();

  // Find pad config
  let pad: PadConfig | undefined;
  for (const row of PAD_GRID) {
    pad = row.find(p => p.id === padId);
    if (pad) break;
  }
  if (!pad) return;

  switch (pad.category) {
    case 'drums':
      switch (pad.label) {
        case 'Kick':    playKick(); break;
        case 'Snare':   playNoise(3000, 2, 0.15, 'bandpass', 0.5); playTone(200, 'triangle', 0.001, 0.1, 0.3); break;
        case 'HH Open': playNoise(8000, 1, 0.3, 'highpass', 0.2); break;
        case 'HH Shut': playNoise(8000, 2, 0.08, 'highpass', 0.25); break;
        case 'Clap':    playNoise(2000, 1, 0.12, 'bandpass', 0.4); break;
        case 'Rim':     playNoise(5000, 5, 0.05, 'bandpass', 0.35); playTone(800, 'square', 0.001, 0.03, 0.2); break;
        case 'Tom Hi':  playTone(300, 'sine', 0.005, 0.2, 0.4); break;
        case 'Tom Lo':  playTone(150, 'sine', 0.005, 0.3, 0.45); break;
      }
      break;

    case 'perc':
      switch (pad.label) {
        case 'Crash':   playNoise(6000, 0.5, 0.6, 'highpass', 0.2); break;
        case 'Ride':    playNoise(7000, 3, 0.4, 'highpass', 0.15); break;
        case 'Shaker':  playNoise(10000, 2, 0.1, 'highpass', 0.12); break;
        case 'Cowbell': playTone(800, 'square', 0.001, 0.2, 0.2); playTone(540, 'square', 0.001, 0.2, 0.2); break;
        case 'Tamb':    playNoise(9000, 3, 0.15, 'highpass', 0.15); break;
        case 'Conga':   playTone(250, 'sine', 0.003, 0.25, 0.4); break;
        case 'Bongo':   playTone(400, 'sine', 0.003, 0.15, 0.35); break;
        case 'Block':   playTone(1200, 'square', 0.001, 0.05, 0.2); break;
      }
      break;

    case 'bass-sub':
      playTone(NOTE_FREQ[pad.label] || 65, 'sine', 0.01, 0.4, 0.5);
      break;

    case 'bass-growl':
      playTone(NOTE_FREQ[pad.label] || 65, 'sawtooth', 0.01, 0.3, 0.25);
      break;

    case 'synth-lead':
      playTone(NOTE_FREQ[pad.label] || 261, 'square', 0.01, 0.25, 0.2);
      break;

    case 'synth-pad':
      playTone(NOTE_FREQ[pad.label] || 261, 'triangle', 0.05, 0.8, 0.25);
      break;

    case 'synth-bright':
      playTone(NOTE_FREQ[pad.label === 'C5' ? 'C5h' : pad.label] || 523, 'sawtooth', 0.01, 0.2, 0.15);
      break;

    case 'fx':
      switch (pad.label) {
        case 'C maj': playChord([261.63, 329.63, 392.00], 'triangle', 0.02, 0.6); break;
        case 'D min': playChord([293.66, 349.23, 440.00], 'triangle', 0.02, 0.6); break;
        case 'E min': playChord([329.63, 392.00, 493.88], 'triangle', 0.02, 0.6); break;
        case 'F maj': playChord([349.23, 440.00, 523.25], 'triangle', 0.02, 0.6); break;
        case 'G maj': playChord([392.00, 493.88, 587.33], 'triangle', 0.02, 0.6); break;
        case 'A min': playChord([440.00, 523.25, 659.25], 'triangle', 0.02, 0.6); break;
        case 'Rise':  playRiseFx(); break;
        case 'Drop':  playDropFx(); break;
      }
      break;
  }
}

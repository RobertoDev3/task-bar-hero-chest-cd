import {
  DEFAULT_COOLDOWN_MINUTES,
  type FarmState,
  initialFarmState,
  STORAGE_KEY,
} from './farm-data';

export function normalizeCooldownMinutes(value: unknown) {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return DEFAULT_COOLDOWN_MINUTES;
  }

  return Math.min(180, Math.max(1, Math.round(numericValue)));
}

export function loadFarmState(): FarmState {
  if (typeof window === 'undefined') {
    return initialFarmState;
  }

  try {
    const rawState = window.localStorage.getItem(STORAGE_KEY);

    if (!rawState) {
      return initialFarmState;
    }

    const parsed = JSON.parse(rawState) as Partial<FarmState>;

    return {
      cooldowns: parsed.cooldowns ?? {},
      hiddenPhaseIds: parsed.hiddenPhaseIds ?? [],
      muted: parsed.muted ?? false,
      sortDirection: parsed.sortDirection ?? 'first',
      theme: parsed.theme ?? 'dark',
      cooldownMinutes: normalizeCooldownMinutes(parsed.cooldownMinutes),
      history: parsed.history ?? [],
    };
  } catch {
    return initialFarmState;
  }
}

export function saveFarmState(state: FarmState) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function formatTimer(ms: number) {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');

  return `${minutes}:${seconds}`;
}

export function formatTime(timestamp: number) {
  return new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(timestamp);
}

export function playUnlockSound() {
  const AudioContextClass = window.AudioContext ?? window.webkitAudioContext;

  if (!AudioContextClass) {
    return;
  }

  const context = new AudioContextClass();
  const gain = context.createGain();
  gain.gain.setValueAtTime(0.0001, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.18, context.currentTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.42);
  gain.connect(context.destination);

  [523.25, 659.25, 783.99].forEach((frequency, index) => {
    const oscillator = context.createOscillator();
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(
      frequency,
      context.currentTime + index * 0.08,
    );
    oscillator.connect(gain);
    oscillator.start(context.currentTime + index * 0.08);
    oscillator.stop(context.currentTime + 0.16 + index * 0.08);
  });

  window.setTimeout(() => void context.close(), 650);
}

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}

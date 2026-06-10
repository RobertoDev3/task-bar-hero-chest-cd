export const DEFAULT_COOLDOWN_MINUTES = 15;
export const STORAGE_KEY = 'task-bar-hero-chest-route-v1';

export type Difficulty = 'normal' | 'nightmare' | 'hell' | 'torment';
export type SortDirection = 'first' | 'last';
export type Theme = 'dark' | 'light';

export type Phase = {
  id: string;
  zone: string;
  requirement: string;
  difficulty: Difficulty;
};

export type HistoryEntry = {
  id: string;
  phaseId: string;
  phaseZone: string;
  doneAt: number;
  unlockedAt: number;
};

export type FarmState = {
  cooldowns: Record<string, number>;
  hiddenPhaseIds: string[];
  muted: boolean;
  sortDirection: SortDirection;
  theme: Theme;
  cooldownMinutes: number;
  history: HistoryEntry[];
};

export const phases: Phase[] = [
  { id: '1-1', zone: '1-1', requirement: 'Lv1', difficulty: 'normal' },
  { id: '1-4', zone: '1-4', requirement: 'Lv2', difficulty: 'normal' },
  { id: '1-8', zone: '1-8', requirement: 'Lv3', difficulty: 'normal' },
  { id: '2-3', zone: '2-3', requirement: 'Lv15', difficulty: 'normal' },
  { id: '2-8', zone: '2-8', requirement: 'Lv20', difficulty: 'normal' },
  { id: '3-8', zone: '3-8', requirement: 'Lv30', difficulty: 'normal' },
  { id: '1-9', zone: '1-9', requirement: 'Lv40', difficulty: 'nightmare' },
  { id: '3-5', zone: '3-5', requirement: 'Lv50', difficulty: 'nightmare' },
  { id: '2-5', zone: '2-5', requirement: 'Lv65', difficulty: 'hell' },
  { id: '1-3', zone: '1-3', requirement: 'Lv80', difficulty: 'torment' },
];

export const initialFarmState: FarmState = {
  cooldowns: {},
  hiddenPhaseIds: [],
  muted: false,
  sortDirection: 'first',
  theme: 'dark',
  cooldownMinutes: DEFAULT_COOLDOWN_MINUTES,
  history: [],
};

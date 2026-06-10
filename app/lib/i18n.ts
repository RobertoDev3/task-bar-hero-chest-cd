export const locales = ['en', 'pt'] as const;
export const defaultLocale = 'en';

export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getIntlLocale(locale: Locale) {
  return locale === 'pt' ? 'pt-BR' : 'en-US';
}

export const dictionaries = {
  en: {
    metadata: {
      title: 'Task Bar Hero Chest CD',
      description: 'Chest farm route cooldown tracker.',
    },
    language: {
      label: 'Language',
      english: 'EN',
      portuguese: 'PT',
    },
    header: {
      gameName: 'Task Bar Hero',
      title: 'Chest Route Timer',
      available: 'Available',
      cooldown: 'On CD',
      farmedChests: 'Farmed chests',
      howItWorks: 'How it works?',
      config: 'Config',
    },
    howItWorks: {
      eyebrow: 'Quick guide',
      title: 'How it works?',
      expand: 'View image fullscreen',
      shrink: 'Exit fullscreen',
      close: 'Close guide',
      imageAlt: 'Image explaining how the chest farm route works',
    },
    settings: {
      eyebrow: 'Settings',
      title: 'Route preferences',
      cooldownLabel: 'Default cooldown (min)',
      savedCooldown: 'Saved: {minutes} min',
      soundOff: 'Sound off',
      soundOn: 'Sound on',
      lightMode: 'Light mode',
      darkMode: 'Dark mode',
      cancel: 'Cancel',
      save: 'Save',
    },
    nextPhase: {
      eyebrow: 'Next suggested stage',
      unlocksIn: '{zone} in {timer}',
      noVisibleStages: 'No visible stages',
      done: 'Done',
      currentCooldown: 'Current CD: {minutes} min',
      orderFirst: 'Order: start -> end',
      orderLast: 'Order: end -> start',
    },
    phase: {
      cooldown: 'CD {timer}',
      unlocksAt: 'Unlocks {time}',
      ready: 'Ready',
      historyCount: '{count} chests in history',
      done: 'Done',
      reset: 'Reset',
      hide: 'Hide',
    },
    history: {
      eyebrow: 'History',
      title: 'Recent farm',
      clear: 'Clear',
      empty: 'No chest marked yet.',
      deleteAria: 'Delete {zone} from history',
      deleteTitle: 'Delete from history',
    },
    hiddenPhases: {
      eyebrow: 'Hidden stages',
      title: 'Not farmed',
      empty: 'All stages are showing in the route.',
      show: 'Show',
    },
    difficulties: {
      normal: 'Normal',
      nightmare: 'Nightmare',
      hell: 'Hell',
      torment: 'Torment',
    },
  },
  pt: {
    metadata: {
      title: 'Task Bar Hero Chest CD',
      description: 'Controle de rota de farm de baús com cooldown.',
    },
    language: {
      label: 'Idioma',
      english: 'EN',
      portuguese: 'PT',
    },
    header: {
      gameName: 'Task Bar Hero',
      title: 'Temporizador da rota de baús',
      available: 'Disponíveis',
      cooldown: 'Em CD',
      farmedChests: 'Baús farmados',
      howItWorks: 'Como funciona?',
      config: 'Configuração',
    },
    howItWorks: {
      eyebrow: 'Guia rápido',
      title: 'Como funciona?',
      expand: 'Ver imagem em tela cheia',
      shrink: 'Sair da tela cheia',
      close: 'Fechar guia',
      imageAlt: 'Imagem explicando como funciona a rota de farm de baús',
    },
    settings: {
      eyebrow: 'Configurações',
      title: 'Preferências da rota',
      cooldownLabel: 'Cooldown padrão (min)',
      savedCooldown: 'Atual salvo: {minutes} min',
      soundOff: 'Som desligado',
      soundOn: 'Som ligado',
      lightMode: 'Modo claro',
      darkMode: 'Modo escuro',
      cancel: 'Cancelar',
      save: 'Salvar',
    },
    nextPhase: {
      eyebrow: 'Próxima fase sugerida',
      unlocksIn: '{zone} em {timer}',
      noVisibleStages: 'Nenhuma fase visível',
      done: 'Feito',
      currentCooldown: 'CD Atual: {minutes} min',
      orderFirst: 'Ordem: início -> fim',
      orderLast: 'Ordem: fim -> início',
    },
    phase: {
      cooldown: 'CD {timer}',
      unlocksAt: 'Libera {time}',
      ready: 'Pronto',
      historyCount: '{count} baús no histórico',
      done: 'Feito',
      reset: 'Resetar',
      hide: 'Ocultar',
    },
    history: {
      eyebrow: 'Histórico',
      title: 'Farm recente',
      clear: 'Limpar',
      empty: 'Nenhum baú marcado ainda.',
      deleteAria: 'Excluir {zone} do histórico',
      deleteTitle: 'Excluir do histórico',
    },
    hiddenPhases: {
      eyebrow: 'Fases ocultas',
      title: 'Não farmadas',
      empty: 'Todas as fases estão aparecendo na rota.',
      show: 'Mostrar',
    },
    difficulties: {
      normal: 'Normal',
      nightmare: 'Pesadelo',
      hell: 'Inferno',
      torment: 'Tormento',
    },
  },
} as const;

export type Dictionary = (typeof dictionaries)[Locale];

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}

export function formatMessage(
  template: string,
  values: Record<string, string | number>,
) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    String(values[key] ?? ''),
  );
}

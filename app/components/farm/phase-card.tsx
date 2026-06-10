import { type Phase } from '../../lib/farm-data';
import { formatTime, formatTimer } from '../../lib/farm-utils';
import {
  formatMessage,
  getIntlLocale,
  type Dictionary,
  type Locale,
} from '../../lib/i18n';
import { SkullIcon } from '../svg-icon/skull-icon';
import { cn, PixelButton, StatusBadge } from '../ui';

const difficultyClasses = {
  normal: 'border-(--green) text-(--green)',
  nightmare: 'border-[var(--purple)] text-[var(--purple)]',
  hell: 'border-[var(--orange)] text-[var(--orange)]',
  torment: 'border-[var(--red)] text-[var(--red)]',
};

export function PhaseCard({
  dict,
  phase,
  unlockedAt,
  now,
  locale,
  isReady,
  farmCount,
  onMarkDone,
  onClearPhase,
  onToggleHidden,
}: {
  dict: Dictionary;
  phase: Phase;
  unlockedAt: number;
  now: number;
  locale: Locale;
  isReady: boolean;
  farmCount: number;
  onMarkDone: (phase: Phase) => void;
  onClearPhase: (phaseId: string) => void;
  onToggleHidden: (phaseId: string) => void;
}) {
  const remainingMs = unlockedAt - now;
  const isLocked = remainingMs > 0;

  return (
    <article className='border-(--line) bg-linear-to-b from-(--panel) to-(--panel-2) grid gap-3 border-2 p-3 shadow-[0_0_0_2px_var(--outline),0_8px_0_var(--shadow)] md:grid-cols-[minmax(12rem,1fr)_minmax(10rem,0.7fr)_minmax(16rem,0.8fr)] md:items-center'>
      <div className='flex min-w-0 items-center gap-3'>
        <div
          aria-hidden='true'
          className={cn(
            'grid size-10 shrink-0 place-items-center border-2 bg-black/25 text-lg leading-none',
            difficultyClasses[phase.difficulty],
          )}
        >
          <SkullIcon className='size-6 stroke-0' />
        </div>
        <div className='min-w-0'>
          <h3 className='text-(--text) text-2xl font-black leading-none'>
            {phase.zone}
          </h3>
          <p
            className={cn(
              'text-(--muted) mt-1 text-xs',
              difficultyClasses[phase.difficulty],
            )}
          >
            {phase.requirement} / {dict.difficulties[phase.difficulty]}
          </p>
        </div>
      </div>

      <div className='grid gap-1'>
        {isLocked ? (
          <>
            <StatusBadge tone='locked'>
              {formatMessage(dict.phase.cooldown, {
                timer: formatTimer(remainingMs),
              })}
            </StatusBadge>
            <small className='text-(--muted)'>
              {formatMessage(dict.phase.unlocksAt, {
                time: formatTime(unlockedAt, getIntlLocale(locale)),
              })}
            </small>
          </>
        ) : (
          <>
            <StatusBadge tone='ready'>{dict.phase.ready}</StatusBadge>
            <small className='text-(--muted)'>
              {formatMessage(dict.phase.historyCount, { count: farmCount })}
            </small>
          </>
        )}
      </div>

      <div className='grid grid-cols-3 gap-2'>
        <PixelButton
          disabled={!isReady || isLocked}
          type='button'
          variant='primary'
          onClick={() => onMarkDone(phase)}
        >
          {dict.phase.done}
        </PixelButton>
        <PixelButton
          disabled={!isLocked}
          type='button'
          onClick={() => onClearPhase(phase.id)}
        >
          {dict.phase.reset}
        </PixelButton>
        <PixelButton type='button' onClick={() => onToggleHidden(phase.id)}>
          {dict.phase.hide}
        </PixelButton>
      </div>
    </article>
  );
}

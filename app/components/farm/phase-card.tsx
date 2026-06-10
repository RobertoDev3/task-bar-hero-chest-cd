import { type Phase } from '../../lib/farm-data';
import { formatTime, formatTimer } from '../../lib/farm-utils';
import { SkullIcon } from '../svg-icon/skull-icon';
import { cn, PixelButton, StatusBadge } from '../ui';

const difficultyClasses = {
  Normal: 'border-(--green) text-(--green)',
  Pesadelo: 'border-[var(--purple)] text-[var(--purple)]',
  Inferno: 'border-[var(--orange)] text-[var(--orange)]',
  Tormento: 'border-[var(--red)] text-[var(--red)]',
};

export function PhaseCard({
  phase,
  unlockedAt,
  now,
  isReady,
  farmCount,
  onMarkDone,
  onClearPhase,
  onToggleHidden,
}: {
  phase: Phase;
  unlockedAt: number;
  now: number;
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
            {phase.requirement} / {phase.difficulty}
          </p>
        </div>
      </div>

      <div className='grid gap-1'>
        {isLocked ? (
          <>
            <StatusBadge tone='locked'>
              CD {formatTimer(remainingMs)}
            </StatusBadge>
            <small className='text-(--muted)'>
              Libera {formatTime(unlockedAt)}
            </small>
          </>
        ) : (
          <>
            <StatusBadge tone='ready'>Pronta</StatusBadge>
            <small className='text-(--muted)'>
              {farmCount} baus no historico
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
          Feito
        </PixelButton>
        <PixelButton
          disabled={!isLocked}
          type='button'
          onClick={() => onClearPhase(phase.id)}
        >
          Reset
        </PixelButton>
        <PixelButton type='button' onClick={() => onToggleHidden(phase.id)}>
          Ocultar
        </PixelButton>
      </div>
    </article>
  );
}

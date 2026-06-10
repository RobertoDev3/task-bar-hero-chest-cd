import { type Phase, type SortDirection } from '../../lib/farm-data';
import { formatTimer } from '../../lib/farm-utils';
import { formatMessage, type Dictionary } from '../../lib/i18n';
import { PixelButton, PixelPanel } from '../ui';

export function NextPhasePanel({
  cooldownMinutes,
  dict,
  isReady,
  nextAvailable,
  nextUnlock,
  nextUnlockAt,
  now,
  sortDirection,
  onMarkDone,
  onToggleSort,
}: {
  cooldownMinutes: number;
  dict: Dictionary;
  isReady: boolean;
  nextAvailable?: Phase;
  nextUnlock?: Phase;
  nextUnlockAt?: number;
  now: number;
  sortDirection: SortDirection;
  onMarkDone: (phase: Phase) => void;
  onToggleSort: () => void;
}) {
  return (
    <PixelPanel className='p-4'>
      <div className='flex flex-col items-center justify-between gap-10 md:flex-row'>
        <div className='flex items-center gap-10'>
          <div className='min-w-0'>
            <p className='text-(--yellow) text-[0.72rem] font-black uppercase'>
              {dict.nextPhase.eyebrow}
            </p>
            {nextAvailable ? (
              <h2 className='text-(--green) mt-1 text-3xl font-black leading-none'>
                {nextAvailable.zone}{' '}
                <span className='text-(--muted) text-sm'>
                  {dict.difficulties[nextAvailable.difficulty]}
                </span>
              </h2>
            ) : nextUnlock && nextUnlockAt ? (
              <h2 className='text-(--yellow) mt-1 text-2xl font-black leading-none'>
                {formatMessage(dict.nextPhase.unlocksIn, {
                  zone: nextUnlock.zone,
                  timer: formatTimer(nextUnlockAt - now),
                })}
              </h2>
            ) : (
              <h2 className='text-(--muted) mt-1 text-2xl font-black leading-none'>
                {dict.nextPhase.noVisibleStages}
              </h2>
            )}
          </div>

          {nextAvailable ? (
            <PixelButton
              disabled={!isReady}
              className='max-h-10'
              type='button'
              variant='primary'
              onClick={() => onMarkDone(nextAvailable)}
            >
              {dict.nextPhase.done}
            </PixelButton>
          ) : null}
        </div>

        <div className='flex flex-col items-center gap-3'>
          <span className='text-(--muted) text-xs font-black uppercase'>
            {formatMessage(dict.nextPhase.currentCooldown, {
              minutes: cooldownMinutes,
            })}
          </span>
          <PixelButton size='sm' type='button' onClick={onToggleSort}>
            {sortDirection === 'first'
              ? dict.nextPhase.orderFirst
              : dict.nextPhase.orderLast}
          </PixelButton>
        </div>
      </div>
    </PixelPanel>
  );
}

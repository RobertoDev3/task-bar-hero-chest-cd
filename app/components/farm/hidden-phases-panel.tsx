import { type Phase } from '../../lib/farm-data';
import type { Dictionary } from '../../lib/i18n';
import { PixelButton, PixelPanel, SectionTitle } from '../ui';

export function HiddenPhasesPanel({
  dict,
  hiddenPhases,
  onToggleHidden,
}: {
  dict: Dictionary;
  hiddenPhases: Phase[];
  onToggleHidden: (phaseId: string) => void;
}) {
  return (
    <PixelPanel className='p-4'>
      <SectionTitle
        eyebrow={dict.hiddenPhases.eyebrow}
        title={dict.hiddenPhases.title}
      />

      <div className='mt-4 grid gap-2'>
        {hiddenPhases.length === 0 ? (
          <p className='border-(--line) text-(--muted) border-2 border-dashed p-3 text-sm'>
            {dict.hiddenPhases.empty}
          </p>
        ) : (
          hiddenPhases.map(phase => (
            <div
              className='border-(--line) bg-(--tile-bg) flex items-center justify-between gap-3 border-2 p-2'
              key={phase.id}
            >
              <span className='text-(--text) font-black'>
                {phase.zone}{' '}
                <small className='text-(--muted) font-normal'>
                  {dict.difficulties[phase.difficulty]}
                </small>
              </span>
              <PixelButton
                size='sm'
                type='button'
                onClick={() => onToggleHidden(phase.id)}
              >
                {dict.hiddenPhases.show}
              </PixelButton>
            </div>
          ))
        )}
      </div>
    </PixelPanel>
  );
}

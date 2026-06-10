import { type Phase } from '../../lib/farm-data';
import { PixelButton, PixelPanel, SectionTitle } from '../ui';

export function HiddenPhasesPanel({
  hiddenPhases,
  onToggleHidden,
}: {
  hiddenPhases: Phase[];
  onToggleHidden: (phaseId: string) => void;
}) {
  return (
    <PixelPanel className='p-4'>
      <SectionTitle eyebrow='Fases ocultas' title='Nao farmadas' />

      <div className='mt-4 grid gap-2'>
        {hiddenPhases.length === 0 ? (
          <p className='border-(--line) text-(--muted) border-2 border-dashed p-3 text-sm'>
            Todas as fases estao aparecendo na rota.
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
                  {phase.difficulty}
                </small>
              </span>
              <PixelButton
                size='sm'
                type='button'
                onClick={() => onToggleHidden(phase.id)}
              >
                Mostrar
              </PixelButton>
            </div>
          ))
        )}
      </div>
    </PixelPanel>
  );
}

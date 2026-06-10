import { Trash2 } from 'lucide-react';
import { type HistoryEntry } from '../../lib/farm-data';
import { formatTime } from '../../lib/farm-utils';
import { PixelButton, PixelPanel, SectionTitle } from '../ui';

export function HistoryPanel({
  history,
  onClearHistory,
  onDeleteHistoryEntry,
}: {
  history: HistoryEntry[];
  onClearHistory: () => void;
  onDeleteHistoryEntry: (entry: HistoryEntry) => void;
}) {
  return (
    <PixelPanel className='p-4'>
      <div className='flex items-center justify-between gap-3'>
        <SectionTitle eyebrow='Historico' title='Farm recente' />
        <PixelButton size='sm' type='button' onClick={onClearHistory}>
          Limpar
        </PixelButton>
      </div>

      <div className='mt-4 grid gap-2'>
        {history.length === 0 ? (
          <p className='border-(--line) text-(--muted) border-2 border-dashed p-3 text-sm'>
            Nenhum bau marcado ainda.
          </p>
        ) : (
          history.slice(0, 12).map(entry => (
            <div
              className='border-(--line) bg-(--tile-bg) flex items-center justify-between gap-3 border-2 p-2'
              key={entry.id}
            >
              <strong className='text-(--text)'>{entry.phaseZone}</strong>
              <span className='text-(--yellow) text-xs'>
                {formatTime(entry.doneAt)}
              </span>
              <PixelButton
                aria-label={`Excluir ${entry.phaseZone} do historico`}
                size='icon'
                title='Excluir do historico'
                type='button'
                variant='danger'
                onClick={() => onDeleteHistoryEntry(entry)}
              >
                <Trash2 aria-hidden='true' size={16} strokeWidth={2.5} />
              </PixelButton>
            </div>
          ))
        )}
      </div>
    </PixelPanel>
  );
}

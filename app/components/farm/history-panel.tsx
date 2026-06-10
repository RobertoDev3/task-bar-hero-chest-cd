import { Trash2 } from 'lucide-react';
import { type HistoryEntry } from '../../lib/farm-data';
import { formatTime } from '../../lib/farm-utils';
import { formatMessage, getIntlLocale, type Dictionary, type Locale } from '../../lib/i18n';
import { PixelButton, PixelPanel, SectionTitle } from '../ui';

export function HistoryPanel({
  dict,
  history,
  locale,
  onClearHistory,
  onDeleteHistoryEntry,
}: {
  dict: Dictionary;
  history: HistoryEntry[];
  locale: Locale;
  onClearHistory: () => void;
  onDeleteHistoryEntry: (entry: HistoryEntry) => void;
}) {
  return (
    <PixelPanel className='p-4'>
      <div className='flex items-center justify-between gap-3'>
        <SectionTitle eyebrow={dict.history.eyebrow} title={dict.history.title} />
        <PixelButton size='sm' type='button' onClick={onClearHistory}>
          {dict.history.clear}
        </PixelButton>
      </div>

      <div className='mt-4 grid gap-2'>
        {history.length === 0 ? (
          <p className='border-(--line) text-(--muted) border-2 border-dashed p-3 text-sm'>
            {dict.history.empty}
          </p>
        ) : (
          history.slice(0, 12).map(entry => (
            <div
              className='border-(--line) bg-(--tile-bg) flex items-center justify-between gap-3 border-2 p-2'
              key={entry.id}
            >
              <strong className='text-(--text)'>{entry.phaseZone}</strong>
              <span className='text-(--yellow) text-xs'>
                {formatTime(entry.doneAt, getIntlLocale(locale))}
              </span>
              <PixelButton
                aria-label={formatMessage(dict.history.deleteAria, {
                  zone: entry.phaseZone,
                })}
                size='icon'
                title={dict.history.deleteTitle}
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

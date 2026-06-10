import { Settings } from 'lucide-react';
import { PixelButton, PixelPanel, StatTile } from '../ui';

export function AppHeader({
  availableCount,
  cooldownCount,
  historyCount,
  onOpenSettings,
}: {
  availableCount: number;
  cooldownCount: number;
  historyCount: number;
  onOpenSettings: () => void;
}) {
  return (
    <PixelPanel className='grid gap-4 p-4 lg:grid-cols-[1fr_auto]'>
      <div>
        <p className='text-(--yellow) text-[0.72rem] font-black uppercase'>
          Task Bar Hero
        </p>
        <h1 className='text-(--blue) mt-1 text-3xl font-black uppercase leading-none sm:text-4xl'>
          Chest Route CD
        </h1>
      </div>

      <div className='grid gap-2 sm:grid-cols-2 lg:grid-cols-4'>
        <StatTile label='Disponiveis' value={availableCount} />
        <StatTile label='Em CD' value={cooldownCount} />
        <StatTile label='Baus farmados' value={historyCount} />
        <PixelButton onClick={onOpenSettings}>
          <Settings aria-hidden='true' size={18} strokeWidth={2.5} />
          Config
        </PixelButton>
      </div>
    </PixelPanel>
  );
}

import { Settings } from 'lucide-react';
import { type Dictionary } from '../../lib/i18n';
import { PixelButton, PixelPanel, StatTile } from '../ui';

export function AppHeader({
  availableCount,
  cooldownCount,
  dict,
  historyCount,
  onOpenHowItWorks,
  onOpenSettings,
}: {
  availableCount: number;
  cooldownCount: number;
  dict: Dictionary;
  historyCount: number;
  onOpenHowItWorks: () => void;
  onOpenSettings: () => void;
}) {
  return (
    <PixelPanel className='grid gap-4 p-4 lg:grid-cols-[1fr_auto]'>
      <div>
        <p className='text-(--yellow) text-[0.72rem] font-black uppercase'>
          {dict.header.gameName}
        </p>
        <h1 className='text-(--blue) mt-1 text-3xl font-black uppercase leading-none sm:text-4xl'>
          {dict.header.title}
        </h1>
      </div>

      <div className='grid gap-2 sm:grid-cols-2 lg:grid-cols-5'>
        <StatTile label={dict.header.available} value={availableCount} />
        <StatTile label={dict.header.cooldown} value={cooldownCount} />
        <StatTile label={dict.header.farmedChests} value={historyCount} />
        <PixelButton onClick={onOpenHowItWorks}>
          {dict.header.howItWorks}
        </PixelButton>
        <PixelButton onClick={onOpenSettings}>
          <Settings aria-hidden='true' size={18} strokeWidth={2.5} />
          {dict.header.config}
        </PixelButton>
      </div>
    </PixelPanel>
  );
}

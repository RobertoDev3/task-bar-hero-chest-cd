import { usePathname, useRouter } from 'next/navigation';
import { PixelButton, PixelPanel, SectionTitle } from '../ui';
import { normalizeCooldownMinutes } from '../../lib/farm-utils';
import type { Theme } from '../../lib/farm-data';
import { formatMessage, type Dictionary, type Locale } from '../../lib/i18n';

export function SettingsPanel({
  cooldownMinutes,
  dict,
  draftCooldownMinutes,
  locale,
  muted,
  theme,
  onDraftCooldownChange,
  onToggleMuted,
  onToggleTheme,
  onCancel,
  onSave,
}: {
  cooldownMinutes: number;
  dict: Dictionary;
  draftCooldownMinutes: number;
  locale: Locale;
  muted: boolean;
  theme: Theme;
  onDraftCooldownChange: (value: number) => void;
  onToggleMuted: () => void;
  onToggleTheme: () => void;
  onCancel: () => void;
  onSave: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();

  function switchLocale(nextLocale: Locale) {
    const nextPath = pathname.replace(/^\/(en|pt)(?=\/|$)/, `/${nextLocale}`);
    router.replace(nextPath);
  }

  return (
    <PixelPanel className='grid gap-4 p-4'>
      <div className='flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between'>
        <SectionTitle
          eyebrow={dict.settings.eyebrow}
          title={dict.settings.title}
        />

        <label className='grid w-full max-w-44 gap-1 sm:justify-self-end'>
          <span className='text-(--muted) text-[0.72rem] font-black uppercase'>
            {dict.language.label}
          </span>
          <select
            className='border-(--button-border) bg-(--button-bg) text-(--text) min-h-9 cursor-pointer border-2 px-3 text-xs font-black uppercase outline-none'
            value={locale}
            onChange={event => switchLocale(event.target.value as Locale)}
          >
            <option value='en'>{dict.language.english}</option>
            <option value='pt'>{dict.language.portuguese}</option>
          </select>
        </label>
      </div>

      <div className='grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end'>
        <div className='grid gap-2'>
          <span className='text-(--muted) text-xs font-black uppercase'>
            {dict.settings.cooldownLabel}
          </span>
          <div className='border-(--button-border) bg-(--button-bg) inline-grid w-fit grid-cols-[2.25rem_4.5rem_2.25rem_auto] items-center border-2'>
            <button
              className='text-(--text) hover:text-(--blue) min-h-9 cursor-pointer font-black'
              type='button'
              onClick={() =>
                onDraftCooldownChange(
                  normalizeCooldownMinutes(draftCooldownMinutes - 1),
                )
              }
            >
              -
            </button>
            <input
              className='text-(--green) w-18 border-(--button-border) min-h-9 appearance-none border-x-2 bg-black/20 text-center font-black outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
              inputMode='numeric'
              max='180'
              min='1'
              type='number'
              value={draftCooldownMinutes}
              onChange={event =>
                onDraftCooldownChange(
                  normalizeCooldownMinutes(event.target.value),
                )
              }
            />
            <button
              className='text-(--text) hover:text-(--blue) min-h-9 cursor-pointer font-black'
              type='button'
              onClick={() =>
                onDraftCooldownChange(
                  normalizeCooldownMinutes(draftCooldownMinutes + 1),
                )
              }
            >
              +
            </button>
          </div>
          <span className='text-(--muted) text-[0.72rem]'>
            {formatMessage(dict.settings.savedCooldown, {
              minutes: cooldownMinutes,
            })}
          </span>
        </div>

        <div className='grid gap-2 sm:grid-cols-2 lg:grid-cols-4'>
          <PixelButton type='button' onClick={onToggleMuted}>
            {muted ? dict.settings.soundOff : dict.settings.soundOn}
          </PixelButton>
          <PixelButton type='button' onClick={onToggleTheme}>
            {theme === 'dark' ? dict.settings.lightMode : dict.settings.darkMode}
          </PixelButton>
          <PixelButton type='button' variant='ghost' onClick={onCancel}>
            {dict.settings.cancel}
          </PixelButton>
          <PixelButton type='button' variant='primary' onClick={onSave}>
            {dict.settings.save}
          </PixelButton>
        </div>
      </div>
    </PixelPanel>
  );
}

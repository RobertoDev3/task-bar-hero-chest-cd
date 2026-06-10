import { PixelButton, PixelPanel, SectionTitle } from '../ui';
import { normalizeCooldownMinutes } from '../../lib/farm-utils';
import type { Theme } from '../../lib/farm-data';

export function SettingsPanel({
  cooldownMinutes,
  draftCooldownMinutes,
  muted,
  theme,
  onDraftCooldownChange,
  onToggleMuted,
  onToggleTheme,
  onCancel,
  onSave,
}: {
  cooldownMinutes: number;
  draftCooldownMinutes: number;
  muted: boolean;
  theme: Theme;
  onDraftCooldownChange: (value: number) => void;
  onToggleMuted: () => void;
  onToggleTheme: () => void;
  onCancel: () => void;
  onSave: () => void;
}) {
  return (
    <PixelPanel className='grid gap-4 p-4'>
      <SectionTitle eyebrow='Configuracoes' title='Preferencias da rota' />

      <div className='grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end'>
        <div className='grid gap-2'>
          <span className='text-(--muted) text-xs font-black uppercase'>
            Cooldown padrao &#40;min&#41;
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
            Atual salvo: {cooldownMinutes} min
          </span>
        </div>

        <div className='grid gap-2 sm:grid-cols-2 lg:grid-cols-4'>
          <PixelButton type='button' onClick={onToggleMuted}>
            {muted ? 'Som off' : 'Som on'}
          </PixelButton>
          <PixelButton type='button' onClick={onToggleTheme}>
            {theme === 'dark' ? 'Modo claro' : 'Modo escuro'}
          </PixelButton>
          <PixelButton type='button' variant='ghost' onClick={onCancel}>
            Cancelar
          </PixelButton>
          <PixelButton type='button' variant='primary' onClick={onSave}>
            Salvar
          </PixelButton>
        </div>
      </div>
    </PixelPanel>
  );
}

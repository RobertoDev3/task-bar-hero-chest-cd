'use client';

import Image from 'next/image';
import { Maximize2, Minimize2, X } from 'lucide-react';
import { type MouseEvent, useState } from 'react';
import howItWorksImage from '../../assets/como-funciona.png';
import { cn, PixelButton, PixelPanel } from '../ui';

export function HowItWorksModal({ onClose }: { onClose: () => void }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState('50% 50%');

  function updateZoomOrigin(event: MouseEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const xPercent = ((event.clientX - bounds.left) / bounds.width) * 100;
    const yPercent = ((event.clientY - bounds.top) / bounds.height) * 100;

    setZoomOrigin(
      `${Math.min(100, Math.max(0, xPercent))}% ${Math.min(
        100,
        Math.max(0, yPercent),
      )}%`,
    );
  }

  return (
    <div
      aria-modal='true'
      className='fixed inset-0 z-50 grid place-items-center bg-black/75 p-4 backdrop-blur-sm'
      role='dialog'
      onClick={onClose}
    >
      <PixelPanel
        className={cn(
          'max-h-[92vh] w-full overflow-hidden',
          isFullscreen ? 'max-w-[calc(100vw-2rem)]' : 'max-w-5xl',
        )}
        onClick={event => event.stopPropagation()}
      >
        <div className='flex items-center justify-between gap-3 border-b-2 border-[var(--line)] p-4'>
          <div>
            <p className='text-[0.72rem] font-black uppercase text-[var(--yellow)]'>
              Guia rapido
            </p>
            <h2 className='mt-1 text-xl font-black uppercase leading-none text-[var(--blue)]'>
              Como funciona?
            </h2>
          </div>

          <div className='flex items-center gap-2'>
            <PixelButton
              aria-label={
                isFullscreen ? 'Sair da tela cheia' : 'Ver imagem em tela cheia'
              }
              size='icon'
              type='button'
              variant='ghost'
              onClick={() => setIsFullscreen(currentValue => !currentValue)}
            >
              {isFullscreen ? (
                <Minimize2 aria-hidden='true' size={18} strokeWidth={2.5} />
              ) : (
                <Maximize2 aria-hidden='true' size={18} strokeWidth={2.5} />
              )}
            </PixelButton>
            <PixelButton
              aria-label='Fechar guia'
              size='icon'
              type='button'
              variant='ghost'
              onClick={onClose}
            >
              <X aria-hidden='true' size={18} strokeWidth={2.5} />
            </PixelButton>
          </div>
        </div>

        <div className='max-h-[calc(92vh-5rem)] overflow-auto p-3'>
          <div
            className={cn(
              'group overflow-hidden border-2 border-[var(--line)] bg-black/30',
              'cursor-zoom-in',
            )}
            onMouseLeave={() => setZoomOrigin('50% 50%')}
            onMouseMove={updateZoomOrigin}
          >
            <Image
              alt='Imagem explicando como funciona a rota de farm de baus'
              className={cn(
                'h-auto w-full select-none transition-transform duration-200 ease-out',
                isFullscreen
                  ? 'group-hover:scale-[1.65]'
                  : 'group-hover:scale-[1.45]',
              )}
              draggable={false}
              placeholder='blur'
              priority
              src={howItWorksImage}
              style={{ transformOrigin: zoomOrigin }}
            />
          </div>
        </div>
      </PixelPanel>
    </div>
  );
}

'use client';

import Image from 'next/image';
import { Maximize2, Minimize2, X } from 'lucide-react';
import { type MouseEvent, useState } from 'react';
import howItWorksImage from '../../assets/como-funciona.png';
import type { Dictionary } from '../../lib/i18n';
import { cn, PixelButton, PixelPanel } from '../ui';

export function HowItWorksModal({
  dict,
  onClose,
}: {
  dict: Dictionary;
  onClose: () => void;
}) {
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
        <div className='border-(--line) flex items-center justify-between gap-3 border-b-2 p-4'>
          <div>
            <p className='text-(--yellow) text-[0.72rem] font-black uppercase'>
              {dict.howItWorks.eyebrow}
            </p>
            <h2 className='text-(--blue) mt-1 text-xl font-black uppercase leading-none'>
              {dict.howItWorks.title}
            </h2>
          </div>

          <div className='flex items-center gap-2'>
            <PixelButton
              aria-label={
                isFullscreen ? dict.howItWorks.shrink : dict.howItWorks.expand
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
              aria-label={dict.howItWorks.close}
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
              'border-(--line) group overflow-hidden border-2 bg-black/30',
              'cursor-zoom-in',
            )}
            onMouseLeave={() => setZoomOrigin('50% 50%')}
            onMouseMove={updateZoomOrigin}
          >
            <Image
              alt={dict.howItWorks.imageAlt}
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

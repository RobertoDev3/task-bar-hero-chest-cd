import type { ReactNode } from 'react';
import { cn } from './cn';

export function StatusBadge({
  tone,
  children,
}: {
  tone: 'ready' | 'locked';
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        'w-fit border-2 px-2 py-1 text-[0.72rem] font-black uppercase tracking-widest',
        tone === 'ready' && 'text-(--green) border-(--green)',
        tone === 'locked' && 'text-(--yellow) border-(--yellow)',
      )}
    >
      {children}
    </span>
  );
}

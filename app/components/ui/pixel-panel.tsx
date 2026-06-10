import type { HTMLAttributes } from 'react';
import { cn } from './cn';

export function PixelPanel({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={cn(
        'border-(--line) bg-linear-to-b from-(--panel) to-(--panel-2) border-2 shadow-[0_0_0_2px_var(--outline),0_8px_0_var(--shadow)]',
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}

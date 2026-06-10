import type { ButtonHTMLAttributes } from 'react';
import { cn } from './cn';

type ButtonVariant = 'default' | 'primary' | 'danger' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'icon';

const variantClasses: Record<ButtonVariant, string> = {
  default:
    'border-[var(--button-border)] bg-[var(--button-bg)] text-(--text) hover:border-[var(--blue)]',
  primary:
    'border-(--green) bg-[var(--button-primary-bg)] text-(--green) hover:border-green-600',
  danger:
    'border-[var(--button-border)] bg-[var(--button-bg)] text-[var(--red)] hover:border-[var(--red)]',
  ghost:
    'border-(--line) bg-transparent text-(--muted) hover:border-[var(--blue)] hover:text-(--text)',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'min-h-8 px-3 text-[0.72rem]',
  md: 'min-h-9 px-4 text-xs',
  icon: 'h-9 w-9 text-xs',
};

type PixelButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function PixelButton({
  className,
  children,
  variant = 'default',
  size = 'md',
  ...props
}: PixelButtonProps) {
  return (
    <button
      className={cn(
        'duration-400 inline-flex cursor-pointer items-center justify-center gap-2 border-2 font-black uppercase transition disabled:cursor-not-allowed disabled:opacity-40',
        'active:translate-y-px',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

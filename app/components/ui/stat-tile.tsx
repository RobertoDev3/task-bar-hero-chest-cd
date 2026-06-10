import type { ReactNode } from 'react';

export function StatTile({
  label,
  value,
}: {
  label: string;
  value: ReactNode;
}) {
  return (
    <div className='border-(--line) bg-(--tile-bg) border-2 px-3 py-2'>
      <span className='text-(--muted) block text-[0.72rem] font-black uppercase'>
        {label}
      </span>
      <strong className='text-(--green) block text-xl font-black leading-none'>
        {value}
      </strong>
    </div>
  );
}

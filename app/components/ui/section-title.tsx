export function SectionTitle({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div>
      <p className='text-(--yellow) text-[0.72rem] font-black uppercase'>
        {eyebrow}
      </p>
      <h2 className='text-(--blue) mt-1 text-base font-black uppercase leading-none'>
        {title}
      </h2>
    </div>
  );
}

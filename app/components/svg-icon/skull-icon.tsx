export function SkullIcon({
  className,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill='#000000'
      viewBox='0 0 16 16'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      {...props}
    >
      <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
      <g id='SVGRepo_tracerCarrier' stroke='round' strokeLinejoin='round'></g>
      <g id='SVGRepo_iconCarrier'>
        <path
          d='M0 0h16v12h-2v4H2v-4H0V0zm2 2v8h2v4h1v-2h2v2h2v-2h2v2h1v-4h2V2H2zm6 6l1.414 1.414-.707.707L8 9.414l-.707.707-.707-.707L8 8zm2-3h2v2h-2V5zM4 5h2v2H4V5z'
          fill='currentColor'
        ></path>
      </g>
    </svg>
  );
}

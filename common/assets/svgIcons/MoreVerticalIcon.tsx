import { ComponentPropsWithoutRef } from 'react';

function MoreVerticalIcon(props: ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg width="7" height="41" viewBox="0 0 7 41" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="3.5" cy="3.5" r="3.5" fill="currentColor"/>
      <circle cx="3.5" cy="20.5" r="3.5" fill="currentColor"/>
      <circle cx="3.5" cy="37.5" r="3.5" fill="currentColor"/>
    </svg>
  );
}

export default MoreVerticalIcon;

import MoreVerticalIcon from '@/common/assets/svgIcons/MoreVerticalIcon';
import cn from '@/common/utils/tailwindcss/cn';
import { Ref } from 'react';

interface IMoreDataIndicatorProps {
  ref: Ref<HTMLDivElement>;
}

function MoreDataIndicator(props: IMoreDataIndicatorProps) {
  const {
    ref,
  } = props;

  return (
    <div
      ref={ref}
      className={cn(
        'mt-9',
        'flex justify-center',
        'text-cdri-primary'
      )}
    >
      <MoreVerticalIcon />
    </div>
  );
}

export default MoreDataIndicator;

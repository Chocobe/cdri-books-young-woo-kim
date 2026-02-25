import cn from '@/common/utils/tailwindcss/cn';
import Image from 'next/image';

interface INoDataIndicatorProps {
  className?: string;
}

function NoDataIndicator(props: INoDataIndicatorProps) {
  const {
    className,
  } = props;

  return (
    <div className={cn(
      'py-30',
      'flex flex-col items-center gap-6',
      className
    )}>
      <Image
        src="/imgs/icon_book.png"
        alt="no-data"
        width={80}
        height={80}
      />
      <div className={cn(
        'cdri-caption text-cdri-secondary'
      )}>
        검색된 결과가 없습니다.
      </div>
    </div>
  );
}

export default NoDataIndicator;

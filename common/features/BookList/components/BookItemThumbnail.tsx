import { TBookModel } from '@/common/apis/bookApis/bookApis.type';
import cn from '@/common/utils/tailwindcss/cn';
import Image from 'next/image';
import { CSSProperties } from 'react';

const IMAGE_MIN_WIDTH = 48;
const IMAGE_MIN_HEIGHT = 68;

const IMAGE_MAX_WIDTH = 210;
const IMAGE_MAX_HEIGHT = 280;

interface IBookItemThumnailProps extends Pick<
  TBookModel, 
  'title' | 'thumbnail'
> {
  className?: string;
  isSelected: boolean;
  transitionDuration?: CSSProperties['transitionDuration'];
}

function BookItemThumbnail(props: IBookItemThumnailProps) {
  const {
    className,
    title,
    thumbnail,
    isSelected,
    transitionDuration,
  } = props;

  return (
    <figure
      className={cn(
        'relative overflow-hidden',
        'transition-all',
        className
      )}
      style={{
        width: `${isSelected ? IMAGE_MAX_WIDTH : IMAGE_MIN_WIDTH}px`,
        height: `${isSelected ? IMAGE_MAX_HEIGHT : IMAGE_MIN_HEIGHT}px`,
        transitionDuration,
      }}
    >
      <Image
        src={thumbnail}
        alt={title}
        fill
        sizes={`${IMAGE_MIN_WIDTH}px`}
      />
    </figure>
  );
}

export default BookItemThumbnail;

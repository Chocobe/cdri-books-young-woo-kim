import { TBookModel } from '@/common/apis/bookApis/bookApis.type';
import LikeFillIcon from '@/common/assets/svgIcons/LikeFillIcon';
import LikeLineIcon from '@/common/assets/svgIcons/LikeLineIcon';
import useBookStore from '@/common/stores/bookStore/useBookStore';
import cn from '@/common/utils/tailwindcss/cn';
import Image from 'next/image';
import { CSSProperties } from 'react';

const IMAGE_MIN_WIDTH = 48;
const IMAGE_MIN_HEIGHT = 68;

const IMAGE_MAX_WIDTH = 210;
const IMAGE_MAX_HEIGHT = 280;

interface IBookItemThumnailProps {
  className?: string;
  book: TBookModel;
  isSelected: boolean;
  transitionDuration?: CSSProperties['transitionDuration'];
}

function BookItemThumbnail(props: IBookItemThumnailProps) {
  const {
    className,
    book,
    isSelected,
    transitionDuration,
  } = props;

  const size = {
    width: isSelected ? '24px' : '16px',
    height: isSelected ? '24px' : '16px',
  };
  const iconStyle: CSSProperties = {
    transition: 'all',
    transitionDuration,
    color: 'var(--color-cdri-red)',
  };

  const isWishBook = useBookStore(state => !!state.wishBooks.wishBooksRecord[book.isbn]);
  const toggleWishBook = useBookStore(state => state.wishBooks.toggleWishBook);

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
        src={book.thumbnail || '/imgs/icon_book.png'}
        alt={book.title}
        fill
        sizes={`${IMAGE_MIN_WIDTH}px`}
        className="object-cover"
      />
      <button
        className={cn(
          'cursor-pointer transition-all',
          'absolute',
          isSelected
            ? 'top-2 right-2'
            : 'top-0 right-0'
        )}
        style={{
          transitionDuration,
        }}
        onClick={() => {
          toggleWishBook(book);
        }}
      >
        {isWishBook
          ? (
            <LikeFillIcon
              {...size} 
              style={iconStyle}
            />
          )
          : (
            <LikeLineIcon
              {...size}
              style={iconStyle}
            />
          )
        }
      </button>
    </figure>
  );
}

export default BookItemThumbnail;

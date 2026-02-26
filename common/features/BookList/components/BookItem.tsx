import { TBookModel } from '@/common/apis/bookApis/bookApis.type';
import {
  ICDRIAccordionCustomItemImplProps,
} from '@/common/components/ui/CDRIAccordion/CDRIAccordion';
import cn from '@/common/utils/tailwindcss/cn';
import BookItemThumbnail from './BookItemThumbnail';
import BookItemContents from './BookItemContents';
import { CSSProperties } from 'react';
import BookItemActions from './BookItemActions';

const TRANSITION_DURATION: CSSProperties['transitionDuration'] = '500ms';

interface IBookItemProps extends ICDRIAccordionCustomItemImplProps {
  book: TBookModel;
}

function BookItem(props: IBookItemProps) {
  const {
    id,
    isSelected,
    setIsSelected,
    book: {
      title,
      thumbnail,
      authors,
      contents,
      price,
      sale_price,
      url,
    },
  } = props;

  return (
    <li
      className={cn(
        'flex items-center',
        'border-b border-cdri-light-gray-2',
        'transition-all',
        isSelected
          ? 'p-[24px_16px_40px_54px]'
          : 'p-[16px_16px_16px_48px]'
      )}
      style={{
        transitionDuration: TRANSITION_DURATION,
      }}
    >
      <BookItemThumbnail
        className={cn(
          'flex-none',
          isSelected ? 'mr-8' : 'mr-12'
        )}
        title={title}
        thumbnail={thumbnail}
        isSelected={isSelected}
        transitionDuration={TRANSITION_DURATION}
      />
      <BookItemContents
        className={cn(
          'mr-12',
          'min-w-0'
        )}
        title={title}
        authors={authors}
        contents={contents}
        sale_price={sale_price}
        isSelected={isSelected}
        transitionDuration={TRANSITION_DURATION}
      />
      <BookItemActions
        className={cn(
          'flex-none'
        )}
        id={id}
        price={price}
        sale_price={sale_price}
        url={url}
        isSelected={isSelected}
        setIsSelected={setIsSelected}
        transitionDuration={TRANSITION_DURATION}
      />
    </li>
  );
}

export default BookItem;

'use client';

import NoDataIndicator from '@/common/components/composite/NoDataIndicator/NoDataIndicator';
import SearchCountIndicator from '@/common/components/composite/SearchCountIndicator/SearchCountIndicator';
import BookList from '@/common/features/BookList/BookList';
import useBookStore from '@/common/stores/bookStore/useBookStore';
import cn from '@/common/utils/tailwindcss/cn';

function WishBooksPage() {
  const wishBooksRecord = useBookStore(state => {
    return state.wishBooks.wishBooksRecord;
  });

  const count = Object.values(wishBooksRecord).length;
  const books = Object.values(wishBooksRecord);

  return (
    <div className={cn(
      'mx-auto py-20',
      'w-240'
    )}>
      <h2 className={cn(
        'h-9',
        'cdri-title-2'
      )}>
        내가 찜한 책
      </h2>
      <SearchCountIndicator
        className="mt-6"
        label="찜한 책"
        count={count}
      />
      {!!count
        ? <BookList books={books} />
        : <NoDataIndicator message="찜한 책이 없습니다." />
      }
      
    </div>
  );
}

export default WishBooksPage;

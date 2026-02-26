'use client';

import cn from '@/common/utils/tailwindcss/cn';
import BookSearchBar from '@/common/features/BookSearchBar/BookSearchBar';
import SearchCountIndicator from '@/common/components/composite/SearchCountIndicator/SearchCountIndicator';
import BookList from '@/common/features/BookList/BookList';
import useBooksInfiniteQuery from '@/common/features/BookSearchBar/queries/useBooksInfiniteQuery';
import useBookStore from '@/common/stores/bookStore/useBookStore';
import { useInView } from 'react-intersection-observer';
import { 
  useMemo,
  useEffect, 
} from 'react';
import NoDataIndicator from '@/common/components/composite/NoDataIndicator/NoDataIndicator';
import { throttle } from 'es-toolkit';
import MoreDataIndicator from '@/common/components/composite/MoreDataIndicator/MoreDataIndicator';

function HomePage() {
  const queryParams = useBookStore(state => {
    return state.bookSearch.queryParamsForRetrieveBooksApi;
  });

  const {
    ref,
    inView,
  } = useInView({
    threshold: 0.5,
  });

  const {
    isFetchingNextPage,
    hasNextPage,

    isSuccess,
    data,

    isError,
    error,

    fetchNextPage,
  } = useBooksInfiniteQuery({
    queryParams,
  });

  const throttledFetchNextPage = useMemo(() => {
    return throttle(
      fetchNextPage, 
      300, 
      { edges: ['leading'] }
    );
  }, [
    fetchNextPage,
  ]);

  useEffect(() => {
    if (inView
      && hasNextPage
      && !isFetchingNextPage
    ) {
      throttledFetchNextPage();
    }
  }, [
    inView,
    hasNextPage,
    isFetchingNextPage,
    throttledFetchNextPage,
  ]);

  const searchCount = data
    ?.pages
    ?.reduce((count, { documents }) => {
      return count + (documents?.length ?? 0);
    }, 0)
    ?? 0;

  useEffect(() => {
    if (isError && error) {
      console.error(error);
    }
  }, [
    isError, 
    error,
  ]);

  return (
    <div className={cn(
      'mx-auto py-20',
      'w-240'
    )}>
      <div className={cn(
        // 
      )}>
        <BookSearchBar />
        <SearchCountIndicator
          className="mt-6"
          label="도서 검색 결과"
          count={searchCount}
        />
        {isSuccess && searchCount === 0
          ? <NoDataIndicator />
          : <BookList />
        }

        {hasNextPage && (
          <MoreDataIndicator ref={ref} />
        )}
      </div>
    </div>
  );
}

export default HomePage;

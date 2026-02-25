import cn from '@/common/utils/tailwindcss/cn';
import BookSearchBar from '@/common/features/BookSearchBar/BookSearchBar';
import SearchCountIndicator from '@/common/components/composite/SearchCountIndicator/SearchCountIndicator';
import NoDataIndicator from '@/common/components/composite/NoDataIndicator/NoDataIndicator';

function HomePage() {
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
          // TODO: query 연동하기
          count={123}
        />
        {/* TODO: query 연동하기 */}
        <NoDataIndicator />
      </div>
    </div>
  );
}

export default HomePage;

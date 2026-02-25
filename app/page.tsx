import cn from '@/common/utils/tailwindcss/cn';
import BookSearchBar from '@/common/features/BookSearchBar/BookSearchBar';

function HomePage() {
  return (
    <div className={cn(
      'mx-auto py-20',
      'w-240'
    )}>
      <BookSearchBar />
    </div>
  );
}

export default HomePage;

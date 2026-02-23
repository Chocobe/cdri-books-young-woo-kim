import cn from '@/common/utils/tailwindcss/cn';
import Counter from '@/common/test/_samples/_Counter';

function HomePage() {
  return (
    <div className={cn(
      'cdri-title-2',
      'text-cdri-subtitle'
    )}>
      <h1>
        Home Page
      </h1>

      <Counter />
    </div>
  );
}

export default HomePage;

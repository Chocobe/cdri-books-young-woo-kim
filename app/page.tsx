import cn from '@/common/utils/tailwindcss/cn';
import Counter from '@/common/features/Counter/Counter';

function HomePage() {
  return (
    <div className={cn(
      'cdri-title-2',
      // 'cdri-body-2-bold'
      // 'cdri-caption'
      // 'cdri-small',
      'cdri-theme-text-subtitle'
    )}>
      <h1>
        Home Page
      </h1>

      <Counter />
    </div>
  );
}

export default HomePage;

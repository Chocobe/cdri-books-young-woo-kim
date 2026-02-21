import cn from '@/common/utils/tailwindcss/cn';

function HomePage() {
  return (
    <div className={cn(
      'cdri-title-2',
      // 'cdri-body-2-bold'
      // 'cdri-caption'
      // 'cdri-small',
      'cdri-theme-text-subtitle'
    )}>
      Home Page
    </div>
  );
}

export default HomePage;

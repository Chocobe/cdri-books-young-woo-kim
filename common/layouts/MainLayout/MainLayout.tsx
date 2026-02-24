import cn from '@/common/utils/tailwindcss/cn';
import { PropsWithChildren } from 'react';
import MainLayoutHeader from './components/MainLayoutHeader/MainLayoutHeader';

function MainLayout(props: PropsWithChildren) {
  const { children } = props;

  return (
    <div className={cn(
      'w-full h-full overflow-auto'
    )}>
      <div className="mx-auto w-360">
        <MainLayoutHeader className={cn(
          'sticky top-0'
        )} />
        <main className="flex flex-col items-center">
          {children}
        </main>
      </div>
    </div>
  );
}

export default MainLayout;

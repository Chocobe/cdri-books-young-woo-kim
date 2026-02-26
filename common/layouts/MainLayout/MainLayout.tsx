import cn from '@/common/utils/tailwindcss/cn';
import { PropsWithChildren } from 'react';
import MainLayoutHeader from './components/MainLayoutHeader/MainLayoutHeader';

function MainLayout(props: PropsWithChildren) {
  const { children } = props;

  return (
    <div className={cn(
      'w-full h-full',
      'overflow-x-auto overflow-y-scroll'
    )}>
      <div className="mx-auto w-360">
        <MainLayoutHeader className={cn(
          'sticky top-0 z-50'
        )} />
        <main>
          {children}
        </main>
      </div>
    </div>
  );
}

export default MainLayout;

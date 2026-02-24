'use client';

import appRouteManager from '@/common/utils/appRouter/appRouteManager';
import Link from 'next/link';
import cn from '@/common/utils/tailwindcss/cn';
import { ClassValue } from 'clsx';
import { usePathname } from 'next/navigation';

const linkItems = appRouteManager.getAppRouteItems(
  'LIBRARY',
  'WISH'
);

interface IMainLayoutHeaderProps {
  className: ClassValue;
};

function MainLayoutHeader(props: IMainLayoutHeaderProps) {
  const { className } = props;

  const pathname = usePathname();

  return (
    <header className={cn(
      'px-10 h-20',
      'flex items-center',
      'bg-cdri-white',
      className
    )}>
      <div className={cn(
        'text-2xl leading-8 font-bold',
        'flex-1'
      )}>
        CERTICOS BOOKS
      </div>
      <div className={cn(
        'flex-none',
        'flex items-center gap-14'
      )}>
        {linkItems.map(item => {
          const {
            path,
            displayName,
          } = item;

          const isActive = path === pathname;

          return (
            <Link
              className={cn(
                'text-[#3A3A3A] text-[20px] leading-8 font-medium',
                'border-b border-cdri-white',
                isActive && 'text-[#1B1B1B] border-cdri-primary'
              )}
              key={path}
              href={path}
            >
              {displayName}
            </Link>
          );
        })}
      </div>

      <div className="flex-1" />
    </header>
  );
}

export default MainLayoutHeader;

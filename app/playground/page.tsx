import appRouteManager from '@/common/utils/appRouter/appRouteManager';
import cn from '@/common/utils/tailwindcss/cn';
import Link from 'next/link';

const linkItems = appRouteManager.getAppRouteItems(
  'ACCORDION',
  'BUTTON',
  'INPUT',
  'SELECT',
  'COMBOBOX',
  'POPOVER'
);

function PlaygroundRootPage() {
  return (
    <div className={cn(
      'mx-auto py-20',
      'w-240'
    )}>
      <h2 className={cn(
        'h-9',
        'cdri-title-2'
      )}>
        UI Playground
      </h2>
      <div className={cn(
        'mt-6 pl-5',
        'flex flex-col gap-5'
      )}>
        {linkItems.map(item => {
          const {
            path,
            displayName,
          } = item;

          return (
            <Link
              className={cn(
                'text-[#3A3A3A] text-[20px] leading-8 font-medium',
                'border-b border-cdri-white'
              )}
              key={path}
              href={path}
            >
              {displayName}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default PlaygroundRootPage;

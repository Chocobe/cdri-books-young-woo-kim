import { CSSProperties } from 'react';
import { TBookModel } from '@/common/apis/bookApis/bookApis.type';
import toKRW from '@/common/utils/number/toKRW';
import cn from '@/common/utils/tailwindcss/cn';

interface IBookItemContentsProps extends Pick<
  TBookModel,
  'title' | 'authors' | 'contents' | 'sale_price'
> {
  className?: string;
  isSelected: boolean;
  transitionDuration?: CSSProperties['transitionDuration'];
}

function BookItemContents(props: IBookItemContentsProps) {
  const {
    className,
    title,
    authors,
    contents,
    sale_price,
    isSelected,
    transitionDuration,
  } = props;

  return (
    <div
      className={cn(
        'w-full',
        className
      )}
      style={{
        transitionDuration,
      }}
    >
      {/* Contents Header */}
      <div
        className={cn(
          'flex items-center',
          'transition-all',
          isSelected && 'mt-5',
          isSelected ? 'gap-0' : 'gap-5.5'
        )}
        style={{
          transitionDuration,
        }}
      >
        <div className={cn(
          'min-w-0',
          'flex items-center gap-4'
        )}>
          <h3 className={cn(
            'w-full',
            'flex-1',
            'cdri-title-3 text-cdri-primary-2',
            'truncate'
          )}>
            {title}
          </h3>
          <div className={cn(
            'flex-none',
            'cdri-body-2 text-cdri-secondary'
          )}>
            {authors?.[0] ?? ''}
          </div>
        </div>
        <div
          className={cn(
            'flex-none',
            'ml-auto',
            'grid transition-all',
            isSelected ? 'grid-cols-[0fr]' : 'grid-cols-[1fr]'
          )}
          style={{
            transitionDuration,
          }}
        >
          <div
            className={cn(
              'cdri-title-3 whitespace-nowrap',
              'overflow-hidden transition-all',
              isSelected ? 'opacity-0' : 'opacity-100'
            )}
            style={{
              transitionDuration,
            }}
          >
            {toKRW(sale_price)}원
          </div>
        </div>
      </div>

      {/* Contents Body */}
      <div
        className={cn(
          'overflow-hidden transition-all',
          isSelected ? 'mt-4' : 'mt-0',
          isSelected ? 'h-55' : 'h-0',
          isSelected ? 'opacity-100' : 'opacity-0'
        )}
        style={{
          transitionDuration,
        }}
      >
        <div className={cn(
          'mb-3',
          'text-[14px] leading-6.5 font-bold'
        )}>
          책 소개
        </div>
        <p
          className={cn(
            'w-90',
            'text-cdri-primary-2 text-[10px] leading-4 font-medium line-clamp-11'
          )}
          style={{
            transitionDuration,
          }}
        >
          {contents}
        </p>
      </div>
    </div>
  );
}

export default BookItemContents;

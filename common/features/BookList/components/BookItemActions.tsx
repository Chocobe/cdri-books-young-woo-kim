import { TBookModel } from '@/common/apis/bookApis/bookApis.type';
import ChevronDownIcon from '@/common/assets/svgIcons/ChevronDownIcon';
import { ICDRIAccordionCustomItemImplProps } from '@/common/components/ui/CDRIAccordion/CDRIAccordion';
import CDRIButton from '@/common/components/ui/CDRIButton/CDRIButton';
import toKRW from '@/common/utils/number/toKRW';
import cn from '@/common/utils/tailwindcss/cn';
import Link from 'next/link';
import { CSSProperties } from 'react';

type TBookItemActionsProps =
  & Pick<
    TBookModel,
    'price' | 'sale_price' | 'url'
  >
  & Pick<
    ICDRIAccordionCustomItemImplProps,
    'isSelected' | 'setIsSelected' | 'id'
  >
  & {
    className?: string;
    transitionDuration?: CSSProperties['transitionDuration'];
  };

function BookItemActions(props: TBookItemActionsProps) {
  const {
    className,
    id,
    price,
    sale_price,
    url,
    isSelected,
    setIsSelected,
    transitionDuration,
  } = props;

  return (
    <div
      className={cn(
        'w-60',
        className
      )}
    >
      <div className={cn(
        'flex items-center gap-2.5'
      )}>
        <div
          className={cn(
            'overflow-hidden',
            'transition-all',
            isSelected ? 'w-0' : 'w-28.75',
            isSelected ? 'ml-28.75' : 'ml-0'
          )}
          style={{
            transitionDuration,
          }}
        >
          <Link href={url} target="_blank" rel="noopener noreferrer">
            <CDRIButton className="w-28.75">
              구매하기
            </CDRIButton>
          </Link>
        </div>
        <CDRIButton
          className={cn(
            'w-28.75',
            'flex items-center gap-1'
          )}
          bgColor="light-gray"
          onClick={() => setIsSelected({
            id,
            isSelected: !isSelected,
          })}
        >
          <span>상세보기</span>
          <ChevronDownIcon
            width="14px"
            height="14px"
            className={cn(
              'transition-all',
              isSelected && 'rotate-180'
            )}
            style={{
              transitionDuration,
            }}
          />
        </CDRIButton>
      </div>

      <div
        className={cn(
          'flex flex-col justify-end items-end gap-7',
          'overflow-hidden',
          'transition-all',
          isSelected ? 'mt-3' : 'mt-0',
          isSelected ? 'h-55' : 'h-0',
          isSelected ? 'opacity-100' : 'opacity-0'
        )}
        style={{
          transitionDuration,
        }}
      >
        <div className={cn(
          // 
        )}>
          <div className={cn(
            'flex items-center gap-2'
          )}>
            <div className={cn(
              'ml-auto',
              'w-9.25',
              'text-cdri-subtitle text-[10px] leading-5.5 font-medium text-right'
            )}>
              원가
            </div>
            <div className={cn(
              'text-cdri-primary-2 text-lg leading-6.5 font-light line-through'
            )}>
              {toKRW(price)}원
            </div>
          </div>

          <div className={cn(
            'flex items-center gap-2'
          )}>
            <div className={cn(
              'ml-auto',
              'w-9.25',
              'text-cdri-subtitle text-[10px] leading-5.5 font-medium text-right'
            )}>
              할인가
            </div>
            <div className={cn(
              'text-cdri-primary-2 text-lg leading-6.5 font-bold'
            )}>
              {toKRW(sale_price)}원
            </div>
          </div>
        </div>
        <div
          className={cn(
            'transition-all',
            isSelected ? 'w-60' : 'w-0'
          )}
          style={{
            transitionDuration,
          }}
        >
          <Link href={url} target="_blank" rel="noopener noreferrer">
            <CDRIButton className="w-60">
              구매하기
            </CDRIButton>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BookItemActions;

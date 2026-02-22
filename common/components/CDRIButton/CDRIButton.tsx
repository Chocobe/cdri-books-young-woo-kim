'use client';

import { ComponentPropsWithRef } from 'react';
import cn from '@/common/utils/tailwindcss/cn';

type TCDRIButtonVariant = 'surface' | 'outline';

type TCDRIButtonProps<TVariant extends TCDRIButtonVariant> =
// & Omit<
//   ComponentProps<'button'>,
//   'className' | 'style'
// >
ComponentPropsWithRef<'button'>
& {
  /**
   * 컴포넌트 전반적인 스타일 설정
   * 
   * - `surface` : 배경색 스타일
   * - `outline` : 외곽선 스타일
   * 
   * @default 'surface'
   */
  // variant?: 'surface' | 'outline';
  variant?: TVariant;

  /**
   * 크기 설정
   * 
   * @default '2'
   */
  size?: '1' | '2';
}
& (TVariant extends 'surface'
  ? {
    /**
       * 배경 색상 설정
       * 
       * `variant="surface"` 일 경우에만 사용 가능한 설정입니다.
       * 
       * - `primary` : `cdri-primary` color token
       * - `light-gray` : `cdri-light-gray` color token
       * 
       * @default 'primary'
       */
    bgColor?: 'primary' | 'light-gray';
  }
  : unknown
);

type TUnionProps =
  & TCDRIButtonProps<'surface'>
  & TCDRIButtonProps<'outline'>;

const BUTTON_VARIANTS = {
  variants: {
    surface: '',
    outline: 'border border-[#8D94A0]',
  },
  size: {
    1: 'px-2.5 h-[35px] text-sm',
    2: 'px-4 h-[48px]',
  },
  bgColor: {
    surface: {
      primary: 'text-cdri-white bg-cdri-primary',
      'light-gray': 'cdri-theme-text-secondary bg-cdri-light-gray',
    },
    outline: {
      primary: 'text-[#8D94A0]',
    },
  },
} as const;

function CDRIButton<TVariant extends TCDRIButtonVariant = 'surface'>(
  props: TCDRIButtonProps<TVariant>
) {
  const {
    variant = 'surface',
    size = '2',
    bgColor = 'primary',
    children,
    className,
    style,
    ref,
    ...buttonProps
  } = props as TUnionProps;

  const variantClassName = BUTTON_VARIANTS.variants[variant as TVariant];
  const sizeClassName = BUTTON_VARIANTS.size[size];
  const bgColorClassName = BUTTON_VARIANTS.bgColor[variant][bgColor];

  return (
    <button
      ref={ref}
      className={cn(
        'font-medium rounded-lg transition-all',
        'hover:opacity-80 active:opacity-90',
        variantClassName,
        sizeClassName,
        bgColorClassName,
        className
      )}
      style={style}
      {...buttonProps}
    >
      {children}
    </button>
  );
}

export default CDRIButton;

'use client';

import cn from '@/common/utils/tailwindcss/cn';
import {
  PropsWithChildren, 
  Ref,
  ComponentPropsWithRef,
} from 'react';
import styles from './CDRIInput.module.css';

interface ICDRIInputProps extends Omit<
  ComponentPropsWithRef<'input'>,
  'size' | 'className' | 'style'
> {
  /**
   * 컴포넌트 전반적인 스타일 설정
   * 
   * - `surface` : 배경색 스타일
   * - `underline` : 배경색 없이 `border-bottom` 기반 스타일
   * 
   * @default 'underline'
   */
  variant?: 'underline' | 'surface';

  /**
   * 크기 설정
   * 
   * @default '1'
   */
  size?: '1' | '2';

  /**
   * HTMLInputElement 에 대한 ref
   */
  ref?: Ref<HTMLInputElement>;
}

/**
 * @example
 * ```
 * <CDRIInput
 *  variant="underline"
 *  size="2"
 * >
 *  <CDRIInput.Slot>
 *    <SearchIcon width="30px" height="30px" />
 *  </CDRIInput.Slot>
 * </CDRIInput>
 * ```
 */
function CDRIInput(props: ICDRIInputProps) {
  const {
    variant = 'underline',
    size = '1',
    children,
    ref,
    ...inputProps
  } = props;

  return (
    <div
      className={styles.CDRIInput}
      data-variant={variant}
      data-size={size}
    >
      <input
        className={cn(
          styles.input
        )}
        ref={ref}
        placeholder="검색어 입력"
        {...inputProps}
      />
      {children}
    </div>
  );
}

interface ISlotProps extends PropsWithChildren {
  /**
   * <input /> 요소 기준, Slot 의 위치
   * 
   * - 설정하지 않는다면, 순서대로 좌측, 우측에 배치됩니다.
   * - 첫번째 Slot : 좌측 배치
   * - 두번째 Slot : 우측 배치
   * 
   * - `left` : 좌측
   * - `right` : 우측
   */
  side?: 'left' | 'right';
}
function Slot(props: ISlotProps) {
  const {
    side,
    children,
  } = props;

  return (
    <div 
      className={styles.slot}
      data-side={side}
    >
      {children}
    </div>
  );
}
CDRIInput.Slot = Slot;

export default CDRIInput;

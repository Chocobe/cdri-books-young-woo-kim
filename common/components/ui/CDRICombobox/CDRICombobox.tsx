'use client';

/**
<CDRICombobox>
  <CDRICombobox.Trigger />
  <CDRICombobox.Content>
    <CDRICombobox.Item />
    <CDRICombobox.Item />
    <CDRICombobox.Item />
  </CDRICombobox.Content>
</CDRICombobox>

value state 직접 제어해야 할 듯
 */

import { Popover } from 'radix-ui';
import { 
  ComponentProps,
  Ref,
  useCallback,
  useState,
  useImperativeHandle,
  useRef,
  useMemo,
  RefObject,
  PropsWithChildren,
  KeyboardEvent,
  ChangeEvent,
  memo,
} from 'react';
import { 
  createContext, 
  useContextSelector,
} from 'use-context-selector';
import CDRIInput from '../CDRIInput/CDRIInput';
import SearchIcon from '@/common/assets/svgIcons/SearchIcon';
import CloseIcon from '@/common/assets/svgIcons/CloseIcon';
import cn from '@/common/utils/tailwindcss/cn';

const MemoedCDRIInput = memo(CDRIInput);

const DEFAULT_PLACEHOLDER = '텍스트를 입력하세요.';
const DEFAULT_OPEN = false;
const DEFAULT_EMPTY_ITEMS_MESSAGE = '검색기록이 없습니다.';

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
//
// InternalContext
//
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
type TInputRef = HTMLInputElement | null;

export interface IOnKeyDownContext {
  onValueChange: IInternalContext['onValueChange'];
  onOpenChange: IInternalContext['onOpenChange'];
}

export interface IOnKeyDownProp {
  (
    e: KeyboardEvent<HTMLInputElement>,
    ctx: {
      onValueChange: IInternalContext['onValueChange'];
      onOpenChange: IInternalContext['onOpenChange'];
    }
  ): void;
}

interface IInternalContext {
  $inputRef: RefObject<TInputRef>;
  placeholder?: string;
  value?: string;
  onValueChange: (value: string) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onKeyDown?: IOnKeyDownProp;
}

const InternalContext = createContext<IInternalContext | null>(null);

/**
 * 내부 context 접근용 hook
 * 
 * @throws CDRICombobox 하위 컴포넌트가 <CDRICombobox /> 밖에서 사용한 경우 발생
 */
const useInternalContext = <
  TReturn,
>(selector: (context: IInternalContext) => TReturn) => {
  return useContextSelector(InternalContext, ctx => {
    if (!ctx) {
      throw new Error('CDRICombobox 하위 컴포넌트는 <CDRICombobox /> 내부에서만 사용할 수 있습니다.');
    }

    return selector(ctx);
  });
};

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
//
// Combobox root
//
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
interface IComboboxProps extends
  Omit<ComponentProps<typeof Popover.Root>, 'modal'>,
  Partial<Pick<
    IInternalContext, 
    'value' | 'onValueChange' | 'placeholder' | 'onKeyDown'>
  >
{
  ref?: Ref<TInputRef>;
  defaultValue?: string;
}

function CDRICombobox(props: IComboboxProps) {
  const {
    ref,
    placeholder = DEFAULT_PLACEHOLDER,

    defaultValue,
    value,
    onValueChange,

    defaultOpen = DEFAULT_OPEN,
    open,
    onOpenChange,

    onKeyDown,
    children,
  } = props;

  //
  // (Controlled/Uncontrolled pattern) value
  //
  const $inputRef = useRef<HTMLInputElement | null>(null);

  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const isControlledPattern = value !== undefined && !!onValueChange;
  const currentValue = isControlledPattern ? value : uncontrolledValue;

  const setCurrentValue = useCallback((currentValue: string) => {
    if (isControlledPattern) {
      onValueChange(currentValue);
    } else {
      setUncontrolledValue(currentValue);
    }
  }, [isControlledPattern, onValueChange]);

  //
  // (Controlled/Uncontrolled pattern) open
  //
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isControlledOpen = open !== undefined && !!onOpenChange;
  const currentOpen = isControlledOpen ? open : uncontrolledOpen;

  const setCurrentOpen = useCallback((open: boolean) => {
    if (isControlledOpen) {
      onOpenChange(open);
    } else {
      setUncontrolledOpen(open);
    }
  }, [isControlledOpen, onOpenChange]);

  useImperativeHandle<
    HTMLInputElement | null, 
    HTMLInputElement | null
  >(ref, () => {
    return $inputRef.current;
  }, []);

  const contextState = useMemo<IInternalContext>(() => ({
    $inputRef,
    placeholder,
    value: currentValue,
    onValueChange: setCurrentValue,
    open: currentOpen,
    onOpenChange: setCurrentOpen,
    onKeyDown,
  }), [
    placeholder,
    currentValue,
    setCurrentValue,
    currentOpen,
    setCurrentOpen,
    onKeyDown,
  ]);

  return (
    <InternalContext.Provider value={contextState}>
      <Popover.Root
        open={currentOpen}
        onOpenChange={setCurrentOpen}
        modal={false}
      >
        {children}
      </Popover.Root>
    </InternalContext.Provider>
  );
}

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
//
// Trigger
//
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
function Trigger() {
  const $inputRef = useInternalContext(state => state.$inputRef);
  const placeholder = useInternalContext(state => state.placeholder);
  const value = useInternalContext(state => state.value);
  const onValueChange = useInternalContext(state => state.onValueChange);
  const onOpenChange = useInternalContext(state => state.onOpenChange);
  const onKeyDown = useInternalContext(state => state.onKeyDown);

  const _onValueChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    onValueChange(e.target.value);
  }, [onValueChange]);

  const _onKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(e, {
      onValueChange,
      onOpenChange,
    });
  }, [
    onKeyDown,
    onValueChange,
    onOpenChange,
  ]);

  const memoedSlot = useMemo(() => (
    <CDRIInput.Slot>
      <SearchIcon />
    </CDRIInput.Slot>
  ), []);

  return (
    <Popover.Trigger asChild className="group">
      <div>
        <MemoedCDRIInput
          ref={$inputRef}
          className={cn(
            'cdri-caption',
            'group-data-[state="open"]:rounded-b-none!'
          )}
          placeholder={placeholder}
          value={value ?? ''}
          onChange={_onValueChange}
          variant="surface"
          size="2"
          onKeyDown={_onKeyDown}
        >
          {memoedSlot}
        </MemoedCDRIInput>
      </div>
    </Popover.Trigger>
  );
}
/**
 * @example
 *  <CDRICombobox>
 *    <CDRICombobox.Trigger />
 *  </CDRICombobox>
 */
CDRICombobox.Trigger = Trigger;

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
//
// Content
//
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
interface IContentProps extends PropsWithChildren {
  // 
}

function Content(props: IContentProps) {
  const { children } = props;

  const $inputRef = useInternalContext(state => state.$inputRef);

  return (
    <Popover.Portal>
      <Popover.Content
        className={cn(
          'p-2.5',
          'w-(--radix-popover-trigger-width) bg-cdri-light-gray',
          'rounded-b-[25px]'
        )}
        onOpenAutoFocus={e => {
          e.preventDefault();
          $inputRef.current?.focus();
        }}
        onCloseAutoFocus={e => {
          e.preventDefault();
          $inputRef.current?.blur();
        }}
      >
        {children || (
          <Item disabled>
            {DEFAULT_EMPTY_ITEMS_MESSAGE}
          </Item>
        )}
      </Popover.Content>
    </Popover.Portal>
  );
}
/**
 * @example
 *  <CDRICombobox>
 *    <CDRICombobox.Trigger />
 *    <CDRICombobox.Content>
 *      <CDRICombobox.Item value="value-1">Item 1</CDRICombobox.Item>
 *      <CDRICombobox.Item value="value-2">Item 2</CDRICombobox.Item>
 *      <CDRICombobox.Item value="value-3">Item 3</CDRICombobox.Item>
 *    </CDRICombobox.Content>
 *  </CDRICombobox>
 */
CDRICombobox.Content = Content;

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
//
// Item
//
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
interface IItemProps {
  disabled?: boolean;
  children: string;
}

function Item(props: IItemProps) {
  const {
    disabled = false,
    children,
  } = props;

  const $inputRef = useInternalContext(state => state.$inputRef);
  const onValueChange = useInternalContext(state => state.onValueChange);

  const isSelected = useInternalContext(state => {
    return state.value === children;
  });

  const onClickItem = () => {
    if (isSelected || disabled) {
      return;
    }

    onValueChange(children);
    $inputRef.current?.focus();
  };

  const onClickCancel = () => {
    onValueChange('');
    $inputRef.current?.focus();
  };

  return (
    <div
      className={cn(
        'pl-10.25 pr-6.25',
        'h-10',
        'flex justify-between items-center gap-10',
        'cdri-caption text-cdri-subtitle',
        'rounded-[20px]',
        'cursor-default',
        !disabled && 'hover:bg-cdri-white hover:text-cdri-primary-2',
        isSelected && 'bg-cdri-white text-cdri-primary-2'
      )}
      onClick={onClickItem}
    >
      {children}
      {isSelected && (
        <CloseIcon
          className="cursor-pointer"
          onClick={onClickCancel}
        />
      )}
    </div>
  );
}
/**
 * @example
 *  <CDRICombobox>
 *    <CDRICombobox.Trigger />
 *    <CDRICombobox.Content>
 *      <CDRICombobox.Item>Item 1</CDRICombobox.Item>
 *      <CDRICombobox.Item>Item 2</CDRICombobox.Item>
 *      <CDRICombobox.Item>Item 3</CDRICombobox.Item>
 *    </CDRICombobox.Content>
 *  </CDRICombobox>
 */
CDRICombobox.Item = Item;

export default CDRICombobox;

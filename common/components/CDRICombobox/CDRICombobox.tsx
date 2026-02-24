'use client';

import cn from '@/common/utils/tailwindcss/cn';
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
} from 'react';
import { 
  createContext, 
  useContextSelector,
} from 'use-context-selector';
import CDRIInput from '../CDRIInput/CDRIInput';
import SearchIcon from '@/common/assets/svgIcons/SearchIcon';
import CloseIcon from '@/common/assets/svgIcons/CloseIcon';

const DEFAULT_PLACEHOLDER = '텍스트를 입력하세요.';
const DEFAULT_OPEN = false;

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
//
// InternalContext
//
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
type TInputRef = HTMLInputElement | null;

interface IInternalContext {
  $inputRef: RefObject<TInputRef>;
  placeholder?: string;
  value?: string;
  onValueChange: (value: string) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onKeyDown?: (
    e: KeyboardEvent<HTMLInputElement>,
    ctx: {
      onValueChange: IInternalContext['onValueChange'];
      onOpenChange: IInternalContext['onOpenChange'];
    }
  ) => void;
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

  return (
    <Popover.Trigger asChild className="group">
      <div>
        <CDRIInput
          ref={$inputRef}
          className={cn(
            'group-data-[state="open"]:rounded-b-none!'
          )}
          placeholder={placeholder}
          value={value ?? ''}
          onChange={e => onValueChange(e.target.value)}
          variant="surface"
          size="2"
          onKeyDown={e => onKeyDown?.(e, {
            onValueChange,
            onOpenChange,
          })}
        >
          <CDRIInput.Slot>
            <SearchIcon />
          </CDRIInput.Slot>
        </CDRIInput>
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
        {children}
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
interface IItemProps extends PropsWithChildren {
  value: string;
}

function Item(props: IItemProps) {
  const {
    value,
    children,
  } = props;

  const $inputRef = useInternalContext(state => state.$inputRef);
  const onValueChange = useInternalContext(state => state.onValueChange);
  const onOpenChange = useInternalContext(state => state.onOpenChange);

  const isSelected = useInternalContext(state => {
    return state.value === value;
  });

  const onClickItem = () => {
    if (isSelected) {
      return;
    }

    onValueChange(value);
    onOpenChange(false);
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
        'hover:bg-cdri-white hover:text-cdri-primary-2',
        isSelected && 'bg-cdri-white text-cdri-primary-2'
      )}
      onClick={onClickItem}
    >
      {children}
      {isSelected && (
        <CloseIcon onClick={onClickCancel} />
      )}
    </div>
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
CDRICombobox.Item = Item;

export default CDRICombobox;

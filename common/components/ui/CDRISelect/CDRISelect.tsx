'use client';

/**
```
<CDRISelect>
  <CDRISelect.Trigger />
  <CDRISelect.Content>
    <CDRISelect.Item />
    <CDRISelect.Item />
    <CDRISelect.Item />
  </CDRISelect.Content>
</CDRISelect>
```
 */

import {
  useState,
  useMemo,
  FC,
  JSX,
  ComponentProps,
} from 'react';
import {
  createContext,
  useContextSelector,
} from 'use-context-selector';
import { Select as SelectPrimitive } from 'radix-ui';
import cn from '@/common/utils/tailwindcss/cn';
import ChevronDownIcon from '@/common/assets/svgIcons/ChevronDownIcon';

const DEFAULT_PLACEHOLDER = '값을 선택해주세요.';

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
//
// InternalContext
//
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
interface IInternalContext {
  placeholder: string;
  setPlaceholder: (placeholder: string) => void;
}
const InternalContext = createContext<IInternalContext | null>(null);

/**
 * 내부 context 접근용 hook
 * 
 * @throws CDRISelect 하위 컴포넌트가 <CDRISelect /> 밖에서 사용한 경우 발생
 */
const useInternalContext = <
  TReturn,
>(selector: (context: IInternalContext) => TReturn) => {
  return useContextSelector(InternalContext, ctx => {
    if (!ctx) {
      throw new Error('CDRISelect 하위 컴포넌트는 <CDRISelect /> 내부에서만 사용할 수 있습니다.');
    }

    return selector(ctx);
  });
};

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
//
// Select root
//
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
interface ICDRISelectProps extends ComponentProps<typeof SelectPrimitive.Root> {
  placeholder?: string;
}

function CDRISelect(props: ICDRISelectProps) {
  const [placeholder, setPlaceholder] = useState(props.placeholder ?? DEFAULT_PLACEHOLDER);

  const contextState = useMemo(() => ({
    placeholder,
    setPlaceholder,
  }), [placeholder]);

  return (
    <InternalContext.Provider value={contextState}>
      <SelectPrimitive.Root
        {...props} 
        onOpenChange={isOpen => {
          if (!isOpen) {
            (document.activeElement as HTMLElement)?.blur();
          }
        }}
      />
    </InternalContext.Provider>
  );
}

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
//
// Trigger
//
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
interface ITriggerProps extends Omit<
  ComponentProps<typeof SelectPrimitive.Trigger>,
  'children'
> {
  children?: (props: {
    ValueComponent: FC<Parameters<typeof SelectPrimitive.Value>[0]>;
    IconComponent: FC<Parameters<typeof ChevronDownIcon>[0]>;
  }) => JSX.Element
}


function Trigger(props: ITriggerProps) {
  const { 
    className,
    children,
    ...restProps
  } = props;

  const placeholder = useInternalContext(state => state.placeholder);

  return (
    <SelectPrimitive.Trigger
      className={cn(
        'group',
        'p-[9px_4px_6px_8px]',
        'w-full h-9',
        'inline-flex justify-between items-center',
        'text-cdri-primary-2 text-[14px] leading-5 font-bold',
        'border-b border-cdri-light-gray-2 outline-none',
        'data-[state="open"]:border-cdri-primary',
        className
      )}
      {...restProps}
    >
      {(children && typeof children === 'function')
        ? children({
          ValueComponent: SelectPrimitive.Value,
          IconComponent: ChevronDownIcon,
        })
        : (<>
          <span className={cn(
            'truncate text-cdri-primary-2 leading-5'
          )}> 
            <SelectPrimitive.Value placeholder={placeholder} />
          </span>
          <ChevronDownIcon
            width="20px"
            height="20px"
            className="group-data-[state=open]:rotate-180 transition-transform"
          />
        </>)
      }
    </SelectPrimitive.Trigger>
  );
}
/**
 * Trigger 의 커스터마이징이 필요할 경우, `children` render prop 을 활용할 수 있습니다.
 * 
 * @example
 *  <CDRISelect>
 *    <CDRISelect.Trigger />
 *  </CDRISelect>
 * 
 * @example
 *  <CDRISelect>
 *    <CDRISelect.Trigger>
 *      {props => (<>
 *        <props.IconComponent />
 *        <props.ValueComponent />
 *      </>)}
 *    </CDRISelect.Trigger>
 *  </CDRISelect>
 */
CDRISelect.Trigger = Trigger;

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
//
// Content
//
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
function Content(props: ComponentProps<typeof SelectPrimitive.Content>) {
  const {
    className,
    children,
    ...restProps
  } = props;

  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        position="popper"
        sideOffset={6}
        {...restProps}
        className={cn(
          'overflow-hidden bg-cdri-white shadow-[0px_0px_4px_0px_#00000040]',
          'w-(--radix-select-trigger-width)',
          className
        )}
      >
        <SelectPrimitive.Viewport>
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}
/**
 * @example
 *  <CDRISelect>
 *    <CDRISelect.Trigger />
 *    <CDRISelect.Content>
 *      <CDRISelect.Item value="value-1">text-1</CDRISelect.Item>
 *      <CDRISelect.Item value="value-2">text-2</CDRISelect.Item>
 *      <CDRISelect.Item value="value-3">text-3</CDRISelect.Item>
 *    </CDRISelect.Content>
 *  </CDRISelect>
 */
CDRISelect.Content = Content;

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
//
// Item
//
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
interface IItemProps extends Omit<
  ComponentProps<typeof SelectPrimitive.Item>,
  'children'
> {
  /**
   * 말줄임표 사용 여부
   * 
   * @default false
   */
  ellipsis?: boolean;
  children: string;
}

function Item(props: IItemProps) {
  const {
    className,
    ellipsis = false,
    children,
    ...restProps
  } = props;

  return (
    <SelectPrimitive.Item
      {...restProps}
      className={cn(
        'py-1 px-2',
        'text-cdri-subtitle leading-5.5 text-[14px] font-medium',
        'data-[state="checked"]:text-cdri-primary-2 data-[state="checked"]:bg-cdri-light-gray',
        'outline-none cursor-default select-none',
        'hover:bg-cdri-light-gray',
        { truncate: ellipsis },
        className
      )}
    >
      <SelectPrimitive.ItemText>
        {children}
      </SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}
/**
 * @example
 *  <CDRISelect>
 *    <CDRISelect.Trigger />
 *    <CDRISelect.Content>
 *      <CDRISelect.Item value="value-1">text-1</CDRISelect.Item>
 *      <CDRISelect.Item value="value-2">text-2</CDRISelect.Item>
 *      <CDRISelect.Item value="value-3">text-3</CDRISelect.Item>
 *    </CDRISelect.Content>
 *  </CDRISelect>
 */
CDRISelect.Item = Item;

export default CDRISelect;

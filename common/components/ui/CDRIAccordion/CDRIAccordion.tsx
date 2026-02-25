'use client';

/**
<CDRIAccordion>
  <CDRIAccordionCustomItem>
    {props => {
      const {
        isOpen,
        changeSelection,
        children,
      } = props;

      return (
        <div>
          Item 커스텀 요소 정의하기
        </div>
      )
    }}
  </CDRIAccordionCustomItem>
</CDRIAccordion>

NOTE:
=> Item, Trigger, Content 는 현재 사용처 없음
 */

import cn from '@/common/utils/tailwindcss/cn';
import {
  JSX,
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { 
  createContext,
  useContextSelector,
} from 'use-context-selector';

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
//
// InternalContext
//
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
interface IInternalContext {
  openedItems: Array<string | number>;
  setIsSelected: (params: {
    id: IInternalContext['openedItems'][number];
    isSelected: boolean;
  }) => void;
}

const InternalContext = createContext<IInternalContext | null>(null);

/**
 * 내부 context 접근용 hook
 * 
 * @throws CDRIAccordion 하위 컴포넌트가 <CDRIAccordion /> 밖에서 사용한 경우 발생
 */
const useInternalContext = <
  TReturn,
>(selector: (context: IInternalContext) => TReturn) => {
  return useContextSelector(InternalContext, ctx => {
    if (!ctx) {
      throw new Error('CDRIAccordion 하위 컴포넌트는 <CDRIAccordion /> 내부에서만 사용할 수 있습니다.');
    }

    return selector(ctx);
  });
};

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
//
// Accordion root
//
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
interface ICDRIAccordionProps extends PropsWithChildren {
  isMultiple?: boolean;
  initialOpenedItems?: IInternalContext['openedItems'];
}

/**
 * @example
 *  <CDRIAccordion>
 *    <CDRIAccordion.CustomItem />
 *    <CDRIAccordion.CustomItem />
 *    <CDRIAccordion.CustomItem />
 *  </CDRIAccordion>
 */
function CDRIAccordion(props: ICDRIAccordionProps) {
  const {
    isMultiple = false,
    initialOpenedItems = [],
    children,
  } = props;

  const [openedItems, setOpenedItems] = useState<IInternalContext['openedItems']>(
    initialOpenedItems
  );

  const setIsSelected = useCallback((params: {
    id: typeof openedItems[number]
    isSelected: boolean
  }) => {
    const {
      id,
      isSelected,
    } = params;

    setOpenedItems(items => {
      const prevIsSelected = items.includes(id);

      if (isSelected && !prevIsSelected) {
        return isMultiple
          ? [
            ...items,
            id,
          ]
          : [id];
      }

      if (!isSelected && prevIsSelected) {
        return isMultiple
          ? items.filter(i => i !== id)
          : [];
      }

      return items;
    });
  }, [isMultiple]);

  const contextState = useMemo(() => ({
    openedItems,
    setIsSelected,
  }), [
    openedItems,
    setIsSelected,
  ]);

  return (
    <InternalContext.Provider value={contextState}>
      <ul className={cn(
        'w-full',
        'flex flex-col gap-5' 
      )}>
        {children}
      </ul>
    </InternalContext.Provider>
  );
}

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
//
// CustomItem
//
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
interface ICustomItemProps {
  id: IInternalContext['openedItems'][number]
  children: (props: {
    isSelected: boolean;
    setIsSelected: IInternalContext['setIsSelected'];
  }) => JSX.Element;
}

function CustomItem(props: ICustomItemProps) {
  const {
    id,
    children,
  } = props;

  const isSelected = useInternalContext(state => state.openedItems.includes(id));
  const setIsSelected = useInternalContext(state => state.setIsSelected);

  const childrenProps = useMemo(() => ({
    isSelected,
    setIsSelected,
  }), [
    isSelected,
    setIsSelected,
  ]);

  return children(childrenProps);
}
/**
 * @example
 *  <CDRIAccordion>
 *    <CDRIAccordion.CustomItem id="1">
 *      {props => {
 *        return (
 *          <CustomItem {...props}>
 *            Item 1
 *           </CustomItem>
 *        );
 *      }}
 *    </CDRIAccordion.CustomItem>
 *  </CDRIAccordion>
 *
 * @example
 *  const FoodItem = (props: ICDRIAccordionCustomItemImplProps) => {
 *    const {
 *      id,
 *      isSelected,
 *      setIsSelected,
 *      children,
 *    } = props;
 * 
 *    return (
 *      <li
 *        className={cn(
 *          isSelected
 *            ? 'text-cdri-gray bg-cdri-primary-2'
 *            : 'text-cdri-primary-2 bg-cdri-gray'
 *        )}
 *        onClick={() => setIsSelected({
 *          id,
 *          isSelected: !isSelected,
 *        })}
 *      >
 *        {children} (isSelected: {String(isSelected)})
 *      </li>
 *    );
 *  }; 
 */
CDRIAccordion.CustomItem = CustomItem;

/**
 * CDRIAccordion.CustomItem 의 children 함수에 넘겨주는 props 입니다.
 * 
 * @example
 *  const FoodItem = (props: ICDRIAccordionCustomItemImplProps) => {
 *    const {
 *      id,
 *      isSelected,
 *      setIsSelected,
 *      children,
 *    } = props;
 * 
 *    return (
 *      <li
 *        className={cn(
 *          isSelected
 *            ? 'text-cdri-gray bg-cdri-primary-2'
 *            : 'text-cdri-primary-2 bg-cdri-gray'
 *        )}
 *        onClick={() => setIsSelected({
 *          id,
 *          isSelected: !isSelected,
 *        })}
 *      >
 *        {children} (isSelected: {String(isSelected)})
 *      </li>
 *    );
 *  }; 
 */
export interface ICDRIAccordionCustomItemImplProps extends PropsWithChildren<
  & Pick<Parameters<typeof CDRIAccordion.CustomItem>[0], 'id'>
  & Parameters<
    Parameters<typeof CDRIAccordion.CustomItem>[0]['children']
  >[0]
> {
  // 
}

export default CDRIAccordion;

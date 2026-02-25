'use client';

import cn from '@/common/utils/tailwindcss/cn';
import {
  KeyboardEvent, 
  ReactNode,
  useCallback,
  useMemo,
} from 'react';
import CDRICombobox, {
  IOnKeyDownProp,
} from '../../ui/CDRICombobox/CDRICombobox';

interface ISearchBarShortcut {
  key: string;
  ctrlKey: boolean;
  altKey: boolean;
  metaKey: boolean;
  shiftKey: boolean;
}

const DEFAULT_SUBMIT_SHORTCUT: ISearchBarShortcut = {
  key: 'enter',
  ctrlKey: false,
  altKey: false,
  metaKey: false,
  shiftKey: false,
};

const DEFAULT_PLACEHOLDER = '검색어를 입력하세요';

interface ISearchBarProps {
  title?: string;
  placeholder?: string;
  searchValue: string;
  /** 제출 단축키(소문자) */
  onSearchValueChange: (searchValue: string) => void;
  items?: string[];
  submitShortcut?: ISearchBarShortcut;
  onSubmit: () => void;
  /** 추가 액션 Slot */
  ActionSlot?: ReactNode;
}

function SearchBar(props: ISearchBarProps) {
  const {
    title,
    placeholder = DEFAULT_PLACEHOLDER,
    searchValue,
    onSearchValueChange,
    items,
    submitShortcut = DEFAULT_SUBMIT_SHORTCUT,
    onSubmit,
    ActionSlot,
  } = props;

  const onKeyDown = useCallback<IOnKeyDownProp>((e, ctx) => {
    const {
      key,
      ...rest
    } = submitShortcut;

    const isMatchedKey = key.toLowerCase() === e.key.toLowerCase();
    const isMatchedModifierKeys = Object
      .entries(rest)
      .every(([key, value]) => {
        return value === e[key as keyof KeyboardEvent<Element>];
      });

    if (isMatchedKey && isMatchedModifierKeys) {
      e.preventDefault();
      ctx.onOpenChange(false);
      onSubmit();
    }
  }, [submitShortcut, onSubmit]);

  const normalizedItems = useMemo(() => {
    return items
      ? Array.from(
        new Set(items ?? [])
      )
      : undefined;
  }, [items]);

  return (
    <div className={cn(
      'flex flex-col gap-4'
    )}>
      <h2 className={cn(
        'h-9',
        'cdri-title-2'
      )}>
        {title}
      </h2>
      <div className="w-full flex items-center gap-4">
        <div className="max-w-115 w-full">
          <CDRICombobox
            value={searchValue}
            onValueChange={onSearchValueChange}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
          >
            <CDRICombobox.Trigger />
            <CDRICombobox.Content>
              {normalizedItems?.map(item => (
                <CDRICombobox.Item key={item}>
                  {item}
                </CDRICombobox.Item>
              ))}
            </CDRICombobox.Content>
          </CDRICombobox>
        </div>
        {ActionSlot}
      </div>

    </div>
  );
}

export default SearchBar;

'use client';

import {
  useCallback, 
  useRef, 
  useState,
} from 'react';
import SearchBar from '@/common/components/composite/SearchBar/SearchBar';
import CDRIPopover from '@/common/components/ui/CDRIPopover/CDRIPopover';
import cn from '@/common/utils/tailwindcss/cn';
import CDRISelect from '@/common/components/ui/CDRISelect/CDRISelect';
import CDRIInput from '@/common/components/ui/CDRIInput/CDRIInput';
import CDRIButton from '@/common/components/ui/CDRIButton/CDRIButton';
import useBookStore from '@/common/stores/bookStore/useBookStore';
import { 
  BOOKS_API_TARGET_MAPPER, 
  T_BOOKS_API_TARGET,
} from '@/common/apis/bookApis/bookApis.type';

const searchTypeItems = [
  {
    label: '저자명',
    value: BOOKS_API_TARGET_MAPPER.PERSON,
  },
  {
    label: '출판사',
    value: BOOKS_API_TARGET_MAPPER.PUBLISHER,
  },
];

function BookSearchBar() {
  const $detailSearchInputRef = useRef<HTMLInputElement | null>(null);
  const $closeButtonRef = useRef<HTMLButtonElement | null>(null);

  // 검색 값
  const [searchValue, setSearchValue] = useState('');

  // 상세검색 값
  const [detailSearchValue, setDetailSearchValue] = useState('');
  const [detailSearchType, setDetailSearchType] = useState('');

  const setQueryParamsForRetrieveBooksApi = useBookStore(state => {
    return state.bookSearch.setQueryParamsForRetrieveBooksApi;
  });

  const searchHistories = useBookStore(state => state.bookSearch.searchHistories);
  const addSearchHistory = useBookStore(state => state.bookSearch.addSearchHistory);

  const onSubmit = useCallback(() => {
    if (!searchValue.trim()) {
      return;
    }

    setQueryParamsForRetrieveBooksApi(queryParams => ({
      ...queryParams,
      query: searchValue,
      target: BOOKS_API_TARGET_MAPPER.TITLE,
    }));
    addSearchHistory(searchValue);
    setDetailSearchValue('');
    setDetailSearchType('');
  }, [
    searchValue,
    addSearchHistory,
    setQueryParamsForRetrieveBooksApi,
  ]);

  const onSubmitDetail = useCallback(() => {
    if (!detailSearchValue.trim() || !detailSearchType) {
      return;
    }

    setQueryParamsForRetrieveBooksApi(queryParams => ({
      ...queryParams,
      target: detailSearchType as T_BOOKS_API_TARGET,
      query: detailSearchValue,
    }));
    setSearchValue('');
    $closeButtonRef.current?.click();
  }, [
    detailSearchType,
    detailSearchValue,
    setQueryParamsForRetrieveBooksApi,
  ]);

  return (
    <SearchBar
      title="도서 검색"
      placeholder="검색어를 입력하세요"
      searchValue={searchValue}
      onSearchValueChange={setSearchValue}
      onSubmit={onSubmit}
      items={searchHistories}
      ActionSlot={(
        <CDRIPopover>
          <CDRIPopover.Trigger>
            상세검색
          </CDRIPopover.Trigger>
          <CDRIPopover.Content className={cn(
            'flex flex-col gap-4'
          )}>
            <CDRIPopover.Close ref={$closeButtonRef} />

            <div className={cn(
              'grid grid-cols-[100px_1fr] gap-1'
            )}>
              <CDRISelect
                placeholder="제목"
                value={detailSearchType}
                onValueChange={searchType => {
                  setDetailSearchType(searchType as T_BOOKS_API_TARGET);
                  setTimeout(() => {
                    $detailSearchInputRef.current?.focus();
                  }, 100);
                }}
                onOpenChange={open => {
                  if (open) {
                    setDetailSearchType('');
                  }
                }}
              >
                <CDRISelect.Trigger />
                <CDRISelect.Content>
                  {searchTypeItems.map(({ label, value }) => (
                    <CDRISelect.Item
                      key={value}
                      value={value}
                    >
                      {label}
                    </CDRISelect.Item>
                  ))}
                </CDRISelect.Content>
              </CDRISelect>
              <CDRIInput
                ref={$detailSearchInputRef}
                value={detailSearchValue}
                onChange={e => setDetailSearchValue(e.target.value)}
                onKeyDown={e => {
                  if (e.key.toLowerCase() === 'enter') {
                    e.preventDefault();
                    onSubmitDetail();
                    $closeButtonRef.current?.click();
                  }
                }}
              />
            </div>
            <CDRIButton
              size="1"
              onClick={onSubmitDetail}
            >
              검색하기
            </CDRIButton>
          </CDRIPopover.Content>
        </CDRIPopover>
      )}
    />
  );
}

export default BookSearchBar;

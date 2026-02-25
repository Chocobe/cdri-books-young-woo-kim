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

const searchTypeItems = ['저자명', '출판사'];

function BookSearchBar() {
  const $detailSearchInputRef = useRef<HTMLInputElement | null>(null);
  const $closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const [searchValue, setSearchValue] = useState('');
  const [searchType, setSearchType] = useState('');
  const [detailSearchValue, setDetailSearchValue] = useState('');

  const searchHistories = useBookStore(state => state.bookSearch.searchHistories);
  const addSearchHistory = useBookStore(state => state.bookSearch.addSearchHistory);

  const onSubmit = useCallback(() => {
    // TODO: API 연동하기
    console.group('BookSearchBar - onSubmit()');
    console.log('searchValue: ', searchValue);
    console.groupEnd();

    addSearchHistory(searchValue);
  }, [searchValue, addSearchHistory]);

  const onSubmitDetail = useCallback(() => {
    // TODO: API 연동하기
    console.group('BookSearchBar - onSubmitDetail()');
    console.log('searchType: ', searchType);
    console.log('detailSearchValue: ', detailSearchValue);
    console.groupEnd();

    $closeButtonRef.current?.click();
  }, [
    searchType,
    detailSearchValue,
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
                value={searchType}
                onValueChange={searchType => {
                  setSearchType(searchType);
                  setTimeout(() => {
                    $detailSearchInputRef.current?.focus();
                  }, 100);
                }}
              >
                <CDRISelect.Trigger />
                <CDRISelect.Content>
                  {searchTypeItems.map(searchType => (
                    <CDRISelect.Item
                      key={searchType}
                      value={searchType}
                    >
                      {searchType}
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

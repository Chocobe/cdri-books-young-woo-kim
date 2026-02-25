/**
 * `도서 검색`, `내가 찜한 책` 에 대하여 Slice pattern 적용
 */

import { 
  createWithPersist,
  StateCreatorWithPersist,
} from '@/common/utils/zustand/zustand-utils';

const BOOK_SEARCH_HISTORY_MEMORY_LENGTH = 8;

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
//
// BookSearch slice
//
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
type TBookSearchSliceState = {
  searchHistories: string[];
};

type TBookSearchSliceActions = {
  addSearchHistory: (searchHistory: string) => void;
};

type TBookSearchSlice = {
  bookSearch:
    & TBookSearchSliceState
    & TBookSearchSliceActions;
};

const createBookSearchSlice: StateCreatorWithPersist<
  TBookStore,
  TBookSearchSlice
> = (set) => ({
  bookSearch: {
    searchHistories: [],
    addSearchHistory: searchHistory => {
      set(s => {
        s.bookSearch.searchHistories = Array
          .from(new Set([
            searchHistory, 
            ...s.bookSearch.searchHistories,
          ]))
          .slice(0, BOOK_SEARCH_HISTORY_MEMORY_LENGTH);
      }, undefined, 'addSearchHistory');
    },
  },
});

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
//
// WishList slice
//
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// TODO: slice 만들기

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
//
// BookList slice
//
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
type TBookStore = 
  & TBookSearchSlice;

const useBookStore = createWithPersist<TBookStore>()((...params) => ({
  ...createBookSearchSlice(...params),
}), {
  name: 'BookStore',
  partialize: state => {
    return {
      bookSearch: {
        searchHistories: state.bookSearch.searchHistories,
      },
    } as TBookStore;
  },
});

export default useBookStore;

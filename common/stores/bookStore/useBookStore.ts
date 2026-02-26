/**
 * `도서 검색`, `내가 찜한 책` 에 대하여 Slice pattern 적용
 */

import { 
  BOOKS_API_TARGET_MAPPER, 
  TBookModel, 
  TRetrieveBooksApiRequestParams,
} from '@/common/apis/bookApis/bookApis.type';
import { 
  createWithPersist,
  StateCreatorWithPersist,
} from '@/common/utils/zustand/zustand-utils';

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
//
// BookSearch slice
//
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
const BOOK_SEARCH_HISTORY_MAX_LENGTH = 8;
const DEFAULT_QUERY_PARAMS_FOR_RETRIEVE_BOOKS_API: TQueryParamsForRetrieveBooksApi = {
  size: 10,
  target: BOOKS_API_TARGET_MAPPER.TITLE,
  query: '',
};

type TQueryParamsForRetrieveBooksApi = Omit<
  TRetrieveBooksApiRequestParams['queryParams'], 
  'page'
>;

type TBookSearchSliceState = {
  searchHistories: string[];
  queryParamsForRetrieveBooksApi: TQueryParamsForRetrieveBooksApi,
};

type TBookSearchSliceActions = {
  addSearchHistory: (searchHistory: string) => void;
  setQueryParamsForRetrieveBooksApi: (
    callback: (
      queryParams: TQueryParamsForRetrieveBooksApi
    ) => TQueryParamsForRetrieveBooksApi
  )=> void;
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
    queryParamsForRetrieveBooksApi: DEFAULT_QUERY_PARAMS_FOR_RETRIEVE_BOOKS_API,
    addSearchHistory: searchHistory => {
      set(s => {
        s.bookSearch.searchHistories = Array
          .from(new Set([
            searchHistory, 
            ...s.bookSearch.searchHistories,
          ]))
          .slice(0, BOOK_SEARCH_HISTORY_MAX_LENGTH);
      }, undefined, 'addSearchHistory');
    },
    setQueryParamsForRetrieveBooksApi: callback => {
      set(s => {
        s.bookSearch.queryParamsForRetrieveBooksApi = callback(
          s.bookSearch.queryParamsForRetrieveBooksApi
        );
      }, undefined, 'setQueryParamsForRetrieveBooksApi');
    },
  },
});

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
//
// WishBooks slice
//
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
type TWishBooksSliceState = {
  wishBooksRecord: {
    [isbn: string]: TBookModel;
  };
};

type TWishBooksSliceActions = {
  toggleWishBook: (book: TBookModel) => void;
};

type TWishBooksSlice = {
  wishBooks:
    & TWishBooksSliceState
    & TWishBooksSliceActions;
};

const createWishBooksSlice: StateCreatorWithPersist<
  TBookStore,
  TWishBooksSlice
> = (set) => ({
  wishBooks: {
    wishBooksRecord: {},
    toggleWishBook: book => {
      set(s => {
        const isWishBook = s.wishBooks.wishBooksRecord[book.isbn];

        if (isWishBook) {
          delete s.wishBooks.wishBooksRecord[book.isbn];
        } else {
          s.wishBooks.wishBooksRecord[book.isbn] = book;
        }
      }, undefined, 'toggleWishBook');
    },
  },
});

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
//
// Book Store
//
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
type TBookStore = 
  & TBookSearchSlice
  & TWishBooksSlice
  & {
    resetBookStore: () => void;
  };

const useBookStore = createWithPersist<TBookStore>()((...params) => ({
  ...createBookSearchSlice(...params),
  ...createWishBooksSlice(...params),

  resetBookStore: () => {
    const [set] = params;
    set(useBookStore.getInitialState());
  },
}), {
  name: 'BookStore',
  partialize: state => {
    return {
      bookSearch: {
        searchHistories: state.bookSearch.searchHistories,
      },
      wishBooks: {
        wishBooksRecord: state.wishBooks.wishBooksRecord,
      },
    } as TBookStore;
  },
});

export default useBookStore;

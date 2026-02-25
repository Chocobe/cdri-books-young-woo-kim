import { TApiRequestParams } from '../apis.type';

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
//
// METADATA
//
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
/**
 * Kakao API 조회 요청 시, 함께 받는 Metadata model
 */
type TKakaoApiMetadataModel = {
  is_end: boolean;
  pageable_count: number;
  total_count: number;
};


// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
//
// sub types
//
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
/**
 * Book(도서) 검색 시, 검색 대상 Enum
 * 
 * - `TITLE`: 제목 검색
 * - `PUBLISHER`: 출판사 검색
 * - `PERSON`: 저자 검색
 * - `ISBN`: 책 고유 식별자로 검색
 */
export const BOOKS_API_TARGET_MAPPER = {
  TITLE: 'title',
  PUBLISHER: 'publisher',
  PERSON: 'person',
  ISBN: 'isbn',
} as const;
/**
 * Book(도서) 검색 시, 검색 대상 Enum
 * 
 * - `TITLE`: 제목 검색
 * - `PUBLISHER`: 출판사 검색
 * - `PERSON`: 저자 검색
 */
export type T_BOOKS_API_TARGET = typeof BOOKS_API_TARGET_MAPPER[keyof typeof BOOKS_API_TARGET_MAPPER];

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
//
// retrieve books
//
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
/**
 * 책 정보 model
 */
export type TBookModel = {
  authors: string[];
  contents: string;
  datetime: string;
  isbn: string;
  price: number;
  publisher: string;
  sale_price: number;
  status: string;
  thumbnail: string;
  title: string;
  translators: string[],
  url: string;
};

export type TRetrieveBooksApiRequestParams = TApiRequestParams<
  void,
  {
    size: number;
    page: number;
    target: T_BOOKS_API_TARGET;
    query: string;
  }
>;

export type TRetrieveBooksApiResponse = {
  meta: TKakaoApiMetadataModel;
  documents: TBookModel[];
};

import { TRetrieveBooksApiRequestParams } from '@/common/apis/bookApis/bookApis.type';
import BOOK_BASE_QUERY_KEY from './baseKey';

const bookQueryKeys = {
  all: () => [BOOK_BASE_QUERY_KEY] as const,
  list(queryParams: Omit<TRetrieveBooksApiRequestParams['queryParams'], 'page'>) {
    return [
      this.all(),
      queryParams,
    ];
  },
} as const;

export default bookQueryKeys;

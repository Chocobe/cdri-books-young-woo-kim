import apiManager from '@/common/apis/apiManager';
import bookQueryKeys from '../keys/queryKeys';
import { TRetrieveBooksApiRequestParams } from '@/common/apis/bookApis/bookApis.type';
import { useInfiniteQuery } from '@tanstack/react-query';

const DEFAULT_REQUEST_PARAMS: TRetrieveBooksApiRequestParams = {
  queryParams: {
    size: 10,
    page: 1,
    target: 'title',
    query: '',
  },
} as const;

type TQueryKey = {
  queryParams: Omit<TRetrieveBooksApiRequestParams['queryParams'], 'page'>;
};

const useBooksInfiniteQuery = (params: TQueryKey) => {
  return useInfiniteQuery({
    queryKey: bookQueryKeys.list(params.queryParams),
    queryFn: ({ pageParam }) => apiManager.bookApis.retrieveBooksApi({
      queryParams: {
        ...params.queryParams,
        page: pageParam.queryParams.page,
      },
    }),
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.meta.is_end) {
        return null;
      }

      return {
        queryParams: {
          ...lastPageParam.queryParams,
          page: allPages.length + 1,
        },
      };
    },
    initialPageParam: DEFAULT_REQUEST_PARAMS,
    enabled: !! params.queryParams.query,
  });
};

export default useBooksInfiniteQuery;

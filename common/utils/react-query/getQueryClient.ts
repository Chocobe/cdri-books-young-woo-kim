import {
  QueryClient,
  defaultShouldDehydrateQuery,
  isServer,
} from '@tanstack/react-query';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        staleTime: 60 * 1_000,   // 캐시 무효화: 1분
        gcTime: 2 * 60 * 1_000,  // 캐시 삭제: 2분
      },
      dehydrate: {
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === 'pending',
      },
    },
  });
}

/**
 * Module 단위 Closure(유사 Singleton) 방식의 QueryClient instance
 */
let browserQueryClient: QueryClient | undefined = undefined;

/**
 * Module 단위 Closure(유사 Singleton) 방식의 QueryClient instance 생성자이며 접근자
 */
function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  }

  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }

  return browserQueryClient;
}

export default getQueryClient;

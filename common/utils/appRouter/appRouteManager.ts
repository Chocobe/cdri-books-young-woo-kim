interface IAppRouteItem {
  path: string;
  displayName: string;
}

/**
 * Next.js App Route 에 대한 관리자입니다.
 */
const appRouteItemMapper = {
  LIBRARY: {
    path: '/',
    displayName: '도서 검색',
  },
  WISH: {
    path: '/wish-books',
    displayName: '내가 찜한 책',
  },
  // TODO: `/playground` 라우터 추가하기
} satisfies {
  [APP_ROUTE_KEY: string]: IAppRouteItem;
};

type TAppRouteKey = keyof typeof appRouteItemMapper;

const appRouteManager = {
  ...appRouteItemMapper,
  getAppRouteItems(...appRouteKeys: TAppRouteKey[]) {
    return appRouteKeys.map(key => this[key]);
  },
};

export default appRouteManager;

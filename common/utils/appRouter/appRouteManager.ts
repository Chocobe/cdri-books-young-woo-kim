interface IAppRouteItem {
  path: string;
  displayName: string;
}

/**
 * Next.js App Route 에 대한 관리자입니다.
 */
const appRouteItemMapper = {
  LIBRARY: {
    // FIXME: 페이지 구현 후, 주석 해제하기
    // path: '/library',
    path: '/',
    displayName: '도서 검색',
  },
  WISH: {
    // FIXME: 페이지 구현 후, 주석 해제하기
    // path: '/wish',
    path: '/playground/combobox',
    displayName: '내가 찜한 책',
  },
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

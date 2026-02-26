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
  PLAYGROUND: {
    path: '/playground',
    displayName: 'Playground',
  },

  ACCORDION: {
    path: '/playground/accordion',
    displayName: 'CDRIAccordion',
  },
  BUTTON: {
    path: '/playground/button',
    displayName: 'CDRIButton',
  },
  INPUT: {
    path: '/playground/input',
    displayName: 'CDRIInput',
  },
  SELECT: {
    path: '/playground/select',
    displayName: 'CDRISelect',
  },
  COMBOBOX: {
    path: '/playground/combobox',
    displayName: 'CDRICombobox',
  },
  POPOVER: {
    path: '/playground/popover',
    displayName: 'CDRIPopover',
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

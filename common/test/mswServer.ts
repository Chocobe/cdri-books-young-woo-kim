import { setupServer } from 'msw/node';
import { _mockTodosHandlers } from './_samples/_mockTodosHandlers';

export const mswServer = setupServer(
  ..._mockTodosHandlers
  // TODO: `apis/**/*` 구현 시점에 mockHandlers 만들고 API mocking 적용하기
);

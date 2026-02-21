import '@testing-library/jest-dom/vitest';
import { mswServer } from './mswServer';

vi.mock('zustand');

beforeAll(() => {
  mswServer.listen();
});

afterEach(() => {
  mswServer.resetHandlers();
});

afterAll(() => {
  mswServer.close();
});
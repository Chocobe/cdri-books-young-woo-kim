import {
  PropsWithChildren, 
  ReactElement,
} from 'react';
import {
  render, 
  RenderOptions,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { 
  QueryClient, 
  QueryClientProvider,
} from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 0,
      gcTime: 0,
    },
  },
});

const AllTheProviders = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  const instance = render(ui, {
    ...options,
    wrapper: AllTheProviders,
  });

  const user = userEvent.setup();

  return {
    ...instance,
    user,
  };
};

export * from '@testing-library/react';
export { customRender as render };

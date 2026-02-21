import { ReactElement } from 'react'
import {
  render, 
  RenderOptions,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event';

const AllTheProviders = ({children}: {children: React.ReactNode}) => {
  return (<>
    {children}
  </>);
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
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

export * from '@testing-library/react'
export {customRender as render}

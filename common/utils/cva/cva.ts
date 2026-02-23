import {
  cva as actualCva,
} from 'class-variance-authority';
import cn from '../tailwindcss/cn';

const cva = <TConfig>(...params: Parameters<typeof actualCva<TConfig>>) => {
  const variants = actualCva<TConfig>(...params);

  return (...props: Parameters<typeof variants>) => {
    return cn(variants(...props));
  };
};

export * from 'class-variance-authority';
export { cva };
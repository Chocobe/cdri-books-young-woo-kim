import { cva } from './cva';

const sampleVariants = cva('p-1 m-1', {
  variants: {
    color: {
      primary: 'bg-cdri-primary',
      secondary: 'bg-cdri-secondary',
    },
    disabled: {
      true: 'pointer-events-none disabled',
      false: 'pointer-events-auto',
    },
    size: {
      lg: 'p-2',
    },
  },
  compoundVariants: [
    {
      color: ['primary', 'secondary'],
      disabled: true,
      className: 'bg-cdri-gray',
    },
  ],
  defaultVariants: {
    color: 'primary',
    disabled: false,
  },
});

describe('cva()', () => {
  it('defaultVariant 를 생성할 수 있다.', () => {
    const variant = sampleVariants();
    const classNames = variant.split(' ');

    expect(classNames).toHaveLength(4);
    expect(classNames).toContain('p-1');
    expect(classNames).toContain('m-1');
    expect(classNames).toContain('bg-cdri-primary');
    expect(classNames).toContain('pointer-events-auto');
  });

  it('color="primary" 에 대한 compoundVariants 가 반영된다.', () => {
    const variant = sampleVariants({
      color: 'primary',
      disabled: true,
    });
    const classNames = variant.split(' ');

    expect(classNames).toHaveLength(5);
    expect(classNames).toContain('p-1');
    expect(classNames).toContain('m-1');
    expect(classNames).toContain('bg-cdri-gray');
    expect(classNames).toContain('pointer-events-none');
    expect(classNames).toContain('disabled');
    expect(classNames).not.toContain('bg-cdri-primary');
  });

  it('color="secondary" 에 대한 compoundVariants 가 반영된다.', () => {
    const variant = sampleVariants({
      color: 'secondary',
      disabled: true,
    });
    const classNames = variant.split(' ');

    expect(classNames).toHaveLength(5);
    expect(classNames).toContain('p-1');
    expect(classNames).toContain('m-1');
    expect(classNames).toContain('bg-cdri-gray');
    expect(classNames).toContain('pointer-events-none');
    expect(classNames).toContain('disabled');
    expect(classNames).not.toContain('bg-cdri-secondary');
  });

  it('size="lg" 사용 시, baseClassName `p-1` 은 `p-2` 로 override 된다.', () => {
    const variant = sampleVariants({
      size: 'lg',
    });
    const classNames = variant.split(' ');

    expect(classNames).toHaveLength(4);
    expect(classNames).toContain('p-2');
    expect(classNames).toContain('m-1');
    expect(classNames).toContain('bg-cdri-primary');
    expect(classNames).toContain('pointer-events-auto');
    expect(classNames).not.toContain('p-1');
  });
});
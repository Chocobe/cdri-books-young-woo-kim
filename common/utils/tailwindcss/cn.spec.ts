import cn from './cn';

describe('cn()', () => {
  it('cn("p-1", "m-2") === "p-1 m-2"', () => {
    const result = cn('p-1', 'm-2');
    const classNames = result.split(' ');
    expect(classNames).toHaveLength(2);
    expect(classNames).toContain('p-1');
    expect(classNames).toContain('m-2');
  });

  it('cn("px-1", "p-2") === "p-2"', () => {
    const result = cn('px-1', 'p-2');
    const classNames = result.split(' ');
    expect(classNames).toHaveLength(1);
    expect(classNames).toContain('p-2');
  });

  it('cn("p-1", { flex: true }) === "p-1 flex"', () => {
    const result = cn('p-1', { flex: true });
    const classNames = result.split(' ');
    expect(classNames).toHaveLength(2);
    expect(classNames).toContain('p-1');
    expect(classNames).toContain('flex');
  });

  it('cn("m-1", { flex: false }) === "m-1"', () => {
    const result = cn('m-1', { flex: false });
    const classNames = result.split(' ');
    expect(classNames).toHaveLength(1);
    expect(classNames).toContain('m-1');
  });
});

import { sum } from './_calculator';

describe.skip('testing samples', () => {
  it('sum(1, 2) === 3', () => {
    const result = sum(1, 2);
    expect(result).toBe(3);
  });
});

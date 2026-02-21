import { render, screen } from '@/common/test/test-utils';
import Counter from './_Counter';

describe.skip('Zustand __mocks__ 설정 테스트', () => {
  describe('<_Counter />', () => {
    it('increase() 클릭 시, 카운트 +1', async () => {
      const { user } = render(
        <Counter />
      );

      const $count = screen.getByTestId('Counter-count');
      expect($count).toHaveTextContent('Count: 0');

      const $increaseButton = screen.getByRole('button', { name: 'Increase' });
      await user.click($increaseButton);
      expect($count).toHaveTextContent('Count: 1');
    });

    it('decrease() 클릭 시, 카운트 -1', async () => {
      const { user } = render(
        <Counter />
      );

      const $count = screen.getByTestId('Counter-count');
      expect($count).toHaveTextContent('Count: 0');

      const $decreaseButton = screen.getByRole('button', { name: 'Decrease' });
      await user.click($decreaseButton);
      expect($count).toHaveTextContent('Count: -1');
    });
  });
});
import CDRIButton from './CDRIButton';
import { render, screen } from '@/common/test/test-utils';

describe('CDRIButton', () => {
  it('button 텍스트가 렌더링된다.', () => {
    render(
      <CDRIButton>
        Click me!
      </CDRIButton>
    );

    const $button = screen.getByRole('button', { name: 'Click me!' });
    expect($button).toBeInTheDocument();
  });

  it('버튼 클릭 시, onClick() 이 호출된다.', async () => {
    const onClick = vi.fn();
    const { user } = render(
      <CDRIButton onClick={onClick}>
        Click me!
      </CDRIButton>);

    const $button = screen.getByRole('button', { name: 'Click me!' });
    await user.click($button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('disabled 상태에서는 버튼을 클릭할 수 없다.', async () => {
    const onClick = vi.fn();
    const { user } = render(
      <CDRIButton
        disabled
        onClick={onClick}
      >
        Click me!
      </CDRIButton>
    );
    const $button = screen.getByRole('button', { name: 'Click me!' });

    await user.click($button);
    expect(onClick).not.toHaveBeenCalled();
  });
});
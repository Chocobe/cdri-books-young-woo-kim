import _SampleButton from './_SampleButton';
import { 
  render,
  screen,
} from '../test-utils';

describe.skip('<_SampleButton />', () => {
  it('버튼 텍스트가 노출된다.', () => {
    render(
      <_SampleButton>
        Click me!
      </_SampleButton>
    );

    const $button = screen.getByRole('button', { name: 'Click me!' });
    expect($button).toBeInTheDocument();
  });

  it('버튼 클릭 시, onClick() 이 호출된다.', async () => {
    const onClickSpy = vi.fn();
    const { user } = render(
      <_SampleButton onClick={onClickSpy}>
        Click me!
      </_SampleButton>
    );

    const $button = screen.getByRole('button', { name: 'Click me!' });
    await user.click($button);
    expect(onClickSpy).toHaveBeenCalledOnce();

    await user.click($button);
    await user.click($button);
    expect(onClickSpy).toHaveBeenCalledTimes(3);
  });
});

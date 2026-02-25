import { useState } from 'react';
import CDRIInput from './CDRIInput';
import { render, screen } from '@/common/test/test-utils';

describe('CDRIInput', () => {
  it('props 기본값이 적용된다.', () => {
    render(
      <CDRIInput />
    );

    const $input = screen.getByPlaceholderText('검색어 입력');
    const $wrapper = $input.parentElement;
    expect($wrapper).toHaveAttribute('data-variant', 'underline');
    expect($wrapper).toHaveAttribute('data-size', '1');
  });

  it('variant, size props 가 적용된다.', () => {
    render(
      <CDRIInput
        variant="surface"
        size="2"
      />
    );

    const $input = screen.getByPlaceholderText('검색어 입력');
    const $wrapper = $input.parentElement;
    expect($wrapper).toHaveAttribute('data-variant', 'surface');
    expect($wrapper).toHaveAttribute('data-size', '2');
  });

  it('input native attributes 를 사용할 수 있다.', async () => {
    render(
      <CDRIInput
        name="cdri-input"
        placeholder="텍스트를 입력해주세요."
        disabled
      />
    );

    const $input = screen.getByPlaceholderText('텍스트를 입력해주세요.');
    expect($input).toBeDisabled();
    expect($input).toHaveAttribute('name', 'cdri-input');
  });

  it('(Uncontrolled) 텍스트를 입력할 수 있다.', async () => {
    const { user } = render(
      <CDRIInput />
    );

    const $input = screen.getByPlaceholderText('검색어 입력');
    await user.type($input, 'Hello, CDRI');
    expect($input).toHaveValue('Hello, CDRI');
  });

  it('(Controlled) 텍스트를 입력할 수 있다.', async () => {
    const ControlledCDRIInput = () => {
      const [value, setValue] = useState('');

      return (
        <CDRIInput
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      );
    };

    const { user } = render(
      <ControlledCDRIInput />
    );

    const $input = screen.getByPlaceholderText('검색어 입력');
    await user.type($input, 'Hello, CDRI 2');
    expect($input).toHaveValue('Hello, CDRI 2');
  });

  /**
   * Slot 의 side 배치는 css 선택자를 사용하므로, jsdom 환경에서 테스트할 수 없었습니다.
   */
  it('Slot 을 사용할 수 있다.', () => {
    render(
      <CDRIInput>
        <CDRIInput.Slot>
          <span>FirstSlot</span>
        </CDRIInput.Slot>
        <CDRIInput.Slot>
          <span>Slot2</span>
        </CDRIInput.Slot>
      </CDRIInput>
    );

    const $input = screen.getByPlaceholderText('검색어 입력');
    const $wrapper = $input.parentElement!;
    expect($wrapper.children[1]).toHaveTextContent('FirstSlot');
    expect($wrapper.children[2]).toHaveTextContent('Slot2');
  });
});
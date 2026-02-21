import { PropsWithChildren } from 'react';

type T_SampleButtonProps = PropsWithChildren<{
  onClick?: () => void;
}>;

function _SampleButton(props: T_SampleButtonProps) {
  const {
    onClick,
    children,
  } = props;

  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
}

export default _SampleButton;

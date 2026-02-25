'use client';

import CDRICombobox from '@/common/components/ui/CDRICombobox/CDRICombobox';
import PlaygroundTemplate from '../components/PlaygroundTemplate';
import {
  useRef,
  // useEffect,
  // useState,
} from 'react';

function PlaygroundComboboxPage() {
  const $inputRef = useRef<HTMLInputElement>(null);
  // const [value, setValue] = useState('initial value');

  // useEffect(() => {
  //   console.log('controlled - value: ', value);
  // }, [value]);

  return (
    <PlaygroundTemplate title="CDRICombobox">
      Playground Combobox page
      <div>
        <CDRICombobox
          ref={$inputRef}
          // value={value}
          // onValueChange={setValue}
          onKeyDown={(e, ctx) => {
            if (e.key.toLowerCase() === 'enter') {
              console.log('Enter!');

              ctx.onOpenChange(false);
            }
          }}
        >
          <CDRICombobox.Trigger />
          <CDRICombobox.Content>
            <CDRICombobox.Item value="value-1">Item 1</CDRICombobox.Item>
            <CDRICombobox.Item value="value-2">Item 2</CDRICombobox.Item>
            <CDRICombobox.Item value="value-3">Item 3</CDRICombobox.Item>
            <CDRICombobox.Item value="value-4">Item 4</CDRICombobox.Item>
            <CDRICombobox.Item value="value-5">Item 5</CDRICombobox.Item>
          </CDRICombobox.Content>
        </CDRICombobox>
      </div>
    </PlaygroundTemplate>
  );
}

export default PlaygroundComboboxPage;

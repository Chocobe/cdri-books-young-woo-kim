'use client';

import PlaygroundTemplate from '../components/PlaygroundTemplate';
import SearchIcon from '@/common/assets/svgIcons/SearchIcon';
import CDRIInput from '@/common/components/CDRIInput/CDRIInput';

function PlaygroundInput() {
  return (
    <PlaygroundTemplate>
      <CDRIInput
        variant="underline"
        size="1"
      >
      </CDRIInput>

      <CDRIInput
        variant="underline"
        size="2"
      >
        <CDRIInput.Slot>
          <SearchIcon width="30px" height="30px" />
        </CDRIInput.Slot>
      </CDRIInput>

      <CDRIInput
        variant="surface"
        size="1"
      >
      </CDRIInput>

      <CDRIInput
        variant="surface"
        size="2"
      >
        <CDRIInput.Slot>
          <SearchIcon width="30px" height="30px" />
        </CDRIInput.Slot>
      </CDRIInput>
    </PlaygroundTemplate>
  );
}

export default PlaygroundInput;

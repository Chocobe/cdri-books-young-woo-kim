'use client';

import CDRIButton from '@/common/components/CDRIButton/CDRIButton';
import PlaygroundTemplate from '../components/PlaygroundTemplate';
import ChevronDownIcon from '@/common/assets/svgIcons/ChevronDownIcon';
import { useState } from 'react';
import cn from '@/common/utils/tailwindcss/cn';

function PlaygroundButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <PlaygroundTemplate title="CDRIButton">
      <div className="flex items-center gap-5">
        <CDRIButton
          className="w-fit inline-block"
          size="1"
          onClick={() => console.log('onClick() - Button 1')}
        >
          Button 1
        </CDRIButton>
        <CDRIButton
          className="w-28.75 inline-block"
          size="1"
          onClick={() => console.log('onClick() - Button 1')}
        >
          Button 1
        </CDRIButton>
        <CDRIButton
          className="w-28.75 inline-flex justify-center items-center gap-1.25"
          variant="outline"
          size="1"
          onClick={() => {
            console.log('onClick() - Button 1');
            setIsOpen(isOpen => !isOpen);
          }}
        >
          상세보기
          <ChevronDownIcon className={cn({ 'rotate-180': isOpen }, 'transition-all')} />
        </CDRIButton>
      </div>

      <CDRIButton
        onClick={() => console.log('onClick() - Button 1')}
      >
        Button 1
      </CDRIButton>

      <CDRIButton
        bgColor="light-gray"
        size="1"
        onClick={() => console.log('onClick() - Button 2')}
      >
        Button 2
      </CDRIButton>

      <CDRIButton
        bgColor="light-gray"
        onClick={() => console.log('onClick() - Button 2')}
      >
        Button 2
      </CDRIButton>

      <CDRIButton
        variant="outline"
        size="1"
        onClick={() => console.log('onClick() - Button 3')}
      >
        Button 3
      </CDRIButton>

      <CDRIButton
        variant="outline"
        onClick={() => console.log('onClick() - Button 3')}
      >
        Button 3
      </CDRIButton>
    </PlaygroundTemplate>
  );
}

export default PlaygroundButton;

'use client';

import CDRISelect from '@/common/components/ui/CDRISelect/CDRISelect';
import PlaygroundTemplate from '../components/PlaygroundTemplate';
import { useEffect, useState } from 'react';

function PlaygroundSelectPage() {
  const [value, setValue] = useState('');

  useEffect(() => {
    console.log('value: ', value);
  }, [value]);

  return (
    <PlaygroundTemplate title="CDRISelect">
      <div className="flex gap-5">
        <CDRISelect
          placeholder="제목"
          value={value}
          onValueChange={setValue}
        >
          <CDRISelect.Trigger className="w-25" />
          <CDRISelect.Content>
            <CDRISelect.Item value="value-1-1">저자명</CDRISelect.Item>
            <CDRISelect.Item value="value-1-2">출판사</CDRISelect.Item>
          </CDRISelect.Content>
        </CDRISelect>

        <div className="flex items-center">
          value:&nbsp;
          <span className="text-cdri-primary">{value}</span>
        </div>
      </div>

      <div className="flex gap-5">
        <CDRISelect
          placeholder="길면 말줄임표 적용 완료"
        >
          <CDRISelect.Trigger className="w-32" />
          <CDRISelect.Content>
            <CDRISelect.Item value="value-2-1">Lorem, ipsum dolor.</CDRISelect.Item> 
            <CDRISelect.Item value="value-2-2">Lorem, ipsum.</CDRISelect.Item> 
            <CDRISelect.Item ellipsis value="value-2-3">Lorem ipsum dolor sit amet consectetur adipisicing elit.</CDRISelect.Item> 
            <CDRISelect.Item value="value-2-4">Lorem ipsum dolor sit.</CDRISelect.Item> 
            <CDRISelect.Item value="value-2-5">Lorem.</CDRISelect.Item> 
          </CDRISelect.Content>
        </CDRISelect>

        <CDRISelect
          placeholder="제목2"
        >
          <CDRISelect.Trigger className="w-25" />
          <CDRISelect.Content>
            <CDRISelect.Item value="value-3-1">저자명2</CDRISelect.Item>
            <CDRISelect.Item value="value-3-2">출판사2</CDRISelect.Item>
          </CDRISelect.Content>
        </CDRISelect>
      </div>

      <CDRISelect
        placeholder="Hello CDRISelect"
      >
        <CDRISelect.Trigger>
          {props => (<>
            <props.ValueComponent placeholder="Select option" />
            <props.IconComponent width="30px" height="30px" className="mx-5 inline-block text-cdri-primary" />
          </>)}
        </CDRISelect.Trigger>
        <CDRISelect.Content>
          <CDRISelect.Item value="value-4-1">Lorem, ipsum dolor.</CDRISelect.Item> 
          <CDRISelect.Item value="value-4-2">Lorem, ipsum.</CDRISelect.Item> 
          <CDRISelect.Item value="value-4-3">Lorem ipsum dolor sit amet consectetur adipisicing elit.</CDRISelect.Item> 
          <CDRISelect.Item value="value-4-4">Lorem ipsum dolor sit.</CDRISelect.Item> 
          <CDRISelect.Item value="value-4-5">Lorem.</CDRISelect.Item> 
        </CDRISelect.Content>
      </CDRISelect>
    </PlaygroundTemplate>
  );
}

export default PlaygroundSelectPage;

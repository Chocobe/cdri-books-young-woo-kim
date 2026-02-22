'use client';

import { PropsWithChildren } from 'react';

function PlaygroundTemplate(props: PropsWithChildren) {
  const { children } = props;

  return (
    <div className="p-10 flex flex-col gap-5">
      <h1 className="cdri-title-1">
        CDRIInput
      </h1>

      <div className="bg-cdri-white flex flex-col gap-5">
        {children}
      </div>
    </div>
  );
}

export default PlaygroundTemplate;

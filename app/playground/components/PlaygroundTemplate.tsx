'use client';

import { PropsWithChildren } from 'react';

interface IPlaygroundTemplateProps extends PropsWithChildren {
  title: string;
}

function PlaygroundTemplate(props: IPlaygroundTemplateProps) {
  const {
    title,
    children,
  } = props;

  return (
    <div className="p-10 flex flex-col gap-5">
      <h1 className="cdri-title-1">
        {title}
      </h1>

      <div className="bg-cdri-white flex flex-col gap-5">
        {children}
      </div>
    </div>
  );
}

export default PlaygroundTemplate;

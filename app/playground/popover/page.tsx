'use client';

import CDRIPopover from '@/common/components/CDRIPopover/CDRIPopover';
import PlaygroundTemplate from '../components/PlaygroundTemplate';
import CDRIButton from '@/common/components/CDRIButton/CDRIButton';

function PlaygroundPopoverPage() {
  return (
    <PlaygroundTemplate title="CDRIPopover">
      <div className="pl-15">
        <CDRIPopover>
          <CDRIPopover.Trigger className="w-25">
            Click me!
          </CDRIPopover.Trigger>

          <CDRIPopover.Content>
            <div>
              Hello CDRIPopover Content
            </div>
            <CDRIPopover.Close />
          </CDRIPopover.Content>
        </CDRIPopover>
      </div>

      <div className="pl-15">
        <CDRIPopover>
          <CDRIPopover.Trigger className="w-50">
            asChild style
          </CDRIPopover.Trigger>

          <CDRIPopover.Content asChild>
            <div className="p-10 bg-cdri-primary-2 text-cdri-subtitle border rounded-lg">
              Customized CDRIPopover.Content
            </div>
          </CDRIPopover.Content>
        </CDRIPopover>
      </div>

      <div className="pl-15">
        <CDRIPopover>
          <CDRIPopover.Trigger asChild>
            <CDRIButton className="w-75">
              Customized Trigger
            </CDRIButton>
          </CDRIPopover.Trigger>

          <CDRIPopover.Content>
            Hello CDRIPopover Content
          </CDRIPopover.Content>
        </CDRIPopover>
      </div>
    </PlaygroundTemplate>
  );
}

export default PlaygroundPopoverPage;

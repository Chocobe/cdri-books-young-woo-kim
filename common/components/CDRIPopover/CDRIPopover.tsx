'use client';

/**
```
<CDRIPopover>
  <CDRIPopover.Trigger />
  <CDRIPopover.Content>
    <CDRIPopover.Close>Icon</CDRIPopover.Close>
  </CDRIPopover.Content>
</CDRIPopover>
```
 */

import { Popover } from 'radix-ui';
import { ComponentProps } from 'react';
import CDRIButton from '../CDRIButton/CDRIButton';
import cn from '@/common/utils/tailwindcss/cn';
import CloseIcon from '@/common/assets/svgIcons/CloseIcon';

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
//
// Popover Root
//
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
interface ICDRIPopoverProps extends Omit<ComponentProps<typeof Popover.Root>, 'modal'> {
  // 
}

/**
 * @example
 *  <CDRIPopover>
 *    <CDRIPopover.Trigger />
 *    <CDRIPopover.Content>
 *      <CDRIPopover.Close>Icon</CDRIPopover.Close>
 *    </CDRIPopover.Content>
 *  </CDRIPopover>
 */
function CDRIPopover(props: ICDRIPopoverProps) {
  return (
    <Popover.Root
      {...props}
      modal
    />
  );
}

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
//
// Trigger
//
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
interface ITriggerProps extends ComponentProps<typeof Popover.Trigger> {
  // 
}

function Trigger(props: ITriggerProps) {
  const {
    className,
    asChild,
    children,
    ...restProps
  } = props;

  return (
    <Popover.Trigger
      className={className}
      {...restProps}
      asChild
    >
      {asChild
        ? children
        : (
          <CDRIButton
            className={className}
            variant="outline"
            size="1"
          >
            {children}
          </CDRIButton>
        )
      }
    </Popover.Trigger>
  );
}
/**
 * @example
 *  <CDRIPopover>
 *    <CDRIPopover.Trigger />
 *    <CDRIPopover.Content>
 *      <CDRIPopover.Close>Icon</CDRIPopover.Close>
 *    </CDRIPopover.Content>
 *  </CDRIPopover>
 * 
 * @example
 *  // Trigger 의 `asChild` 를 사용한 커스터마이징
 *  <CDRIPopover>
 *    <CDRIPopover.Trigger asChild>
 *      <CDRIButton className="w-75">
 *        Customized Trigger
 *      </CDRIButton>
 *    </CDRIPopover.Trigger>
 *    <CDRIPopover.Content>
 *      <CDRIPopover.Close>Icon</CDRIPopover.Close>
 *    </CDRIPopover.Content>
 *  </CDRIPopover>
 */
CDRIPopover.Trigger = Trigger;

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
//
// Content
//
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
interface IContentProps extends ComponentProps<typeof Popover.Content> {
  // 
}

function Content(props: IContentProps) {
  const {
    className,
    asChild,
    children,
    ...restProps
  } = props;

  return (
    <Popover.Portal>
      <Popover.Content
        sideOffset={15}
        className={className}
        {...restProps}
        asChild
      >
        {asChild
          ? children
          : (
            <div className={cn(
              'py-9 px-6',
              'w-90',
              'bg-cdri-white rounded-lg shadow-[0px_4px_14px_6px_#97979726]',
              className
            )}>
              {children}
            </div>
          )
        }
      </Popover.Content>
    </Popover.Portal>
  );
}
/**
 * @example
 *  <CDRIPopover>
 *    <CDRIPopover.Trigger />
 *    <CDRIPopover.Content>
 *      123
 *    </CDRIPopover.Content>
 *  </CDRIPopover>
 * 
 * @example
 *  // Content 의 `asChild` 를 사용한 커스터마이징
 *  <CDRIPopover>
 *    <CDRIPopover.Trigger asChild>
 *      <CDRIButton className="w-75">
 *        Customized Trigger
 *      </CDRIButton>
 *    </CDRIPopover.Trigger>
 *    <CDRIPopover.Content asChild>
 *      <div className="p-10 bg-cdri-primary-2 text-cdri-subtitle border rounded-lg">
 *        Customized CDRIPopover.Content
 *      </div>
 *    </CDRIPopover.Content>
 *  </CDRIPopover>
 */
CDRIPopover.Content = Content;

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
//
// Close
//
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
interface ICloseProps extends ComponentProps<typeof Popover.Close> {
  // 
}

function Close(props: ICloseProps) {
  const {
    asChild,
    className,
    children,
    ...restProps
  } = props;

  return (
    <Popover.Close
      className={cn(
        !asChild && cn(
          'absolute top-2 right-2'
        ),
        className
      )}
      asChild={asChild}
      {...restProps}
    >
      {asChild
        ? children
        : (
          <CloseIcon
            width="20px"
            height="20px"
          />
        )
      }
    </Popover.Close>
  );
}
/**
 * @example
 *  <CDRIPopover>
 *    <CDRIPopover.Trigger />
 *    <CDRIPopover.Content>
 *      123
 *    </CDRIPopover.Content>
 *  </CDRIPopover>
 * 
 * @example
 *  // Close 의 `asChild` 를 사용한 커스터마이징
 *  <CDRIPopover>
 *    <CDRIPopover.Trigger asChild>
 *      <CDRIButton className="w-75">
 *        Customized Trigger
 *      </CDRIButton>
 *    </CDRIPopover.Trigger>
 *    <CDRIPopover.Content>
 *      <CDRIPopover.Close asChild>
 *        <div>
 *          ❌
 *        </div>
 *      </CDRIPopover.Close>
 *      <div>
 *        CDRIPopover.Content
 *      </div>
 *    </CDRIPopover.Content>
 *  </CDRIPopover>
 */
CDRIPopover.Close = Close;

export default CDRIPopover;

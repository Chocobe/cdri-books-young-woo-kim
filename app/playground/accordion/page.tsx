'use client';

import CDRIAccordion, {
  ICDRIAccordionCustomItemImplProps,
} from '@/common/components/ui/CDRIAccordion/CDRIAccordion';
import PlaygroundTemplate from '../components/PlaygroundTemplate';
import cn from '@/common/utils/tailwindcss/cn';

const FoodItem = (props: ICDRIAccordionCustomItemImplProps) => {
  const {
    id,
    isSelected,
    setIsSelected,
    children,
  } = props;

  return (
    <li
      className={cn(
        isSelected
          ? 'text-cdri-gray bg-cdri-primary-2'
          : 'text-cdri-primary-2 bg-cdri-gray'
      )}
      onClick={() => setIsSelected({
        id,
        isSelected: !isSelected,
      })}
    >
      {children} (isSelected: {String(isSelected)})
    </li>
  );
};

function PlaygroundAccordionPage() {
  const items = [
    {
      id: '1',
      text: 'Item 1',
    },
    {
      id: '2',
      text: 'Item 2',
    },
    {
      id: '3',
      text: 'Item 3',
    },
    {
      id: '4',
      text: 'Item 4',
    },
    {
      id: '5',
      text: 'Item 5',
    },
  ];

  return (
    <PlaygroundTemplate title="CDRIAccordion">
      <div className="flex flex-col gap-8">
        <h2 className="cdri-title-3">
          Single selection
        </h2>
        <CDRIAccordion>
          {/* <CDRIAccordion.CustomItem id="1">
            {props => {
              return (
                <CustomItem {...props}>
                  Item 1
                </CustomItem>
              );
            }}
          </CDRIAccordion.CustomItem>
          <CDRIAccordion.CustomItem id="2">
            {props => {
              return (
                <CustomItem {...props}>
                  Item 2
                </CustomItem>
              );
            }}
          </CDRIAccordion.CustomItem>
          <CDRIAccordion.CustomItem id="3">
            {props => {
              return (
                <CustomItem {...props}>
                  Item 3
                </CustomItem>
              );
            }}
          </CDRIAccordion.CustomItem> */}
          {items.map(item => {
            const {
              id,
              text,
            } = item;

            return (
              <CDRIAccordion.CustomItem
                key={id}
                id={id}
              >
                {props => (
                  <FoodItem
                    {...props}
                    id={id}
                  >
                    {text}
                  </FoodItem>
                )}
              </CDRIAccordion.CustomItem>
            );
          })}
        </CDRIAccordion>
      </div>

      <div className="my-10 w-full h-1 bg-cdri-primary-2" />

      <div className="flex flex-col gap-8">
        <h2 className="cdri-title-3">
          Multiple selection
        </h2>
        <CDRIAccordion isMultiple>
          {items.map(item => {
            const {
              id,
              text,
            } = item;

            return (
              <CDRIAccordion.CustomItem
                key={id}
                id={id}
              >
                {props => (
                  <FoodItem
                    {...props}
                    id={id}
                  >
                    {text}
                  </FoodItem>
                )}
              </CDRIAccordion.CustomItem>
            );
          })}
        </CDRIAccordion>
      </div>
    </PlaygroundTemplate>
  );
}

export default PlaygroundAccordionPage;

// @ts-expect-error
import { Menu, Transition } from '@headlessui/react';
import Button from '@ui/Button';
import { Sort } from 'iconsax-react';
import React from 'react';

const filterByList = [
  {
    name: 'item',
    id: 1,
  },
  {
    name: 'date',
    id: 2,
  },
  {
    name: 'order-id',
    id: 3,
  },
  {
    name: 'price',
    id: 4,
  },
  {
    name: 'seller',
    id: 5,
  },
];

const FilterDropDown = ({ onChooseFilter }: { onChooseFilter: (filter: string) => void }) => {
  return (
    <div className="w-max">
      <Menu>
        <Menu.Button as={React.Fragment} >
          <Button className="h-[2.5rem] flex items-center justify-center border-2 border-solid border-white-200 w-[6.25rem] rounded text-black-600 bg-white-100 hover:bg-white-100 active:bg-white-100 text-[0.88rem] ">
            <Sort size="16" /> Filters
          </Button>
        </Menu.Button>
        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Menu.Items className="absolute bg-white-100 py-2 mt-[.5rem] text-sm font-medium text-gray-700 border border-slate-100">
            {filterByList.map((item) => (
              <Menu.Item key={item.id}>
                {({ active }) => (
                  <span
                    className={`block cursor-pointer px-4 py-2 capitalize ${active ? 'bg-white-200 text-white' : 'text-gray-700'}`}
                    onClick={() => onChooseFilter(item.name)}
                  >
                    {item.name}
                  </span>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default FilterDropDown;

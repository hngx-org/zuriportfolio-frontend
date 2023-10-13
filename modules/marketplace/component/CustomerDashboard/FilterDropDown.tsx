// @ts-expect-error
import { Menu } from '@headlessui/react';
import { SearchFilter } from '../../../../pages/user/customer-purchase-dashboard';
import { Sort } from 'iconsax-react';
import React from 'react';

type FilterList = {
  name: SearchFilter;
  id: number;
};

const filterByList: FilterList[] = [
  {
    name: 'item',
    id: 1,
  },
  {
    name: 'price',
    id: 4,
  },
];

const FilterDropDown = ({ onChooseFilter }: { onChooseFilter: (filter: SearchFilter) => void }) => {
  return (
    <div className="w-max">
      <Menu>
        <Menu.Button>
          <span className="h-[2.5rem] flex items-center justify-center border-2 border-solid border-white-200 px-[1rem] w-max sm:w-[6.25rem] rounded text-black-600 bg-white-100 hover:bg-white-100 active:bg-white-100 text-[0.88rem] ">
            <Sort size="16" /> <span className="hidden sm:block">Filters</span>
          </span>
        </Menu.Button>
        <Menu.Items className="absolute bg-white-100 w-max py-2 mt-[.5rem] text-sm font-medium text-gray-700 border border-slate-100">
          {filterByList.map((item) => (
            <Menu.Item key={item.id}>
              {({ active }) => (
                <span
                  className={`block cursor-pointer px-4 py-2 capitalize ${
                    active ? 'bg-white-200 text-white' : 'text-gray-700'
                  }`}
                  onClick={() => onChooseFilter(item.name)}
                >
                  {item.name}
                </span>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Menu>
    </div>
  );
};

export default FilterDropDown;

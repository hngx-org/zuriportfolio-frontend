import React, { useState } from 'react';
import { SubCategoriesProps } from '../../../../@types';

// interface MyComponentProps {
//   item: string;
// }
//
// const SubCategories: React.FC<MyComponentProps> = ({ item }) => {
const SubCategories = ({ item }: SubCategoriesProps) => {
  const [popupClass, setPopupClass] = useState(false);

  return (
    <p
      className="px-4 py-2 hover:bg-white-200 w-full flex justify-between items-center"
      onMouseOver={() => setPopupClass(true)}
      onMouseLeave={() => setPopupClass(false)}
    >
      {item}
      {/* <Icon className="text-gray-400" icon="grommet-icons:next" /> */}
      <span
        className={`border-[2px]  border-slate-50 flex flex-col gap-2 ${
          popupClass ? 'visible opacity-100' : 'invisible opacity-0'
        } text-start rounded-lg rounded-tr-none absolute -translate-x-[106%] translate-y-[65%] transition-all duration-500 w-[286px] bg-white-100`}
      >
        {['Articles', 'Scripts', 'Copywriting Templates '].map((item, i) => (
          <a className="pl-4 py-2 hover:bg-white-200 w-full " href="#" key={i + 1}>
            {item}
          </a>
        ))}
      </span>
    </p>
  );
};

export default SubCategories;

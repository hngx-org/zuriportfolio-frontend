import React from 'react';

interface MyComponentProps {
  navItems: string[];
}

const CategoriesNav: React.FC<MyComponentProps> = ({ navItems }) => {
  return (
    <div className="w-full  flex  px-10">
      <ul className="flex  w-full justify-between  gap-[32px]">
        {navItems.map((item) => {
          return (
            <li
              key={item.toLowerCase()}
              className=" font-body  text-hngblack hover:text-hc select-none hover:cursor-pointer transition duration-400 ease-in-out text-base font-normal"
            >
              {item ? <a href="">{item}</a> : item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CategoriesNav;

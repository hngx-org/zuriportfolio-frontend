import React from 'react';

interface NavItem {
  link?: string;
  text: string;
  items?: NavItem[];
}

interface CategoriesNavProp {
  navItems: NavItem[];
}

function CategoriesNav(props: CategoriesNavProp) {
  const { navItems } = props;
  return (
    <div className="h-[64px]  flex    justify-center items-center ">
      <ul className="flex  w-full justify-between m-40 gap-[32px]">
        {navItems.map((item) => {
          return (
            <li
              key={item.text.toLowerCase()}
              className=" font-body  text-hngblack hover:text-hc select-none hover:cursor-pointer transition duration-400 ease-in-out text-base font-normal"
            >
              {item.link ? <a href={item.link}>{item.text}</a> : item.text}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default CategoriesNav;

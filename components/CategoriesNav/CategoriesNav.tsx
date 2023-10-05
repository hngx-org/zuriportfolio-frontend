import React from 'react';

interface NavItem {
  link?: string;
  text: string;
  items?: NavItem[];
}

interface CategoriesNavProp {
  navItems: NavItem[];
}

/* <CategoriesNav
navItems={[
  {
    link: '#',
    text: 'All Categories',
  },
  {
    text: ' Design & Graphics',
  },
]}
/> */

function CategoriesNav(props: CategoriesNavProp) {
  const { navItems } = props;
  return (
    <div className="h-[64px]  flex    justify-center items-center ">
      <ul className="flex  w-full justify-between m-40 gap-[32px]">
        {navItems.map((item) => {
          return (
            <li
              key={item.text.toLowerCase()}
              className=" font-body  text-hngblack hover:text-hc select-none transition duration-400 ease-in-out text-base font-normal"
            >
              {item.link ? <a href={item.link}>{item.text}</a> : item.text}
            </li>
          );
        })}

        {/* <li className=" font-body text-hngblack hover:text-hc select-none transition duration-400 ease-in-out text-base font-normal">
          Design & Graphics
        </li>
        <li className=" font-body text-hngblack hover:text-hc select-none transition duration-400 ease-in-out text-base font-normal">
          Development & Programming
        </li>
        <li className=" font-body text-hngblack hover:text-hc select-none transition duration-400 ease-in-out text-base font-normal">
          Content Creation
        </li>
        <li className=" font-body text-hngblack hover:text-hc select-none transition duration-400 ease-in-out text-base font-normal">
          Digital Arts & Media
        </li>
        <li className=" font-body text-hngblack hover:text-hc select-none transition duration-400 ease-in-out text-base font-normal">
          Audio & Sound
        </li>
        <li className=" font-body text-hngblack hover:text-hc select-none transition duration-400 ease-in-out text-base font-normal">
          Photography
        </li>
        <li className=" font-body text-hngblack hover:text-hc select-none  transition duration-400 ease-in-out text-base font-normal ">
          More...
        </li> */}
      </ul>
    </div>
  );
}

export default CategoriesNav;

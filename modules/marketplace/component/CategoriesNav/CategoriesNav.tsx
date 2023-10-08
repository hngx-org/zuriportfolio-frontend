import React from 'react';

const navItems: string[] = [
  ' Design & Graphics',
  ' Development & Programming',
  ' Content Creation',
  ' Digital Arts & Media',
  ' Audio & Sound',
  ' Photography',
];

const CategoriesNav = () => {
  return (
    <ul className="hidden lg:flex gap-8 py-5 mb-8 xl:mb-[52px] relative max-w-[1240px] mx-auto z-50 text-sm xl:text-base">
      <li>All Categories</li>
      {navItems.map((item) => {
        return (
          <li
            key={item.toLowerCase()}
            className=" font-ppReg text-base  hover:text-brand-green-shade50 select-none hover:cursor-pointer transition duration-400 ease-in-out text-brand-green-shade10 font-normal"
          >
            {item ? <a href="">{item}</a> : item}
          </li>
        );
      })}
      <li>More...</li>
    </ul>
  );
};

export default CategoriesNav;

import React, { useState } from 'react';
import ButtonCat from './ButtonCat';
import SubCategories from './SubCategories';

const navItems: string[] = [
  'All Categories',
  ' Design & Graphics',
  ' Development & Programming',
  ' Content Creation',
  ' Digital Arts & Media',
  ' Audio & Sound',
  ' Photography',
];

const CategoriesNav = () => {
  const [popupClass, setPopupClass] = useState(false);
  return (
    <ul className="hidden md:flex gap-8 py-5 relative">
      {navItems.map((item, i) => {
        return (
          <li key={i + 1} className="text-base relative">
            <ButtonCat item={item} />
          </li>
        );
      })}
      <li>
        <button className="" onMouseOver={() => setPopupClass(true)} onMouseLeave={() => setPopupClass(false)}>
          More...
          <div
            className={` border-[2px] border-slate-50 flex flex-col gap-2 ${
              popupClass ? 'visible opacity-100' : 'invisible opacity-0'
            } text-start rounded-lg absolute transition-all duration-500 w-[286px] z-50 translate-y-4`}
          >
            {['categories', 'categories', 'categories', 'categories', 'categories', 'categories', 'categories'].map(
              (item, i) => (
                <SubCategories key={i + 1} item={item} />
              ),
            )}
          </div>
        </button>
      </li>
    </ul>
  );
};

export default CategoriesNav;

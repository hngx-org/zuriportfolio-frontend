import React, { useState, useEffect } from 'react';
import ButtonCat from './ButtonCat';
import SubCategories from './SubCategories';

const navItems: string[] = [
  ' Design & Graphics',
  ' Development & Programming',
  ' Content Creation',
  ' Digital Arts & Media',
  ' Audio & Sound',
  ' Photography',
];

const CategoriesNav = () => {
  const [popupClass, setPopupClass] = useState(false);
  const [active, setActive] = useState(-1);
  const [allCatActive, setAllCatActive] = useState(false);

  useEffect(() => {
    if (active >= 0) setAllCatActive(false);
  }, [active]);

  const handleActiveNav = (i: number) => {
    setActive(i);
  };

  return (
    <ul className="hidden lg:flex gap-8 py-5 mb-8 xl:mb-[52px] relative max-w-[1240px] mx-auto z-50 text-sm xl:text-base">
      <li
        className={`${allCatActive ? 'text-brand-green-shade50' : ''}`}
        onClick={() => {
          setAllCatActive(true);
          setActive(-1);
        }}
      >
        <button>All Categories</button>
      </li>
      {navItems.map((category, i) => {
        return (
          <li key={i + 1} className=" relative">
            <ButtonCat active={active} handleActiveNav={handleActiveNav} category={category} index={i} />
          </li>
        );
      })}
      <li>
        <button className="" onMouseOver={() => setPopupClass(true)} onMouseLeave={() => setPopupClass(false)}>
          More...
          <div
            className={`border-[2px] border-slate-50 flex flex-col gap-2 ${
              popupClass ? 'visible opacity-100' : 'invisible opacity-0'
            } text-start rounded-lg absolute transition-all duration-500 w-[286px] z-50 translate-y-4 bg-white-100`}
          >
            {[
              'Writing & Copywriting',
              'Video & motion',
              'Data & Analytics',
              'Marketing & Advertising',
              'eCommerce & Business',
              'Gaming & Entertainment',
              'Virtual Reality & Augmented Reality',
              'e-Books',
            ].map((item, i) => (
              <SubCategories key={i + 1} item={item} />
            ))}
          </div>
        </button>
      </li>
    </ul>
  );
};

export default CategoriesNav;

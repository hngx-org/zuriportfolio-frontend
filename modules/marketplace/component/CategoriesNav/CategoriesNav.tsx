import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import ButtonCat from './ButtonCat';
import SubCategories from './SubCategories';
import Image from 'next/image';
import drop from '../../../../public/assets/chevron-down.svg';

interface CategoriesNavProps {
  navItems: string[];
}

const CategoriesNav = (props: CategoriesNavProps) => {
  const [popupClass, setPopupClass] = useState(false);
  const [active, setActive] = useState(-1);
  const [allCatActive, setAllCatActive] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  const { navItems } = props;
  useEffect(() => {
    if (active >= 0) setAllCatActive(false);
  }, [active]);

  const handleActiveNav = (i: number) => {
    setActive(i);
  };

  return (
    <div className=" font-ppReg lg:pt-5  px-4">
      <div className="max-w-[1240px] absolute  z-30 bg-white-100 right-0 left-0   mx-auto bg-whte-100 lg:hidden text-sm xl:text-base">
        <aside className="flex justify-between py-5 px-4  ">
          <h3 className="text-xl">All Categories</h3>
          <Image
            onClick={() => setShowCategories((prev) => !prev)}
            className={`${showCategories ? '-rotate-90' : 'rotate-90'}  z-50`}
            src={drop}
            alt="drop icon"
          />
        </aside>
        <div className="border-b-[1px]  border-slate-50 w-full lg:hidden"></div>
        <ul className={` flex-col pb-5 gap-8 mt-8 px-4 ${showCategories ? 'flex' : 'hidden'}`}>
          <li>All</li>
          {navItems.map((item, i) => (
            <li key={i + 1}>{item}</li>
          ))}
        </ul>
      </div>
      <ul className="hidden whitespace-nowrap lg:flex gap-5 xl:gap-8 py-5   xl:mb-[52px] relative max-w-[1240px] mx-auto z-30 text-sm xl:text-base">
        <li
          className={`${allCatActive ? 'text-brand-green-shade50' : ''}`}
          onClick={() => {
            setAllCatActive(true);
            setActive(-1);
          }}
        >
          <Link href="allcategories">All Categories</Link>
        </li>
        {navItems.slice(0, 6).map((category, i) => {
          return (
            <li key={i + 1} className="relative">
              <ButtonCat active={active} handleActiveNav={handleActiveNav} category={category} index={i} />
            </li>
          );
        })}
        <li>
          <button className="" onMouseOver={() => setPopupClass(true)} onMouseLeave={() => setPopupClass(false)}>
            More...
            <div
              className={`border-[2px] border-slate-50 flex flex-col gap-3 ${
                popupClass ? 'visible opacity-100' : 'invisible opacity-0'
              } text-start rounded-lg absolute transition-all duration-500 w-[286px] z-30 translate-y-4 -translate-x-1/4 bg-white-100`}
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
    </div>
  );
};

export default CategoriesNav;

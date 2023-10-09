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
    <div className=" font-ppReg ">
      <div
        className={` ${
          showCategories ? 'absolute right-0 left-0 z-30' : ''
        } bg-white-100 bg-whte-100 mb-5 lg:m-0 lg:hidden text-sm xl:text-base`}
      >
        <aside className={`${showCategories ? 'px-4' : ''} flex justify-between pb-5 w-full`}>
          <h3 className="text-lg md:text-xl">All Categories</h3>
          <Image
            onClick={() => setShowCategories((prev) => !prev)}
            className={`${showCategories ? '-rotate-90' : 'rotate-90'}  z-50`}
            src={drop}
            alt="drop icon"
          />
        </aside>
        <div className="border-b-[1px] absolute right-0 left-0 border-slate-50 lg:hidden"></div>
        <ul className={` flex-col pb-5 gap-8 mt-8 px-4 ${showCategories ? 'flex' : 'hidden'}`}>
          <li className="">
            <Link onClick={() => setShowCategories(false)} href="/marketplace/allcategories">
              All
            </Link>
          </li>
          {navItems.map((item, i) => (
            <li key={i + 1}>
              <Link onClick={() => setShowCategories(false)} href="/marketplace/categories">
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <ul className="hidden whitespace-nowrap lg:flex gap-3 xl:gap-6 py-5  xl:mb-[52px] relative z-30 lg:text-sm xl:text-base pr-5">
        <li
          className={`${allCatActive ? 'text-brand-green-shade50' : ''}`}
          onClick={() => {
            setAllCatActive(true);
            setActive(-1);
          }}
        >
          <Link href="/marketplace/allcategories">All Categories</Link>
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
              } text-start rounded-lg absolute transition-all duration-500 w-[286px] z-30 translate-y-4 -translate-x-[75%] bg-white-100`}
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

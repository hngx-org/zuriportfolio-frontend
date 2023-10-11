import React, { useState } from 'react';
import Link from 'next/link';
import drop from '../../../../public/assets/chevron-down.svg';
import more from '../../../../public/assets/ic_outline-arrow-back-ios.svg';
import menu from '../../../../public/assets/ic_outline-menu.svg';
import Image from 'next/image';
interface CategoriesNavProps {
  navItems: string[];
}
const CatgoriesDetailsNav = (props: CategoriesNavProps) => {
  const [showCategories, setShowCategories] = useState(false);
  const { navItems } = props;
  return (
    <div className="border-slate-50 border-b-[1px] font-ppReg">
      <div className="max-w-[1240px] mx-auto ">
        <div
          className={` ${
            showCategories ? 'absolute right-0 left-0 z-30' : ''
          } bg-white-100 bg-whte-100 mb-5  xl:hidden text-sm xl:text-base`}
        >
          <aside className={`flex justify-between w-full px-4`}>
            <h3 className="text-lg md:text-xl">All Categories</h3>
            <Image onClick={() => setShowCategories((prev) => !prev)} className="" src={drop} alt="drop icon" />
          </aside>
          <ul className={`${showCategories ? 'flex' : 'hidden'} flex-col pb-5 gap-8 mt-8 px-4 `}>
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
        <ul className="hidden text-dark-800 whitespace-nowrap items-center xl:flex gap-6 xl:gap-8 pb-8  relative z-30 lg:text-sm xl:text-base pr-5">
          <li className="flex gap-2">
            <Image className="hover:text-brand-green-shade50" src={menu} alt="menu" />
            <Link className="hover:text-brand-green-shade50" href="/marketplace/allcategories">
              All Categories
            </Link>
          </li>
          {navItems.map((item, i) => (
            <li className="hover:text-brand-green-shade50" key={i + 1}>
              <Link href="/marketplace/wishlist">{item}</Link>
            </li>
          ))}
          <li>
            <Image className="" src={more} alt="drop icon" />
          </li>
        </ul>
      </div>
    </div>
  );
};
export default CatgoriesDetailsNav;

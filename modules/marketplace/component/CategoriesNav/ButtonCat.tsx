import React, { useState } from 'react';
import Link from 'next/link';

export interface CategoriesProps {
  category: string;
  index: number;
  handleActiveNav: (arg: number) => void;
  active: number;
}

const ButtonCat = ({ category, index, handleActiveNav, active }: CategoriesProps) => {
  const [popupClass, setPopupClass] = useState(false);

  return (
    <button
      onClick={() => handleActiveNav(index)}
      className={`${active === index ? 'text-brand-green-shade50' : 'text-brand-green-shade10'}`}
      onMouseOver={() => setPopupClass(true)}
      onMouseLeave={() => setPopupClass(false)}
    >
      <Link href="/marketplace/categories">{category}</Link>

      <div
        className={`border-[2px]  border-slate-50 flex flex-col gap-3 ${
          popupClass ? 'visible opacity-100' : 'invisible opacity-0'
        }  rounded-lg absolute translate-y-4 -translate-x-1/4 transition-all duration-500 w-[286px] bg-white-100`}
      >
        {['Graphics Design Templates', 'Illustrations', 'Logos', 'Branding Assets', 'Ui/Ux Design Elements'].map(
          (item, i) => (
            <Link
              onClick={() => handleActiveNav(index)}
              className="px-4 py-2 items-center hover:bg-white-200 w-full flex justify-between text-brand-green-shade10"
              key={i + 1}
              href="/marketplace/specific-sub-category"
            >
              {item}
            </Link>
          ),
        )}
      </div>
    </button>
  );
};

export default ButtonCat;

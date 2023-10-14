import React, { useState } from 'react';
import Link from 'next/link';

// type categories = {
//   name: string;
//   subcategories: [];
// };
export interface CategoriesProps {
  category: string;
  index: number;
  handleActiveNav: (arg: number) => void;
  active: number;
}

const ButtonCat = ({ category, index, handleActiveNav, active }: CategoriesProps) => {
  const [popupClass, setPopupClass] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const getPostion = async (e: any) => {
    const el = e.target;

    const rect = el.getBoundingClientRect();

    setPosition({ top: rect.top, left: rect.left });

    setPopupClass(true);
  };

  const returnPos = () => {
    setPopupClass(false);
  };

  return (
    <div onMouseOver={getPostion} onMouseLeave={returnPos}>
      <div
        onClick={() => handleActiveNav(index)}
        className={`${active === index ? 'text-brand-green-shade50' : 'text-brand-green-shade10'} z-10 relative`}
      >
        <Link href={`/marketplace/categories/${category}`}>{category}</Link>
      </div>
      <div
        className={`py-3 flex-col gap-3 ${
          popupClass ? `flex opacity-100` : 'hidden opacity-0'
        } rounded-lg absolute -translate-y-1 transition-all duration-500 w-[286px] bg-white-100 border-[0.5px] border-slate-50 z-50 shadow-lg`}
        style={{
          left: `${position.left}px`,
        }}
        onMouseOver={() => setPopupClass(true)}
        onMouseLeave={() => setPopupClass(false)}
      >
        {['Graphics Design Templates', 'Illustrations', 'Logos', 'Branding Assets', 'Ui/Ux Design Elements'].map(
          (item: string, i) => (
            <Link
              onClick={() => handleActiveNav(index)}
              className="px-4 py-2 items-center hover:bg-white-200 w-full flex justify-between text-brand-green-shade10"
              key={i + 1}
              href={`/marketplace/categories/${category}/${item}`}
            >
              {item}
            </Link>
          ),
        )}
      </div>
    </div>
  );
};

export default ButtonCat;

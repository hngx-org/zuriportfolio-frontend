import React, { useState } from 'react';
import Link from 'next/link';

type funcType = (arg: number) => void;

interface MyComponentProps {
  category: string;
  index: number;
  handleActiveNav: funcType;
  active: number;
}

const ButtonCat: React.FC<MyComponentProps> = ({ category, index, handleActiveNav, active }) => {
  const [popupClass, setPopupClass] = useState(false);

  return (
    <button
      onClick={() => handleActiveNav(index)}
      className={`${active === index ? 'text-brand-green-shade50' : 'text-brand-green-shade10'}`}
      onMouseOver={() => setPopupClass(true)}
      onMouseLeave={() => setPopupClass(false)}
    >
      <Link href={`marketplace/${category.toLowerCase().replaceAll(' ', '')}`}>{category}</Link>

      <div
        className={`border-[2px]  border-slate-50 flex flex-col gap-2 ${
          popupClass ? 'visible opacity-100' : 'invisible opacity-0'
        }  rounded-lg absolute translate-y-4 transition-all duration-500 w-[286px] bg-white-100`}
      >
        {['Graphics Design Templates', 'Illustrations', 'Logos', 'Branding Assets', 'Ui/Ux Design Elements'].map(
          (item, i) => (
            <Link
              onClick={() => handleActiveNav(index)}
              className="px-4 py-2 items-center hover:bg-white-200 w-full flex justify-between text-brand-green-shade10"
              key={i + 1}
              href={`/marketplace/${category.toLowerCase().replaceAll(' ', '')}/${item
                .toLowerCase()
                .replaceAll(' ', '')}`}
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

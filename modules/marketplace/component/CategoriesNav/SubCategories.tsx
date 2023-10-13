import React, { useState } from 'react';
import chevron from '../../../../public/assets/chevron-down.svg';
import Image from 'next/image';
import Link from 'next/link';

export interface SubCategoriesProps {
  item: string;
}

const SubCategories = ({ item }: SubCategoriesProps) => {
  const [popupClass, setPopupClass] = useState(false);

  return (
    <p
      className="px-4 py-2 hover:bg-white-200 w-full "
      onMouseOver={() => setPopupClass(true)}
      onMouseLeave={() => setPopupClass(false)}
    >
      <Link className="flex justify-between items-center" href={`/marketplace/categories/${item}`}>
        {item}

        <Image src={chevron} alt="chevron svg" width={20} height={20} />
      </Link>
      <span
        className={`border-[2px]  border-slate-50 flex flex-col gap-3 ${
          popupClass ? 'visible opacity-100' : 'invisible opacity-0'
        } text-start rounded-lg rounded-tr-none absolute -translate-x-[106%] translate-y-[5%] transition-all duration-500 w-[286px] bg-white-100`}
      >
        {['Articles', 'Scripts', 'Copywriting Templates '].map((_item, i) => (
          <Link
            className="pl-4 py-2 hover:bg-white-200 w-full "
            href={`/marketplace/categories/${item}/${_item}`}
            key={i + 1}
          >
            {_item}
          </Link>
        ))}
      </span>
    </p>
  );
};

export default SubCategories;

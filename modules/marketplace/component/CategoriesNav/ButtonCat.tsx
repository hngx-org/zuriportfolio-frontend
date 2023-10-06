import React, { useState } from 'react';

type funcType = (arg: number) => void;

interface MyComponentProps {
  item: string;
  index: number;
  handleActiveNav: funcType;
  active: number;
}

const ButtonCat: React.FC<MyComponentProps> = ({ item, index, handleActiveNav, active }) => {
  const [popupClass, setPopupClass] = useState(false);

  return (
    <button
      className={`${active === index ? 'text-brand-green-shade50' : 'text-brand-green-shade10'}`}
      onMouseOver={() => setPopupClass(true)}
      onMouseLeave={() => setPopupClass(false)}
    >
      {item}

      <div
        className={`border-[2px]  border-slate-50 flex flex-col gap-2 ${
          popupClass ? 'visible opacity-100' : 'invisible opacity-0'
        }  rounded-lg absolute translate-y-4 transition-all duration-500 w-[286px]`}
      >
        {[
          'sub-categories',
          'sub-categories',
          'sub-categories',
          'sub-categories',
          'sub-categories',
          'sub-categories',
          'sub-categories',
        ].map((item, i) => (
          <p
            onClick={() => handleActiveNav(index)}
            className="px-4 py-2 items-center hover:bg-white-200 w-full flex justify-between text-brand-green-shade10"
            key={i + 1}
          >
            {item}
          </p>
        ))}
      </div>
    </button>
  );
};

export default ButtonCat;

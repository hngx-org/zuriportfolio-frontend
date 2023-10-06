import React, { useState } from 'react';

interface MyComponentProps {
  item: string;
}

const ButtonCat: React.FC<MyComponentProps> = ({ item }) => {
  const [popupClass, setPopupClass] = useState(false);

  return (
    <button className="" onMouseOver={() => setPopupClass(true)} onMouseLeave={() => setPopupClass(false)}>
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
          <p className="px-4 py-2 items-center hover:bg-white-200 w-full flex justify-between" key={i + 1}>
            {item}
          </p>
        ))}
      </div>
    </button>
  );
};

export default ButtonCat;

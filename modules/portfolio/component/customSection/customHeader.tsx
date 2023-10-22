import { Add } from 'iconsax-react';
import React from 'react';

interface CustomHeaderProps {
  sectionButtonsData: { type: string; title: string }[];
  handleChange: (e: string) => void;
  list: any;
}

const CustomHeader = ({ sectionButtonsData, handleChange, list }: CustomHeaderProps) => {
  const isTitleEmpty = () => {
    return list[0].title === undefined;
  };
  const isSubTitleEmpty = () => {
    return list[0].subtitle === undefined;
  };
  const isDescEmpty = () => {
    return list[0].description === undefined;
  };

  const checkDisabled = (type: string) => {
    if (isTitleEmpty()) {
      return true;
    }
    if (type === 'subtitle' && !isSubTitleEmpty()) {
      return true;
    }
    if (type === 'description' && !isDescEmpty()) {
      return true;
    }
  };

  return (
    <div className="border-brand-disabled rounded py-5 px-6 mt-8 mb-8 border-[1px]">
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(8rem, 1fr))',
          gap: '1rem',
        }}
      >
        <button
          onClick={() => handleChange('title')}
          disabled={!isTitleEmpty()}
          className="bg-brand-green-ttr px-[.8rem] py-[.5rem] disabled:opacity-50 rounded-md text-lg text-white-650 flex gap-2 justify-between items-center"
        >
          Title
          <Add size="16" color="#003A1B" />
        </button>
        {sectionButtonsData.map((sectionBtn) => (
          <button
            key={sectionBtn.type}
            onClick={() => handleChange(sectionBtn.type)}
            type="button"
            disabled={checkDisabled(sectionBtn.type)}
            className="bg-brand-green-ttr px-[.8rem] py-[.5rem] disabled:opacity-50 rounded-md text-lg text-white-650 flex gap-2 justify-between items-center"
          >
            {sectionBtn.title}
            <Add size="16" color="#003A1B" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default CustomHeader;

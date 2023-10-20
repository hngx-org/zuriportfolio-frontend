import Modal from '@ui/Modal';
import { CloseSquare } from 'iconsax-react';
import React from 'react';
import CustomFooter from './customFooter';

const CustomNewSections = ({ onClose }: { onClose: () => void }) => {
  return (
    <>
      <article className="flex flex-col gap-4 justify-between">
        <div className="flex flex-col gap-2 mb-4">
          <div className="w-full flex justify-between items-center">
            <p className="text-[1.2rem] sm:text-[1.5rem] font-bold text-[#2E3130] font-manropeL">sectionItem?.title</p>
            <CloseSquare size="32" color="#009254" variant="Bold" onClick={onClose} className="cursor-pointer" />
          </div>
          <div className="bg-brand-green-primary w-full h-1 rounded-sm"></div>
        </div>
        <div className="flex justify-between gap-4">
          <div>
            <p className="text-[1.115rem] mb-2 font-manropeB text-[#2E3130]">subTitle[0]?.data?.title</p>
            <div className="flex flex-col gap-4">
              <p className="text-[#8D9290]">field.data.title</p>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-[#737876] font-manropeL">field?.data?.title</p>
          </div>
        </div>
        <div className="h-[1px] bg-[#E1E3E2] w-full"></div>
        <div className="self-end flex gap-4 font-manropeL">
          <span className="font-semibold cursor-pointer text-[#5B8DEF]">Edit</span>
          <span
            className="font-semibold cursor-pointer text-brand-red-hover"
            //   onClick={() => handleDeleteCustomItem(sectionItem?.id)}
          >
            Delete
          </span>
        </div>
      </article>
      <CustomFooter handleClose={onClose} />
    </>
  );
};

export default CustomNewSections;

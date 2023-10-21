import { CloseSquare, Edit2, Trash } from 'iconsax-react';
import React from 'react';
import CustomFooter from './customFooter';
import Link from 'next/link';

const CustomNewSections = ({
  onClose,
  data,
  setNewSection,
  setGetNewSection,
}: {
  onClose: () => void;
  data: any;
  setNewSection: any;
  setGetNewSection: any;
}) => {
  const handleEdit = () => {
    setNewSection(true);
    setGetNewSection(false);
  };
  return (
    <>
      <article className="flex flex-col gap-4 justify-between">
        <div className="flex flex-col gap-2 mb-4">
          <div className="w-full flex justify-between items-center">
            <p className="text-[1.2rem] sm:text-[1.5rem] font-bold text-[#2E3130] font-manropeL">{data[0]?.title}</p>
            <CloseSquare size="32" color="#009254" variant="Bold" onClick={onClose} className="cursor-pointer" />
          </div>
          <div className="bg-brand-green-primary w-full h-1 rounded-sm"></div>
        </div>
        <div className="flex justify-between gap-4">
          <div>
            <div className="flex flex-col gap-4">
              <p className="text-[#8D9290]">
                {data[0]?.dates?.from} - {data[0]?.dates?.to}
              </p>
            </div>
            <p className="text-[1.115rem] mb-2 font-manropeB text-[#2E3130]">{data[0]?.subtitle?.value}</p>
            {data[0]?.fields?.map((field: any) => (
              <>
                {field?.links && (
                  <Link className="text-green-300" href={field?.value}>
                    {field?.links}
                  </Link>
                )}
                {field?.inputfield && <p className="text-[#8D9290]">{field?.inputfield}</p>}
              </>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-[#737876] font-manropeL">{data[0]?.description}</p>
          </div>
        </div>
        <div className="h-[1px] bg-[#E1E3E2] w-full"></div>
        <div className="self-end flex gap-4 font-manropeL space-x-4 my-4">
          <div onClick={handleEdit}>
            <Edit2 size="28" color="#37d67a" variant="Outline" />
          </div>

          <div>
            <Trash size="28" color="#f47373" variant="Outline" />
          </div>
        </div>
      </article>
      <div className="mt-10">
        <CustomFooter handleClose={onClose} />
      </div>
    </>
  );
};

export default CustomNewSections;

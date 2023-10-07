import React, { useState, useContext } from 'react';
import { ListContext } from '../../../pages/assessment';
import Image from 'next/image';
import trash from '../../../public/assets/assessment/trash.png';
import editmessage from '../../../public/assets/assessment/message-edit.png';

function Assessmentresponses() {
  const [list, setList]: any = useContext(ListContext);
  const [todel, setTodel] = useState(true);
  return (
    <div className="w-full flex flex-col gap-[15px] md:gap-[23px] mt-[55px] mb-[139px] p-4 md:p-8 rounded border-[1px] border-[#C4C7C6] font-manropeL">
      {todel && (
        <div className="fixed bg-dark-600 top-0 left-0 w-full h-full grid place-items-center">
          <div className="bg-white-100">
            <div className="text-[black]">Are you sure you want to delete?</div>
            <div className=""></div>
          </div>
        </div>
      )}
      {list?.map((child: any) => {
        return (
          <div
            className="w-full flex items-center justify-between border-[1px] rounded p-4 md:p-6  border-[#C4C7C6]"
            key={child?.id}
          >
            <div>
              <div className="text-[#1A1C1B] text-base md:text-[18px] font-manropeB font-bold mb-[4px]">
                {child?.trackname}
              </div>
              <div className="my-[6px] md:my-[10px] text-[#737876]"> {child?.createddate}</div>
              <div className="text-[#737876]">Modified {child?.modifieddate}</div>
            </div>
            <div className="flex gap-8">
              <div className="flex flex-col items-center">
                <Image src={editmessage} height="24" width="24" alt="edit message" />
                <p className="pt-[6px]">Edit</p>
              </div>
              <div className="flex flex-col items-center">
                <Image src={trash} height="24" width="24" alt="trash" />
                <p className="pt-[6px]">Delete</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Assessmentresponses;

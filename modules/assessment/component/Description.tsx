import React from 'react';
import Image from 'next/image';

function Description({ info, number, icon }: any) {
  return (
    <div className="description flex border-[1px] border-[#A8ACAB] p-4 md:p-6 rounded-lg hover:text-[#005427] font-ManropeL items-center justify-between w-[291px]">
      <div>
        <div className="text-base uppercase">{info}</div>
        <div className="text-[#006F37] text-[30px]  md:text-[45px] md:leading-[53px] mt-2">{number}</div>
      </div>
      <div className="w-[48px] h-[48px] bg-[#CAEAD4] grid place-items-center rounded-full">
        <Image src={icon} width="27.61" height="27.61" alt="Icon" />
      </div>
    </div>
  );
}

export default Description;

import React from 'react';
import Image from 'next/image';
import Loader from '@ui/Loader';

function Description({ info, number, icon, loading }: any) {
  return (
    <div className="description flex border-[1px] border--white-400 p-4 md:p-6 rounded-lg hover:text-green-750 font-ManropeL items-center justify-between w-[291px]">
      <div>
        <div className="text-base uppercase">{info}</div>
        {loading ? (
          <div className="z-50 inset-0 min-h-[100px] grid place-items-center">
            <Loader />
          </div>
        ) : (
          <div className=" text-[30px] md:text-[45px] text-brand-green-pressed md:leading-[53px] mt-2">{number}</div>
        )}
      </div>
      {!loading && (
        <div className="w-[48px] h-[48px] bg-green-50 grid place-items-center rounded-full">
          <Image src={icon} width="27.61" height="27.61" alt="Icon" />
        </div>
      )}
    </div>
  );
}

export default Description;

import React from 'react';
import badgebg from '../../../public/assets/assessment/headerbg/badge.png';
import greenbadgebg from '../../../public/assets/assessment/headerbg/greenbadge.png';
import notebg from '../../../public/assets/assessment/headerbg/note.png';
import Image from 'next/image';

function Header({ heading, body }: any) {
  return (
    <div className="w-full relative">
      <div className=" relative grid grid-cols-1 md:grid-cols-2 bg-brand-green-shade40 justify-between w-full">
        <div className=" flex flex-col text-white-100 justify-center pl-[20px] lg:pl-[68px] py-7 z-10">
          <h1 className=" font-manropeB text-[24px] md:text-[32px] py-2">{heading}</h1>
          <p className=" text-sm font-manropeL">{body}</p>
        </div>
        <div className="bg w-full absolute top-0 left-0 h-auto md:relative z-0">
          <div className="absolute top-0 right-0 w-[100px] lg:w-auto h-auto">
            <Image src={greenbadgebg} alt="Green background" layout="contain" />
          </div>
          <div className="absolute bottom-0 left-[40%] w-0 h-0 md:w-[150px] lg:w-[210px]  md:h-auto">
            <Image src={badgebg} alt="Badge bg" layout="contain" />
          </div>
          <div className="absolute right-0 bottom-0 w-0 h-0 md:left-0 md:w-[150px] lg:w-[210px] md:h-auto">
            <Image src={notebg} alt="Note bg" layout="contain" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;

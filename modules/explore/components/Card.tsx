// components/Card.tsx
import { useState, useRef } from 'react';
import Image from 'next/image';
import { CardData } from '../../../@types';
import total_projects from '../../../public/assets/images/explore_img/total-projects.svg';
import badge_beginner from '../../../public/assets/images/explore_img/badge-beginner.svg';
import Location from '../../../public/assets/images/explore_img/location.svg';
import CardHover from './CardHover';
import { UserInfo } from '../../../@types';

import bg1 from '../../../public/assets/images/explore_img/bg1.svg';
import photo2 from '../../../public/assets/images/explore_img/photo2.png';
import Link from 'next/link';
import { ExportCurve } from 'iconsax-react';

interface CardProps {
  data: CardData;
}

const Card = ({ data }: { data?: UserInfo }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const shareBtnRef = useRef<HTMLDivElement | null>(null);
  const btnPortfolioRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      className="relative transition-all ease-in-out duration-500 hover:scale-105 "
      ref={cardRef}
      onMouseEnter={() => {
        overlayRef.current.style.height = '100%';
        shareBtnRef.current.classList.toggle('hidden');
        btnPortfolioRef.current.classList.toggle('hidden');
      }}
      onMouseLeave={() => {
        overlayRef.current.style.height = '100%';
        shareBtnRef.current.classList.toggle('hidden');
        btnPortfolioRef.current.classList.toggle('hidden');
      }}
    >
      <div
        ref={overlayRef}
        className="w-full absolute top-0 left-0 rounded-2xl hover:bg-[rgba(10,10,10,0.3)] z-[1]"
      ></div>
      <div ref={shareBtnRef} className="hidden absolute right-8 top-10 w-30 rounded-full bg-white z-[2]">
        <button>
          <ExportCurve color="#fff" className="border-2 border-white-100 w-[30px] h-[30px] rounded-full p-1" />
        </button>
      </div>
      <Link
        ref={btnPortfolioRef}
        href={'/portfolio'}
        className="hidden absolute w-[80%] top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 cursor-pointer bg-custom-color38 font-manropeB text-brand-green-primary border border-brand-green-primary border-solid rounded-2xl py-3 text-center hover:bg-brand-green-primary hover:text-custom-color38 z-[2]"
      >
        View Portfolio
      </Link>
      {/* <CardHover openCard={isOpen} /> */}
      <div className="max-w-[22rem] p-2 pb-4 border-1 border mx-auto  border-gray-500 rounded-2xl justify-center items-center font-manropeL text-sm lg:min-w-[22.5rem] xl:min-w-[24rem]">
        <Image className="w-full rounded-t-2xl object-cover" src={bg1} alt="Card Header" width={100} height={76} />
        <Image
          className="-mt-12 rounded-full mx-auto aspect-square"
          src={data?.profilePictureUrl ?? photo2}
          alt="Avatar"
          width={112}
          height={112}
        />
        <div className="mt-3 text-center">
          <h3 className="text-gray-800 font-manropeEB text-base md:text-[1.375rem]">
            {data?.firstName} {data?.lastName}
          </h3>
          <h4 className="text-gray-500 md:text-base">{data?.track}</h4>

          <div className="flex flex-wrap justify-center items-center gap-2 my-5 px-4 text-[0.75rem] font-manropeB text-gray-600 text-center md:text-sm md:px-3">
            {data?.skills.length === 0 ? (
              <button className="border border-gray-100 px-2 rounded-full">No Skills</button>
            ) : (
              data?.skills.map((skill, id) => (
                <button key={id} className="border border-gray-100 px-2 rounded-full">
                  {skill}
                </button>
              ))
            )}
            {/* <button className="mt-2 border border-gray-100 px-4 py-1 rounded-full">{data.skills[6]}</button> */}
          </div>
          <div className="mx-auto my-4 gap-2 md:gap-0 justify-center items-center flex">
            <div className="gap-2 flex ">
              <Image src={total_projects} className="m-auto" alt="total_projects" width={40} height={40} />
              <div className="grid">
                <span className="text-gray-500 text-left text-[0.75rem]">Total Projects</span>
                <span className="text-left font-bold">{data?.projects}</span>
              </div>
            </div>
            <div className="gap-2 ml-4 flex">
              <Image src={badge_beginner} alt="badge_beginner" className="m-auto" width={40} height={40} />
              <div className="grid">
                <span className="text-gray-500 text-left text-[0.75rem] ">Badge</span>
                <span className="text-left text-sm font-bold">{data?.ranking ?? 'No Ranking'}</span>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center gap-1 mt-5">
            <Image src={Location} alt="badge_beginner" width={20} height={20} />
            <div>
              <span className="text-gray-500">{data?.address ?? 'No Address'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

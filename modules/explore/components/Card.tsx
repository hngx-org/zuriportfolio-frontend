// components/Card.tsx
import { useState } from 'react';
import Image from 'next/image';
import { CardData } from '../../../@types';
import total_projects from '../../../public/assets/images/explore_img/total-projects.svg';
import badge_beginner from '../../../public/assets/images/explore_img/badge-beginner.svg';
import Location from '../../../public/assets/images/explore_img/location.svg';
import CardHover from './CardHover';
import { UserInfo } from '../../../@types/exploreTyples';
import bg1 from '../../../public/assets/images/explore_img/bg1.svg';
import photo2 from '../../../public/assets/images/explore_img/photo2.png';

interface CardProps {
  data: CardData;
}

const Card = ({ data }: { data?: UserInfo }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <article className="relative" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <CardHover openCard={isOpen} />
      <div className="max-w-[22rem] p-2 pb-4 border-1 border mx-auto  border-gray-500 rounded-2xl justify-center items-center font-manropeL text-sm lg:min-w-[22.5rem] xl:min-w-[24rem]">
        <Image className="w-full rounded-t-2xl object-cover" src={bg1} alt="Card Header" width={100} height={76} />
        <Image
          objectFit="fill"
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
    </article>
  );
};

export default Card;

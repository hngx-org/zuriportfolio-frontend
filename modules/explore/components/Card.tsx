// components/Card.tsx
import { CardData } from '../../../@types';
import total_projects from '../../../public/assets/images/explore_img/total-projects.svg';
import Image from 'next/image';
import badge_beginner from '../../../public/assets/images/explore_img/badge-beginner.svg';
import Location from '../../../public/assets/images/explore_img/location.svg';
import CardHover from '../../../pages/view-components';
import { useState } from 'react';

interface CardProps {
  data: CardData;
}

const Card: React.FC<CardProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <article className="relative" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <CardHover openCard={isOpen} />
      <div className=" relative p-2 border-1 border m-auto mb-10   w-full sm:w-auto  rounded-2xl justify-center items-center">
        <Image className="w-full h-20 object-cover" src={data.bgImage} alt="Card Header" width={100} height={20} />
        <Image
          className="h-100 w-100 relevant z-40 -mt-14 rounded-full mx-auto object-cover"
          src={data.photoImage}
          alt="Avatar"
          width={150}
          height={100}
        />
        <div className="mt-2 text-center">
          <h1 className="text-gray-800 font-manropeB font-bold text-2xl">{data.name}</h1>
          <h1 className="text-gray-500 font-manropeL text-lg">{data.role}</h1>

          <div className=" font-ppReg my-3  text-sm font-bold text-gray-600 text-center ">
            <button className="border mr-2 mb-2 border-gray-100 px-4 py-1 rounded-full">{data.skills[0]}</button>
            <button className=" border mr-2 mb-2 border-gray-100 px-4 py-1 rounded-full">{data.skills[1]}</button>
            <button className="border mr-2 mb-2 border-gray-100 px-4 py-1 rounded-full">{data.skills[2]}</button>
            <button className="border mr-2 mb-2 border-gray-100 px-4 py-1 rounded-full">{data.skills[3]}</button>
            {/* <br /> */}
            <button className=" border mr-2 mb-2 border-gray-100 px-4 py-1 rounded-full">{data.skills[4]}</button>
            <button className=" border mr-2 mb-2 border-gray-100 px-4 py-1 rounded-full">{data.skills[5]}</button>
            {/* <button className="mt-2 border border-gray-100 px-4 py-1 rounded-full">{data.skills[6]}</button> */}
          </div>
          <div className="mx-auto my-4 gap-2 md:gap-0 justify-center items-center flex">
            <div className="gap-2 flex ">
              <Image src={total_projects} className="m-auto" alt="total_projects" width={40} height={20} />
              <div>
                <h2 className="text-gray-500 text-left font-manropeL text-sm">Total Projects</h2>
                <h2 className="text-left font-bold font-manropeL">{data.totalProjects}</h2>
              </div>
            </div>
            <div className="gap-2 ml-4 flex">
              <Image src={badge_beginner} alt="badge_beginner" className="m-auto" width={40} height={20} />
              <div>
                <h2 className="text-gray-500 text-left font-manropeL text-sm ">Badge</h2>
                <h2 className="text-left text-sm font-bold font-manropeL">{data.badge}</h2>
              </div>
            </div>
          </div>
          <div className="justify-center items-center gap-1 flex">
            <Image src={Location} alt="badge_beginner" width={20} height={20} />
            <div>
              <h3 className="text-gray-500 font-manropeL text-lg">{data.location}</h3>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Card;

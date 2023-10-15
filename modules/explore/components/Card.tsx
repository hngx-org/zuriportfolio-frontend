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
import photo2 from '../assets/photo2.png';
import Link from 'next/link';
import { ExportCurve } from 'iconsax-react';
import { notify } from '@ui/Toast';

interface CardProps {
  data: CardData;
}

const Card = ({ data }: { data: UserInfo }) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const shareBtnRef = useRef<HTMLDivElement>(null);
  const btnPortfolioRef = useRef<HTMLAnchorElement>(null);
  const urlInputRef = useRef<HTMLInputElement>(null);

  const slashIndex = window.location.href.split('').findIndex((e, i, a) => i === a.lastIndexOf('/'));
  const homepageURl = window.location.href.slice(0, slashIndex + 1);

  const showButtons = () => {
    // btnPortfolioRef.current && (btnPortfolioRef.current.style.display = 'block');
    shareBtnRef.current && (shareBtnRef.current.style.right = '32px');
  };

  const hideButtons = () => {
    shareBtnRef.current && (shareBtnRef.current.style.right = '-40px');
    // btnPortfolioRef.current && (btnPortfolioRef.current.style.display = 'none');
  };

  const copyUrl = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (urlInputRef.current) {
      navigator.clipboard.writeText(urlInputRef.current.value).then(() => {
        notify({
          message: 'Profile URL has been copied successfully!',
          position: 'bottom-right',
          autoClose: 3500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'dark',
          type: 'success',
        });
      });
    }
  };

  const skillArray = data?.skills.slice(0, 5),
    skillExcess = data?.skills.length - data?.skills.slice(0, 5).length;
  return (
    <div
      className="relative transition-all ease-in-out duration-500 hover:scale-105 overflow-hidden"
      ref={cardRef}
      onMouseEnter={showButtons}
      onMouseLeave={hideButtons}
    >
      {/* <CardHover openCard={isOpen} /> */}

      <div className="max-w-[22rem] p-2 pb-4 border-1 min-h-[434px] border mx-auto  border-gray-500 rounded-2xl justify-center items-center font-manropeL text-sm lg:min-w-[22.5rem] xl:min-w-[24rem]">
        <Image className="w-full rounded-t-2xl object-cover" src={bg1} alt="Card Header" width={100} height={76} />
        <Image
          className="-mt-11 rounded-full mx-auto aspect-square object-cover bg-center"
          src={data?.profilePictureUrl ?? photo2}
          alt="Avatar"
          width={112}
          height={112}
        />
        <div className="mt-3 text-center">
          <Link onClick={(e) => e.stopPropagation} href={`/portfolio/${data?.id}`} className="block w-fit mx-auto">
            <h3 className="w-fit text-gray-800 font-manropeEB text-base md:text-[1.375rem] hover:underline">
              {data?.firstName} {data?.lastName}
            </h3>
          </Link>
          <h4 className="text-gray-500 md:text-base">{data?.track}</h4>

          <div className="flex flex-wrap justify-center items-center gap-2 my-5 px-4 text-[0.75rem] font-manropeB text-gray-600 text-center md:text-sm md:px-3">
            {data?.skills.length === 0 ? (
              <button className="border border-gray-100 px-2 rounded-full">No Skills</button>
            ) : (
              skillArray.map((skill, id) => (
                <button key={id} className="border border-gray-100 px-2 rounded-full">
                  {skill}
                </button>
              ))
            )}
            {skillExcess > 0 && <button className="border border-gray-100 px-2 rounded-full">{skillExcess}</button>}
            {/* <button className="mt-2 border border-gray-100 px-4 py-1 rounded-full">{data.skills[6]}</button> */}
          </div>
          <div className="mx-auto my-4 gap-2  md:gap-3 justify-around max-w-[300px] items-center flex">
            <div className="gap-1 md:gap-2 flex ">
              <Image src={total_projects} className="m-auto" alt="total_projects" width={40} height={40} />
              <div className="grid">
                <span className="text-gray-500 text-left text-[0.75rem]"> Projects</span>
                <span className="text-left font-bold">{data?.projects}</span>
              </div>
            </div>
            <div className="gap-2  flex">
              <Image src={badge_beginner} alt="badge_beginner" className="m-auto" width={40} height={40} />
              <div className="grid">
                <span className="text-gray-500 text-left text-[0.75rem] ">Badge</span>
                <span className="text-left font-bold text-[0.55rem]">{data?.ranking ?? 'No Ranking'}</span>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center gap-1 mt-5">
            <Image src={Location} alt="badge_beginner" width={20} height={20} />
            <div>
              <span className="text-gray-500 ">{data?.address ?? 'No Address'}</span>
            </div>
          </div>
        </div>

        <div
          ref={shareBtnRef}
          className="absolute -right-8 top-[30%] w-30 rounded-full bg-white transition-all ease-in-out duration-500 hover:animate-bounce z-[2]"
          onClick={copyUrl}
        >
          <button>
            <ExportCurve color="#000" className=" bg-white shadow-lg  w-[30px] h-[30px] rounded-full p-1" />
          </button>
        </div>
        {/* <Link
            ref={btnPortfolioRef}
            href={`/portfolio/${data?.id}`}
            className=" hidden mx-auto mt-4 w-[15rem] bg-[rgba(255,255,255,0.15)] cursor-pointer font-manropeB border border-solid rounded-2xl py-3 text-center text-brand-green-primary hover:bg-brand-green-primary hover:text-custom-color38 transition-all ease-in-out duration-500"
          >
            View Portfolio
          </Link> */}
      </div>

      <input
        type="text"
        value={`${homepageURl}portfolio/${data?.firstName.toLowerCase()}-${data?.lastName.toLowerCase()}`}
        disabled
        ref={urlInputRef}
        className="hidden"
      />
    </div>
  );
};

export default Card;

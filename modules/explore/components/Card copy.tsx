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
import { Copy } from 'iconsax-react';
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

  const skillArray = data?.skills.slice(0, 2),
    skillExcess = data?.skills.length - data?.skills.slice(0, 2).length;

  return (
    <div
      className="relative transition-all ease-in-out duration-500 hover:scale-105 overflow-hidden"
      ref={cardRef}
      onMouseEnter={showButtons}
      onMouseLeave={hideButtons}
    >
      {/* <CardHover openCard={isOpen} /> */}

      <div className="p-10 border-1 border mx-auto  border-gray-500 rounded-2xl justify-center items-center font-manropeL text-sm ">
        <div className="w-24 rounded-full overflow-hidden mx-auto aspect-square">
          <Image
            className="w-full h-full object-cover bg-center"
            src={data?.profilePictureUrl ?? photo2}
            alt="Avatar"
            width={112}
            height={112}
          />
        </div>

        <div className="mt-3 text-center">
          <Link href={`/portfolio/${data?.id}`} className="block w-fit mx-auto">
            <h3 className="w-fit text-gray-800 font-manropeEB text-base md:text-[1.375rem] hover:underline">
              {data?.firstName} {data?.lastName}
            </h3>
          </Link>
          <span className="text-gray-500 md:text-base">{data?.track}</span>
          {' . '}
          <span className="text-gray-500 md:text-base">Intermediate</span>
        </div>

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
          {skillExcess > 0 && <button className="border border-gray-100 px-2 rounded-full">+{skillExcess}</button>}
          {/* <button className="mt-2 border border-gray-100 px-4 py-1 rounded-full">{data.skills[6]}</button> */}
        </div>

        {data?.address ?? (
          <div className="flex justify-center items-center gap-1 mt-5">
            <Image src={Location} alt="Location" width={20} height={20} />
            <div>
              <span className="text-gray-500 ">{data?.address ?? 'No Address'}</span>
            </div>
          </div>
        )}

        <div
          ref={shareBtnRef}
          className="absolute -right-8 top-[30%] w-30 rounded-full bg-white transition-all ease-in-out duration-500 hover:animate-bounce z-[2]"
          onClick={copyUrl}
        >
          <button>
            <Copy color="#000" size="4" className=" bg-white shadow-lg  w-[25px] h-[30px] rounded-full p-1" />
          </button>
        </div>
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

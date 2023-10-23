// components/Card.tsx
import { useState, useRef } from 'react';
import Image from 'next/image';
import { CardData } from '../../../@types';
import CardHover from './CardHover';
import { UserInfo } from '../../../@types';

import photo2 from '../assets/photo2.png';
import Link from 'next/link';
import { Location } from 'iconsax-react';
import { FaShareAlt } from 'react-icons/fa';
import { notify } from '@ui/Toast';
import DefaultImage from './DefaultImage';

interface CardProps {
  data: CardData;
}

const Card = ({ data }: { data: UserInfo }) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  // const cardRef = useRef<HTMLDivElement>(null);
  // const overlayRef = useRef<HTMLDivElement>(null);
  // const shareBtnRef = useRef<HTMLDivElement>(null);
  // const btnPortfolioRef = useRef<HTMLAnchorElement>(null);
  const urlInputRef = useRef<HTMLInputElement>(null);

  const slashIndex = window.location.href.split('').findIndex((e, i, a) => i === a.lastIndexOf('/'));
  const homepageURL = window.location.href.slice(0, slashIndex + 1);

  // const showButtons = () => {
  //   // btnPortfolioRef.current && (btnPortfolioRef.current.style.display = 'block');
  //   shareBtnRef.current && (shareBtnRef.current.style.right = '32px');
  // };

  // const hideButtons = () => {
  //   shareBtnRef.current && (shareBtnRef.current.style.right = '-40px');
  //   // btnPortfolioRef.current && (btnPortfolioRef.current.style.display = 'none');
  // };

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
      className="relative border-[1px] border-white-110 transition-all ease-in-out duration-500 overflow-hidden rounded-lg hover:scale-[1.015] hover:shadow-lg"
      // ref={cardRef}
      // onMouseEnter={showButtons}
      // onMouseLeave={hideButtons}
    >
      <span className="flex justify-center items-center gap-2 absolute top-6 left-6" title="Number of projects">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 7C12.5523 7 13 6.55228 13 6C13 5.44772 12.5523 5 12 5C11.4477 5 11 5.44772 11 6C11 6.55228 11.4477 7 12 7Z"
            fill="#8592A3"
          />
          <path
            d="M6 17H18V19H6V17ZM10 11.83L12.792 14.624L16.724 10.689L18 12V8H14L15.31 9.275L12.791 11.794L10 9L6 13L7.414 14.414L10 11.83Z"
            fill="#8592A3"
          />
          <path
            d="M19 2.99999H15.702C15.6038 2.85213 15.497 2.71022 15.382 2.57499L15.372 2.56299C14.6373 1.70724 13.6036 1.16427 12.482 1.04499C12.1635 0.984352 11.8365 0.984352 11.518 1.04499C10.3964 1.16427 9.36273 1.70724 8.628 2.56299L8.618 2.57499C8.50307 2.70989 8.39622 2.85147 8.298 2.99899L5 2.99999C4.20459 3.00078 3.44199 3.31711 2.87956 3.87955C2.31712 4.44198 2.00079 5.20458 2 5.99999V20C2.00079 20.7954 2.31712 21.558 2.87956 22.1204C3.44199 22.6829 4.20459 22.9992 5 23H19C19.7954 22.9992 20.558 22.6829 21.1204 22.1204C21.6829 21.558 21.9992 20.7954 22 20V5.99999C21.9992 5.20458 21.6829 4.44198 21.1204 3.87955C20.558 3.31711 19.7954 3.00078 19 2.99999ZM20 20C20 20.2652 19.8946 20.5196 19.7071 20.7071C19.5196 20.8946 19.2652 21 19 21H5C4.73486 20.9997 4.48066 20.8943 4.29319 20.7068C4.10571 20.5193 4.00026 20.2651 4 20V5.99999C4.00026 5.73485 4.10571 5.48065 4.29319 5.29318C4.48066 5.1057 4.73486 5.00025 5 4.99999H9.55C9.66476 4.43485 9.97136 3.92675 10.4179 3.5618C10.8644 3.19685 11.4233 2.99748 12 2.99748C12.5767 2.99748 13.1356 3.19685 13.5821 3.5618C14.0286 3.92675 14.3352 4.43485 14.45 4.99999H19C19.2651 5.00025 19.5193 5.1057 19.7068 5.29318C19.8943 5.48065 19.9997 5.73485 20 5.99999V20Z"
            fill="#8592A3"
          />
        </svg>
        <span className="font-manropeL text-base text-[#32475c]">{data?.projects}</span>
      </span>

      <button
        className="absolute top-6 right-6 transition-all ease-in-out duration-500 hover:animate-bounce"
        title="Copy portfolio link"
        onClick={copyUrl}
      >
        <FaShareAlt color="#8592A3" size={24} />
      </button>

      <div className="h-full p-10 mx-auto grid gap-6 border-gray-500 rounded-2xl justify-center items-center font-manropeL text-sm ">
        <div className="w-24 rounded-full overflow-hidden mx-auto aspect-square">
          {data.profilePictureUrl ? (
            <Image
              className="w-full h-full object-cover bg-center"
              src={data?.profilePictureUrl}
              alt="Avatar"
              width={112}
              height={112}
            />
          ) : (
            <DefaultImage name={`${data.firstName} ${data.lastName}`} />
          )}
        </div>

        <div className="text-center text-[#32475c]">
          <Link href={`/portfolio/${data?.slug}`} className="block w-fit mx-auto">
            <h3 className="w-fit font-manropeEB text-base capitalize md:text-[1.375rem] hover:underline">
              {data?.firstName} {data?.lastName}
            </h3>
          </Link>
          <span className="md:text-base">{data?.track ? data?.track : 'Track not Specified'}</span>
          {' . '}
          <span className="md:text-base">Intermediate</span>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-2 px-4 text-[0.75rem] font-manropeL text-center md:text-sm md:px-3">
          {data?.skills.length === 0 ? (
            <button className="bg-[#0092541F] px-2 rounded-full text-[#009254] uppercase">
              Skills not indicated yet
            </button>
          ) : (
            skillArray.map((skill, id) => (
              <button
                key={id}
                className={`${
                  id === 0 ? 'bg-[#666CFF1F] text-[#666CFF]' : 'bg-[#26C6F91F] text-[#03C3EC]'
                } px-2 rounded-full uppercase`}
              >
                {skill}
              </button>
            ))
          )}
          {skillExcess > 0 && (
            <button className="bg-[rgba(255,171,0,0.12)] px-2 rounded-full text-[#FFAB00]">+{skillExcess}</button>
          )}
          {/* <button className="mt-2 border border-gray-100 px-4 py-1 rounded-full">{data.skills[6]}</button> */}
        </div>

        <div className="flex justify-center items-center gap-1 text-center">
          <Location color="#444846" />
          <div>
            <span className="text-custom-color43 ">{data?.address.length < 3 ? 'Not Specified' : data.address}</span>
          </div>
        </div>
      </div>

      <input type="text" value={`${homepageURL}portfolio/${data.slug}`} disabled ref={urlInputRef} className="hidden" />
    </div>
  );
};

export default Card;

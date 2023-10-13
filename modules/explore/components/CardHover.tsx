import React from 'react';
import Image from 'next/image';
import bookmark from '../../public/bookmark.svg';
import download from '../../public/download.svg';
import X from '../../../public/X.svg';
import Linkedin from '../../../public/Linkedin.svg';
import ig from '../../../public/ig.svg';
import tiktok from '../../../public/Tiktok.svg';
import spotify from '../../../public/Spotify.svg';
import Pc from '../../../public/monitor.svg';
import dribble from '../../../public/dribble.svg';
import behance from '../../../public/behance.svg';
import Map from '../../../public/map.svg';
import group from '../../../public/ppl1.svg';
import gather from '../../../public/ppl2.svg';
import { Location } from 'iconsax-react';

type CardHoverProps = {
  setOpenCard?: (openCard: boolean) => void;
  openCard?: boolean;
};

const CardHover: React.FC<CardHoverProps> = ({ setOpenCard, openCard }) => {
  return (
    <div
      className={`absolute border-1 z-10 bg-[#fff] border m-auto w-full rounded-xl justify-center overflow-hidden ${
        openCard ? 'visible scale-[1.03] transition-all ease-in-out duration-500' : 'invisible'
      } items-center top-0 left-0 font-manropeL xl:w-[25rem] xl:-top-12 xl:left-6`}
    >
      <div className="bg-center bg-cover bg-no-repeat rounded-t-xl" style={{ backgroundImage: `url("/bg-pic.svg"` }}>
        <div className=" p-6 flex items-start justify-between w-100 text-white-500">
          <div className="grid gap-2">
            <h3 className="w-[7rem] font-bold text-[1.375rem] text-white-100   leading-7">Theresa Webb</h3>
            <h4 className="text-base text-custom-color38">Product Designer</h4>

            <div className="justify-start items-center gap-1 flex text-custom-color38">
              <Location color="#f9f9f9" />
              <span className="text-[0.875rem]">Lagos, Nigeria</span>
            </div>

            <div className="flex flex-wrap gap-2 text-[0.875rem]">
              <button className="border border-white-100 bg-[rgba(255,255,255,0.25)] px-2 rounded-full text-white-100">
                UI Design
              </button>
              <button className="border border-white-100 bg-[rgba(255,255,255,0.25)] px-2 rounded-full text-white-100">
                User Research
              </button>
              <button className="border border-white-100 bg-[rgba(255,255,255,0.25)] px-2 rounded-full text-white-100">
                Prototyping
              </button>
              <button className="border border-white-100 bg-[rgba(255,255,255,0.25)] px-2 rounded-full text-white-100">
                Figma
              </button>
              <button className="border border-white-100 bg-[rgba(255,255,255,0.25)] px-2 rounded-full text-white-100">
                Interaction Design
              </button>
              <button className=" border border-white-100 bg-[rgba(255,255,255,0.25)] px-2 rounded-full text-white-100">
                +5
              </button>
            </div>
          </div>

          {/* <div className="w-30">
            <Image src={bookmark} alt="Bookmark" className="w-20 h-20" />
            <Image src={download} alt="Download" className="w-20 h-20" />
          </div> */}
        </div>
      </div>

      <div className="pb-5 p-6 grid gap-6 bg-brand-green-ttr">
        <div className="grid grid-cols-6 grid-rows-3 gap-1">
          <div className="box">
            <Image src={X} alt="badge_beginner" className="w-200 cursor-pointer" />
          </div>
          <div className="box">
            <Image src={Linkedin} alt="badge_beginner" className="w-200 cursor-pointer" />
          </div>
          <div className="box col-start-1 row-start-2">
            <Image src={ig} alt="badge_beginner" className="w-200 cursor-pointer" />
          </div>
          <div className="box col-start-2 row-start-2">
            <Image src={tiktok} alt="badge_beginner" className="w-200 cursor-pointer" />
          </div>
          <div className="box col-start-1 row-start-3 col-span-2">
            <Image src={spotify} alt="badge_beginner" className="w-40 cursor-pointer" />
          </div>
          <div className="col-span-2 row-span-2 box">
            <Image src={Pc} alt="badge_beginner" className="w-40 cursor-pointer" />
          </div>
          <div className="box col-start-3 row-start-3">
            <Image src={group} alt="badge_beginner" className="w-20 cursor-pointer" />
          </div>
          <div className="box col-start-4 row-start-3">
            <Image src={gather} alt="badge_beginner" className="w-20 cursor-pointer" />
          </div>
          <div className="col-span-2 box">
            <Image src={Map} alt="badge_beginner" className="w-48 cursor-pointer" />
          </div>
          <div className="box row-span-2">
            <Image src={dribble} alt="badge_beginner" className="w-32 cursor-pointer" />
          </div>
          <div className="box row-span-2">
            <Image src={behance} alt="badge_beginner" className="w-32 cursor-pointer" />
          </div>
        </div>

        <button className="w-full cursor-pointer bg-custom-color38 font-manropeB text-brand-green-primary border border-brand-green-primary border-solid rounded-2xl py-3 text-center hover:bg-brand-green-primary hover:text-custom-color38">
          View Portfolio
        </button>
      </div>
    </div>
  );
};

export default CardHover;

import React from 'react';
import { MdArrowBackIosNew } from 'react-icons/md';
import BadgeModal from '../../../../components/Modals/BadgesModal';
import Image from 'next/image';
import Link from 'next/link';

interface BadgesProps {
  scorePercentage: number;
  badgelabel: string | string[] | undefined;
  setIsdownloadOpen: (value: boolean) => void;
  isdownloadOpen: boolean;
  onClose: () => void;
}

const Badges: React.FC<BadgesProps> = ({ scorePercentage, badgelabel, setIsdownloadOpen, isdownloadOpen, onClose }) => {
  return (
    <section className="bg-[#F2F4F5]">
      <div className="hidden lg:flex pl-6  sm:pl-[96px] pt-8 md:flex justify-start align-middle text-2xl cursor-pointer">
        <Link href="/assessments/dashboard">
          <MdArrowBackIosNew />
        </Link>
      </div>

      <div className="h-full w-full flex flex-col items-center justify-center  ">
        <div className="flex items-center rounded-t-3xl justify-center flex-col w-full p-6  border-0 h-auto md:px-10 lg:w-7/12">
          <div className="flex h-52 sm:h-52 justify-center items-center bg-[#F1AE67] w-full rounded-t-3xl">
            <Image
              src="/assets/images/badges/emoji-happy.png"
              width={200}
              height={200}
              alt="smiling emoji"
              className="w-24 h-24 sm:h-40 sm:w-40"
            />
          </div>
          <div className="h-auto w-full bg-[#FFFFFF] flex flex-col justify-center align-middle text-center px-2 rounded-b-3xl ">
            <h4 className="font-black py-6 text-[#2E3130] text-xs font-manropeEB md:text-xl md:px-12">
              Congratulations! You&apos;ve performed extremely well in this assessment Below is your score.
            </h4>
            <div>
              <button className="text-[#009254] font-bold border-[#dfe3e6] border-2 w-20 h-10 sm:w-28 sm:h-12 bg-[#F2F4F5] font-manropeEB rounded-2xl text-xl sm:text-2xl text-bold">
                {scorePercentage}%
              </button>
            </div>
            <p className=" mt-4 mb-8 text-xs sm:text-xl font-manropeL">You&apos;ve earned yourself an {badgelabel} badge!</p>
            <div className="flex justify-center align-middle h-30 w-full">
              <Image
                src={`/assets/images/badges/${badgelabel}.png`}
                width={200}
                height={200}
                alt="badge"
                className="h-44 w-44 sm:h-52 sm:w-52 border-transparent rounded-full"
              />
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 font-manropeL relative pb-4 md:gap-4 md:pb-10">
              <div className="w-8/12 flex flex-col gap-6 pt-6 md:flex-row ">
                <button
                  className="bg-[#009254] border-[#009254] border h-12 w-full sm:mb-0 mb-4 rounded-2xl text-[#FFFFFF] cursor-pointer "
                  onClick={() => setIsdownloadOpen(true)}
                >
                  Download
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-end w-full">
            <Link href={'/assessments/dashboard'}>
              <p className=" underline mt-[30px] flex right-6 pr-4 sm:pr-10 ">Retake Test</p>
            </Link>
          </div>
          <BadgeModal isOpen={isdownloadOpen} onClose={onClose} badgeType={badgelabel} score={scorePercentage} />
        </div>
      </div>
    </section>
  );
};

export default Badges;

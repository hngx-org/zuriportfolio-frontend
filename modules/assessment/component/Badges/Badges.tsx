import React from 'react';
import { useRouter } from 'next/router';
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
  assessmentId: number;
}

const Badges: React.FC<BadgesProps> = ({
  scorePercentage,
  badgelabel,
  setIsdownloadOpen,
  isdownloadOpen,
  onClose,
  assessmentId,
}) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <section className="bg-[#F2F4F5]">
      <div className="hidden lg:flex pl-6  sm:pl-12 pt-8 sm:flex justify-start align-middle text-2xl cursor-pointer">
        <div onClick={handleBack}>
          <MdArrowBackIosNew />
        </div>
      </div>

      <div className="h-full w-full flex flex-col items-center justify-center  ">
        <div className="flex items-center rounded-t-3xl justify-center flex-col w-full p-6  border-0 h-auto md:px-10 lg:w-7/12">
          <div className="flex h-52 sm:h-52 justify-center items-center bg-[#F1AE67] w-full rounded-t-3xl">
            {scorePercentage <= 20 && (
              <Image
                src="/emoji-sad (1).png"
                width={200}
                height={200}
                alt="sad emoji"
                className="w-40 h-40 sm:h-40 sm:w-40"
              />
            )}
            {scorePercentage > 20 && (
              <Image
                src="/emoji-happy (1).png"
                width={200}
                height={200}
                alt="smiling emoji"
                className="w-40 h-40 sm:h-40 sm:w-40"
              />
            )}
          </div>
          <div className="h-auto w-full bg-[#FFFFFF] flex flex-col justify-center align-middle text-center px-2 rounded-b-3xl ">
            <h4 className="font-black py-6 text-[#2E3130] text-xs font-manropeEB md:text-xl md:px-12">
              {scorePercentage <= 20 &&
                "Unfortunately You've not reached the pass mark to earn a badge, Below is your score"}
              {scorePercentage > 20 &&
                " Congratulations! You've performed extremely well in this assessment Below is your score."}
            </h4>
            <div>
              <button className="text-[#009254] font-bold border-[#dfe3e6] border-2 w-20 h-10 sm:w-28 sm:h-12 bg-[#F2F4F5] font-manropeEB rounded-2xl text-xl sm:text-2xl text-bold">
                {scorePercentage}%
              </button>
            </div>
            <p className=" mt-4 mb-8 text-xs sm:text-xl font-manropeL">
              {scorePercentage <= 20 && 'Try again and unlock your badge'}
              {scorePercentage > 20 && `You've earned yourself an ${badgelabel} badge!`}
            </p>
            <div className="flex justify-center align-middle h-30 w-full relative">
              {scorePercentage <= 20 && (
                <Image
                  src="/FrameLock.png"
                  alt="lock symbol"
                  width={200}
                  height={200}
                  className="absolute flex items-center justify-center h-44 w-44 sm:h-52 sm:w-52 border-transparent rounded-full"
                />
              )}
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
                {scorePercentage > 20 && (
                  <button
                    className="bg-[#009254] border-[#009254] border h-12 w-full sm:mb-0 mb-4 rounded-2xl text-[#FFFFFF] cursor-pointer "
                    onClick={() => setIsdownloadOpen(true)}
                  >
                    Download
                  </button>
                )}
                {scorePercentage <= 20 && (
                  <button className="bg-[#009254] border-[#009254] border h-12 w-full sm:mb-0 mb-4 rounded-2xl text-[#FFFFFF] cursor-pointer ">
                    <Link href={`/assessments/take-test/intro?data=${assessmentId}`}>Retake Test</Link>
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-end w-full">
            {scorePercentage > 20 && (
              <Link href={`/assessments/take-test/intro?data=${assessmentId}`}>
                <p className=" underline mt-[30px] flex right-6 pr-4 sm:pr-10 ">Retake Test</p>
              </Link>
            )}
          </div>
          <BadgeModal isOpen={isdownloadOpen} onClose={onClose} badgeType={badgelabel} score={scorePercentage} />
        </div>
      </div>
    </section>
  );
};

export default Badges;

import React from 'react';
import Image from 'next/image';
import happyemoji from '../../../public/assets/images/emoji-happy.png';
import share from '../../../public/assets/images/share.svg';
import Button from '@ui/Button';
import { StaticImageData } from 'next/image';
import { useState } from 'react';
import FeedbackModal from './FeedbackModal';

type Props = {
  score: string;
  badge: StaticImageData;
  retake: string;
  badgeName: string;
  handeModal?: () => void;
  isOpen?: boolean;
};

const Feedcard = ({ score, badge, badgeName }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  function handeModal() {
    setIsOpen(true);
  }
  return (
    <>
      <div className=" bg-white-300 flex justify-center">
        <div className=" flex items-center rounded-t-2xl flex-col bg-white-100 mt-[60px] w-full mx-4 sm:mx-10 lg:w-[916px] rounded-2xl overflow-hidden">
          <div className="w-full h-[231px] sm:h-[332px] bg-[#F1AE67] flex items-center justify-center">
            <div className="hidden sm:block">
              <Image src={happyemoji} alt="happy" width={213} height={213} />
            </div>
            <div className="sm:hidden">
              <Image src={happyemoji} alt="happy" width={123} height={123} />
            </div>
          </div>
          <div>
            <p className=" text-center mt-5 sm:mt-[36px] sm:mb-5 text-[#2E3130] font-manropeB text-sm sm:text-2xl lg:text-[28px] px-[24.5px] sm:px-[29px] lg:px-0">
              Congratulations! You&apos;ve performed extremely well in this <br className="hidden lg:block" />{' '}
              assessment. Below is your score.
            </p>
          </div>
          <span className=" text-brand-green-primary py-[13px] px-[18px] rounded-2xl text-2xl lg:text-[32px] text-center font-manropeB mt-[10px] bg-white-300 block w-[130px] sm:w-[143px]">
            {score}%
          </span>
          <div className="mt-[30px] sm:mt-[60px] flex justify-center items-center flex-col">
            <p className="text-[#2E3130] font-manropeL sm:text-[22px] mb-[12px] text-[12px]">
              You&apos;ve earned yourself an {badgeName}!
            </p>
            <Image src={badge} alt="badge" width={198} height={215} className="mb-[17px]" />
          </div>
          <div className=" flex flex-col items-end sm:items-center sm:flex-row gap-5 mt-[16px] mb-[16.5px] sm:mb-[36.5px] lg:mb-[39px]">
            <Button
              intent={'primary'}
              size={'md'}
              className="px-[18px] w-[290px] h-[47px] text-sm"
              spinnerColor="#000"
              onClick={handeModal}
            >
              Download
            </Button>
            <Button
              intent={'secondary'}
              size={'md'}
              className="px-[18px] w-[290px] h-[47px] text-sm"
              spinnerColor="#000"
            >
              View
            </Button>
            <Image src={share} alt="share" width={24.6} height={27} style={{ width: 'auto', height: 'auto' }} />
          </div>
        </div>
      </div>
      <p className=" underline mt-[30px] flex justify-end mr-[auto] lg:mr-[15%] pr-4 sm:pr-10  pb-[60px]">
        Retake Test
      </p>
      <FeedbackModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        score={score}
        badge={badge}
        badgeName={badgeName}
      />
    </>
  );
};

export default Feedcard;

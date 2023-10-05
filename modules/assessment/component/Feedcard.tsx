import React from 'react';
import Image from 'next/image';
import happyemoji from '../../../public/assets/images/emoji-happy.png';
import share from '../../../public/assets/images/share.svg';
import Button from '@ui/Button';
import { StaticImageData } from 'next/image';

type Props = {
  score: string | null;
  badge: StaticImageData;
  retake: string;
  badgeName: string;
};
const Feedcard = ({ score, badge, badgeName }: Props) => {
  return (
    <>
      <div className=" bg-white-300 flex justify-center rounded-md">
        <div className=" flex items-center rounded-t-2xl flex-col bg-white-100 mt-[60px] w-[916px] h-[944px]">
          <div className=" w-[916px] h-[332px] bg-[#F1AE67] flex items-center justify-center">
            <Image src={happyemoji} alt="happy" className=" " />
          </div>
          <div>
            <p className=" text-center mt-[36px] text-[#2E3130] font-manropeB text-[28px]">
              Congratulations! You&apos;ve performed extremely well in this <br /> assessment. Below is your score.
            </p>
          </div>
          <span className=" text-brand-green-primary py-[13px] px-[18px] rounded-2xl text-[32px] font-manropeB mt-[10px] bg-white-300">
            {score}
          </span>
          <div className=" mt-[60px] flex justify-center items-center flex-col">
            <p className="text-[#2E3130] font-manropeL text-[22px] mb-[12px]">
              You&apos;ve earned yourself an {badgeName}!
            </p>
            <Image src={badge} alt="badge" width={198} height={215} className=" mb-[17px]" />
          </div>
          <div className=" flex gap-5 mt-[16px]">
            <Button intent={'primary'} size={'md'} className="px-[18px] w-[290px] h-[47px]" spinnerColor="#000">
              Download
            </Button>
            <Button intent={'secondary'} size={'md'} className="px-[18px] w-[290px] h-[47px]" spinnerColor="#000">
              View
            </Button>
            <Image src={share} alt="share" width={24.6} height={27} />
          </div>
        </div>
      </div>
      <p className=" underline mt-[30px] flex justify-end mr-[300px] pb-[60px]">Retake Test</p>
    </>
  );
};

export default Feedcard;

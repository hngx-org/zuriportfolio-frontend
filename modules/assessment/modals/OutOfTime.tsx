import React from 'react';
import Image from 'next/image';
import Modal from '@ui/Modal';

interface OutOfTimeProps {
  onClose: () => void;
  onRetake: () => void;
}

const OutOfTime: React.FC<OutOfTimeProps> = ({ onClose, onRetake }) => {
  return (
    <div className="fixed flex items-center justify-center bg-dark-600 w-full h-screen z-[9999]">
      <div className="w-fit m-auto items-center font-manropeB justify-center bg-transparent rounded-[16px] p-4 gap-3 flex flex-col">
        <div className=" flex bg-brand-green-primary w-full justify-between rounded-[16px] p-4">
          <p className="text-brand-red-primary font-[700] text-[24px]">00:00</p>
          <Image src="/assets/timericon.svg" alt="icon" width={30} height={30} />
        </div>

        <div className=" items-center font-manropeB justify-center bg-white-100 border border-[#DFE3E6] rounded-[16px] p-8 gap-8 flex flex-col">
          <div className="flex-col flex m-auto justify-center items-center">
            <Image src="/assets/timeralert.svg" alt="icon" width={80} height={100} />

            <p className="text-[#006F37] font-[600] text-[32px]">You’ve run out of time!</p>
          </div>

          <div className="flex gap-4 sm:flex-row flex-col">
            <button
              onClick={onClose}
              className="bg-transparent text-brand-green-hover hover:bg-brand-green-hover hover:text-white-100 rounded-[16px] px-8 py-2"
            >
              {' '}
              Go to my Dashboard
            </button>
            <button
              onClick={onRetake}
              className="bg-brand-green-primary text-[1.1em] hover:bg-brand-green-hover rounded-[16px] text-white-100 px-8 py-2"
            >
              {' '}
              Retake assessment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutOfTime;

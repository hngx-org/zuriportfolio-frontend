import React from 'react';
import Image from 'next/image';

interface SubmissionSuccessProps {
  onClose: () => void;
}

const SubmissionSuccess: React.FC<SubmissionSuccessProps> = ({ onClose }) => {
  return (
    <div className='w-[50%] m-auto items-center font-manropeB justify-center px-16 bg-white-100 rounded-[16px] py-24 p-4 gap-3 flex flex-col'>
      <div className="items-center justify-center m-auto align-middle  flex flex-col gap-8">

      <div className="top flex items-center justify-center m-auto " >
        <p className="text-[2em] font-[700]">Bravo!</p>
        <p className="font-[700] text-[2em]">&#129303;</p>
      </div>
      <p className=" justify-center w-[70%] align-middle items-center text-center font-[600] text-[1.2em] ">Your answers have been successfully 
submitted and graded.</p>
      <button onClick={onClose} className='bg-brand-green-primary text-[1.1em] m-auto gap-4 px-2 items-center justify-center flex hover:bg-brand-green-hover focus:bg-brand-green-focused active:bg-brand-green-pressed text-white-100 py-3 rounded-[16px]'>
        Check my score
        <Image src='/assets/arrowright.svg' alt='icon' width={20} height={20} />
      </button>
      </div>
    </div>
  );
}

export default SubmissionSuccess;

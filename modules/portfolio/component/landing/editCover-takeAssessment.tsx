import React from 'react';

type Props = {
  handleUploadCover?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  Link: any;
};

const EditCover = ({ handleUploadCover, Link }: Props) => {
  return (
    <>
      <label
        htmlFor="coverUpload"
        className="bg-white-100 rounded-full p-2 cursor-pointer w-[35px] h-[35px] md:w-[40px] md:h-[40px] hover:scale-105 transition-all duration-200"
      >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M13.2603 3.59924L5.05034 12.2892C4.74034 12.6192 4.44034 13.2692 4.38034 13.7192L4.01034 16.9592C3.88034 18.1292 4.72034 18.9292 5.88034 18.7292L9.10034 18.1792C9.55034 18.0992 10.1803 17.7692 10.4903 17.4292L18.7003 8.73924C20.1203 7.23924 20.7603 5.52924 18.5503 3.43924C16.3503 1.36924 14.6803 2.09924 13.2603 3.59924Z"
            stroke="#009254"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11.8896 5.05078C12.3196 7.81078 14.5596 9.92078 17.3396 10.2008"
            stroke="#009254"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3 22H21"
            stroke="#009254"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </label>
      <input
        id="coverUpload"
        type="file"
        className="hidden"
        accept="image/png, image/jpeg"
        onChange={handleUploadCover}
      />
      <Link
        href={'/assessments/dashboard'}
        className="rounded-lg bg-brand-green-primary text-white-100 focus:shadow-brand-green-shd active:bg-brand-green-shd disabled:bg-brand-disabled py-1 px-2 md:text-base text-sm md:px-4 md:py-3 flex items-center justify-center gap-5 w-fit h-[48px] font-manropeB bg-opacity-80 cursor-pointer shadow-[0_0px_6px_1px_rgba(0,0,0,0.14)] hover:scale-[1.01] transition-all duration-200 hover:bg-green-600"
      >
        Take Assesment
      </Link>
    </>
  );
};

export default EditCover;

import Image from 'next/image';
import Button from '@ui/Button';
import { useContext } from 'react';
import Portfolio from '../../../../context/PortfolioLandingContext';
import Profile from './avatars';

const Cover = () => {
  const { handleUploadCover, profileUpdate, userData } = useContext(Portfolio);
  const { hasData, hasDataFromBE, coverImage, avatarImage } = userData;

  return (
    <div className="relative h-full flex flex-col items-end justify-between py-5 md:py-10 -mt-[40px] lg:-mt-[35px]">
      {hasData ? (
        hasDataFromBE ? (
          <Image
            src={avatarImage}
            quality={100}
            width={0}
            height={0}
            alt="cover"
            className="absolute w-[120px] md:w-[170px] object-fill object-center aspect-square -bottom-5 md:-bottom-10 left-0 rounded-full bg-gray-400 bg-opacity-60 border-2 border-brand-green-primary"
          />
        ) : (
          <Profile profileUpdate={profileUpdate} />
        )
      ) : (
        <Profile profileUpdate={profileUpdate} />
      )}
      <label htmlFor="coverUpload" className="bg-white-100 rounded-full p-2 cursor-pointer">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        onChange={(e) => handleUploadCover(e)}
        className="hidden"
        accept="image/png, image/jpeg"
      />
      {hasData && <Button className="rounded-lg">Take Assesment</Button>}
    </div>
  );
};

export default Cover;

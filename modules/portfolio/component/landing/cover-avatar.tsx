import Image from 'next/image';
import { useContext } from 'react';
import Portfolio from '../../../../context/PortfolioLandingContext';
import Profile from './avatars';
import Link from 'next/link';
import EditCover from './editCover-takeAssessment';

type Props = {
  isLoggedIn?: boolean;
  userData: any;
};

const Cover = ({ isLoggedIn, userData }: Props) => {
  const { handleUploadCover, profileUpdate } = useContext(Portfolio);
  const { avatarImage } = userData;

  const avatar = avatarImage ? (
    <Image
      unoptimized
      src={avatarImage}
      quality={100}
      width={0}
      height={0}
      alt="profile_photo"
      className="w-full aspect-square rounded-full bg-gray-100 bg-opacity-10"
    />
  ) : (
    <>
      <Profile isLoggedIn={isLoggedIn} profileUpdate={profileUpdate} />
    </>
  );

  return (
    <div
      className={`absolute bottom-28 left-3 w-[140px] sm:w-[180px] md:w-[200px] aspect-square object-cover object-center rounded-full bg-gray-100 bg-opacity-25 border-green-400 border-[2px]`}
    >
      {avatar}
    </div>
  );
};

export default Cover;

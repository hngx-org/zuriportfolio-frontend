import Image from 'next/image';
import { useContext } from 'react';
import Portfolio from '../../../../context/PortfolioLandingContext';
import Profile from './avatars';
import Link from 'next/link';
import EditCover from './editCover-takeAssessment';

type Props = {
  isLoggedIn: boolean;
  userData: any;
};

const Cover = ({ isLoggedIn, userData }: Props) => {
  const { handleUploadCover, profileUpdate } = useContext(Portfolio);
  const { avatarImage, tracks } = userData;

  const link = ``;

  const avatar = avatarImage ? (
    <Image
      unoptimized
      src={avatarImage}
      quality={100}
      width={0}
      height={0}
      alt="profile_photo"
      className="absolute w-[120px] md:w-[170px] object-cover object-center aspect-square -bottom-5 md:-bottom-10 left-0 rounded-full bg-gray-400 bg-opacity-60 border-2 border-brand-green-primary"
    />
  ) : (
    <Profile isLoggedIn={isLoggedIn} profileUpdate={profileUpdate} />
  );

  return (
    <div className="relative h-full flex flex-col items-end justify-between py-5 md:py-10 -mt-[20px] lg:-mt-[35px]">
      {avatar}
      {/* {children} */}
      {isLoggedIn ? <EditCover Link={Link} handleUploadCover={handleUploadCover} link={link} /> : ''}
    </div>
  );
};

export default Cover;

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
  const { avatarImage } = userData;

  const avatar = avatarImage ? (
    <Image
      unoptimized
      src={avatarImage}
      quality={100}
      width={0}
      height={0}
      alt="profile_photo"
      className="absolute w-[120px] md:w-[180px] object-cover object-center aspect-square -bottom-5 md:-bottom-[110px] left-[0px] rounded-full bg-gray-400 bg-opacity-60 border-2 border-brand-green-primary border-opacity-40"
    />
  ) : (
    <Profile isLoggedIn={isLoggedIn} profileUpdate={profileUpdate} />
  );

  return (
    <div className="absolute h-[200px] md:h-[300px] lg:h-[350px] w-full flex flex-col items-end justify-between p-5 md:p-10 -mt-[20px] lg:-mt-[35px] z-0 top-0 left-0">
      {avatar}
      {isLoggedIn ? <EditCover Link={Link} handleUploadCover={handleUploadCover} /> : ''}
    </div>
  );
};

export default Cover;

'use-client';
import Image from 'next/image';
import React, { useContext, useEffect } from 'react';
import LandinEmptyState from './landingpage-empty';
import LandingPageFilled from './landingpage-filled';
import Cover from './cover-avatar';
import Home from '../modals/add-section';
import Portfolio from '../../../../context/PortfolioLandingContext';
import Profile, { CoverDiv } from './avatars';
import Loader from './Loader';
import EditProfile from '../modals/edit-profile';
import ViewTemplate from '../modals/view-template';
import { Edit2 } from 'iconsax-react';
import Link from 'next/link';
import EditCover from './editCover-takeAssessment';
import SkeletonLoader from './SkeletonLoader';

const Landing = () => {
  const {
    profileUpdate,
    showProfileUpdate,
    showBuildPortfolio,
    showViewtemplates,
    userData,
    getUserSections,
    userSections,
    setHasPortfolio,
    hasPortfolio,
    handleUploadCover,
  } = useContext(Portfolio);

  const { firstName, lastName, tracks, city, country, coverImage } = userData;

  useEffect(() => {
    if (!getUserSections.isLoading && getUserSections.data) {
      const hasMatchingSection = userSections.some((section) => {
        return (section?.data && section?.data.length > 0) || section?.data?.bio;
      });
      setHasPortfolio(hasMatchingSection);
    }
  }, [getUserSections.data, getUserSections.isLoading, setHasPortfolio, userSections]);

  const headerMargin = `w-full h-[200px] sm:h-[250px] md:h-[300px] object-center object-cover`;

  const cover = coverImage ? (
    <Image src={coverImage} priority unoptimized width={0} height={0} alt="" className={`${headerMargin}`} />
  ) : (
    <CoverDiv className={`bg-[#F0F1F0] opacity-80 ${headerMargin}`} />
  );
  return (
    <>
      <div>
        {showProfileUpdate && <EditProfile />}
        {showBuildPortfolio && <Home />}
        {/* {showViewtemplates && <ViewTemplate />} */}
      </div>
      <div className="mx-auto w-[min(90vw,1240px)] relative font-manropeB pb-20 min-h-[50vh]">
        {getUserSections.isLoading ? (
          <SkeletonLoader />
        ) : !getUserSections.isSuccess ? (
          <div className="flex justify-center items-center min-h-[50vh]">
            <p className="text-red-200 text-2xl font-semibold text-center">
              Something went wrong, please try again later
            </p>
          </div>
        ) : (
          <>
            <div className="relative w-full flex-col justify-center items-center shadow-[0_0px_6px_1px_rgba(0,0,0,0.14)] rounded-b-lg -mt-5">
              {cover}
              <Cover userData={userData} />
              <div className="absolute top-0 right-5 md:right-10 text-white-100 flex flex-col justify-between items-end h-[200px] sm:h-[250px] md:h-[300px] py-5">
                <EditCover Link={Link} handleUploadCover={handleUploadCover} />
              </div>
              <div className="flex justify-between items-baseline px-5 md:px-10 pb-5 pt-16">
                <div className="flex justify-between items-center ">
                  <div>
                    <h1 className="font-semibold text-lg md:text-[23px] text-gray-700">
                      {firstName === 'undefined' || !firstName ? '' : firstName}{' '}
                      {lastName === 'undefined' || !lastName ? '' : lastName}
                    </h1>
                    <div className="flex items-center space-x-2">
                      {<p className="flex flex-col text-gray-500 font-semibold text-[15px]">{tracks?.track}</p>}
                    </div>
                    <p className="text-gray-500 text-[14px] md:text-base font-semibold">
                      {city ? city : ``}
                      {`${city && country ? ',' : ''}`} {country ? country : ''}
                    </p>
                  </div>
                </div>
                <span
                  onClick={profileUpdate}
                  className="flex gap-2 text-sm items-center justify-center text-brand-green-primary p-2 cursor-pointer rounded-lg shadow-[0_0px_6px_1px_rgba(0,0,0,0.14)] scale-110 hover:scale-[1.15] transition-all duration-200"
                >
                  <Edit2 size="20" color="#009254" variant="Outline" />
                  Edit
                </span>
              </div>
            </div>
            {hasPortfolio ? (
              <div className="mt-10">
                <LandingPageFilled />
              </div>
            ) : (
              <div>
                <LandinEmptyState />
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};
export default Landing;

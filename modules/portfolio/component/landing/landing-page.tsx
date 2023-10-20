'use-client';
import Image from 'next/image';
import React, { useContext, useEffect } from 'react';
import LandinEmptyState from './landingpage-empty';
import LandingPageFilled from './landingpage-filled';
import Cover from './cover-avatar';
import Home from '../modals/add-section';
import Portfolio from '../../../../context/PortfolioLandingContext';
import { CoverDiv } from './avatars';
import Loader from './Loader';
import EditProfile from '../modals/edit-profile';
import ViewTemplate from '../modals/view-template';
import { Edit2 } from 'iconsax-react';

const Landing = () => {
  const {
    profileUpdate,
    showProfileUpdate,
    showBuildPortfolio,
    showViewtemplates,
    userData,
    getUserInfo,
    getUserSections,
    userSections,
    setHasPortfolio,
    hasPortfolio,
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

  const headerMargin =
    'mt-[81px] lg:mt-[96px] absolute top-0 left-0 -z-50 w-screen h-[200px] md:h-[300px] lg:h-[350px]  object-cover';

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
      <div className="mx-auto w-[min(90vw,1200px)] font-manropeB pb-20 min-h-[50vh]">
        {getUserInfo.isLoading || getUserSections.isLoading ? (
          <Loader />
        ) : !getUserInfo.isSuccess || !getUserSections.isSuccess ? (
          <div className="flex justify-center items-center min-h-[50vh]">
            <p className="text-red-200 text-2xl font-semibold text-center">
              Something went wrong, please try again later
            </p>
          </div>
        ) : (
          <>
            <div className=" h-[200px] md:h-[300px] lg:h-[350px] ">
              {cover}
              <Cover userData={userData} isLoggedIn={true} />
            </div>
            <div className="flex justify-between items-center pt-8 md:pt-14">
              <div>
                <h1 className="font-semibold text-lg md:text-[25px] text-gray-700">
                  {firstName === 'undefined' || !firstName ? '' : firstName}{' '}
                  {lastName === 'undefined' || !lastName ? '' : lastName}
                </h1>
                {tracks && (
                  <div className="flex items-center space-x-2">
                    {<p className="text-gray-500 font-semibold text-[15px] md:text-[20px]">{tracks?.track}</p>}
                  </div>
                )}
                <p className="text-gray-500 text-[14px] md:text-base font-semibold">
                  {city ? city : ``}
                  {`${city && country ? ',' : ''}`} {country ? country : ''}
                </p>
              </div>
              <span
                onClick={profileUpdate}
                className="flex gap-2 text-sm items-center justify-center text-brand-green-primary p-2 cursor-pointer rounded-lg shadow-[0_0px_6px_1px_rgba(0,0,0,0.14)] scale-110 hover:scale-[1.15] transition-all duration-200"
              >
                <Edit2 size="20" color="#009254" variant="Outline" />
                Edit
              </span>
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

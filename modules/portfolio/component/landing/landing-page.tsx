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
    'mt-[81px] lg:mt-[96px] h-[200px] md:h-[250px] lg:h-[300px] absolute top-0 left-0 -z-50 w-screen object-cover';

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
        {showViewtemplates && <ViewTemplate />}
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
            <div className="h-[200px] md:h-[250px] lg:h-[300px]">
              {cover}
              <Cover userData={userData} isLoggedIn={true} />
            </div>
            <div className="flex justify-between items-center pt-8 md:pt-14">
              <div>
                <h1 className="font-semibold text-lg md:text-2xl text-gray-600">
                  {firstName === 'undefined' || !firstName ? '' : firstName}{' '}
                  {lastName === 'undefined' || !lastName ? '' : lastName}
                </h1>
                {tracks && (
                  <div className="flex items-center space-x-2">
                    {<p className="text-gray-500 font-semibold text-[14px] md:text-[14px]">{tracks?.track}</p>}
                  </div>
                )}
                <p className="text-gray-500 font-semibold text-[14px] md:text-[14px]">
                  {city ? city : ``}
                  {`${city && country ? ',' : ''}`} {country ? country : ''}
                </p>
              </div>
              <p onClick={profileUpdate} className="text-blue-100 font-semibold cursor-pointer">
                Edit
              </p>
            </div>
            {hasPortfolio ? (
              <div className="mt-10 md:mt-20">
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

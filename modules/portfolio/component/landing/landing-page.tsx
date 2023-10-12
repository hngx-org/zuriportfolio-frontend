import Image from 'next/image';
import React, { useContext } from 'react';
import Modal from '@ui/Modal';
import LandinEmptyState from './landingpage-empty';
import LandingPageFilled from './landingpage-filled';
import Cover from './cover-avatar';
import Home from '../modals/add-section';
import Portfolio from '../../../../context/PortfolioLandingContext';
import { CoverDiv } from './avatars';
import Loader from './Loader';
import { Briefcase, CloseSquare } from 'iconsax-react';
import EditProfile from '../modals/edit-profile';
import ViewTemplate from '../modals/view-template';

const Landing = () => {
  const {
    hasData,
    profileUpdate,
    isOpen,
    onClose,
    modal,
    showProfileUpdate,
    showBuildPortfolio,
    showViewtemplates,
    userData,
    isLoading,
    error,
  } = useContext(Portfolio);

  const { firstName, lastName, tracks, city, country, hasDataFromBE, coverImage } = userData;

  const headerMargin =
    'mt-[81px] lg:mt-[96px] h-[200px] md:h-[250px] lg:h-[300px] absolute top-0 left-0 -z-50 w-screen';

  const cover = coverImage ? (
    <Image src={coverImage} unoptimized width={0} height={0} alt="" className={`${headerMargin}`} />
  ) : (
    <CoverDiv className={`bg-[#F0F1F0] opacity-80 ${headerMargin}`} />
  );
  return (
    <>
      <div onClick={modal}>
        {showProfileUpdate && (
          <Modal isOpen={isOpen} closeModal={modal}>
            <EditProfile />
          </Modal>
        )}
        {showBuildPortfolio && <Home />}
        {showViewtemplates && <ViewTemplate />}
      </div>
      <div className="mx-auto w-[min(90vw,1200px)] font-manropeB pb-20 min-h-[50vh]">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="h-[200px] md:h-[250px] lg:h-[300px]">
              {cover}
              <Cover />
            </div>
            <div className="flex justify-between items-center pt-8 md:pt-14">
              <div>
                <h1 className="font-semibold text-lg md:text-2xl text-gray-600">
                  {firstName ? firstName : ''} {lastName ? lastName : ''}
                </h1>
                {tracks && tracks.length > 0 && (
                  <div className="flex items-center space-x-2">
                    {tracks.map((track: any, index: number) => (
                      <p key={index} className="text-gray-500 font-semibold text-[14px] md:text-[14px]">
                        {track.track}
                        {index !== tracks.length - 1 && ','}
                      </p>
                    ))}
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
            {!hasData ? (
              <div>
                <LandinEmptyState />
              </div>
            ) : (
              <div className="mt-10 md:mt-20">
                <LandingPageFilled />
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Landing;

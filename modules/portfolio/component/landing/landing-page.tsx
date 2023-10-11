import Image from 'next/image';
import React, { useContext } from 'react';
import Modal from '@ui/Modal';
import LandinEmptyState from './landingpage-empty';
import LandingPageFilled from './landingpage-filled';
import Cover from './cover-avatar';
import Home from '../modals/add-section';
import Portfolio from '../../../../context/PortfolioLandingContext';

const Landing = () => {
  const {
    coverImage,
    hasData,
    profileUpdate,
    isOpen,
    modal,
    showProfileUpdate,
    showBuildPortfolio,
    showViewtemplates,
  } = useContext(Portfolio);

  // const uploadCover = async (coverImage: string | Blob) => {
  //   const formData = new FormData();
  //   formData.append('images', coverImage as string | Blob);
  //   const response = await fetch('https://hng6-r5y3.onrender.com/api/cover/photos', {
  //     method: 'POST',
  //     body: formData,
  //   });
  //   const data = await response.json();
  //   console.log(data);
  // };

  const headerMargin =
    'mt-[89px] lg:mt-[96px] h-[200px] md:h-[250px] lg:h-[300px] absolute top-0 left-0 -z-50 w-screen';

  return (
    <>
      <div onClick={modal}>
        {showProfileUpdate && (
          <Modal isOpen={isOpen} closeModal={modal}>
            <p>Awaiting update profile modal</p>
          </Modal>
        )}
        {showBuildPortfolio && <Home />}
        {showViewtemplates && (
          <Modal isOpen={isOpen} closeModal={modal}>
            <p>Awaiting view template modal</p>
          </Modal>
        )}
      </div>
      <div className="mx-auto w-[min(90vw,1200px)] font-manropeB pb-40">
        <div className="h-[200px] md:h-[250px] lg:h-[300px]">
          {hasData ? (
            <Image src={coverImage} width={0} height={0} alt="cover" className={`${headerMargin}`} />
          ) : (
            <div className={`bg-[#F0F1F0] opacity-80 ${headerMargin}`}> {/* F0F1F0 */}</div>
          )}

          <Cover />
        </div>
        <div className="flex justify-between items-center pt-8 md:pt-14">
          <div>
            <h1 className="font-semibold text-2xl text-gray-600">Your name</h1>
            <h2 className="font-semibold text-gray-5 00">
              Track (<span>Level</span>)
            </h2>
            <p className="text-gray-500 font-semibold text-[14px]">Location</p>
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
          <div className="my-32">
            <LandingPageFilled />
          </div>
        )}
      </div>
    </>
  );
};

export default Landing;

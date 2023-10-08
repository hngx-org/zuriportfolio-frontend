'use client';
import Image from 'next/image';
import cover from '../../../public/assets/images/portfolioLanding/cover.png';
import profile from '../../../public/assets/images/portfolioLanding/profile.png';
import React, { useState } from 'react';
import Button from '@ui/Button';
import Modal from '@ui/Modal';

const Landing = () => {
  const [coverImage, setCoverImage] = useState<File | any>(cover);
  const [avatarImage, setAvatarImage] = useState<File | any>(profile);
  const [hasData, setHasData] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showProfileUpdate, setShowProfileUpdate] = useState<boolean>(false);
  const [showBuildPortfolio, setShowBuildPortfolio] = useState<boolean>(false);
  const [showViewtemplates, setShowViewtemplates] = useState<boolean>(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      if (e.target.id === 'coverUpload') {
        setCoverImage(URL.createObjectURL(file));
        setHasData(true);
      }
    }
  };

  const profileUpdate = () => {
    setShowModal(true);
    setShowProfileUpdate((p) => !p);
  };

  const buildPortfolio = () => {
    setShowModal(true);
    setShowBuildPortfolio((p) => !p);
  };

  const viewPortfolio = () => {
    setShowModal(true);
    setShowViewtemplates((p) => !p);
  };

  const modal = () => {
    setShowModal(false);
    setShowProfileUpdate(false);
    setShowBuildPortfolio(false);
    setShowViewtemplates(false);
  };

  return (
    <>
      {showModal && (
        <div onClick={modal}>
          {showProfileUpdate && (
            <Modal isOpen={showModal} closeModal={modal}>
              <p>Awaiting update profile modal</p>
            </Modal>
          )}
          {showBuildPortfolio && (
            <Modal isOpen={showModal} closeModal={modal}>
              <p>Awaiting build portfolio modal</p>
            </Modal>
          )}
          {showViewtemplates && (
            <Modal isOpen={showModal} closeModal={modal}>
              <p>Awaiting view template modal</p>
            </Modal>
          )}
        </div>
      )}
      <div className="mx-auto w-[min(90vw,1200px)]">
        <div className="h-[200px] md:h-[250px] lg:h-[300px]">
          {hasData ? (
            <Image
              src={coverImage}
              width={0}
              height={0}
              alt="cover"
              className="absolute h-[200px] md:h-[250px] lg:h-[300px] w-screen top-0 left-0 -z-50 mt-[81px] lg:mt-[113px]"
            />
          ) : (
            <div className="absolute h-[200px] md:h-[250px] lg:h-[300px] w-full top-0 left-0 -z-50 bg-[#F0F1F0] opacity-80 mt-[81px] lg:mt-[113px]">
              {' '}
            </div>
          )}

          <div className="relative h-full flex flex-col items-end justify-between py-5 md:py-10">
            {hasData ? (
              <Image
                src={avatarImage}
                quality={100}
                width={0}
                height={0}
                alt="cover"
                className="absolute w-[120px] md:w-[170px] object-fill object-center aspect-square -bottom-5 md:-bottom-10 left-0 rounded-full bg-gray-400 bg-opacity-60 border-2 border-brand-green-primary"
              />
            ) : (
              <div
                onClick={profileUpdate}
                className="grid place-content-center absolute w-[120px] md:w-[170px] object-fill object-center aspect-square -bottom-5 md:-bottom-10 left-0 rounded-full bg-emerald-50"
              >
                <Image
                  src="/assets/images/portfolioLanding/profilePlaceholder.svg"
                  width={0}
                  height={0}
                  alt="cover"
                  className="w-[100%] aspect-square rounded-full "
                />
                <label className="absolute bottom-2 -right-2 w-[35%] bg-brand-green-primary aspect-square rounded-full grid place-content-center cursor-pointer">
                  {' '}
                  <Image
                    src="/assets/images/portfolioLanding/add.svg"
                    width={0}
                    height={0}
                    alt="cover"
                    className="w-[25px] md:w-[30px] object-fill object-center aspect-square -bottom-5 md:-bottom-10 left-0 rounded-full"
                  />
                  <input
                    disabled={true}
                    id="avatarUpload"
                    type="file"
                    className="hidden"
                    accept="image/png, image/jpeg"
                  />
                </label>
              </div>
            )}
            <label htmlFor="coverUpload" className="bg-white-100 rounded-full p-2 cursor-pointer">
              <Image
                src="/assets/images/portfolioLanding/edit.svg"
                width={0}
                height={0}
                alt="cover"
                className="w-[20px] object-fill object-center aspect-square -bottom-5 md:-bottom-10 left-0 rounded-full"
              />
            </label>
            <input
              id="coverUpload"
              type="file"
              onChange={handleUpload}
              className="hidden"
              accept="image/png, image/jpeg"
            />
            {hasData && <Button className="rounded-lg">Take Assesment</Button>}
          </div>
        </div>
        <div className="pt-8 md:pt-14 pb-40">
          {hasData ? (
            <div className="flex justify-between items-center">
              <div>
                <h1 className="font-semibold text-2xl uppercase">Babatunde Walters</h1>
                <h2 className="font-semibold">
                  Product Design (<span>Beginner</span>) <span>Icon</span>
                </h2>
                <p className="text-gray-500 font-semibold  text-[14px]">Lagos, Nigeria</p>
              </div>
              <p onClick={profileUpdate} className="text-blue-100 font-semibold cursor-pointer">
                Edit
              </p>
            </div>
          ) : (
            <div className="flex justify-between items-center">
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
          )}
          <div className="flex w-full min-h-[50vh] flex-col items-center">
            <Image
              src="/assets/images/portfolioLanding/EmptyState.svg"
              width={0}
              height={0}
              alt="empty"
              className="w-[50%] -mt-3 md:-mt-10 md:w-[250px] aspect-square"
            />
            <div className="flex justify-center items-center flex-col gap-2 -mt-5 mb-6 md:w-[50%] text-center">
              <h1 className="font-semibold text-2xl">Start showcasing your work</h1>
              <p className="text-sm text-gray-500">
                It looks like there are no projects here yet, Let&apos;s change that ! Click the button to add your
                first project and start building your impressive portfolio{' '}
              </p>
            </div>
            <div className="flex md:flex-row flex-col w-full justify-center items-center gap-4">
              <Button className="rounded-lg" onClick={viewPortfolio} intent={'secondary'}>
                View Templates
              </Button>
              <Button className="rounded-lg" onClick={buildPortfolio}>
                Build your Portfolio
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;

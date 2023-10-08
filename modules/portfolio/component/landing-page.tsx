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
              className="absolute h-[200px] md:h-[250px] lg:h-[300px] w-screen top-0 left-0 -z-50 mt-[81px] lg:mt-[96px]"
            />
          ) : (
            <div className="absolute h-[200px] md:h-[250px] lg:h-[300px] w-full top-0 left-0 -z-50 bg-[#F0F1F0] opacity-80 mt-[81px] lg:mt-[96px]">
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
                <svg width="57" height="56" viewBox="0 0 57 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M28.4189 25.3637C28.1855 25.3403 27.9055 25.3403 27.6489 25.3637C22.0955 25.177 17.6855 20.627 17.6855 15.027C17.6855 9.31033 22.3055 4.66699 28.0455 4.66699C33.7622 4.66699 38.4055 9.31033 38.4055 15.027C38.3822 20.627 33.9722 25.177 28.4189 25.3637Z"
                    stroke="#009254"
                    stroke-width="2.66667"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M16.7545 33.973C11.1079 37.753 11.1079 43.913 16.7545 47.6697C23.1712 51.963 33.6945 51.963 40.1112 47.6697C45.7579 43.8897 45.7579 37.7297 40.1112 33.973C33.7179 29.703 23.1945 29.703 16.7545 33.973Z"
                    stroke="#009254"
                    stroke-width="2.66667"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <label className="absolute md:bottom-4 bottom-1 -right-2 w-[33%] md:w-[30%] bg-brand-green-primary aspect-square rounded-full grid place-content-center cursor-pointer">
                  <svg
                    className="w-[30px] md:w-[25px] md:h-25px h-[30px]"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.2871 22.3994C17.7871 22.3994 22.2871 17.8994 22.2871 12.3994C22.2871 6.89941 17.7871 2.39941 12.2871 2.39941C6.78711 2.39941 2.28711 6.89941 2.28711 12.3994C2.28711 17.8994 6.78711 22.3994 12.2871 22.3994Z"
                      stroke="white"
                      stroke-width="2.66667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8.28711 12.3994H16.2871"
                      stroke="white"
                      stroke-width="2.66667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M12.2871 16.3994V8.39941"
                      stroke="white"
                      stroke-width="2.66667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
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
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M13.2603 3.59924L5.05034 12.2892C4.74034 12.6192 4.44034 13.2692 4.38034 13.7192L4.01034 16.9592C3.88034 18.1292 4.72034 18.9292 5.88034 18.7292L9.10034 18.1792C9.55034 18.0992 10.1803 17.7692 10.4903 17.4292L18.7003 8.73924C20.1203 7.23924 20.7603 5.52924 18.5503 3.43924C16.3503 1.36924 14.6803 2.09924 13.2603 3.59924Z"
                  stroke="#009254"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M11.8896 5.05078C12.3196 7.81078 14.5596 9.92078 17.3396 10.2008"
                  stroke="#009254"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M3 22H21"
                  stroke="#009254"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
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
            <svg width="336" height="268" viewBox="0 0 336 268" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0.5" width="335" height="268" fill="white" />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M84.9203 179.56H206.86C207.55 179.56 208.223 179.485 208.87 179.344C209.518 179.485 210.19 179.56 210.88 179.56H280.56C285.741 179.56 289.94 175.36 289.94 170.18C289.94 164.999 285.741 160.8 280.56 160.8H272.52C267.34 160.8 263.14 156.6 263.14 151.42C263.14 146.239 267.34 142.04 272.52 142.04H297.98C303.161 142.04 307.36 137.84 307.36 132.66C307.36 127.479 303.161 123.28 297.98 123.28H268.5C273.681 123.28 277.88 119.08 277.88 113.9C277.88 108.719 273.681 104.52 268.5 104.52H182.74C187.921 104.52 192.12 100.32 192.12 95.1398C192.12 89.9593 187.921 85.7598 182.74 85.7598H106.36C101.18 85.7598 96.9803 89.9593 96.9803 95.1398C96.9803 100.32 101.18 104.52 106.36 104.52H52.7603C47.5798 104.52 43.3803 108.719 43.3803 113.9C43.3803 119.08 47.5798 123.28 52.7603 123.28H86.2603C91.4407 123.28 95.6403 127.479 95.6403 132.66C95.6403 137.84 91.4407 142.04 86.2603 142.04H32.6603C27.4798 142.04 23.2803 146.239 23.2803 151.42C23.2803 156.6 27.4798 160.8 32.6603 160.8H84.9203C79.7398 160.8 75.5403 164.999 75.5403 170.18C75.5403 175.36 79.7398 179.56 84.9203 179.56ZM303.34 179.56C308.521 179.56 312.72 175.36 312.72 170.18C312.72 164.999 308.521 160.8 303.34 160.8C298.16 160.8 293.96 164.999 293.96 170.18C293.96 175.36 298.16 179.56 303.34 179.56Z"
                fill="#E6F5EA"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M152.078 150.491C151.974 151.233 151.92 151.99 151.92 152.76C151.92 161.641 159.119 168.84 168 168.84C176.88 168.84 184.08 161.641 184.08 152.76C184.08 151.99 184.025 151.233 183.921 150.491H222.94V186.26C222.94 188.481 221.14 190.28 218.92 190.28H117.08C114.859 190.28 113.06 188.481 113.06 186.26V150.491H152.078Z"
                fill="white"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M185.42 150.08C185.42 159.701 177.62 167.5 168 167.5C158.379 167.5 150.58 159.701 150.58 150.08C150.58 149.768 150.588 149.459 150.604 149.151H113.06L125.871 111.272C126.423 109.639 127.955 108.54 129.679 108.54H206.32C208.044 108.54 209.576 109.639 210.129 111.272L222.94 149.151H185.395C185.411 149.459 185.42 149.768 185.42 150.08Z"
                fill="white"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M182.871 151.359C182.871 158.793 176.213 166.16 168 166.16C159.787 166.16 153.129 158.793 153.129 151.359C153.129 151.118 153.136 149.538 153.15 149.301H125.12L136.056 122.711C136.528 121.449 137.836 120.6 139.307 120.6H196.693C198.165 120.6 199.472 121.449 199.944 122.711L210.88 149.301H182.85C182.864 149.538 182.871 151.118 182.871 151.359Z"
                fill="#E6F5EA"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M114.735 149.426V184.92C114.735 186.215 115.785 187.265 117.08 187.265H218.92C220.215 187.265 221.265 186.215 221.265 184.92V149.426L208.543 111.809C208.22 110.856 207.327 110.215 206.321 110.215H129.679C128.674 110.215 127.78 110.856 127.458 111.809L114.735 149.426Z"
                stroke="#009254"
                stroke-width="2.5"
              />
              <path
                d="M131.82 148.74C137.095 148.74 142.788 148.74 148.899 148.74C151.413 148.74 151.413 150.507 151.413 151.42C151.413 160.301 158.778 167.5 167.863 167.5C176.948 167.5 184.313 160.301 184.313 151.42C184.313 150.507 184.313 148.74 186.827 148.74H220.26M121.869 148.74H125.12H121.869Z"
                stroke="#009254"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M201.634 78.126L186.76 94.8132M166.794 72.3604V94.8132V72.3604ZM131.82 78.126L146.694 94.8132L131.82 78.126Z"
                stroke="#009254"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

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

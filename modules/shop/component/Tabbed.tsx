'use client';
import React, { useEffect } from 'react';
import { useMemo, useState } from 'react';
import Image from 'next/image';
import star1 from '../../../public/assets/star1.svg';
import star2 from '../../../public/assets/star2.svg';
import likeIcon from '../../../public/assets/icons/like.svg';
import profileImg from '../../../public/assets/images/profile-img.png';
import verifyIcon from '../../../public/assets/icons/verify.svg';
import Link from 'next/link';
import { Products } from '../../../@types';
import router from 'next/router';
import { SHOP_API_URL } from '../../../http/checkout';

const TabButton = ({ handleTabClick, tab }: { handleTabClick: (tabName: string) => void; tab: string }) => {
  return (
    <div className="w-full flex justify-around rounded-[10px] border-[1px] border-white-110 py-4 mt-20">
      <button
        className={`font-normal font-manropeL tracking-[0.08px]  ${
          tab === 'description' ? 'text-green-400' : 'text-dark-115'
        }`}
        onClick={() => handleTabClick('description')}
      >
        Description
        <span
          className={`h-[2px] w-[40px] bg-green-400 block mx-auto mt-[2px] ${
            tab === 'description' ? 'opacity-1' : 'opacity-0'
          }`}
        ></span>
      </button>

      <button
        className={`font-normal font-manropeL tracking-[0.08px] ${
          tab === 'review' ? 'text-green-400' : 'text-dark-115'
        }`}
        onClick={() => handleTabClick('review')}
      >
        Review
        <span
          className={`h-[2px] w-[40px] bg-green-400 block mx-auto mt-[2px] ${
            tab === 'review' ? 'opacity-1' : 'opacity-0'
          }`}
        ></span>
      </button>
    </div>
  );
};

const TabContent = ({ tab }: { tab: string }): React.ReactElement | null => {
  const { id } = router.query;
  const [product, setProduct] = useState<Products | null>(null);
  useEffect(() => {
    if (id) {
      fetch(`${SHOP_API_URL}/product/${id}`)
        .then((response) => response.json())
        .then((response) => {
          setProduct(response.data);
        })
        .catch((error) => {
          console.error('Error fetching product details:', error);
          setProduct(null);
        });
    }
  }, [id]);

  if (tab === 'description')
    return (
      <>
        {' '}
        <h2 className="text-white-700 font-manropeB font-semibold text-2xl text-left">Description</h2>
        {product ? <p className="mt-6 font-manropeL">{product.description}</p> : null}
      </>
    );

  if (tab === 'review')
    return (
      <>
        <h2 className="text-white-700  font-manropeB font-semibold text-2xl text-left">Review</h2>
        <div className="pt-9 flex">
          <div className="flex align-center gap-[5.3px]">
            <Image src={profileImg} alt="Profile Img" />

            <h3 className="font-manropeL text-xs text-[#A1ADB2] mr-3.5">Dorcas</h3>
          </div>
          <hr className="w-px h-3.5 bg-brand-disabled2 text-brand-disabled2 border-0" />

          <span className="font-manropeL text-xs text-[#A1ADB2] ml-3.5">September 22, 2023.</span>
        </div>
        <div className="flex items-center mt-6">
          <div className="flex mr-[17px]">
            <Image src={star1} alt="rating star" />
            <Image src={star1} alt="rating star" />
            <Image src={star1} alt="rating star" />
            <Image src={star2} alt="rating star" />
            <Image src={star2} alt="rating star" />
          </div>
        </div>
        <p className="font-manropeL text-sm font-normal color-green-900 pt-5">
          Having this product is the best thing that has happened to me in a very long time. Thank you so much for this
          product. The shipping and delivery was also very good. But there a few tweaks that this can actually have
          though.
        </p>

        <div className="pt-4 flex items-center">
          <button className="text-gray-300 font-manropeB text-xs font-medium rounded-[10px] border-[1px] border-gray-300 px-2 mr-3.5">
            Helpful
          </button>
          <hr className="w-px h-[15px] bg-brand-disabled2 text-brand-disabled2 border-0" />

          <button className="text-gray-300 font-manropeB text-xs font-medium ml-3.5">Report</button>
        </div>

        <div className="mt-[18px] pt-[18px] pb-[46px] pr-[70px] pl-[16px] bg-[#F9F9F9]">
          <div className="flex items-center justify-between w-6/12">
            <h3 className="font-manropeB text-sm font-semibold">ZuriShopOwner</h3>
            <p className="font-manropeL text-xs font-normal text-[#A1ADB2]">September 22, 2023.</p>
          </div>
          <p className="font-manropeL text-sm font-normal mt-4">
            Having this product is the best thing that has happened to me in a very long time. Thank you so much for
            this product. The shipping and delivery was also very good. But there a few tweaks that this can actually
            have though.
          </p>
        </div>

        <button
          type="button"
          className="text-xl font-semibold leading-6 mt-7 font-manropeB text-brand-green-primary flex mx-auto"
        >
          <Link href={'/dashboard/reviews/product-details/1'}>See more reviews</Link>
        </button>
      </>
    );

  return null;
};

const TabContainer = () => {
  const [tab, setTab] = useState<string>('description');

  const handleTabClick = useMemo(() => {
    return (tabName: string) => {
      setTab(tabName);
    };
  }, []);

  return (
    <>
      <div className="md:block hidden w-full">
        <TabButton handleTabClick={handleTabClick} tab={tab} />
        <div className="w-full rounded-[10px] border-[1px] border-white-110 mt-4 p-10">
          <TabContent tab={tab} />
        </div>
      </div>

      <div className="md:hidden block mr-auto mt-10">
        <hr className="bg-brand-disabled text-brand-disabled h-[1px] w-full border-0  sm:hidden" />

        <div className="mt-4">
          <h2 className="text-[#101928] font-manropeB font-semibold text-[22px] text-left">Customer Feedback</h2>
          <p className="text-sm font-manropeL mt-4">
            VERIFIED RATINGS <span>(173)</span>
          </p>

          <div className="mt-10 grid gap-10 grid-rows-[1fr] sm:grid-cols-[0.5fr_1fr] items-start">
            <div className="w-full py-8 px-6 flex flex-col gap-[20px] rounded-2xl border-custom-color32 border-[1px] items-center">
              <h2 className="text-4xl font-manropeB font-semibold">3.0/5</h2>
              <div className="flex mr-[17px]">
                <Image src={star1} alt="rating star" />
                <Image src={star1} alt="rating star" />
                <Image src={star1} alt="rating star" />
                <Image src={star2} alt="rating star" />
                <Image src={star2} alt="rating star" />
              </div>
              <p className="text-base font-manropeL font-normal text-center">
                <span>12,000</span> verified users
              </p>
            </div>

            <div>
              <div className="flex mb-4 sm:hidden">
                <div className="flex align-center gap-[5.3px]">
                  <Image src={profileImg} alt="Profile Img" className="block sm:hidden" />
                  <h3 className="text-green-900 sm:text-custom-color39 font-manropeL text-xs  mr-3.5">Dorcas</h3>
                </div>
                <hr className="hidden sm:block w-px h-3.5 bg-brand-disabled2 text-brand-disabled2 border-0" />
                <span className="font-manropeL text-xs text-custom-color39 ml-3.5">September 22, 2023.</span>
              </div>
              <div className="flex item-center gap-4 sm:inline-block">
                <div className="flex ">
                  <Image src={star1} alt="rating star" />
                  <Image src={star1} alt="rating star" />
                  <Image src={star1} alt="rating star" />
                  <Image src={star2} alt="rating star" />
                  <Image src={star2} alt="rating star" />
                </div>

                <div className="flex gap-2 align-center sm:hidden">
                  <Image src={verifyIcon} alt="Verify Icon" />
                  <p className="color-green-300 font-manropeB text-sm font-semibold text-brand-green-shade50">
                    Verified Purchase
                  </p>
                </div>
              </div>
              <div className="hidden sm:flex mt-4">
                <h3 className="text-green-900 sm:text-custom-color39 font-manropeL text-xs  mr-3.5">Dorcas</h3>
                <hr className="hidden sm:block w-px h-3.5 bg-brand-disabled2 text-brand-disabled2 border-0" />
                <span className="font-manropeL text-xs text-custom-color39 ml-3.5">September 22, 2023.</span>
              </div>

              <p className="font-manropeL text-sm font-normal color-green-900 mt-4">
                Having this product is the best thing that has happened to me in a very long time. Thank you so much for
                this product. The shipping and delivery was also very good. But there a few tweaks that this can
                actually have though.
              </p>

              <button className="mt-3 hidden sm:flex text-gray-300 items-center gap-2.5 font-manropeB text-sm font-medium rounded-[10px] border-[1px] border-gray-300 px-3 py-2 mr-3.5">
                <Image src={likeIcon} alt="Like Icon" />
                Helpful
              </button>

              <div className="flex sm:hidden pt-4 items-center">
                <button className="text-gray-300 font-manropeB text-xs font-medium rounded-[5.897px] border-[1px] border-gray-300 py-[3px] px-[8px] mr-3.5">
                  Helpful
                </button>
                <hr className="w-px h-[15px] bg-brand-disabled2 text-brand-disabled2 border-0" />

                <button className="text-gray-300 font-manropeB text-xs font-medium ml-3.5">Report</button>
              </div>

              <div className="mt-5 pt-[18px] pb-[46px] pr-[70px] pl-[16px] bg-custom-color38">
                <div className="flex items-center justify-between w-full">
                  <h3 className="font-manropeB text-sm font-semibold">ZuriShopOwner</h3>
                  <p className="font-manropeL text-xs font-normal text-custom-color39">September 22, 2023.</p>
                </div>
                <p className="font-manropeL text-sm font-normal mt-4">
                  Having this product is the best thing that has happened to me in a very long time. Thank you so much
                  for this product. The shipping and delivery was also very good. But there a few tweaks that this can
                  actually have though.
                </p>
              </div>

              <button
                type="button"
                className="hidden sm:flex text-base leading-6 mt-7  font-manropeB font-bold text-brand-green-primary mx-auto"
              >
                See more reviews
              </button>
            </div>
            <div className="flex items-center justify-center sm:hidden ">
              <button
                type="button"
                className="flex leading-6 text-base font-manropeB font-bold text-brand-green-primary"
              >
                <Link href={'/dashboard/reviews/product-details/1'}>See more reviews</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TabContainer;

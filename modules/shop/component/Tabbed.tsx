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
import Reviews from '../../dashboard/component/reviews/reviewPreviews/BuyersPreview'

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
      fetch(`https://zuriportfolio-shop-internal-api.onrender.com/api/v1/product/${id}`)
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
        <Reviews/>
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

      <div className="md:hidden block mr-auto mt-4">
        <Reviews/>
      </div>
    </>
  );
};

export default TabContainer;

import React, { useContext, useEffect, useState } from 'react';
// import AuthContext from '../../../../../context/AuthContext';
import { ProductCardProps, MarketPlaceProductCardProps } from '../../../../../@types';
import ProductCard from '../../ProductCard';
// import Link from 'next/link';
import Image from 'next/image';
import Cancel from '../../../../../public/assets/recentlyviewed/cancel.svg';
import styles from '../productCardWrapper/product-card-wrapper.module.css';



function RecentlyViewed() {
  const API_URL = `https://coral-app-8bk8j.ondigitalocean.app/api/recently-viewed/1972d345-44fb-4c9a-a9e3-d286df2510ae/`;
  const [recentlyViewed, setRecentlyViewed] = useState<ProductCardProps[]>([]);
  // // const [loading, setLoading] = useState(true);
  // // const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API_URL)
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      setRecentlyViewed(data);
    })
  }, [API_URL]);

  const handleRemoveItem = (id: string) => {
    const updatedRecentlyViewed = recentlyViewed.filter((item) => item.id !== id);
    setRecentlyViewed(updatedRecentlyViewed);
  };

  // console.log('User Id: ', userDetails.id);

  return (
    <section className="max-w-[1240px] mx-auto w-full mb-2.5 md:mb-8 pt-[60px]">
      {recentlyViewed.length > 0 ? (
      <>
      <h3 className="text-custom-color31 font-manropeL mb-5 md:mb-8 font-bold md:text-2xl leading-normal">
        Recently Viewed
      </h3>
      <div
        className={`flex flex-nowrap lg:flex-wrap justify-between gap-y-[70px] mb-[74px] w-full overflow-scroll  ${styles['hide-scroll']}`}
      >
        {recentlyViewed.map((item, index) => {
          return (
            <div key={index} className="relative w-1/2 md:w-1/3 lg:w-1/4 pr-2 md:pr-4 lg:pr-8">
              <button className="absolute bg-white-100 rounded-full top-3 right-4 md:top-4 sm:right-10 p-1"
              onClick={() => handleRemoveItem(item.id)}
              >
                <Image src={Cancel} alt="Cancel Icon" />
              </button>
              <ProductCard
                id={item?.product?.id}
                currency={item?.product?.currency}
                image_url={item?.product?.image_url}
                name={item?.product?.name}
                price={item?.product?.price}
                user={item?.product?.shop?.name}
                rating={item?.product?.rating}
                showLimitedOffer={item?.product?.showLimitedOffer}
                showTopPicks={item?.product?.showTopPicks}
                showDiscount={item?.product?.showDiscount}
                discount_price={item?.product?.discount_price}
              />
            </div>
          );
        })}
      </div>
      </>
        ) : (
        <div className="py-8 px-4 text-center rounded-2xl border border-dark-110/20 text-dark-110 font-manropeL text-xl md:text-2xl font-semibold">
      No Product To Show
    </div>
      )} 
    </section>
  );
}

export default RecentlyViewed;

import React, { useContext, useEffect, useState } from 'react';
// import AuthContext from '../../../../../context/AuthContext';
import { ProductCardProps, MarketPlaceProductCardProps } from '../../../../../@types';
import ProductCard from '../../ProductCard';
// import Link from 'next/link';
import Image from 'next/image';
import Cancel from '../../../../../public/assets/recentlyviewed/cancel.svg';
import styles from '../productCardWrapper/product-card-wrapper.module.css';

const recentlyViewed: MarketPlaceProductCardProps[] = [
  {
    id: '1',
    currency: 'USD',
    image: '/assets/recentlyviewed/image1.webp',
    name: 'Webinar and Course Slide Templa',
    user: 'Mark Essien',
    rating: 3,
    price: 100,
    showLimitedOffer: true,
    showTopPicks: false,
    showDiscount: true,
    discount_price: 60,
  },
  {
    id: '1',
    currency: 'USD',
    image: '/assets/recentlyviewed/image2.webp',
    name: 'Webinar and Course Slide Templa',
    price: 100,
    user: 'Mark Essien',
    rating: 3,
    showLimitedOffer: false,
    showTopPicks: false,
    showDiscount: false,
    discount_price: 60,
  },
  {
    id: '1',
    currency: 'USD',
    image: '/assets/recentlyviewed/image3.webp',
    name: 'Webinar and Course Slide Templa',
    price: 100,
    user: 'Mark Essien',
    rating: 3,
    showLimitedOffer: true,
    showTopPicks: false,
    showDiscount: true,
    discount_price: 60,
  },
  {
    id: '1',
    currency: 'USD',
    image: '/assets/recentlyviewed/image4.webp',
    name: 'Webinar and Course Slide Templa',
    price: 100,
    user: 'Mark Essien',
    rating: 3,
    showLimitedOffer: true,
    showTopPicks: true,
    showDiscount: true,
    discount_price: 60,
  },
];

function RecentlyViewed() {
  // const API_URL = `https://coral-app-8bk8j.ondigitalocean.app/api/recently-viewed/118453f4-b66b-4cd4-a2a5-34f93394a207/`;
  // const [recentlyViewed, setRecentlyViewed] = useState<ProductCardProps[]>([]);
  // // const [loading, setLoading] = useState(true);
  // // const [error, setError] = useState(null);

  // useEffect(() => {
  //   fetch(API_URL)
  //   .then((res) => res.json())
  //   .then((data) => {
  //     console.log(data)
  //     setRecentlyViewed(data);
  //   })
  // }, [API_URL]);

  // console.log('User Id: ', userDetails.id);

  return (
    <section className="max-w-[1240px] mx-auto w-full mb-2.5 md:mb-8 pt-[60px]">
      <h3 className="text-custom-color31 font-manropeL mb-5 md:mb-8 font-bold md:text-2xl leading-normal">
        Recently Viewed
      </h3>
      <div
        className={`flex flex-nowrap lg:flex-wrap justify-between gap-y-[70px] mb-[74px] w-full overflow-scroll  ${styles['hide-scroll']}`}
      >
        {recentlyViewed.map((item, index) => {
          return (
            <div key={index} className="relative w-1/2 md:w-1/3 lg:w-1/4 pr-2 md:pr-4 lg:pr-8">
              <button className="absolute bg-white-100 rounded-full top-3 right-4 md:top-4 md:right-10 p-1">
                <Image src={Cancel} alt="Cancel Icon" />
              </button>
              <ProductCard
                id={item?.id}
                currency={item?.currency}
                image={item?.image}
                name={item?.name}
                price={item?.price}
                user={item?.user}
                rating={item?.rating}
                showLimitedOffer={item?.showLimitedOffer}
                showTopPicks={item?.showTopPicks}
                showDiscount={item?.showDiscount}
                discount_price={item?.discount_price}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default RecentlyViewed;

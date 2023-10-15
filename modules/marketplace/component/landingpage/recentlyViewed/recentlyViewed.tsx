import React, { useEffect, useState } from 'react';
import CategoryLoading from '../../categories/CategoryLoading';
import { isUserAuthenticated } from '@modules/marketplace/hooks/useAuthHelper';
import { RecentlyViewedData, ProductCardProps } from '../../../../../@types';
import ProductCard from '../../ProductCard';
import Image from 'next/image';
import Cancel from '../../../../../public/assets/recentlyviewed/cancel.svg';
import styles from '../productCardWrapper/product-card-wrapper.module.css';

function RecentlyViewed() {
  const [isLoading, setLoading] = useState(true);
  const [recentlyViewed, setRecentlyViewed] = useState<RecentlyViewedData[]>([]);
  const token: any = isUserAuthenticated();
  // recently-viewed/${token?.id}
  console.log(token?.id);
  const API_URL = `https://coral-app-8bk8j.ondigitalocean.app/api/recommendations`;

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setRecentlyViewed(data);
        setLoading(false);
      });
  }, [API_URL]);

  const handleRemoveItem = (id: string) => {
    const updatedRecentlyViewed = recentlyViewed.filter((item) => item.product.id !== id);
    setRecentlyViewed(updatedRecentlyViewed);
  };

  return (
    <section className="max-w-[1240px] mx-auto w-full mb-2.5 md:mb-8 pt-[60px]">
      <h3 className="text-custom-color31 font-manropeL mb-5 md:mb-8 font-bold md:text-2xl leading-normal">
        Recently Viewed
      </h3>
      {isLoading ? (
        <CategoryLoading />
      ) : (
        <>
          {recentlyViewed.length > 0 ? (
            <div
              className={`flex flex-nowrap lg:flex-wrap gap-y-[70px] mb-[74px] w-full overflow-scroll  ${styles['hide-scroll']}`}
            >
              {recentlyViewed.map((item, index) => (
                <div key={index} className="relative w-1/2 md:w-1/3 lg:w-1/4 pr-2 md:pr-4 lg:pr-8">
                  <button
                    className="absolute bg-white-100 rounded-full top-3 right-4 sm:right-6 md:right-10 p-1"
                    onClick={() => handleRemoveItem(item.product.id)}
                  >
                    <Image src={Cancel} alt="Cancel Icon" />
                  </button>
                  <ProductCard
                    id={item?.product?.id}
                    currency={item?.product?.currency}
                    image={item?.product?.image_url}
                    name={item?.product?.name}
                    price={item?.product?.price}
                    user={item?.product?.shop?.name}
                    rating={item?.product?.rating}
                    showTopPicks={item?.product?.showTopPicks}
                    discount_price={item?.product?.discount_price}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 px-4 text-center rounded-2xl border border-dark-110/20 text-dark-110 font-manropeL text-xl md:text-2xl font-semibold">
              No Product To Show
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default RecentlyViewed;

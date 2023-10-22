import React, { useEffect, useState } from 'react';
import { isUserAuthenticated } from '@modules/marketplace/hooks/useAuthHelper';
import { RecentlyViewedData } from '../../../../../@types';
import ProductCard from '../../ProductCard';
import styles from '../productCardWrapper/product-card-wrapper.module.css';
import CategoryLoading from '../../categories/CategoryLoading';
import http from '@modules/marketplace/http';
import { API_URI } from '@modules/marketplace/http';

function RecentlyViewed() {
  const [isLoading, setLoading] = useState(true);
  const [isReady, setReady] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState<RecentlyViewedData[]>([]);
  const token: any = isUserAuthenticated();

  // const API_URL = `https://coral-app-8bk8j.ondigitalocean.app/api/marketplace/recently-viewed/${token?.id}`;

  useEffect(() => {
    setReady(true);
    const fetchRecentlyViewed = async () => {
      try {
        const response = await fetch(`${API_URI}/recently-viewed/${token?.id}`);
        if (response.ok) {
          const data = await response.json();
          const limitedRecentlyViewed = data.data.slice(0, 8);
          setRecentlyViewed(limitedRecentlyViewed);
        } else {
          throw new Error('Network response was not ok.');
        }
      } catch (error) {
        console.error('Error fetching data: ', error);
      } finally {
        setLoading(false);
      }
    };
    //fetches only when user is authenticated
    token?.id ? fetchRecentlyViewed() : null;
  }, [token?.id]);

  if (!token?.id && isReady) return <div></div>;

  return (
    <section className="max-w-[1240px] mx-auto w-full mb-2.5 md:mb-8 pt-[60px]">
      <h3 className="text-custom-color31 font-manropeL mb-5 md:mb-8 font-bold md:text-2xl leading-normal">
        Recently Viewed
      </h3>

      {isLoading ? (
        <div
          className={`flex flex-nowrap lg:grid grid-cols-4 gap-y-[70px] mb-[74px] w-full overflow-scroll ${styles['hide-scroll']}`}
        >
          {[1, 2, 3, 4].map((item) => {
            return <CategoryLoading key={item} />;
          })}
        </div>
      ) : (
        <>
          {recentlyViewed.length > 0 ? (
            <div className={`flex flex-nowrap gap-x-3 mt-10 w-full overflow-x-scroll ${styles['hide-scroll']}`}>
              {recentlyViewed.map((item, index) => (
                <div key={index} className="relative w-1/2 md:w-1/3 lg:w-1/4 pr-2 md:pr-4 lg:pr-8">
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

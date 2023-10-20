import React from 'react';
import { MarketPlaceProductCardProps } from '../../../../../@types';
import Link from 'next/link';
import styles from './product-card-wrapper.module.css';
import ProductCard from '../../ProductCard';
import NoEndpoint from '../../no-endpoint/no-endpoint';
import CategoryLoading from '../../categories/CategoryLoading';

function ProductCardWrapper({
  productsList,
  title,
  showTopPicks,
  showAll,
}: {
  productsList: { items: any[]; isLoading: boolean };
  title: string;
  showTopPicks: boolean;
  showAll: boolean;
}) {
  return (
    <section className="w-full mb-2.5 md:mb-8 pt-2.5">
      <h3 className="text-custom-color31 font-manropeL mb-5 md:mb-8 font-bold md:text-2xl leading-normal flex items-center justify-between">
        {title}
        {showAll && (
          <Link className="flex items-center gap-2 text-sm font-bold text-brand-green-shade50" href="">
            View All
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M7.42578 16.5999L12.8591 11.1666C13.5008 10.5249 13.5008 9.4749 12.8591 8.83324L7.42578 3.3999"
                className=" stroke-green-300"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        )}
      </h3>
      <div>
        {productsList.isLoading ? (
          <div
            className={`flex flex-nowrap lg:grid grid-cols-4 gap-y-[70px] mb-[74px] w-full overflow-scroll ${styles['hide-scroll']}`}
          >
            {[1, 2, 3, 4].map((item) => {
              return <CategoryLoading key={item} />;
            })}
          </div>
        ) : (
          <>
            {productsList?.items?.length ? (
              <div
                className={`flex flex-nowrap lg:grid grid-cols-4 gap-x-2 md:gap-x-4 gap-y-[70px] mb-[74px] lg:[grid-column-gap:2rem] w-full overflow-scroll ${styles['hide-scroll']}`}
              >
                {productsList.items.map((item, index) => {
                  if (index <= 7) {
                    return (
                      <div
                        key={index}
                        className="relative w-1/2 md:w-1/3 lg:justify-items-stretch lg:w-full pr-2 md:pr-4 lg:pr-0"
                      >
                        <ProductCard
                          id={item?.id}
                          currency={item?.currency}
                          image={item?.images && item?.images[0]?.url}
                          name={item?.name}
                          price={item?.price}
                          user={item?.shop ? `${item?.shop?.name}` : 'null'}
                          rating={item?.rating}
                          showDiscount={title === 'Limited Offers' ? true : false}
                          showTopPicks={showTopPicks}
                          discount_price={item?.discount_price}
                          shop={item?.shop}
                        />
                      </div>
                    );
                  }
                })}
              </div>
            ) : (
              <NoEndpoint />
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default ProductCardWrapper;

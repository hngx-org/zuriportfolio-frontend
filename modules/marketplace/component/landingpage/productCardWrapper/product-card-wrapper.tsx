import React from 'react';
import { MarketPlaceProductCardProps } from '../../../../../@types';
import Link from 'next/link';
import styles from './product-card-wrapper.module.css';
import ProductCard from '../../ProductCard';
import NoEndpoint from '../../no-endpoint/no-endpoint';

function ProductCardWrapper({
  productsList,
  title,
  showTopPicks,
  showAll,
}: {
  productsList: MarketPlaceProductCardProps[];
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
      {productsList.length ? (
        <div
          className={`flex flex-nowrap lg:grid grid-cols-4 justify-between gap-y-[70px] mb-[74px] w-full overflow-scroll ${styles['hide-scroll']}`}
        >
          {productsList.map((item, index) => {
            if (index <= 7) {
              return (
                <div key={index} className="relative w-1/2 md:w-1/3 lg:w-full pr-2 md:pr-4 lg:pr-0">
                  <ProductCard
                    id={item?.id}
                    currency={item?.currency}
                    image_url={item?.image_url}
                    name={item?.name}
                    price={item?.price}
                    user={item?.user}
                    rating={item?.rating}
                    showDiscount={item?.showDiscount}
                    showTopPicks={showTopPicks}
                    discount_price={item?.discount_price}
                  />
                </div>
              );
            }
          })}
        </div>
      ) : (
        <NoEndpoint />
      )}
    </section>
  );
}

export default ProductCardWrapper;

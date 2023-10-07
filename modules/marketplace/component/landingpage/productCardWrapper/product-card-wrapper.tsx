import React from 'react';
import ProductCard from '../../ProductCard';
import { ProductCardProps } from '../../../../../@types';
import Link from 'next/link';
import styles from './product-card-wrapper.module.css';
import { useRouter } from 'next/router';

function ProductCardWrapper({ productsList, title }: { productsList: ProductCardProps[]; title: string }) {
  const router = useRouter();
  const isLgHidden = router.pathname !== '/marketplace';
  return (
    <section className="w-full mb-2.5 md:mb-8 pt-2.5">
      <h3 className="text-[#101928] font-manropeL mb-5 md:mb-8 font-bold md:text-2xl leading-normal flex items-center justify-between">
        {title}
        <Link
          className={`flex items-center gap-2 text-sm font-bold text-brand-green-shade50 ${
            isLgHidden ? '' : 'lg:hidden'
          }`}
          href=""
        >
          View All
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M7.42578 16.5999L12.8591 11.1666C13.5008 10.5249 13.5008 9.4749 12.8591 8.83324L7.42578 3.3999"
              stroke="#00894C"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </Link>
      </h3>
      <div
        className={`flex flex-nowrap lg:flex-wrap justify-between gap-y-[70px] mb-[74px] w-full overflow-scroll ${styles['hide-scroll']}`}
      >
        {productsList.map((item, index) => {
          return (
            <div key={index} className="relative w-1/2 md:w-1/3 lg:w-1/4 pr-2 md:pr-4 lg:pr-8">
              <ProductCard
                image={item?.image}
                productName={item?.productName}
                productPrice={item?.productPrice}
                productOwner={item?.productOwner}
                productRating={item?.productRating}
                showLimitedOffer={item?.showLimitedOffer}
                showTopPicks={item?.showTopPicks}
                showDiscount={item?.showDiscount}
                discount={item?.discount}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default ProductCardWrapper;

'use client';

import CategoriesNav from '@modules/marketplace/component/CategoriesNav/CategoriesNav';
import MainLayout from '../../../components/Layout/MainLayout';
import { useEffect, useState } from 'react';
import ProductCard from '@modules/marketplace/component/ProductCard';
import styles from '../../../modules/marketplace/component/landingpage/productCardWrapper/product-card-wrapper.module.css';
import { ProductResult } from '../../../@types';
import Link from 'next/link';
import Error from '@modules/marketplace/component/landingpageerror/ErrorPage';
import CategoryLayout from '@modules/marketplace/component/layout/category-layout';

export default function Index() {
  const [results, setResults] = useState<ProductResult[]>([]);
  const searchquery = typeof window !== 'undefined' ? localStorage.getItem('keyword') : null;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const getresult = localStorage.getItem('search_result');
      if (getresult) {
        const result = JSON.parse(getresult);
        setResults(result);
      }
    }
  }, [results]);

  return (
    <>
      {results?.length === 0 ? (
        <Error />
      ) : (
        <CategoryLayout>
          <div className="px-4 py-4 sm:py-2 max-w-[1240px] mx-auto">
            <h1 className="text-custom-color31 font-manropeL mt-5 lg:pt-5 md:mb-1 font-bold md:text-2xl leading-normal flex items-center justify-between">
              Search Result for &apos;{searchquery}&apos;
            </h1>
            <div
              className={`flex py-8 flex-nowrap lg:flex-wrap gap-y-[70px] mb-[74px] w-full overflow-scroll ${styles['hide-scroll']}`}
            >
              {results?.map((item) => {
                const stringFromEndpoint = item.price;
                const price = parseInt(stringFromEndpoint, 10);
                return (
                  <Link
                    href={`marketplace/product-details?id=${item.id}`}
                    key={item.id}
                    className="relative w-1/2 md:w-1/3 lg:w-1/4 pr-2 md:pr-4 lg:pr-8"
                  >
                    <ProductCard
                      id={item.id}
                      currency={`USD`}
                      image={item?.images[0]?.url}
                      name={item?.name}
                      price={price}
                      user={item?.shop ? `${item?.shop?.name}` : 'null'}
                      rating={0}
                      showLimitedOffer={false}
                      showTopPicks={false}
                      showDiscount={true}
                      discount_price={50}
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        </CategoryLayout>
      )}
    </>
  );
}

'use client';

import { useEffect, useState } from 'react';
import ProductCard from '@modules/marketplace/component/ProductCard';
import styles from '../../../modules/marketplace/component/landingpage/productCardWrapper/product-card-wrapper.module.css';
import { ProductResult } from '../../../@types';
import Link from 'next/link';
import Error from '@modules/marketplace/component/landingpageerror/ErrorPage';
import CategoryLayout from '@modules/marketplace/component/layout/category-layout';
import { useRouter } from 'next/router';
import { searchProducts } from '../../../http/api/searchProducts';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '@ui/Loader';

export default function Index() {
  const [results, setResults] = useState<ProductResult[]>([]);

  // access the query parameter from the URL using router
  const {
    query: { query },
  } = useRouter();

  const searchQuery = Array.isArray(query) ? query[0] : query;

  // fetch and update search results when the component mounts or searchQuery changes
  useEffect(() => {
    if (searchQuery) {
      const fetchData = async () => {
        try {
          const results = await searchProducts(searchQuery);
          setResults(results);
        } catch (error: any) {
          toast.error(error.message);
        }
      };

      fetchData();
    }
  }, [searchQuery]);

  return (
    <>
      {results && results?.length > 0 && (
        <CategoryLayout>
          <div className="px-4 py-4 sm:py-2 max-w-[1240px] mx-auto">
            <h1 className="text-custom-color31 font-manropeL mt-5 lg:pt-5 md:mb-1 font-bold md:text-2xl leading-normal flex items-center justify-between">
              Search Result for &apos;{searchQuery}&apos;
            </h1>
            <div
              className={`flex py-8 flex-wrap lg:flex-wrap gap-y-[70px] mb-[74px] w-full overflow-scroll ${styles['hide-scroll']}`}
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
                      shop={item?.shop}
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

      {!results && (
        <CategoryLayout>
          <div className="h-[50vh] w-full flex justify-center items-center">
            <Loader />
          </div>
        </CategoryLayout>
      )}

      {results && results?.length === 0 && <Error />}
    </>
  );
}

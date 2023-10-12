'use client';

import CategoriesNav from '@modules/marketplace/component/CategoriesNav/CategoriesNav';
import MainLayout from '../../../components/Layout/MainLayout';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ProductCard from '@modules/marketplace/component/ProductCard';
import styles from '../../../modules/marketplace/component/landingpage/productCardWrapper/product-card-wrapper.module.css';
import { ProductResult } from '../../../@types';

export default function Index() {
  const router = useRouter();
  const { searchResults } = router.query;
  const [results, setResults] = useState<ProductResult[]>([]);

  useEffect(() => {
    if (searchResults) {
      const parsedResults = Array.isArray(searchResults) ? searchResults : [searchResults];
      try {
        const resultsArray = parsedResults.map((result) => JSON.parse(result));
        setResults(resultsArray[0]);
      } catch (error) {
        console.error('Failed to parse searchResults:', error);
      }
    }
  }, [searchResults]);

  console.log('result', results);

  return (
    <MainLayout activePage="marketplace" showDashboardSidebar={false} showFooter={true} showTopbar={true}>
      <div className="max-w-[1240px] mx-auto">
        <CategoriesNav
          navItems={[
            ' Design & Graphics',
            ' Development & Programming',
            ' Content Creation',
            ' Digital Arts & Media',
            ' Audio & Sound',
            ' Photography',
            'Writing & Copywriting',
            'Video & motion',
            'Data & Analytics',
            'Marketing & Advertising',
            'eCommerce & Business',
            'Gaming & Entertainment',
            'Virtual Reality & Augmented Reality',
            'e-Books',
          ]}
        />
      </div>
      <div
        className={`flex px-8 flex-nowrap lg:flex-wrap gap-y-[70px] mb-[74px] w-full overflow-scroll ${styles['hide-scroll']}`}
      >
        {results.map((item) => {
          return (
            <div key={item.id} className="relative w-1/2 md:w-1/3 lg:w-1/4 pr-2 md:pr-4 lg:pr-8">
              <ProductCard
                image={`/assets/products-banner/Image-11.png`}
                productName={item?.name}
                productPrice={item?.price}
                productOwner={`Mark Essien`}
                productRating={3}
                showLimitedOffer={false}
                showTopPicks={false}
                showDiscount={true}
                discount={50}
              />
            </div>
          );
        })}
      </div>
    </MainLayout>
  );
}

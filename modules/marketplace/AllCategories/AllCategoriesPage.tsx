import React, { useEffect, useState } from 'react';
import ProductCardWrapper from '../component/landingpage/productCardWrapper/product-card-wrapper';
import styles from '../component/landingpage/productCardWrapper/product-card-wrapper.module.css';
import Link from 'next/link';
import CategoryLoading from '../component/categories/CategoryLoading';
import NoEndpoint from '../component/no-endpoint/no-endpoint';
import http from '../http';

interface Cat {
  isLoading: boolean;
  items: any[];
}

export default function AllCategoriesPage() {
  // const baseUrl = 'https://coral-app-8bk8j.ondigitalocean.app/api/marketplace/';
  const [categoryProducts, setCategoryProducts] = useState<Cat>({ isLoading: true, items: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await http.get('/category-name');
        const cats: { name: string; subcategories: any[] }[] = res?.data?.data
          ? res?.data?.data.slice(0, 10)
          : res?.data?.data;
        if (cats?.length) {
          cats?.forEach(async (item) => {
            await fetchCategoryProducts(item?.name);
          });
        } else {
          setCategoryProducts({ items: [], isLoading: false });
        }
      } catch (error) {
        setCategoryProducts({ items: [], isLoading: false });
      }
    };
    fetchData();
  }, []);

  async function fetchCategoryProducts(name: string) {
    try {
      const res = await http.get(`/products/${name}`);
      if (res?.data?.status == 200) {
        setCategoryProducts((prevData) => {
          return { isLoading: false, items: [...prevData.items, { title: name, product: res?.data }] };
        });
      }
    } catch (error) {
      setCategoryProducts((prevData) => {
        return { isLoading: false, items: [...prevData.items, { title: name, product: [] }] };
      });
    }
  }

  //Remove duplicate items
  function uniqueArray(): any[] {
    const uniqueArray = categoryProducts.items.filter((object, index) => {
      return categoryProducts.items.findIndex((otherObject) => otherObject.title === object.title) === index;
    });
    return uniqueArray;
  }

  function reduceItem(array: any[]): any[] {
    // Check the length of the array.
    if (array?.length > 4) {
      // Slice the array to the first 4 items.
      array = array.slice(0, 4);
    }
    // Return the reduced array.
    return array;
  }

  return (
    <>
      {categoryProducts.isLoading ? (
        <div
          className={`flex flex-nowrap lg:grid grid-cols-4 justify-between gap-y-[70px] mb-[74px] w-full overflow-scroll ${styles['hide-scroll']}`}
        >
          {[1, 2, 3, 4].map((item) => {
            return <CategoryLoading key={item} />;
          })}
        </div>
      ) : (
        <>
          {categoryProducts?.items?.length ? (
            <div className="category">
              {uniqueArray().map((row, index) => (
                <div key={index} className="">
                  <div className="flex gap-4 items-center">
                    <div className="text-custom-color31 font-manropeL font-bold md:text-2xl leading-normal ">
                      {row?.title}
                    </div>
                    <div className="text-neutral-400 text-base font-semibold font-Manrope leading-normal tracking-tight pt-2">
                      {row?.product?.length}
                    </div>
                    {reduceItem(row?.product?.data)?.length > 0 && (
                      <Link
                        className="flex items-center gap-2 text-sm font-bold ml-auto leading-normal text-brand-green-shade50"
                        href={`/marketplace/categories/${row.title}`}
                      >
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
                  </div>

                  <ProductCardWrapper
                    productsList={{ isLoading: categoryProducts?.isLoading, items: reduceItem(row?.product?.data) }}
                    title={''}
                    showTopPicks={false}
                    showAll={false}
                  />
                </div>
              ))}
            </div>
          ) : (
            <NoEndpoint message="An error occurred. Kindly refresh again" />
          )}
        </>
      )}
    </>
  );
}

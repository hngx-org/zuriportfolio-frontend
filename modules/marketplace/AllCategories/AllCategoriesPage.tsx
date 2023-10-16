import React, { useEffect, useState } from 'react';
import ProductCardWrapper from '../component/landingpage/productCardWrapper/product-card-wrapper';
import styles from '../component/landingpage/productCardWrapper/product-card-wrapper.module.css';
import Link from 'next/link';
import CategoryLoading from '../component/categories/CategoryLoading';

interface Cat {
  isLoading: boolean;
  items: any[];
}

export default function AllCategoriesPage() {
  const baseUrl = 'https://coral-app-8bk8j.ondigitalocean.app/api/';
  const [categories, setCategories] = useState({ items: [], isLoading: true });
  const [categoryProducts, setCategoryProducts] = useState<Cat>({ isLoading: true, items: [] });

  useEffect(() => {
    if (categoryProducts.items.length) return;
    try {
      fetch(`${baseUrl}categoryNames/`)
        .then((res) => res.json())
        .then((data) => {
          setCategories({ items: data['categories name'], isLoading: false });
          const cats: string[] = data['categories name'];
          console.log(cats);
          cats.forEach((item) => {
            fetch(`${baseUrl}products/${item}`)
              .then((res) => res.json())
              .then((data) =>
                setCategoryProducts((prevData) => {
                  return { ...prevData, items: [...prevData.items, { title: item, product: data }] };
                }),
              );
          });
        });
    } catch (error) {
      setCategories({ items: [], isLoading: false });
    } finally {
      setCategoryProducts((prevData) => {
        return { ...prevData, isLoading: false };
      });
    }
  }, []);

  function uniqueArray(): any[] {
    const uniqueArray = categoryProducts.items.filter((object, index) => {
      return categoryProducts.items.findIndex((otherObject) => otherObject.title === object.title) === index;
    });
    return uniqueArray;
  }

  function reduceItem(array: any[]): any[] {
    // Check the length of the array.
    if (array.length > 4) {
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
              </div>

              <ProductCardWrapper
                productsList={{ isLoading: categoryProducts?.isLoading, items: reduceItem(row?.product) }}
                title={''}
                showTopPicks={false}
                showAll={false}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}

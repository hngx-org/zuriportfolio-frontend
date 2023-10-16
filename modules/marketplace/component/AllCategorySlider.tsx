import React from 'react';
import { useState, useEffect } from 'react';
import styles from '././landingpage/productCardWrapper/product-card-wrapper.module.css';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';

//I tried including my types in the index.d.ts but it resulted to merge conflict. I had to do it this way
interface CategoryTypes {
  name: string;
  image: string;
  url: string;
}

function AllCategorySlider() {
  const [categories, setCategories] = useState<CategoryTypes[]>([]);
  const [secondApiData, setSecondApiData] = useState<CategoryTypes[]>([]);

  useEffect(() => {
    // API request to fetch categories
    axios
      .get('https://coral-app-8bk8j.ondigitalocean.app/api/category-name/')
      .then((response) => {
        if (Array.isArray(response.data.categories)) {
          const categoryData = response.data.categories;
          setCategories(categoryData);
          ////////////////////////////////////////////////////////////////////////////////////
          // API request to fetch images based of number of items returned from the categroy API
          axios
            .get('https://coral-app-8bk8j.ondigitalocean.app/api/images/')
            .then((imageResponse) => {
              const numCategories = categoryData.length;
              const slicedSecondApiData = imageResponse.data.slice(0, numCategories);
              setSecondApiData(slicedSecondApiData);
            })
            .catch((error) => {
              console.error('Error fetching second API data:', error);
            });
        } else {
          console.log('All Category slider images and texts not found');
          const err = 'Invalid data format in the response.';
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="allCategoryText  py-10 font-[500] text-xl max-w-[1240px] mx-auto w-full">
      <h1 className="text-[#101928] font-manropeL font-bold md:text-2xl leading-normal">All Categories</h1>
      {categories.length === 0 ? (
        <div className="py-8 px-4 mt-8 text-center rounded-2xl border border-dark-110/20 text-dark-110 font-manropeL text-xl md:text-2xl font-semibold">
          No Category To Show
        </div>
      ) : (
        <div
          className={`allCategorySlider  flex flex-nowrap gap-x-3 mt-10 w-full overflow-x-scroll ${styles['hide-scroll']}`}
        >
          {categories.map((category, index) => (
            <Link
              href={`marketplace/categories/${category.name}`}
              key={index}
              className="imageHolder w-[150px] h-[150px] sm:h-[200px] sm:w-1/3 md:w-1/5 flex-shrink-0 relative cursor-pointer rounded-lg"
            >
              {' '}
              <Image
                width={200}
                height={200}
                src={secondApiData[index]?.url}
                key={index}
                alt={category.name}
                className="w-[100%] h-[100%] object-center object-cover rounded-xl"
              />
              <p
                style={{ color: 'white' }}
                className="text-sm leading-none sm:leading-1 sm:text-[1rem]  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center absolute z-30 p-2"
              >
                {category.name}
              </p>
              <div className="absolute rounded-xl inset-0  flex items-center justify-center bg-black opacity-50 hover:opacity-60 transition-opacity duration-300"></div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
export default AllCategorySlider;

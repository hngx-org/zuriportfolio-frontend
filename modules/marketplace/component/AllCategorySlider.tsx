import React from 'react';
import { useState, useEffect } from 'react';
import styles from '././landingpage/productCardWrapper/product-card-wrapper.module.css';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';

//I tried including my types in the index.d.ts but it resulted to merge conflict. I had to do it this way
interface CategoryTypes {
  name: string;
  image: any;
}

function AllCategorySlider() {
  const [categories, setCategories] = useState<CategoryTypes[]>([]);

  useEffect(() => {
    axios
      .get('https://coral-app-8bk8j.ondigitalocean.app/api/category-name/')
      .then((response) => {
        console.log(response.data);
        if (Array.isArray(response.data.categories)) {
          setCategories(response.data.categories as CategoryTypes[]);
        } else {
          console.error('Invalid data format in the response.');
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="allCategoryText  py-10 font-[500] text-xl max-w-[1240px] mx-auto w-full">
      <h1 className="text-[#101928] font-manropeL font-bold md:text-2xl leading-normal">All Categories</h1>
      <div
        className={`allCategorySlider  flex flex-nowrap gap-x-3 mt-10 w-full overflow-x-scroll ${styles['hide-scroll']}`}
      >
        {categories.map((category, index) => (
          <Link
            href={`marketplace/categories/${category.name}`}
            key={index}
            className="imageHolder  w-1/2 sm:w-1/3 md:w-1/5 flex-shrink-0 relative cursor-pointer rounded-2xl"
          >
            {' '}
            {
              <Image
                width={200}
                height={200}
                src="/"
                alt={category.name}
                className="w-[100%] h-[100%] object-center object-cover rounded-2xl"
              />
            }
            <p
              style={{ color: 'white' }}
              className="text-sm leading-none sm:leading-1 sm:text-[1rem]  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center absolute z-30 p-2  shadow-xl "
            >
              {category.name}
            </p>
            <div className="absolute rounded-2xl inset-0  flex items-center justify-center bg-black opacity-50 hover:opacity-60 transition-opacity duration-300"></div>
          </Link>
        ))}
      </div>
    </div>
  );
}
export default AllCategorySlider;

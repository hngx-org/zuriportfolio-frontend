import React from 'react';
import image1 from '../../../public/assets/AllCategorySlider/image1.jpg';
import image2 from '../../../public/assets/AllCategorySlider/image2.jpg';
import image3 from '../../../public/assets/AllCategorySlider/image3.jpg';
import image4 from '../../../public/assets/AllCategorySlider/image4.jpg';
import image5 from '../../../public/assets/AllCategorySlider/image5.jpg';
import image6 from '../../../public/assets/AllCategorySlider/image6.jpg';
import styles from '././landingpage/productCardWrapper/product-card-wrapper.module.css';
import Image from 'next/image';

//I tried including my types in the index.d.ts but it resulted to merge conflict. I had to do it this way
interface AllCategorySliderTypes {
  id: number;
  image: any;
  text: string;
}
export const data: AllCategorySliderTypes[] = [
  {
    id: 1,
    image: image1,
    text: 'Design & Graphics',
  },
  {
    id: 2,
    image: image2,
    text: 'Development & Programming',
  },
  {
    id: 3,
    image: image3,
    text: 'Content Creation',
  },
  {
    id: 4,
    image: image4,
    text: 'Digital Arts & Media',
  },
  {
    id: 5,
    image: image5,
    text: 'Resume Design',
  },
  {
    id: 6,
    image: image6,
    text: 'Portfolio Design',
  },
  {
    id: 7,
    image: image3,
    text: 'eBooks',
  },
];

function AllCategorySlider() {
  return (
    <div className="allCategoryText  py-10 font-[500] text-xl max-w-[1240px] mx-auto w-full">
      <h1 className="text-[#101928] font-manropeL font-bold md:text-2xl leading-normal">All Categories</h1>
      <div
        className={`allCategorySlider flex flex-nowrap gap-x-3 mt-10 w-full overflow-x-scroll ${styles['hide-scroll']}`}
      >
        {data.map((item) => (
          <div
            key={item.id}
            className="imageHolder  w-1/2 sm:w-1/3 md:w-1/5 flex-shrink-0 relative cursor-pointer rounded-2xl"
          >
            <Image
              src={item.image}
              alt={item.text}
              className="w-[100%] h-[100%] object-center object-cover rounded-2xl"
            />
            <p
              style={{ color: 'white' }}
              className="text-sm leading-none sm:leading-1 sm:text-[1rem]  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center absolute z-30 p-2  shadow-xl "
            >
              {item.text}
            </p>
            <div className="absolute rounded-2xl inset-0  flex items-center justify-center bg-black opacity-70 hover:opacity-80 transition-opacity duration-300"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default AllCategorySlider;

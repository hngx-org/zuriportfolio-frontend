import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { ArrowRight2 } from 'iconsax-react';
import Image from 'next/image';

import { AllCategoryDetails } from '../../@types';

// Define an array of possible tags
const tags = ['Top Picks', 'Discount', 'Limited Offer'];

// Function to randomly select a tag from the array
function getRandomTag() {
  const randomIndex = Math.floor(Math.random() * tags.length);
  return tags[randomIndex];
}

interface ProductCardProps {
  AllCategoryDetails: ProductDetails;
  showTopPicks: boolean;
  showDiscount: boolean;
  showLimitedOffer: boolean;
  discount: number;
}

type ProductDetails = {
  imageUrl: string;
  name: string;
  price: string;
  author: string;
  // Add other properties if needed
};

const dummyData: AllCategoryDetails[] = [
  {
    imageUrl: '/assets/images/categories-details-assets/Image.png',
    name: 'Webinar and Course Slide Template',
    price: '$100',
    author: 'Mark Essien',
    showLimitedOffer: false,
    showTopPicks: true,
    showDiscount: true,
    discount: 60,
  },
  {
    imageUrl: '/assets/images/categories-details-assets/Image-1.png',
    name: 'Webinar and Course Slide Template',
    price: '$100',
    author: 'Mark Essien',
    showLimitedOffer: false,
    showTopPicks: true,
    showDiscount: false,
    discount: 0,
  },
  {
    imageUrl: '/assets/images/categories-details-assets/Image-2.png',
    name: 'Webinar and Course Slide Template',
    price: '$100',
    author: 'Mark Essien',
    showLimitedOffer: false,
    showTopPicks: true,
    showDiscount: false,
    discount: 0,
  },
  {
    imageUrl: '/assets/images/categories-details-assets/Image-3.png',
    name: 'Webinar and Course Slide Template',
    price: '$100',
    author: 'Mark Essien',
    showLimitedOffer: false,
    showTopPicks: true,
    showDiscount: false,
    discount: 0,
  },
  {
    imageUrl: '/assets/images/categories-details-assets/Image-4.png',
    name: 'Webinar and Course Slide Template',
    price: '$100',
    author: 'Mark Essien',
    showLimitedOffer: false,
    showTopPicks: true,
    showDiscount: false,
    discount: 0,
  },
  {
    imageUrl: '/assets/images/categories-details-assets/Image-5.png',
    name: 'Webinar and Course Slide Template',
    price: '$100',
    author: 'Mark Essien',
    showLimitedOffer: false,
    showTopPicks: true,
    showDiscount: false,
    discount: 0,
  },
  {
    imageUrl: '/assets/images/categories-details-assets/Image-6.png',
    name: 'Webinar and Course Slide Template',
    price: '$100',
    author: 'Mark Essien',
    showLimitedOffer: false,
    showTopPicks: true,
    showDiscount: false,
    discount: 0,
  },
  {
    imageUrl: '/assets/images/categories-details-assets/Image-7.png',
    name: 'Webinar and Course Slide Template',
    price: '$100',
    author: 'Mark Essien',
    showLimitedOffer: false,
    showTopPicks: true,
    showDiscount: false,
    discount: 0,
  },
  {
    imageUrl: '/assets/images/categories-details-assets/Image-8.png',
    name: 'Webinar and Course Slide Template',
    price: '$100',
    author: 'Mark Essien',
    showLimitedOffer: false,
    showTopPicks: true,
    showDiscount: false,
    discount: 0,
  },
  {
    imageUrl: '/assets/images/categories-details-assets/Image-9.png',
    name: 'Webinar and Course Slide Template',
    price: '$100',
    author: 'Mark Essien',
    showLimitedOffer: false,
    showTopPicks: true,
    showDiscount: false,
    discount: 0,
  },
  {
    imageUrl: '/assets/images/categories-details-assets/Image-10.png',
    name: 'Webinar and Course Slide Template',
    price: '$100',
    author: 'Mark Essien',
    showLimitedOffer: false,
    showTopPicks: true,
    showDiscount: false,
    discount: 0,
  },
  {
    imageUrl: '/assets/images/categories-details-assets/Image-11.png',
    name: 'Webinar and Course Slide Template',
    price: '$100',
    author: 'Mark Essien',
    showLimitedOffer: false,
    showTopPicks: true,
    showDiscount: false,
    discount: 0,
  },
];

function getLabel(showTopPicks: boolean, showDiscount: boolean, showLimitedOffer: boolean, discount: number) {
  const labels = [];

  if (showTopPicks) {
    labels.push(
      <div
        key="top-picks"
        className="absolute w-[100px] h-[36px] bg-gray-400 rounded-[8px] flex items-center justify-center tracking-[0.4%] text-white-100 font-manropeL font-semibold text-[12px]"
      >
        Top Picks
      </div>,
    );
  }

  if (showDiscount) {
    labels.push(
      <div
        key="discount"
        className="absolute w-[100px] h-[36px] bg-brand-green-shade80 rounded-[8px] flex items-center justify-center text-green-6000 tracking-[0.4%] font-manropeL font-semibold text-[12px]"
      >
        {`${60}% Off`}
      </div>,
    );
  }

  if (showLimitedOffer) {
    labels.push(
      <div
        key="limited-offer"
        className="absolute w-[100px] h-[36px] bg-green-30 rounded-[8px] flex items-center justify-center text-orange-500 tracking-[0.4%] font-manropeL font-semibold text-[12px]"
      >
        Limited Offer
      </div>,
    );
  }

  const randomLabel = labels[Math.floor(Math.random() * labels.length)];

  return randomLabel || null;
}

const ProductCard = ({
  AllCategoryDetails,
  showTopPicks,
  showDiscount,
  showLimitedOffer,
  discount,
}: ProductCardProps) => {
  return (
    <div className="flex flex-col content-center max-sm:p-[12px] md:p-[14px] lg:p-[16px] border-[1px] rounded-[8px] max-w-full border-custom-color18 relative">
      {getLabel(showTopPicks, showDiscount, showLimitedOffer, discount)}
      <div className="w-full h-auto rounded-[9px]">
        <Image
          className="w-full"
          src={AllCategoryDetails.imageUrl}
          alt={AllCategoryDetails.name}
          width={200}
          height={209}
        />
      </div>
      <h2 className=" mt-[8px] max-sm:text-[13px] md:text-[15px] lg:text-[16px] leading-[20px] tracking-[0.1%] font-normal font-manropeL text-dark-500 capitalize max-w-full overflow-hidden whitespace-nowrap overflow-ellipsis">
        {AllCategoryDetails.name}
      </h2>
      <p className="mt-[6px] font-bold max-sm:text-[16px] md:text-[17px] lg:text-[18px] leading-[24.59px] text-dark-500 font-manropeEB">
        {AllCategoryDetails.price}
      </p>
      <p className=" mt-[10px] font-normal font-manropeL max-sm:text-[12px] md:text-[14px] lg:text-[14px] leading-[20px] tracking-[0.25%] text-gray-400">
        By: <span className=" underline">{AllCategoryDetails.author}</span>
      </p>
      <div className="w-full flex content-center items-center gap-[2px] mt-[15px] ">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <g clipPath="url(#clip0_5203_12755)">
            <path
              d="M8.0002 11.5133L11.4469 13.5933C11.7002 13.7466 12.0135 13.52 11.9469 13.2333L11.0335 9.31331L14.0735 6.67998C14.2935 6.48665 14.1802 6.11998 13.8802 6.09331L9.87353 5.75331L8.30687 2.05998C8.19353 1.78665 7.80687 1.78665 7.69353 2.05998L6.12687 5.75331L2.1202 6.09331C1.82687 6.11998 1.70687 6.48665 1.93353 6.67998L4.97353 9.31331L4.0602 13.2333C3.99353 13.52 4.30687 13.7466 4.5602 13.5933L8.0002 11.5133Z"
              fill="#E5B800"
            />
          </g>
          <defs>
            <clipPath id="clip0_5203_12755">
              <rect width="16" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <g clipPath="url(#clip0_5203_12755)">
            <path
              d="M8.0002 11.5133L11.4469 13.5933C11.7002 13.7466 12.0135 13.52 11.9469 13.2333L11.0335 9.31331L14.0735 6.67998C14.2935 6.48665 14.1802 6.11998 13.8802 6.09331L9.87353 5.75331L8.30687 2.05998C8.19353 1.78665 7.80687 1.78665 7.69353 2.05998L6.12687 5.75331L2.1202 6.09331C1.82687 6.11998 1.70687 6.48665 1.93353 6.67998L4.97353 9.31331L4.0602 13.2333C3.99353 13.52 4.30687 13.7466 4.5602 13.5933L8.0002 11.5133Z"
              fill="#E5B800"
            />
          </g>
          <defs>
            <clipPath id="clip0_5203_12755">
              <rect width="16" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <g clipPath="url(#clip0_5203_12755)">
            <path
              d="M8.0002 11.5133L11.4469 13.5933C11.7002 13.7466 12.0135 13.52 11.9469 13.2333L11.0335 9.31331L14.0735 6.67998C14.2935 6.48665 14.1802 6.11998 13.8802 6.09331L9.87353 5.75331L8.30687 2.05998C8.19353 1.78665 7.80687 1.78665 7.69353 2.05998L6.12687 5.75331L2.1202 6.09331C1.82687 6.11998 1.70687 6.48665 1.93353 6.67998L4.97353 9.31331L4.0602 13.2333C3.99353 13.52 4.30687 13.7466 4.5602 13.5933L8.0002 11.5133Z"
              fill="#E5B800"
            />
          </g>
          <defs>
            <clipPath id="clip0_5203_12755">
              <rect width="16" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <g clipPath="url(#clip0_5203_12758)">
            <path
              d="M14.6663 6.16004L9.87301 5.74671L7.99967 1.33337L6.12634 5.75337L1.33301 6.16004L4.97301 9.31337L3.87967 14L7.99967 11.5134L12.1197 14L11.033 9.31337L14.6663 6.16004ZM7.99967 10.2667L5.49301 11.78L6.15967 8.92671L3.94634 7.00671L6.86634 6.75337L7.99967 4.06671L9.13967 6.76004L12.0597 7.01337L9.84634 8.93337L10.513 11.7867L7.99967 10.2667Z"
              fill="#E5B800"
            />
          </g>
          <defs>
            <clipPath id="clip0_5203_12758">
              <rect width="16" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <g clipPath="url(#clip0_5203_12758)">
            <path
              d="M14.6663 6.16004L9.87301 5.74671L7.99967 1.33337L6.12634 5.75337L1.33301 6.16004L4.97301 9.31337L3.87967 14L7.99967 11.5134L12.1197 14L11.033 9.31337L14.6663 6.16004ZM7.99967 10.2667L5.49301 11.78L6.15967 8.92671L3.94634 7.00671L6.86634 6.75337L7.99967 4.06671L9.13967 6.76004L12.0597 7.01337L9.84634 8.93337L10.513 11.7867L7.99967 10.2667Z"
              fill="#E5B800"
            />
          </g>
          <defs>
            <clipPath id="clip0_5203_12758">
              <rect width="16" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <p className=" text-[14px] font-semibold font-manropeL leading-[20px] tracking-[0.035px]">(3)</p>
      </div>
    </div>
  );
};

// Shuffle function to randomize the array
function shuffleArray<T>(array: T[]): T[] {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

// Shuffle the entire dummyData array
const shuffledData = shuffleArray(dummyData);
const anotherShuffledData = shuffleArray(dummyData);
const yetAnotherShuffledData = shuffleArray(dummyData);
const fourthShuffleData = shuffleArray(dummyData);
const lastShuffleData = shuffleArray(dummyData);

// Display a random set of 4 items from the shuffled data
const graphicDesign = shuffledData.slice(0, 4);
const illustration = anotherShuffledData.slice(0, 4);
const logoDesign = yetAnotherShuffledData.slice(0, 4);
const brandingAssets = fourthShuffleData.slice(0, 4);
const designElements = lastShuffleData.slice(0, 4);

interface CategoryAllDetailsProps {
  category: string;
}

const CategoryAllDetails: React.FC<CategoryAllDetailsProps> = ({ category }) => {
  const [products, setProducts] = useState<AllCategoryDetails[]>([]);

  useEffect(() => {
    axios
      .get(`/api/products/${category}`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [category]);

  // Set your label conditions here for each product card
  const showTopPicks = false; // Set based on your condition
  const showDiscount = true; // Set based on your condition
  const showLimitedOffer = false; // Set based on your condition
  const discount = 10; // Set based on your discount value

  return (
    <>
      <div className="w-full max-sm:px-4 md:px-4 md:max-w-full lg:max-w-[1240px] mx-auto relative h-auto flex flex-col items-center justify-center gap-[80px] py-[50px] ">
        <section className="w-full h-auto flex flex-col content-center max-sm:gap-[20px] md:gap-[25px] lg:gap-[30px]">
          <div className="w-full flex flex-row content-center items-center justify-between">
            <h1 className=" sm:text-[20px] md:text-[24px] lg:text-[28px] font-semibold font-manropeL leading-[30px] text-dark-500">
              Graphics Design Templates
            </h1>
            <p className="max-sm:text-[13px]  font-manropeL flex flex-row content-center items-center gap-[5px] md:text-[14px] lg:text-[14px] font-semibold leading-[20px] text-green-600">
              View all
              <ArrowRight2 color="#00894c" size={15} />
            </p>
          </div>
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 max-sm:gap-[10px] lg:gap-[30px] md:gap-[24px]">
            {graphicDesign.map((AllCategoryDetails, index) => (
              <ProductCard
                key={index}
                AllCategoryDetails={AllCategoryDetails}
                showTopPicks={index === 0}
                showDiscount={false}
                showLimitedOffer={index === 2}
                discount={discount}
              />
            ))}
          </div>
        </section>
        <section className="w-full h-auto flex flex-col content-center max-sm:gap-[20px] md:gap-[25px] lg:gap-[30px]">
          <div className="w-full flex flex-row content-center items-center justify-between">
            <h1 className=" sm:text-[20px] md:text-[24px] lg:text-[28px] font-semibold font-manropeL leading-[30px] text-dark-500">
              Illustration
            </h1>
            <p className="max-sm:text-[13px]  font-manropeL flex flex-row content-center items-center gap-[5px] md:text-[14px] lg:text-[14px] font-semibold leading-[20px] text-green-600">
              View all
              <ArrowRight2 color="#00894c" size={15} />
            </p>
          </div>
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 rounded-[9px] max-sm:gap-[10px] lg:gap-[30px] md:gap-[24px]">
            {illustration.map((AllCategoryDetails, index) => (
              <ProductCard
                key={index}
                AllCategoryDetails={AllCategoryDetails}
                showTopPicks={false}
                showDiscount={false}
                showLimitedOffer={index === 2}
                discount={discount}
              />
            ))}
          </div>
        </section>
        <section className="w-full h-auto flex flex-col content-center max-sm:gap-[20px] md:gap-[25px] lg:gap-[30px]">
          <div className="w-full flex flex-row content-center items-center justify-between">
            <h1 className=" sm:text-[20px] md:text-[24px] lg:text-[28px] font-semibold font-manropeL leading-[30px] text-dark-500">
              Logo Design
            </h1>
            <p className="max-sm:text-[13px]  font-manropeL flex flex-row content-center items-center gap-[5px] md:text-[14px] lg:text-[14px] font-semibold leading-[20px] text-green-600">
              View all
              <ArrowRight2 color="#00894c" size={15} />
            </p>
          </div>
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 max-sm:gap-[10px] lg:gap-[30px] md:gap-[24px]">
            {logoDesign.map((AllCategoryDetails, index) => (
              <ProductCard
                key={index}
                AllCategoryDetails={AllCategoryDetails}
                showTopPicks={index === 0}
                showDiscount={index === 3}
                showLimitedOffer={index === 2}
                discount={discount}
              />
            ))}
          </div>
        </section>
        <section className="w-full h-auto flex flex-col content-center max-sm:gap-[20px] md:gap-[25px] lg:gap-[30px]">
          <div className="w-full flex flex-row content-center items-center justify-between">
            <h1 className=" sm:text-[20px] md:text-[24px] lg:text-[28px] font-semibold font-manropeL leading-[30px] text-dark-500">
              Branding Assets
            </h1>
            <p className="max-sm:text-[13px]  font-manropeL flex flex-row content-center items-center gap-[5px] md:text-[14px] lg:text-[14px] font-semibold leading-[20px] text-green-600">
              View all
              <ArrowRight2 color="#00894c" size={15} />
            </p>
          </div>
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 max-sm:gap-[10px] lg:gap-[30px] md:gap-[24px]">
            {brandingAssets.map((AllCategoryDetails, index) => (
              <ProductCard
                key={index}
                AllCategoryDetails={AllCategoryDetails}
                showTopPicks={index === 1}
                showDiscount={false}
                showLimitedOffer={index === 0}
                discount={discount}
              />
            ))}
          </div>
        </section>
        <section className="w-full h-auto flex flex-col content-center max-sm:gap-[20px] md:gap-[25px] lg:gap-[30px]">
          <div className="w-full flex flex-row content-center items-center justify-between">
            <h1 className=" sm:text-[20px] md:text-[24px] lg:text-[28px] font-semibold font-manropeL leading-[30px] text-dark-500">
              Ui/Ux Design Elements
            </h1>
            <p className="max-sm:text-[13px]  font-manropeL flex flex-row content-center items-center gap-[5px] md:text-[14px] lg:text-[14px] font-semibold leading-[20px] text-green-600">
              View all
              <ArrowRight2 color="#00894c" size={15} />
            </p>
          </div>
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 max-sm:gap-[10px] lg:gap-[30px] md:gap-[24px]">
            {designElements.map((AllCategoryDetails, index) => (
              <ProductCard
                key={index}
                AllCategoryDetails={AllCategoryDetails}
                showTopPicks={index === 0}
                showDiscount={false}
                showLimitedOffer={index === 2}
                discount={discount}
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default CategoryAllDetails;

//filled//

{
  /* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <g clipPath="url(#clip0_5203_12755)">
    <path
      d="M8.0002 11.5133L11.4469 13.5933C11.7002 13.7466 12.0135 13.52 11.9469 13.2333L11.0335 9.31331L14.0735 6.67998C14.2935 6.48665 14.1802 6.11998 13.8802 6.09331L9.87353 5.75331L8.30687 2.05998C8.19353 1.78665 7.80687 1.78665 7.69353 2.05998L6.12687 5.75331L2.1202 6.09331C1.82687 6.11998 1.70687 6.48665 1.93353 6.67998L4.97353 9.31331L4.0602 13.2333C3.99353 13.52 4.30687 13.7466 4.5602 13.5933L8.0002 11.5133Z"
      fill="#E5B800"
    />
  </g>
  <defs>
    <clipPath id="clip0_5203_12755">
      <rect width="16" height="16" fill="white" />
    </clipPath>
  </defs>
</svg>; */
}

// outline //

{
  /* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <g clipPath="url(#clip0_5203_12758)">
    <path d="M14.6663 6.16004L9.87301 5.74671L7.99967 1.33337L6.12634 5.75337L1.33301 6.16004L4.97301 9.31337L3.87967 14L7.99967 11.5134L12.1197 14L11.033 9.31337L14.6663 6.16004ZM7.99967 10.2667L5.49301 11.78L6.15967 8.92671L3.94634 7.00671L6.86634 6.75337L7.99967 4.06671L9.13967 6.76004L12.0597 7.01337L9.84634 8.93337L10.513 11.7867L7.99967 10.2667Z" fill="#E5B800"/>
  </g>
  <defs>
    <clipPath id="clip0_5203_12758">
      <rect width="16" height="16" fill="white"/>
    </clipPath>
  </defs>
</svg> */
}

import React from 'react';
import ProductCard from '../component/ProductCard';
import { MarketPlaceProductCardProps } from '../../../@types';
import ProductCardWrapper from '../component/landingpage/productCardWrapper/product-card-wrapper';
import Link from 'next/link';
import ProductDetails from '../../../pages/marketplace/product-details';

interface ProductCardWrapperProps {
  productsList: ProductData[];
  title: string;
  labelText: string;
}

interface ProductData {
  id: string;
  currency: string;
  image_url: string | null;
  name: string;
  price: number;
  user: string;
  rating: number;
  showLimitedOffer?: boolean;
  showTopPicks?: boolean;
  showDiscount?: boolean;
  discount?: number;
}

export default function AllCategoriesPage() {
  // Sample product data (you can replace this with your actual data)
  const products: MarketPlaceProductCardProps[] = [
    {
      id: '1',
      image_url: '/assets/products-banner/Image-1.png',
      name: 'Webinar and Course Slide Templa...',
      price: 100,
      user: 'Mark Essien',
      rating: 3,
      showLimitedOffer: false,
      showTopPicks: true,
      showDiscount: false,
      discount_price: 60,
      currency: 'USD',
    },

    {
      id: '1',
      image_url: '/assets/products-banner/Image-2.png',
      name: 'Webinar and Course Slide Templa...',
      price: 120.0,
      currency: 'USD',
      user: 'Mark Essien',
      rating: 3,
      showLimitedOffer: false,
      showTopPicks: false,
      showDiscount: false,
      discount_price: 60,
    },
    {
      id: '1',
      image_url: '/assets/products-banner/Image-3.png',
      name: 'Webinar and Course Slide Templa...',
      price: 120.0,
      currency: 'USD',
      user: 'Mark Essien',
      rating: 3,
      showLimitedOffer: false,
      showTopPicks: true,
      showDiscount: false,
      discount_price: 60,
    },
    {
      id: '1',
      image_url: '/assets/products-banner/Image-4.png',
      name: 'Webinar and Course Slide Templa...',
      price: 120.0,
      currency: 'USD',
      user: 'Mark Essien',
      rating: 3,
      showLimitedOffer: false,
      showTopPicks: true,
      showDiscount: false,
      discount_price: 60,
    },
    {
      id: '1',
      image_url: '/assets/products-banner/Image-8.png',
      name: 'Webinar and Course Slide Templa...',
      price: 120.0,
      currency: 'USD',
      user: 'Mark Essien',
      rating: 3,
      showLimitedOffer: false,
      showTopPicks: false,
      showDiscount: false,
      discount_price: 60,
    },
    {
      id: '1',
      image_url: '/assets/products-banner/Image-9.png',
      name: 'Webinar and Course Slide Templa...',
      price: 120.0,
      currency: 'USD',
      user: 'Mark Essien',
      rating: 3,
      showLimitedOffer: false,
      showTopPicks: false,
      showDiscount: true,
      discount_price: 60,
    },
    {
      id: '1',
      image_url: '/assets/products-banner/Image-10.png',
      name: 'Webinar and Course Slide Templa...',
      price: 120.0,
      currency: 'USD',
      user: 'Mark Essien',
      rating: 3,
      showLimitedOffer: false,
      showTopPicks: false,
      showDiscount: false,
      discount_price: 60,
    },
    {
      id: '1',
      image_url: '/assets/products-banner/Image-11.png',
      name: 'Webinar and Course Slide Templa...',
      price: 120.0,
      currency: 'USD',
      user: 'Mark Essien',
      rating: 3,
      showLimitedOffer: false,
      showTopPicks: false,
      showDiscount: true,
      discount_price: 60,
    },
    {
      id: '1',
      image_url: '/assets/products-banner/Image-5.png',
      name: 'Webinar and Course Slide Templa...',
      price: 120.0,
      currency: 'USD',
      user: 'Mark Essien',
      rating: 3,
      showLimitedOffer: false,
      showTopPicks: false,
      showDiscount: false,
      discount_price: 60,
    },
    {
      id: '1',
      image_url: '/assets/products-banner/Image-4.png',
      name: 'Webinar and Course Slide Templa...',
      price: 120.0,
      currency: 'USD',
      user: 'Mark Essien',
      rating: 3,
      showLimitedOffer: false,
      showTopPicks: false,
      showDiscount: false,
      discount_price: 60,
    },
    {
      id: '1',
      image_url: '/assets/products-banner/Image-6.png',
      name: 'Webinar and Course Slide Templa...',
      price: 120.0,
      currency: 'USD',
      user: 'Mark Essien',
      rating: 3,
      showLimitedOffer: false,
      showTopPicks: false,
      showDiscount: false,
      discount_price: 60,
    },
    {
      id: '1',
      image_url: '/assets/products-banner/Image-7.png',
      name: 'Webinar and Course Slide Templa...',
      price: 120.0,
      currency: 'USD',
      user: 'Mark Essien',
      rating: 3,
      showLimitedOffer: false,
      showTopPicks: false,
      showDiscount: false,
      discount_price: 60,
    },
    {
      id: '1',
      image_url: '/assets/products-banner/Image-8.png',
      name: 'Webinar and Course Slide Templa...',
      price: 120.0,
      currency: 'USD',
      user: 'Mark Essien',
      rating: 3,
      showLimitedOffer: false,
      showTopPicks: false,
      showDiscount: false,
      discount_price: 60,
    },
    {
      id: '1',
      image_url: '/assets/products-banner/Image-9.png',
      name: 'Webinar and Course Slide Templa...',
      price: 120.0,
      currency: 'USD',
      user: 'Mark Essien',
      rating: 3,
      showLimitedOffer: false,
      showTopPicks: false,
      showDiscount: true,
      discount_price: 60,
    },

    {
      id: '1',
      image_url: '/assets/products-banner/Image-10.png',
      name: 'Webinar and Course Slide Templa...',
      price: 120.0,
      currency: 'USD',
      user: 'Mark Essien',
      rating: 3,
      showLimitedOffer: false,
      showTopPicks: false,
      showDiscount: false,
      discount_price: 60,
    },

    {
      id: '1',
      image_url: '/assets/products-banner/Image-11.png',
      name: 'Webinar and Course Slide Templa...',
      price: 120.0,
      currency: 'USD',
      user: 'Mark Essien',
      rating: 3,
      showLimitedOffer: false,
      showTopPicks: false,
      showDiscount: true,
      discount_price: 60,
    },

    {
      id: '1',
      image_url: '/assets/products-banner/Image-5.png',
      name: 'Webinar and Course Slide Templa...',
      price: 120.0,
      currency: 'USD',
      user: 'Mark Essien',
      rating: 3,
      showLimitedOffer: false,
      showTopPicks: false,
      showDiscount: false,
      discount_price: 60,
    },

    {
      id: '1',
      image_url: '/assets/products-banner/Image-4.png',
      name: 'Webinar and Course Slide Templa...',
      price: 120.0,
      currency: 'USD',
      user: 'Mark Essien',
      rating: 3,
      showLimitedOffer: true,
      showTopPicks: false,
      showDiscount: false,
      discount_price: 60,
    },

    {
      id: '1',
      image_url: '/assets/products-banner/Image-6.png',
      name: 'Webinar and Course Slide Templa...',
      price: 120.0,
      currency: 'USD',
      user: 'Mark Essien',
      rating: 3,
      showLimitedOffer: false,
      showTopPicks: false,
      showDiscount: false,
      discount_price: 60,
    },

    {
      id: '1',
      image_url: '/assets/products-banner/Image-7.png',
      name: 'Webinar and Course Slide Templa...',
      price: 120.0,
      currency: 'USD',
      user: 'Mark Essien',
      rating: 3,
      showLimitedOffer: false,
      showTopPicks: false,
      showDiscount: false,
      discount_price: 60,
    },
    {
      id: '1',
      image_url: '/assets/products-banner/Image-9.png',
      name: 'Webinar and Course Slide Templa...',
      price: 120.0,
      currency: 'USD',
      user: 'Mark Essien',
      rating: 3,
      showLimitedOffer: false,
      showTopPicks: false,
      showDiscount: true,
      discount_price: 60,
    },
    {
      id: '1',
      image_url: '/assets/products-banner/Image-4.png',
      name: 'Webinar and Course Slide Templa...',
      price: 120.0,
      currency: 'USD',
      user: 'Mark Essien',
      rating: 3,
      showLimitedOffer: false,
      showTopPicks: false,
      showDiscount: false,
      discount_price: 60,
    },
    {
      id: '1',
      image_url: '/assets/products-banner/Image-7.png',
      name: 'Webinar and Course Slide Templa...',
      price: 120.0,
      currency: 'USD',
      user: 'Mark Essien',
      rating: 3,
      showLimitedOffer: false,
      showTopPicks: false,
      showDiscount: true,
      discount_price: 60,
    },
    {
      id: '1',
      image_url: '/assets/products-banner/Image-3.png',
      name: 'Webinar and Course Slide Templa...',
      price: 120.0,
      currency: 'USD',
      user: 'Mark Essien',
      rating: 3,
      showLimitedOffer: false,
      showTopPicks: true,
      showDiscount: false,
      discount_price: 60,
    },
  ];

  // Array of paragraph texts for each row
  const paragraphTexts = [
    'Design & Graphics',
    'Development & Programming',
    'Content Creation & Education',
    'Degital Arts & Media',
    'Audio & Sound',
    'Photography',
  ];

  const labelTExt = ['+5,000,000', '+2,050,000', '+550,000', '+150,000', '+50,000', '+25,000'];

  // Function to group products into rows
  const groupProductsIntoRows = (products: MarketPlaceProductCardProps[], itemsPerRow: number) => {
    const rows: MarketPlaceProductCardProps[][] = [];
    for (let i = 0; i < products.length; i += itemsPerRow) {
      rows.push(products.slice(i, i + itemsPerRow));
    }
    return rows;
  };

  const itemsPerRow: number = 4; // Number of cards per row on larger screens
  const productRows: MarketPlaceProductCardProps[][] = groupProductsIntoRows(products, itemsPerRow);

  return (
    <div className="category">
      {productRows.map((row, index) => (
        <div key={index} className="">
          <div className="flex gap-6">
            <div className="text-custom-color31 font-manropeL mb-5 md:mb-8 font-bold md:text-2xl leading-normal ">
              {paragraphTexts[index]}
            </div>
            <div className="text-neutral-400 text-base font-semibold font-Manrope md:mb-8 leading-normal tracking-tight pt-2">
              {labelTExt[index]}
            </div>
          </div>
          <ProductCardWrapper productsList={row} title={''} showTopPicks={false} showAll={true} />
        </div>
      ))}
    </div>
  );
}

import React from 'react';
import ProductCardWrapper from '@modules/marketplace/component/landingpage/productCardWrapper/product-card-wrapper';
import { MarketPlaceProductCardProps } from '../../../../@types';

const handPicked: MarketPlaceProductCardProps[] = [
  {
    id: '1',
    currency: 'USD',
    image: '/assets/products-banner/Image-1.png',
    name: 'Webinar and Course Slide Templa...',
    price: 100,
    user: 'Mark Essien',
    rating: 3,
    showLimitedOffer: false,
    showTopPicks: true,
    showDiscount: false,
    discount_price: 0,
  },
  {
    id: '1',
    currency: 'USD',
    image: '/assets/products-banner/Image-2.png',
    name: 'Webinar and Course Slide Templa...',
    price: 100,
    user: 'Mark Essien',
    rating: 3,
    showLimitedOffer: false,
    showTopPicks: true,
    showDiscount: false,
    discount_price: 0,
  },
  {
    id: '1',
    currency: 'USD',
    image: '/assets/products-banner/Image-3.png',
    name: 'Webinar and Course Slide Templa...',
    price: 100,
    user: 'Mark Essien',
    rating: 3,
    showLimitedOffer: false,
    showTopPicks: true,
    showDiscount: false,
    discount_price: 0,
  },
  {
    id: '1',
    currency: 'USD',
    image: '/assets/products-banner/Image-4.png',
    name: 'Webinar and Course Slide Templa...',
    price: 100,
    user: 'Mark Essien',
    rating: 3,
    showLimitedOffer: false,
    showTopPicks: true,
    showDiscount: false,
    discount_price: 0,
  },
];

const CategoriesPage = () => {
  return (
    <>
      <ProductCardWrapper
        title="Graphics Design Template"
        productsList={handPicked}
        showTopPicks={false}
        showAll={true}
      />
      <ProductCardWrapper title="Illustration" productsList={handPicked} showTopPicks={false} showAll={true} />
      <ProductCardWrapper title="Logo Design" productsList={handPicked} showTopPicks={false} showAll={true} />
      <ProductCardWrapper title="Branding Assets" productsList={handPicked} showTopPicks={false} showAll={true} />
      <ProductCardWrapper title="UI/UX Design Elements" productsList={handPicked} showTopPicks={false} showAll={true} />
    </>
  );
};

export default CategoriesPage;

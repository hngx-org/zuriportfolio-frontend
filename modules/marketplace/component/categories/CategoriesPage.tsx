import React from 'react';
import ProductCardWrapper from '@modules/marketplace/component/landingpage/productCardWrapper/product-card-wrapper';
import { ProductCardProps } from '../../../../@types';

const handPicked: ProductCardProps[] = [
  {
    id: '1',
    currency: 'USD',
    image: '/assets/products-banner/Image-1.png',
    productName: 'Webinar and Course Slide Templa...',
    productPrice: 100,
    productOwner: 'Mark Essien',
    productRating: 3,
    showLimitedOffer: false,
    showTopPicks: true,
    showDiscount: false,
    discount: 0,
  },
  {
    id: '1',
    currency: 'USD',
    image: '/assets/products-banner/Image-2.png',
    productName: 'Webinar and Course Slide Templa...',
    productPrice: 100,
    productOwner: 'Mark Essien',
    productRating: 3,
    showLimitedOffer: false,
    showTopPicks: true,
    showDiscount: false,
    discount: 0,
  },
  {
    id: '1',
    currency: 'USD',
    image: '/assets/products-banner/Image-3.png',
    productName: 'Webinar and Course Slide Templa...',
    productPrice: 100,
    productOwner: 'Mark Essien',
    productRating: 3,
    showLimitedOffer: false,
    showTopPicks: true,
    showDiscount: false,
    discount: 0,
  },
  {
    id: '1',
    currency: 'USD',
    image: '/assets/products-banner/Image-4.png',
    productName: 'Webinar and Course Slide Templa...',
    productPrice: 100,
    productOwner: 'Mark Essien',
    productRating: 3,
    showLimitedOffer: false,
    showTopPicks: true,
    showDiscount: false,
    discount: 0,
  },
];

const CategoriesPage = () => {
  return (
    <>
      <ProductCardWrapper title="Graphics Design Template" productsList={handPicked} />
      <ProductCardWrapper title="Illustration" productsList={handPicked} />
      <ProductCardWrapper title="Logo Design" productsList={handPicked} />
      <ProductCardWrapper title="Branding Assets" productsList={handPicked} />
      <ProductCardWrapper title="UI/UX Design Elements" productsList={handPicked} />
    </>
  );
};

export default CategoriesPage;

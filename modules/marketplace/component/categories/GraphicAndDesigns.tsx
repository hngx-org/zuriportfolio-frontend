import React from 'react';
import ProductCardWrapper from '@modules/marketplace/component/landingpage/productCardWrapper/product-card-wrapper';
// import React from 'react';
// import MainLayout from '../../../../components/Layout/MainLayout';
// import { ProductCardProps } from '../../../@types';
import { ProductCardProps } from '../../../../@types';
// import MainLayout from '../../../components/Layout/MainLayout';
// import ProductCard from '../ProductCard';
// import ProductCardWrapper from './productCardWrapper/product-card-wrapper';
// import ExperienceCard from './experience-cards/experience-card';

const handPicked: ProductCardProps[] = [
  {
    image: '/assets/products-banner/Image-1.png',
    productName: 'Webinar and Course Slide Templa...',
    productPrice: '100',
    productOwner: 'Mark Essien',
    productRating: 3,
    showLimitedOffer: false,
    showTopPicks: true,
    showDiscount: false,
    discount: 0,
  },
  {
    image: '/assets/products-banner/Image-2.png',
    productName: 'Webinar and Course Slide Templa...',
    productPrice: '100',
    productOwner: 'Mark Essien',
    productRating: 3,
    showLimitedOffer: false,
    showTopPicks: true,
    showDiscount: false,
    discount: 0,
  },
  {
    image: '/assets/products-banner/Image-3.png',
    productName: 'Webinar and Course Slide Templa...',
    productPrice: '100',
    productOwner: 'Mark Essien',
    productRating: 3,
    showLimitedOffer: false,
    showTopPicks: true,
    showDiscount: false,
    discount: 0,
  },
  {
    image: '/assets/products-banner/Image-4.png',
    productName: 'Webinar and Course Slide Templa...',
    productPrice: '100',
    productOwner: 'Mark Essien',
    productRating: 3,
    showLimitedOffer: false,
    showTopPicks: true,
    showDiscount: false,
    discount: 0,
  },
  {
    image: '/assets/products-banner/Image-1.png',
    productName: 'Webinar and Course Slide Templa...',
    productPrice: '100',
    productOwner: 'Mark Essien',
    productRating: 3,
    showLimitedOffer: false,
    showTopPicks: true,
    showDiscount: false,
    discount: 0,
  },
  {
    image: '/assets/products-banner/Image-2.png',
    productName: 'Webinar and Course Slide Templa...',
    productPrice: '100',
    productOwner: 'Mark Essien',
    productRating: 3,
    showLimitedOffer: false,
    showTopPicks: true,
    showDiscount: false,
    discount: 0,
  },
  {
    image: '/assets/products-banner/Image-3.png',
    productName: 'Webinar and Course Slide Templa...',
    productPrice: '100',
    productOwner: 'Mark Essien',
    productRating: 3,
    showLimitedOffer: false,
    showTopPicks: true,
    showDiscount: false,
    discount: 0,
  },
  {
    image: '/assets/products-banner/Image-4.png',
    productName: 'Webinar and Course Slide Templa...',
    productPrice: '100',
    productOwner: 'Mark Essien',
    productRating: 3,
    showLimitedOffer: false,
    showTopPicks: true,
    showDiscount: false,
    discount: 0,
  },
  {
    image: '/assets/products-banner/Image-3.png',
    productName: 'Webinar and Course Slide Templa...',
    productPrice: '100',
    productOwner: 'Mark Essien',
    productRating: 3,
    showLimitedOffer: false,
    showTopPicks: true,
    showDiscount: false,
    discount: 0,
  },
  {
    image: '/assets/products-banner/Image-4.png',
    productName: 'Webinar and Course Slide Templa...',
    productPrice: '100',
    productOwner: 'Mark Essien',
    productRating: 3,
    showLimitedOffer: false,
    showTopPicks: true,
    showDiscount: false,
    discount: 0,
  },
  {
    image: '/assets/products-banner/Image-3.png',
    productName: 'Webinar and Course Slide Templa...',
    productPrice: '100',
    productOwner: 'Mark Essien',
    productRating: 3,
    showLimitedOffer: false,
    showTopPicks: true,
    showDiscount: false,
    discount: 0,
  },
  {
    image: '/assets/products-banner/Image-4.png',
    productName: 'Webinar and Course Slide Templa...',
    productPrice: '100',
    productOwner: 'Mark Essien',
    productRating: 3,
    showLimitedOffer: false,
    showTopPicks: true,
    showDiscount: false,
    discount: 0,
  },
  {
    image: '/assets/products-banner/Image-3.png',
    productName: 'Webinar and Course Slide Templa...',
    productPrice: '100',
    productOwner: 'Mark Essien',
    productRating: 3,
    showLimitedOffer: false,
    showTopPicks: true,
    showDiscount: false,
    discount: 0,
  },
  {
    image: '/assets/products-banner/Image-4.png',
    productName: 'Webinar and Course Slide Templa...',
    productPrice: '100',
    productOwner: 'Mark Essien',
    productRating: 3,
    showLimitedOffer: false,
    showTopPicks: true,
    showDiscount: false,
    discount: 0,
  },
  {
    image: '/assets/products-banner/Image-3.png',
    productName: 'Webinar and Course Slide Templa...',
    productPrice: '100',
    productOwner: 'Mark Essien',
    productRating: 3,
    showLimitedOffer: false,
    showTopPicks: true,
    showDiscount: false,
    discount: 0,
  },
  {
    image: '/assets/products-banner/Image-4.png',
    productName: 'Webinar and Course Slide Templa...',
    productPrice: '100',
    productOwner: 'Mark Essien',
    productRating: 3,
    showLimitedOffer: false,
    showTopPicks: true,
    showDiscount: false,
    discount: 0,
  },
];

const GraphicAndDesigns = () => {
  return (
    <div className="py-6 px-4 overflow-hidden w-full">
      <div className="text-center ">
        <h1 className="text-4xl mb-3">Graphic Design Template</h1>
        <p className="text-gray-500">
          Level up your presentations with beautiful templates and designs for PowerPoint, Keynote, and Google Slides.
          <br />
          Unleash your inner creative and craft stunning decks.
        </p>
      </div>
      <div className="max-w-[1240px] mx-auto">
        <ProductCardWrapper title="" productsList={handPicked} />
      </div>
    </div>
  );
};

export default GraphicAndDesigns;

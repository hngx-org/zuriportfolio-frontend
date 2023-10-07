import React from 'react';
import MainLayout from '../../../../components/Layout/MainLayout';
import { ProductCardProps } from '../../../../@types';
import ProductCard from '../ProductCard';
import Link from 'next/link';
import Image from 'next/image';
import ProductCardWrapper from './productCardWrapper/product-card-wrapper';
import ExperienceCard from './experience-cards/experience-card';
import Cancel from '../../../../public/assets/recentlyviewed/cancel.svg';
import styles from './productCardWrapper/product-card-wrapper.module.css';
import AllCategorySlider from '../AllCategorySlider';

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
];

const limitedOffers: ProductCardProps[] = [
  {
    image: '/assets/products-banner/Image-5.png',
    productName: 'Webinar and Course Slide Templa...',
    productPrice: '100',
    productOwner: 'Mark Essien',
    productRating: 3,
    showLimitedOffer: false,
    showTopPicks: false,
    showDiscount: false,
    discount: 0,
  },
  {
    image: '/assets/products-banner/Image-4.png',
    productName: 'Webinar and Course Slide Templa...',
    productPrice: '100',
    productOwner: 'Mark Essien',
    productRating: 3,
    showLimitedOffer: true,
    showTopPicks: false,
    showDiscount: false,
    discount: 0,
  },
  {
    image: '/assets/products-banner/Image-6.png',
    productName: 'Webinar and Course Slide Templa...',
    productPrice: '100',
    productOwner: 'Mark Essien',
    productRating: 3,
    showLimitedOffer: false,
    showTopPicks: false,
    showDiscount: false,
    discount: 0,
  },
  {
    image: '/assets/products-banner/Image-7.png',
    productName: 'Webinar and Course Slide Templa...',
    productPrice: '100',
    productOwner: 'Mark Essien',
    productRating: 3,
    showLimitedOffer: false,
    showTopPicks: false,
    showDiscount: false,
    discount: 0,
  },
  {
    image: '/assets/products-banner/Image-5.png',
    productName: 'Webinar and Course Slide Templa...',
    productPrice: '100',
    productOwner: 'Mark Essien',
    productRating: 3,
    showLimitedOffer: false,
    showTopPicks: false,
    showDiscount: false,
    discount: 0,
  },
  {
    image: '/assets/products-banner/Image-4.png',
    productName: 'Webinar and Course Slide Templa...',
    productPrice: '100',
    productOwner: 'Mark Essien',
    productRating: 3,
    showLimitedOffer: true,
    showTopPicks: false,
    showDiscount: false,
    discount: 0,
  },
  {
    image: '/assets/products-banner/Image-6.png',
    productName: 'Webinar and Course Slide Templa...',
    productPrice: '100',
    productOwner: 'Mark Essien',
    productRating: 3,
    showLimitedOffer: false,
    showTopPicks: false,
    showDiscount: false,
    discount: 0,
  },
  {
    image: '/assets/products-banner/Image-7.png',
    productName: 'Webinar and Course Slide Templa...',
    productPrice: '100',
    productOwner: 'Mark Essien',
    productRating: 3,
    showLimitedOffer: false,
    showTopPicks: false,
    showDiscount: false,
    discount: 0,
  },
];

const recentlyViewed: ProductCardProps[] = [
  {
    image: '/assets/recentlyviewed/image1.webp',
    productName: 'Webinar and Course Slide Templa',
    productPrice: '100',
    productOwner: 'Mark Essien',
    productRating: 3,
    showLimitedOffer: true,
    showTopPicks: false,
    showDiscount: true,
    discount: 60,
  },
  {
    image: '/assets/recentlyviewed/image2.webp',
    productName: 'Webinar and Course Slide Templa',
    productPrice: '100',
    productOwner: 'Mark Essien',
    productRating: 3,
    showLimitedOffer: false,
    showTopPicks: false,
    showDiscount: false,
    discount: 0,
  },
  {
    image: '/assets/recentlyviewed/image3.webp',
    productName: 'Webinar and Course Slide Templa',
    productPrice: '100',
    productOwner: 'Mark Essien',
    productRating: 3,
    showLimitedOffer: true,
    showTopPicks: false,
    showDiscount: true,
    discount: 60,
  },
  {
    image: '/assets/recentlyviewed/image4.webp',
    productName: 'Webinar and Course Slide Templa',
    productPrice: '100',
    productOwner: 'Mark Essien',
    productRating: 3,
    showLimitedOffer: true,
    showTopPicks: true,
    showDiscount: true,
    discount: 0,
  },
];

function LandingPage() {
  return (
    <MainLayout activePage="marketplace" showDashboardSidebar={false} showFooter={true} showTopbar={true}>
      <div className="py-6 px-4 overflow-hidden w-full">
        <div className="max-w-[1240px] mx-auto">
          <ProductCardWrapper title="Handpicked For You" productsList={handPicked} />

          <ProductCardWrapper title="Limited Offers" productsList={limitedOffers} />

          <section className="my-6 py-2.5  lg:hidden">
            <h3 className="text-custom-color31 font-manropeL mb-5 md:mb-6 font-bold md:text-2xl leading-normal flex items-center justify-between">
              We provide the <br />
              best customer experience
            </h3>
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-x-11 gap-y-4">
              <ExperienceCard
                title="Aggregated Space"
                content="A Digital mall where different sellers' products are displayed collectively."
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <g clipPath="url(#clip0_2018_175934)">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M1.95657 0.65625C1.62459 0.65625 1.35547 0.925373 1.35547 1.25735C1.35547 1.58933 1.62459 1.85846 1.95657 1.85846C2.44255 1.85846 2.85854 2.20701 2.94361 2.68548L3.38022 5.14095L3.62718 6.57204C3.78197 7.46899 3.90556 8.18519 4.06183 8.75415C4.22279 9.34019 4.43188 9.82482 4.7893 10.2359C5.03458 10.518 5.32224 10.7603 5.64196 10.954C6.10784 11.2363 6.62097 11.3599 7.22584 11.4189C7.81308 11.4761 8.53983 11.4761 9.45001 11.4761H9.73198C10.1362 11.4761 10.4727 11.4761 10.7506 11.4552C11.0414 11.4332 11.3095 11.3862 11.5705 11.2709C11.948 11.104 12.2763 10.8427 12.5236 10.5122C12.6945 10.2837 12.8005 10.033 12.8871 9.75447C12.9698 9.48839 13.0452 9.16044 13.1359 8.76644L13.1473 8.71688C13.2851 8.11788 13.3977 7.62861 13.4522 7.22916C13.5083 6.81844 13.5144 6.43242 13.3868 6.05982C13.2072 5.53564 12.8522 5.08957 12.3816 4.79704C12.0471 4.5891 11.6695 4.50854 11.2567 4.47106C10.8552 4.4346 10.3532 4.43461 9.73854 4.43462H4.47569L4.12726 2.47502C3.94016 1.42277 3.02532 0.65625 1.95657 0.65625ZM4.80659 6.33698L4.68576 5.63682H9.70978C10.3602 5.63682 10.8073 5.63741 11.148 5.66834C11.4835 5.69881 11.6441 5.75416 11.7469 5.81804C11.9822 5.9643 12.1597 6.18734 12.2495 6.44942C12.2887 6.56388 12.3066 6.73278 12.2611 7.06663C12.2148 7.40554 12.1151 7.84146 11.9693 8.47528C11.8724 8.89639 11.8067 9.17987 11.7391 9.39753C11.6737 9.60763 11.6182 9.71548 11.561 9.79193C11.4373 9.95719 11.2732 10.0878 11.0844 10.1713C10.9971 10.2099 10.8796 10.2398 10.6602 10.2564C10.4329 10.2735 10.1419 10.2739 9.70978 10.2739H9.48115C8.5328 10.2739 7.8646 10.2732 7.34246 10.2224C6.83127 10.1725 6.51712 10.0786 6.26499 9.92585C6.05184 9.79669 5.86006 9.63518 5.69654 9.4471C5.5031 9.22462 5.35714 8.93101 5.22111 8.43575C5.08217 7.92987 4.96787 7.27151 4.80659 6.33698Z"
                      className="fill-green-600"
                    />
                    <path
                      d="M6.01402 13.2794C6.429 13.2794 6.7654 12.943 6.7654 12.528C6.7654 12.1131 6.429 11.7767 6.01402 11.7767C5.59905 11.7767 5.26264 12.1131 5.26264 12.528C5.26264 12.943 5.59905 13.2794 6.01402 13.2794Z"
                      className="fill-green-600"
                    />
                    <path
                      d="M12.1753 12.528C12.1753 12.943 11.8389 13.2794 11.424 13.2794C11.009 13.2794 10.6726 12.943 10.6726 12.528C10.6726 12.1131 11.009 11.7767 11.424 11.7767C11.8389 11.7767 12.1753 12.1131 12.1753 12.528Z"
                      className="fill-green-600"
                    />
                    <path
                      d="M13.8836 2.2835C14.1184 2.04876 14.1184 1.66816 13.8836 1.43341C13.6489 1.19867 13.2683 1.19867 13.0336 1.43341L11.8682 2.59879L11.6987 2.42935C11.464 2.1946 11.0834 2.1946 10.8486 2.42935C10.6139 2.6641 10.6139 3.04469 10.8486 3.27944L11.4431 3.87393C11.6779 4.10867 12.0585 4.10867 12.2932 3.87393L13.8836 2.2835Z"
                      className="fill-green-600"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_2018_175934">
                      <rect width="14.4265" height="14.4265" fill="white" transform="translate(0.453125 0.0551758)" />
                    </clipPath>
                  </defs>
                </svg>
              </ExperienceCard>
              <ExperienceCard
                title="Satisfaction Guarantee"
                content="We ensure money-back guarantee for every product."
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
                  <path
                    d="M8.14971 2.45953C5.49387 2.45953 3.34088 4.61252 3.34088 7.26836C3.34088 9.9242 5.49387 12.0772 8.14971 12.0772C10.8056 12.0772 12.9585 9.9242 12.9585 7.26836C12.9585 6.99462 12.9357 6.72666 12.892 6.46616C12.8371 6.13876 13.058 5.82881 13.3854 5.77389C13.7128 5.71896 14.0227 5.93984 14.0777 6.26725C14.1323 6.59321 14.1607 6.92769 14.1607 7.26836C14.1607 10.5882 11.4695 13.2794 8.14971 13.2794C4.8299 13.2794 2.13867 10.5882 2.13867 7.26836C2.13867 3.94856 4.8299 1.25732 8.14971 1.25732C9.10828 1.25732 10.0161 1.48214 10.8216 1.88248C11.1189 2.03022 11.2402 2.39099 11.0924 2.68828C10.9447 2.98558 10.5839 3.10681 10.2866 2.95907C9.64357 2.6395 8.91852 2.45953 8.14971 2.45953Z"
                    className="fill-green-600"
                  />
                  <path
                    d="M12.9585 1.85843C13.2905 1.85843 13.5596 2.12755 13.5596 2.45953V3.06064H14.1607C14.4927 3.06064 14.7618 3.32976 14.7618 3.66174C14.7618 3.99372 14.4927 4.26284 14.1607 4.26284H13.5596V4.86395C13.5596 5.19593 13.2905 5.46505 12.9585 5.46505C12.6266 5.46505 12.3574 5.19593 12.3574 4.86395V4.26284H11.7563C11.4243 4.26284 11.1552 3.99372 11.1552 3.66174C11.1552 3.32976 11.4243 3.06064 11.7563 3.06064H12.3574V2.45953C12.3574 2.12755 12.6266 1.85843 12.9585 1.85843Z"
                    className="fill-green-600"
                  />
                  <path
                    d="M6.52246 9.24773C6.7572 9.01298 7.1378 9.01298 7.37255 9.24773C7.80176 9.67695 8.49766 9.67695 8.92687 9.24773C9.16162 9.01298 9.54221 9.01298 9.77696 9.24773C10.0117 9.48248 10.0117 9.86307 9.77696 10.0978C8.87825 10.9965 7.42116 10.9965 6.52246 10.0978C6.28771 9.86307 6.28771 9.48248 6.52246 9.24773Z"
                    className="fill-green-600"
                  />
                  <path
                    d="M7.06773 5.7656C7.06773 5.26763 6.66404 4.86395 6.16607 4.86395C5.6681 4.86395 5.26442 5.26763 5.26442 5.7656C5.26442 6.26357 5.6681 6.66726 6.16607 6.66726C6.66404 6.66726 7.06773 6.26357 7.06773 5.7656Z"
                    className="fill-green-600"
                  />
                  <path
                    d="M10.1333 4.86395C10.6313 4.86395 11.035 5.26763 11.035 5.7656C11.035 6.26357 10.6313 6.66726 10.1333 6.66726C9.63537 6.66726 9.23169 6.26357 9.23169 5.7656C9.23169 5.26763 9.63537 4.86395 10.1333 4.86395Z"
                    className="fill-green-600"
                  />
                </svg>
              </ExperienceCard>
              <ExperienceCard
                title="Multiple Sellers"
                content="Add to cart from different sellers and checkout in a single transaction."
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.7044 1.25732C7.41798 1.25732 7.1351 1.32056 6.87595 1.44251L3.07398 3.23167C2.23125 3.62825 1.69336 4.47585 1.69336 5.40723V9.67277C1.69336 10.2725 2.03973 10.8183 2.5824 11.0737L6.87595 13.0942C7.1351 13.2162 7.41798 13.2794 7.7044 13.2794C7.99081 13.2794 8.27369 13.2162 8.53284 13.0942L12.8264 11.0737C13.3691 10.8183 13.7154 10.2725 13.7154 9.67277V5.40723C13.7154 4.47585 13.1775 3.62825 12.3348 3.23167L8.53284 1.44251C8.27369 1.32056 7.99081 1.25732 7.7044 1.25732ZM12.5132 8.70017L8.3055 6.59631V2.6642L11.8229 4.31945C12.2443 4.51774 12.5132 4.94154 12.5132 5.40723V8.70017ZM7.7044 7.63986L12.3535 9.96442C12.3411 9.97235 12.3281 9.97955 12.3145 9.98594L8.02094 12.0064C7.92192 12.053 7.81383 12.0772 7.7044 12.0772C7.59496 12.0772 7.48687 12.053 7.38785 12.0064L3.0943 9.98594C3.08073 9.97955 3.06771 9.97235 3.05529 9.96442L7.7044 7.63986ZM7.10329 6.59631L2.89557 8.70017V5.40723C2.89557 4.94154 3.16451 4.51774 3.58588 4.31945L7.10329 2.6642V6.59631Z"
                    className="fill-green-600"
                  />
                </svg>
              </ExperienceCard>
              <ExperienceCard
                title="My Business"
                content="You control the inventory, and manage the description Read More"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.58402 1.55811C6.92006 1.55811 6.38181 2.09635 6.38181 2.76031V3.36142H6.08126C4.75334 3.36142 3.67685 4.43791 3.67685 5.76583V6.74681L2.9725 7.09899C2.12174 7.52436 1.54753 8.45218 1.7466 9.46683C1.83042 9.89407 1.9552 10.3924 2.1406 10.8688C2.32359 11.339 2.58057 11.8271 2.94892 12.1996C3.36879 12.6241 3.82968 12.856 4.32239 12.9421C4.79836 13.0253 5.26648 12.9653 5.69355 12.8741C5.93324 12.823 6.2099 12.7489 6.4742 12.6782C6.64544 12.6323 6.8115 12.5878 6.95896 12.5519C7.37485 12.4505 7.77697 12.378 8.18512 12.378C8.59328 12.378 8.9954 12.4505 9.41128 12.5519C9.55875 12.5878 9.72481 12.6323 9.89605 12.6782C10.1604 12.7489 10.437 12.823 10.6767 12.8741C11.1038 12.9653 11.5719 13.0253 12.0479 12.9421C12.5406 12.856 13.0015 12.6241 13.4213 12.1996C13.7897 11.8271 14.0467 11.339 14.2296 10.8688C14.415 10.3924 14.5398 9.89407 14.6236 9.46683C14.8227 8.45218 14.2485 7.52436 13.3978 7.09899L12.6934 6.74681V5.76583C12.6934 4.43791 11.6169 3.36142 10.289 3.36142H9.98843V2.76031C9.98843 2.09635 9.45019 1.55811 8.78623 1.55811H7.58402ZM7.10984 5.03032L4.87905 6.14571V5.76583C4.87905 5.10187 5.4173 4.56362 6.08126 4.56362H10.289C10.9529 4.56362 11.4912 5.10187 11.4912 5.76583V6.14571L9.26041 5.03032C8.5835 4.69186 7.78675 4.69186 7.10984 5.03032ZM7.64748 6.1056C7.98593 5.93638 8.38431 5.93638 8.72277 6.1056L12.8601 8.17427C13.3035 8.39597 13.5234 8.83018 13.4439 9.23537C13.3684 9.62025 13.2604 10.0445 13.1093 10.4328C12.9558 10.8273 12.7725 11.146 12.5666 11.3542C12.3146 11.6089 12.0774 11.7165 11.841 11.7578C11.5879 11.802 11.296 11.7771 10.9277 11.6984C10.7005 11.6499 10.4943 11.5941 10.2678 11.5329C10.0951 11.4861 9.91049 11.4362 9.69598 11.3839C9.24102 11.273 8.73231 11.1758 8.18512 11.1758C7.63793 11.1758 7.12923 11.273 6.67427 11.3839C6.45973 11.4362 6.27521 11.4861 6.10245 11.5329C5.87601 11.5941 5.66969 11.6499 5.44256 11.6984C5.07422 11.7771 4.78236 11.802 4.52926 11.7578C4.29289 11.7165 4.0556 11.6089 3.80367 11.3542C3.59776 11.146 3.41449 10.8273 3.26096 10.4328C3.10983 10.0445 3.00182 9.62025 2.92631 9.23537C2.84682 8.83018 3.06675 8.39597 3.51014 8.17427L7.64748 6.1056ZM8.78623 3.36142H7.58402V2.76031H8.78623V3.36142Z"
                    className="fill-green-600"
                  />
                </svg>
              </ExperienceCard>
            </ul>
          </section>
        </div>

        <AllCategorySlider />

        <section className="max-w-[1240px] mx-auto w-full mb-2.5 md:mb-8 pt-2.5">
          <h3 className="text-custom-color31 font-manropeL mb-5 md:mb-8 font-bold md:text-2xl leading-normal flex items-center justify-between">
            Recently Viewed
            <Link className="flex items-center gap-2 text-sm font-bold text-brand-green-shade50" href="">
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
          </h3>
          <div
            className={`flex flex-nowrap lg:flex-wrap justify-between gap-y-[70px] mb-[74px] w-full overflow-scroll  ${styles['hide-scroll']}`}
          >
            {recentlyViewed.map((item, index) => {
              return (
                <div key={index} className="relative w-1/2 md:w-1/3 lg:w-1/4 pr-2 md:pr-4 lg:pr-8">
                  <button className="absolute bg-white rounded-full top-4 right-10 p-2">
                    <Image src={Cancel} alt="Cancel Icon" />
                  </button>
                  <ProductCard
                    image={item?.image}
                    productName={item?.productName}
                    productPrice={item?.productPrice}
                    productOwner={item?.productOwner}
                    productRating={item?.productRating}
                    showLimitedOffer={item?.showLimitedOffer}
                    showTopPicks={item?.showTopPicks}
                    showDiscount={item?.showDiscount}
                    discount={item?.discount}
                  />
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </MainLayout>
  );
}

export default LandingPage;

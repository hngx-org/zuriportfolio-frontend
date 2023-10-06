import { FC } from 'react';
import { manropeL, manropeB, manropeEB } from '../../config/font';
import MainLayout from '../../components/Layout/MainLayout';
import Button from '@ui/Button';
import { ProductCardProps } from '../../@types';
import ProductCard from './component/ProductCard';
import { formatNumberWithCommas } from '../../helpers';

const dummyHandPickedData: ProductCardProps[] = [
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

const SpecificSubCategory: FC = () => {
  return (
    <div>
      <MainLayout showDashboardSidebar={false} showFooter={true} showTopbar={true} activePage="marketplace">
        <div className={`${manropeL.className} w-[100%] flex flex-col px-[1rem] mb-[2rem] md:px-[1.5rem] lg:px-[4rem]`}>
          {/* nav component */}
          <nav></nav>
          {/* nav component */}

          <header
            className={`flex flex-col items-center space-y-[0.5rem] mt-[2.5rem] text-center md:mt-[3.5rem] md:space-y-[0.75rem] lg:mt-[5rem] lg:space-y-[1rem]`}
          >
            <h1
              className={`${manropeEB.className} text-green-850 text-[1.375rem] leading-[1.75rem] md:text-[2rem] md:leading-[2.5rem] lg:text-[1.75rem] lg:leading-[2.25rem]`}
            >
              Graphics Design Templates
            </h1>
            <p className="text-white-400 text-[0.75rem] leading-[1.2rem] tracking-[0.003rem] max-w-[21.5625rem] md:max-w-[35rem] md:leading-[1.25rem] md:tracking-[0.00219rem] lg:text-[1.5rem] lg:max-w-[70rem] lg:leading-[2rem]">
              Level up your presentations with beautiful templates and designs for PowerPoint, Keynote, and Google
              Slides. Unleash your inner creative and craft stunning decks.
            </p>
          </header>

          <section className="mt-[2.75rem] mb-[2rem] space-y-[1.5rem] md:mt-[4.5rem] md:mb-[4rem] lg:mt-[6rem] lg:mb-[4.5rem] lg:space-y-[2rem]">
            <div className="flex items-center">
              <div
                aria-label="number of products available"
                className={`${manropeB.className} text-[#052011] text-[1rem] leading-[1.5rem] tracking-[0.005rem] md:text-[1.5rem] md:leading-[2rem] lg:text-[1.75rem] lg:leading-[2.25rem]`}
              >
                {formatNumberWithCommas(57098)} Products
              </div>
              <Button className="border-green-300 border-[1px] text-green-300 rounded-[0.5rem] bg-[#fff] w-[6rem] ml-auto px-[1rem] py-[0.75rem] text-center font-[400] text-[0.75rem] tracking-[0.003rem] md:w-[9.25rem] md:text-[0.875rem] lg:text-[1rem]">
                Filter
              </Button>
            </div>

            <div className="grid grid-cols-2 [grid-column-gap:0.56rem] [grid-row-gap:1.25rem] md:grid-cols-3 md:[grid-column-gap:1.5rem] md:[grid-row-gap:3.25rem] lg:grid-cols-4 lg:[grid-column-gap:2rem] lg:[grid-row-gap:3.75rem] ">
              {dummyHandPickedData.map((item, index) => (
                <ProductCard
                  key={index}
                  image={item.image}
                  productName={item.productName}
                  productPrice={item.productPrice}
                  productOwner={item.productOwner}
                  productRating={item.productRating}
                  discount={item.discount}
                  showDiscount={item.showDiscount}
                  showLimitedOffer={item.showLimitedOffer}
                  showTopPicks={item.showTopPicks}
                />
              ))}
            </div>
          </section>

          {/* Pagination */}
          {/* place here pagination component here.. don't add margin top to move it..i done it already */}
          <div>Pagination component</div>
          {/*  */}
        </div>
      </MainLayout>
    </div>
  );
};
export default SpecificSubCategory;

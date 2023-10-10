import { FC, useState, useEffect } from 'react';
import { manropeL, manropeB, manropeEB } from '../../config/font';
import MainLayout from '../../components/Layout/MainLayout';
import Button from '@ui/Button';
import { ProductCardProps } from '../../@types';
import ProductCard from './component/ProductCard';
import { formatNumberWithCommas } from '../../helpers';
import SearchFilter from './component/filter/search-filter';
import useSearchFilter from './component/filter/hooks/useSearchFilter';

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
];

const SpecificSubCategory: FC = () => {
  const [productCards, setProductCards] = useState<ProductCardProps[]>(dummyHandPickedData);
  const [pageNumber, setPageNumber] = useState(0);
  const [currentPageSet, setCurrentPageSet] = useState(0);

  const usersPerPage = 8;
  const pagesVisited = pageNumber * usersPerPage;
  const totalPages = Math.ceil(productCards.length / usersPerPage);
  const pagesPerSet = 4;

  const { isOpen, toggle} = useSearchFilter()

  useEffect(() => {
    setCurrentPageSet(Math.floor(pageNumber / pagesPerSet));
  }, [pageNumber]);

  const displayProductCards = productCards
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((productCard, index) => (
      <ProductCard
        key={index}
        image={productCard.image}
        productName={productCard.productName}
        productPrice={productCard.productPrice}
        productOwner={productCard.productOwner}
        productRating={productCard.productRating}
        discount={productCard.discount}
        showDiscount={productCard.showDiscount}
        showLimitedOffer={productCard.showLimitedOffer}
        showTopPicks={productCard.showTopPicks}
      />
    ));

  const nextPage = () => {
    if (pageNumber < totalPages - 1) {
      setPageNumber(pageNumber + 1);
    }
  };

  const prevPage = () => {
    if (pageNumber > 0) {
      setPageNumber(pageNumber - 1);
    }
  };

  const renderPageNumbers = () => {
    const startPage = currentPageSet * pagesPerSet;
    const endPage = Math.min(startPage + pagesPerSet, totalPages);

    const pages = [];
    for (let i = startPage; i < endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setPageNumber(i)}
          className={`page-button font-manropeEL ${
            i === pageNumber
              ? 'bg-green-300 text-white-100 px-3 py-1 rounded-lg'
              : 'text-gray-400 hover:bg-green-300 hover:text-white-100 hover:px-3 hover:py-1 hover:rounded-lg'
          }`}
        >
          {i + 1}
        </button>,
      );
    }

    return pages;
  };

  return (
    <div>
      <MainLayout showDashboardSidebar={false} showFooter={true} showTopbar={true} activePage="marketplace">
        <div
          className={`${manropeL.className} w-[100%] flex flex-col px-[1rem] mb-[2rem] md:px-[1.5rem] lg:px-[4rem] lg:max-w-[1350px] mx-auto`}
        >
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
                className={`${manropeB.className} text-green-850 text-[1rem] leading-[1.5rem] tracking-[0.005rem] md:text-[1.5rem] md:leading-[2rem] lg:text-[1.75rem] lg:leading-[2.25rem]`}
              >
                {formatNumberWithCommas(57098)} Products
              </div>
              <Button className="border-green-300 border-[1px] text-green-300 rounded-[0.5rem] bg-white-100 w-[6rem] ml-auto px-[1rem] py-[0.75rem] text-center font-[400] text-[0.75rem] tracking-[0.003rem] md:w-[9.25rem] md:text-[0.875rem] lg:text-[1rem] hover:text-white-100" onClick={toggle}>
                Filter
              </Button>
            </div>

            <div className="grid grid-cols-2 [grid-column-gap:0.56rem] [grid-row-gap:1.25rem] md:grid-cols-3 md:[grid-column-gap:1.5rem] md:[grid-row-gap:3.25rem] lg:grid-cols-4 lg:[grid-column-gap:2rem] lg:[grid-row-gap:3.75rem] ">
              {displayProductCards}
            </div>
          </section>

          {/* Pagination */}
          {/* place here pagination component here.. don't add margin top to move it..i done it already */}
          <div className="flex justify-center items-center">
            <div className="flex gap-4  items-center border-2 rounded-lg bg-white-110 border-white-110 p-2">
              <button
                onClick={prevPage}
                className={`${pageNumber === 0 ? 'text-gray-100' : ' text-gray-400'} px-2 py-1 rounded-lg`}
                disabled={pageNumber === 0}
              >
                &lt;
              </button>

              {renderPageNumbers()}

              <button
                onClick={nextPage}
                className={`${
                  pageNumber === totalPages - 1 ? ' text-gray-100' : ' text-gray-400'
                } px-2 py-1 rounded-lg`}
                disabled={pageNumber === totalPages - 1}
              >
                &gt;
              </button>
            </div>
          </div>

          {/*  */}
        </div>
      </MainLayout>
      <SearchFilter isOpen={isOpen} toggle={toggle} />
    </div>
  );
};
export default SpecificSubCategory;

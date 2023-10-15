import { FC, useState, useEffect } from 'react';
import { manropeL, manropeB, manropeEB } from '../../config/font';
import MainLayout from '../../components/Layout/MainLayout';
import Button from '@ui/Button';
import { MarketPlaceProductCardProps } from '../../@types';
import ProductCard from './component/ProductCard';
import { formatNumberWithCommas } from '../../helpers';
import CategoriesNav from './component/CategoriesNav/CategoriesNav';
import SearchFilter from './component/filter/search-filter';
import useSearchFilter from './component/filter/hooks/useSearchFilter';
import CategoryLayout from './component/layout/category-layout';

interface CardType {
  id: string;
  currency: string;
  images: { url: string }[];
  shop: { name: string; id: string };
  name: string;
  price: number;
  rating: number;
  showDiscount: boolean | undefined;
  showLimitedOffer: boolean | undefined;
  showTopPicks: boolean | undefined;
}

interface SpecificSubCategoryProps {
  subCategory?: string;
  response?: {
    error: boolean;
    data: CardType[] | null;
    errorMessage: string;
  };
}

const dummyHandPickedData: MarketPlaceProductCardProps[] = [
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
];

const SpecificSubCategory: FC<SpecificSubCategoryProps> = (props) => {
  const [productCards, setProductCards] = useState<MarketPlaceProductCardProps[]>(dummyHandPickedData);
  const [pageNumber, setPageNumber] = useState(0);
  const [currentPageSet, setCurrentPageSet] = useState(0);

  const usersPerPage = 8;
  const pagesVisited = pageNumber * usersPerPage;
  const totalPages = Math.ceil(productCards.length / usersPerPage);
  const pagesPerSet = 4;

  // search filter hook
  const { isOpen, toggle } = useSearchFilter();

  useEffect(() => {
    setCurrentPageSet(Math.floor(pageNumber / pagesPerSet));
  }, [pageNumber]);

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

  const renderFunc = (num: number) => {
    setPageNumber(num);
  };

  const renderPageNumbers = () => {
    const startPage = currentPageSet * pagesPerSet;
    const endPage = Math.min(startPage + pagesPerSet, totalPages);

    const pages = [];
    for (let i = startPage; i < endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => renderFunc(i)}
          className={`h-[32px] w-[32px] page-button font-manropeEL ${
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
    <CategoryLayout>
      <div>
        <div
          className={`${manropeL.className} w-[100%] flex flex-col px-[1rem] mb-[2rem] md:px-[1.5rem] xl:px-[4rem] lg:max-w-[1350px] mx-auto`}
        >
          {props?.response?.error && (
            <div className="bg-white-100 rounded-[1rem] h-[300px] p-[1rem] flex items-center justify-center text-[1rem] border-[1px] my-[2.5rem] text-center md:my-[3.5rem] md:text-[1.3rem] lg:my-[5rem] lg:text-[1.5rem] font-[600] border-[#00000024]">
              {props.response.errorMessage}
            </div>
          )}

          {!props?.response?.error && (
            <div>
              <header
                className={`flex flex-col items-center space-y-[0.5rem] mt-[2.5rem] text-center md:mt-[3.5rem] md:space-y-[0.75rem] lg:mt-[5rem] lg:space-y-[1rem]`}
              >
                <h1
                  className={`${manropeEB.className} capitalize text-green-850 text-[1.375rem] leading-[1.75rem] md:text-[2rem] md:leading-[2.5rem] lg:text-[1.75rem] lg:leading-[2.25rem]`}
                >
                  {props.subCategory || 'Graphics Design Templates'}
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
                    {formatNumberWithCommas(props?.response?.data?.length || 0)} Products
                  </div>
                  <Button
                    className="border-green-300 border-[1px] text-green-300 rounded-[0.5rem] bg-white-100 w-[6rem] ml-auto px-[1rem] py-[0.75rem] text-center font-[400] text-[0.75rem] tracking-[0.003rem] md:w-[9.25rem] md:text-[0.875rem] lg:text-[1rem] hover:text-white-100"
                    onClick={toggle}
                  >
                    Filter
                  </Button>
                </div>

                <div className="grid grid-cols-2 place-items-center [grid-column-gap:0.56rem] [grid-row-gap:1.25rem] md:grid-cols-3 md:[grid-column-gap:1.5rem] md:[grid-row-gap:3.25rem] lg:grid-cols-4 lg:[grid-column-gap:2rem] lg:[grid-row-gap:3.75rem] ">
                  {props?.response?.data?.map((productCard: CardType) => (
                    <ProductCard
                      key={productCard.id}
                      currency={productCard.currency}
                      id={productCard.id}
                      image={productCard?.images[0] ? productCard.images[0]['url'] : ''}
                      name={productCard.name}
                      price={productCard.price}
                      user={productCard?.shop?.name || 'No user'}
                      shop={productCard?.shop}
                      rating={productCard.rating}
                      showDiscount={productCard.showDiscount}
                      showLimitedOffer={productCard.showLimitedOffer}
                      showTopPicks={productCard.showTopPicks}
                    />
                  ))}
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
            </div>
          )}
        </div>
        <SearchFilter isOpen={isOpen} toggle={toggle} />
      </div>
    </CategoryLayout>
  );
};
export default SpecificSubCategory;

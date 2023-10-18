import { Fragment } from 'react';
import FilterSection from './filter-section';
import Button from '@ui/Button';
import { CancelIcon } from './icons';
import useSearchFilter from './hooks/useSearchFilter';
import { manropeL } from '../../../../config/font';
import { formatToNigerianNaira } from '../../../../helpers/formatCurrency';
import useCategory from './hooks/useCategory';
import { ProductList } from '@modules/marketplace/types/filter-types';

const SearchFilter = ({ isOpen, toggle }: { isOpen?: boolean; toggle: () => void }) => {
  const { resetFilter, handleSearch, loading } = useSearchFilter();
  const { categories, loading: isLoading, products } = useCategory();
  const sub_categories = categories.flatMap((category) => category.subcategories).map((sub: any) => sub?.name);
  function getLowestAndHighestPrices(products: ProductList[]) {
    const sortedPrices = products
      .map((product) => parseInt(product.price))
      .slice()
      .sort((a, b) => a - b);

    const lowestPrices = sortedPrices.slice(0, 10);

    const highestPrices = sortedPrices.slice(-10);

    return {
      lowest: lowestPrices,
      highest: highestPrices,
    };
  }
  const results = getLowestAndHighestPrices(products);
  const prices = [...results.lowest, ...results.highest];
  const uniquePrices = Array.from(new Set(prices)).map((price) => formatToNigerianNaira(price));
  const discount_price = [5, 10, 20, 30, 40, 50];

  return (
    <div>
      {isOpen ? (
        <div
          className={`flex items-center justify-center absolute z-50  w-full top-0 min-h-screen bg-black bg-opacity-50 py-10 px-5 backdrop-blur-sm transition duration-300 ease-in-out ${manropeL.className}`}
        >
          <div className="bg-white-100 md:max-w-2xl w-full py-5 px-7 rounded-md shadow-sm transition delay-500 ease-in-out">
            <section className="flex justify-between">
              <h3 className="text-xl font-medium">Filter Content Just for You</h3>
              <CancelIcon onClick={toggle} />
            </section>
            <Fragment>
              <FilterSection tag="category" data={['All', ...categories.map((c) => c.name)]} sectionTitle="Category" />
              {isLoading ? null : (
                <FilterSection tag="subCategory" data={['All', ...sub_categories]} sectionTitle="Sub Category" />
              )}
              <FilterSection
                tag="discount"
                data={['All', ...discount_price.map((d) => `${d}% off`)]}
                sectionTitle="By Discount"
              />
              <FilterSection tag="keyword" data={['All']} sectionTitle="By Keywords" />
              <FilterSection tag="rating" data={['All']} sectionTitle="By Rating" />
              <FilterSection
                tag="price"
                data={['All', 'Lowest Price', 'Highest Price', ...uniquePrices]}
                sectionTitle="By Price"
              ></FilterSection>
            </Fragment>

            <div className="flex items-center justify-center gap-4 mt-10 mb-4">
              <Button
                type="reset"
                className="rounded-lg px-7 text-sm bg-white-100  focus:bg-white-100 border-brand-green-primary hover:bg-white-100 text-brand-green-primary border-2"
                onClick={resetFilter}
              >
                Reset
              </Button>
              <Button className="rounded-lg px-7 text-sm" onClick={handleSearch} isLoading={loading}>
                Apply
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SearchFilter;

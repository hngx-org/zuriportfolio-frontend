import { Fragment } from 'react';
import { category, discount, keyword, price, rating, subCategory } from './data/search-data';
import FilterSection from './filter-section';
import Button from '@ui/Button';
import { CancelIcon } from './icons';
import Badge from './Badge';
import useSearchFilter from './hooks/useSearchFilter';
import { manropeL } from '../../../../config/font';

const SearchFilter = ({ isOpen, toggle }: { isOpen?: boolean; toggle: () => void }) => {
  const {resetFilter, handleSearch, loading} = useSearchFilter()
  return (
    <Fragment>
      {isOpen ? (
        <div className={`flex items-center justify-center absolute z-50  w-full top-0 min-h-screen bg-black bg-opacity-50 py-10 px-5 backdrop-blur-sm transition duration-300 ease-in-out ${manropeL.className}`}>
          <div className="bg-white-100 md:max-w-2xl w-full py-5 px-7 rounded-md shadow-sm transition delay-500 ease-in-out">
            <section className="flex justify-between">
              <h3 className="text-xl font-medium">Filter Content Just for You</h3>
              <CancelIcon onClick={toggle} />
            </section>
            <Fragment>
              <FilterSection data={category} sectionTitle="Category" />
              <FilterSection data={subCategory} sectionTitle="Sub Category" />
              <FilterSection data={discount} sectionTitle="By Discount" />
              <FilterSection data={keyword} sectionTitle="By Keywords" />
              <FilterSection data={rating} sectionTitle="By Rating" />
              <FilterSection data={price} children={<PriceRanges data={['$80', '$500']} />} sectionTitle="By Price" />
            </Fragment>

            <div className="flex items-center justify-center gap-4 mt-10 mb-4">
              <Button
                type="reset"
                className="rounded-lg px-7 text-sm bg-white-100  focus:bg-white-100 border-brand-green-primary hover:bg-white-100 text-brand-green-primary border-2"
             onClick={resetFilter}
             >
                Reset
              </Button>
              <Button className="rounded-lg px-7 text-sm" onClick={handleSearch} isLoading={loading}>Apply</Button>
            </div>
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

const PriceRanges = ({ data }: { data: string[] }) => {
  return (
    <div className="ml-10 flex gap-10">
      {Array.isArray(data) && data.length > 0 && data.map((item, i) => <Badge key={i} className='px-7 border rounded-lg text-sm items-center py-1 border-gray-700 text-gray-600'>{item}</Badge>)}
    </div>
  );
};

export default SearchFilter;
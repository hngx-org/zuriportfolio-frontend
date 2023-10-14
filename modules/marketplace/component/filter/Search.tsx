import { Fragment } from 'react';
import { category, discount, keyword, price, rating, subCategory } from './data';
import FilterSection from './filter-section';
import Button from '@ui/Button';
import { CancelIcon } from './icons';
import Badge from './Badge';

const SearchFilter = ({ isOpen, toggle }: { isOpen?: boolean; toggle: () => void }) => {
  return (
    <Fragment>
      {isOpen ? (
        <div
          className={`flex items-center justify-center absolute z-50  w-full top-0 min-h-screen bg-black bg-opacity-50 py-10 px-5 backdrop-blur-sm transition duration-300 ease-in-out`}
        >
          <div className="bg-white-100 md:max-w-2xl w-full py-5 px-7 rounded-md shadow-sm transition delay-500 ease-in-out">
            <section className="flex justify-between">
              <h3 className="text-xl font-medium">Filter Content Just for You</h3>
              <CancelIcon onClick={toggle} />
            </section>
            <Fragment>
              <FilterSection tag="category" data={category} sectionTitle="Category" />
              <FilterSection tag="subCategory" data={subCategory} sectionTitle="Sub Category" />
              <FilterSection tag="discount" data={discount} sectionTitle="By Discount" />
              <FilterSection tag="keyword" data={keyword} sectionTitle="By Keywords" />
              <FilterSection tag="rating" data={rating} sectionTitle="By Rating" />
              <FilterSection tag="price" data={price} sectionTitle="By Price">
                <PriceRanges data={['$80', '$500']} />
              </FilterSection>
              {/* Please do not make children a props element */}
            </Fragment>

            <div className="flex items-center justify-center gap-4 mt-10 mb-4">
              <Button
                type="reset"
                className="rounded-lg px-7 text-sm bg-white-100  focus:bg-white-100 border-brand-green-primary hover:bg-white-100 text-brand-green-primary border-2"
              >
                Reset
              </Button>
              <Button className="rounded-lg px-7 text-sm">Apply</Button>
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
      {Array.isArray(data) &&
        data.length > 0 &&
        data.map((item, i) => (
          <Badge key={i} className="px-7 border rounded-lg text-sm items-center py-1 border-gray-700 text-gray-600">
            {item}
          </Badge>
        ))}
    </div>
  );
};

export default SearchFilter;

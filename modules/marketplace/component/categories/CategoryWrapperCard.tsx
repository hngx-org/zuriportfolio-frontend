import ProductCard from '../ProductCard';
import Button from '@ui/Button';
import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import CategoryLoading from './CategoryLoading';
import CategoryError from './CategoryError';

interface CategoryWrapperCardProps {
  category: string;
  subCategory: string;
}

const CategoryWrapperCard: FC<CategoryWrapperCardProps> = ({ category, subCategory }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  console.log(subCategory, category);
  const url = `https://coral-app-8bk8j.ondigitalocean.app/api/products/${category}/${subCategory}/`;

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const res = await axios(url);
        console.log(res.data.products);
        if (res.data.products.length === 0) {
          return setError(true);
        }

        setError(false);
        setData(res.data.products);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchSubCategories();
  }, [url]);

  console.log(data, loading, error);

  if (error) {
    return <CategoryError message={`No products found in ${category}`} />;
  }

  return (
    <div>
      <div className="flex items-center">
        <h1 className="capitalize w-[11rem] text-green-850 font-[700] text-[0.875rem] tracking-[0.00219rem] leading-[1.25rem] md:w-[25rem] md:text-[1.5rem] md:leading-[2rem] md:font-[600] lg:text-[1.75rem] lg:leading-[2.25rem]">
          {subCategory}
        </h1>
        <Button
          href={`/marketplace/categories/${category}/${subCategory}`}
          className="text-[0.75rem] space-x-[0.5rem] font-[600] tracking-[0.003rem] leading-[1rem] bg-transparent ml-auto text-green-300 gap-[0] p-[0] md:space-x-[0.625rem] md:text-[0.875rem] md:leading-[1.25rem] hover:bg-transparent hover:opacity-[0.5]"
        >
          <span>View all</span>
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
        </Button>
      </div>

      {loading && (
        <div className="mt-[1.25rem] grid grid-cols-2 [grid-column-gap:0.5rem] [grid-row-gap:1.25rem] md:grid-cols-3 md:[grid-column-gap:1.5rem] md:[grid-row-gap:2rem] lg:grid-cols-4 lg:mt-[2rem] lg:[grid-column-gap:2rem] lg:[grid-row-gap:3rem]">
          <CategoryLoading />
          <CategoryLoading />
          <CategoryLoading />
          <CategoryLoading />
        </div>
      )}

      {!loading && !error && (
        <div className="mt-[1.25rem] grid grid-cols-2 [grid-column-gap:0.5rem] [grid-row-gap:1.25rem] md:grid-cols-3 md:[grid-column-gap:1.5rem] md:[grid-row-gap:2rem] lg:grid-cols-4 lg:mt-[2rem] lg:[grid-column-gap:2rem] lg:[grid-row-gap:3rem]">
          {data
            ?.slice(0, 4)
            .map((item: any) => (
              <ProductCard
                currency={item.currency}
                key={item.id}
                id={item.id}
                image={item?.images[0]['url'] ? item?.images[0]['url'] : ''}
                name={item.name}
                price={item.price}
                rating={item.rating}
                user="No user"
              />
            ))}
        </div>
      )}
    </div>
  );
};
export default CategoryWrapperCard;

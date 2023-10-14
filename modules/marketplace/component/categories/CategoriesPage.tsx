import React, { FC } from 'react';
import CategoryLayout from '../layout/category-layout';
import { manropeL } from '../../../../config/font';
import CategoryWrapperCard from './CategoryWrapperCard';
import CategoryError from './CategoryError';

interface CategoriesPageProps {
  error: boolean;
  errorMessage: string;
  data: { name: string; subcategories: { name: string }[] };
}

const CategoriesPage: FC<CategoriesPageProps> = ({ error, errorMessage, data }) => {
  console.log(error, errorMessage, data);
  // const { name, subcategories } = data;
  const name = data?.name;
  // return undefined if not present
  const subcategories = data?.subcategories;

  let mappedSubcategory: any;

  if (subcategories) {
    mappedSubcategory = subcategories?.map((el) => el.name);
  }
  // // if data is empty
  console.log(mappedSubcategory);
  // console.log(mappedSubcategory);

  if (error) {
    return (
      <CategoryLayout>
        <div
          className={`${manropeL.className} max-w-[1350px] mx-auto px-[1rem] mt-[1.75rem] mb-[1.25rem] space-y-[1.75rem] md:px-[1.5rem] md:mt-[3.75rem] md:space-y-[3.5rem] md:mb-[5rem] lg:mt-[2rem] xl:px-[4rem] lg:space-y-[5rem] lg:mb-[4.2rem]`}
        >
          {<CategoryError message={errorMessage} />}
        </div>
      </CategoryLayout>
    );
  }

  // subcategories is empty
  if (mappedSubcategory.length === 0) {
    return (
      <CategoryLayout>
        <div
          className={`${manropeL.className} max-w-[1350px] mx-auto px-[1rem] mt-[1.75rem] mb-[1.25rem] space-y-[1.75rem] md:px-[1.5rem] md:mt-[3.75rem] md:space-y-[3.5rem] md:mb-[5rem] lg:mt-[2rem] xl:px-[4rem] lg:space-y-[5rem] lg:mb-[4.2rem]`}
        >
          {<CategoryError message={`No product category found in ${name}`} />}
        </div>
      </CategoryLayout>
    );
  }

  return (
    <>
      <CategoryLayout>
        <div
          className={`${manropeL.className} max-w-[1350px] mx-auto px-[1rem] mt-[1.75rem] mb-[1.25rem]  md:px-[1.5rem] md:mt-[3.75rem]  md:mb-[5rem] lg:mt-[2rem] xl:px-[4rem] lg:space-y-[5rem] lg:mb-[4.2rem]`}
        >
          {
            <div className="space-y-[1.75rem] md:space-y-[3.5rem] lg:space-y-[5rem]">
              {mappedSubcategory.map((el: string, index: number) => (
                <CategoryWrapperCard category={name} subCategory={el} key={index} />
              ))}
              {/* <CategoryWrapperCard /> */}
              {/* <CategoryWrapperCard /> */}
            </div>
          }
        </div>
      </CategoryLayout>
    </>
  );
};

export default CategoriesPage;

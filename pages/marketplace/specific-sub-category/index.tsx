import { FilterContextProvider } from '@modules/marketplace/component/filter/hooks/context';
import SpecificSubCategory from '../../../modules/marketplace/SpecificSubCategory';
import { GetServerSideProps } from 'next';
import { ProductList } from '@modules/marketplace/types/filter-types';
import axios from 'axios';

const SpecificSubCategoryPage = () => {
  return (
    <FilterContextProvider>
      <SpecificSubCategory />
    </FilterContextProvider>
  );
};
export default SpecificSubCategoryPage;

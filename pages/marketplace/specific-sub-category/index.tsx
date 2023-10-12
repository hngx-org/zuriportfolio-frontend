import { FilterContextProvider } from '@modules/marketplace/component/filter/hooks/context';
import SpecificSubCategory from '../../../modules/marketplace/SpecificSubCategory';

const SpecificSubCategoryPage = () => {
  return (
    <FilterContextProvider>
      <SpecificSubCategory />
    </FilterContextProvider>
  );
};
export default SpecificSubCategoryPage;

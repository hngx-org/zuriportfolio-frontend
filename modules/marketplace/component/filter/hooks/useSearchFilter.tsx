import { useContext } from 'react';
import FilterContext from './context';

const useSearchFilter = () => {
  return useContext(FilterContext);
};

export default useSearchFilter;


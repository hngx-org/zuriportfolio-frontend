import axios from 'axios';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { createContext, useState } from 'react';

interface Filter {
  selection: string[];
  handleSelection: (option: string, tag: string) => void;
  loading: boolean;
  isOpen: boolean;
  handleSearch: () => void;
  toggle: () => void;
  resetFilter: () => void;
  filterSelection: FilterSelection;
}

type FilterSelection = {
  [key: string]: string[];
};

const filterDefault: FilterSelection = {
  category: [],
  discount: [],
  price: [],
  subCategory: [],
  rating: [],
};

const FilterContext = createContext({} as Filter);

export const FilterContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [selection, setSelection] = useState<string[]>([]);
  const [filterSelection, setFilterSelection] = useState<FilterSelection>(filterDefault);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // search filter state and logic here
  const [isOpen, setIsOpen] = useState(false);

  function toggle() {
    setIsOpen((isOpen) => !isOpen);
  }

  async function handleSearch() {
    setLoading(true);
    console.log('handle submit');
    console.log(filterSelection);
    const category = filterSelection.category.join(",")
    const subCategory = filterSelection.subCategory.join(",")
    const discount = filterSelection.discount.join(",")
    const price = filterSelection.price.join(",")
    const rating = filterSelection.rating.join(",")
    try {
      const API_URL = `https://coral-app-8bk8j.ondigitalocean.app/api/products-filter?category=${category}&subCategory=${subCategory}&discount=${discount}&price=${price}&rating`
      const { data, status } = await axios.get(API_URL);
      console.log(data, status);
      if(status === 200) {
        console.log(data)
        if(data.products.length === 0){
          // router.push('/marketplace/error-page');
          console.log("no data")
        } else {
          console.log(data, "data ready for redirection")
        }
      } 
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
      }
      if (error instanceof Error) {
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
    // setTimeout(() => {
    //   setLoading(false);
    //   router.push('/marketplace/error-page');
    // }, 3000);
  }

  function resetFilter() {
    setSelection([]);
  }

  function setFilterOption(option: string, tag: string) {
    setFilterSelection((selection) => {
      const updatedSelection = { ...selection };

      if (Array.isArray(updatedSelection[tag])) {
        updatedSelection[tag] = Array.from(new Set([...updatedSelection[tag], option]));
      }

      return updatedSelection;
    });
  }

  function handleSelection(option: string, tag: string) {
    setFilterOption(option, tag);
    if (selection.includes(option)) {
      // If the option is already in the selection, remove it
      const updatedSelection = selection.filter((item) => item !== option);
      setSelection(updatedSelection);
    } else {
      // If the option is not in the selection, add it
      const updatedSelection = [...selection, option];
      setSelection(updatedSelection);
    }
  }
  return (
    <FilterContext.Provider
      value={{ handleSelection, selection, handleSearch, isOpen, loading, resetFilter, toggle, filterSelection }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export default FilterContext;

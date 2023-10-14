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

  function constructApiUrl({
    category = '',
    subCategory = '',
    discount = '',
    price = '',
    rating = ''
  }) {
    // Initialize the base URL
    let apiUrl = 'https://coral-app-8bk8j.ondigitalocean.app/api/products-filter?';
  
    // Check each query parameter and append to the URL if not empty
    if (category) {
      apiUrl += `category=${category}&`;
    }
    if (subCategory) {
      apiUrl += `subCategory=${subCategory}&`;
    }
    if (discount) {
      apiUrl += `discount=${discount}&`;
    }
    if (price) {
      apiUrl += `price=${price}&`;
    }
    if (rating) {
      apiUrl += `rating=${rating}&`;
    }
  
    // Remove the trailing '&' if it exists
    if (apiUrl.endsWith('&')) {
      apiUrl = apiUrl.slice(0, -1);
    }
  
    return apiUrl;
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
      const API_URL = constructApiUrl({category, subCategory, discount, price, rating})

      // console.log(API_URL)
      const { data, status } = await axios.get(API_URL);
      console.log(data, status);
      if(status === 200) {
        console.log(data)
        if(data.products.length === 0){
          router.push('/marketplace/error-page');
          console.log("no data")
        } else {
          console.log(data, "data ready for redirection")
          toggle()
          router.push(`/marketplace/specific-sub-category?category=${category}&subCategory=${subCategory}&discount=${parseInt(discount)}&price=${parseInt(price)}&rating=${rating}`)
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

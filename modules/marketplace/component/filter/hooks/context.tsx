import { useRouter } from 'next/router';
import { createContext, useState } from 'react';
import { constructApiUrl } from '../helper';

interface Filter {
  selection: string[];
  handleSelection: (option: string, tag: string) => void;
  loading: boolean;
  isOpen: boolean;
  handleSearch: () => void;
  toggle: () => void;
  resetFilter: () => void;
  filterSelection: FilterSelection;
  isReset: boolean;
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
  const [isReset, setIsReset] = useState(false);
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  function toggle() {
    setIsOpen((isOpen) => !isOpen);
  }

  async function handleSearch() {
    setLoading(true);
    setIsReset(false);
    const category = filterSelection.category.join(',');
    const subCategory = filterSelection.subCategory.join(',');
    const discount = filterSelection.discount.join(',');
    const price = filterSelection.price.join(',');
    const rating = filterSelection.rating.join(',');
    const queryParams = {
      category,
      subCategory,
      price: parseInt(price),
      discount: parseInt(discount),
      rating,
    };
    const baseUrl = window.location.origin;
    const searchURL = constructApiUrl(`${baseUrl}/marketplace/search-filter`, queryParams);
    try {
      router.push(searchURL);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    } finally {
      // setLoading(false);
    }
  }

  function resetFilter() {
    setSelection([]);
    setLoading(false);
    setIsReset(true);
    setTimeout(() => {
      setIsReset(false);
    }, 1000);
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
      value={{
        handleSelection,
        selection,
        handleSearch,
        isOpen,
        loading,
        resetFilter,
        toggle,
        filterSelection,
        isReset,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export default FilterContext;

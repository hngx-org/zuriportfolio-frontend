// components/SearchBar.tsx
import { CloseCircle, SearchNormal1 } from 'iconsax-react';
import { useState } from 'react';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setSearchQueryLocal: (query: string) => void;
  clearSearch: () => void;
  selectedCategory: string;
  handleCategoryChange: (category: string) => void;
  addToSearchHistory: () => void;
  showSearchHistory: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  setSearchQueryLocal,
  clearSearch,
  selectedCategory,
  handleCategoryChange,
  addToSearchHistory,
  showSearchHistory,
}) => {
  const [error, setError] = useState<string | null>(null);

  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQueryLocal(query);
    setSearchQuery(query);
    setError(null);
    addToSearchHistory();
  };

  const handleClear = () => {
    setSearchQuery('');
    setSearchQueryLocal('');
    setError(null);
    clearSearch();
  };
  const handleInputFocus = () => {
    // Show the search history modal when the input is focused
    setIsFocused(true);

    showSearchHistory();
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      showSearchHistory();
    }
  };
  const handleBlur = () => {
    // When the search input is blurred, hide the search history
    setIsFocused(false);
  };

  return (
    <>
      <div className="border-[0.1px] border-[#A8ACAB] max-w-md container mx-auto px-4 py-2 w-full flex items-center rounded-md">
        <SearchNormal1 color="#737876" />
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearch}
          onFocus={handleInputFocus}
          onBlur={handleBlur}
          onKeyPress={handleKeyPress}
          className=" focus:outline-none max-w-md  w-full"
        />
        <button onClick={handleClear} className="outline-none">
          <CloseCircle color="#737876" size={18} />
        </button>
        {error && <div className="text-red-500">{error}</div>}
      </div>
    </>
  );
};

export default SearchBar;

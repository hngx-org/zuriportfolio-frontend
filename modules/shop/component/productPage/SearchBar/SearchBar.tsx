import { CloseCircle, SearchNormal1 } from 'iconsax-react';
import { useState } from 'react';
import { useRouter } from 'next/router';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setSearchQueryLocal: (query: string) => void;
  clearSearch: () => void;
  setShopOwnerQuery: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  setSearchQueryLocal,
  clearSearch,
  setShopOwnerQuery,
}) => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQueryLocal(e.target.value);
    setError(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = () => {
    const query = searchQuery;
    setSearchQuery(query);
    setShopOwnerQuery(query);

    if (router.pathname === '/shop/product') {
      router.push('/shop');
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    setSearchQueryLocal('');
    setError(null);
    clearSearch();
  };

  return (
    <>
      <div className=" max-w-md container mx-auto px-4 py-2 w-full flex items-center rounded-md">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onKeyPress={handleKeyPress}
          onChange={handleInputChange}
          className="focus:outline-none max-w-md w-full"
        />
        {searchQuery && (
          <button onClick={handleClear} className="outline-none">
            <CloseCircle color="#737876" size={18} />
          </button>
        )}
      </div>
    </>
  );
};

export default SearchBar;

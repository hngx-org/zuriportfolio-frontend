// components/SearchBar.tsx
import { CloseCircle, SearchNormal1 } from 'iconsax-react';
import { useState } from 'react';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setSearchQueryLocal: (query: string) => void;
  clearSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery, setSearchQueryLocal, clearSearch }) => {
  const [error, setError] = useState<string | null>(null);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQueryLocal(query);
    setSearchQuery(query);
    setError(null);
  };

  const handleClear = () => {
    setSearchQuery('');
    setSearchQueryLocal('');
    setError(null);
    clearSearch();
  };

  return (
    <div className="border-[0.1px] border-[#A8ACAB] px-4 py-2 w-full flex items-center rounded-md">
      <SearchNormal1 color="#737876" />
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearch}
        className=" focus:outline-none  w-full"
      />
      <button onClick={handleClear} className="outline-none">
        <CloseCircle color="#737876" size={18} />
      </button>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};

export default SearchBar;

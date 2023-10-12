// components/Header.tsx
import Link from 'next/link';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Image from 'next/image';
import SearchBar from './SearchBar/SearchBar';
import { ShoppingCart, CloseCircle } from 'iconsax-react';
import ZuriShopLogo from '../../../../public/assets/shop/ZuriShopLogo.png';
import { useRouter } from 'next/router';
interface HeaderProps {
  setSearchQuery: Dispatch<SetStateAction<string>>;
  setShopOwnerQuery: Dispatch<SetStateAction<string>>;
  setCategoryQuery: Dispatch<SetStateAction<string>>;
  cartItemCount: number;
  selectedCategory: string;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
  handleCategoryChange: (category: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  setSearchQuery,
  cartItemCount,
  selectedCategory,
  handleCategoryChange,
  setShopOwnerQuery,
  setCategoryQuery,
}) => {
  const [searchQueryLocal, setSearchQueryLocal] = useState<string>('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearchHistory, setShowSearchHistory] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const clearSearch = () => {
    setSearchQuery('');
    setSearchQueryLocal('');
  };
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const addToSearchHistory = () => {
    const query = searchQueryLocal;

    if (query.trim() !== '') {
      const searchHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');
      searchHistory.push(query);
      localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    }
  };

  useEffect(() => {
    const searchHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    setSearchHistory(searchHistory);
  }, []);

  const toggleSearchHistoryModal = () => {
    setShowSearchHistory(!showSearchHistory);
  };
  const clearSearchHistory = () => {
    setSearchHistory([]);

    localStorage.removeItem('searchHistory');
  };

  const router = useRouter();

  return (
    <nav className="bg-white-100 shadow">
      <div className="container mx-auto px-4 sm:px-6 md:px-3 py-5 flex flex-col md:flex-row  items-center">
        <div className="flex items-center justify-between w-full md:w-auto ">
          <Link href="/" className="text-white text-2xl font-bold">
            <Image src={ZuriShopLogo} alt="Your Logo" width={100} height={50} />
          </Link>

          <div className="md:hidden cursor-pointer ml-2 " onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? (
              <CloseCircle size={25} color="#000" />
            ) : (
              <>
                <div className="bg-brand-green-shade0 w-3 h-0.5 mb-1"></div>
                <div className="bg-brand-green-shade0  w-5 h-0.5 mb-1"></div>
                <div className="bg-brand-green-shade0  w-3 h-0.5"></div>
              </>
            )}
          </div>
        </div>

        <div
          className={`w-full  mx-4 mt-4 md:mt-0 flex-grow ${
            isMobileMenuOpen ? 'block' : 'hidden md:block'
          } transition-all ease-in-out duration-500`}
        >
          {' '}
          <SearchBar
            searchQuery={searchQueryLocal}
            setSearchQuery={setSearchQuery}
            setShopOwnerQuery={setShopOwnerQuery}
            setCategoryQuery={setCategoryQuery}
            setSearchQueryLocal={setSearchQueryLocal}
            clearSearch={clearSearch}
            selectedCategory={selectedCategory}
            handleCategoryChange={handleCategoryChange}
            addToSearchHistory={addToSearchHistory}
            showSearchHistory={toggleSearchHistoryModal}
          />
        </div>

        <div className={`relative mt-4 md:mt-0 ${isMobileMenuOpen ? 'block' : 'hidden md:block'}`}>
          {' '}
          <Link href="/shop/cart" className="mt-4 md:mt-0 relative">
            <ShoppingCart size={29} />
          </Link>
          <div className="bg-green-700 rounded-full w-4 h-4 text-white-100 text-sm flex items-center justify-center absolute top-0 right-0">
            {cartItemCount}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;

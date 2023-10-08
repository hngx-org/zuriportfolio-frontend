// components/Header.tsx
import Link from 'next/link';
import { Dispatch, SetStateAction, useState } from 'react';
import Image from 'next/image';
import SearchBar from './SearchBar/SearchBar';
import { ShoppingCart, CloseCircle } from 'iconsax-react';
import ZuriShopLogo from '../../../../public/assets/shop/ZuriShopLogo.png';
interface HeaderProps {
  setSearchQuery: Dispatch<SetStateAction<string>>;
  cartItemCount: number;
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
  handleCategoryChange: (category: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  setSearchQuery,
  cartItemCount,
  categories,
  selectedCategory,
  handleCategoryChange,
}) => {
  const [searchQueryLocal, setSearchQueryLocal] = useState<string>('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const clearSearch = () => {
    setSearchQuery('');
    setSearchQueryLocal('');
  };
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-[#ffffff] shadow">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-5 flex flex-col md:flex-row  items-center">
        <div className="flex items-center justify-between w-full md:w-auto ">
          <Link href="/" className="text-white text-2xl font-bold">
            <Image src={ZuriShopLogo} alt="Your Logo" width={100} height={50} />
          </Link>

          <div className="md:hidden cursor-pointer ml-2 " onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? (
              <CloseCircle size={25} color="#000" />
            ) : (
              <>
                <div className="bg-black w-3 h-0.5 mb-1"></div>
                <div className="bg-black w-5 h-0.5 mb-1"></div>
                <div className="bg-black w-3 h-0.5"></div>
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
            setSearchQueryLocal={setSearchQueryLocal}
            clearSearch={clearSearch}
            categories={categories}
            selectedCategory={selectedCategory}
            handleCategoryChange={handleCategoryChange}
          />
        </div>

        <div className={`relative mt-4 md:mt-0 ${isMobileMenuOpen ? 'block' : 'hidden md:block'}`}>
          {' '}
          <Link href="/cart" className="mt-4 md:mt-0 relative">
            <ShoppingCart size={29} />
          </Link>
          <div className="bg-[#006F37] rounded-full w-4 h-4 text-[#fff] text-sm flex items-center justify-center absolute top-0 right-0">
            {cartItemCount}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;

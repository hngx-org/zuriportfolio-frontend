// components/Header.tsx
import Link from 'next/link';
import { Dispatch, SetStateAction, useState } from 'react';
import Image from 'next/image';
import SearchBar from './SearchBar/SearchBar';
import { ShoppingCart } from 'iconsax-react';
import ZuriShopLogo from '../../../../public/assets/ZuriShopLogo.png';
interface HeaderProps {
  setSearchQuery: Dispatch<SetStateAction<string>>;
  cartItemCount: number;
}

const Header: React.FC<HeaderProps> = ({ setSearchQuery, cartItemCount }) => {
  const [searchQueryLocal, setSearchQueryLocal] = useState<string>('');

  const clearSearch = () => {
    setSearchQuery('');
    setSearchQueryLocal('');
  };

  return (
    <nav className="bg-[#ffffff] shadow">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-5 flex flex-col md:flex-row md:justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold">
          <Image src={ZuriShopLogo} alt="Your Logo" width={100} height={50} />
        </Link>

        <div className="w-full md:max-w-md mx-4 mt-4 md:mt-0 flex-grow ">
          <SearchBar
            searchQuery={searchQueryLocal}
            setSearchQuery={setSearchQuery}
            setSearchQueryLocal={setSearchQueryLocal}
            clearSearch={clearSearch}
          />
        </div>

        <div className="relative mt-4 md:mt-0">
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

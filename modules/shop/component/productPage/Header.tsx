// components/Header.tsx
import Link from 'next/link';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Image from 'next/image';
import SearchBar from './SearchBar/SearchBar';
import { ShoppingCart, CloseCircle } from 'iconsax-react';
import ZuriShopLogo from '../../../../public/assets/shop/techverse_logo.svg';
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
          <svg xmlns="http://www.w3.org/2000/svg" width="126" height="24" fill="none" viewBox="0 0 126 24">
                      <path
                        fill="#009254"
                        d="M18.056 2H1.945A1.945 1.945 0 000 3.944v16.112A1.944 1.944 0 001.945 22h16.111a1.945 1.945 0 001.945-1.944V3.944A1.945 1.945 0 0018.056 2zm-2.402 12.008v1.484a.627.627 0 01-.548.56H6.732c-.62 0-1.148-.2-1.585-.598-.437-.4-.655-.883-.655-1.45 0-.452.148-.854.443-1.208.295-.352.67-.598 1.122-.737l7.318-2.091H4.492V8.552a.629.629 0 01.495-.605h8.427c.62 0 1.148.199 1.585.594.437.397.655.87.655 1.42 0 .46-.149.865-.446 1.215-.298.35-.68.595-1.149.732l-7.327 2.1h8.922zM28.321 18v-.264l4.576-6.688h-4.112V9.36h7.112v.272l-4.56 6.68h4.368V18h-7.384zm12.651.248c-.64 0-1.168-.107-1.584-.32a2.797 2.797 0 01-.992-.816 3.555 3.555 0 01-.544-1.056A5.66 5.66 0 0137.62 15a8.993 8.993 0 01-.048-.816V9.36h1.952v4.16c0 .267.019.568.056.904.038.33.123.65.256.96.139.304.342.555.608.752.272.197.638.296 1.096.296.246 0 .488-.04.728-.12.24-.08.456-.216.648-.408.198-.197.355-.467.472-.808.118-.341.176-.773.176-1.296l1.144.488c0 .736-.144 1.403-.432 2a3.401 3.401 0 01-1.256 1.432c-.554.352-1.237.528-2.048.528zM43.796 18v-2.68h-.232V9.36H45.5V18h-1.704zm4.032 0V9.36h1.704v2.104l-.208-.272a3.08 3.08 0 01.424-.784 2.36 2.36 0 01.648-.592c.213-.144.448-.256.704-.336.261-.085.528-.136.8-.152.272-.021.536-.01.792.032v1.8a2.472 2.472 0 00-.888-.072c-.33.027-.63.12-.896.28a2.013 2.013 0 00-.656.552c-.166.224-.288.48-.368.768-.08.283-.12.59-.12.92V18h-1.936zm6.63-9.952V6.28h1.928v1.768h-1.928zm0 9.952V9.36h1.928V18h-1.928zm8.557.24c-.843 0-1.55-.2-2.12-.6-.57-.4-1-.944-1.288-1.632-.288-.693-.432-1.47-.432-2.328 0-.87.144-1.648.432-2.336.288-.688.71-1.23 1.264-1.624.56-.4 1.25-.6 2.072-.6.816 0 1.523.2 2.12.6a3.93 3.93 0 011.4 1.624c.33.683.496 1.461.496 2.336 0 .864-.163 1.64-.488 2.328a3.972 3.972 0 01-1.376 1.632c-.592.4-1.285.6-2.08.6zm-4.168 3.6V9.36h1.704v6.064h.24v6.416h-1.944zm3.872-5.328c.501 0 .914-.125 1.24-.376.325-.25.565-.59.72-1.016.16-.432.24-.912.24-1.44 0-.523-.08-.997-.24-1.424a2.19 2.19 0 00-.744-1.024c-.336-.256-.763-.384-1.28-.384-.49 0-.89.12-1.2.36-.31.235-.539.565-.688.992-.144.421-.216.915-.216 1.48 0 .56.072 1.053.216 1.48.15.427.381.76.696 1 .32.235.739.352 1.256.352zm9.9 1.728c-.865 0-1.62-.195-2.265-.584a4.012 4.012 0 01-1.504-1.608c-.352-.688-.528-1.477-.528-2.368 0-.907.182-1.701.544-2.384a4.011 4.011 0 011.512-1.6c.646-.384 1.392-.576 2.24-.576.87 0 1.627.195 2.272.584.646.39 1.147.928 1.504 1.616.358.683.536 1.47.536 2.36 0 .896-.181 1.688-.544 2.376a4.01 4.01 0 01-1.504 1.608c-.645.384-1.4.576-2.264.576zm0-1.808c.767 0 1.338-.256 1.711-.768.374-.512.56-1.173.56-1.984 0-.837-.19-1.504-.568-2-.378-.501-.946-.752-1.704-.752-.517 0-.944.117-1.28.352-.33.23-.576.552-.736.968-.16.41-.24.888-.24 1.432 0 .837.19 1.507.568 2.008.384.496.947.744 1.688.744zM78.772 18V9.36h1.704v2.104l-.208-.272a3.08 3.08 0 01.424-.784 2.36 2.36 0 01.648-.592c.213-.144.448-.256.704-.336.261-.085.528-.136.8-.152.272-.021.536-.01.792.032v1.8a2.472 2.472 0 00-.888-.072c-.33.027-.63.12-.896.28a2.013 2.013 0 00-.656.552c-.166.224-.288.48-.368.768-.08.283-.12.59-.12.92V18h-1.936zm11.535 0c-.571.107-1.131.152-1.68.136a3.85 3.85 0 01-1.465-.296 2.029 2.029 0 01-.983-.904 2.575 2.575 0 01-.313-1.144c-.01-.39-.016-.83-.016-1.32V6.96h1.92v7.4c0 .347.003.65.008.912.011.261.067.475.169.64.192.32.498.499.92.536.42.037.9.016 1.44-.064V18zm-6.025-7.128V9.36h6.025v1.512h-6.025zM92.998 18V9.224c0-.219.008-.459.024-.72.016-.267.062-.53.136-.792.075-.261.211-.499.408-.712.246-.272.51-.459.792-.56.288-.107.571-.165.848-.176.278-.016.52-.024.728-.024h1.08v1.568h-1c-.368 0-.642.093-.824.28-.176.181-.264.421-.264.72V18h-1.928zm-1.392-7.128V9.36h5.408v1.512h-5.408zm10.271 7.368c-.864 0-1.619-.195-2.264-.584a4.012 4.012 0 01-1.504-1.608c-.352-.688-.528-1.477-.528-2.368 0-.907.181-1.701.544-2.384a4.011 4.011 0 011.512-1.6c.645-.384 1.392-.576 2.24-.576.869 0 1.626.195 2.272.584.645.39 1.146.928 1.504 1.616.357.683.536 1.47.536 2.36 0 .896-.182 1.688-.544 2.376a4.018 4.018 0 01-1.504 1.608c-.646.384-1.4.576-2.264.576zm0-1.808c.768 0 1.338-.256 1.712-.768.373-.512.56-1.173.56-1.984 0-.837-.19-1.504-.568-2-.379-.501-.947-.752-1.704-.752-.518 0-.944.117-1.28.352-.331.23-.576.552-.736.968-.16.41-.24.888-.24 1.432 0 .837.19 1.507.568 2.008.384.496.946.744 1.688.744zM108.19 18V6.24h1.928V18h-1.928zm4.565-9.952V6.28h1.928v1.768h-1.928zm0 9.952V9.36h1.928V18h-1.928zm8.22.24c-.864 0-1.619-.195-2.264-.584a4.01 4.01 0 01-1.504-1.608c-.352-.688-.528-1.477-.528-2.368 0-.907.181-1.701.544-2.384a4.015 4.015 0 011.512-1.6c.645-.384 1.392-.576 2.24-.576.869 0 1.627.195 2.272.584.645.39 1.147.928 1.504 1.616.357.683.536 1.47.536 2.36 0 .896-.181 1.688-.544 2.376a4.01 4.01 0 01-1.504 1.608c-.645.384-1.4.576-2.264.576zm0-1.808c.768 0 1.339-.256 1.712-.768s.56-1.173.56-1.984c0-.837-.189-1.504-.568-2-.379-.501-.947-.752-1.704-.752-.517 0-.944.117-1.28.352-.331.23-.576.552-.736.968-.16.41-.24.888-.24 1.432 0 .837.189 1.507.568 2.008.384.496.947.744 1.688.744z"
                      ></path>
                    </svg>
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
          <Link href="/marketplace/cart" className="mt-4 md:mt-0 relative">
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

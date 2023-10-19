// components/Layout.tsx

import { Dispatch, SetStateAction } from 'react';
import Footer from './Footer';
import Header from './Header';
import { useCart } from '../CartContext';
import { ShopData } from '../../../../@types';

interface LayoutProps {
  children: React.ReactNode;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  setShopOwnerQuery: Dispatch<SetStateAction<string>>;
  cartItemCount: number;
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
  handleCategoryChange: (category: string) => void;
  shop: ShopData | null;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  setSearchQuery,
  categories,
  selectedCategory,
  setSelectedCategory,
  setShopOwnerQuery,
  handleCategoryChange,
  shop,
}) => {
  const { cart } = useCart();

  const cartItemCount = cart.length;
  return (
    <div>
      <Header
        setSearchQuery={setSearchQuery}
        cartItemCount={cartItemCount}
        setShopOwnerQuery={setShopOwnerQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        handleCategoryChange={handleCategoryChange}
      />
      {children}
      <Footer shopName={shop ? shop.data?.name : ''} />
    </div>
  );
};

export default Layout;

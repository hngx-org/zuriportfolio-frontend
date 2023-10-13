// components/Layout.tsx

import { Dispatch, SetStateAction } from 'react';
import Footer from './Footer';
import Header from './Header';
import { useCart } from '../CartContext';

interface LayoutProps {
  children: React.ReactNode;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  setShopOwnerQuery: Dispatch<SetStateAction<string>>;
  setCategoryQuery: Dispatch<SetStateAction<string>>;
  cartItemCount: number;
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
  handleCategoryChange: (category: string) => void;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  setSearchQuery,
  categories,
  selectedCategory,
  setCategoryQuery,
  setSelectedCategory,
  setShopOwnerQuery,
  handleCategoryChange,
}) => {
  const { cart } = useCart();

  const cartItemCount = cart.length;
  return (
    <div>
      <Header
        setSearchQuery={setSearchQuery}
        cartItemCount={cartItemCount}
        setShopOwnerQuery={setShopOwnerQuery}
        setCategoryQuery={setCategoryQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        handleCategoryChange={handleCategoryChange}
      />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;

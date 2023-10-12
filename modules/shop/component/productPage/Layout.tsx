// components/Layout.tsx

import { Dispatch, SetStateAction } from 'react';
import Footer from './Footer';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  cartItemCount: number;
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
  handleCategoryChange: (category: string) => void;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  setSearchQuery,
  cartItemCount,
  categories,
  selectedCategory,
  setSelectedCategory,
  handleCategoryChange,
}) => {
  return (
    <div>
      <Header
        setSearchQuery={setSearchQuery}
        cartItemCount={cartItemCount}
        categories={categories}
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

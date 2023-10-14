// components/ShopProductList.tsx
import { Products } from '../../../../../@types';
import ProductCard from '../ProductCard/ProductCard';

interface ShopProductListProps {
  products: Products[];
  searchQuery: string;
  currentPage: number;
  productsPerPage: number;
}

const ShopProductList: React.FC<ShopProductListProps> = ({ products, searchQuery, currentPage, productsPerPage }) => {
  const startIdx = (currentPage - 1) * productsPerPage;
  const endIdx = startIdx + productsPerPage;
  const visibleProducts = products.slice(startIdx, endIdx);

  const filteredProducts = visibleProducts.filter((product) => {
    const nameMatch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const shopOwnerMatch = product.shopOwner && product.shopOwner.toLowerCase().includes(searchQuery.toLowerCase());
    const categoryMatch = product.category && product.category.toLowerCase().includes(searchQuery.toLowerCase());

    return nameMatch || shopOwnerMatch || categoryMatch;
  });

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 md:gap-10 gap-2">
      {filteredProducts.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ShopProductList;

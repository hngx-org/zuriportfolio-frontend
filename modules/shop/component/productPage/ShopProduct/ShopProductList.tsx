// components/ShopProductList.tsx
import { Products } from '../../../../../@types';
import ProductCard from '../ProductCard/ProductCard';

interface ShopProductListProps {
  products: Products[];
  searchQuery: string;
}

const ShopProductList: React.FC<ShopProductListProps> = ({ products, searchQuery }) => {
  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()));
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2  grid-cols-1  md:gap-10 gap-2">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ShopProductList;

import { Products, ShopData } from '../../../../../@types';
import ProductCard from '../ProductCard/ProductCard';

interface ShopProductListProps {
  shop: ShopData | undefined;
  currentPage: number;
  productsPerPage: number;
  searchQuery: string;
}

const ShopProductList: React.FC<ShopProductListProps> = ({ shop, currentPage, productsPerPage, searchQuery }) => {
  const shopData = shop?.data;

  if (!shopData) {
    return null;
  }
  const filteredProducts = shopData.products.filter((product: Products) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const productsToDisplay = filteredProducts.slice(startIndex, endIndex);

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 md:gap-10 gap-2">
      {productsToDisplay.map((product: Products) => (
        <ProductCard key={product.id} product={product} shopName={shopData.name || ''} />
      ))}
    </div>
  );
};

export default ShopProductList;

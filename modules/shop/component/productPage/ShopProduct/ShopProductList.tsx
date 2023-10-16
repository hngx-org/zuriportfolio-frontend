import { Products, ShopData } from '../../../../../@types';
import ProductCard from '../ProductCard/ProductCard';

interface ShopProductListProps {
  shop: ShopData | undefined;
}

const ShopProductList: React.FC<ShopProductListProps> = ({ shop }) => {
  // Remove the check for Array.isArray(shop) as it's not supposed to be an array

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 md:gap-10 gap-2">
      {shop?.data?.products.map((product: Products) => (
        <ProductCard key={product.id} product={product} shopName={shop?.data?.name || ''} />
      ))}
    </div>
  );
};

export default ShopProductList;

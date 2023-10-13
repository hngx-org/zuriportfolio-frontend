// components/ShopProductList.tsx
import { Products } from '../../../@types';
import ProductCard from '../component/otherProductCard';

interface OtherProductListProps {
  products: Products[];
}

const OtherProductList: React.FC<OtherProductListProps> = ({ products }) => {
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-2 md:gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default OtherProductList;

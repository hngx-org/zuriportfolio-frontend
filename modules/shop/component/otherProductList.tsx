// components/ShopProductList.tsx
import { Products } from '../../../@types';
import ProductCard from '../component/otherProductCard';

interface OtherProductListProps {
  products: Products[];
  productId: string;
}

const OtherProductList: React.FC<OtherProductListProps> = ({ products, productId }) => {
  const filteredArray = products.filter((product) => product.id !== productId);
  return (
    <>
      {filteredArray.length > 0 ? (
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-2 md:gap-6">
          {filteredArray.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="mt-8 py-8 px-4 text-center rounded-2xl border border-dark-110/20 text-dark-110 font-manropeL text-xl md:text-2xl font-semibold">
          No Product To Show
        </div>
      )}
    </>
  );
};

export default OtherProductList;

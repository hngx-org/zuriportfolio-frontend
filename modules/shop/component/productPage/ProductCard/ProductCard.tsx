// components/ProductCard.tsx
import Image from 'next/image';
import { Product } from '../../../../../@types';
import star1 from '../../../../../public/assets/star1.svg';
import star2 from '../../../../../public/assets/star2.svg';
interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="p-4 shadow border h-auto rounded-md bg-[#ffffff]">
      <div className="relative w-full h-52">
        <Image src={product.image} alt={product.name} layout="fill" objectFit="cover" className="rounded-md  h-52" />
      </div>
      <div className="flex flex-col gap-2 flex-grow">
        <div>
          <h3 className="mt-2 text-sm text-[#052011] font-normal capitalize">{product.name}</h3>
          <p className="text-[#052011] text-lg font-semibold">${product.price}</p>
        </div>
        <div>
          <p className="text-sm text-[#4F4E4E] font-normal">
            By: <span className="underline text-gray-500">Mark Essien</span>
          </p>
        </div>
        <div className="flex items-center mt-2">
          <Image src={star1} alt="rating star" />
          <Image src={star1} alt="rating star" />
          <Image src={star1} alt="rating star" />
          <Image src={star2} alt="rating star" />
          <Image src={star2} alt="rating star" />
        </div>{' '}
      </div>
    </div>
  );
};

export default ProductCard;

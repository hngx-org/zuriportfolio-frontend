// components/ProductCard.tsx
import Image from 'next/image';
import { Products } from '../../../../../@types';
import star1 from '../../../../../public/assets/star1.svg';
import star2 from '../../../../../public/assets/star2.svg';
import Link from 'next/link';

interface ProductCardProps {
  product: Products;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const isExternalImage = product.image.startsWith('http');

  return (
    <div className="p-4 shadow border h-auto rounded-md bg-[#ffffff]">
      <div className="relative w-full h-52">
        <Link href={`/shop/product?id=${product._id}`} passHref>
          <Image src={product.image} alt={product.name} layout="fill" objectFit="cover" className="rounded-md h-52" />
        </Link>{' '}
      </div>
      <div className="flex flex-col gap-2 flex-grow">
        <div>
          <h3 className="mt-2 text-sm text-[#052011] font-normal capitalize">{product.name}</h3>
          <p className="text-[#052011] text-lg font-semibold">${product.price}</p>
        </div>
        <div>
          <p className="text-sm text-[#4F4E4E] font-normal">
            By: <span className="underline text-gray-500">{product.shopOwner}</span>
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

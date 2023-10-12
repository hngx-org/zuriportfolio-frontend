// components/ProductCard.tsx
import Image from 'next/image';
import { Products } from '../../../@types';
import star1 from '../../../public/assets/star1.svg';
import star2 from '../../../public/assets/star2.svg';
import Link from 'next/link';
import router from 'next/router';

interface ProductCardProps {
  product: Products;
}

const OtherProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const isExternalImage = product.image.startsWith('http');

  const handleClick = () => {
    router.replace(router.asPath);
  };

  return (
    <div className="p-[0.66rem] md:p-4 shadow border h-auto sm:h-[22.75rem] md:h-auto rounded-md bg-[#ffffff]">
      <div className="relative w-full h-[7.5rem] sm:h-[70%] md:h-[13.0625rem]">
        <Link href={`/shop/product?id=${product._id}`} onClick={handleClick} passHref>
          <Image src={product.image} alt={product.name} layout="fill" objectFit="cover" className="rounded-md " />
        </Link>{' '}
      </div>
      <div className="flex flex-col gap-[0.33rem] flex-grow">
        <div>
          <h3 className="mt-2 text-sm text-[#052011] font-normal capitalize truncate md:tracking-[0.00088rem]">
            {product.name}
          </h3>
          <p className="text-[#052011] text-base md:text-lg font-semibold">${product.price}</p>
        </div>
        <div>
          <p className="text-[0.7rem] md:text-sm text-[#4F4E4E] font-normal tracking-[0.00219rem] -mt-1 md:mt-0">
            By: <span className="underline text-gray-500">{product.shopOwner}</span>
          </p>
        </div>
        <div className="flex items-center gap-x-[0.08288rem] h-[0.875rem] md:h-4 md:mt-5">
          <Image src={star1} alt="rating star" className="md:w-4 md:h-auto h-full w-[0.875rem]" />
          <Image src={star1} alt="rating star" className="md:w-4 md:h-auto h-full w-[0.875rem]" />
          <Image src={star1} alt="rating star" className="md:w-4 md:h-auto h-full w-[0.875rem]" />
          <Image src={star2} alt="rating star" className="md:w-4 md:h-auto h-full w-[0.875rem]" />
          <Image src={star2} alt="rating star" className="md:w-4 md:h-auto h-full w-[0.875rem]" />
          <span className="text-xs font-manropeL">(3)</span>
        </div>{' '}
      </div>
    </div>
  );
};

export default OtherProductCard;

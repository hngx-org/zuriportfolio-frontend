import Image from 'next/image';
import { FavoriteProduct } from '../../../@types';
import { RatingCard } from './RatingCard';
import Link from 'next/link';

export const FavoriteproductCard = ({ product }: { product: FavoriteProduct }) => {
  return (
    <div className="relative max-w-[285px] flex flex-col items-center justify-center  gap-5 rounded-lg border border-custom-color18 p-2  sm:p-4">
      <div className="flex flex-col  gap-1 md:gap-2">
        <Image src={product.productImage} alt={product.productName} className="" />
        <div className="text-brand-green-shade10 flex flex-col gap-1 md:gap-2">
          <p className="line-clamp-1 overflow-ellipsis font-normal text-sm">
            <Link href={`/marketplace/product-details`}>{product.productName}</Link>
          </p>
          <p className="font-bold text-lg">
            $<span>{product.productPrice}</span>
          </p>
          <p className="font-medium text-xs md:text-sm">
            By: <span className="underline cursor-pointer text-custom-color15">{product.productCreator}</span>
          </p>
        </div>
      </div>

      <div className="flex gap-1 self-start">
        <RatingCard rating={product.productRating} size={16} />
        <span className="text-custom-color15 text-sm font-medium">({product.numReviews})</span>
      </div>
      {product.isFavourite && (
        <div className="absolute top-1 left-1 bg-custom-color23 font-semibold text-xs px-5 py-3 text-white-100 rounded-md p-2 cursor-pointer">
          <span>Favourite</span>
        </div>
      )}
    </div>
  );
};

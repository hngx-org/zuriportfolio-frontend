import Image from 'next/image';
import { CartProductCardProps } from '../../../../../@types';
import { MouseEvent } from 'react';
import Link from 'next/link';

export default function ProductCard({
  id,
  productImage,
  productTitle,
  productPrice,
  productRating,
  productSeller,
  discountPercentage,
  tag,
  tagBackground,
  closeHandler,
}: CartProductCardProps & { closeHandler: (event: MouseEvent<HTMLElement>) => void }) {
  let tagStyle = ` absolute py-2 px-3 top-0 left-0 rounded-md text-[#fff] font-manropeB ${tagBackground} `;

  const getRating = () => {
    let maxRating = 5;
    const ratings = Array(productRating)
      .fill(1)
      .concat(Array(maxRating - productRating).fill(0));

    return ratings.map((rating, index) => (
      <Image
        key={index}
        className="h-5 w-5"
        src={rating === 1 ? '/assets/icons/star-fill.svg' : '/assets/icons/star-outline.svg'}
        width={25}
        height={25}
        alt={rating === 1 ? 'star-fill' : 'star-outline'}
      />
    ));
  };

  return (
    <Link href={`/marketplace/product-details?id=${id}`} className="border border-[#d5dbdd] hover:border-2 hover:shadow-md cursor-pointer rounded-md  lg:gap-x-3 lg:w-1/4 md:w-1/2 md:max-w-[290px] h-min-[250px] flex flex-col p-3 ">
      <div className="relative w-full lg:items-stretch flex-1 mb-3 overflow-hidden">
        <Image width={254} height={209} src={productImage} className="rounded-md" alt={productTitle}></Image>
        {discountPercentage && (
          <span className="absolute py-2 px-3 top-0 left-0 bg-[#e6f5ea] rounded-md">{discountPercentage}% off</span>
        )}
        {tag && <span className={tagStyle}>{tag}</span>}
        <Image
          onClick={closeHandler}
          id={id}
          className="absolute top-0 right-3"
          width={25}
          height={25}
          src="/assets/icons/close.svg"
          alt="close"
        ></Image>
      </div>
      <div className="md:w-[252px] ">
        <p className="truncate font-manropeL text-sm">{productTitle}</p>
        <p className="text-2xl font-bold font-manropeEB">${productPrice}</p>
        <div className="mt-2 font-light font-manropeL">
          <span>By:</span> <span className="underline">{productSeller}</span>
        </div>
        <div className="flex mt-5 mb-3">
          {getRating()} <span className="ml-2 font-manropeB">({productRating})</span>
        </div>
      </div>
    </Link>
  );
}

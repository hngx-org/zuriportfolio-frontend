import React from 'react';
import { ProductCardProps, starProps } from '../../../@types';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductCard({
  image,
  productName,
  productPrice,
  productOwner,
  productRating,
  showLimitedOffer,
  showTopPicks,
  showDiscount,
  discount,
}: ProductCardProps) {
  const productNameTrimmed = productName?.slice(0, 30);

  const stars: starProps = {
    1: { src: '/assets/images/stars/1StarRating.png', alt: '1 Star' },
    2: { src: '/assets/images/stars/2StarRating.png', alt: '2 Stars' },
    3: { src: '/assets/images/stars/3StarRating.png', alt: '3 Stars' },
    4: { src: '/assets/images/stars/4StarRating.png', alt: '4 Stars' },
    5: { src: '/assets/images/stars/5StarRating.png', alt: '5 Stars' },
  };

  const starRating = productRating in stars;

  return (
    <div className="p-2.5 md:p-[16px] border-[1px] border-[#D5DBDD] rounded-[8px] w-[286px] max-w-full">
      <Link href="">
        <div className="flex flex-col items-start">
          {/* Product Image */}
          <div>
            <div>
              {showTopPicks ? (
                <div className="absolute w-[100px] h-[36px] bg-[#59656F] rounded-[8px] flex items-center justify-center tracking-[0.4%] text-white-100 font-manropeL font-semibold text-[12px]">
                  Top Picks
                </div>
              ) : showDiscount ? (
                <div className="absolute w-[100px] h-[36px] bg-[#E6F5EA] rounded-[8px] flex items-center justify-center text-[#00894C] tracking-[0.4%] font-manropeL font-semibold text-[12px]">
                  {`${discount}% Off`}
                </div>
              ) : showLimitedOffer ? (
                <div className="absolute w-[100px] h-[36px] bg-[#FCEEE3] rounded-[8px] flex items-center justify-center text-[#A46A26] tracking-[0.4%] font-manropeL font-semibold text-[12px]">
                  Limited Offer
                </div>
              ) : null}
            </div>
            <Image src={image} alt="Landscape picture" width={254} height={209} className="rounded-[8px]" />
          </div>
          {/* Product Name */}
          <p className="font-manropeL text-[#052011] text-[14px] font-normal leading-[20px] letter tracking-[0.014px] pt-[8px] whitespace-nowrap text-ellipsis overflow-hidden w-full">
            {productName?.length > 30 ? <span>{productNameTrimmed}...</span> : productName}
          </p>
          {/* Product Price */}
          <h1 className="font-manropeL text-[#052011] text-[18px] font-bold leading-[20px] letter pt-[2px] pb-[8px]">
            {`$${productPrice}`}
          </h1>
          {/* Product Owner */}
          <p className="font-manropeL text-[#4F4E4E] text-[14px] font-normal leading-[20px] letter tracking-[0.035px] pb-[20px]">
            By: <span className="underline">{productOwner}</span>
          </p>
          {/* Star rating */}
          <div>
            {starRating ? (
              <div className="flex flex-row items-center gap-[5px]">
                <Image src={stars[productRating].src} alt="" width={111} height={20} className="" />
                <p className="font-manropeL font-semibold text-[14px] leading-[20px] tracking-[0.25%] text-[#4F4E4E]">{`(${productRating})`}</p>
              </div>
            ) : (
              <p>No Rating for this product</p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}

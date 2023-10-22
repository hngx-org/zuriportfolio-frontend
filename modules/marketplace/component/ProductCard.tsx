import React from 'react';
import { MarketPlaceProductCardProps, starProps } from '../../../@types';
import Image from 'next/image';
import Link from 'next/link';
import { encryptId } from '../../../utils/encrypt';

export default function ProductCard({
  image,
  name,
  price,
  user,
  rating,
  showLimitedOffer,
  showTopPicks,
  showDiscount,
  discount_price,
  id,
  currency,
  shop,
}: MarketPlaceProductCardProps) {
  const productNameTrimmed = name?.slice(0, 30);

  const stars: starProps = {
    1: { src: '/assets/images/stars/1StarRating.png', alt: '1 Star' },
    2: { src: '/assets/images/stars/2StarRating.png', alt: '2 Stars' },
    3: { src: '/assets/images/stars/3StarRating.png', alt: '3 Stars' },
    4: { src: '/assets/images/stars/4StarRating.png', alt: '4 Stars' },
    5: { src: '/assets/images/stars/5StarRating.png', alt: '5 Stars' },
  };

  const starRating = rating in stars;

  function formatPrice(price: number) {
    if (typeof price === 'string') {
      price = parseFloat(price);
    }

    if (isNaN(price)) {
      return price;
    }

    return price.toLocaleString('en-US', {
      useGrouping: true,
      minimumFractionDigits: 2,
    });
  }
  return (
    <div className="p-[16px] border-[1px] border-custom-color32 rounded-[8px] h-full w-[286px] max-w-full">
      <div className="flex flex-col h-full items-start">
        {/* Product Image */}
        <Link href={`/marketplace/product-details/${encryptId(id)}`} className="relative flex flex-col">
          <div>
            <div>
              {showTopPicks ? (
                <div className="absolute w-[100px] h-[36px] bg-custom-color23 rounded-[8px] flex items-center justify-center tracking-[0.4%] text-white-100 font-manropeL font-semibold text-[12px]">
                  Top Picks
                </div>
              ) : showDiscount ? (
                <div className="absolute w-[100px] h-[36px] bg-brand-green-shade95 rounded-[8px] flex items-center justify-center text-brand-green-shade50 tracking-[0.4%] font-manropeL font-semibold text-[12px]">
                  {`${discount_price ? Math.floor((discount_price / price) * 100) : 0}% Off`}
                </div>
              ) : showLimitedOffer ? (
                <div className="absolute w-[100px] h-[36px] bg-custom-color24 rounded-[8px] flex items-center justify-center text-custom-color25 tracking-[0.4%] font-manropeL font-semibold text-[12px]">
                  Limited Offer
                </div>
              ) : null}
            </div>

            {image ? (
              <div className="max-w-[300px] w-[100%] h-[120px] md:h-[209px] overflow-hidden">
                <Image
                  src={image}
                  alt={name}
                  width={0}
                  height={0}
                  style={{ height: '100%', width: '100vw' }}
                  sizes="100vw"
                  className="rounded-[8px] object-cover h-[100%] w-[100%]"
                />
              </div>
            ) : (
              <Image
                src="/assets/dummyImage.jpg"
                alt="dummy image"
                width={254}
                height={209}
                className="rounded-[8px]"
              />
            )}
          </div>
          {/* Product Name */}
          <p className="font-manropeL mt-[0.5rem] text-brand-green-shade10 w-full text-ellipsis whitespace-nowrap overflow-hidden text-[14px] font-normal leading-[20px] letter tracking-[0.014px] pt-[8px]">
            {name?.length > 30 ? <span>{productNameTrimmed}...</span> : name}
          </p>
          {/* Product Price */}
          <h1 className="font-manropeL text-brand-green-shade10 text-[18px] font-bold leading-[20px] letter pt-[2px] pb-[8px]">
            {`₦ ${formatPrice(price)}`}
          </h1>
        </Link>
        {/* Product Owner */}
        <p className="font-manropeL text-custom-color15 text-[14px] font-normal leading-[20px] letter tracking-[0.035px] pb-[20px]">
          By:{' '}
          <Link href={shop?.id ? `/shop/?shop_id=${shop.id}` : '/shop'} className="underline">
            {user}
          </Link>
        </p>
        {/* Star rating */}
        <Link href={`/marketplace/product-details/${id}`}>
          <div>
            {starRating ? (
              <div className="flex flex-row items-center gap-[5px]">
                <Image src={stars[rating].src} alt="" width={111} height={20} className="" />
                <p className="font-manropeL font-semibold text-[14px] leading-[20px] tracking-[0.25%] text-custom-color15">{`(${rating})`}</p>
              </div>
            ) : (
              <p>No Rating for this product</p>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
}

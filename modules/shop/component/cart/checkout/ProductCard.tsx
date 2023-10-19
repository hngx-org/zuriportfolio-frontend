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
    
    <div className="border min-w-[250px] w-[350px] relative border-[#d5dbdd] hover:border-2 hover:shadow-md 
            cursor-pointer rounded-md lg:gap-x-3 lg:w-1/4 md:w-1/2 
            md:max-w-[290px] h-min-[250px] flex flex-col p-3 ">
      <Image
        onClick={closeHandler}
        id={id}
        className="absolute top-3 right-3 z-20"
        width={25}
        height={25}
        src="/assets/icons/close.svg"
        alt="close"
      ></Image>
      <Link
        href={`/marketplace/product-details?id=${id}`}
        
      >
        <div className="relative w-full md:items-stretch flex-1 mb-3 overflow-hidden">
          
          <div className='lg:max-w-[300px] lg:w-[100%] h-[200px] md:h-[209px] overflow-hidden z-50'>
            <Image width={0} height={0} src={productImage}  
            alt={productTitle} 
            style={{ height: '100%', width: '100vw' }}
            sizes="100vw"
            className="rounded-[8px] object-cover h-[100%] w-[100%]"
            />
            {discountPercentage && (
              <span className="absolute py-2 px-3 top-0 left-0 bg-[#e6f5ea] rounded-md">{discountPercentage.toFixed(1)}% off</span>
            )}
            {tag && <span className={tagStyle}>{tag}</span>}
          
          </div>

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
    </div>
  );
}

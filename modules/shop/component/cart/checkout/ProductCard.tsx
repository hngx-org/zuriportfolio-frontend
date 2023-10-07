import Image from 'next/image';
import { CartProductCardProps } from '../../../../../@types';

export default function ProductCard({
  productImage,
  productTitle,
  cardStyle,
  productPrice,
  productRating,
  productSeller,
  discountPercentage,
  tag,
  tagBackground,
}: CartProductCardProps) {
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
    <div className={cardStyle}>
      <div className="relative w-full h-[250px] overflow-hidden mb-3">
        <Image layout="fill" src={productImage} alt={productTitle}></Image>
        {discountPercentage && (
          <span className="absolute py-2 px-3 top-0 left-0 bg-[#e6f5ea] rounded-md">{discountPercentage}% off</span>
        )}
        {tag && <span className={tagStyle}>{tag}</span>}
        <Image
          className="absolute top-0 right-0"
          width={25}
          height={25}
          src="/assets/icons/close.svg"
          alt="close"
        ></Image>
      </div>
      <div className="md:w-[252px] ">
        <p className="truncate font-manropeL">{productTitle}</p>
        <p className="text-2xl font-bold font-manropeEB">${productPrice}</p>
        <div className="mt-2 font-light font-manropeL">
          <span>By:</span> <span className="underline">{productSeller}</span>
        </div>
        <div className="flex mt-5 mb-3">
          {getRating()} <span className="ml-2 font-manropeB">({productRating})</span>
        </div>
      </div>
    </div>
  );
}

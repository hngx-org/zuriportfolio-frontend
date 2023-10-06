import { CartProductCardProps, ProductCardProps } from '../../../../../@types';

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
  let tagStyle = ` absolute py-2 px-3 top-0 left-0 rounded-md text-[#fff] ${tagBackground} `;
  const get_rating = () => {
    let MAX_RATING = 5;
    let ratings: any[] = [];

    for (let i = 0; i < productRating; i++) {
      ratings.push(1);
    }

    if (ratings.length < 5) {
      let y = 5 - ratings.length;

      for (let x = 0; x < y; x++) {
        ratings.push(0);
      }
    }
    let content = ratings.map((rating) => {
      if (rating > 0) {
        return <img className="h-5 w-5" src="/assets/icons/star-fill.svg" alt="" />;
      } else {
        return <img className="h-5 w-5" src="/assets/icons/star-outline.svg" alt="" />;
      }
    });

    return content;
  };
  return (
    <div className={cardStyle}>
      <div className="relative  mb-3">
        <img className="w-full" src={productImage} alt={productTitle} />
        {discountPercentage && (
          <span className="absolute py-2 px-3 top-0 left-0 bg-[#e6f5ea] rounded-md">{discountPercentage}% off</span>
        )}
        {tag && <span className={tagStyle}>{tag}</span>}
        <img className="absolute top-0 right-0" src="/assets/icons/close.svg" alt="" />
      </div>
      <div className="md:w-[252px] ">
        <p className="truncate">{productTitle}</p>
        <p className="text-2xl font-bold">${productPrice}</p>
        <div className="mt-2 font-light">
          <span>By:</span> <span className="underline">{productSeller}</span>
        </div>
        <div className="flex mt-5 mb-3">{get_rating()}</div>
      </div>
    </div>
  );
}

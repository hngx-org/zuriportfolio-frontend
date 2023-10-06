import Image from 'next/image';
import star_0 from '../../../public/assets/wishlistAssets/star_0.svg';
import star_1 from '../../../public/assets/wishlistAssets/star_1.svg';

export const RatingCard = ({ rating, size }: { rating: number; size: number }) => {
  const starsToRender = Array.from({ length: 5 }, (_, index) => (
    <Image key={index} src={index < rating ? star_1 : star_0} alt="star" width={size} height={size} />
  ));

  return <div className="flex  justify-start">{starsToRender}</div>;
};

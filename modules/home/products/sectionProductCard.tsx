import { RatingCard } from '@modules/marketplace/component/RatingCard';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  title: string;
  price?: string;
  rating?: number;
  image: string;
  shop?: string;
  currency?: string;
  id?: string;
};

const SectionProductCard = ({ title, price, rating, image, shop, currency, id }: Props) => {
  return (
    <div className="py-4 px-1 sm:w-1/2 md:w-1/3 lg:w-1/4">
      <div className="h-full border-2 border-white-300 border-opacity-40 rounded-lg overflow-hidden">
        <Image
          width={400}
          height={400}
          className="lg:h-48 md:h-36 w-full p-4 mt-2 object-cover object-center"
          src={image}
          alt={title}
        />
        <div className="p-6">
          <Link
            className="tracking-low text-[14px] font-manropeL text-[#052011] mb-1"
            href={`/marketplace/product-details?id=${id}`}
          >
            {title}
          </Link>
          <h1 className="title-font text-lg font-manropeB text-[#052011] mb-3">₦ {price}</h1>
          <p className="leading-none mb-3 text-[12px] font-manropeL">By {shop}</p>
          <div>
            <RatingCard rating={rating} size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionProductCard;

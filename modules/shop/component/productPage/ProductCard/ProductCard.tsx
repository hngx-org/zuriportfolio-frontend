// components/ProductCard.tsx
import Image from 'next/image';
import { Products } from '../../../../../@types';
import star1 from '../../../../../public/assets/star1.svg';
import star2 from '../../../../../public/assets/star2.svg';
import Link from 'next/link';
import { Eye, ShoppingCart } from 'iconsax-react';
import { useCart } from '../../CartContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ProductCardProps {
  product: Products;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);

    toast.success('Added to Cart', {
      position: 'top-right',
      autoClose: 3000,
    });
  };

  const renderRatingStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const starType = i <= rating ? 'star1' : 'star2';
      stars.push(<Image src={starType === 'star1' ? star1 : star2} alt={`Star ${i}`} key={i} />);
    }
    return stars;
  };
  return (
    <div className="p-2 w-full shadow border border-[#ccc] h-auto rounded-md bg-[#ffffff]  hover:shadow-[#ccc] group overflow-hidden">
      <div className="relative w-full max-w-md h-auto">
        <Link href={`/shop/product?id=${product._id}`} passHref>
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={150}
            objectFit="cover"
            className="rounded-md  h-60 scale-100 hover:scale-105 transition-transform duration-300 object-cover "
          />
        </Link>{' '}
        <div className="w-10 h-20 absolute bottom-10 right-0 border-[1px] border-[#ccc] bg-[#fff] rounded-md flex flex-col translate-x-20 group-hover:translate-x-0 transition-transform duration-300">
          <span
            onClick={handleAddToCart}
            className="w-full h-full text-black border-b -[1px] border-b-[#ccc] flex items-center justify-center text-sm bg-transparent hover:bg-[#febd69] hover:text-white-100 cursor-pointer duration-300"
          >
            <ShoppingCart size={17} />
          </span>
          <Link
            href={`/shop/product?id=${product._id}`}
            passHref
            className="w-full h-full text-black border-b -[1px] border-b-[#ccc] flex items-center justify-center text-sm bg-transparent hover:bg-[#febd69] hover:text-white-100 cursor-pointer duration-300"
          >
            <Eye size={17} />
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-2 flex-grow py-2 px-2">
        <div>
          <h3 className=" md:text-sm text-xs text-[#052011] font-normal font-manropeEL capitalize">{product.name}</h3>
          <p className="text-[#052011] text-lg font-manropeEB font-semibold">${product.price}</p>
        </div>
        <div>
          <p className="text-sm text-[#4F4E4E] font-manropeL">
            By: <span className="underline text-gray-500">{product.shopOwner}</span>
          </p>
        </div>
        <div className="flex items-center mt-2">{renderRatingStars(product.rating)}</div>
      </div>
    </div>
  );
};

export default ProductCard;

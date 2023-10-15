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
import axios from 'axios';
import { useAuth } from '../../../../../context/AuthContext';

interface ProductCardProps {
  product: Products;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { auth } = useAuth();

  const handleAddToCart = async () => {
    try {
      const response = await axios.post(
        'https://zuri-cart-checkout.onrender.com/api/checkout/api/carts',
        {
          product_ids: [product.id],
        },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        },
      );
      if (response.status === 200) {
        addToCart(product);

        toast.success('Added to Cart', {
          position: 'top-right',
          autoClose: 3000,
        });
        console.log('Database Response Message:', response.data);
      } else {
        toast.error('Failed to add to Cart', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const renderRatingStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const starType = i <= rating ? 'star1' : 'star2';
      stars.push(
        <Image
          src={starType === 'star1' ? star1 : star2}
          alt={`Star ${i}`}
          key={i}
          className="w-3 h-3 md:w-5  md:h-5"
        />,
      );
    }
    return stars;
  };
  return (
    <div className="p-2 w-full  max-w-[274px] shadow border border-custom-color32 h-auto rounded-lg bg-white-100  hover:shadow-[#ccc] group overflow-hidden">
      <div className="relative w-full max-w-[254px] h-auto">
        <Link href={`/shop/product?id=${product.id}`} passHref>
          <Image
            src={product.image[0].url}
            alt={product.name}
            width={700}
            height={450}
            priority
            sizes="(max-width: 780px) 100vw, (max-width: 1024px) 50vw, 700px"
            className="rounded-md   h-60 scale-100 hover:scale-105 transition-transform duration-300 object-cover "
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
            href={`/shop/product?id=${product.id}`}
            passHref
            className="w-full h-full text-black border-b -[1px] border-b-[#ccc] flex items-center justify-center text-sm bg-transparent hover:bg-[#febd69] hover:text-white-100 cursor-pointer duration-300"
          >
            <Eye size={17} />
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-2 flex-grow py-1 px-2">
        <div>
          <h3 className=" md:text-sm text-xs text-[#052011] font-normal font-manropeEL capitalize">{product.name}</h3>
          <p className="text-[#052011] md:text-lg text-base font-manropeB ">${product.price}</p>

          <div>
            <p className="md:text-sm text-xs text-custom-color15 font-manropeL">
              By: <span className="underline text-custom-color15">{product.category.name}</span>
            </p>
          </div>
        </div>
        <div className="inline-flex items-center gap-2 mt-4">
          <div className="flex items-center ">
            <Image src={star1} alt="rating star" className="w-3 h-3 md:w-5  md:h-5" />
            <Image src={star1} alt="rating star" className="w-3 h-3 md:w-5  md:h-5" />
            <Image src={star1} alt="rating star" className="w-3 h-3 md:w-5  md:h-5" />
            <Image src={star2} alt="rating star" className="w-3 h-3 md:w-5  md:h-5" />
            <Image src={star2} alt="rating star" className="w-3 h-3 md:w-5  md:h-5" />
          </div>{' '}
          (3)
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

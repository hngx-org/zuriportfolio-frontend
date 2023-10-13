import { useCart } from '@modules/shop/component/CartContext';
import Trending from '@modules/shop/component/carts/Trending';
import Layout from '@modules/shop/component/productPage/Layout';
import { staticProducts } from '@modules/shop/staticProducts';
import { ArrowRight, CloseCircle, Trash } from 'iconsax-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import star1 from '../../../public/assets/star1.svg';
import star2 from '../../../public/assets/star2.svg';
import RemoveFromCartModal from '@modules/shop/component/carts/RemoveFromCartModal';
import { Products } from '../../../@types';

const CartPage: React.FC = () => {
  const { cart, removeFromCart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [shopOwnerQuery, setShopOwnerQuery] = useState('');
  const [categoryQuery, setCategoryQuery] = useState('');
  const [cartItemCount, setCartItemCount] = useState(0);
  const categories: string[] = [];
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const renderRatingStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const starType = i <= rating ? 'star1' : 'star2';
      stars.push(<Image className="w-5 h-5" src={starType === 'star1' ? star1 : star2} alt={`Star ${i}`} key={i} />);
    }
    return stars;
  };

  const [showRemoveConfirmation, setShowRemoveConfirmation] = useState(false);
  const [productToRemove, setProductToRemove] = useState<Products | null>(null);

  const handleConfirmRemove = () => {
    if (productToRemove) {
      removeFromCart(productToRemove._id);
      setShowRemoveConfirmation(false);
      setProductToRemove(null);
    }
  };

  const handleCloseModal = () => {
    setShowRemoveConfirmation(false);
  };

  return (
    <>
      {showRemoveConfirmation && <RemoveFromCartModal onClose={handleCloseModal} onConfirm={handleConfirmRemove} />}
      <Layout
        setSearchQuery={setSearchQuery}
        cartItemCount={cartItemCount}
        categories={categories}
        setShopOwnerQuery={setShopOwnerQuery}
        setCategoryQuery={setCategoryQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        handleCategoryChange={handleCategoryChange}
      >
        <div className=" container mx-auto  w-full  px-6 grid grid-cols-5 gap-10 ">
          {cart.length > 0 ? (
            <>
              <div className="bg-white col-span-4 py-10 rounded-lg">
                <div className="flex items-center justify-between  pb-1">
                  <p className="text-4xl font-semibold ">Cart</p>
                </div>

                <div className="pt-2 flex flex-col gap-2  ">
                  {cart.map((product) => (
                    <div key={product._id} className=" flex items-center gap-8 border-b-[1px] border-b-white-300 py-5">
                      <Image
                        className="object-cover rounded-md max-h-36"
                        width={200}
                        height={100}
                        src={product.image}
                        alt="productImage"
                      />
                      <div className="flex items-center justify-between w-full px-2">
                        <div className="flex flex-col gap-1">
                          <p className="text-base font-manropeEB text-[#444846]">{product.name}</p>
                          <p className="font-manropeEL text-sm text-[#444846]">By {product.shopOwner}</p>
                          <div className="inline-flex items-center font-manropeEB text-sm gap-3">
                            {product.rating}.0
                            <div className="flex flex-row my-3 mx-0">{renderRatingStars(product.rating)}</div>
                          </div>

                          <p className="text-sm text-gray-600">
                            <span className="font-manropeEB text-brand-green-pressed">${product.price}</span>
                          </p>
                        </div>
                        <div
                          onClick={() => {
                            setProductToRemove(product);
                            setShowRemoveConfirmation(true);
                          }}
                          className="flex items-center text-sm font-medium text-gray-400 hover:text-red-600 cursor-pointer duration-300"
                        >
                          <Trash size="17" color="#ff8a65" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white h-full text-center py-20 col-span-5 flex flex-col items-center justify-center rounded-lg ">
              <h1 className="text-4xl  font-manropeEB capitalize">Your cart is empty!</h1>
              <p className="text-xs font-manropeEB text-slate-200 py-3">
                Looks like you havent added anything to Your Cart yet
              </p>
              <Link href="/shop">
                <button className="md:px-20 px-10  hover:bg-brand-green-hover inline-flex gap-3 items-center h-10 bg-[#009254] text-white-100 mt-2 rounded-lg text-sm font-manropeEL hover:bg-amazon_yellow ">
                  Start Shopping <ArrowRight />
                </button>
              </Link>
            </div>
          )}
        </div>
        <div className="py-2">
          <div className="border-b-white-300  border-t-white-300  border-b border-t w-full">
            <div className="container font-manropeL text-xs mx-auto px-4 sm:px-6 md:px-3 py-5">
              <h1>
                Need some help ? <span className="text-green-300">Chat Now</span> or call +234-zuri-store{' '}
              </h1>
            </div>
          </div>
        </div>

        <Trending products={staticProducts} />
      </Layout>
    </>
  );
};

export default CartPage;

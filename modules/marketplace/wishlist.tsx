import favProductImg1 from '../../public/assets/wishlistAssets/favProductImg1.png';
import favProductImg2 from '../../public/assets/wishlistAssets/favProductImg2.png';
import favProductImg3 from '../../public/assets/wishlistAssets/favProductImg3.png';
import favProductImg4 from '../../public/assets/wishlistAssets/favProductImg4.png';

import wishlistProductImg1 from '../../public/assets/wishlistAssets/wishlistProductImg1.png';
import wishlistProductImg2 from '../../public/assets/wishlistAssets/wishlistProductImg2.png';
import wishlistProductImg3 from '../../public/assets/wishlistAssets/wishlistProductImg3.png';
import wishlistProductImg4 from '../../public/assets/wishlistAssets/wishlistProductImg4.png';
import wishlistProductImg5 from '../../public/assets/wishlistAssets/wishlistProductImg5.png';
import wishlistProductImg6 from '../../public/assets/wishlistAssets/wishlistProductImg6.png';
import wishlistProductImg7 from '../../public/assets/wishlistAssets/wishlistProductImg7.png';
import wishlistProductImg8 from '../../public/assets/wishlistAssets/wishlistProductImg8.png';

import loadingIllustration from '../../public/assets/wishlistAssets/loadingIllustration.svg';

import { WishlistProduct } from '../../@types';
import { FavoriteProduct } from '../../@types';
import { CloseCircle, ArrowRight2 } from 'iconsax-react';
import { useState, useEffect } from 'react';

import Button from '@ui/Button';
import Image from 'next/image';

import { WishlistProductCard } from './component/WishlistProductCard';
import { FavoriteproductCard } from './component/FavoriteProductCard';

function Wishlist() {
  const [showEmptyWishlistModal, setShowEmptyWishlistModal] = useState(false);

  const [wishlistProducts, setWishlistProducts] = useState<WishlistProduct[]>(initialWishlistProducts);
  const [favoriteProducts, setFavoriteProducts] = useState<FavoriteProduct[]>(initialFavoriteProducts);

  const removeProductFromWishlist = (productId: string) => {
    const newWishlistProducts = wishlistProducts.filter((product: WishlistProduct) => product.productId !== productId);
    setWishlistProducts(newWishlistProducts);
  };

  const removeEmptyWishlistModal = () => {
    setShowEmptyWishlistModal(false);
  };

  useEffect(() => {
    if (wishlistProducts.length < 1) {
      setShowEmptyWishlistModal(true);
    }
  }, [wishlistProducts]);

  return (
    <main className="absolute w-full mx-auto">
      {showEmptyWishlistModal && (
        <div className="absolute top-0 left-0 w-full h-screen bg-black bg-opacity-50 backdrop-blur-5 z-10 flex justify-center items-center ">
          {/* close button */}

          <div className="absolute top-0 right-0 mr-5 mt-5">
            <Button
              leftIcon={<CloseCircle color="#06C270" />}
              intent={'secondary'}
              size={'sm'}
              onClick={() => removeEmptyWishlistModal()}
            >
              Close
            </Button>
          </div>

          <div className="bg-white-100 py-3 md:py-4 flex flex-col justify-center items-center gap-5 rounded-md w-9/12 md:w-[485px]">
            <Image src={loadingIllustration} alt="loading" width={100} height={100} />

            <div className="flex flex-col gap-2 items-center">
              <h3 className="text-[#101828] text-sm font-bold md:text-xl">Your wishlist is Empty</h3>
              <p className="text-[#475467] text-xs md:text-sm">Looks like you have no items in your wishlist.</p>
            </div>
            <Button intent={'primary'} size={'sm'} className="h-[44px] rounded-md mb-4">
              Start Shopping
            </Button>
          </div>
        </div>
      )}
      <div className="font-manropeL max-w-[1240px] mx-auto my-8 ">
        <section className="py-5 px-5 sm:px-[30px] md:px-[98px] flex flex-col gap-6 my-4">
          <div className="flex justify-between items-center">
            <h2 className="sm:text-[28px] text-[16px] font-semibold text-[#052011]">
              My Wishlist (<span>{wishlistProducts.length}</span> items)
            </h2>
          </div>
          <div className="flex flex-col gap-6">
            {wishlistProducts.map((product) => (
              <WishlistProductCard
                key={product.productId}
                product={product}
                removeProductFromWishlist={removeProductFromWishlist}
              />
            ))}
          </div>
        </section>
        <section className="py-5 px-5 sm:px-[30px] md:px-[98px] flex flex-col gap-6 my-4">
          <div className="flex justify-between items-center">
            <h2 className="sm:text-[28px] text-[16px] font-semibold text-[#052011]">My Favorites</h2>
            <Button
              rightIcon={<ArrowRight2 color="#06C270" />}
              intent={'secondary'}
              size={'md'}
              spinnerColor="#000"
              className="border-none bg-white-100 text-[#06C270] font-semibold"
            >
              View All
            </Button>
          </div>
          <div className="gap-2 sm:gap-6 md:gap-8  gap-y-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {favoriteProducts.map((product) => (
              <FavoriteproductCard product={product} key={product.productId} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default Wishlist;

const initialWishlistProducts: WishlistProduct[] = [
  {
    productId: '1',
    productName: 'Webinar and Course Slides Template',
    productPrice: 100,
    productImage: wishlistProductImg1,
    productRating: 4,
    numReviews: 3,
    productCategory: 'Presentation Templates',
    inStock: false,
    inCart: false,
  },
  {
    productId: '2',
    productName: 'Webinar and Course Slides Template',
    productPrice: 65,
    productImage: wishlistProductImg2,
    productRating: 2,
    numReviews: 91,
    productCategory: 'Presentation Templates',
    inStock: true,
    inCart: true,
  },
  {
    productId: '3',
    productName: 'Webinar and Course Slides Template',
    productPrice: 0,
    productImage: wishlistProductImg3,
    productRating: 1,
    numReviews: 3,
    productCategory: 'Presentation Templates',
    inStock: false,
    inCart: true,
  },
  {
    productId: '4',
    productName: 'Webinar and Course Slides Template',
    productPrice: 0,
    productImage: wishlistProductImg4,
    productRating: 4,
    numReviews: 3,
    productCategory: 'Presentation Templates',
    inStock: false,
    inCart: true,
  },
  {
    productId: '5',
    productName: 'Webinar and Course Slides Template',
    productPrice: 92,
    productImage: wishlistProductImg5,
    productRating: 3,
    numReviews: 99,
    productCategory: 'Presentation Templates',
    inStock: false,
    inCart: true,
  },
  {
    productId: '6',
    productName: 'Webinar and Course Slides Template',
    productPrice: 89.99,
    productImage: wishlistProductImg6,
    productRating: 2,
    numReviews: 33,
    productCategory: 'Presentation Templates',
    inStock: false,
    inCart: true,
  },
  {
    productId: '7',
    productName: 'Webinar and Course Slides Template',
    productPrice: 33.9,
    productImage: wishlistProductImg7,
    productRating: 1,
    numReviews: 12,
    productCategory: 'Presentation Templates',
    inStock: false,
    inCart: true,
  },
  {
    productId: '8',
    productName: 'Webinar and Course Slides Template',
    productPrice: 20,
    productImage: wishlistProductImg8,
    productRating: 4,
    numReviews: 3,
    productCategory: 'Presentation Templates',
    inStock: false,
    inCart: true,
  },
];

const initialFavoriteProducts: FavoriteProduct[] = [
  {
    productId: '1',
    productName: 'Webinar and Course Slides Template',
    productPrice: 170,
    productImage: favProductImg1,
    productRating: 2,
    numReviews: 9,
    isFavourite: true,
    productCreator: 'Mark Essein',
  },
  {
    productId: '2',
    productName: 'Webinar and Course Slides Template',
    productPrice: 99.9,
    productImage: favProductImg2,
    productRating: 1,
    numReviews: 16,
    isFavourite: true,
    productCreator: 'Mark Essein',
  },
  {
    productId: '3',
    productName: 'Webinar and Course Slides Template',
    productPrice: 190,
    productImage: favProductImg3,
    productRating: 4,
    numReviews: 3,
    isFavourite: true,
    productCreator: 'Mark Essein',
  },
  {
    productId: '4',
    productName: 'Webinar and Course Slides Template',
    productPrice: 50,
    productImage: favProductImg4,
    productRating: 5,
    numReviews: 3,
    isFavourite: true,
    productCreator: 'Mark Essein',
  },
];

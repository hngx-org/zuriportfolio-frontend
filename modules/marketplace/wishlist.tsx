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
import { CloseCircle, ArrowRight2 } from 'iconsax-react';
import { useState, useEffect } from 'react';

import Button from '@ui/Button';
import Image from 'next/image';

import { WishlistProductCard } from './component/WishlistProductCard';

import MainLayout from '../../components/Layout/MainLayout';

import Container from '@modules/auth/component/Container/Container';

// importing axios to send my request
import Axios, { AxiosResponse } from 'axios';
// importing toastify
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CategoryLayout from './component/layout/category-layout';

function Wishlist() {
  const [showEmptyWishlistModal, setShowEmptyWishlistModal] = useState(false);

  const [wishlistProducts, setWishlistProducts] = useState<WishlistProduct[]>(initialWishlistProducts);

  // Function to remove a product from the wishlist API
  const removeProductFromWishlistAPI = async (productId: string): Promise<boolean> => {
    try {
      // Replace 'your-api-endpoint' with the actual API endpoint for removing a product
      const response: AxiosResponse = await Axios.delete(
        `https://coral-app-8bk8j.ondigitalocean.app/api/wishlist/${productId}`,
      );
      if (response.status === 200) {
        // Product removed successfully
        toast.success('Product removed successfully');
        return true;
      }
    } catch (error: any) {
      // Handle errors (e.g., network error, server error)
      console.error('Error removing product from the wishlist:', error);
      toast.error(error.response.data.detail ? error.response.data.detail : 'Error removing product from wishlist');
    }
    return false;
  };

  const removeProductFromWishlist = async (productId: string) => {
    const removed: boolean = await removeProductFromWishlistAPI(productId);
    if (removed) {
      // If the product was removed from the API, update the local wishlistProducts
      const newWishlistProducts = wishlistProducts.filter(
        (product: WishlistProduct) => product.productId !== productId,
      );
      setWishlistProducts(newWishlistProducts);
    }
  };

  const removeEmptyWishlistModal = () => {
    setShowEmptyWishlistModal(false);
  };

  useEffect(() => {
    if (wishlistProducts.length < 1) {
      setShowEmptyWishlistModal(true);
    }
  }, [wishlistProducts]);

  useEffect(() => {
    document.body.style.overflow = showEmptyWishlistModal ? 'hidden' : 'unset';
  }, [showEmptyWishlistModal]);

  const moveToCart = (productId: string) => {
    const newWishlistProducts = wishlistProducts.filter((product: WishlistProduct) => product.productId !== productId);
    setWishlistProducts(newWishlistProducts);
    toast.success('Added item to cart');
  };
  return (
    <>
      <ToastContainer />
      {showEmptyWishlistModal && (
        <div className="absolute top-0 left-0 right-0 bottom-0 w-full h- bg-black bg-opacity-50 backdrop-blur-5 z-[9999] flex justify-center items-center ">
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
              <h3 className="text-custom-color10 text-sm font-bold md:text-xl">Your wishlist is Empty</h3>
              <p className="text-custom-color14 text-xs md:text-sm">Looks like you have no items in your wishlist.</p>
            </div>
            <Button intent={'primary'} size={'sm'} className="h-[44px] rounded-md mb-4">
              Start Shopping
            </Button>
          </div>
        </div>
      )}
      {/* <MainLayout activePage="marketplace" showDashboardSidebar={false} showFooter={true} showTopbar={true}> */}
      <CategoryLayout>
        <Container>
          <div className="font-manropeL max-w-[1240px] mx-auto my-8">
            <section className="flex flex-col gap-10 mb-20">
              <div className="flex justify-between items-center">
                <h2 className="sm:text-[28px] text-[16px] font-semibold text-brand-green-shade10">
                  My Wishlist (<span>{wishlistProducts.length}</span> items)
                </h2>
              </div>
              <div className="flex flex-col gap-6  lg:px-[100px]">
                {wishlistProducts.map((product) => (
                  <WishlistProductCard
                    moveToCart={moveToCart}
                    key={product.productId}
                    product={product}
                    removeProductFromWishlist={removeProductFromWishlist}
                  />
                ))}
              </div>
            </section>
          </div>
        </Container>
      </CategoryLayout>
      {/* </MainLayout> */}
    </>
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

import Image from 'next/image';
import { WishlistProduct } from '../../../@types';
import { RatingCard } from './RatingCard';
import Button from '@ui/Button';
import deleteIcon from '../../../public/assets/wishlistAssets/delete.svg';

export const WishlistProductCard = ({
  product,
  removeProductFromWishlist,
}: {
  product: WishlistProduct;
  removeProductFromWishlist: (productId: string) => void;
}) => {
  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <div className="flex gap-3 md:gap-9  md:max-w-[500px] lg:max-w-[550px]">
          <div className="">
            <Image
              src={product.productImage}
              alt={product.productName}
              className="h-full min-w-[145px] md:min-w-[165px]"
            />
          </div>
          <div className="flex flex-col gap-2 md:gap-3">
            <div className="flex flex-col gap-2 md:gap-3">
              <div className="flex gap-2 md:gap-3 items-center">
                <div className="flex flex-col gap-2">
                  <p className="text-[10px] md:text-xs text-custom-color16">{product.productCategory}</p>
                  <p className="line-clamp-1 text-[12px] md:text-[16px] font-semibold overflow-ellipsis">
                    {product.productName}
                  </p>
                </div>

                <p className="font-bold text-[12px] md:text-[16px]">
                  $<span>{product.productPrice}</span>
                </p>
              </div>
              
              <div className="gap-1 self-start hidden md:flex">
                <RatingCard rating={product.productRating} size={22} />
                <span className="text-[12px] md:text-lg text-custom-color15">({product.numReviews})</span>
           
                </div>
                <div
                className='md:hidden flex gap-1 self-start'
                >
                <RatingCard rating={product.productRating} size={12} />
                <span className="text-[12px] md:text-lg text-custom-color15">({product.numReviews})</span>
           
                </div>
               
              <div className="md:hidden">
                <p
                  className={`text-[10px] md:text-xs font-medium ${
                    product.inStock ? 'text-brand-green-primary' : 'text-brand-red-primary'
                  } `}
                >
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </p>
              </div>
              <div className="md:hidden">
                <Button
                  className="bg-white-100 rounded-md h-[40px] border border-custom-color17 text-brand-green-shade50 px-3 py-1"
                  size={'sm'}
                  intent={'tertiary'}
                  spinnerColor="#00894C px-3 py-1"
                >
                  <span
                  className='text-[12px] md:text-lg '
                  >
                  {product.inCart ? 'Explore Similar' : 'Move To Cart'}
                
                  </span>
                </Button>
              </div>
            </div>

            <div className="hidden md:flex gap-3 self-start">
              <Button
                className="hover:bg-red-200 hover:text-white-100 p-3 bg-white rounded-md  border border-custom-color17 text-white-650 "
                size={'sm'}
                spinnerColor="#D5DBDB"
                onClick={() => removeProductFromWishlist(product.productId)}
              >
                <div>
                  <Image src={deleteIcon} alt="delete" />
                </div>
                Remove
              </Button>
              <Button
                className={`hover:bg-white-100 bg-white-100 rounded-md border border-custom-color17 ${
                  product.inStock ? 'text-brand-green-primary' : 'text-brand-red-primary'
                }`}
                size={'sm'}
                intent={'tertiary'}
              >
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </Button>
            </div>
          </div>
        </div>

        <div className="md:hidden self-start mt-1" onClick={() => removeProductFromWishlist(product.productId)}>
          <Image src={deleteIcon} alt="delete" width={35} height={35} />
        </div>
        <div className="hidden md:block">
          <Button
            className="bg-white rounded-md border border-custom-color17 text-brand-green-shade50"
            size={'sm'}
            intent={'tertiary'}
            spinnerColor="#00894C px-4 py-2"
          >
            {product.inCart ? 'Explore Similar' : 'Move To Cart'}
          </Button>
        </div>
      </div>
      <div
        className="
              h-[1px] w-full bg-custom-color19
              "
      ></div>
    </>
  );
};

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
        <div className="flex gap-3 md:gap-9  md:max-w-[440px] lg:max-w-[450px]">
          <div className="">
            <Image
              src={product.productImage}
              alt={product.productName}
              className="h-full min-w-[145px] md:min-w-[165px]"
            />
          </div>
          <div className="flex flex-col gap-2 md:gap-3">
            <div className="flex flex-col gap-2 md:gap-3">
              <div className="flex gap-1 md:gap-2 items-center">
                <div className="flex flex-col gap-2">
                  <p className="text-[10px] md:text-xs text-[#64748B]">{product.productCategory}</p>
                  <p className="line-clamp-1 text-[12px] md:text-[16px] font-semibold overflow-ellipsis">
                    {product.productName}
                  </p>
                </div>

                <p className="font-bold text-[12px] md:text-[16px]">
                  $<span>{product.productPrice}</span>
                </p>
              </div>
              <div className="flex gap-1 self-start">
                <RatingCard rating={product.productRating} size={22} />
                <span className="text-[12px] md:text-lg text-[#4F4E4E]">({product.numReviews})</span>
              </div>
              <div className="md:hidden">
                <p className={`text-xs font-medium text-${product.inStock ? '[#009254]' : '[#FF2E2E]'} `}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </p>
              </div>
              <div className="md:hidden">
                <Button
                  className="bg-white-100 rounded-md h-[40px] border border-[#D5D5DB] text-[#00894C]"
                  size={'sm'}
                  intent={'tertiary'}
                  spinnerColor="#00894C px-3 py-1"
                >
                  {product.inCart ? 'Explore Similar' : 'Move To Cart'}
                </Button>
              </div>
            </div>

            <div className="hidden md:flex gap-3 self-start">
              <Button
                className="hover:bg-red-200 hover:text-white-100 p-3 bg-white rounded-md  border border-[#D5DBDB] text-[#737876] "
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
                className={`hover:bg-white-100 bg-white-100 rounded-md border border-[#D5D5DB] ${
                  product.inStock ? 'text-[#009254]' : 'text-[#FF2E2E]'
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
          <Image src={deleteIcon} alt="delete" width={40} height={40} />
        </div>
        <div className="hidden md:block">
          <Button
            className="bg-white rounded-md border border-[#D5D5DB] text-[#00894C]"
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
              h-[1px] w-full bg-[#EFEFF4]
              "
      ></div>
    </>
  );
};

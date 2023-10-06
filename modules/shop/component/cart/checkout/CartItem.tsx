import Button from '@ui/Button';
import { CartItemProps } from '../../../../../@types';

export default function CartItem({
  productImage,
  productTitle,
  productSize,
  productColor,
  productSeller,
  productPrice,
}: CartItemProps) {
  return (
    <div className="flex flex-col md:flex-row md:flex-wrap gap-x-8 w-full border-t border-[#efeff4] py-5 px-5">
      <div className="md:shrink-0">
        <img className="w-full md:h-full" src={productImage} alt={productTitle} />
      </div>
      <div className="flex flex-col mt-2 md:w-3/5">
        <h3 className="text-2xl">{productTitle}</h3>
        <p className="text-[#6c7983]">
          Size: {productSize}, Color: {productColor}, Material: Plastic Seller: {productSeller}
        </p>
        <p className="mt-4 text-xl md:mt-auto font-bold">${productPrice}</p>
      </div>
      <div className=" mt-3 md:ml-auto md:flex md:items-center">
        <Button
          className="bg-[#fff] ml-auto md:mr-0 flex border gap-1 items-center justify-center shadow-md w-[100px] h-[40px] border-[#d5dbdd] rounded-md cursor-pointer"
          rightIcon={<p className="text-[#555757]">Remove</p>}
          leftIcon={<img src="./assets/icons/trash.svg" alt="trash-icon" />}
        >
          {' '}
        </Button>
      </div>
    </div>
  );
}

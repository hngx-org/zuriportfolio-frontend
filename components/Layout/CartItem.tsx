import RemoveButton from "../RemoveButton";

type Props = {
    productImage: string,
    productTitle: string,
    productSize: string,
    productColor: string,
    productSeller: string,
    productPrice: number
};

export default function CartItem({productImage,productTitle,productSize,productColor,productSeller,productPrice}: Props) {
  return (
    <div className="flex gap-x-8 w-full border-t border-[#efeff4] py-5 px-5">
      <div>
        <img src={productImage} alt={productTitle} />
      </div>
      <div className="flex flex-col w-3/5">
        <h3 className="text-2xl">{productTitle}</h3>
        <p className="text-[#6c7983] w-[48%]">Size: {productSize}, Color: {productColor}, Material: Plastic Seller: {productSeller}</p>
        <p className="mt-auto font-bold">${productPrice}</p>
      </div>
      <div className="mr-auto flex items-center">
        <RemoveButton />
      </div>
    </div>
  );
}

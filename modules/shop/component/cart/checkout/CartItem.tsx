'use client';
import { CartItemProps } from '../../../../../@types';
import Image from 'next/image';
import { useState } from 'react';
import RemoveCart from '../../../../../components/Modals/Removecart';
import { BiTrash, BiCartAdd } from 'react-icons/bi';

export default function CartItem({
  id,
  productId,
  productImage,
  productTitle,
  productSize,
  productColor,
  productSeller,
  productDescription,
  productDiscount,
  productPrice,
  removeHandler,
}: CartItemProps & { removeHandler: (productId: string) => void }) {
  const [modalClosed, setModalClosed] = useState('hidden');

  const removeItem = () => {
    setModalClosed('block');
  };

  const closeModal = () => {
    setModalClosed('hidden');
  };

  return (
    <>
      <div className={modalClosed}>
        <RemoveCart productId={id as string} closeModal={closeModal} onRemoveItem={removeHandler} />
      </div>
      <div className="flex flex-col md:flex-row gap-x-5 w-full border-t border-[#efeff4] py-5 px-5 cart-item">
        <div className="max-w-[300px] w-[100%] h-[209px] h-[120px] md:h-[209px] overflow-hidden">
          <Image
            width={0}
            height={0}
            src={productImage}
            alt={productTitle}
            style={{ height: '100%', width: '100vw' }}
            sizes="100vw"
            className="rounded-[8px] object-cover h-[100%] w-[100%]"
          />
        </div>
        <div className="flex flex-col md:w-2/4">
          <h3 className="text-2xl font-manropeEB">{productTitle}</h3>
          <p className="text-[#6c7983] lg:w-[350px] text-truncate md:mt-4 leading-6 font-manropeL">
            {productDescription}
          </p>

          {productDiscount !== '0.00' ? (
            <div className="mt-4 text-xl md:mt-auto font-bold font-manropeEB">
              <span className="">₦ {productDiscount}</span>
              <span className="lg:ms-[30px] line-through text-gray-300"> ₦{productPrice}</span>
            </div>
          ) : (
            <p className="mt-4 text-xl md:mt-auto font-bold font-manropeEB">₦ {productPrice}</p>
          )}
        </div>
        <div className="md:mt-3 md:ml-auto md:flex md:items-center">
          <button
            id={productId}
            onClick={removeItem}
            className="group relative w-[100px] h-[40px] overflow-hidden border border-[#d5dbdd] rounded-md cursor-pointer bg-white font-manropeB"
          >
            <div className="absolute inset-0 w-[0px] bg-brand-green-hover group-hover:w-full"></div>
            <div className="relative w-full flex items-center justify-center text-gray-300 group-hover:text-[#fff]">
              <BiTrash />
              <span>Remove</span>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}

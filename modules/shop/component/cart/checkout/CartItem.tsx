'use client';
import Button from '@ui/Button';
import { CartItemProps } from '../../../../../@types';
import Image from 'next/image';
import { useState } from 'react';
import RemoveCart from '../../../../../components/Modals/Removecart';
import { BiTrash } from 'react-icons/bi';
import { removeFromCart } from '../../../../../http';

export default function CartItem({
  productId,
  productImage,
  productTitle,
  productSize,
  productColor,
  productSeller,
  productDescription,
  productPrice,
  removeHandler,
}: CartItemProps & { removeHandler: (productId: string) => void }) {
  const [modalClosed, setModalClosed] = useState('hidden');
  
  const removeItem = () => {
    // removeFromCart()
    setModalClosed('block');
  };

  return (
    <>
      <div className={modalClosed}>
        <RemoveCart productId={productId} closeModal={closeModal} onRemoveItem={removeHandler} />
      </div>
      <div className="flex flex-col md:flex-row gap-x-5 w-full border-t border-[#efeff4] py-5 px-5 cart-item">
        <div className="">
          <Image src={productImage} width={250} height={140} alt={productTitle}></Image>
        </div>
        <div className="flex flex-col md:w-2/4">
          <h3 className="text-2xl font-manropeEB">{productTitle}</h3>
          <p className="text-[#6c7983] lg:w-[350px] md:mt-4 leading-6 font-manropeL">{productDescription}</p>
          <p className="mt-4 text-xl md:mt-auto font-bold font-manropeEB">${productPrice}</p>
        </div>
        <div className="md:mt-3 md:ml-auto md:flex md:items-center">
          <button
            id={productId}
            onClick={removeItem}
            className="group relative h-12 w-[100px] h-[40px] overflow-hidden border border-[#d5dbdd] rounded-md cursor-pointer bg-white font-manropeB"
          >
            <div className="absolute inset-0 w-[0px] bg-brand-green-hover transition-all duration-[250ms] ease-out group-hover:w-full"></div>
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

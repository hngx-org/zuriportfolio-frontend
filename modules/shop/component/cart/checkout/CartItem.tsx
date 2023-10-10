'use client';
import Button from '@ui/Button';
import { CartItemProps } from '../../../../../@types';
import Image from 'next/image';
import { MouseEvent, useState } from 'react';
import RemoveCart from '../../../../../components/Modals/Removecart';
import { BiTrash } from 'react-icons/bi';

export default function CartItem({
  productImage,
  productTitle,
  productSize,
  productColor,
  productSeller,
  productPrice,
}: CartItemProps) {
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
        <RemoveCart closeModal={closeModal} />
      </div>

      <div className="flex flex-col md:flex-row gap-x-5 w-full border-t border-[#efeff4] py-5 px-5">
        <div className="">
          <Image src={productImage} width={250} height={140} alt={productTitle}></Image>
        </div>
        <div className="flex flex-col md:w-2/4">
          <h3 className="text-2xl font-manropeEB">{productTitle}</h3>
          <p className="text-[#6c7983] lg:w-[350px] lg:mt-4 leading-6 font-manropeL">
            Size: {productSize}, Color: {productColor}, Material: Plastic Seller: {productSeller}
          </p>
          <p className="mt-4 text-xl md:mt-auto font-bold font-manropeEB">${productPrice}</p>
        </div>
        <div className="md:mt-3 md:ml-auto md:flex md:items-center">
          <Button
            onClick={removeItem}
            className="bg-[#fff] text-gray-300 hover:text-[#fff] font-manropeB md:mr-0 flex border gap-1 items-center justify-center shadow-md w-[100px] h-[40px] border-[#d5dbdd] rounded-md cursor-pointer"
            // leftIcon={<Image src="/assets/icons/trash.svg" width={20} height={20} alt="star-fill"></Image>}
          >
            <BiTrash />
            Remove
          </Button>
        </div>
      </div>
    </>
  );
}

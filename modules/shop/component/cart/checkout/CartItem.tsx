"use client";
import Button from "@ui/Button";
import { CartItemProps } from "../../../../../@types";
import Image from "next/image";
import { MouseEvent, useState } from "react";
import RemoveCart from "../../../../../components/Modals/Removecart";

export default function CartItem({
  productImage,
  productTitle,
  productSize,
  productColor,
  productSeller,
  productPrice,
}: CartItemProps) {

  const [modalClosed,setModalClosed] = useState("hidden")
  
  const removeItem = () => {
      setModalClosed("block");
  }

  const closeModal =() => {
    setModalClosed("hidden")
  }

  return (
    <>
    <div className={""+ modalClosed}>
    <RemoveCart onClose={closeModal} ></RemoveCart>
    </div>
    
      <div className="flex flex-col md:flex-row gap-x-5 w-full border-t border-[#efeff4] py-5 px-5">
        <div className="">
        <Image src={productImage} width={250} height={140} alt={productTitle} ></Image>
        </div>
        <div className="flex flex-col md:w-3/5">
          <h3 className="text-2xl font-manropeEB">{productTitle}</h3>
          <p className="text-[#6c7983] lg:w-[350px] lg:mt-4 leading-6 font-manropeL">
            Size: {productSize}, Color: {productColor}, Material: Plastic Seller: {productSeller}
          </p>
          <p className="mt-4 text-xl md:mt-auto font-bold font-manropeEB">${productPrice}</p>
        </div>
        <div className=" md:mt-3 md:ml-auto md:flex md:items-center">
          <Button onClick={removeItem} className="bg-[#fff] ml-auto md:mr-0 flex border px-5 gap-1 items-center justify-center shadow-md w-[100px] h-[40px] border-[#d5dbdd] rounded-md cursor-pointer" 
          rightIcon={<p className="text-[#555757] font-manropeB">Remove</p>} leftIcon={
            <Image src="/assets/icons/trash.svg" width={20} height={20} alt="star-fill" ></Image>
          }  > </Button>
        </div>
      </div>
    </>
  );
}

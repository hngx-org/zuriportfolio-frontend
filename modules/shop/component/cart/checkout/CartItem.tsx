'use client';
import Button from '@ui/Button';
import { CartItemProps } from '../../../../../@types';
import Image from 'next/image';
import { MouseEvent, useState } from 'react';
import RemoveCart from '../../../../../components/Modals/Removecart';

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
      <div className={'' + modalClosed}>
        <RemoveCart></RemoveCart>
      </div>

      <div className="flex flex-col md:flex-row gap-x-5 w-full border-t border-[#efeff4] py-5 px-5">
        <div className="">
          <Image src={productImage} width={250} height={140} alt={productTitle}></Image>
        </div>
        <div className="flex flex-col md:w-3/5">
          <h3 className="text-2xl font-manropeEB">{productTitle}</h3>
          <p className="text-[#6c7983] lg:w-[350px] lg:mt-4 leading-6 font-manropeL">
            Size: {productSize}, Color: {productColor}, Material: Plastic Seller: {productSeller}
          </p>
          <p className="mt-4 text-xl md:mt-auto font-bold font-manropeEB">${productPrice}</p>
        </div>
        <div className=" md:mt-3 md:ml-auto md:flex md:items-center">
          <Button
            onClick={removeItem}
            className="bg-[#fff] ml-auto md:mr-0 flex border px-5 gap-1 items-center justify-center shadow-md w-[100px] h-[40px] border-[#d5dbdd] rounded-md cursor-pointer"
            rightIcon={<p className="text-[#555757] font-manropeB">Remove</p>}
            leftIcon={<Image src="/assets/icons/trash.svg" width={20} height={20} alt="star-fill"></Image>}
          >
            {' '}
          </Button>
        </div>
      </div>
    </>
  );
}

{
  /* <div class="relative w-1/2 md:w-1/3 lg:w-1/4 pr-2 md:pr-4 lg:pr-8">
  <div class="p-2.5 md:p-[16px] border-[1px] border-[#D5DBDD] rounded-[8px] w-[286px] max-w-full"><a href="/marketplace">
    <div class="flex flex-col items-start">
      <div>
        <div>
          <div class="absolute w-[100px] h-[36px] bg-[#59656F] rounded-[8px] flex items-center justify-center tracking-[0.4%] text-white-100 font-manropeL font-semibold text-[12px]">
            Top Picks
          </div>
        </div>
        <img alt="Landscape picture" loading="lazy" width="254" height="209" decoding="async" data-nimg="1" class="rounded-[8px]" srcset="/_next/image?url=%2Fassets%2Fproducts-banner%2FImage-1.png&amp;w=256&amp;q=75 1x, /_next/image?url=%2Fassets%2Fproducts-banner%2FImage-1.png&amp;w=640&amp;q=75 2x" src="/_next/image?url=%2Fassets%2Fproducts-banner%2FImage-1.png&amp;w=640&amp;q=75" style="color: transparent;" />
          </div>
          <p class="font-manropeL text-[#052011] text-[14px] font-normal leading-[20px] letter tracking-[0.014px] pt-[8px] whitespace-nowrap text-ellipsis overflow-hidden w-full">
            <span>Webinar and Course Slide Templ...</span>
          </p>
          <h1 class="font-manropeL text-[#052011] text-[18px] font-bold leading-[20px] letter pt-[2px] pb-[8px]">$100</h1>
          <p class="font-manropeL text-[#4F4E4E] text-[14px] font-normal leading-[20px] letter tracking-[0.035px] pb-[20px]">
            By: <span class="underline">Mark Essien</span>
          </p>
        <div>
          <div class="flex flex-row items-center gap-[5px]">
            <img alt="" loading="lazy" width="111" height="20" decoding="async" data-nimg="1" class="" srcset="/_next/image?url=%2Fassets%2Fimages%2Fstars%2F3StarRating.png&amp;w=128&amp;q=75 1x, /_next/image?url=%2Fassets%2Fimages%2Fstars%2F3StarRating.png&amp;w=256&amp;q=75 2x" src="/_next/image?url=%2Fassets%2Fimages%2Fstars%2F3StarRating.png&amp;w=256&amp;q=75" style="color: transparent;"><p class="font-manropeL font-semibold text-[14px] leading-[20px] tracking-[0.25%] text-[#4F4E4E]">(3)</p></div></div></div></a></div></div> */
}

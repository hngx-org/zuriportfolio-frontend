import React from 'react';
import product from '../../../../public/assets/dashboard/products.png';
import Image from 'next/image';
import Button from '@ui/Button';
const ProductCard = () => {
  return (
    <div className="px-[20.15px] pt-[17.78px] pb-[11.85px] rounded-[10px] border border-brand-disabled2">
      <figure>
        <Image src={product} alt="Product" width={240} height={143} className="rounded-[5px]" />
      </figure>
      <p className="font-manropeL font-normal text-[14px] leading-[142.857%] tracking-[0.035px] text-custom-color43 mb-[2px]">
        Website Templates
      </p>
      <p className="font-manropeEB font-bold text-[16px] leading-[150%] tracking-[0.08px] text-custom-color43">$400</p>
      <div className="flex items-center gap-6 justify-between">
        <Button className="border border-brand-disabled2 rounded-[5px] py-2 px-6 flex items gap-[10px] text-white-650 font-manropeB font-semibold text-[12px] leading-[166.667%] tracking-[0.06px]">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
            <path
              d="M13.5727 3.56008L5.46496 12.1419C5.15882 12.4678 4.86256 13.1097 4.8033 13.5541L4.43791 16.7537C4.30953 17.9092 5.13907 18.6992 6.28463 18.5017L9.46454 17.9586C9.90893 17.8796 10.5311 17.5537 10.8372 17.2179L18.945 8.63609C20.3473 7.15476 20.9794 5.46605 18.7969 3.40207C16.6243 1.35785 14.9751 2.07876 13.5727 3.56008Z"
              stroke="#737876"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12.2197 4.99194C12.6444 7.71758 14.8565 9.80131 17.6019 10.0778"
              stroke="#737876"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3.44043 21.731H21.2163"
              stroke="#737876"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Edit</span>
        </Button>
        <Button className="border border-brand-disabled2 rounded-[5px] py-2 px-6 flex items gap-[10px] text-custom-color34 font-manropeB font-semibold text-[12px] leading-[166.667%] tracking-[0.06px]">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="21" viewBox="0 0 22 21" fill="none">
            <path
              d="M18.5343 5.21024C15.7391 4.93323 12.927 4.79053 10.1234 4.79053C8.46131 4.79053 6.79926 4.87447 5.13722 5.04235L3.4248 5.21024"
              stroke="#E63535"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8.04102 4.36245L8.22569 3.26282C8.35999 2.46537 8.46072 1.86938 9.87934 1.86938H12.0786C13.4972 1.86938 13.6064 2.49895 13.7323 3.27121L13.9169 4.36245"
              stroke="#E63535"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16.7295 7.86279L16.1839 16.3157C16.0915 17.6336 16.016 18.6577 13.674 18.6577H8.28497C5.943 18.6577 5.86745 17.6336 5.77511 16.3157L5.22949 7.86279"
              stroke="#E63535"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9.57715 14.0408H12.3724"
              stroke="#E63535"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8.88086 10.6831H13.0779"
              stroke="#E63535"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Delete</span>
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;

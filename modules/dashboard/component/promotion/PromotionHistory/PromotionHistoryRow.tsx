import { Manrope } from 'next/font/google';
import React, { useState, useEffect } from 'react';
import { PromotionHistory } from '../../../../../@types';
import Image from 'next/image';
import Modal from '@ui/Modal';
import axios from 'axios';

const manropeMD = Manrope({
  weight: ['500'],
  subsets: ['latin'],
});

const ActivePromo: React.FC = () => {
  return (
    <div
      className={`md:bg-green-50 text-brand-success-primary ${manropeMD.className} mx-auto py-[2px] pl-[6px] pr-2 flex items-center gap-2 w-fit rounded-2xl  `}
    >
      <span className="md:hidden lg:inline-block text-[12px]">Active</span>
    </div>
  );
};

const ExpiredPromo: React.FC = () => {
  return (
    <div
      className={`md:bg-red-50 text-brand-red-primary ${manropeMD.className} mx-auto py-[2px] pl-[6px] pr-2 flex items-center gap-2 w-fit rounded-2xl `}
    >
      <span className="md:hidden lg:inline-block text-[12px]">Expired</span>
    </div>
  );
};

const DeactivatedPromo: React.FC = () => {
  return (
    <div
      className={`md:bg-red-50 text-brand-red-primary ${manropeMD.className}  mx-auto py-[2px] pl-[6px] pr-2 flex items-center gap-2 w-fit rounded-2xl `}
    >
      <span className="md:hidden lg:inline-block text-[12px]">Deactivated</span>
    </div>
  );
};

interface Product {
  id: string;
  name: string;
}

interface Promo {
  discount_type: string;
  quantity: number;
  amount: number;
  valid_from: string;
  valid_to: string;
}

interface Promotion {
  product: Product;
  promo: Promo;
  sales: number;
  id: string;
}

const PromotionHistoryRow = (props: any) => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const toggleDeleteModal = () => {
    setDeleteModalOpen(!isDeleteModalOpen);
  };

  const handleDelete = () => {
    toggleDeleteModal();
  };

  // useEffect(() => {
  //   if (isLoading === true) {
  //     getPromo();
  //   }
  // }, [isLoading]);

  // const getPromo = () => {
  //   axios
  //     .get('https://zuriportfolio-shop-internal-api.onrender.com/api/discount/promotions', {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem('zpt')}`,
  //       },
  //     })
  //     .then((response) => {
  //       setPromotions(response.data.data);
  //       setIsLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching data: ', error);
  //       setIsLoading(false);
  //     });
  // };

  const getStatus = (validFrom: string, validTo: string) => {
    const currentDate = new Date();
    const validFromDate = new Date(validFrom);
    const validToDate = new Date(validTo);

    if (currentDate < validFromDate) {
      return 'Active';
    } else if (currentDate >= validFromDate && currentDate <= validToDate) {
      return 'Active';
    } else {
      return 'Expired';
    }
  };

  return (
    <>
      <tr
        key={props.product.id}
        className="font-manropeL border-slate-50 border rounded-lg text-center text-[16px] font-normal text-[#667085] [&>*]:px-6  [&>*]:py-4"
      >
        <td className="text-left">{props.product.name}</td>
        <td className={`text-dark-300 ${manropeMD.className}`}>{props.promo.discount_type}</td>
        <td>
          {getStatus(props.promo.valid_from, props.promo.valid_to) === 'Active' && <ActivePromo />}
          {getStatus(props.promo.valid_from, props.promo.valid_to) === 'Expired' && <ExpiredPromo />}
        </td>
        <td className={`text-dark-300 ${manropeMD.className}`}>{props.promo.amount}</td>
        <td className={`text-dark-300 ${manropeMD.className}`}>{props.promo.quantity}</td>
        <td className={`text-dark-300 ${manropeMD.className}`}>{props.sales}</td>
        <td className={`text-dark-300 ${manropeMD.className}`}>
          <button onClick={toggleDeleteModal}>
            <Image src="/assets/images/clip.png" width={30} height={20} alt="action-button" />
          </button>
        </td>
      </tr>

      {isDeleteModalOpen && (
        <Modal isCloseIconPresent={false} isOpen={isDeleteModalOpen} size="lg" closeModal={toggleDeleteModal} title="">
          <div className="flex flex-col text-center p-0 md:p-10">
            <h2 className="text-dark-300 text-[24px] font-manropeEB px-5 md:px-20 leading-8 mt-2">
              Are you sure you want to delete this coupon?
            </h2>
            <p className="text-dark font-manropeL text-[16px] mt-2">
              Coupon wil be permanently deleted from your store.
            </p>
            <button
              className="text-white-100 bg-brand-red-primary font-manropeL p-2 rounded-lg mt-5"
              onClick={handleDelete}
            >
              Delete Coupon
            </button>
            <button
              className="border border-brand-green-primary p-2 text-brand-green-primary rounded-lg mt-3"
              onClick={toggleDeleteModal}
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default PromotionHistoryRow;

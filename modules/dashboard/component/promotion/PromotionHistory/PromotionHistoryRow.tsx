import { Manrope } from 'next/font/google';
import React, { useState } from 'react';
import { PromotionHistory } from '../../../../../@types';
import Image from 'next/image';
import Modal from '@ui/Modal';

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

const PromotionHistoryRow = (props: PromotionHistory) => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const toggleDeleteModal = () => {
    setDeleteModalOpen(!isDeleteModalOpen);
  };

  const handleDelete = () => {
    toggleDeleteModal();
  };

  return (
    <>
      <tr className="font-manropeL border-slate-50 border rounded-lg text-center text-[16px] font-normal text-[#667085] [&>*]:px-6  [&>*]:py-4">
        <td className="text-left">{props.productName}</td>
        <td className={`text-dark-300 ${manropeMD.className}`}>{props.type}</td>
        <td>
          {props.status === 'active' && <ActivePromo />}
          {props.status === 'expired' && <ExpiredPromo />}
          {props.status === 'deactivated' && <DeactivatedPromo />}
        </td>
        <td className={`text-dark-300 ${manropeMD.className}`}>{props.discount}</td>
        <td className={`text-dark-300 ${manropeMD.className}`}>{props.quantity}</td>
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

export const PromotionHistoryMobile = (props: PromotionHistory) => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const toggleDeleteModal = () => {
    setDeleteModalOpen(!isDeleteModalOpen);
  };

  const handleDelete = () => {
    toggleDeleteModal();
  };
  return (
    <>
      <tr className="font-manropeL border-slate-50 border rounded-lg text-center text-[16px] font-normal text-[#667085] [&>*]:px-6  [&>*]:py-4">
        <td className="text-left">{props.productName}</td>
        <td className={`text-dark-300 ${manropeMD.className}`}>{props.type}</td>
        <td>
          {props.status === 'active' && <ActivePromo />}
          {props.status === 'expired' && <ExpiredPromo />}
          {props.status === 'deactivated' && <DeactivatedPromo />}
        </td>
        <td className={`text-dark-300 ${manropeMD.className}`}>{props.discount}</td>
        <td className={`text-dark-300 ${manropeMD.className}`}>{props.quantity}</td>
        <td className={`text-dark-300 ${manropeMD.className}`}>{props.sales}</td>
        <td className={`text-dark-300 ${manropeMD.className}`}>
          <button onClick={toggleDeleteModal}>
            <Image src="/assets/images/clip.png" width={30} height={20} alt="action-button" />
          </button>
        </td>
      </tr>
      {isDeleteModalOpen && (
        <Modal isOpen={isDeleteModalOpen} closeModal={toggleDeleteModal} title="">
          <div className="flex flex-col text-center p-10">
            <h2 className="text-dark text-[24px] font-manropeEB px-2 leading-8 mt-2">
              Are you sure you want to delete this coupon?
            </h2>
            <p className="text-dark font-manropeL text-[16px] mt-2">
              Coupon wil be permanently deleted from your store.
            </p>
            <button
              className="bg-brand-red-primary text-white-100 font-manropeL p-2 rounded-lg mt-5"
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

import { Manrope } from 'next/font/google';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Modal from '@ui/Modal';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '@ui/Button';
import Loader from '@ui/Loader';

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
  const [loading, setLoading] = useState(false);

  const toggleDeleteModal = () => {
    setDeleteModalOpen(!isDeleteModalOpen);
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`https://zuriportfolio-shop-internal-api.onrender.com/api/v1/discount/${props.promo.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('zpt')}`,
        },
      });
      toast.success('Discount deleted successfully', {
        position: 'top-right',
        autoClose: 3000,
      });
      props.getPromotions();
      console.log('Discount ID:', props.discount_id);
    } catch (error: any) {
      console.error('Error deleting discount:', error);

      if (error.response && error.response.data) {
        const { code, message } = error.response.data;
        if (code === '--discount/invalid-id') {
          toast.error('Invalid discount ID. Please check and try again.', {
            position: 'top-right',
            autoClose: 3000,
          });
        } else {
          toast.error(`Error: ${message}`, {
            position: 'top-right',
            autoClose: 3000,
          });
        }
      } else {
        toast.error('An error occurred while deleting the discount.', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    }

    setLoading(false);
    toggleDeleteModal();
  };

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
        key={props.promo?.id}
        className="font-manropeL border-slate-50 border rounded-lg text-center text-[16px] font-normal text-[#667085] [&>*]:px-6  [&>*]:py-4"
      >
        <td className="text-left">{props.product?.name}</td>
        <td className={`text-dark-300 ${manropeMD.className}`}>{props.promo?.discount_type}</td>
        <td>
          {getStatus(props.promo?.valid_from, props.promo?.valid_to) === 'Active' && <ActivePromo />}
          {getStatus(props.promo?.valid_from, props.promo?.valid_to) === 'Expired' && <ExpiredPromo />}
        </td>
        <td className={`text-dark-300 ${manropeMD.className}`}>{props.promo?.amount}</td>
        <td className={`text-dark-300 ${manropeMD.className}`}>{props.promo?.quantity}</td>
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
              Are you sure you want to delete this Discount?
            </h2>
            <p className="text-dark font-manropeL text-[16px] mt-2">
              Discount wil be permanently deleted from your store.
            </p>
            <Button
              className="text-white-100 w-full bg-brand-red-primary hover:bg-brand-red-primary  font-manropeL p-2 rounded-lg mt-5"
              onClick={handleDelete}
            >
              Delete Discount
            </Button>
            <Button
              className="border border-brand-green-primary w-full bg-transparent hover:bg-transparent p-2 text-brand-green-primary hover rounded-lg mt-3"
              onClick={toggleDeleteModal}
            >
              Cancel
            </Button>
            {loading && (
              <div className="absolute z-50 inset-0 min-h-[300px] max-h-[70vh]  bg-white-100">
                <Loader />
              </div>
            )}
          </div>
        </Modal>
      )}
    </>
  );
};

export default PromotionHistoryRow;

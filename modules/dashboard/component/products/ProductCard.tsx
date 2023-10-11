import React, { useState } from 'react';
import product from '../../../../public/assets/dashboard/products.png';
import Image from 'next/image';

import Modal from '@ui/Modal';
import editImg from '../../../../public/assets/dashboard/edit.svg';
import trashImg from '../../../../public/assets/dashboard/trash.svg';
const DeleteModal = (props: { closeModal: () => void; isOpen: boolean }) => {
  return (
    <Modal
      isOpen={props.isOpen}
      closeModal={props.closeModal}
      closeBtnClass="bg-transparent text-custom-color34 hover:bg-transparent "
    >
      <div className="md:mt-28 md:mb-[70px] mt-24 mb-14 md:max-w-[464px] max-w-[244px] mx-auto">
        <h2 className="text-black font-manropeB md:text-[28px] text-[16px] font-semibold leading-[128.571%]  mx-auto text-center mb-[4.4rem]">
          Are you sure you want to delete ”Website Template”?
        </h2>
        <div className="flex items-center md:gap-9 gap-4">
          <button className="rounded-2xl border border-brand-green-primary py-3 px-5 text-center font-manropeEB  bg-white-100 font-bold text-[1rem] basis-1/2 text-brand-green-primary leading-[150%] tracking-[0.08px] hover:text-white-100">
            Yes
          </button>
          <button
            className="rounded-2xl  bg-brand-green-primary py-3 px-5 text-center font-manropeEB font-bold text-[1rem] basis-1/2 text-white-100 leading-[150%] tracking-[0.08px]"
            onClick={() => props.closeModal()}
          >
            No
          </button>
        </div>
      </div>
    </Modal>
  );
};
const ProductCard = () => {
  const [deleteModal, setDeleteModal] = useState(false);
  const closeDeleteModal = () => {
    setDeleteModal(false);
  };
  return (
    <>
      <div className="lg:px-[20.15px] md:px-[17px] px-3  py-[10px] md:py-4 lg:pt-[17.78px] bg-white-100 pb-[11.85px] rounded-[10px] border border-brand-disabled2 items-center">
        <figure className="md:mb-8 mb-3">
          <Image src={product} alt="Product" width={240} height={143} className="rounded-[5px]" />
        </figure>
        <p className="font-manropeL font-normal text-[14px] leading-[142.857%] tracking-[0.035px] text-custom-color43 mb-[2px]">
          Website Templates
        </p>
        <p className="font-manropeEB font-bold text-[16px] leading-[150%] tracking-[0.08px] text-custom-color43 md:mb-7 mb-3">
          $400
        </p>
        <div className="flex items-center lg:gap-6 md:gap-5 gap-3 justify-between">
          <button className="border bg-transparent hover:bg-transparent border-brand-disabled2 rounded-[5px] py-1 px-2 basis-1/2 flex justify-center items-center lg:gap-[10px] gap-[2px] text-white-650 font-manropeB font-semibold md:text-[12px] text-[10px] leading-[166.667%] tracking-[0.06px]">
            <Image src={editImg} alt="edit" />
            <span>Edit</span>
          </button>
          <button
            className="border bg-transparent hover:bg-transparent border-brand-disabled2 rounded-[5px] py-1 px-2  basis-1/2 flex justify-center items-center lg:gap-[10px] gap-[2px] text-custom-color34 font-manropeB font-semibold md:text-[12px] text-[10px] leading-[166.667%] tracking-[0.06px]"
            onClick={() => setDeleteModal(true)}
          >
            <Image src={trashImg} alt="delete" />
            <span>Delete</span>
          </button>
        </div>
      </div>
      <DeleteModal isOpen={deleteModal} closeModal={closeDeleteModal} />
    </>
  );
};

export default ProductCard;

import React, { useState } from 'react';
import product from '../../../../public/assets/dashboard/products.png';
import Image from 'next/image';

import Modal from '@ui/Modal';
import editImg from '../../../../public/assets/dashboard/edit.svg';
import trashImg from '../../../../public/assets/dashboard/trash.svg';
import uploadimg from '../../../../public/assets/images/uploadimg.png';
import uploadicon from '../../../../public/assets/images/uploadicon.png';
import { Input } from '@ui/Input';
import Link from 'next/link';
import Button from '@ui/Button';

const DeleteModal = (props: { closeModal: () => void; isOpen: boolean }) => {
  return (
    <Modal
      isOpen={props.isOpen}
      size="lg"
      closeModal={props.closeModal}
      closeBtnClass="bg-transparent text-custom-color34 hover:bg-transparent "
    >
      <div className="md:mt-28 md:mb-[70px] mt-24 mb-14 md:max-w-[464px] max-w-[244px] mx-auto">
        <h2 className="text-black font-manropeB md:text-[28px] text-[16px] font-semibold leading-[128.571%]  mx-auto text-center mb-[4.4rem]">
          Are you sure you want to delete ”Website Template”?
        </h2>
        <div className="flex items-center md:gap-9 gap-4">
          <button className="rounded-2xl border border-brand-green-primary py-4 px-5 text-center font-manropeEB  bg-white-100 font-bold text-[1rem] basis-1/2 text-brand-green-primary hover:text-brand-green-primary leading-[150%] tracking-[0.08px]">
            Yes
          </button>
          <button
            className="rounded-2xl  bg-brand-green-primary py-4 text-[16px] px-5 text-center font-manropeEB font-bold  basis-1/2 text-white-100 leading-[150%] tracking-[0.08px]"
            onClick={() => props.closeModal()}
          >
            No
          </button>
        </div>
      </div>
    </Modal>
  );
};

const EditModal = (props: { closeEditModal: () => void; isOpen: boolean }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission here with selectedOption and selectedDateTime
    console.log('Selected Option:', selectedOption);
  };

  const handleImageUploadClick = () => {
    const inputElement = document.getElementById('imageUploadInput') as HTMLInputElement | null;
    if (inputElement) {
      inputElement.click();
    }
  };

  const handleImageUpload = (files: FileList | null) => {
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        const result = e.target?.result as string | null;
        if (result) {
          setSelectedImage(result);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <Modal
      isOpen={props.isOpen}
      title="EDIT PRODUCT"
      size="lg"
      closeModal={props.closeEditModal}
      closeBtnClass="bg-transparent text-custom-color34 hover:bg-transparent "
    >
      <div>
        <form className="mt-6 flex flex-col" onSubmit={handleSubmit}>
          <label className="font-manropeB text-[16px]">Product name</label>
          <Input
            className="w-full my-2"
            placeholder="Coding Template"
            inputSize="lg"
            rightIcon={<Image src={editImg} alt="edit" />}
          />
          <span className="text-[#3F484F] text-[1rem] mt-2">https://zuri.store/add-product name</span>
          <label className="font-manropeB text-[16px] mt-6">Product Description</label>
          <Input className="w-full my-2 " placeholder="Coding Template" inputSize="lg" inputMode="none" />
          <label className="font-manropeB text-[16px] mt-6">Add Product File</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e.target.files)}
            style={{ display: 'none' }}
            id="imageUploadInput"
          />
          <div className="p-3 border border-[#00000024] rounded-md mt-3">
            {selectedImage ? (
              <Image
                src={selectedImage}
                alt="uploaded"
                className="object-contain mb-2 w-full"
                width={100}
                height={80}
              />
            ) : (
              <Image src={uploadimg} alt="upload" className="w-full" />
            )}
            <div className="bg-[#F8F9FA] mt-4 p-2 rounded-sm items-center text-center">
              <center>
                <Image
                  src={uploadicon}
                  alt="uploadicon"
                  className="w-10 object-contain mb-2 cursor-pointer"
                  onClick={handleImageUploadClick}
                />

                <span className="font-manropeL text-[#8D9290] text-[12px] md:text-[16px]">
                  <Link
                    className="text-[12px] md:text-[16px] text-blue-105 font-manropeL mr-2"
                    href="/"
                    onClick={handleImageUploadClick}
                  >
                    Click here
                  </Link>
                  or drag and drop to upload file
                </span>
              </center>
            </div>
          </div>
          <label className="font-manropeB text-[16px] mt-6">Product Category</label>
          <select
            className="border-solid border-[2px] border-white-400 text-dark-600 py-3 text-[14px] rounded-lg mt-3 text-left pl-2 pr-20 hover:border-brand-green-primary"
            value={selectedOption}
            onChange={handleOptionChange}
          >
            <option className="text-dark font-manropeB font-bold" value="">
              Select product category
            </option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
          <label className="font-manropeB text-[16px] mt-6">Product price</label>
          <div className="flex flex-row gap-8">
            <select
              className="border-solid border-[2px] border-white-400 text-dark-600 py-2 text-[14px] rounded-lg mt-2 text-left pl-2 pr-20 hover:border-brand-green-primary flex-1 h-[48px]"
              value={selectedOption}
              onChange={handleOptionChange}
            >
              <option className="text-dark font-manropeB font-bold" value="">
                USD
              </option>
              <option value="option1">NGN</option>
              <option value="option2">EUR</option>
            </select>
            <Input className="w-full my-2" placeholder="40.00" inputSize="lg" inputMode="none" />
          </div>
          <Button
            size="lg"
            className="flex py-3 px-5 gap-4 rounded-2xl text-white-100 items-center bg-brand-green-primary transition after:transition w-full mt-4"
          >
            Save Changes
          </Button>
        </form>
      </div>
    </Modal>
  );
};

const ProductCard = () => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const closeDeleteModal = () => {
    setDeleteModal(false);
  };

  const closeEditModal = () => {
    setEditModal(false);
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
          <button
            className="border bg-transparent hover:bg-transparent border-brand-disabled2 rounded-[5px] py-1 px-2 basis-1/2 flex justify-center items-center lg:gap-[10px] gap-[2px] text-white-650 font-manropeB font-semibold md:text-[12px] text-[10px] leading-[166.667%] tracking-[0.06px]"
            onClick={() => setEditModal(true)}
          >
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
      <EditModal isOpen={editModal} closeEditModal={closeEditModal} />
    </>
  );
};

export default ProductCard;

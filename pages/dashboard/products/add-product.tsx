import React, { useState } from 'react';
import MainLayout from '../../../components/Layout/MainLayout';
import uploadorange from '../../../public/assets/images/uploadorange.png';
import placeholder from '../../../public/assets/images/placeholder.png';
import copy from '../../../public/assets/images/copy.png';
import { Input } from '@ui/Input';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@ui/Button';

const AddProduct = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
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
    <MainLayout showTopbar activePage="products">
      <div className="max-w-[1240px] mx-auto my-4 px-3">
        <h2 className="text-dark-400 font-manropeEB text-[32px] capitalize ">Add new Product</h2>
      </div>
      <div className="border-t-[1px] border-[#E1E3E2] mt-[50px] ">
        <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row gap-10  my-4">
          <div className="border-r-[1px] border-[#E1E3E2] p-5 md:w-[70%] w-[100%] pr-[20px] md:pr-[50px]">
            <label className="font-manropeEB text-[16px] uppercase text-[#191C1E]">add product file</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e.target.files)}
              style={{ display: 'none' }}
              id="imageUploadInput"
            />
            <div className="p-3 border border-[#00000024] rounded-md mt-3">
              <div className="bg-[#F8F9FA] mt-4 p-2 rounded-sm items-center text-center">
                <center>
                  <Image
                    src={uploadorange}
                    alt="uploadicon"
                    className="w-10 object-contain mb-2 cursor-pointer"
                    onClick={handleImageUploadClick}
                  />

                  <span className="font-manropeL text-[#8D9290] text-[12px] md:text-[16px]">
                    <Link
                      className="text-[12px] md:text-[16px] text-[#F1AE67] font-manropeL mr-2"
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
            <div className="p-3 border flex flex-col border-[#00000024] rounded-md mt-3">
              <span className="font-manropeEB text-[16px] uppercase text-[#191C1E]">product details</span>
              <div className="mt-5 flex flex-col">
                <label className="font-manropeEB text-[16px] capitalize text-[#191C1E]">Product Name</label>
                <Input className="w-full mb-5 mt-2" placeholder="Add product name" inputSize="lg" inputMode="none" />
                <label className="font-manropeEB text-[16px] capitalize text-[#191C1E]">Product Description</label>
                <Input
                  className="w-full  mb-5 mt-2"
                  placeholder="Add product description"
                  inputSize="lg"
                  inputMode="none"
                />
                <label className="font-manropeEB text-[16px] capitalize text-[#191C1E]">Product Category</label>
                <select
                  className="slect-custom border-solid border-[2px] border-white-400 text-dark-600 py-2 text-[14px] rounded-lg mt-2 text-left pl-2 pr-20 hover:border-brand-green-primary flex-1 h-[48px] mb-5"
                  value={selectedOption}
                  onChange={handleOptionChange}
                >
                  <option className="text-dark hover:bg-brand-green-primary font-manropeB font-bold" value="">
                    E-book
                  </option>
                  <option className="text-dark hover:bg-brand-green-primary font-manropeB font-bold" value="option1">
                    NGN
                  </option>
                  <option className="text-dark hover:bg-brand-green-primary font-manropeB font-bold" value="option2">
                    EUR
                  </option>
                </select>
                <label className="font-manropeEB text-[16px] capitalize text-[#191C1E]">Product Thumbnail</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e.target.files)}
                  style={{ display: 'none' }}
                  id="imageUploadInput"
                />
                <div className="bg-[#F8F9FA] mt-4 p-2 rounded-sm items-center text-center">
                  <center>
                    <Image
                      src={uploadorange}
                      alt="uploadicon"
                      className="w-10 object-contain mb-2 cursor-pointer"
                      onClick={handleImageUploadClick}
                    />

                    <span className="font-manropeL text-[#8D9290] text-[12px] md:text-[16px]">
                      <Link
                        className="text-[12px] md:text-[16px] text-[#F1AE67] font-manropeL mr-2"
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
            </div>
            <div className="p-3 border flex flex-col border-[#00000024] rounded-md mt-3">
              <span className="font-manropeEB text-[16px] uppercase text-[#191C1E]">Pricing</span>
              <div className="mt-5 flex flex-col">
                <label className="font-manropeEB text-[16px] capitalize text-[#191C1E]">Product Price</label>
                <Input
                  className="w-[100%] md:w-[50%] mb-5 mt-2"
                  placeholder="$ 00.00"
                  inputSize="lg"
                  inputMode="none"
                  rightIcon={
                    <select
                      className="border-white-400 text-dark-600 text-[14px] text-left hover:border-brand-green-primary flex-1 h-[40px]"
                      value={selectedOption}
                      onChange={handleOptionChange}
                    >
                      <option className="text-dark font-manropeB font-bold" value="">
                        USD
                      </option>
                      <option value="option1">NGN</option>
                      <option value="option2">EUR</option>
                    </select>
                  }
                />
                <label className="font-manropeEB text-[16px] capitalize text-[#191C1E]">Product Discount Price</label>
                <Input
                  className="w-[100%] md:w-[50%]  mb-5 mt-2"
                  placeholder="$ 00.00"
                  inputSize="lg"
                  inputMode="none"
                  rightIcon={
                    <select
                      className="border-white-400 text-dark-600 text-[14px] text-left hover:border-brand-green-primary flex-1 h-[40px]"
                      value={selectedOption}
                      onChange={handleOptionChange}
                    >
                      <option className="text-dark font-manropeB font-bold" value="">
                        USD
                      </option>
                      <option value="option1">NGN</option>
                      <option value="option2">EUR</option>
                    </select>
                  }
                />
                <label className="font-manropeEB text-[16px] capitalize text-[#191C1E]">Value Added Tax (VAT)</label>
                <Input className="w-[50%] md:w-[30%] mb-5 mt-2" placeholder="00.00%" inputSize="lg" inputMode="none" />
              </div>
            </div>
          </div>
          <div className="p-5 mt-0 md:mt-0">
            <label className="font-manropeEB text-[16px] uppercase text-[#191C1E]">PREVIEW</label>
            {selectedImage ? (
              <Image
                src={selectedImage}
                alt="uploaded"
                className="w-[300px] object-contain rounded-sm my-3"
                width={100}
                height={80}
              />
            ) : (
              <Image src={placeholder} className="w-[300px] object-contain rounded-sm my-3" alt="placeholder" />
            )}
            <div className="flex flex-row gap-2 justify-between items-center">
              <div>
                <p>Product Link</p>
                <Link className="text-[#536066] font-manropeL" href="/">
                  https://zuristore/product_name
                </Link>
              </div>
              <div>
                <Image src={copy} alt="copy" width={20} height={20} />
              </div>
            </div>
            <Button className="w-full mt-8 bg-[#AEAEAE]">Upload</Button>
            <Button className="w-full mt-2 bg-[#AEAEAE]">Save Draft</Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AddProduct;

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import Modal from '@ui/Modal';
import editImg from '../../../../public/assets/dashboard/edit.svg';
import trashImg from '../../../../public/assets/dashboard/trash.svg';
import uploadicon from '../../../../public/assets/images/uploadicon.png';
import { Input } from '@ui/Input';
import Link from 'next/link';
import Button from '@ui/Button';
import { ToastContainer, toast } from 'react-toastify';
import { RiCloseCircleFill } from 'react-icons/ri';
import { MultipleFileUpload } from './MultipleFileUpload';

type Product = {
  product_id: any;
  image: any;
  name: any;
  price: any;
  url: any;
};

const DeleteModal = (props: any) => {
  const [products, setProducts] = useState<Product | null>(null);

  useEffect(() => {
    fetch('https://zuriportfolio-shop-internal-api.onrender.com/api/products/marketplace', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('zpt')}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data.data)) {
          setProducts(data.data);
        }
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleDelete = () => {
    const productId = props.product.product_id;
    const productName = props.product.name;

    // Make an API request to delete the product using productId
    fetch(`https://zuriportfolio-shop-internal-api.onrender.com/api/product/${productId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('zpt')}`,
      },
    })
      .then(async (response) => {
        if (response.ok) {
          // Delete was successful
          console.log(`Product "${productName}" has been deleted.`);
          // Delete Product from state
          // Close the delete modal
          props.closeModal();

          // Fetch the updated product list to reflect the deletion
          const product = await props.fetchProducts();
          // props.deleteProduct(props.product.product_id);
          props.insertProduct(product || []);
          // Show a success toast message
          toast.success(`Product "${productName}" has been deleted successfully`, {
            position: 'top-right',
            autoClose: 5000,
          });
        } else {
          // Handle HTTP errors
          const errorMessage = await response.text();
          console.error(`Error deleting product "${productName}": ${response.status} - ${errorMessage}`);
          // Show an error toast message
          toast.error(`Error deleting product "${productName}": ${response.status} - ${errorMessage}`, {
            position: 'top-right',
            autoClose: 5000,
          });
        }
      })
      .catch((error) => {
        // Handle network or other errors
        console.error(`Error deleting product "${productName}":`, error);
        // Show an error toast message
        toast.error(`Error deleting product "${productName}": ${error.message}`, {
          position: 'top-right',
          autoClose: 5000,
        });
      });
  };

  return (
    <Modal
      isOpen={props.isOpen}
      size="lg"
      closeModal={props.closeModal}
      closeBtnClass="bg-transparent text-custom-color34 hover:bg-transparent "
    >
      <div className="flex flex-row cursor-pointer justify-end px-5">
        <RiCloseCircleFill size={25} color="red" onClick={props.closeModal} />
      </div>
      <div className="md:mt-18 md:mb-[70px] mt-14 mb-14 md:max-w-[464px] max-w-[244px] mx-auto">
        <h2 className="text-black font-manropeB md:text-[28px] text-[16px] font-semibold leading-[128.571%] mx-auto text-center mb-[4.4rem]">
          Are you sure you want to delete &quot;{props.product.name}&quot;?
        </h2>
        <div className="flex items-center md:gap-9 gap-4">
          <button
            className="rounded-2xl border border-brand-green-primary py-4 px-5 text-center font-manropeEB bg-white-100 font-bold text-[1rem] basis-1/2 text-brand-green-primary hover:text-brand-green-primary leading-[150%] tracking-[0.08px]"
            onClick={handleDelete}
          >
            Yes
          </button>
          <button
            className="rounded-2xl bg-brand-green-primary py-4 text-[16px] px-5 text-center font-manropeEB font-bold basis-1/2 text-white-100 leading-[150%] tracking-[0.08px]"
            onClick={() => props.closeModal()}
          >
            No
          </button>
        </div>
      </div>
    </Modal>
  );
};

const initialProductState = {
  name: '',
  description: '',
  category: '',
  price: '',
  image: [],
};

const EditModal = (props: { closeEditModal: () => void; isOpen: boolean; product: Product | null }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [categoriesData, setCategoriesData] = useState([]);
  const [products, setProducts] = useState<{
    name: string;
    description: string;
    category: string;
    price: string;
    image: any[];
  }>({ name: '', description: '', category: '', price: '', image: [] });

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // Update the 'category' value when an option is selected
    setProducts({ ...products, category: event.target.value });
  };

  useEffect(() => {
    // Fetch product categories
    fetch('https://zuriportfolio-shop-internal-api.onrender.com/api/product/categories', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('zpt')}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data.data)) {
          setCategoriesData(data.data);
        }
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    if (props.product) {
      // Set the product data in the state
      const updatedProduct = { ...initialProductState, ...props.product };
      setProducts(updatedProduct);
    }
  }, [props.product]);

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
    <Modal isOpen={props.isOpen} isCloseIconPresent={true} title="EDIT PRODUCT" closeModal={props.closeEditModal}>
      <div>
        <div className="flex flex-row cursor-pointer justify-end mt-[-20px]">
          <RiCloseCircleFill size={20} color="red" onClick={props.closeEditModal} />
        </div>
        <ToastContainer />
        <form className="mt-6 flex flex-col" onSubmit={handleSubmit}>
          <label className="font-manropeB text-[16px]">Product name</label>
          <Input
            className="w-full my-2 placeholder:text-[#191C1E] text-black"
            value={products.name}
            onChange={(e) => setProducts({ ...products, name: e.target.value })}
            rightIcon={<Image src={editImg} alt="edit" />}
          />
          <span className="text-[#3F484F] text-[12px] lowercase mt-2">
            https://staging.zuri.team/{products.name.replace(/[ |]+/g, '-')}
          </span>

          <label className="font-manropeB text-[16px] mt-6">Product Description</label>
          <textarea
            className="w-full border-solid border-[2px] border-white-400 focus-within:text-dark-100 p-2 rounded-md  mb-5 mt-2 placeholder:text-[#191C1E] text-black"
            value={products.description}
            onChange={(e) => setProducts({ ...products, description: e.target.value })}
            inputMode="none"
          />
          <label className="font-manropeB text-[16px] mt-6 mb-2">Update Product File</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e.target.files)}
            style={{ display: 'none' }}
            id="imageUploadInput"
            name="image"
          />
          <div className="p-3 border border-[#00000024] rounded-md">
            {/* <div className="bg-[#F8F9FA] mt-[-10px] rounded-sm items-center text-center">
              <MultipleFileUpload />
            </div> */}
            <label className="font-manropeEB text-[16px] capitalize text-[#191C1E]">File URL</label>
            <Input
              className="w-full mb-5 mt-2 placeholder:text-[#191C1E] text-black"
              placeholder="Add the link to your file"
              inputMode="none"
              name="name"
            />
          </div>
          <label className="font-manropeB text-[16px] mt-6">Update Product Thumbnail</label>
          <div className="p-3 border border-[#00000024] rounded-md mt-3 placeholder:text-[#191C1E] text-black">
            {selectedImage ? (
              <Image
                src={selectedImage}
                alt="uploaded"
                className="object-contain mb-2 w-full"
                width={100}
                height={80}
              />
            ) : (
              <Image
                src={products.image && products.image[0] ? products.image[0].url : ''}
                alt="upload"
                width={300}
                height={100}
                className="w-full h-[143px] object-cover rounded-md"
              />
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
            value={products.category}
            onChange={handleOptionChange}
          >
            <option value="">Select product category</option>
            {categoriesData.map((category: any) => (
              <option
                value={category.id}
                key={category.id}
                className="placeholder:text-[#191C1E] text-black capitalize"
              >
                {category.name}
              </option>
            ))}
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
              <option value="option1 placeholder:text-[#191C1E] text-black">NGN</option>
              <option value="option2 placeholder:text-[#191C1E] text-black">EUR</option>
            </select>
            <Input
              className="w-full my-2 text-dark-100"
              value={products.price}
              onChange={(e) => setProducts({ ...products, price: e.target.value })}
              inputMode="none"
            />
          </div>
          <Button className="flex py-3 px-5 gap-4 rounded-2xl text-white-100 items-center bg-brand-green-primary transition after:transition w-full mt-4">
            Save Changes
          </Button>
        </form>
      </div>
    </Modal>
  );
};

const ProductCard = (props: {
  product: Product[];
  selectedProduct: Product | null;
  fetchProducts: () => void;
  insertProduct: (prod: Product[]) => void;
  insertSelectedProduct: (prod: Product | null) => void;
}) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const closeDeleteModal = () => {
    setDeleteModal(false);
  };

  const closeEditModal = () => {
    setEditModal(false);
  };

  const handleEditClick = (product: Product) => {
    props.insertSelectedProduct(product);
    setEditModal(true);
  };

  return (
    <>
      {props.product.map((product, index) => (
        <div
          key={index}
          className="lg:px-[20.15px] md:px-[17px] px-3  py-[10px] md:py-4 lg:pt-[17.78px] bg-white-100 pb-[11.85px] rounded-[10px] border border-brand-disabled2 items-center"
        >
          <figure className="md:mb-8 mb-3">
            <Image
              src={product.image[0].url}
              alt="Product"
              width={240}
              height={143}
              className="rounded-[5px] h-[143px] object-cover"
            />
          </figure>
          <p className="font-manropeL font-normal text-[14px] capitalize leading-[142.857%] tracking-[0.035px] text-custom-color43 mb-[2px]">
            {product?.name}
          </p>
          <p className="font-manropeEB font-bold text-[16px] leading-[150%] tracking-[0.08px] text-custom-color43 md:mb-7 mb-3">
            ${product.price}
          </p>
          <div className="flex items-center lg:gap-6 md:gap-5 gap-3 justify-between">
            <button
              className="border bg-transparent hover.bg-transparent border-brand-disabled2 rounded-[5px] py-1 px-2 basis-1/2 flex justify-center items-center lg:gap-[10px] gap-[2px] text-white-650 font-manropeB font-semibold md:text-[12px] text-[10px] leading-[166.667%] tracking-[0.06px]"
              onClick={() => {
                props.insertSelectedProduct(product);
                setEditModal(true);
              }}
            >
              <Image src={editImg} alt="edit" />
              <span>Edit</span>
            </button>
            <button
              className="border bg-transparent hover.bg-transparent border-brand-disabled2 rounded-[5px] py-1 px-2  basis-1/2 flex justify-center items-center lg:gap-[10px] gap-[2px] text-custom-color34 font-manropeB font-semibold md:text-[12px] text-[10px] leading-[166.667%] tracking-[0.06px]"
              onClick={() => {
                props.insertSelectedProduct(product);
                setDeleteModal(true);
              }}
            >
              <Image src={trashImg} alt="delete" />
              <span>Delete</span>
            </button>
          </div>
        </div>
      ))}

      {props.selectedProduct && (
        <DeleteModal
          isOpen={deleteModal}
          closeModal={closeDeleteModal}
          product={props.selectedProduct}
          fetchProducts={props.fetchProducts}
          insertProduct={props.insertProduct}
        />
      )}
      {props.selectedProduct && (
        <EditModal isOpen={editModal} closeEditModal={closeEditModal} product={props.selectedProduct} />
      )}
    </>
  );
};

export default ProductCard;

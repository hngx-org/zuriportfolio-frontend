import React, { useEffect, useState } from 'react';
import MainLayout from '../../../components/Layout/MainLayout';
import uploadorange from '../../../public/assets/images/uploadorange.png';
import placeholder from '../../../public/assets/images/placeholder.png';
import copy from '../../../public/assets/images/copy.png';
import { Input } from '@ui/Input';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@ui/Button';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/router';
import withAuth from '../../../helpers/withAuth';
import Loader from '@ui/Loader';

const AddProduct = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [categoriesData, setCategoriesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();
  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setProducts({ ...products, categoryId: event.target.value });
  };

  useEffect(() => {
    // Fetch product categories
    fetch('https://zuriportfolio-shop-internal-api.onrender.com/api/product/categories')
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

  const [products, setProducts] = useState({
    image: '',
    name: '',
    description: '',
    quantity: '',
    categoryId: '',
    price: '',
    discountPrice: '',
    tax: '',
    currency: '$',
  });

  const handleFormSubmit = async (event: any) => {
    setLoading(true);
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append('currency', '$');

    // Log the FormData content to the console
    for (var pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }

    try {
      // Make a POST request to your API endpoint with Axios
      const response = await axios.post(
        'https://zuriportfolio-shop-internal-api.onrender.com/api/product/add',
        formData,
      );

      // Handle the response, e.g., show a success message or redirect

      toast.success(`Product added successfully`, {
        position: 'top-right',
        autoClose: 5000,
      });
      push('/dashboard/products');
    } catch (error: any) {
      // Handle errors, e.g., show an error message
      console.error('Error:', error);

      if (error.response) {
        // Server responded with an error status (e.g., 400 Bad Request)
        console.error('Server error:', error.response.data);
        toast.error('Server error', {
          position: 'top-right',
          autoClose: 5000,
        });
      } else {
        // Network error or other issues
        toast.error('Error creating product', {
          position: 'top-right',
          autoClose: 5000,
        });
      }
    } finally {
      setLoading(false);
    }
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

  const isNameAndPriceEntered = products.name !== '' && products.price !== '';

  return (
    <MainLayout showTopbar activePage="products">
      <form onSubmit={handleFormSubmit} className="relative">
        <div className={`max-w-[1240px] mx-auto my-4 px-3 `}>
          <h2 className="text-dark-400 font-manropeEB text-[32px] capitalize">Add new Product</h2>
        </div>
        <div className={`border-t-[1px] border-[#E1E3E2] mt-[50px] relative ${loading && 'opacity-0'}`}>
          <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row gap-10 my-4">
            <div className="border-r-[1px] border-[#E1E3E2] p-5 md:w-[70%] w-[100%] pr-[20px] md:pr-[50px]">
              <label className="font-manropeEB text-[16px] uppercase text-[#191C1E]">Add product file</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e.target.files)}
                style={{ display: 'none' }}
                id="imageUploadInput"
                name="image"
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

                    <span className="font-manropeL text-[#8D9290] text-[12px] md:text-[16px] cursor-pointer">
                      <span
                        className="text-[12px] md:text-[16px] text-[#F1AE67] font-manropeL mr-2"
                        onClick={handleImageUploadClick}
                      >
                        Click here
                      </span>
                      or drag and drop to upload file
                    </span>
                  </center>
                </div>
              </div>
              <div className="p-3 border flex flex-col border-[#00000024] rounded-md mt-3">
                <span className="font-manropeEB text-[16px] uppercase text-[#191C1E]">product details</span>
                <div className="mt-5 flex flex-col">
                  <label className="font-manropeEB text-[16px] capitalize text-[#191C1E]">Product Name</label>
                  <Input
                    className="w-full mb-5 mt-2 placeholder:text-[#191C1E] text-black"
                    placeholder="Add product name"
                    inputMode="none"
                    name="name"
                  />
                  <label className="font-manropeEB text-[16px] capitalize text-[#191C1E]">Product Description</label>
                  <Input
                    className="w-full  mb-5 mt-2 placeholder:text-[#191C1E] text-black"
                    placeholder="Add product description"
                    inputMode="none"
                    name="description"
                  />
                  <label className="font-manropeEB text-[16px] capitalize text-[#191C1E]">Product Category</label>
                  <select
                    className="border-solid border-[2px] border-white-400 text-dark-600 py-3 text-[14px] rounded-lg mt-3 text-left pl-2 pr-20 hover:border-brand-green-primary"
                    value={products.categoryId}
                    onChange={handleOptionChange}
                    name="categoryId"
                  >
                    <option value="">Select product category</option>
                    {categoriesData.map((category: any) => (
                      <optgroup label={category.name} key={category.id}>
                        {category.sub_categories.map((subCategory: any) => (
                          <option
                            value={subCategory.id}
                            key={subCategory.id}
                            className="placeholder:text-[#191C1E] text-black"
                          >
                            {subCategory.name}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>
              </div>
              <div className="p-3 border flex flex-col border-[#00000024] rounded-md mt-3">
                <span className="font-manropeEB text-[16px] uppercase text-[#191C1E]">Pricing</span>
                <div className="mt-5 flex flex-col">
                  <label className="font-manropeEB text-[16px] capitalize text-[#191C1E]">Product Price</label>
                  <Input
                    className="w-[100%] md:w-[50%] mb-5 mt-2 placeholder:text-[#191C1E] text-black"
                    placeholder="$ 00.00"
                    inputMode="none"
                    name="price"
                  />
                  <label className="font-manropeEB text-[16px] capitalize text-[#191C1E]">Product Discount Price</label>
                  <Input
                    className="w-[100%] md:w-[50%]  mb-5 mt-2 placeholder:text-[#191C1E] text-black"
                    placeholder="$ 00.00"
                    inputMode="none"
                    name="discountPrice"
                  />
                  <label className="font-manropeEB text-[16px] capitalize text-[#191C1E]">Product Quantity</label>
                  <Input
                    className="w-[100%] md:w-[50%]  mb-5 mt-2"
                    placeholder="$ 00.00"
                    inputMode="none"
                    name="quantity"
                  />
                  <label className="font-manropeEB text-[16px] capitalize text-[#191C1E]">Value Added Tax (VAT)</label>
                  <Input className="w-[50%] md:w-[30%] mb-5 mt-2" placeholder="00.00%" inputMode="none" name="tax" />
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

              <Button
                type="submit"
                className={isNameAndPriceEntered ? 'w-full mt-8 bg-[#33A467]' : 'w-full mt-8 bg-[#AEAEAE]'}
              >
                Upload
              </Button>
              <Button className="w-full mt-2 bg-[#AEAEAE]">Save Draft</Button>
            </div>
          </div>
        </div>
        {loading && (
          <div className="absolute z-50 inset-0 min-h-[300px] max-h-[70vh]  bg-white-100">
            <Loader />
          </div>
        )}
      </form>
    </MainLayout>
  );
};

export default withAuth(AddProduct);

import React, { useEffect, useRef, useState } from 'react';
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
import { MultipleFileUpload } from '@modules/dashboard/component/products/MultipleFileUpload';

const AddProduct = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [categoriesData, setCategoriesData] = useState([]);
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();
  const linkRef = useRef<HTMLInputElement | null>(null);

  const [selectedCurrency, setSelectedCurrency] = useState('');

  const toggleNewCategoryInput = () => {
    setShowNewCategoryInput(!showNewCategoryInput);
  };

  const handleNewCategoryChange = (event: any) => {
    setNewCategoryName(event.target.value);
  };

  const handleCopyLink = () => {
    if (linkRef.current) {
      linkRef.current.select();
      document.execCommand('copy');
      linkRef.current.blur();

      toast.success('Link copied to clipboard', {
        position: 'top-right',
        autoClose: 2000,
      });
    }
  };

  useEffect(() => {
    async function fetchCategoriesData() {
      const updatedCategories = await fetchCategories();
      setCategoriesData(updatedCategories);
    }

    fetchCategoriesData();
  }, []);

  const handleAddNewCategory = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post(
        'https://zuriportfolio-shop-internal-api.onrender.com/api/product/category',
        { name: newCategoryName },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('zpt')}`,
          },
        },
      );

      if (response.status === 201) {
        toast.success('Category created successfully', {
          position: 'top-right',
          autoClose: 5000,
        });

        // Clear the input field
        setNewCategoryName('');

        // Fetch and update the categories list
        const updatedCategories = await fetchCategories();
        setCategoriesData(updatedCategories);
      } else {
        console.error('Failed to create category:', response.data);
      }
    } catch (error: any) {
      console.error('Error creating category:', error);
      toast.error(error, {
        position: 'top-right',
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCurrency(event.target.value);

    // Blur the select element to remove focus
    event.target.blur();
  };
  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setProducts({ ...products, categoryId: event.target.value });
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://zuriportfolio-shop-internal-api.onrender.com/api/product/categories', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('zpt')}`,
        },
      });

      if (response.status === 200) {
        return response.data.data || [];
      } else {
        console.error('Failed to fetch categories:', response.data);
        return [];
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  };

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
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('zpt')}`,
          },
        },
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
          <div className="text-gray-300 font-manropeB font-medium text-[14px] leading-[142.857%] tracking-[0.014px]  items-center gap-[2px] mb-4 hidden md:flex">
            <Link href={'/dashboard/products'}>Products</Link>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M4.50002 2.03996L7.76002 5.29996C8.14502 5.68496 8.14502 6.31496 7.76002 6.69996L4.50002 9.95996"
                stroke="#8D9290"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <Link href={'/dashboard/products/add-product'} className="text-orange-110">
              Add products
            </Link>
          </div>
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
                {/* <div className="bg-[#F8F9FA] p-2 rounded-sm items-center text-center">
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
                  <textarea
                    className="w-full border-solid border-[2px] border-white-400 placeholder:text-[#191C1E] focus-within:text-dark-100 p-2 rounded-md  mb-5 mt-2"
                    placeholder="Add product description"
                    inputMode="none"
                    name="description"
                  />
                  <div className="flex flex-row items-center justify-between">
                    <label className="font-manropeEB text-[16px] capitalize text-[#191C1E]">Product Category</label>
                  </div>
                  <Input
                    className="w-full  mb-5 mt-2 placeholder:text-[#191C1E] text-black"
                    placeholder="Add new category"
                    inputMode="none"
                    name="newCategory"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    rightIcon={
                      <Button
                        onClick={handleAddNewCategory}
                        className="w-[150px] h-[30px] rounded-sm text-[14px] bg-gray-500"
                      >
                        {loading ? 'Loading...' : 'Add new'}
                      </Button>
                    }
                  />
                  <label className="font-manropeEB text-[16px] capitalize text-[#191C1E]">Select more categories</label>
                  <select
                    className="border-solid border-[2px] border-white-400 capitalize text-dark-600 py-3 text-[14px] rounded-lg mt-3 text-left pl-2 pr-20 hover:border-brand-green-primary"
                    value={products.categoryId}
                    onChange={handleOptionChange}
                    name="categoryId"
                  >
                    <option value="" className="placeholder:text-[#191C1E] capitalize">
                      Select product category
                    </option>
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
                </div>
              </div>
              <div className="p-3 border flex flex-col border-[#00000024] rounded-md mt-3">
                <span className="font-manropeEB text-[16px] uppercase text-[#191C1E]">product thumbnail</span>
                <div className="mt-3 flex flex-col">
                  <div className="bg-[#F8F9FA] p-2 rounded-sm items-center text-center">
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
              </div>
              <div className="p-3 border flex flex-col border-[#00000024] rounded-md mt-3">
                <span className="font-manropeEB text-[16px] uppercase text-[#191C1E]">Pricing</span>
                <div className="mt-5 flex flex-col">
                  <label className="font-manropeEB text-[16px] capitalize text-[#191C1E]">Product Price</label>
                  <Input
                    className="w-[100%] md:w-[50%] mb-5 mt-2 placeholder:text-[#191C1E] text-black"
                    placeholder="00.00"
                    inputMode="none"
                    name="price"
                    size={100}
                    rightIcon={
                      <select
                        className="border-solid border-[0px] p-0 h-10  border-white-400 text-dark-600 text-[14px] rounded-lg text-left pl-2 hover:border-brand-green-primary"
                        onChange={handleCurrencyChange}
                        name="categoryId"
                        value={selectedCurrency}
                      >
                        <option value="$" style={{ width: '30px' }}>
                          $
                        </option>
                        <option value="₦" style={{ width: '30px' }}>
                          ₦
                        </option>
                      </select>
                    }
                  />
                  <div className="flex flex-row justify-between w-[100%] md:w-[50%] items-center">
                    <label className="font-manropeEB text-[16px] capitalize text-[#191C1E]">
                      Product Discount Price
                    </label>
                    <Input type="checkbox" className="border-hidden p-0" />
                  </div>
                  <Input
                    className="w-[100%] md:w-[50%]  mb-5 mt-2 placeholder:text-[#191C1E] text-black"
                    placeholder="00.00"
                    inputMode="none"
                    name="discountPrice"
                  />
                  <label className="font-manropeEB text-[16px] capitalize text-[#191C1E]">Value Added Tax (VAT)</label>
                  <Input
                    className="w-[50%] md:w-[30%] mb-5 mt-2 placeholder:text-[#191C1E] text-black"
                    placeholder="00.00%"
                    inputMode="none"
                    name="tax"
                  />
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
              <div className="flex flex-row gap-2 w-[300px] justify-between items-center">
                <div>
                  <p>Product Link</p>
                  <input
                    ref={linkRef}
                    type="text"
                    value="https://staging.zuri.team/store/product_name"
                    style={{ position: 'absolute', left: '-9999px' }}
                    readOnly
                  />
                  <Link className="text-[#536066] text-[12px] font-manropeL" href="/">
                    https://staging.zuri.team/store/product_name
                  </Link>
                </div>
                <div onClick={handleCopyLink} className="cursor-pointer">
                  <Image src={copy} alt="copy" width={20} height={20} />
                </div>
              </div>

              <Button
                type="submit"
                className={isNameAndPriceEntered ? 'w-[300px] mt-8 bg-[#33A467]' : 'w-[300px] mt-8 bg-[#33A467]'}
              >
                Upload
              </Button>
              <Link href="/dashboard/products/add-product">
                <Button className="w-[300px] mt-2 bg-[#AEAEAE]">Cancel</Button>
              </Link>
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

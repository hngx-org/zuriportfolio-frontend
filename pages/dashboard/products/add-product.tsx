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
import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
const AddProduct = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [categoriesData, setCategoriesData] = useState([]);
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();
  const linkRef = useRef<HTMLInputElement | null>(null);
  const [shops, setShops] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState('');

  const toggleNewCategoryInput = () => {
    setShowNewCategoryInput(!showNewCategoryInput);
  };

  const productScehema = z.object({
    image: z.string().min(4, { message: 'Add image' }),
    name: z.string().min(5, { message: 'Add Product Name' }),
    description: z.string().min(10, { message: 'Add  description' }),
    category_id: z.string().min(1, { message: 'Select category' }),
    price: z.string().min(1, { message: 'Add Price' }),
    discountPrice: z.string().min(1, { message: 'Add discount' }),
    tax: z.string().min(1, { message: 'Add tax' }),
    assets_link: z.string().min(4, { message: 'Provide the link to your file' }),
    assets_type: z.string(),
    assets_notes: z.string().min(4, { message: 'Leave a note about the file' }),
    assets_name: z.string().min(4, { message: 'Add File name' }),
    shopId: z.string().min(3, { message: 'Select Shop' }),
  });
  const form = useForm({
    validate: zodResolver(productScehema),
    initialValues: {
      image: '',
      name: '',
      description: '',
      category_id: '',
      price: '',
      discountPrice: '',
      tax: '',
      assets_link: '',
      assets_type: 'external',
      assets_notes: '',
      assets_name: '',
      shopId: '',
    },
  });
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
      await getShopId();
    }

    fetchCategoriesData();
  }, []);

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
  const getShopId = async () => {
    try {
      const { data } = await axios.get('https://zuriportfolio-shop-internal-api.onrender.com/api/shops/merchant', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('zpt')}`,
        },
      });
      console.log(data);
      if (data.data.length > 0) {
        setShops(data.data);
      }
    } catch (error) {
      setShops([]);
    }
  };
  const [products, setProducts] = useState({
    image: '',
    name: '',
    description: '',
    quantity: '',
    sub_category_id: '',
    price: '',
    discountPrice: '0',
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
      console.log(response.data);
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
          form.setFieldValue('image', result);
          console.log(form.getTransformedValues());
        }
      };

      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = async (values: any) => {
    console.log(values, 'hey');
    setLoading(true);

    try {
      // Make a POST request to your API endpoint with Axios
      const response = await axios.post('https://zuriportfolio-shop-internal-api.onrender.com/api/product/add', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('zpt')}`,
        },
        body: values,
      });

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
  const isNameAndPriceEntered = products.name !== '' && products.price !== '';

  return (
    <MainLayout showTopbar activePage="products">
      <form onSubmit={form.onSubmit(handleSubmit)} className="relative">
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
                className="hidden"
                id="imageUploadInput"
                name="image"
              />
              <div className="p-3 border border-[#00000024] rounded-md mt-3">
                {/* <div className="bg-[#F8F9FA] p-2 rounded-sm items-center text-center">
                  <MultipleFileUpload />
                </div> */}
                <label className="font-manropeEB text-[16px] capitalize text-[#191C1E]">File Name</label>
                <Input
                  className={`w-full mb-5 mt-2 placeholder:text-[#191C1E] text-black ${
                    form.errors.assets_name ? 'border-red-200' : 'border-slate-50'
                  }`}
                  placeholder="Add your file name"
                  inputMode="none"
                  {...form.getInputProps('assets_name')}
                />
                <p className="text-[red] text-lg my-3 font-semibold">
                  {form.errors.assets_name && form.errors.assets_name}
                </p>
                <label className="font-manropeEB text-[16px] capitalize text-[#191C1E]">File URL</label>
                <Input
                  className={`w-full ${
                    form.errors.assets_link ? 'border-red-200' : 'border-slate-50'
                  } mb-5 mt-2 placeholder:text-[#191C1E] text-black`}
                  placeholder="Add the link to your file"
                  inputMode="none"
                  {...form.getInputProps('assets_link')}
                />
                <p className="text-[red] text-lg my-3 font-semibold">
                  {form.errors.assets_link && form.errors.assets_link}
                </p>
                <label className="font-manropeEB text-[16px] capitalize text-[#191C1E]"> Note</label>
                <textarea
                  className={`w-full border-solid border-[2px]  placeholder:text-[#191C1E] text-black focus-within:text-dark-100 p-2 rounded-md  mb-5 mt-2 ${
                    form.errors.assets_notes ? 'border-red-200' : 'border-slate-50'
                  }`}
                  placeholder="Add note for your file"
                  inputMode="none"
                  {...form.getInputProps('assets_notes')}
                />
                <p className="text-[red] text-lg my-3 font-semibold">
                  {form.errors.assets_notes && form.errors.assets_notes}
                </p>
              </div>
              <div className="p-3 border flex flex-col border-[#00000024] rounded-md mt-3">
                <span className="font-manropeEB text-[16px] uppercase text-[#191C1E]">product details</span>
                <div className="mt-5 flex flex-col">
                  <label className="font-manropeEB text-[16px] capitalize text-[#191C1E]">Product Name</label>
                  <Input
                    className={`w-full mb-5 mt-2 placeholder:text-[#191C1E] text-black ${
                      form.errors.name ? 'border-red-200' : 'border-slate-50'
                    }`}
                    placeholder="Add product name"
                    inputMode="none"
                    {...form.getInputProps('name')}
                  />
                  <p className="text-[red] text-lg my-3 font-semibold">{form.errors.name && form.errors.name}</p>
                  <label className="font-manropeEB text-[16px] capitalize text-[#191C1E]">Product Description</label>
                  <textarea
                    className={`w-full border-solid border-[2px]  placeholder:text-[#191C1E] focus-within:text-dark-100 p-2 rounded-md  mb-5 mt-2 ${
                      form.errors.description ? 'border-red-200' : 'border-slate-50'
                    }`}
                    placeholder="Add product description"
                    inputMode="none"
                    {...form.getInputProps('description')}
                  />
                  <p className="text-[red] text-lg my-3 font-semibold">
                    {form.errors.description && form.errors.description}
                  </p>
                  <div className="flex flex-row items-center justify-between">
                    <label className="font-manropeEB text-[16px] capitalize text-[#191C1E] mb-3">
                      Product Category
                    </label>
                  </div>
                  {/* <Input
                    className="w-full  mb-5 mt-2 placeholder:text-[#191C1E] text-black"
                    placeholder="Add subcategory"
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
                  /> */}
                  <label className="font-manropeEB text-[16px] capitalize text-[#191C1E]">Select more categories</label>
                  <select
                    className={`border-solid border-[2px] capitalize text-dark-600 py-3 text-[14px] rounded-lg mt-3 text-left pl-2 pr-20 hover:border-brand-green-primary ${
                      form.errors.sub_category_id ? 'border-red-200' : 'border-slate-50'
                    }`}
                    // value={products.sub_category_id}
                    // onChange={handleOptionChange}

                    {...form.getInputProps('sub_category_id')}
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
                  <label className="font-manropeEB text-[16px] capitalize text-[#191C1E]">Select Shop</label>
                  <select
                    className={`border-solid border-[2px] capitalize text-dark-600 py-3 text-[14px] rounded-lg mt-3 text-left pl-2 pr-20 hover:border-brand-green-primary ${
                      form.errors.sub_category_id ? 'border-red-200' : 'border-slate-50'
                    }`}
                    // value={products.sub_category_id}
                    // onChange={handleOptionChange}

                    {...form.getInputProps('shop_id')}
                  >
                    <option value="" className="placeholder:text-[#191C1E] capitalize">
                      Select shop
                    </option>
                    {shops.map((shop: any) => (
                      <option
                        value={shop.id}
                        key={shop.id}
                        className="placeholder:text-[#191C1E] text-black capitalize"
                      >
                        {shop.name}
                      </option>
                    ))}
                  </select>
                  <p className="text-[red] text-lg my-3 font-semibold">{form.errors.shop_id && form.errors.shop_id}</p>
                </div>
              </div>
              <div className="p-3 border flex flex-col border-[#00000024] rounded-md mt-3">
                <span className="font-manropeEB text-[16px] uppercase text-[#191C1E]">product thumbnail</span>
                <div className="mt-3 flex flex-col">
                  <div
                    className={`bg-[#F8F9FA] p-2 rounded-sm items-center text-center ${
                      form.errors.email && 'border-red-20'
                    }`}
                  >
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
                  <p className="text-[red] text-lg my-3 font-semibold">{form.errors.image && form.errors.image}</p>
                </div>
              </div>
              <div className="p-3 border flex flex-col border-[#00000024] rounded-md mt-3">
                <span className="font-manropeEB text-[16px] uppercase text-[#191C1E]">Pricing</span>
                <div className="mt-5 flex flex-col">
                  <label className="font-manropeEB text-[16px] capitalize text-[#191C1E]">Product Price</label>
                  <Input
                    className={`w-[100%] md:w-[50%] mb-5 mt-2 placeholder:text-[#191C1E] text-black ${
                      form.errors.price ? 'border-red-200' : 'border-slate-50'
                    }`}
                    placeholder="00.00"
                    inputMode="none"
                    {...form.getInputProps('price')}
                    size={100}
                  />
                  <p className="text-[red] text-lg my-3 font-semibold">{form.errors.price && form.errors.price}</p>
                  <div className="flex flex-row justify-between w-[100%] md:w-[50%] items-center">
                    <label className="font-manropeEB text-[16px] capitalize text-[#191C1E]">
                      Product Discount Price
                    </label>

                    {/* <Input type="checkbox" className="border-hidden p-0" /> */}
                  </div>
                  <Input
                    className={`w-[100%] md:w-[50%]  mb-5 mt-2 placeholder:text-[#191C1E] text-black ${
                      form.errors.discountPrice ? 'border-red-200' : 'border-slate-50'
                    }`}
                    placeholder="₦00.00"
                    inputMode="none"
                    {...form.getInputProps('discountPrice')}
                  />
                  <p className="text-[red] text-lg my-3 font-semibold">
                    {form.errors.discountPrice && form.errors.discountPrice}
                  </p>
                  <label className="font-manropeEB text-[16px] capitalize text-[#191C1E]">Value Added Tax (VAT)</label>
                  <Input
                    className={`w-[50%] md:w-[30%] mb-5 mt-2 placeholder:text-[#191C1E] text-black ${
                      form.errors.tax ? 'border-red-200' : 'border-slate-50'
                    }`}
                    placeholder="00.00%"
                    inputMode="none"
                    {...form.getInputProps('tax')}
                  />
                  <p className="text-[red] text-lg my-3 font-semibold">{form.errors.tax && form.errors.tax}</p>
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

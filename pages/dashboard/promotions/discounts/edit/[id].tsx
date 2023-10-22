import React, { useEffect, useState } from 'react';
import { Input } from '@ui/Input';
import MainLayout from '../../../../../components/Layout/MainLayout';
import { useForm, zodResolver } from '@mantine/form';
import axios from 'axios';
import { useRouter } from 'next/router';
import 'react-toastify/dist/ReactToastify.css';
import Button from '@ui/Button';
import { ToastContainer, toast } from 'react-toastify';
import { z } from 'zod';
import withAuth from '../../../../../helpers/withAuth';
import Link from 'next/link';
import Head from 'next/head';

type Product = {
  product_id: string;
  id: string;
  name: string;
  description: string;
  category: string;
  price: string;
  image: any[];
};
const EditDiscunt = () => {
  const [selectedOptionType, setSelectedOptionType] = useState('Percentage');
  const [selectedOptionProduct, setSelectedOptionProduct] = useState('');
  const [selectedDateTime, setSelectedDateTime] = useState('');
  const [selectedDateTimeExpire, setSelectedDateTimeExpire] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [productNames, setProductNames] = useState<string[]>([]);

  const handleOptionChangeProduct = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOptionProduct(event.target.value);
  };

  const handleDateFrom = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDateTime(event.target.value);
  };

  const handleDateTo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDateTimeExpire(event.target.value);
  };

  const handleOptionChangeType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOptionType(event.target.value);
  };

  const Schema = z.object({
    type: z.string(),
    amount: z.string(),
    quantity: z.string(),
    maxDiscount: z.string().optional(),
    product: z.string(),
    validFrom: z.string(),
    validTo: z.string(),
  });

  const form = useForm({
    validate: zodResolver(Schema),
    initialValues: {
      type: '',
      amount: '',
      quantity: '',
      maxDiscount: '',
      product: '',
      validFrom: '',
      validTo: '',
    },
  });

  const router = useRouter();

  function generateUUID() {
    const crypto = window.crypto;

    if (crypto) {
      const buffer = new Uint8Array(16);
      crypto.getRandomValues(buffer);

      // Set version (4) and variant (2) bits
      buffer[6] = (buffer[6] & 0x0f) | 0x40;
      buffer[8] = (buffer[8] & 0x3f) | 0x80;

      const hexValues = [];
      for (let i = 0; i < 16; i++) {
        hexValues.push(buffer[i].toString(16).padStart(2, '0'));
      }

      const uuid = hexValues.join('');
      return `${uuid.substr(0, 8)}-${uuid.substr(8, 4)}-${uuid.substr(12, 4)}-${uuid.substr(16, 4)}-${uuid.substr(20)}`;
    } else {
      console.error('crypto.getRandomValues() is not available.');
      return null;
    }
  }

  useEffect(() => {
    fetch('https://zuriportfolio-shop-internal-api.onrender.com/api/products/nopromo', {
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
        setProducts(data.data.products);
        // Extract product names from the fetched data
        const names = data.data.products.map((product: any) => product.name);
        setProductNames(names);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleCreateDiscount = async (values: any) => {
    setIsLoading(true); // Set loading state to true
    const selectedProduct = products.find((product) => product.name === selectedOptionProduct);

    if (!selectedProduct) {
      // Handle the case where the selected product doesn't exist
      toast.error('Selected product does not exist');
      setIsLoading(false); // Set loading state back to false
      return;
    }

    const productIds = [selectedProduct.id];

    const newDate = new Date(selectedDateTime).toISOString();
    const newExpireDate = new Date(selectedDateTimeExpire).toISOString();

    const userData = {
      discount_type: selectedOptionType,
      amount: parseInt(values.amount),
      quantity: parseInt(values.quantity),
      maximum_discount_price: parseInt(values.maxDiscount),
      product_ids: productIds,
      valid_from: newDate,
      valid_to: newExpireDate,
    };

    try {
      const response = await axios.post('https://zuriportfolio-shop-internal-api.onrender.com/api/discount', userData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('zpt')}`,
        },
      });

      toast.success('Discount created successfully', {
        autoClose: 5000,
      });
      router.push('/dashboard/promotions');
      console.log('success', response?.data);
    } catch (error: any) {
      console.error('Error:', error);
      if (error.response) {
        console.error('Request failed with status code', error.response.status);
        console.error('Error response data:', error.response.data);
        toast.error(error.response.data.message, {
          autoClose: 5000,
        });
      } else if (error.request) {
        console.error('No response received from the server');
      } else {
        console.error('Request setup error', error.message);
      }
    } finally {
      setIsLoading(false); // Set loading state back to false
    }
  };

  return (
    <MainLayout activePage="promotions" showDashboardSidebar={true} showTopbar>
      <Head>
        <title>Edit Discount</title>
        <link rel="icon" href="/assets/zuriLogo.svg" />

        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Zuri Portfolio" />

        <meta key="metaname" itemProp="name" name="title" content="Zuri Portfolio" />
        <meta key="metadescription" itemProp="description" name="description" content="Edit discount " />
        <meta name="keywords" content="Zuri, portfolio, edit, discount,dashboard" />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      </Head>
      <ToastContainer />
      <div className="w-full">
        <div className="max-w-[1240px] mt-[-30px] mx-auto my-4 px-5 text-gray-30 font-manropeB font-medium text-[14px] leading-[142.857%] tracking-[0.014px]  items-center gap-[2px] mb-10 hidden md:flex">
          <Link href={'/dashboard/promotions'}>Promotions</Link>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M4.50002 2.03996L7.76002 5.29996C8.14502 5.68496 8.14502 6.31496 7.76002 6.69996L4.50002 9.95996"
              stroke="#8D9290"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <Link href={'/dashboard/promotions/discounts'} className="text-orange-110">
            Create discount
          </Link>
        </div>
        <section className="mb-16 border-[1px] border-[#E1E3E2] rounded-lg md:p-20 p-6 md:flex md:gap-10 w-[90%] md:w-[1100px] mx-4 md:mx-auto">
          <div className="w-[100%] md:w-[30%]">
            <h2 className="text-dark font-manropeEB text-[22px]">Edit discount</h2>
            {/* <p className="text-dark font-manropeL text-[16px]">
              When making a discount, you can choose to use a percentage, or a fixed amount.
            </p> */}
          </div>
          <div className="w-[100%] md:w-[70%]">
            <form onSubmit={form.onSubmit((values) => handleCreateDiscount(values))}>
              <div>
                <div className="md:flex md:gap-10 gap-7">
                  <div className="md:mt-0 mt-6 ">
                    <label className="font-manropeB text-dark-100 text-[14px]">Amount</label>
                    <Input
                      id="amount"
                      {...form.getInputProps('amount')}
                      className="w-full text-[14px] mt-2 placeholder:text-[#191C1E] text-black"
                      placeHolder="e.g 12%"
                      type="text"
                    />
                  </div>
                  <div className="md:mt-0 mt-6 ">
                    <label className="text-dark-100 font-manropeB text-[14px]">Limit/Quantity</label>
                    <Input
                      id="quantity"
                      {...form.getInputProps('quantity')}
                      className="w-full text-[14px] mt-2 placeholder:text-[#191C1E] text-black"
                      placeHolder="e.g 2"
                    />
                  </div>
                </div>
                <div className="mt-7">
                  <label className="text-dark-100 font-manropeB text-[14px]">Maximum Discount (optional)</label>
                  <Input
                    id="maxDiscount"
                    {...form.getInputProps('maxDiscount')}
                    className="w-full text-[14px] mt-2 placeholder:text-[#191C1E] text-black"
                    placeHolder="Enter price here"
                  />
                </div>
                <p className="text-[#667085] text-[14px] font-manropeL">
                  The total amount of this discount cannot exceed this value. eg ₦5,000
                </p>
                <div className="flex flex-col w-full">
                  <label className="text-dark-100 mt-7 font-manropeB text-[14px]">Select Product/Collection</label>
                  <select
                    className="border-solid border-[2px] border-white-400 text-dark-600 py-3 text-[14px] rounded-lg mt-3 text-left pl-2 pr-20 hover:border-brand-green-primary"
                    value={selectedOptionProduct}
                    onChange={handleOptionChangeProduct}
                  >
                    <option className="text-dark font-manropeB font-bold" value="">
                      No items selected
                    </option>
                    {productNames.map((productName, index) => (
                      <option key={index} value={productName}>
                        {productName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="md:flex md:gap-10 gap-6 mt-7 w-full">
                  <div className="flex flex-col w-full">
                    <label className="text-dark-100 font-manropeB text-[14px]">Valid From</label>
                    <input
                      className="border-solid placeholder:text-[#191C1E] text-black border-[2px] border-white-400 text-dark-600 py-3 text-[14px] rounded-lg mt-3 text-left pl-2 pr-2 hover:border-brand-green-primary"
                      type="datetime-local"
                      value={selectedDateTime}
                      onChange={handleDateFrom}
                    />
                  </div>
                  <div className="flex flex-col w-full md:mt-0 mt-6 ">
                    <label className="text-dark-100 font-manropeB text-[14px]">Valid To</label>
                    <input
                      className="border-solid placeholder:text-[#191C1E] text-black border-[2px] border-white-400 text-dark-600 py-3 text-[14px] rounded-lg mt-3 text-left pl-2 pr-2 hover:border-brand-green-primary"
                      type="datetime-local"
                      value={selectedDateTimeExpire}
                      onChange={handleDateTo}
                    />
                  </div>
                </div>
              </div>
              <div>
                {isLoading ? (
                  // Show loading button
                  <Button
                    isLoading={true}
                    className="w-full bg-brand-green-primary text-white-100 p-3 mt-5 rounded-lg"
                    type="button"
                    disabled
                  >
                    Creating Discount...
                  </Button>
                ) : (
                  // Show regular button
                  <Button className="w-full bg-brand-green-primary text-white-100 p-3 mt-5 rounded-lg" type="submit">
                    Create Discount
                  </Button>
                )}
              </div>
            </form>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default EditDiscunt;

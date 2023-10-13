import React, { useState } from 'react';
import { Input } from '@ui/Input';
import MainLayout from '../../../../components/Layout/MainLayout';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import axios from 'axios';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '@ui/Button';

function Discounts() {
  const [selectedOptionType, setSelectedOptionType] = useState('');
  const [selectedOptionProduct, setSelectedOptionProduct] = useState('');
  const [selectedDateTime, setSelectedDateTime] = useState('');
  const [selectedDateTimeExpire, setSelectedDateTimeExpire] = useState('');

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

  const handleCreateDiscount = async (values: any) => {
    const productIds = [generateUUID()];

    const userData = {
      discount_type: selectedOptionType,
      amount: parseFloat(values.amount),
      quantity: parseInt(values.quantity),
      maximum_discount_price: parseFloat(values.maxDiscount),
      product_ids: productIds,
      valid_from: selectedDateTime,
      valid_to: selectedDateTimeExpire,
    };

    console.log('userData', userData);
    const response = await axios
      .post('https://zuriportfolio-shop-internal-api.onrender.com/api/discount', userData)
      .then((response) => {
        if (response.status === 200) {
          // Handle success
          toast.success(response.data, {
            autoClose: 5000,
            onClose: () => {
              router?.push('/dashboard/promotions');
            },
          });
          console.log('success', response?.data);
        } else {
          // Handle other successful status codes if needed
        }
      })
      .catch((error) => {
        // Handle request error
        if (error.response) {
          // The request was made and the server responded with a status code
          console.error('Request failed with status code', error.response.status);
          console.error('Error response data:', error.response.data);
          toast.error(error.response.data.message, {
            autoClose: 5000,
          });
        } else if (error.request) {
          // The request was made but no response was received
          console.error('No response received from the server');
        } else {
          // Something happened in setting up the request
          console.error('Request setup error', error.message);
        }
      });
  };

  return (
    <MainLayout activePage="promotions" showDashboardSidebar={true} showTopbar>
      <ToastContainer />
      <div className="w-full">
        <section className="mb-16 border-[1px] border-[#E1E3E2] rounded-lg md:p-20 p-6 md:flex md:gap-10 w-[90%] md:w-[1100px] mx-4 md:mx-auto">
          <div className="w-[100%] md:w-[30%]">
            <h2 className="text-dark font-manropeEB text-[22px]">Create discount</h2>
            <p className="text-dark font-manropeL text-[16px]">
              When making a discount, you can choose to use a percentage, or a fixed amount.
            </p>
          </div>
          <div className="w-[100%] md:w-[70%]">
            <form onSubmit={form.onSubmit((values) => handleCreateDiscount(values))}>
              <div>
                <div className="md:flex md:gap-10 gap-7">
                  <div className="flex flex-col">
                    <label className="text-dark-200 font-manropeB text-[14px]">Discount Type</label>
                    <select
                      className="border-solid border-[2px] border-white-400 text-dark-600 py-3 text-[14px] rounded-lg mt-3 text-left pl-2 pr-20 hover:border-brand-green-primary"
                      value={selectedOptionType}
                      onChange={handleOptionChangeType}
                    >
                      <option value="percentage">Percentage</option>
                      <option value="fixed">Fixed</option>
                    </select>
                  </div>
                  <div className="md:mt-0 mt-6 ">
                    <label className="font-manropeB text-dark-100 text-[14px]">Amount</label>
                    <Input
                      id="amount"
                      {...form.getInputProps('amount')}
                      className="w-full text-[14px] mt-2"
                      placeHolder="e.g 12%"
                      type="text"
                    />
                  </div>
                  <div className="md:mt-0 mt-6 ">
                    <label className="text-dark-100 font-manropeB text-[14px]">Limit/Quantity</label>
                    <Input
                      id="quantity"
                      {...form.getInputProps('quantity')}
                      className="w-full text-[14px] mt-2"
                      placeHolder="e.g 2"
                    />
                  </div>
                </div>
                <div className="mt-7">
                  <label className="text-dark-100 font-manropeB text-[14px]">Maximum Discount (optional)</label>
                  <Input
                    id="maxDiscount"
                    {...form.getInputProps('maxDiscount')}
                    className="w-full text-[14px] mt-2"
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
                    <option value="option1">Rice and beans</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </select>
                </div>
                <div className="md:flex md:gap-10 gap-6 mt-7 w-full">
                  <div className="flex flex-col w-full">
                    <label className="text-dark-100 font-manropeB text-[14px]">Valid From</label>
                    <input
                      className="border-solid border-[2px] border-white-400 text-dark-600 py-3 text-[14px] rounded-lg mt-3 text-left pl-2 pr-10 hover:border-brand-green-primary"
                      type="datetime-local"
                      value={selectedDateTime}
                      onChange={handleDateFrom}
                    />
                  </div>
                  <div className="flex flex-col w-full md:mt-0 mt-6 ">
                    <label className="text-dark-100 font-manropeB text-[14px]">Valid To</label>
                    <input
                      className="border-solid border-[2px] border-white-400 text-dark-600 py-3 text-[14px] rounded-lg mt-3 text-left pl-2 pr-10 hover:border-brand-green-primary"
                      type="datetime-local"
                      value={selectedDateTimeExpire}
                      onChange={handleDateTo}
                    />
                  </div>
                </div>
              </div>
              <div>
                <Button className="w-full bg-brand-green-primary text-white-100 p-3 mt-5 rounded-lg" type="submit">
                  Create Discount
                </Button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}

export default Discounts;

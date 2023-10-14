import React, { useState } from 'react';
import { Input } from '@ui/Input';
import Link from 'next/link';
import NavDashBoard from '@modules/dashboard/component/Navbar';
import TopBar from '../../../../components/Navbars/TopBar';
import Footer from '../../../../components/Footer';
import MainLayout from '../../../../components/Layout/MainLayout';
import withAuth from '../../../../helpers/withAuth';

function Coupons() {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedDateTime, setSelectedDateTime] = useState('');
  const [selectedDateTimeExpire, setSelectedDateTimeExpire] = useState('');

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleDateFrom = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDateTime(event.target.value);
  };

  const handleDateTo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDateTimeExpire(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission here with selectedOption and selectedDateTime
    console.log('Selected Option:', selectedOption);
    console.log('Selected Date/Time:', selectedDateTime);
  };
  return (
    <MainLayout activePage="promotions" showDashboardSidebar showTopbar>
      <div>
        <section className="mt-6 mb-16 border-[1px] border-slate-50 rounded-lg md:p-20 p-6 md:flex md:gap-10 w-[90%] md:w-[1100px] mx-4 md:mx-auto ">
          <div className="w-[100%] md:w-[30%]">
            <h2 className="text-dark font-manropeEB text-[22px]">Create coupon code</h2>
            <p className="text-dark font-manropeL text-[16px]">
              When making a discount, you can choose to use a percentage, or a fixed amount.
            </p>
          </div>
          <div className="w-[100%] md:w-[70%]">
            <form onSubmit={handleSubmit}>
              <div>
                <label className="text-dark-100 font-manropeB text-[14px]">Coupon</label>
                <Input className="w-[64%] text-[14px] mt-2" placeHolder="Enter coupon code" />
                <div className="md:flex md:gap-10 gap-7 mt-7">
                  <div className="flex flex-col">
                    <label className="text-dark-100 font-manropeB text-[14px]">Discount Type</label>
                    <select
                      className="border-solid border-[2px] border-white-400 text-dark-600 py-3 text-[14px] rounded-lg mt-3 text-left pl-2 pr-20 hover:border-brand-green-primary"
                      value={selectedOption}
                      onChange={handleOptionChange}
                    >
                      <option value="">Percentage</option>
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                      <option value="option3">Option 3</option>
                    </select>
                  </div>
                  <div className="md:mt-0 mt-6 ">
                    <label className="text-dark-100 font-manropeB text-[14px]">Amount</label>
                    <Input className="w-full text-[14px] mt-2" placeHolder="e.g 12%" />
                  </div>
                  <div className="md:mt-0 mt-6 ">
                    <label className="text-dark-100 font-manropeB text-[14px]">Limit/Quantity</label>
                    <Input className="w-full text-[14px] mt-2" placeHolder="e.g 2" />
                  </div>
                </div>
                <div className="flex flex-col w-full">
                  <label className="text-dark-100 mt-7 font-manropeB text-[14px]">Select Product/Collection</label>
                  <select
                    className="border-solid border-[2px] border-white-400 text-dark-600 py-3 text-[14px] rounded-lg mt-3 text-left pl-2 pr-20 hover:border-brand-green-primary"
                    value={selectedOption}
                    onChange={handleOptionChange}
                  >
                    <option className="text-dark font-manropeB font-bold" value="">
                      No items selected
                    </option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </select>
                </div>
                <div className="md:flex md:gap-10 mt-7 w-full">
                  <div className="flex flex-col w-full">
                    <label className="text-dark-100 font-manropeB text-[14px]">Valid From</label>
                    <input
                      className="border-solid border-[2px] border-white-400 text-dark-600 py-3 text-[14px] rounded-lg mt-3 text-left pl-2 pr-10 hover:border-brand-green-primary"
                      type="datetime-local"
                      value={selectedDateTime}
                      onChange={handleDateFrom}
                    />
                  </div>
                  <div className="flex flex-col md:mt-0 mt-6 w-full">
                    <label className="text-dark-100 font-manropeB text-[14px]">Valid To</label>
                    <input
                      className="border-solid border-[2px] border-white-400 text-dark-600 py-3 text-[14px] rounded-lg mt-3 text-left pl-2 pr-10 hover:border-brand-green-primary"
                      type="datetime-local"
                      value={selectedDateTimeExpire}
                      onChange={handleDateTo}
                    />
                  </div>
                </div>
                <div className="mt-7">
                  <label className="text-dark-100 font-manropeB text-[14px]">Minimum Cart Value (optional)</label>
                  <Input className="w-full text-[14px] mt-2" placeHolder="Enter price here" />
                </div>
              </div>
              <p className="text-[#667085] text-[14px] font-manropeL">
                Apply this coupon code only to shopping cart greater than this value. eg ₦5,000
              </p>
              <div>
                <Link href="/dashboard/promotions">
                  <button className="w-full bg-brand-green-primary text-white-100 p-3 mt-5 rounded-lg" type="submit">
                    Create Coupon
                  </button>
                </Link>
                <button
                  className="w-full border text-brand-green-primary border-brand-green-primary p-3 mt-5 rounded-lg"
                  type="submit"
                >
                  Save Draft
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}

export default withAuth(Coupons);

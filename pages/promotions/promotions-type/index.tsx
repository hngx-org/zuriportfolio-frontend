import React from 'react';
import MainLayout from '../../../components/Layout/MainLayout';
import NavDashBoard from '@modules/dashboard/component/Navbar';
import Link from 'next/link';

const PromotionsType: React.FC = () => {
  return (
    <MainLayout activePage="" showTopbar showDashboardSidebar={false}>
      <div>
        <div className="ml-[9%]">
          <NavDashBoard active="promotions" />
        </div>
        <main className="w-[1240px] mx-auto flex m-[50px] md:m-[100px] flex-col items-center justify-center">
          <h2 className="text-[32px] font-bold text-center font-manropeB mt-4">Select a type of promotion</h2>
          <section className="md:flex md:gap-10 gap-20 mt-10 text-center">
            <div className="mt-5 border-[1px] border-[#E1E3E2] w-[300px] border-rounded rounded-xl pt-10 pb-14 px-6">
              <h3 className="text-dark text-center text-[32px] font-manropeB font-medium">Discounts</h3>
              <p className="text-dark font-manropeL text-center text-[16px] mb-10">
                Offer your clients a discount off the prices of your available products.
              </p>
              <Link
                className="border-[1px]  align-center text-[#009444] border-[#009444] mt-6 px-[100px] py-2 rounded-lg"
                href="/promotions/discounts"
              >
                Next
              </Link>
            </div>
            <div className="mt-5 border-[1px] border-[#E1E3E2] w-[300px] border-rounded rounded-xl pt-10 pb-14 px-6">
              <h3 className="text-dark text-[32px] text-center font-manropeB font-medium">Coupons</h3>
              <p className="text-dark font-manropeL text-center text-[16px]  mb-10">
                Create and generate coupon codes your clients can use to shop at discounted prices
              </p>
              <Link
                className="border-[1px]  align-center text-[#009444] border-[#009444] mt-6 px-[100px] py-2 rounded-lg"
                href="/promotions/coupons"
              >
                Next
              </Link>
            </div>
          </section>
        </main>
      </div>
    </MainLayout>
  );
};

export default PromotionsType;

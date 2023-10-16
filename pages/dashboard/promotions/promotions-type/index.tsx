import React from 'react';
import NavDashBoard from '@modules/dashboard/component/Navbar';
import Link from 'next/link';
import MainLayout from '../../../../components/Layout/MainLayout';
import withAuth from '../../../../helpers/withAuth';

const PromotionsType: React.FC = () => {
  return (
    <MainLayout activePage="" showTopbar showDashboardSidebar={false}>
      <div>
        <div className="ml-[3%]">
          <NavDashBoard active="promotions" />
        </div>
        <center>
          <main className="w-[100%] md:w-[1240px] mx-auto flex m-[50px] md:m-[150px] flex-col items-center justify-center">
            <h2 className="text-[32px] font-bold text-center font-manropeB mt-4">Select a type of promotion</h2>
            <section className="md:flex md:gap-10 gap-20 mt-10 text-center">
              <div className="mt-5 border-[1px] border-[#DEE3E5] w-[600px] border-rounded rounded-xl pt-10 pb-14 px-6">
                <h3 className="text-dark text-center text-[32px] font-manropeB font-medium">Discounts</h3>
                <p className="text-dark font-manropeL text-center text-[14px] mb-10 md:text-[16px]">
                  Offer your clients a discount off the prices of your available products.
                </p>
                <Link
                  className="border-[1px]  align-center text-brand-green-primary border-brand-green-primary mt-6 px-[100px] py-2 rounded-lg"
                  href="/dashboard/promotions/discounts"
                >
                  Next
                </Link>
              </div>
            </section>
          </main>
        </center>
      </div>
    </MainLayout>
  );
};

export default withAuth(PromotionsType);

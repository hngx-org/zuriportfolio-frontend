import React from 'react';
import MainLayout from '../../../components/Layout/MainLayout';
import { SearchNormal1 } from 'iconsax-react';
import Button from '@ui/Button';
import ProductCard from '@modules/dashboard/component/products/ProductCard';
import Link from 'next/link';

const Products = () => {
  return (
    <MainLayout showDashboardSidebar={true} activePage="products" showTopbar={true}>
      <div className="max-w-[1240px] mx-auto my-4 px-6">
        <div className="flex md:justify-end my-12 justify-center">
          <Link href="/dashboard/products/add-product">
            <Button className="flex py-3 px-5 gap-4 rounded-2xl text-white-100 items-center bg-brand-green-primary transition after:transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                <path d="M6.5 12H18.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12.5 18V6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Add New Product</span>
            </Button>
          </Link>
        </div>
        <div className="max-w-[1226px] mx-auto shadow-none md:shadow md:rounded-2xl md:px-[15px] md:py-[13px]">
          <div className="flex gap-5 justify-between mb-[37px]">
            <div
              className="focus-within:outline max-w-[785px] focus-within:outline-black px-[14px] py-[10px] flex gap-2 items-center border border-slate-50 rounded-lg flex-1 min-w-0 "
              style={{
                boxShadow: ` 0px 1px 2px 0px rgba(16, 24, 40, 0.05)`,
              }}
            >
              <SearchNormal1 size="16" color="#667085" />
              <input
                className=" bg-transparent font-manropeL font-normal focus-within:outline-none flex-1 text-[1rem] leading-[150%] text-custom-color2"
                placeholder="Search"
              />
            </div>
            <div className="flex items-center gap-6 relative ">
              <button className="px-4 py-[10px] border rounded-lg flex gap-2 border-slate-50 text-[14px] font-manropeL font-medium text-slate-300 items-center leading-[142.857%]">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M5 10H15M2.5 5H17.5M7.5 15H12.5"
                    stroke="#344054"
                    strokeWidth="1.67"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="hidden md:inline">Filters</span>
              </button>
            </div>
          </div>
          <div
            className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5"
            style={{
              filter: `drop-shadow(0px 28px 38px rgba(201, 213, 216, 0.30))`,
            }}
          >
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Products;

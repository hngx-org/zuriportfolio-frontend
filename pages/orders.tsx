import React from 'react';
import NavDashBoard from '../modules/dashboard/component/Navbar';
import { SearchNormal1 } from 'iconsax-react';

const Orders: React.FC = () => {
  return (
    <div>
      <NavDashBoard active="orders" />
      <main className="max-w-[1240px] mx-auto">
        <section className="font-manropeB font-semibold">
          <h1 className=" text-[2rem] leading-[125%] text-black mb-14">Order History</h1>
          <nav className=" flex flex-col gap-4">
            <ul className="text-[22px] leading-[127.273%] text-[#2E3130] flex items-center gap-[50px]">
              <li className="text-brand-green-primary border-b-2 border-b-brand-green-primary capitalize">All order</li>
              <li>Completed</li>
              <li>Cancelled</li>
            </ul>
            <button className="text-brand-green-primary text-[22px] leading-[127.273%] text-end w-fit ml-auto self-end">
              View Order Details
            </button>
          </nav>
          <section className="rounded">
            <div>
              <div className="focus-within:outline focus-within:outline-black px-[14px] py-[10px] flex gap-2 items-center ">
                <SearchNormal1 size="4" color="#667085" />
                <input
                  className=" bg-transparent focus-within:outline-none flex-1 text-[1rem] leading-[150%]"
                  placeholder="Search"
                />
              </div>
            </div>
          </section>
        </section>
      </main>
    </div>
  );
};

export default Orders;

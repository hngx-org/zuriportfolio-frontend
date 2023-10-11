import { ArrowUp } from 'iconsax-react';
import Link from 'next/link';

const ProductsListingNavbar = () => {
  return (
    <>
      <section className="my-5 grid md:grid-cols-3 sm:grid-cols-1 gap-4 md:px-10 px-5">
        <div className=" p-4 border-solid rounded-md border-white-115 border-2">
          <div className="flex items-center justify-between text-gray-500">
            <p className="text-lg">Total Vendors</p>
          </div>
          <div className="flex items-center justify-between">
            <h2 className="text-4xl font-bold">259</h2>
            <div className="flex items-center mr-2  text-gray-500 text-1xl px-3 rounded-xl bg-green-20">
              <ArrowUp size="16" />
              <p>10%</p>
            </div>
          </div>
        </div>
        <div className=" p-4 border-solid rounded-md border-white-115 border-2">
          <div className="flex items-center justify-between text-gray-500">
            <p className="text-lg">Sanctioned Products </p>
          </div>
          <div className="flex items-center justify-between">
            <h2 className="text-4xl font-bold ">14</h2>
            <button className="px-3 py-1 bg-brand-green-primary hover:bg-brand-green-hover text-white-100 rounded-2xl">
              <Link href="/super-admin/sanctioned-products"> View</Link>
            </button>
          </div>
        </div>
        <div className=" p-4 border-solid rounded-md border-white-115 border-2">
          <div className="flex items-center justify-between text-gray-500">
            <p className="text-lg">Deleted Products</p>
          </div>
          <div className="flex items-center justify-between">
            <h2 className="text-4xl font-bold ">23</h2>
            <button className="px-3 py-1 bg-brand-green-primary hover:bg-brand-green-hover text-white-100 rounded-2xl">
              <Link href="/super-admin/deleted-products"> View</Link>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductsListingNavbar;

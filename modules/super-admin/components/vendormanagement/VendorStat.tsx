import React from 'react';
import Image from 'next/image';
import { ArrowUp } from 'iconsax-react';
import { BannedDeletedVendorsProps } from '../../../../@types';
import { LoadingText } from '../product-listing/ProductListingNavbar';
const VendorsStat = ({
  showBanned,
  setShowBanned,
  showDeleted,
  setShowDeleted,
  data,
  isLoading,
}: BannedDeletedVendorsProps) => {
  return (
    <>
      <section className="my-5 grid md:grid-cols-3 sm:grid-cols-1 gap-4 container mx-auto">
        <div className=" p-4 border-solid rounded-md border-white-115 border-2">
          <div className="flex items-center justify-between text-gray-500">
            <p className="text-lg">Total Vendors</p>
            <Image src="/assets/more-grey.png" alt="" width={20} height={20} className="cursor-pointer" />
          </div>
          <div className="flex items-center justify-between">
            {isLoading ? <LoadingText /> : <h2 className="text-4xl font-bold">{data?.total_shops}</h2>}
            {/* <div className="flex items-center mr-2 text-brand-green-primary text-1xl px-3 rounded-xl bg-green-20">
              <ArrowUp size="16" />
              <p>10%</p>
            </div> */}
          </div>
        </div>
        <div className=" p-4 border-solid rounded-md border-white-115 border-2">
          <div className="flex items-center justify-between">
            <p className="text-lg text-gray-500">Banned Vendors</p>
            <Image src="/assets/more-green.png" alt="" width={20} height={20} className="cursor-pointer" />
          </div>
          <div className="flex items-center justify-between">
            {isLoading ? <LoadingText /> : <h2 className="text-4xl font-bold ">{data?.total_banned_shops}</h2>}
            <button
              className="px-3 py-1 bg-brand-green-primary hover:bg-brand-green-hover text-white-100 rounded-2xl"
              onClick={() => setShowBanned(!showBanned)}
            >
              {showBanned ? 'Hide' : 'View'}
            </button>
          </div>
        </div>
        <div className=" p-4 border-solid rounded-md border-white-115 border-2">
          <div className="flex items-center justify-between">
            <p className="text-lg text-gray-500">Deleted Vendors</p>
            <Image src="/assets/more-green.png" alt="" width={20} height={20} className="cursor-pointer" />
          </div>
          <div className="flex items-center justify-between">
            {isLoading ? <LoadingText /> : <h2 className="text-4xl font-bold">{data?.total_deleted_shops}</h2>}
            <button
              className="px-3 py-1 bg-brand-green-primary hover:bg-brand-green-hover text-white-100 rounded-2xl"
              onClick={() => setShowDeleted(!showDeleted)}
            >
              {showDeleted ? 'Hide' : 'View'}
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
export default VendorsStat;

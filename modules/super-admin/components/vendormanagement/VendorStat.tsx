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
          <div className="text-gray-500">
            <p className="text-lg">Total Vendors</p>
          </div>
          <div className="flex items-center justify-between">
            {isLoading ? <LoadingText /> : <h2 className="text-4xl font-bold">{data?.total_shops}</h2>}
          </div>
        </div>
        <div className=" p-4 border-solid rounded-md border-white-115 border-2">
          <div className="">
            <p className="text-lg text-gray-500">Banned Vendors</p>
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
          <div className="">
            <p className="text-lg text-gray-500">Deleted Vendors</p>
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

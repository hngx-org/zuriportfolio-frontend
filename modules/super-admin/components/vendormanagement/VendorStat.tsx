import React from 'react';
import { BannedDeletedVendorsProps } from '../../../../@types';
import { LoadingText } from '../product-listing/ProductListingNavbar';
import { formatNumber } from '../product-listing/product-details';
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
            {isLoading ? <LoadingText /> : <h2 className="text-4xl font-bold">{formatNumber(data?.total_shops) ?? 0}</h2>}
          </div>
        </div>
        <div className=" p-4 border-solid rounded-md border-white-115 border-2">
          <div className="">
            <p className="text-lg text-gray-500">Banned Vendors</p>
          </div>
          <div className="flex items-center justify-between">
            {isLoading ? (
              <LoadingText />
            ) : (
              <h2 className="text-4xl font-bold ">
                {formatNumber(data?.total_banned_shops) ?? 0}
              </h2>
            )}
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
            {isLoading ? (
              <LoadingText />
            ) : (
              <h2 className="text-4xl font-bold">
                {data?.data?.filter((item: any) => item?.vendor_status === 'Deleted')?.length}
              </h2>
            )}
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

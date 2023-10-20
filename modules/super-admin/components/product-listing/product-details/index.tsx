import React from 'react';
import Image from 'next/image';
import Button from '@ui/Button';
import arrowRight from '../../../../../public/assets/arrowtoRight.svg';
import { NextRouter } from 'next/router';
import StarRating from '../../StarRating';
import { brokenImage } from '../../../../../pages/super-admin/vendor-management/vendor-details/[id]';
import useProdDetailsLogic from './useProdDetailsLogic';
import SuperAdminProdHeader from './Header';
import StatusPill from '../../StatusPill';

export function formatNumber(number: any) {
  if (typeof number !== 'number') {
    return 0;
  }
  return new Intl.NumberFormat('en-US').format(number);
}

export function formatDate(inputDate: string) {
  const date = new Date(inputDate);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();

  return `${day}-${month}-${year}`;
}
export const handleBack = (route: NextRouter) => {
  if (
    route.pathname.includes('/super-admin/product-listing/product-details/[id]') ||
    route.pathname.includes('/super-admin/vendor-management/vendor-details/[id]')
  ) {
    route.push('..');
  } else {
    route.push('.');
  }
};

const SuperAdminProdDetails = ({
  setOpenModal,
  data,
  id,
}: {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  data: Record<string, any> | null;
  id: string;
}) => {
  const {
    route,
    isLoading,
    isRestoring,
    isSanctioning,
    isTempDeleting,
    handleDelete,
    handleSanction,
    handleRestoreProd,
    handleRemoveSaction,
  } = useProdDetailsLogic(id);

  return (
    <>
      <SuperAdminProdHeader />
      <div className="container">
        <div className="lg:mx-5 mx-3">
          <div className="flex gap-[16px] py-3 border-b-[1px] border-custom-color1">
            <Image src={arrowRight} alt="arrowRight" onClick={() => handleBack(route)} className="cursor-pointer" />
            <p className="font-manropeB text-[18px] font-medium text-gray-900">Products Details</p>
          </div>
          <div className="mt-6 lg:mt-0 flex gap-[28px] items-center flex-col lg:flex-row mb-8">
            <div className="flex flex-col gap-[16px] lg:h-[520px] md:h-[600px] h-[340px] w-full lg:w-1/2">
              <Image
                loader={() =>
                  data?.product_image && data.product_image[0] && data.product_image[0][0]
                    ? data.product_image[0][0]
                    : brokenImage
                }
                src={
                  data?.product_image && data.product_image[0] && data.product_image[0][0]
                    ? data.product_image[0][0]
                    : brokenImage
                }
                alt="Product Image"
                width={100}
                height={100}
                className="w-full h-full  object-cover rounded-3xl"
              />
            </div>

            <div className="flex w-full lg:w-1/2 lg:mt-6 flex-col">
              <h1 className="font-manropeEB md:text-[32px] text-[22px] mb-2 lg:font-semibold text-custom-color11 font-bold  ">
                {data?.name || data?.product_name}
              </h1>

              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-[4px] items-center ">
                  <div className="w-10 h-10 mx-2 rounded-full overflow-hidden">
                    <Image
                      loader={() => data?.vendor_profile_pic[0] ?? brokenImage}
                      src={data?.vendor_profile_pic[0] ?? brokenImage}
                      alt="vendor image"
                      width={100}
                      height={100}
                    />
                  </div>
                  <p className="font-manropeB font-semibold tracking-[0.035px] md:tracking-[0.08px]">
                    {data?.vendor_name}
                  </p>
                </div>
                <div className="flex space-y-2 items-end flex-col">
                  <div className="flex font-manropeB gap-[18px] text-custom-color43 text-[12px]">
                    <p className="font-bold">Date Added</p>
                    <p>{formatDate(data?.createdAt)}</p>
                  </div>
                  <div className="flex font-manropeB text-custom-color43  gap-[18px] text-[12px]">
                    <p className="font-bold">
                      Date{' '}
                      {route.pathname.includes('sanctioned-products')
                        ? 'Sanctioned'
                        : route.pathname.includes('deleted-products')
                        ? 'Deleted'
                        : 'Updated'}{' '}
                    </p>
                    <p>{formatDate(data?.updatedAt)}</p>
                  </div>
                  <div className="flex flex-end">
                    <StatusPill status={data?.product_status} />
                  </div>
                </div>
              </div>

              <div className="flex space-y-4 flex-col pb-6">
                <p className="font-manropeL text-[12px] md:text-[16px] md:tracking-[0.08px] text-white-700 lg:text-[16px]">
                  {data?.description}
                </p>

                <div className="flex flex-col gap-y-2 ">
                  <div className="flex gap-x-1">
                    <p className=" text-base font-semibold font-manropeB leading-normal tracking-[0.08px]">
                      {data?.rating_id ?? 0}/5
                    </p>
                    <StarRating rating={data?.rating_id ?? 0} />
                  </div>
                  <p className="text-base font-manropeL text-[14px] leading-normal tracking-[0.035px] md:text-[16px] lg:tracking-[0.08px]">
                    ({data?.rating_id ?? 0} Customer{data?.rating_id > 0 ? 's' : ''})
                  </p>
                </div>
              </div>
              <div className="flex space-y-8  lg:space-y-4 flex-col">
                <div className="flex flex-col space-y-3">
                  <div className="flex justify-between items-center">
                    <p className="font-manropeB text-[14px]  tracking-[0.035px] text-custom-color43  md:text-[16px]">
                      Sales Price (Incl. taxes)
                    </p>
                    <p className="font-manropeB text-[16px]  font-semibold md:text-[24px]">
                      {' '}
                      ${new Intl.NumberFormat('en-US').format(+data?.price + +data?.tax)}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="font-manropeB text-[14px]  tracking-[0.035px] text-custom-color43  md:text-[16px]">
                      Collection(s)
                    </p>
                    <p className="font-manropeB text-[16px]  font-semibold md:text-[24px]">{data?.category_name}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="font-manropeB text-[14px]  tracking-[0.035px] text-custom-color43  md:text-[16px]">
                      Total Sold
                    </p>
                    <p className="font-manropeB text-[16px]  font-semibold md:text-[24px] ">
                      {new Intl.NumberFormat('en-US').format(data?.quantity)}
                    </p>
                  </div>
                </div>

                <div className="flex py-8 justify-center space-x-9">
                  <Button
                    intent={'secondary'}
                    isLoading={isTempDeleting}
                    className="text-brand-red-primary active:bg-brand-red-pressed hover:bg-brand-red-hover hover:text-white-100 border-brand-red-primary lg:w-[284.5px] lg:h-[60px] md:w-[359px] md:h-[52px] w-[145.5px]"
                    onClick={() => {
                      data?.product_status === 'Active' ? handleDelete() : setOpenModal(true);
                    }}
                  >
                    <span className="font-manropeL text-[12px]">
                      {data?.product_status === 'Active' ? 'Delete' : 'Permanently Delete'}
                    </span>
                  </Button>

                  <Button
                    intent={
                      data?.product_status === 'Sanctioned'
                        ? 'primary'
                        : data?.product_status === 'Deleted'
                        ? 'primary'
                        : 'secondary'
                    }
                    className={`${
                      data?.product_status === 'Active'
                        ? 'bg-transparent focus:bg-brand-green-focused active:bg-black active:text-white-100 disabled:bg-brand-disabled disabled:cursor-not-allowed border-black text-black'
                        : ''
                    } lg:w-[284.5px] lg:h-[60px]lg:w-[284.5px] lg:h-[60px] md:w-[359px] md:h-[52px] w-[145.5px]`}
                    isLoading={isLoading || isRestoring || isSanctioning}
                    onClick={
                      data?.product_status === 'Sanctioned'
                        ? handleRemoveSaction
                        : data?.product_status === 'Deleted'
                        ? handleRestoreProd
                        : handleSanction
                    }
                  >
                    <span className="font-manropeL text-[12px]">
                      {data?.product_status === 'Sanctioned'
                        ? 'Remove Sanction'
                        : data?.product_status === 'Deleted'
                        ? 'Restore'
                        : 'Sanction'}
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuperAdminProdDetails;

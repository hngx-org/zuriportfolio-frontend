import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
export const imageUrl =
  'https://media.istockphoto.com/id/1321856038/photo/portrait-beautiful-young-woman-with-clean-fresh-skin.jpg?s=612x612&w=0&k=20&c=jP4pZTdV_7hHPMhFUaFNZSAbIDQAOUEcrMPMwSKFLqk=';

const VendorLists = ({ data }: any) => {
  const route = useRouter();
  return (
    <div
      className="border-b border-white-115 border-solid py-5 px-5 grid lg:grid-cols-5 md:grid-cols-4 grid-cols-1 items-center text-gray-500 text-center text-sm cursor-pointer border-tcursor-pointer transition delay-100 hover:bg-white-200"
      onClick={() => route.push(`/super-admin/vendor-management/vendor-details/${data?.vendor_id}`)}
    >
      <div className="flex items-center">
        <div className="flex items-center">
          <div className="w-10 h-10 mx-2 rounded-full overflow-hidden">
            <Image
              loader={() => imageUrl}
              src={imageUrl}
              alt="profile picture"
              width={40}
              height={40}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex flex-col items-start text-left">
            <p className="text-base lg:text-lg font-bold text-black">{data?.merchant_name}</p>
            <p className="text-sm md:text-xs lg:text-sm">{data?.merchant_email}</p>
          </div>
        </div>
      </div>
      <p className="hidden md:block text-sm md:text-xs lg:text-sm">{data?.total_products}</p>
      <p className="hidden md:block text-sm md:text-xs lg:text-sm">{data?.total_products}</p>
      <p className="hidden md:block text-sm md:text-xs lg:text-sm">{data?.joined_date}</p>
      <div
        className={` hidden  mx-auto rounded-2xl py-0.5 pl-1.5 pr-2 text-center font-manropeL text-xs font-medium md:flex items-center justify-center gap-2 w-max ${
          data?.vendor_status === 'Banned'
            ? 'mx-auto bg-custom-color40 text-yellow-600 rounded-2xl py-0.5 pl-1.5 pr-2 text-center font-manropeL font-medium'
            : data?.vendor_status === 'Deleted'
            ? 'hidden mx-auto bg-pink-120 text-custom-color34 rounded-2xl py-0.5 pl-1.5 pr-2 text-center font-manropeL font-medium'
            : 'bg-green-200 bg-opacity-50 text-green-800'
        }`}
      >
        <span
          className={`inline-block w-2 h-2 rounded-full ${
            data?.vendor_status === 'Banned'
              ? 'bg-yellow-600'
              : data?.vendor_status === 'Deleted'
              ? 'bg-red-800'
              : 'bg-green-800'
          }`}
        ></span>
        <span>{data?.vendor_status}</span>
      </div>
      {/* <div className="lg:flex items-center justify-center hidden">
        <More size="20" className="cursor-pointer" />
      </div> */}
    </div>
  );
};
export default VendorLists;

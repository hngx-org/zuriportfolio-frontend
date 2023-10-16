import { ArrowLeft, ArrowLeft2, ArrowRight2 } from 'iconsax-react';
import React from 'react';
import { useState } from 'react';
import { VendorProduct } from '../../../../../@types';
import Aff from '../../../../../public/assets/images/vendors/afflate.png';
import Web from '../../../../../public/assets/images/vendors/webinar.png';
import { useGetShop } from '../../../../../http';
import { useRouter } from 'next/router';
import Loader from '@modules/portfolio/component/landing/Loader';
import { brokenImage } from '../../../../super-admin/vendor-management/vendor-details/[id]';
import Image from 'next/image';
import StarRating from '@modules/super-admin/components/StarRating';

function VendorDetails(): React.ReactElement {
  const router = useRouter();
  const id = router.query?.id as string;

  const { data, isLoading } = useGetShop(id);

  // Pagination Varriables
  const [currentPage, setCurrentPage] = useState(1); // current page identifier
  const recordsPerPage: number = 8; // list of pages that show at a page
  const lastIndex: number = currentPage * recordsPerPage; // las item on current page
  const firstIndex: number = lastIndex - recordsPerPage; // first item on current page
  const records = data?.data[0]?.products?.slice(firstIndex, lastIndex); // page slicer determining what shows per page
  const pages: number = Math.ceil(data?.data[0]?.products?.length / recordsPerPage); // page number in total
  const convertToArray = (number: number) => Array.from({ length: number }, (value, index) => index + 1);
  const numbers: number[] = convertToArray(pages);

  // Pagination functions to handle page navigation
  function nextPage() {
    if (currentPage !== pages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 30);
    }
  }

  function prevPage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 30);
    }
  }
  function changeCPage(id: number): void {
    setCurrentPage(id);
    window.scrollTo(0, 30);
  }

  return (
    <div className="container mt-2 md:px-5 lg:px-5 sm:px-5 px-1 w-[100%] overflow-x-hidden">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div>
            <div className="flex items-center mb-4">
              <ArrowLeft
                size="18"
                onClick={() => router.push(`/super-admin/vendor-management/vendor-details/${id}`)}
                className="cursor-pointer w-fit"
              />
              <p className="ml-3">
                Products by {data?.data?.length > 0 ? data?.data[0]?.merchant_name : 'Merchant Name Not Found'}
              </p>
            </div>
          </div>
          <hr className="border-custom-color1" />
          <div className="mt-4 mb-10  lg:grid-cols-4 md:grid-cols-3 px-0.5 md:px-2 lg:px-2 sm:px-2 grid grid-cols-2 gap-2 md:gap-3 lg:gap-4">
            {data?.data?.length > 0
              ? records.map((item: any) => (
                  <div
                    className="product m-3 rounded-md p-1.5 md:p-4 lg:p-4 border-custom-color32 border border-solid font-manropeEL hover:shadow-lg cursor-pointer transition hover:scale-105"
                    key={item?.id}
                    onClick={() => router.push(`/super-admin/product-listing/product-details/${item?.product_id}`)}
                  >
                    <div className="md:min-w-[220px] h-[181px] mx-auto">
                      <Image
                        loader={() => item?.product_image[0][0] || brokenImage}
                        src={item?.product_image[0][0] || brokenImage}
                        alt="product"
                        width={100}
                        height={100}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="mt-2 text-[0.65rem] md:text-[0.75rem] lg:text-[0.85rem] truncate w-[100%] max-w-[100%] text-green-850">
                      {item?.product_name}
                    </p>
                    <p className="font-bold text-[0.7rem] md:text-[0.8rem] lg:text-[0.9rem] text-green-850">
                      ${new Intl.NumberFormat('en-US').format(item?.price)}
                    </p>
                    <p className="mb-3 text-custom-color15 font-semibold text-[0.65rem] md:text-[0.75rem] lg:text-[0.85rem] truncate w-[100%] max-w-[100%]">
                      {item?.description}
                    </p>
                    <aside className="left flex items-center gap-[1px] w-[100px] md:gap-[2px] lg:gap-[2px] mt-6 lg:w-[230px]">
                      <StarRating rating={item?.rating ?? 0} />
                      <p>({item?.rating ?? 0})</p>
                    </aside>
                  </div>
                ))
              : null}
          </div>
          <hr className="border-custom-color1 mb-10" />
          <nav className="flex justify-center items-center mb-16">
            <ul className="flex gap-1.5 md:gap-5 lg:gap-5 items-center">
              <li
                className="md:mr-5 lg:mr-5 mr-1 text-[0.6rem] md:text-[0.75rem] lg:text-[0.85rem] cursor-pointer text-slate-300 font-manropeEL"
                onClick={prevPage}
              >
                Previous
              </li>
              <li onClick={prevPage} className="cursor-pointer">
                <ArrowLeft2 size={15} color="#767676" />
              </li>
              {numbers.map((n, i) => (
                <li
                  className={`py-[5px] px-[8.75px] md:py-[8px] md:px-[14px] lg:py-[8px] lg:px-[14px] rounded-lg text-[0.6rem] md:text-[0.75rem] lg:text-[0.85rem] cursor-pointer font-ppReg font-normal ${
                    currentPage === n ? 'bg-green-600 text-white-100 ' : 'text-custom-color27'
                  }`}
                  key={i}
                  onClick={() => changeCPage(n)}
                >
                  {n}
                </li>
              ))}
              <li onClick={nextPage} className="cursor-pointer">
                <ArrowRight2 size={15} color="#767676" />
              </li>
              <li
                className="md:ml-5 lg:ml-5 ml-1 text-slate-300 text-[0.6rem] md:text-[0.75rem] lg:text-[0.85rem] cursor-pointer font-manropeEL"
                onClick={nextPage}
              >
                Next
              </li>
            </ul>
          </nav>
        </>
      )}
    </div>
  );
}

export default VendorDetails;

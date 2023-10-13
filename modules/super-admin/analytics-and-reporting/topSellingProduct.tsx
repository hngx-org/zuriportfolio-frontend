import Image from 'next/image';
import Pagination from '../../../pages/view-components/super-admin/pagination';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';

const TopSellingProducts: React.FC = () => {
  const [topSellingProducts, setTopSellingProducts] = useState<any[]>([]);

  useEffect(() => {
    const apiUrl = 'https://team-mirage-super-amind2.onrender.com/api/admin/analytics/best_selling_products';

    axios
      .get(apiUrl)
      .then((response) => {
        console.log(response.data.data);
        setTopSellingProducts(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching top-selling products:', error);
      });
  }, []);

  return (
    <>
      <div className="max-[1310px]:px-[1rem] w-[full] max-[834px]:px-[2.5rem] max-[760px]:pr-0 max-[830px]:px-[2.5rem] mb-[4.5rem] max-[500px]:px-[1.5rem] max-[500px]:pr-0">
        <div className="max-w-[77.5rem] w-full mt-[3rem] min-[1536px]:max-w-[1536px] flex flex-col gap-[0.9375rem] rounded-[0.5rem] border border-[#E1E3E2] bg-[#FFF] mx-auto max-[730px]:max-w-[100%] max-[760px]:rounded-tr-none max-[760px]:rounded-br-none max-[760px]:border-r-0">
          <div className="px-[1rem] py-[0.75rem] max-w-[77.5rem] w-full border-b-[0.0625rem] border-[#EAECF0]">
            <p className="font-manropeL font-medium leading-[1.75rem] text-[1.25rem] text-gray-900 max-[834px]:text-[1.125rem] max-[880px]:text-[1.125rem] max-[834px]:max-w-none">
              Top Selling Products
            </p>
          </div>
          <div className="w-full">
            <div className="max-[778px]:overflow-x-scroll no-scrollbar">
              <div className="flex items-center justify-between px-[1.5rem] py-[0.75rem] bg-[#FCFCFD] border-b-[0.0625rem] border-[#EAECF0] max-[730px]:w-fit max-[730px]:flex max-[778px]:pr-0 max-[778px]:w-[100%]">
                <div className="flex items-center gap-[0.25rem] max-w-[18.9rem] max-[1000px]:max-w-[16.3rem] w-full max-[778px]:min-w-[15.9rem] max-[500px]:min-w-[17.5rem]">
                  <h6 className="text-[0.875rem] font-manropeL text-[#444846] font-normal leading-[1.25rem] tracking-[0.00088rem] max-[880px]:text-[0.75rem] ">
                    Product Name
                  </h6>
                  <Image src="/assets/images/arrow-down.svg" alt="Down Arrow" width={16} height={16} />
                </div>
                <div className="max-w-[8.5rem] w-full max-[730px]:ml-0 max-[1000px]:max-w-[6.5rem] max-[778px]:min-w-[8.5rem]">
                  <p className="text-[0.875rem] text-center font-manropeL text-[#667085] font-normal leading-[1.25rem] tracking-[0.00088rem]">
                    Categories
                  </p>
                </div>
                <div className="max-w-[8.5rem] w-full max-[778px]:min-w-[11.8rem] max-[834px]:hidden">
                  <p className="text-[0.875rem] text-center font-manropeL text-[#667085] font-normal leading-[1.25rem] tracking-[0.00088rem]">
                    vendor
                  </p>
                </div>
                <div className="max-w-[8.5rem] w-full max-[778px]:min-w-[5.63rem] max-[1000px]:max-w-[3.313rem]">
                  <p className="text-[0.875rem] text-center font-manropeL text-[#667085] font-normal leading-[1.25rem] tracking-[0.00088rem]">
                    Order
                  </p>
                </div>
                <div className="max-w-[8.63rem] w-full max-[778px]:min-w-[4.38rem] max-[1000px]:max-w-[2.1rem]">
                  <p className="text-[0.875rem] text-center font-manropeL text-[#667085] font-normal leading-[1.25rem] tracking-[0.00088rem]">
                    Price
                  </p>
                </div>
                <div className="max-w-[7.38rem] w-full max-[778px]:min-w-[6.13rem] max-[1000px]:max-w-[5rem]">
                  <p className="text-[0.875rem] text-center font-manropeL text-[#667085] font-normal leading-[1.25rem] tracking-[0.00088rem]">
                    Total Sales
                  </p>
                </div>
              </div>
              {topSellingProducts.length > 0
                ? topSellingProducts.map((action) => (
                    <div
                      className="flex items-center justify-between px-[1.5rem] py-[1rem] border-b-[0.0625rem] border-[#EAECF0] bg-[#FFF] max-[730px]:flex max-[834px]:pr-0 max-[778px]:w-[100%]"
                      key={action.product_id}
                    >
                      <div className="flex items-center gap-[1.5rem] max-w-[18.9rem] max-[1000px]:max-w-[16.3rem] w-full max-[778px]:min-w-[15.9rem] max-[500px]:min-w-[17.5rem]">
                        <Image src="/assets/images/svg.svg" alt="Down Arrow" width={16} height={16} />
                        <h6 className="text-[0.875rem] font-manropeL text-[#101828] font-normal leading-[1.25rem] tracking-[0.00088rem] max-[880px]:text-[0.75rem] ">
                          {action.product_name}
                        </h6>
                      </div>
                      <div className="max-w-[8.5rem] w-full max-[1000px]:max-w-[6.5rem] max-[778px]:min-w-[8.5rem]">
                        <h6 className="text-[0.875rem] text-center font-manropeL font-normal text-[#667085] leading-[1.25rem] tracking-[0.00088rem]">
                          {action.category_name}
                        </h6>
                      </div>
                      <div className="max-w-[8.5rem] w-full max-[778px]:min-w-[9.8rem] max-[834px]:hidden">
                        <p className="text-[0.875rem] font-manropeL text-center font-normal text-[#667085] leading-[1.25rem] tracking-[0.00088rem]">
                          {action.vendor_name}
                        </p>
                      </div>
                      <div className="max-w-[8.5rem] w-full max-[778px]:min-w-[5.63rem] max-[1000px]:max-w-[3.313rem]">
                        <p className="text-[0.875rem] font-manropeL text-center font-normal text-[#667085] leading-[1.25rem] tracking-[0.00088rem]">
                          {action.total_orders}
                        </p>
                      </div>
                      <div className="max-w-[8.63rem] w-full max-[778px]:min-w-[4.38rem] max-[1000px]:max-w-[2.1rem]">
                        <p className="text-[0.875rem] font-manropeL text-center font-normal text-[#667085] leading-[1.25rem] tracking-[0.00088rem]">
                          ${action.price}
                        </p>
                      </div>
                      <div className="max-w-[7.38rem] w-full max-[778px]:min-w-[6.13rem] max-[1000px]:max-w-[5rem]">
                        <p className="text-[0.875rem] font-manropeL text-center font-normal text-[#667085] leading-[1.25rem] tracking-[0.00088rem]">
                          ${action.total_sales}
                        </p>
                      </div>
                    </div>
                  ))
                : ''}
            </div>
            <div>
              <div className="border-b-[0.0625rem] border-[#EAECF0]"></div>
              <Pagination />
              <div className="h-[0.94rem] rounded-b-[0.5rem] border-[0.001rem] border-t-0 border-[#EAECF0] max-[760px]:rounded-br-none"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopSellingProducts;

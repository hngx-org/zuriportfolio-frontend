import Image from 'next/image';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { DateObject } from 'react-multi-date-picker';
import SuperAdminPagination from '../components/pagination';
import { ImSpinner8 } from 'react-icons/im';
import { ToastContainer, toast } from 'react-toastify';
import Link from 'next/link';

interface TopSellingProps {
  dateRange: DateObject[];
  reportClicked: Boolean;
}

const TopSellingProducts: React.FC<TopSellingProps> = ({ dateRange, reportClicked }) => {
  const [topSellingProducts, setTopSellingProducts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [showItems, setShowItems] = useState<Boolean>(true);

  const pageSize = 10;
  useEffect(() => {
    if (reportClicked && dateRange.length === 2) {
      const startDate = dateRange[0].format('YYYY-MM-DD');
      const endDate = dateRange[1].format('YYYY-MM-DD');
      setIsLoading(true);

      const apiUrl = `https://team-mirage-super-amind2.onrender.com/api/superadmin/analytics/best_selling_products/?start_date=${startDate}&end_date=${endDate}`;

      const bearerToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc5YTcwOTllLTM0ZTQtNGU0OS04ODU2LTE1YWI2ZWQxMzgwYyIsImlhdCI6MTY5NzQ2ODM0MH0.UZ0CgNydpooLXFygcTgbjE6EHEQMIcFH5rjHFXpi8_w';

      axios
        .get(apiUrl, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          console.log(response.data.results.data);
          setTopSellingProducts(response.data.result.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching top-selling products:', error);
          toast.error('No Top Selling Products within that Date Range');
          setIsLoading(false);
        });
    } else {
      setIsLoading(true);
      const apiUrl =
        'https://team-mirage-super-amind2.onrender.com/api/superadmin/analytics/best_selling_products/?start_date=2023-01-10&end_date=2023-11-12';

      const bearerToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc5YTcwOTllLTM0ZTQtNGU0OS04ODU2LTE1YWI2ZWQxMzgwYyIsImlhdCI6MTY5NzQ2ODM0MH0.UZ0CgNydpooLXFygcTgbjE6EHEQMIcFH5rjHFXpi8_w';

      axios
        .get(apiUrl, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          console.log(response.data.results.data);
          setTopSellingProducts(response.data.results.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching top-selling products:', error);
          setIsLoading(false);
        });
    }
  }, [reportClicked, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const toggleVisibility = () => {
    setShowItems(!showItems);
  };

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
                  <Image
                    src={`${showItems ? '/assets/images/reports/upp.svg' : '/assets/images/arrow-down.svg'}`}
                    onClick={toggleVisibility}
                    alt="Down Arrow"
                    width={16}
                    height={16}
                    className="cursor-pointer"
                  />
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
              {isLoading ? (
                <ImSpinner8 className="w-6 h-6 mx-auto my-[3rem] mb-2rem text-brand-success-primary animate-spin" />
              ) : (
                showItems &&
                topSellingProducts?.map((action) => (
                  <div
                    className="flex items-center justify-between px-[1.5rem] transition-all ease-in-out duration-500 py-[1rem] border-b-[0.0625rem] border-[#EAECF0] bg-[#FFF] max-[730px]:flex max-[834px]:pr-0 max-[778px]:w-[100%]"
                    key={action.product_id}
                  >
                    <div className="flex items-center gap-[1.5rem] max-w-[18.9rem] max-[1000px]:max-w-[16.3rem] w-full max-[778px]:min-w-[15.9rem] max-[500px]:min-w-[17.5rem]">
                      <Image
                        src={`${action.product_image_url ? action.product_image_url : '/assets/images/svg.svg'}`}
                        alt="product image"
                        width={16}
                        height={16}
                      />
                      <h6 className="text-[0.875rem] hover:text-brand-success-primary font-manropeL text-[#101828] font-normal leading-[1.25rem] tracking-[0.00088rem] max-[880px]:text-[0.75rem] ">
                        <Link href={`/super-admin/product-listing/product-details/${action.product_id}`}>
                          {action.product_name}
                        </Link>
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
              )}
            </div>
            <div>
              <div className="border-b-[0.0625rem] border-[#EAECF0]"></div>
              {/* <SuperAdminPagination
                currentPage={currentPage}
                totalPages={Math.ceil(topSellingProducts?.length / pageSize)}
                onPageChange={handlePageChange}
              /> */}
              <div className="h-[0.94rem] rounded-b-[0.5rem] border-[0.001rem] border-t-0 border-[#EAECF0] max-[760px]:rounded-br-none"></div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default TopSellingProducts;

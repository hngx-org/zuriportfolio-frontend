import { useState } from 'react';
import Pagination from '@ui/Pagination';
import { PurchaseData } from '../../../../pages/user/customer-purchase-dashboard';

const MobileCustomerDashboard = ({ data }: { data: PurchaseData[] }) => {
  // Function to determine the background color based on status
  const getStatusBackgroundColor = (status: string): string[] => {
    switch (status.toLowerCase()) {
      case 'successful':
        return ['bg-custom-color41', 'text-custom-color35']; // Return an array of background and text colors
      case 'pending':
        return ['bg-custom-color40', 'text-yellow-600'];
      case 'failed':
        return ['bg-pink-120', 'text-custom-color34'];
      default:
        return ['bg-gray-200', 'text-gray-600'];
    }
  };

  const [page, setPage] = useState(1);

  return (
    <div className="px-1 sm:px-16 max-w-screen overflow-hidden">
      {/* purchase data */}
      <div className="sm:border-r-4 sm:border-white-200 sm:border-solid w-full flex flex-col gap-8 sm:gap-0 ">
        {/* mobile purchase card */}
        <div className="sm:hidden w-full overflow-hidden sm:overflow-x-auto flex flex-col gap-10">
          {data.map((item) => (
            <div key={item.id} className="sm:hidden border border-zinc-300 h-fit rounded-xl p-6 flex flex-col gap-4">
              <div className=" w-full flex justify-between gap-4">
                <span className="flex gap-3 items-center">
                  <input type="checkbox" />
                  <p className="font-light font-manropeL text-brand-green-shade10 ">{item.createdAt.split('T')[0]}</p>
                </span>
                <p className="font-manropeB text-xl">{item.order_price}</p>
              </div>

              <div className="flex flex-col gap-2">
                <h2 className="font-manropeEL text-2xl text-brand-green-shade10">{item.product.name}</h2>
                <span className="flex gap-1 items-center">
                  <p className="font-manropeL text-[.7rem]">Order ID:</p>
                  <p className="font-manropeL text-[.7rem]">{item.order_id}</p>
                </span>
              </div>

              <div className="flex justify-between gap-5">
                <span className="flex gap-1 items-center">
                  <p className="font-manropeL text-base">By:</p>
                  <p className="font-manropeL text-base">
                    {item.merchant}
                  </p>
                </span>

                <span
                  className={`flex items-center justify-center h-[28px] w-[90px] rounded-xl ${
                    getStatusBackgroundColor(item.order.status)[0]
                  }`}
                >
                  <p className={`text-[0.75rem] ${getStatusBackgroundColor(item.order.status)[1]}`}>
                    {item.order.status}
                  </p>
                </span>
              </div>
            </div>
          ))}

          {/* pagination */}
          <div className="flex justify-center pb-5">
            <Pagination page={page} pages={page} activePage={page} visiblePaginatedBtn={page} setPage={setPage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileCustomerDashboard;

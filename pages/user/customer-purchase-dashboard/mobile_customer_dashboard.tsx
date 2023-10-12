import { useState } from 'react';
import Pagination from '../../../components/ui/Pagination';
import PurchaseNotFound from '@modules/marketplace/component/CustomerDashboard/PurchaseNotFound';

type PurchaseData = {
  id: number;
  item: string;
  orderID: string;
  price: string;
  date: string;
  sellerName: string;
  status: string;
};

interface Props {
  data: PurchaseData[];
  checkedItems: any;
  handleCheckboxChange: any;
}

const MyPage: React.FC<Props> = ({ data, checkedItems, handleCheckboxChange }) => {
  // console.log(transactionData)

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

  // handle filter dropdown

  const [page, setPage] = useState(1);

  return (
    <div className="px-1 sm:px-16 max-w-screen overflow-hidden">
      <div className="sm:border-r-4 sm:border-white-200 sm:border-solid w-full flex flex-col gap-8 sm:gap-0 ">
        {/* mobile purchase card */}
        <div className="sm:hidden w-full overflow-hidden sm:overflow-x-auto flex flex-col gap-10">
          {/* transactionData.map for the end point */}
          {data.map((item) => (
            <div key={item.id} className="sm:hidden border border-zinc-300 h-fit rounded-xl p-6 flex flex-col gap-4">
              <div className=" w-full flex justify-between gap-4">
                <span className="flex gap-3 items-center">
                  <input
                    type="checkbox"
                    checked={checkedItems.includes(item.orderID)}
                    onChange={() => handleCheckboxChange(item.orderID)}
                  />
                  <p className="font-light font-manropeL text-brand-green-shade10 ">{item.date}</p>
                </span>
                <p className="font-manropeB text-xl">{item.price}</p>
              </div>

              <div className="flex flex-col gap-2">
                <h2 className="font-manropeEL text-2xl text-brand-green-shade10">{item.item}</h2>
                <span className="flex gap-1 items-center">
                  <p className="font-manropeL text-base">Order ID:</p>
                  <p className="font-manropeL text-base">{item.orderID}</p>
                </span>
              </div>

              <div className="flex justify-between gap-5">
                <span className="flex gap-1 items-center">
                  <p className="font-manropeL text-base">By:</p>
                  <p className="font-manropeL text-base">{item.sellerName}</p>
                </span>

                <span
                  className={`flex items-center justify-center h-[28px] w-[90px] rounded-xl ${
                    getStatusBackgroundColor(item.status)[0]
                  }`}
                >
                  <p className={`text-[0.75rem] ${getStatusBackgroundColor(item.status)[1]}`}>{item.status}</p>
                </span>
              </div>
            </div>
          ))}

          {/* error page only works when there is no data */}
          {data.length === 0 && <PurchaseNotFound />}
          <div className="flex justify-center pb-5">
            <Pagination page={page} pages={page} activePage={page} visiblePaginatedBtn={page} setPage={setPage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;

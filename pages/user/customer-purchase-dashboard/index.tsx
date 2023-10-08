import { useState } from 'react';
import Button from '@ui/Button';
import { Input } from '@ui/Input';
import { ArrowRight2 } from 'iconsax-react';
import { Trash } from 'iconsax-react';
import { Sort } from 'iconsax-react';
import { SearchNormal1 } from 'iconsax-react';
import DeleteModal from '@modules/marketplace/component/CustomerDashboard/DeleteModal';
import useDisclosure from '../../../hooks/useDisclosure';
import PurchaseNotFound from '@modules/marketplace/component/CustomerDashboard/PurchaseNotFound';

// Define a type for the data
type PurchaseData = {
  id: number;
  item: string;
  orderID: string;
  price: string;
  date: string;
  sellerName: string;
  status: string;
};

const MyPage: React.FC = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [filter, setFilter] = useState<string | null>(null);
  const data: PurchaseData[] = [
    {
      id: 1,
      item: 'Webinar & Course Slide',
      orderID: '643D73U90',
      price: '$100.00',
      date: '25 March 2023',
      sellerName: 'Mark Essien',
      status: 'Successful',
    },
    {
      id: 2,
      item: 'Webinar & Course Slide',
      orderID: '643D73U90',
      price: '$100.00',
      date: '25 March 2023',
      sellerName: 'Mark Essien',
      status: 'Pending',
    },
    {
      id: 3,
      item: 'Webinar & Course Slide',
      orderID: '643D73U90',
      price: '$100.00',
      date: '25 March 2023',
      sellerName: 'Ekomobong Enang',
      status: 'Failed',
    },
    {
      id: 4,
      item: 'Webinar & Course Slide',
      orderID: '643D73U90',
      price: '$100.00',
      date: '25 March 2023',
      sellerName: 'Mark Essien',
      status: 'Pending',
    },
    {
      id: 5,
      item: 'Webinar & Course Slide',
      orderID: '643D73U90',
      price: '$100.00',
      date: '25 March 2023',
      sellerName: 'Solomon Edem',
      status: 'Successful',
    },
    {
      id: 6,
      item: 'Webinar & Course Slide',
      orderID: '643D73U90',
      price: '$100.00',
      date: '25 March 2023',
      sellerName: 'Solomon Edem',
      status: 'Successful',
    },
    // Add more data items as needed
  ];

  // function to handle delete
  const onDelete = ()=> {
    onClose();
  }

  // Calculate counts for each category
  const allPurchasesCount = data.length;
  const pendingPurchasesCount = data.filter((item) => item.status === 'Pending').length;
  const completedPurchasesCount = data.filter((item) => item.status === 'Successful').length;
  const failedPurchasesCount = data.filter((item) => item.status === 'Failed').length;

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

  const handleFilterClick = (filterName: string | null) => {
    setFilter(filterName);
  };

  return (
    <div className="px-16">
      <div className="mt-9 mb-12">
        <div className="flex items-center">
          <p className="text-base text-brand-green-primary">Settings</p>
          <span className="mx-[5px]">
            <ArrowRight2 size="16" color="green" />
          </span>
          <p className="text-base text-gray-100">Dashboard</p>
        </div>
      </div>
      <h3 className="font-semibold text-3xl">Customer Purchase Dashboard</h3>

      <div className="flex align-center justify-between w-3/4 mt-9 w-[56.5rem]">
        <div
          className={`h-[2.8rem] w-[12.5rem] flex items-center justify-center border-b-2 border-solid ${
            filter === null ? 'border-brand-green-primary' : 'border-white-100'
          }`}
          onClick={() => handleFilterClick(null)}
        >
          <p className={`text-base ${filter === null ? 'text-brand-green-primary' : 'border-white-100'}`}>
            All Purchases ({allPurchasesCount})
          </p>
        </div>
        <div
          className={`h-[2.8rem] w-[12.5rem] flex items-center justify-center border-b-2 border-solid ${
            filter === 'Pending' ? 'border-brand-green-primary' : 'border-white-100'
          }`}
          onClick={() => handleFilterClick('Pending')}
        >
          <p className={`text-base ${filter === 'Pending' ? '' : ''}`}>Pending Purchases ({pendingPurchasesCount})</p>
        </div>
        <div
          className={`h-[2.8rem] w-[12.5rem] flex items-center justify-center border-b-2 border-solid ${
            filter === 'Successful' ? 'border-brand-green-primary' : 'border-white-100'
          }`}
          onClick={() => handleFilterClick('Successful')}
        >
          <p className={`text-base ${filter === 'Successful' ? 'border-brand-green-primary' : 'border-white-100'}`}>
            Completed Purchases ({completedPurchasesCount})
          </p>
        </div>
        <div
          className={`h-[2.8rem] w-[12.5rem] flex items-center justify-center border-b-2 border-solid ${
            filter === 'Failed' ? 'border-brand-green-primary' : 'border-white-100'
          }`}
          onClick={() => handleFilterClick('Failed')}
        >
          <p className={`text-base ${filter === 'Failed' ? 'border-brand-green-primary' : 'border-white-100'}`}>
            Failed Purchases ({failedPurchasesCount})
          </p>
        </div>
      </div>

      <div className="border-r-4 border-white-200 border-solid w-[78.5rem] px-4">
        <div className="flex items-center justify-between h-[2.5rem] mt-[4.375rem]">
          <Input
            leftIcon={<SearchNormal1 color="#777" />}
            className="border-2 border-solid border-white-200 pl-6 w-[62.5rem] h-[2.5rem] pr-[1rem] rounded"
            placeholder="Search by items, status, seller etc"
          />

          <Button className="h-[2.5rem] flex items-center justify-center border-2 border-solid border-white-200 w-[6.25rem] rounded text-black-600 bg-white-100 hover:bg-white-100 active:bg-white-100 text-[0.88rem] ">
            <Sort size="16" /> Filters
          </Button>

          <Button onClick={onOpen} className="h-[2.5rem] flex items-center justify-center border-2 border-solid border-white-200 w-[6.25rem] rounded text-red-306 bg-white-100 hover:bg-red-100 hover:border-bg-[#FDCDCD] hover:border-[#FDCDCD] active:border-[#FDCDCD] active:bg-[#FDCDCD] text-[0.88rem]">
            <Trash size="16" /> Delete
          </Button>
        </div>

        {/* table */}
        {data.length > 0 &&
        <table className="w-full mt-6 mb-[2rem]">
          <thead className="h-[3rem]">
            <tr className="bg-white-200">
              <th className="text-left px-4 py-2 text-[0.75rem]">
                <span className="px-4">
                  <input type="checkbox" />
                </span>
                Items
              </th>
              <th className="text-left px-4 py-2 text-[0.75rem]">Order ID</th>
              <th className="text-left px-4 py-2 text-[0.75rem]">Price</th>
              <th className="text-left px-4 py-2 text-[0.75rem]">Date</th>
              <th className="text-left px-4 py-2 text-[0.75rem]">Sellers Name</th>
              <th className="text-left px-4 py-2 text-[0.75rem]">Status</th>
            </tr>
          </thead>

          <tbody>
            {data
              .filter((item) => (filter ? item.status.toLowerCase() === filter.toLowerCase() : true))
              .map((item) => (
                <tr key={item.id} className="border-b border-white-200 border-solid border-1 h-[3.75rem]">
                  <td className="text-[0.75rem]">
                    <span className="px-4 ml-[1rem]">
                      {' '}
                      <input type="checkbox" />
                    </span>
                    {item.item}
                  </td>
                  <td className="text-[0.75rem] px-4 py-2">{item.orderID}</td>
                  <td className="text-[0.75rem] px-4 py-2">{item.price}</td>
                  <td className="text-[0.75rem] px-4 py-2">{item.date}</td>
                  <td className="text-[0.75rem] px-4 py-2">{item.sellerName}</td>
                  <td className="text-[0.75rem] px-4 py-2">
                    <span
                      className={`flex items-center justify-center h-[28px] w-[90px] rounded-xl ${
                        getStatusBackgroundColor(item.status)[0]
                      }`}
                    >
                      <p className={`text-[0.75rem] ${getStatusBackgroundColor(item.status)[1]}`}>{item.status}</p>
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        }

        {/* error page */}
        {data.length === 0 && <PurchaseNotFound />}
      </div>
      <DeleteModal isOpen={isOpen} onClose={onClose} onDelete={onDelete}/>
    </div>
  );
};

export default MyPage;

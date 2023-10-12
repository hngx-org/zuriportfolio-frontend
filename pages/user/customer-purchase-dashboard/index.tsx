import { useEffect, useState } from 'react';
import Button from '@ui/Button';
import axios from 'axios';
import { Input } from '@ui/Input';
import { ArrowRight2 } from 'iconsax-react';
import { Trash } from 'iconsax-react';
import { Sort } from 'iconsax-react';
import { SearchNormal1 } from 'iconsax-react';
import DeleteModal from '@modules/marketplace/component/CustomerDashboard/DeleteModal';
import useDisclosure from '../../../hooks/useDisclosure';
import PurchaseNotFound from '@modules/marketplace/component/CustomerDashboard/PurchaseNotFound';
import MobileCustomerDashboard from './mobile_customer_dashboard';
import FilterDropDown from '@modules/marketplace/component/CustomerDashboard/FilterDropDown';
import MainLayout from '../../../components/Layout/MainLayout';

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

type Item = {
  transactions: any[];
};

const DUMMYDATA: PurchaseData[] = [
  {
    id: 1,

    item: 'Webinar & Course Slide',

    orderID: '643D73U90',

    price: '$150.00',

    date: '25 March 2023',

    sellerName: 'Mark Essien',

    status: 'Successful',
  },

  {
    id: 2,

    item: 'Webinar & Course Slide',

    orderID: '643D73U91',

    price: '$280.00',

    date: '25 March 2023',

    sellerName: 'Mark Essien',

    status: 'Pending',
  },

  {
    id: 3,

    item: 'Webinar & Course Slide',

    orderID: '643D73U92',

    price: '$100.00',

    date: '27 March 2023',

    sellerName: 'Ekomobong Enang',

    status: 'Failed',
  },

  {
    id: 4,

    item: 'Webinar & Course Slide',
    
    orderID: '643D73U93',

    price: '$107.00',

    date: '25 March 2023',

    sellerName: 'Mark Essien',

    status: 'Pending',
  },

  {
    id: 5,

    item: 'Webinar & Course Slide',
    orderID: '643D73U94',

    price: '$100.00',

    date: '30 March 2023',

    sellerName: 'Solomon Edem',

    status: 'Pending',
  },

  {
    id: 6,

    item: 'Webinar & Course Slide',

    orderID: '643D73U95',

    price: '$900.00',

    date: '30 March 2023',

    sellerName: 'Solomon Edem',

    status: 'Failed',
  },
  {
    id: 7,

    item: 'Webinar & Course Slide',

    orderID: '643D73U96',

    price: '$700.00',

    date: '30 March 2023',

    sellerName: 'Solomon Edem',

    status: 'Successful',
  },
  {
    id: 8,

    item: 'Webinar & Course Slide',

    orderID: '643D73U907',

    price: '$260.00',

    date: '31 March 2023',

    sellerName: 'Solomon Edem',

    status: 'Successful',
  },
  {
    id: 9,

    item: 'Webinar & Course Slide',

    orderID: '643D73U98',

    price: '$100.00',

    date: '31 March 2023',

    sellerName: 'Solomon Edem',

    status: 'Successful',
  },
  {
    id: 10,

    item: 'Webinar & Course Slide',

    orderID: '643D73U99',

    price: '$100.00',

    date: '31 March 2023',

    sellerName: 'Solomon Edem',

    status: 'Pending',
  },

  // Add more data items as needed
];

export type SearchFilter = 'item' | 'date' | 'orderID' | 'price' | 'sellerName';

const MyPage: React.FC = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [filter, setFilter] = useState<string | null>(null);
  const [transactionData, setTransactionData] = useState<Item[]>([]);
  const [data, setData] = useState<PurchaseData[]>(DUMMYDATA);
  const [error, setError] = useState<string | null>(null);

  // search state
  const [searchInput, setSearchInput] = useState<string>('');

  const transactionUrl = 'https://customer-purchase.onrender.com/api';

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await axios.get(`${transactionUrl}/all-transactions`);
        setTransactionData(response?.data);
      } catch (err) {}
    };
    fetchTransaction();
  }, [transactionUrl]);

  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  // function to handle delete
  const onDelete = () => {
    onClose();
  };

  const deleteData = async (id: string) => {
    try {
      const response = await axios.delete(`${transactionUrl}/delete-transactions`);
      return response.data();
    } catch (err) {
      setError('Unable to delete!');
    }
  };

  const handleCheckboxChange = (orderID: string) => {
    setCheckedItems((prevState) => {
      if (prevState.includes(orderID)) {
        return prevState.filter((id) => id !== orderID);
      } else {
        return [...prevState, orderID];
      }
    });
  };

  const handleDelete = (orderIds: string) => {
    const newData = data.filter((item) => !orderIds.includes(item.orderID));
    setData(newData);
    onClose();
  };

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

  // handle filter dropdown
  const [filterBy, setFilterBy] = useState<SearchFilter>('item');
  const onChooseFilter = (filter: SearchFilter) => {
    setFilterBy(filter);
  };

  const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const filteredPurchase = data.filter((purchase) => purchase[filterBy].toLowerCase().includes(searchInput));
    setData(filteredPurchase);
    setSearchInput('');
  };

  // handle search and filter functionality
  const handleFilterClick = (filterName: string | null) => {
    setFilter(filterName);
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const onBack = () => {
    setData(DUMMYDATA);
  };

  return (
    <MainLayout showFooter showTopbar showDashboardSidebar={false} activePage="">
      <div className="px-7 sm:px-16 max-w-screen overflow-hidden">
        <div className="mt-2 sm:mt-9 sm:mb-12 sm:block">
          <div className="flex items-center ml-5 sm:ml-0">
            <p className="text-base text-brand-green-primary">Settings</p>
            <span className="mx-[5px]">
              <ArrowRight2 size="16" color="green" />
            </span>
            <p className="text-base text-gray-100">Dashboard</p>
          </div>
        </div>
        <h3 className="font-semibold text-3xl hidden sm:block">Customer Purchase Dashboard</h3>

        <div className="hidden sm:flex sm:align-center sm:justify-between w-full lg:w-4/5 mt-9">
          <div
            className={`h-[2.8rem] w-[12.5rem] flex items-center justify-center border-b-2 border-solid ${
              filter === null ? 'border-brand-green-primary' : 'border-white-100'
            }`}
            onClick={() => handleFilterClick(null)}
          >
            <p
              className={`text-sm cursor-pointer lg:text-base ${
                filter === null ? 'text-brand-green-primary' : 'border-white-100'
              }`}
            >
              All Purchases ({allPurchasesCount})
            </p>
          </div>
          <div
            className={`h-[2.8rem] w-[12.5rem] flex items-center justify-center border-b-2 border-solid ${
              filter === 'Pending' ? 'border-brand-green-primary' : 'border-white-100'
            }`}
            onClick={() => handleFilterClick('Pending')}
          >
            <p
              className={`text-sm cursor-pointer lg:text-base ${
                filter === 'Pending' ? 'text-brand-green-primary' : 'border-white-100'
              }`}
            >
              Pending Purchases ({pendingPurchasesCount})
            </p>
          </div>
          <div
            className={`h-[2.8rem] w-[12.5rem] flex items-center justify-center border-b-2 border-solid ${
              filter === 'Successful' ? 'border-brand-green-primary' : 'border-white-100'
            }`}
            onClick={() => handleFilterClick('Successful')}
          >
            <p
              className={`text-sm cursor-pointer lg:text-base ${
                filter === 'Successful' ? 'text-brand-green-primary' : 'border-white-100'
              }`}
            >
              Completed Purchases ({completedPurchasesCount})
            </p>
          </div>
          <div
            className={`h-[2.8rem] w-[12.5rem] flex items-center justify-center border-b-2 border-solid ${
              filter === 'Failed' ? 'border-brand-green-primary' : 'border-white-100'
            }`}
            onClick={() => handleFilterClick('Failed')}
          >
            <p
              className={`text-sm cursor-pointer lg:text-base ${
                filter === 'Failed' ? 'text-brand-green-primary' : 'border-white-100'
              }`}
            >
              Failed Purchases ({failedPurchasesCount})
            </p>
          </div>
        </div>

        <div className="sm:border-r-4 sm:border-white-200 sm:border-solid w-full px-4 flex flex-col gap-8 sm:gap-0">
          <div className="flex items-center h-[2.5rem] gap-5 sm:gap-10 mt-[3rem] ">
            <form className="w-full" onSubmit={(e) => onSearch(e)}>
              <Input
                value={searchInput}
                onChange={(e) => handleSearchInput(e)}
                leftIcon={<SearchNormal1 color="#777" />}
                className="border-2 border-solid border-white-200 pl-6 w-full h-[2.5rem] pr-[1rem] rounded flex-1"
                placeholder={`Search by ${filterBy} or select a filter to search by`}
              />
            </form>

            <div className="flex gap-3">
              <FilterDropDown onChooseFilter={onChooseFilter} />
              <Button
                onClick={onOpen}
                className="h-[2.5rem] flex items-center justify-center border-2 border-solid border-white-200 sm:w-[6.25rem] rounded text-red-306 bg-white-100 hover:bg-red-100 hover:border-bg-[#FDCDCD] hover:border-[#FDCDCD] active:border-[#FDCDCD] active:bg-[#FDCDCD] text-[0.88rem]"
              >
                <Trash size="16" />
                <p className="hidden sm:block">Delete</p>
              </Button>
            </div>
          </div>

          {/* table */}
          {data.length > 0 && (
            <div className="hidden sm:block w-full overflow-x-auto">
              <table className="w-max md:w-full mt-6 mb-8">
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
                        <td className="text-[0.75rem] flex items-center mt-5">
                          <span className="px-4 ml-[1rem]">
                            {' '}
                            <input
                              type="checkbox"
                              checked={checkedItems.includes(item.orderID)}
                              onChange={() => handleCheckboxChange(item.orderID)}
                            />
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
                            <p className={`text-[0.75rem] ${getStatusBackgroundColor(item.status)[1]}`}>
                              {item.status}
                            </p>
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}

          {data.length > 0 && (
            <MobileCustomerDashboard
              data={data}
              checkedItems={checkedItems}
              handleCheckboxChange={handleCheckboxChange}
            />
          )}
          {/* error page */}
          {data.length === 0 && <PurchaseNotFound back={onBack} />}
        </div>
        {/* delete modal */}
        <DeleteModal isOpen={isOpen} onClose={onClose} handleDelete={handleDelete} checkedItems={checkedItems} />
      </div>
    </MainLayout>
  );
};

export default MyPage;


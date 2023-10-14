import { useEffect, useState } from 'react';
import Button from '@ui/Button';
import { Input } from '@ui/Input';
import { ArrowRight2 } from 'iconsax-react';
import { Trash } from 'iconsax-react';
import { SearchNormal1 } from 'iconsax-react';
import DeleteModal from '@modules/marketplace/component/CustomerDashboard/DeleteModal';
import useDisclosure from '../../../hooks/useDisclosure';
import PurchaseNotFound from '@modules/marketplace/component/CustomerDashboard/PurchaseNotFound';
import MobileCustomerDashboard from '@modules/marketplace/component/CustomerDashboard/mobile_customer_dashboard';
import FilterDropDown from '@modules/marketplace/component/CustomerDashboard/FilterDropDown';
import MainLayout from '../../../components/Layout/MainLayout';
import $http from '../../../http/axios';
import { toast } from 'react-toastify';
import { error } from 'console';
import Spinner from '@ui/Spinner';
import Link from 'next/link';

// Define a type for the data
export type PurchaseData = {
  id: number;
  order_id: string;
  product_id: string;
  customer_id: string;
  merchant_id: string;
  order_price: string;
  order_VAT: string;
  order_discount: string;
  promo_id: string | null;
  createdAt: string;
  updatedAt: string;
  merchant: string;
  product: {
    name: string;
  };
  order: {
    status: string;
  };
};

export type SearchFilter = 'item' | 'price';

const MyPage: React.FC = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<string | null>(null);
  const [data, setData] = useState<PurchaseData[]>([]);
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  // search state
  const [searchInput, setSearchInput] = useState<string>('');

  const payload = { orderItemIds: checkedItems };
  const stringifyData = JSON.stringify(payload);

  // function to handle delete
  const onDelete = async () => {
    try {
      console.log('Deleting items...');
      const response = await fetch(`https://customer-purchase.onrender.com/api/orders/delete-transactions`, {
        method: 'DELETE',
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZlN2EyZWVhLWI3MDgtNGQ5NS1hYjFhLTgxYjhjY2FkZmNiZCIsImlhdCI6MTY5NzEyMjA4NX0.e4fKa18WW2wL0lbUfJkvp2Jk9KP2YadUdAMx1VDGaZU',
          'Content-Type': 'application/json',
        },
        body: stringifyData,
      });

      console.log('Delete API response:', response);

      if (response.ok) {
        toast.success('Deleted, Successfuly', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        const res = await response.json();
        console.log(res.data());
        getAllPurchase();
      }
      getAllPurchase();
    } catch (err) {
      console.log('Error:', err);
      toast.error('An error occurred while deleting', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };

  // const handle select for delete
  const isSelected = (orderId: number) => checkedItems.includes(orderId);
  const handleCheckboxChange = (orderID: number) => {
    if (isSelected(orderID)) {
      // Item is already selected, remove it from the selected list
      setCheckedItems(checkedItems.filter((id) => id !== orderID));
    } else {
      // Item is not selected, add it to the selected list
      setCheckedItems([...checkedItems, orderID]);
    }
  };

  // Calculate counts for each category
  const allPurchasesCount = data.length;
  const pendingPurchasesCount = data.filter((item) => item.order?.status.toLowerCase() === 'pending').length;
  const completedPurchasesCount = data.filter((item) => item.order?.status.toLowerCase() === 'completed').length;
  const failedPurchasesCount = data.filter((item) => item.order?.status.toLowerCase() === 'cancelled').length;

  // Function to determine the background color based on status
  const getStatusBackgroundColor = (status: string): string[] => {
    switch (status.toLowerCase()) {
      case 'completed':
        return ['bg-custom-color41', 'text-custom-color35']; // Return an array of background and text colors
      case 'pending':
        return ['bg-custom-color40', 'text-yellow-600'];
      case 'cancelled':
        return ['bg-pink-120', 'text-custom-color34'];
      default:
        return ['bg-gray-200', 'text-gray-600'];
    }
  };

  useEffect(() => {
    async function fetchData() {
      await getAllPurchase();
    }

    fetchData();
  }, []);

  const getAllPurchase = async () => {
    setIsLoading(true);
    try {
      const res = await $http.get('https://customer-purchase.onrender.com/api/orders/all-transactions', {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZlN2EyZWVhLWI3MDgtNGQ5NS1hYjFhLTgxYjhjY2FkZmNiZCIsImlhdCI6MTY5NzEyMjA4NX0.e4fKa18WW2wL0lbUfJkvp2Jk9KP2YadUdAMx1VDGaZU',
        },
      });
      setData(res?.data?.data);
      setIsLoading(false);
    } catch (error) {
      setData([]);
      setIsLoading(false);
    }
    setSearchInput('');
  };

  // api search
  const onSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await $http.get(getFilterApi(filterBy, searchInput), {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZlN2EyZWVhLWI3MDgtNGQ5NS1hYjFhLTgxYjhjY2FkZmNiZCIsImlhdCI6MTY5NzEyMjA4NX0.e4fKa18WW2wL0lbUfJkvp2Jk9KP2YadUdAMx1VDGaZU',
        },
      });
      setData(res?.data?.data);
      setIsLoading(false);
    } catch (error) {
      setData([]);
      setIsLoading(false);
    }
    setSearchInput('');
  };

  const getFilterApi = (filterBy: string, filterParams: string) => {
    return `https://customer-purchase.onrender.com/api/orders/filter-transactions?${filterBy}=${filterParams}`;
  };

  // handle filter dropdown
  const [filterBy, setFilterBy] = useState<SearchFilter>('item');
  const onChooseFilter = (filter: SearchFilter) => {
    setFilterBy(filter);
  };

  // handle search and filter functionality
  const handleFilterClick = (filterName: string | null) => {
    setFilter(filterName);
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const onBack = async () => {
    // call purchase data here again
    await getAllPurchase();
  };

  return (
    <MainLayout showFooter showTopbar showDashboardSidebar={false} activePage="">
      <div className="px-5 sm:px-16 max-w-screen overflow-hidden">
        <div className="mt-9 mb-1 md:mb-12">
          <div className="flex items-center">
            <Link href="/settings">
              <p className="text-base text-brand-green-primary">Settings</p>
            </Link>
            <span className="mx-[5px]">
              <ArrowRight2 size="16" color="green" />
            </span>
            <Link href="/dashboard">
              <p className="text-base text-gray-100">Dashboard</p>
            </Link>
          </div>
        </div>
        <h3 className="font-semibold text-3xl hidden sm:block">Customer Purchase Dashboard</h3>

        {/* filter purchases */}
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
              filter === 'Completed' ? 'border-brand-green-primary' : 'border-white-100'
            }`}
            onClick={() => handleFilterClick('Completed')}
          >
            <p
              className={`text-sm cursor-pointer lg:text-base ${
                filter === 'Completed' ? 'text-brand-green-primary' : 'border-white-100'
              }`}
            >
              Completed Purchases ({completedPurchasesCount})
            </p>
          </div>
          <div
            className={`h-[2.8rem] w-[12.5rem] flex items-center justify-center border-b-2 border-solid ${
              filter === 'cancelled' ? 'border-brand-green-primary' : 'border-white-100'
            }`}
            onClick={() => handleFilterClick('cancelled')}
          >
            <p
              className={`text-sm cursor-pointer lg:text-base ${
                filter === 'cancelled' ? 'text-brand-green-primary' : 'border-white-100'
              }`}
            >
              Cancelled Purchases ({failedPurchasesCount})
            </p>
          </div>
        </div>

        <div className="sm:border-r-4 sm:border-white-200  sm:border-solid w-full px-4 flex flex-col gap-8 sm:gap-0">
          {/* search - filter - delete section */}
          <div className="flex items-center h-[2.5rem] gap-2 mt-[3rem] ">
            <form className="w-full" onSubmit={(e) => onSearch(e)}>
              <Input
                value={searchInput}
                onChange={(e) => handleSearchInput(e)}
                leftIcon={<SearchNormal1 color="black" />}
                className="border-2 border-solid border-white-200 pl-6 w-full h-[2.5rem] pr-[1rem] rounded flex-1"
                placeholder={`Search by ${filterBy} or select a filter to search by`}
              />
            </form>

            <FilterDropDown onChooseFilter={onChooseFilter} />
          </div>
          {isLoading && <Spinner />}
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
                    .filter((item) => (filter ? item.order.status.toLowerCase() === filter.toLowerCase() : true))
                    .map((item) => (
                      <tr key={item.id} className="border-b border-white-200 border-solid border-1 h-[3.75rem]">
                        <td className="text-[0.75rem] flex items-center mt-5">
                          <span className="px-4 ml-[1rem]">
                            {' '}
                            <input
                              type="checkbox"
                              checked={checkedItems.includes(item.id)}
                              onChange={() => handleCheckboxChange(item.id)}
                            />
                          </span>
                          {item.product.name}
                        </td>
                        <td className="text-[0.75rem] px-4 py-2">{item.order_id}</td>
                        <td className="text-[0.75rem] px-4 py-2">{item.order_price}</td>
                        <td className="text-[0.75rem] px-4 py-2">{item.createdAt.split('T')[0]}</td>
                        <td className="text-[0.75rem] px-4 py-2">{item.merchant}</td>
                        <td className="text-[0.75rem] px-4 py-2">
                          <span
                            className={`flex items-center justify-center h-[28px] w-[90px] rounded-xl ${
                              getStatusBackgroundColor(item.order.status)[0]
                            }`}
                          >
                            <p className={`text-[0.75rem] ${getStatusBackgroundColor(item.order.status)[1]}`}>
                              {item.order.status}
                            </p>
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
          {data.length > 0 && <MobileCustomerDashboard data={data} />}
          {/* error page */}
          {data.length === 0 && <PurchaseNotFound back={onBack} />}
        </div>
        {/* delete modal */}
        <DeleteModal isOpen={isOpen} onClose={onClose} onDelete={onDelete} />
      </div>
    </MainLayout>
  );
};

export default MyPage;

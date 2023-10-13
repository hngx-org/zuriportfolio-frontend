import { useState } from 'react';
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

// Define a type for the data
export type PurchaseData = {
    "id": number,
    "order_id": string,
    "product_id": string,
    "customer_id": string,
    "merchant_id": string,
    "order_price": string,
    "order_VAT": string,
    "order_discount": string,
    "promo_id": string | null,
    "createdAt": string,
    "updatedAt": string,
    "merchant": {
      "first_name": string,
      "last_name": string
    },
    "product": {
      "name": string
    },
    "order": {
      "status": string
    }
};

const DUMMYDATA: PurchaseData[] = [
  {
    "id": 7,
    "order_id": "04f49648-9664-4ffe-a876-91e816dfbd22",
    "product_id": "f7c1a7f3-6a53-4c0c-8959-ecdd87fbf3e9",
    "customer_id": "4e8f65c7-d21b-4a5e-98ab-2f2560973c34",
    "merchant_id": "4e8f65c7-d21b-4a5e-98ab-2f2560973c34",
    "order_price": "1000.00",
    "order_VAT": "30.00",
    "order_discount": "50",
    "promo_id": null,
    "createdAt": "2023-10-12T14:59:09.906Z",
    "updatedAt": "2023-10-12T14:59:09.906Z",
    "merchant": {
      "first_name": "John",
      "last_name": "Doe"
    },
    "product": {
      "name": "Product 1"
    },
    "order": {
      "status": "pending"
    }
  },
  {
    "id": 8,
    "order_id": "04f49648-9664-4ffe-a876-91e816dfbd22",
    "product_id": "f7c1a7f3-6a53-4c0c-8959-ecdd87fbf3e9",
    "customer_id": "4e8f65c7-d21b-4a5e-98ab-2f2560973c34",
    "merchant_id": "4e8f65c7-d21b-4a5e-98ab-2f2560973c34",
    "order_price": "1000.00",
    "order_VAT": "30.00",
    "order_discount": "50",
    "promo_id": null,
    "createdAt": "2023-10-12T14:59:09.906Z",
    "updatedAt": "2023-10-12T14:59:09.906Z",
    "merchant": {
      "first_name": "John",
      "last_name": "Doe"
    },
    "product": {
      "name": "Product 1"
    },
    "order": {
      "status": "pending"
    }
  }
]

export type SearchFilter = "item" | "price"

const MyPage: React.FC = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<string | null>(null);
  const [data, setData] = useState<PurchaseData[]>(DUMMYDATA)
  // search state
  const [searchInput, setSearchInput] = useState<string>("");



  // function to handle delete
  const onDelete = () => {
    onClose();
  };

  

  // Calculate counts for each category
  const allPurchasesCount = data.length;
  const pendingPurchasesCount = data.filter((item) => item.order?.status.toLowerCase() === 'pending').length;
  const completedPurchasesCount = data.filter((item) => item.order?.status.toLowerCase() === 'successful').length;
  const failedPurchasesCount = data.filter((item) => item.order?.status.toLowerCase() === 'cancelled').length;

  // Function to determine the background color based on status
  const getStatusBackgroundColor = (status: string): string[] => {
    switch (status.toLowerCase()) {
      case 'successful':
        return ['bg-custom-color41', 'text-custom-color35']; // Return an array of background and text colors
      case 'pending':
        return ['bg-custom-color40', 'text-yellow-600'];
      case 'cancelled':
        return ['bg-pink-120', 'text-custom-color34'];
      default:
        return ['bg-gray-200', 'text-gray-600'];
    }
  };
  

  // api search
  const onSearch = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await $http.get(getFilterApi(filterBy, searchInput), {
        headers: {
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZlN2EyZWVhLWI3MDgtNGQ5NS1hYjFhLTgxYjhjY2FkZmNiZCIsImlhdCI6MTY5NzEyMjA4NX0.e4fKa18WW2wL0lbUfJkvp2Jk9KP2YadUdAMx1VDGaZU"
        }
      });
      setData(res?.data?.data)
      setIsLoading(false);
    } catch (error) {
      setData([]);
      setIsLoading(false);
    }
    setSearchInput("");
  }

  const getFilterApi = (filterBy: string, filterParams: string) => {
    return `https://customer-purchase.onrender.com/api/orders/filter-transactions?${filterBy}=${filterParams}`
  }

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
  }

  const onBack = () => {
    // call purchase data here again
    onClose();
  }

  return (
    <MainLayout showFooter showTopbar showDashboardSidebar={false} activePage="">
      <div className="px-5 sm:px-16 max-w-screen overflow-hidden">
        <div className="mt-9 mb-1 md:mb-12">
          <div className="flex items-center">
            <p className="text-base text-brand-green-primary">Settings</p>
            <span className="mx-[5px]">
              <ArrowRight2 size="16" color="green" />
            </span>
            <p className="text-base text-gray-100">Dashboard</p>
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
              filter === 'cancelled' ? 'border-brand-green-primary' : 'border-white-100'
            }`}
            onClick={() => handleFilterClick('cancelled')}
          >
            <p
              className={`text-sm cursor-pointer lg:text-base ${
                filter === 'Failed' ? 'text-brand-green-primary' : 'border-white-100'
              }`}
            >
              Cancelled Purchases ({failedPurchasesCount})
            </p>
          </div>
        </div>
          
          <div className="sm:border-r-4 sm:border-white-200  sm:border-solid w-full px-4 flex flex-col gap-8 sm:gap-0">

          {/* search - filter - delete section */}
            <div className="flex items-center h-[2.5rem] gap-2 mt-[3rem] ">
            <form className='w-full' onSubmit={(e) => onSearch(e)}>
                <Input
                  value={searchInput}
                  onChange={(e) => handleSearchInput(e)}
                  leftIcon={<SearchNormal1 color="#777" />}
                  className="border-2 border-solid border-white-200 pl-6 w-full h-[2.5rem] pr-[1rem] rounded flex-1"
                  placeholder={`Search by ${filterBy} or select a filter to search by`}
                />
              </form>

            <FilterDropDown onChooseFilter={onChooseFilter} />

            <Button
              onClick={onOpen}
              className="h-[2.5rem] flex items-center justify-center border-2 border-solid border-white-200 w-max py-2 rounded text-red-306 bg-white-100 hover:bg-red-100 hover:border-bg-[#FDCDCD] hover:border-[#FDCDCD] active:border-[#FDCDCD] active:bg-[#FDCDCD] text-[0.88rem]"
            >
              <Trash size="16" /> <span className="hidden sm:block">Delete</span>
            </Button>
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
                    .filter((item) => (filter ? item.order.status.toLowerCase() === filter.toLowerCase() : true))
                    .map((item) => (
                      <tr key={item.id} className="border-b border-white-200 border-solid border-1 h-[3.75rem]">
                        <td className="text-[0.75rem] flex items-center mt-5">
                          <span className="px-4 ml-[1rem]">
                            {' '}
                            <input type="checkbox" />
                          </span>
                          {item.product.name}
                        </td>
                        <td className="text-[0.75rem] px-4 py-2">{item.order_id}</td>
                        <td className="text-[0.75rem] px-4 py-2">{item.order_price}</td>
                        <td className="text-[0.75rem] px-4 py-2">{item.createdAt.split("T")[0]}</td>
                        <td className="text-[0.75rem] px-4 py-2">{item.merchant.last_name} {item.merchant.first_name}</td>
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
          {data.length === 0 && <PurchaseNotFound back={onBack}/>}
          </div>
        {/* delete modal */}
        <DeleteModal isOpen={isOpen} onClose={onClose} onDelete={onDelete} />
      </div>
    </MainLayout>
  );
};

export default MyPage;

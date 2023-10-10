import { useState } from 'react';
import Pagination from '../../../components/ui/Pagination';
import Button from '@ui/Button';
import { Input } from '@ui/Input';
import { ArrowRight2 } from 'iconsax-react';
import { Trash } from 'iconsax-react';
import { Sort } from 'iconsax-react';
import { SearchNormal1 } from 'iconsax-react';
import DeleteModal from '@modules/marketplace/component/CustomerDashboard/DeleteModal';
import useDisclosure from '../../../hooks/useDisclosure';
import PurchaseNotFound from '@modules/marketplace/component/CustomerDashboard/PurchaseNotFound';
import FilterDropDown from '@modules/marketplace/component/CustomerDashboard/FilterDropDown';

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
  const [filter, setFilter] = useState<string | null>(null);
  const { isOpen, onClose, onOpen } = useDisclosure();

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
  const onDelete = () => {
    onClose();
  };

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

  // handle filter dropdown
  const [filterBy, setFilterBy] = useState<string>('item');
  const onChooseFilter = (filter: string) => {
    setFilterBy(filter);
  };

  const [page, setPage] = useState(1);

  return (
    <div className="px-1 sm:px-16 max-w-screen overflow-hidden">
      {/* dashboard route */}
      <div className="mt-9 sm:hidden">
        <div className="flex items-center">
          <p className="text-base text-brand-green-primary">Settings</p>

          <span className="mx-[5px]">
            <ArrowRight2 size="16" color="green" />
          </span>

          <p className="text-base text-gray-100">Dashboard</p>
        </div>
      </div>

      <div className="sm:border-r-4 sm:border-white-200 sm:border-solid w-full flex flex-col gap-8 sm:gap-0 ">
        {/* filter and search bar */}
        <div className="sm:hidden flex items-center justify-between h-fit gap-5 mt-[3rem] ">
          <Input
            leftIcon={<SearchNormal1 color="#777" />}
            className="border-2 border-solid border-white-200 pl-6 w-[62.5rem] h-[2.5rem] pr-[1rem] rounded-lg py-2"
            placeholder="Search by items, status, seller etc"
          />

          <div className="flex gap-4">
            <FilterDropDown onChooseFilter={onChooseFilter} />

            <Button
              onClick={onOpen}
              className="h-[2.5rem] flex items-center justify-center border-2 border-solid border-white-200 w-fit rounded-lg text-red-306 bg-white-100 hover:bg-red-100 hover:border-bg-[#FDCDCD] hover:border-[#FDCDCD] active:border-[#FDCDCD] active:bg-[#FDCDCD] text-[0.88rem]"
            >
              <Trash size="16" />
            </Button>
          </div>
        </div>

        {/* mobile purchase card */}
        <div className="sm:hidden w-full overflow-hidden sm:overflow-x-auto flex flex-col gap-10">
          {data
            .filter((item) => (filter ? item.status.toLowerCase() === filter.toLowerCase() : true))

            .map((item) => (
              <div key={item.id} className="sm:hidden border border-zinc-300 h-fit rounded-xl p-6 flex flex-col gap-4">
                <div className=" w-full flex justify-between gap-4">
                  <span className="flex gap-3 items-center">
                    <input type="checkbox" />
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
        <DeleteModal isOpen={isOpen} onClose={onClose} onDelete={onDelete} />
      </div>
    </div>
  );
};

export default MyPage;

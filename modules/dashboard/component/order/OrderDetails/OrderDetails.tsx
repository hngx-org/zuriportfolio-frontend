import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import useOrders from '../../../../../hooks/useOrders';
import OrderDetailsTable from './OrderDetailsTable';
import usePaginate from '../../../../../hooks/usePaginate';
import { SearchNormal1 } from 'iconsax-react';
import PaginationBar from '../PaginationBar';
import { OrderDetailsMobile } from './OrderDetailsRow';
import { OrderHistory } from '../../../../../@types';
import Filters from '../Filters';
import Pagination from '@ui/Pagination';
import { useRouter } from 'next/router';
import Loader from '@ui/Loader';
import axios from 'axios';
const filters: {
  id: keyof OrderHistory;
  title: string;
}[] = [
  {
    id: 'id',
    title: 'Order iD',
  },
  {
    id: 'productName',
    title: 'Product Name',
  },
  {
    id: 'productType',
    title: 'Product Type',
  },
  {
    id: 'price',
    title: 'Price/unit',
  },
];
const dummyOrders: OrderHistory[] = [
  {
    id: 3066,
    productName: 'Learning Design 101',
    customerName: 'Jenny Wilson',
    date: new Date(2023, 9, 18),
    status: 'completed',
    productType: 'Course',
    price: 3000,
    sales: 123,
    revenue: 369000,
  },
  {
    id: 3065,
    productName: 'Your Soul Is a River Ebook',
    customerName: 'Jane Cooper',
    date: new Date(2023, 9, 11),
    status: 'cancelled',
    productType: 'Ebook',
    price: 45000,
    sales: 64,
    revenue: 2880000,
  },
  {
    id: 3064,
    productName: `YOU vs YOU Course`,
    customerName: 'Wade Warren',
    date: new Date(2023, 9, 3),
    status: 'completed',
    productType: 'Membership',
    price: 73000,
    sales: 236,
    revenue: 17228000,
  },
  {
    id: 3063,
    productName: 'Landing Page Template',
    customerName: 'Jacob Jones',
    date: new Date(2023, 9, 23),
    status: 'cancelled',
    productType: 'Themes',
    price: 12000,
    sales: 1043,
    revenue: 12516000,
  },
  {
    id: 3062,
    productName: 'Elementor PRO',
    customerName: 'Guy Hawkins',
    date: new Date(2023, 9, 17),
    status: 'completed',
    productType: 'Template',
    price: 6500,
    sales: 1022,
    revenue: 6779500,
  },
  {
    id: 3061,
    productName: 'Artistic Sketchbook',
    status: 'cancelled',
    date: new Date(2023, 9, 18),
    customerName: 'Bello Akim',
    productType: 'Arts',
    price: 200000,
    sales: 75,
    revenue: 15000000,
  },
  {
    id: 3060,
    productName: 'Elementor PRO',
    customerName: 'Guy Hawkins',
    status: 'cancelled',
    date: new Date(2023, 9, 19),
    productType: 'Software',
    price: 85000,
    sales: 32,
    revenue: 1120000,
  },
];
const OrderDetails = () => {
  // const {
  //   orders: pageOrders,
  //   orderFilter,
  //   changeFilter,
  //   changeSortBy,
  //   sortBy,
  //   changeSearchQuery,
  //   fetchOrders,
  //   getSearchResult,
  //   insertOrders,
  //   searchQuery,
  //   filterFunc,
  //   sortOrders,
  //   loading: loadingOrders,
  //   searching,
  //   totalPage,
  const [pageOrders, setOrders] = useState<OrderHistory[]>(dummyOrders);
  const [orderFilter, setOrderFilter] = useState('all');
  const [sort, setSort] = useState<{
    sortBy: keyof OrderHistory;
    sortOrder: 'asc' | 'desc';
  }>({ sortBy: 'id', sortOrder: 'asc' });
  const [searchQuery, setSearchQuery] = useState('');
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [searching, setSearching] = useState(false);
  const [totalPage, setTotalPage] = useState(1);

  const changeFilter = (val: string) => {
    // show orders by status which is either all | completed | cancelled or pending
    setOrderFilter(val);
  };
  const fetchOrders = async () => {
    try {
      setLoadingOrders(true);
      const data = await axios({
        url: `https://zuriportfolio-shop-internal-api.onrender.com/api/orders/all`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('zpt')}`,
        },
      });
      console.log(data);
      if (data.data?.errorStatus === true) {
        return [];
      }
      if (!data.data.data || data.data.data?.length === 0) {
        return [];
      }
      const transformedOrder = data?.data.data?.data?.orders?.map((order: any) => ({
        productName: order.product.name,
        id: order.order_id,
        status: order.merchant.customer_orders[0]?.status,
        customerName: order.customer.first_name + ' ' + order.customer.last_name,
        date: new Date(order.createdAt),
        price: order.product.price,
      }));

      return transformedOrder ?? [];
    } catch (error) {
      return [];
    } finally {
      setLoadingOrders(false);
    }
  };
  const debounce = (func: (...a: any) => any, timeSlice: number = 1000) => {
    let timeout: NodeJS.Timeout;
    return async function (...arg: any) {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(async () => {
        const order = await func.apply(null, arg);
      }, timeSlice);
    };
  };
  const getSearchResult = async (query: string) => {
    try {
      setSearching(true);
      if (query.length === 0) {
        return;
      }
      const res = await axios({
        url: `https://zuriportfolio-shop-internal-api.onrender.com/api/order/search/${query}`,
        method: 'GET',
      });
      const { data } = res;
      if (!!data?.errorStatus) {
        console.log('Error');

        return [];
      }
      if (data?.data === 'user not found') {
        console.log('no data');

        return [];
      }
      if (!data.data) {
        return [];
      }

      const transformedOrder =
        data.data?.data?.orders?.map((order: any) => {
          return {
            id: order.order_id,
            price: order.product.price,
            date: new Date(order.createdAt),
            revenue: order.product.price,
            status: order.customer_orders[0]?.status,
            sales: order.customer_orders[0]?.sales_report[0]?.sales,
            customerName: order.customer[0]?.username,
            productName: order.product.name,
            productType: order.product.categories[0]?.name,
          };
        }) || [];

      return transformedOrder;
    } catch (error) {
      return [];
    } finally {
      setSearching(false);
    }
  };
  const debounceSearch = debounce(getSearchResult);
  const changeSortBy = (val: keyof OrderHistory) => {
    setSort((prevSort) => {
      if (prevSort.sortBy === val) {
        return {
          sortBy: val,
          sortOrder: prevSort.sortOrder === 'asc' ? 'desc' : 'asc',
        };
      } else {
        return {
          sortBy: val,
          sortOrder: 'asc',
        };
      }
    });
  };
  const sortOrders = (orders: OrderHistory[]) => {
    let filteredOrders = [...orders];

    const { sortBy, sortOrder } = sort;

    const sortedOrders = [...filteredOrders].sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
      } else if (aVal instanceof Date && bVal instanceof Date) {
        return sortOrder === 'asc' ? aVal.getTime() - bVal.getTime() : bVal.getTime() - aVal.getTime();
      } else if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortOrder === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }

      return 0;
    });

    return sortedOrders;
  };
  const insertOrders = (order: OrderHistory[]) => {
    setOrders(order);
  };
  useEffect(() => {
    const order = sortOrders(pageOrders);
    insertOrders(order);
  }, [sort]);
  //  Search Logic

  const changeSearchQuery = (val: string) => {
    setSearchQuery(val);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const closeFilter = () => {
    setShowFilters(false);
  };

  useEffect(() => {}, [currentPage]);

  useEffect(() => {
    const changeStatus = async () => {
      changeSearchQuery('');
      const order = await fetchOrders();
      const sortedOrders = sortOrders(order);
      insertOrders(sortedOrders);
    };
  }, []);
  const changeInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    changeSearchQuery(e.target.value.trim());
    let order;
    if (e.target.value.trim()) {
      order = await getSearchResult(e.target.value.trim());
    } else {
      order = await fetchOrders();
    }

    const sortedOrders = sortOrders(order);
    insertOrders(sortedOrders);
  };
  return (
    <main className="max-w-[1240px] mx-auto md:px-10 px-6 relative min-h-[400px]">
      {loadingOrders ? (
        <div className="absolute z-50 inset-0 min-h-[300px]">
          <Loader />
        </div>
      ) : (
        <>
          <section className="font-manropeB font-semibold mt-4">
            <div className="text-gray-300 font-manropeB font-medium text-[14px] leading-[142.857%] tracking-[0.014px]  items-center gap-[2px] mb-4 hidden md:flex">
              <Link href={'/dashboard/orders'}>Order manegement</Link>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M4.50002 2.03996L7.76002 5.29996C8.14502 5.68496 8.14502 6.31496 7.76002 6.69996L4.50002 9.95996"
                  stroke="#8D9290"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <Link href={'/dashboard/orders/details'} className="text-orange-110">
                Order Details
              </Link>
            </div>
            <div className="flex flex-col gap-[60px]">
              <h1 className=" text-[2rem] leading-[125%] text-black mb-14 hidden md:block">Order Details</h1>
              <div className="justify-end items-center mb-[25px] gap-[19px] flex md:hidden">
                <div className="relative">
                  <button
                    className="px-4 py-[10px] border rounded-lg flex gap-2 border-slate-50 text-[14px] font-manropeL font-medium text-slate-300 items-center leading-[142.857%]"
                    style={{
                      boxShadow: ` 0px 1px 2px 0px rgba(16, 24, 40, 0.05)`,
                    }}
                    onClick={() => setShowFilters((prev) => !prev)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M5 10H15M2.5 5H17.5M7.5 15H12.5"
                        stroke="#344054"
                        strokeWidth="1.67"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>Filters</span>
                  </button>
                  {showFilters && (
                    <Filters
                      filters={filters}
                      changeFilter={changeSortBy}
                      currentFilter={sort.sortBy}
                      closeFilter={closeFilter}
                    />
                  )}
                </div>
              </div>
              <Link
                href={'/dashboard/orders'}
                className="text-brand-green-primary md:text-[22px] text-[14px] leading-[127.273%] text-end w-fit ml-auto self-end mb-[22px] md:flex items-center gap-2 cursor-pointer hidden "
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9.57 5.92982L3.5 11.9998L9.57 18.0698"
                    stroke="#009254"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20.4999 12L3.66992 12"
                    stroke="#009254"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Back to Order History</span>
              </Link>
            </div>
          </section>
          <section
            className="rounded-2xl pt-5 hidden md:block"
            style={{
              boxShadow: `0px 0px 2px 0px rgba(0, 0, 0, 0.14)`,
            }}
          >
            <div className="px-8 justify-end items-center gap-[129px] mb-[25px] hidden md:flex">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <button
                    className="px-4 py-[10px] border rounded-lg flex gap-2 border-slate-50 text-[14px] font-manropeL font-medium text-slate-300 items-center leading-[142.857%]"
                    style={{
                      boxShadow: ` 0px 1px 2px 0px rgba(16, 24, 40, 0.05)`,
                    }}
                    onClick={() => setShowFilters((prev) => !prev)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M5 10H15M2.5 5H17.5M7.5 15H12.5"
                        stroke="#344054"
                        strokeWidth="1.67"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>Filters</span>
                  </button>

                  {showFilters && (
                    <Filters
                      filters={filters}
                      changeFilter={changeSortBy}
                      currentFilter={sort.sortBy}
                      closeFilter={closeFilter}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="relative">
              {!searching ? (
                <>
                  {pageOrders.length === 0 ? (
                    <p className="text-center text-dark-110 font-manropeB text-[24px] leading-[133%] py-[30px] mb-[94px] mt-[70px] ">
                      No Order to Show
                    </p>
                  ) : (
                    <OrderDetailsTable pageItem={pageOrders} changeSort={changeSortBy} currentSort={sort.sortBy} />
                  )}
                </>
              ) : (
                <div className="absolute z-50 inset-0 min-h-[300px]">
                  <Loader />
                </div>
              )}
            </div>
          </section>
          <div className="md:hidden flex flex-col gap-4 mb-4 relative">
            {!searching ? (
              <>
                {pageOrders.length > 0 ? (
                  pageOrders.map((item) => <OrderDetailsMobile key={item.id} {...item} />)
                ) : (
                  <p className="text-center text-dark-110 font-manropeB text-[24px] leading-[133%] py-[30px] mb-[94px] mt-[70px] ">
                    No Order to Show
                  </p>
                )}
              </>
            ) : (
              <div className="absolute z-50 inset-0 min-h-[300px] bg-white-100">
                <Loader />
              </div>
            )}
          </div>
          <div className="flex justify-center my-6">
            <Pagination
              activePage={currentPage}
              page={currentPage}
              pages={3}
              visiblePaginatedBtn={3}
              setPage={setCurrentPage}
            />
          </div>
        </>
      )}
    </main>
  );
};

export default OrderDetails;

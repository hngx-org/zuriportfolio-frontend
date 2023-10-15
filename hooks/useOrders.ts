import { useState, useEffect, useMemo, useCallback } from 'react';
import { OrderHistory } from '../@types';
import { clearTimeout } from 'timers';
import axios from 'axios';

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

const useOrders = (initialOrders = dummyOrders) => {
  const [orders, setOrders] = useState(initialOrders);
  const [orderFilter, setOrderFilter] = useState('all');
  const [sort, setSort] = useState<{
    sortBy: keyof OrderHistory;
    sortOrder: 'asc' | 'desc';
  }>({ sortBy: 'id', sortOrder: 'asc' });
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoadingOrders] = useState(true);
  const [searching, setSearching] = useState(false);
  const filterFunc = useCallback((filter: string, order: any[]) => {
    let filteredOrders = [...order];
    if (filter !== 'all') {
      filteredOrders = order.filter((order) => order.status === filter);
    }

    return filteredOrders;
  }, []);
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
      });

      if (data.data?.errorStatus === true) {
        return [];
      }
      if (!data.data.data || data.data.data?.length === 0) {
        return [];
      }
      const transformedOrder = data?.data.data?.map((order: any) => ({
        productName: order.product.name,
        id: order.order_id,
        status: order.merchant.customer_orders[0]?.status,
        customerName: order.customer.first_name + order.customer.last_name,
        date: new Date(order.createdAt),
      }));

      return transformedOrder;
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

      const transformedOrder = data.data.map((order: any) => {
        return {
          id: order.order_id,
          price: order.product.price,
          date: new Date(order.createdAt),
          revenue: order.merchant.revenue[0]?.amount,
          status: order.customer_orders[0]?.status,
          sales: order.customer_orders[0]?.sales_report[0]?.sales,
          customerName: order.customer[0]?.username,
          productName: order.product.name,
          productType: order.product.categories[0]?.name,
        };
      });

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
  const insertOrders = (order: any[]) => {
    setOrders(order);
  };
  useEffect(() => {
    const order = sortOrders(orders);
    insertOrders(order);
  }, [initialOrders, sort]);
  //  Search Logic

  const changeSearchQuery = (val: string) => {
    setSearchQuery(val);
  };

  return {
    changeSearchQuery,
    searchQuery,
    filterFunc,
    fetchOrders,
    debounceSearch,
    sortOrders,
    sortBy: sort.sortBy,
    insertOrders,
    orders,
    changeSortBy,
    changeFilter,
    orderFilter,
    loading,
    searching,
    getSearchResult,
  };
};

export default useOrders;

import { useState, useEffect, useMemo, useCallback } from 'react';
import { OrderHistory } from '../@types';
import { clearTimeout } from 'timers';

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
    status: 'pending',
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
    status: 'pending',
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

  const filterFunc = useCallback((filter: string, shouldChangeSort: boolean = true) => {
    let filteredOrders = [...initialOrders];
    if (filter !== 'all') {
      filteredOrders = initialOrders.filter((order) => order.status === filter);
    }
    setOrders(filteredOrders);
    // Change sort to default
    if (shouldChangeSort) {
      changeSortBy('id');
    }
    return filteredOrders;
  }, []);
  const changeFilter = (val: string) => {
    // show orders by status which is either all | completed | cancelled or pending
    setOrderFilter(val);
    filterFunc(val);
  };

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

  useEffect(() => {
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

    setOrders((prev) => sortOrders(prev));
  }, [initialOrders, sort]);
  //  Search Logic

  const searchFunc = useCallback((query: string, filter: string) => {
    if (query.trim().length === 0) {
      filterFunc(filter as string);
      return;
    }
    // Filter initial Orders by status
    const orders = filterFunc(filter, false);
    setOrders(orders.filter((order) => order.productName.toLowerCase().includes(query.trim().toLowerCase())));
  }, []);

  const changeSearchQuery = (val: string, filter: string) => {
    setSearchQuery(val);
    searchFunc(val, filter);
  };

  return {
    orders,
    changeFilter,
    orderFilter,
    changeSortBy,
    sortBy: sort.sortBy,
    toggleSortOrder: () => {
      setSort((prevSort) => ({
        ...prevSort,
        sortOrder: prevSort.sortOrder === 'asc' ? 'desc' : 'asc',
      }));
    },
    changeSearchQuery,
    searchQuery,
  };
};

export default useOrders;

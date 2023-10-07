import { useState, useEffect } from 'react';
import { OrderHistory } from '../@types';

const dummyOrders: OrderHistory[] = [
  {
    id: 3066,
    productName: 'Learning Design 101',
    customerName: 'Jenny Wilson',
    date: new Date(2023, 9, 18),
    status: 'completed',
  },
  {
    id: 3065,
    productName: 'Your Soul Is a River Ebook',
    customerName: 'Jane Cooper',
    date: new Date(2023, 9, 11),
    status: 'pending',
  },
  {
    id: 3064,
    productName: `YOU vs YOU Course`,
    customerName: 'Wade Warren',
    date: new Date(2023, 9, 3),
    status: 'completed',
  },
  {
    id: 3063,
    productName: 'Landing Page Template',
    customerName: 'Jacob Jones',
    date: new Date(2023, 9, 23),
    status: 'cancelled',
  },
  {
    id: 3062,
    productName: 'Elementor PRO',
    customerName: 'Guy Hawkins',
    date: new Date(2023, 9, 17),
    status: 'completed',
  },
];

const useOrders = (initialOrders = dummyOrders) => {
  const [orders, setOrders] = useState(initialOrders);
  const [orderFilter, setOrderFilter] = useState('all');
  const [sort, setSort] = useState<{
    sortBy: keyof OrderHistory;
    sortOrder: 'asc' | 'desc';
  }>({ sortBy: 'id', sortOrder: 'asc' });

  const changeFilter = (val: string) => {
    setOrderFilter(val);
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
    const filterAndSortOrders = () => {
      let filteredOrders = initialOrders;

      if (orderFilter !== 'all') {
        filteredOrders = initialOrders.filter((order) => order.status === orderFilter);
      }

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

      setOrders(sortedOrders);
    };

    filterAndSortOrders();
  }, [orderFilter, initialOrders, sort]);

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
  };
};

export default useOrders;

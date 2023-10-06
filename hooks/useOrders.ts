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
  const [orderFilter, setOrderFilters] = useState('all');
  const [{ sortBy, sortOrder }, setSortObj] = useState<{
    sortBy: keyof OrderHistory;
    sortOrder: 'asc' | 'desc';
  }>({ sortBy: 'id', sortOrder: 'asc' });
  const changeFilter = (val: string) => {
    setOrderFilters(val);
  };

  useEffect(() => {
    const filterOrder = () => {
      let newOrder = initialOrders.filter((order) => order.status === orderFilter);

      setOrders(newOrder);
    };
    if (orderFilter !== 'all') {
      filterOrder();
    } else {
      setOrders(initialOrders);
    }
  }, [orderFilter, initialOrders]);
  //  Sort Logic
  const changeSortBy = (val: keyof OrderHistory) => {
    setSortObj({
      sortBy: val,
      sortOrder: 'asc',
    });
  };
  const toggleSortOrder = () => {
    if (sortOrder === 'asc') {
      setSortObj((prev) => ({ ...prev, sortOrder: 'desc' }));
    } else {
      setSortObj({ sortBy: 'id', sortOrder: 'desc' });
    }
  };

  useEffect(() => {
    const sortOrders = () => {
      const allKeys = Object.keys(initialOrders);
      const sortedOrders = [...initialOrders].sort((a, b) => {
        let aVal = a[sortBy];
        let bVal = b[sortBy];

        if (typeof aVal === 'number' && typeof bVal === 'number') {
          if (sortOrder === 'asc') {
            return aVal - bVal;
          } else {
            return bVal - aVal;
          }
        } else if (aVal instanceof Date && bVal instanceof Date) {
          if (sortOrder === 'asc') {
            return Date.parse(aVal.toUTCString()) - Date.parse(bVal.toUTCString());
          } else {
            return Date.parse(bVal.toUTCString()) - Date.parse(aVal.toUTCString());
          }
        } else if (typeof aVal === 'string' && typeof bVal === 'string') {
          if (sortOrder === 'asc') {
            return aVal.localeCompare(bVal);
          } else {
            return bVal.localeCompare(aVal);
          }
        } else {
          if (sortOrder === 'asc') {
            return 1;
          } else {
            return -1;
          }
        }
      });
      setOrders(sortedOrders);
    };
    if (sortBy.trim().length > 0) {
      sortOrders();
    } else {
      setOrders(initialOrders);
    }
  }, [sortBy, sortOrder, initialOrders]);
  return {
    orders,
    changeFilter,
    orderFilter,
    changeSortBy,
    toggleSortOrder,
    sortBy,
  };
};
export default useOrders;

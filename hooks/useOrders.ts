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
    status: 'completed',
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

  return {
    orders,
    changeFilter,
    orderFilter,
  };
};
export default useOrders;

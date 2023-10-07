import { useState, useEffect } from 'react';
import { PromotionHistory } from '../@types';

const dummyPromotions: PromotionHistory[] = [
  {
    productName: 'Programming Course',
    type: 'Coupon Code',
    status: 'active',
    discount: '15%',
    quantity: 12,
    sales: 102,
  },
  {
    productName: 'Learning Design 101',
    type: 'Discount',
    status: 'active',
    discount: '15%',
    quantity: 10,
    sales: 98,
  },
  {
    productName: 'Learning Design 101',
    type: 'Discount',
    status: 'expired',
    discount: '₦5000',
    quantity: 10,
    sales: 98,
  },
  {
    productName: 'Learning Design 101',
    type: 'Discount',
    status: 'active',
    discount: '₦5000',
    quantity: 10,
    sales: 98,
  },
  {
    productName: 'Learning Design 101',
    type: 'Coupon Code',
    status: 'expired',
    discount: '15%',
    quantity: 10,
    sales: 98,
  },
  {
    productName: 'Learning Design 101',
    type: 'Discount',
    status: 'deactivated',
    discount: '₦5000',
    quantity: 10,
    sales: 98,
  },
  {
    productName: 'Learning Design 101',
    type: 'Coupon Code',
    status: 'active',
    discount: '15%',
    quantity: 10,
    sales: 98,
  },
  {
    productName: 'Learning Design 101',
    type: 'Coupon Code',
    status: 'active',
    discount: '15%',
    quantity: 10,
    sales: 98,
  },
  {
    productName: 'HNGx year book',
    type: 'Coupon Code',
    status: 'expired',
    discount: '₦5000',
    quantity: 10,
    sales: 128,
  },
  {
    productName: 'Favorite Mentor 2023',
    type: 'Coupon Code',
    status: 'active',
    discount: '₦5000',
    quantity: 10,
    sales: 128,
  },
];

const usePromotions = (initialPromotions = dummyPromotions) => {
  const [promotions, setPromotions] = useState(initialPromotions);
  const [promotionFilter, setPromotionFilters] = useState('all');
  const [{ sortBy, sortOrder }, setSortObj] = useState<{
    sortBy: keyof PromotionHistory;
    sortOrder: 'asc' | 'desc';
  }>({ sortBy: 'type', sortOrder: 'asc' });
  const changeFilter = (val: string) => {
    setPromotionFilters(val);
  };

  useEffect(() => {
    const filterOrder = () => {
      let newOrder = initialPromotions.filter((order) => order.status === promotionFilter);

      setPromotions(newOrder);
    };
    if (promotionFilter !== 'all') {
      filterOrder();
    } else {
      setPromotions(initialPromotions);
    }
  }, [promotionFilter, initialPromotions]);
  //  Sort Logic
  const changeSortBy = (val: keyof PromotionHistory) => {
    setSortObj({
      sortBy: val,
      sortOrder: 'asc',
    });
  };
  const toggleSortOrder = () => {
    if (sortOrder === 'asc') {
      setSortObj((prev) => ({ ...prev, sortOrder: 'desc' }));
    } else {
      setSortObj({ sortBy: 'type', sortOrder: 'asc' });
    }
  };

  useEffect(() => {
    const sortOrders = () => {
      const allKeys = Object.keys(initialPromotions);
      const sortedOrders = [...initialPromotions].sort((a, b) => {
        let valueA = a[sortBy];
        let valueB = b[sortBy];

        if (typeof valueA === 'number' && typeof valueB === 'number') {
          if (sortOrder === 'asc') {
            return valueA - valueB;
          } else {
            return valueB - valueA;
          }
        } else if (typeof valueA === 'string' && typeof valueB === 'string') {
          if (sortOrder === 'asc') {
            return valueA.localeCompare(valueB);
          } else {
            return valueB.localeCompare(valueA);
          }
        } else {
          if (sortOrder === 'asc') {
            return 1;
          } else {
            return -1;
          }
        }
      });
      setPromotions(sortedOrders);
    };
    if (sortBy.trim().length > 0) {
      sortOrders();
    } else {
      setPromotions(initialPromotions);
    }
  }, [sortBy, sortOrder, initialPromotions]);
  return {
    promotions,
    changeFilter,
    promotionFilter,
    changeSortBy,
    toggleSortOrder,
    sortBy,
  };
};
export default usePromotions;

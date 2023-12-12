import { useState, useEffect } from 'react';
import { PromotionHistory } from '../@types';
import axios from 'axios';
import { SHOP_API_URL } from '../http/checkout';

// const dummyPromotions: PromotionHistory[] = [
//   {
//     productName: 'Programming Course',
//     type: 'Coupon Code',
//     status: 'active',
//     discount: '15%',
//     quantity: 12,
//     sales: 102,
//   },
//   {
//     productName: 'Learning Design 101',
//     type: 'Discount',
//     status: 'active',
//     discount: '15%',
//     quantity: 10,
//     sales: 98,
//   },
//   {
//     productName: 'Learning Design 101',
//     type: 'Discount',
//     status: 'expired',
//     discount: '₦5000',
//     quantity: 10,
//     sales: 98,
//   },
//   {
//     productName: 'Learning Design 101',
//     type: 'Discount',
//     status: 'active',
//     discount: '₦5000',
//     quantity: 10,
//     sales: 98,
//   },
//   {
//     productName: 'Learning Design 101',
//     type: 'Coupon Code',
//     status: 'expired',
//     discount: '15%',
//     quantity: 10,
//     sales: 98,
//   },
//   {
//     productName: 'Learning Design 101',
//     type: 'Discount',
//     status: 'deactivated',
//     discount: '₦5000',
//     quantity: 10,
//     sales: 98,
//   },
//   {
//     productName: 'Learning Design 101',
//     type: 'Coupon Code',
//     status: 'active',
//     discount: '15%',
//     quantity: 10,
//     sales: 98,
//   },
//   {
//     productName: 'Learning Design 101',
//     type: 'Coupon Code',
//     status: 'active',
//     discount: '15%',
//     quantity: 10,
//     sales: 98,
//   },
//   {
//     productName: 'HNGx year book',
//     type: 'Coupon Code',
//     status: 'expired',
//     discount: '₦5000',
//     quantity: 10,
//     sales: 128,
//   },
//   {
//     productName: 'Favorite Mentor 2023',
//     type: 'Coupon Code',
//     status: 'active',
//     discount: '₦5000',
//     quantity: 10,
//     sales: 128,
//   },
// ];

const usePromotions = () => {
  const [promotions, setPromotions] = useState<PromotionHistory[]>([]);
  const [promotionFilter, setPromotionFilters] = useState('all');
  const [{ sortBy, sortOrder }, setSortObj] = useState<{
    sortBy: keyof PromotionHistory;
    sortOrder: 'asc' | 'desc';
  }>({ sortBy: 'type', sortOrder: 'asc' });
  const [isLoading, setIsLoading] = useState(true);
  const changeFilter = (val: string) => {
    setPromotionFilters(val);
  };
  const getPromo = async () => {
    const { data } = await axios.get(
      `${SHOP_API_URL}/discount/promotions`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('zpt')}`,
        },
      },
    );
    return data.data;
    //  .catch((error) => {
    //    console.error('Error fetching data: ', error);
    //    setIsLoading(false);
    //  });
  };

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

  const sortPromotion = (promotions: any[]) => {
    const sortedOrders = [...promotions].sort((a, b) => {
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
    return sortedOrders;
  };
  useEffect(() => {
    if (sortBy.trim().length > 0) {
      const sortedPromotion = sortPromotion(promotions);
      setPromotions(sortedPromotion);
    }
  }, [sortBy, sortOrder]);
  const getPromotions = async () => {
    try {
      setIsLoading(true);
      const promotion = await getPromo();
      console.log(promotion);
      setPromotions(promotion || []);
    } catch (error) {
      setPromotions([]);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getPromotions();
  }, [promotionFilter]);
  return {
    promotions,
    changeFilter,
    promotionFilter,
    changeSortBy,
    toggleSortOrder,
    sortBy,
    getPromotions,
    isLoading,
  };
};
export default usePromotions;

// usePendingProducts.ts
import { useEffect, useState } from 'react';
import axios from 'axios';

interface PendingProductsData {
  total_pending_products: number;
}

export const usePendingProducts = () => {
  const [pendingData, setPendingData] = useState<PendingProductsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('zpt');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json; charset=UTF-8',
          },
        };

        const response = await axios.get(
          'https://spitfire-superadmin-1.onrender.com/api/admin/product/pending/all',
          config,
        );
        setPendingData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching pending products:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { pendingData, isLoading };
};

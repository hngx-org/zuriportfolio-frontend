import axios from 'axios';
import { notify } from '@ui/Toast';

const fetchErrorToast = (data: string) => notify({ type: 'error', message: `Error fetching ${data}`, theme: 'light' });

const baseURL = 'https://zuriportfolio-shop-internal-api.onrender.com/api';

const axiosDashboardInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// card.tsx
// today
export const fetchTodaysRevenue = async () => {
  try {
    const res: any = await axiosDashboardInstance.get(`/revenues?timeframe=today`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('zpt')}`,
      },
    });
    const todaysRevenue = res?.data?.data?.data;
    return todaysRevenue;
  } catch (error) {
    // fetchErrorToast("today's revenue");
    // console.error('Error fetching revenues:', error);
    throw error;
  }
};

export const fetchTodaysOrders = async () => {
  try {
    const res: any = await axiosDashboardInstance.get(`/orders?timeframe=today`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('zpt')}`,
      },
    });
    const orderCount: number = res?.data?.data?.orderCount;
    return orderCount;
  } catch (error) {
    // fetchErrorToast("today's orders");
    // console.error('Error fetching todays orders:', error);
    throw error;
  }
};

export const fetchTodaysAverageOrderValue = async () => {
  try {
    const res: any = await axiosDashboardInstance.get(`/orders/average?timeframe=today`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('zpt')}`,
      },
    });
    const todaysAverageOrderValue = res?.data?.data?.averageOrderValue;
    if (!todaysAverageOrderValue) {
      return 0;
    }
    return todaysAverageOrderValue;
  } catch (error) {
    // fetchErrorToast('todays average order value');
    // console.error('Error fetching order/average:', error);
    throw error;
  }
};

//  yesterday

export const fetchYesterdaysRevenue = async () => {
  try {
    const res: any = await axiosDashboardInstance.get(`/revenues?timeframe=yesterday`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('zpt')}`,
      },
    });
    const yesterdaysRevenue = res?.data?.data?.data;
    return yesterdaysRevenue;
  } catch (error) {
    // fetchErrorToast("yesterday's revenue");
    // console.error('Error fetching yesterdays revenues:', error);
    throw error;
  }
};

export const fetchYesterdaysOrders = async () => {
  try {
    const res: any = await axiosDashboardInstance.get(`/orders?timeframe=yesterday`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('zpt')}`,
      },
    });
    const orderCount: number = res?.data?.data?.orderCount;
    return orderCount;
  } catch (error) {
    // fetchErrorToast("yesterday's orders");
    // console.error('Error fetching Yesterdays orders:', error);
    throw error;
  }
};

export const fetchYesterdaysAverageOrderValue = async () => {
  try {
    const res: any = await axiosDashboardInstance.get(`/orders/average?timeframe=yesterday`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('zpt')}`,
      },
    });
    const yesterdaysAverageOrderValue = res?.data?.data?.averageSales;
    if (!yesterdaysAverageOrderValue) {
      return 0;
    }
    return yesterdaysAverageOrderValue;
  } catch (error) {
    // fetchErrorToast('yesterdays average order value');
    // console.error('Error fetching order/average:', error);
    throw error;
  }
};

// charts.tsx

export const fetchSalesReports = async () => {
  try {
    const res: any = await axiosDashboardInstance.get(`/sales/reports?timeframe=12m,3m,1yr,7d,24hr`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('zpt')}`,
      },
    });
    const salesReport = res?.data?.data;
    console.log(salesReport);
    return salesReport;
  } catch (error) {
    // fetchErrorToast('sales reports');
    // console.error('Error fetching reports:', error);
    throw error;
  }
};

export const fetchStoreTraffic = async () => {
  try {
    const res: any = await axiosDashboardInstance.get(`/shop/store-traffic`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('zpt')}`,
      },
    });
    console.log(res);
    return res.data;
  } catch (error) {
    // fetchErrorToast('store traffic');
    // console.error('Error fetching store-traffic:', error);
    throw error;
  }
};

// activity.tsx

export const fetchActivity = async () => {
  try {
    const res: any = await axiosDashboardInstance.get(`/activities`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('zpt')}`,
      },
    });
    console.log(res);
    return res.data;
  } catch (error) {
    // fetchErrorToast('activity');
    // console.error('Error fetching activity:', error);
    throw error;
  }
};

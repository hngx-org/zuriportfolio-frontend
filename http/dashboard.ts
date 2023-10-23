import axios from 'axios';
import { logQueryResult } from '../helpers/dashboard';

const shop_id = '6d022186-7c7f-4439-af0c-8209202ef4a6';

const baseURL = 'https://zuriportfolio-shop-internal-api.onrender.com/api/v1';

const axiosDashboardInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// revenue

export const fetchTodaysRevenue = async () => {
  try {
    const res: any = await axiosDashboardInstance.get(`/revenues?timeframe=today`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('zpt')}`,
      },
    });
    const todaysRevenue = res?.data?.data?.revenue;
    // logQueryResult('todays revenue', todaysRevenue);
    return todaysRevenue;
  } catch (error) {
    throw error;
  }
};

export const fetchYesterdaysRevenue = async () => {
  try {
    const res: any = await axiosDashboardInstance.get(`/revenues?timeframe=yesterday`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('zpt')}`,
      },
    });
    const yesterdaysRevenue = res?.data?.data?.revenue;
    // logQueryResult('yesterdays revenue', yesterdaysRevenue);
    return yesterdaysRevenue;
  } catch (error) {
    throw error;
  }
};

// orders

export const fetchTodaysOrders = async () => {
  try {
    const res: any = await axiosDashboardInstance.get(`/orders?timeframe=today`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('zpt')}`,
      },
    });
    const orderCount: number = res?.data?.data?.orderCount;
    // logQueryResult('todays orders', orderCount);
    return orderCount;
  } catch (error) {
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
    // logQueryResult('yesterdays orders', orderCount);
    return orderCount;
  } catch (error) {
    throw error;
  }
};

// average value

export const fetchTodaysAverageOrderValue = async () => {
  try {
    const res: any = await axiosDashboardInstance.get(`/orders/average?timeframe=today`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('zpt')}`,
      },
    });
    const todaysAverageOrderValue = res?.data?.data?.averageOrderValue;
    return todaysAverageOrderValue;
  } catch (error) {
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
    const yesterdaysAverageOrderValue = res?.data?.data?.averageOrderValue;
    return yesterdaysAverageOrderValue;
  } catch (error) {
    throw error;
  }
};

// sales report

export const fetchSalesReports = async () => {
  try {
    const res: any = await axiosDashboardInstance.get(`/sales/reports/timeframe=12m`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('zpt')}`,
      },
    });
    const salesReport = res;
    logQueryResult('sales report', salesReport);
    return salesReport;
  } catch (error) {
    throw error;
  }
};

//  store traffic

export const fetch12MonthStoreTraffic = async () => {
  try {
    const token = localStorage.getItem('zpt');
    const res: any = await axiosDashboardInstance.get(`/shop/store-traffic/count/12months/${shop_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const storeTraffic = res?.data?.data;
    return storeTraffic;
  } catch (error) {
    throw error;
  }
};

export const fetch3MonthStoreTraffic = async () => {
  try {
    const token = localStorage.getItem('zpt');
    const res: any = await axiosDashboardInstance.get(`/shop/store-traffic/count/3months/${shop_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const storeTraffic = res?.data?.data;
    return storeTraffic;
  } catch (error) {
    throw error;
  }
};

export const fetch30DayStoreTraffic = async () => {
  try {
    const token = localStorage.getItem('zpt');
    const res: any = await axiosDashboardInstance.get(`/shop/store-traffic/count/30days/${shop_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const storeTraffic = res?.data?.data;
    return storeTraffic;
  } catch (error) {
    throw error;
  }
};

export const fetch7DayStoreTraffic = async () => {
  try {
    const token = localStorage.getItem('zpt');
    const res: any = await axiosDashboardInstance.get(`/shop/store-traffic/count/7days/${shop_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const storeTraffic = res?.data?.data;
    return storeTraffic;
  } catch (error) {
    throw error;
  }
};

export const fetch24HourStoreTraffic = async () => {
  try {
    const token = localStorage.getItem('zpt');
    const res: any = await axiosDashboardInstance.get(`/shop/store-traffic/count/24hrs/${shop_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const storeTraffic = res?.data?.data;
    return storeTraffic;
  } catch (error) {
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
    const activity = res?.data?.data;
    // logQueryResult('activity', activity);
    return activity;
  } catch (error) {
    throw error;
  }
};

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

export const fetchTodaysRevenue = async () => {
  try {
    const res: any = await axiosDashboardInstance.get(`/revenues?timeframe=today`, {});
    console.log(res);
    return res.data;
  } catch (error) {
    fetchErrorToast("today's revenue");
    console.error('Error fetching revenues:', error);
    throw error;
  }
};

export const fetchTodaysOrders = async () => {
  try {
    const res: any = await axiosDashboardInstance.get(`/order?timeframe=today`, {});
    console.log(res);
    return res.data;
  } catch (error) {
    fetchErrorToast("today's orders");
    console.error('Error fetching todays orders:', error);
    throw error;
  }
};

export const fetchAverageOrderValue = async () => {
  try {
    const res: any = await axiosDashboardInstance.get(`/order/average?timeframe=today`, {});
    console.log(res);
    return res.data;
  } catch (error) {
    fetchErrorToast('average order revenue value');
    console.error('Error fetching order/average:', error);
    throw error;
  }
};

export const fetchSalesReports = async () => {
  try {
    const res: any = await axiosDashboardInstance.get(`/reports?timeframe=12m,3m,1yr,7d,24hr`, {});
    console.log(res);
    return res.data;
  } catch (error) {
    fetchErrorToast('sales reports');
    console.error('Error fetching reports:', error);
    throw error;
  }
};

export const fetchStoreTraffic = async () => {
  try {
    const res: any = await axiosDashboardInstance.get(`/shop/store-traffic`, {});
    console.log(res);
    return res.data;
  } catch (error) {
    fetchErrorToast('store traffic');
    console.error('Error fetching store-traffic:', error);
    throw error;
  }
};

export const fetchActivity = async () => {
  try {
    const res: any = await axiosDashboardInstance.get(`/activities`, {});
    console.log(res);
    return res.data;
  } catch (error) {
    fetchErrorToast('activity');
    console.error('Error fetching activity:', error);
    throw error;
  }
};

// import { toast } from "@/hooks/use-toast"
import { axiosDashboardInstance } from './axios';

export const fetchTodaysRevenue = async () => {
  try {
    const res: any = await axiosDashboardInstance.get(`/revenues?timeframe=today`, {});
    console.log(res);
    return res.data;
  } catch (error) {
    // toast({
    //   description: "Error fetching revenues",
    //   variant: "destructive",
    // })
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
    // toast({
    //   description: "Error fetching todays orders",
    //   variant: "destructive",
    // })
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
    // toast({
    //   description: "Error fetching order/average",
    //   variant: "destructive",
    // })
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
    // toast({
    //   description: "Error fetching reports",
    //   variant: "destructive",
    // })
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
    // toast({
    //   description: "Error fetching store-traffic",
    //   variant: "destructive",
    // })
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
    // toast({
    //   description: "Error fetching activity",
    //   variant: "destructive",
    // })
    console.error('Error fetching activity:', error);
    throw error;
  }
};

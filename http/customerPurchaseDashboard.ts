import $http from './axios';

const baseURL = 'https://customer-purchase.onrender.com/api/orders';
let token: string | null;
if (typeof window !== 'undefined') {
  // Perform localStorage action
  token = localStorage.getItem('zpt');
}

export const getAllPurchases = async () => {
  try {
    const res = await $http.get(`${baseURL}/all-transactions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const PurchaseData = res?.data?.data;
    return PurchaseData;
  } catch (error) {
    return [];
  }
};

export const getSearchedData = async (searchParams: string) => {
  try {
    const res = await $http.get(`${baseURL}/search-transactions?search=${searchParams}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const searchedData = res?.data?.data;
    return searchedData;
  } catch (error) {
    return [];
  }
};

export const getDataByPrice = async (from: string, to: string) => {
  try {
    const response = await $http.get(`${baseURL}/filter-transactions?price=${from}-${to}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const filteredData = response?.data?.data;
    return filteredData;
  } catch (error) {
    return [];
  }
};

export const getDataByMonth = async (month: string) => {
  try {
    const response = await $http.get(`${baseURL}/filter-transactions?month=${month}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const filteredData = response?.data?.data;
    return filteredData;
  } catch (error) {
    return [];
  }
};

export const getDataByYear = async (year: string) => {
  try {
    const response = await $http.get(`${baseURL}/filter-transactions?year=${year}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const filteredData = response?.data?.data;
    return filteredData;
  } catch (error) {
    return [];
  }
};

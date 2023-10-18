import axios from 'axios';
import { ProductResult } from '../../@types';

const MARKETPLACE_URL = `https://coral-app-8bk8j.ondigitalocean.app/api/product-retrieval/`;
const axiosSearchInstance = axios.create({
  baseURL: MARKETPLACE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isAuthenticated = true;

if (typeof window === 'undefined') {
  axiosSearchInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response) {
        const { status } = error.response;

        if (typeof isAuthenticated !== 'undefined') {
          if (status === 401 || status === 403) {
            if (isAuthenticated) {
              isAuthenticated = false;
              window.location.href = '/auth/login';
            }
          }
        }
      }
      return Promise.reject(error);
    },
  );
}

export const searchProducts = async (searchValue: string) => {
  const response = await axiosSearchInstance.get(`?search=${searchValue}`);

  if (response.status !== 200) {
    throw new Error('Network response was not OK');
  }

  const products: ProductResult[] = response.data.data;
  const searchResults = products.filter((product) => product.name.toLowerCase().includes(searchValue.toLowerCase()));

  return searchResults;
};

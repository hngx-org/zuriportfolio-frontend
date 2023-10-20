import axios from 'axios';
import { ProductResult } from '../../@types';

const MARKETPLACE_URL = `https://coral-app-8bk8j.ondigitalocean.app/api/marketplace/product-retrieval/`;
const axiosSearchInstance = axios.create({
  baseURL: MARKETPLACE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const searchProducts = async (searchValue: string) => {
  const response = await axiosSearchInstance.get(`?search=${searchValue}`);

  if (response.status !== 200) {
    throw new Error('Network response was not OK');
  }

  const products: ProductResult[] = response.data.data;
  const searchResults = products.filter((product) => product.name.toLowerCase().includes(searchValue.toLowerCase()));

  return searchResults;
};

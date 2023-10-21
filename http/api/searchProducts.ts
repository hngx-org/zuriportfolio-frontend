import axios from 'axios';
import { API_URI } from '@modules/marketplace/http';
import { ProductResult } from '../../@types';

const MARKETPLACE_URL = `${API_URI}/product-retrieval/`;
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

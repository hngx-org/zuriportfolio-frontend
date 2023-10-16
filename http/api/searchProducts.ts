import axios from 'axios';
import { ProductResult } from '../../@types';

const MARKETPLACE_URL = `https://coral-app-8bk8j.ondigitalocean.app/api/product-retrieval/`;
const axiosSearchInstance = axios.create({
  baseURL: MARKETPLACE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const searchProducts = async (searchValue: string) => {
  try {
    const response = await axiosSearchInstance.get(`?search=${searchValue}`);

    if (response.status !== 200) {
      throw new Error('Network response was not ok');
    }

    const products: ProductResult[] = response.data;
    const searchResults = products.filter((product) => product.name.toLowerCase().includes(searchValue.toLowerCase()));

    return searchResults;
  } catch (error) {
    throw new Error(`Failed to fetch products: ${error}`);
  }
};

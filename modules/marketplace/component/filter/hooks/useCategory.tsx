import { ProductList } from '@modules/marketplace/types/filter-types';
import axios, { isAxiosError } from 'axios';
import { useEffect, useState } from 'react';

export type CategoryType = {
  name: string;
  subcategories: { name?: string }[];
};

const useCategory = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [products, setProducts] = useState<ProductList[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    getCategories();
  }, []);
  async function getCategories() {
    try {
      const { data } = await axios.get<{ categories: CategoryType[] }>(
        'https://coral-app-8bk8j.ondigitalocean.app/api/category-name/',
      );
      setCategories(data.categories ? data.categories : []);
      await getProducts();
    } catch (error) {
      if (error instanceof isAxiosError) {
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  }

  async function getProducts() {
    const { data } = await axios.get<ProductList[]>('https://coral-app-8bk8j.ondigitalocean.app/api/product-list/');
    setProducts(data);
  }

  return { categories, loading, products };
};

export default useCategory;

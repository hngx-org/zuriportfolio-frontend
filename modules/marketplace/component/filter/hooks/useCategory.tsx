import http from '@modules/marketplace/http';
import { ProductList } from '@modules/marketplace/types/filter-types';
import { isAxiosError } from 'axios';
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
      const { data } = await http.get<{ data: CategoryType[] }>('/category-name/');

      setCategories(data.data ? data.data : []);
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
    const { data } = await http.get<{ data: ProductList[] }>('product-list/');
    setProducts(data.data);
  }

  return { categories, loading, products };
};

export default useCategory;

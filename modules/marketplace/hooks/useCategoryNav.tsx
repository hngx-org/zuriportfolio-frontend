import axios, { isAxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { CategoryType } from '../component/filter/hooks/useCategory';
import http from '../http';

const useCategoryNav = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    getCategories();
  }, []);
  async function getCategories() {
    try {
      const { data } = await http.get<{ data: CategoryType[] }>('/category-name/');
      setCategories(data.data ? data.data : []);
    } catch (error) {
      if (error instanceof isAxiosError) {
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  }

  return { categories, loading };
};

export default useCategoryNav;

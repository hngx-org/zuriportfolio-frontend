import http from '@modules/marketplace/http';
import { ProductList } from '@modules/marketplace/types/filter-types';
import { useQuery } from '@tanstack/react-query';

export type CategoryType = {
  name: string;
  subcategories: { name?: string }[];
};

const useCategory = () => {
  const {
    isLoading: category_loading,
    error: category_error,
    data: category_data,
  } = useQuery({
    queryKey: ['categoryNameData'],
    queryFn: async () => await http.get<{ data: CategoryType[] }>('/category-name'),
  });

  const {
    isLoading: product_loading,
    error: product_error,
    data: product_data,
  } = useQuery({
    queryKey: ['productListData'],
    queryFn: async () => await http.get<{ data: ProductList[] }>('/product-list'),
  });

  return {
    categories: category_data?.data.data || [],
    products: product_data?.data.data || [],
    p_loading: product_loading,
    c_loading: category_loading,
    p_error: product_error,
    c_error: category_error
  };
};

export default useCategory;

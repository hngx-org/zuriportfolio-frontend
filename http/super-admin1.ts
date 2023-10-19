import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

//super-admin(spit-fire)
const makeRequest = async (apiUrl: string, method = 'get', data = null, config = {}) => {
  try {
    const token = localStorage.getItem('zpt');
    const requestConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json; charset=UTF-8',
      },
      method,
      url: `https://spitfire-superadmin-1.onrender.com/api/admin/${apiUrl}`,
      data,
      ...config,
    };
    const response = await axios(requestConfig);

    return response?.data;
  } catch (error) {
    return error;
  }
};

// products
export const useGetProdDetails = (id: string) => {
  return useQuery(['get-prod', id], async () => {
    return makeRequest(`product/${id}`, 'get');
  });
};

export const useRemoveSanction = () => {
  const removeSanctionMutation = useMutation((id: string) => {
    return makeRequest(`product/approve_product/${id}`, 'patch');
  });

  return {
    removeSanction: removeSanctionMutation.mutate,
    isLoading: removeSanctionMutation.isLoading,
  };
};

export const useDeleteProd = () => {
  const deleteSanctionedProd = useMutation((id: string) => {
    return makeRequest(`product/delete_product/${id}`, 'delete');
  });

  return {
    deleteSanction: deleteSanctionedProd.mutate,
    isLoading: deleteSanctionedProd.isLoading,
  };
};

export const useTempDeleteProd = () => {
  const tempDeleteProd = useMutation((id: string) => {
    return makeRequest(`product/delete_product/${id}`, 'patch');
  });

  return {
    deleteSanction: tempDeleteProd.mutate,
    isLoading: tempDeleteProd.isLoading,
  };
};

export const useRestore = () => {
  const restoreDeletedProd = useMutation((id: string) => {
    return makeRequest(`product/restore_product/${id}`, 'patch');
  });

  return {
    restoreProd: restoreDeletedProd.mutate,
    isLoading: restoreDeletedProd.isLoading,
  };
};

export const useGetProd = (page: number, search: string, status?: string) => {
  return useQuery(['get-prod'], async () => {
    return makeRequest(
      `product/all?page=${page}${search ? `&search=${search}` : ''}${status ? `&status=${status}` : ''}`,
      'get',
    );
  });
};

export const useSanction = () => {
  const sanction = useMutation((id: string) => {
    return makeRequest(`product/sanction/${id}`, 'patch');
  });

  return {
    santionProd: sanction.mutate,
    isLoading: sanction.isLoading,
  };
};

//vendors
export const useGetAllVendor = (page: number, search: string, status?: string) => {
  return useQuery(['get-vendor', page, search, status], async () => {
    return makeRequest(
      `shop/all?page=${page}${search ? `&search=${search}` : ''}${status ? `&status=${status}` : ''}`,
      'get',
    );
  });
};

export const useGetShop = (id: string) => {
  return useQuery(['get-vendor', id], async () => {
    return makeRequest(`shop/${id}`, 'get');
  });
};

export const useRemoveBan = () => {
  const removeBan = useMutation((id: string) => {
    return makeRequest(`shop/unban_vendor/${id}`, 'put');
  });

  return {
    removeBan: removeBan.mutate,
    isLoading: removeBan.isLoading,
  };
};

export const useBanShop = () => {
  const banShop = useMutation((id: string) => {
    return makeRequest(`shop/ban_vendor/${id}`, 'put');
  });

  return {
    banShop: banShop.mutate,
    isLoading: banShop.isLoading,
  };
};

export const useRestoreShop = () => {
  const restoreShop = useMutation((id: string) => {
    return makeRequest(`shop/restore_shop/${id}`, 'patch');
  });

  return {
    restoreShop: restoreShop.mutate,
    isLoading: restoreShop.isLoading,
  };
};

export const useTempDeleteShop = () => {
  const tempDeleteShop = useMutation((id: string) => {
    return makeRequest(`shop/delete_shop/${id}`, 'patch');
  });

  return {
    tempDeleteShop: tempDeleteShop.mutate,
    isLoading: tempDeleteShop.isLoading,
  };
};

export const useDeleteShop = () => {
  const deleteShop = useMutation((id: string) => {
    return makeRequest(`shop/delete_shop/${id}`, 'delete');
  });

  return {
    deleteShop: deleteShop.mutate,
    isLoading: deleteShop.isLoading,
  };
};

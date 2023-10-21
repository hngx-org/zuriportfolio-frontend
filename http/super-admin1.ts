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
      url: `https://spitfire-superadmin-1.onrender.com/api/v1/admin/${apiUrl}`,
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
export const useGetProd = (page: number, search: string, status?: string) => {
  return useQuery(['get-prod', page, search, status], async () => {
    return makeRequest(
      `products/all?page=${page}${search ? `&search=${search}` : ''}${status ? `&status=${status}` : ''}`,
      'get',
    );
  });
};

export const useGetPending = (page: number, search: string) => {
  const pendingData = useQuery(['get-pending', page, search], async () => {
    return makeRequest(`products/pending/all?page=${page}${search ? `&search=${search}` : ''}`, 'get');
  });
  return {
    pendData: pendingData.data,
    pendLoading: pendingData.isLoading,
  };
};

export const useGetProdDetails = (id: string) => {
  return useQuery(['get-prod', id], async () => {
    return makeRequest(`products/${id}`, 'get');
  });
};

export const useSanction = () => {
  const sanction = useMutation((id: string) => {
    return makeRequest(`product/${id}/sanction`, 'patch');
  });

  return {
    santionProd: sanction.mutate,
    isLoading: sanction.isLoading,
  };
};

export const useTempDeleteProd = () => {
  const tempDeleteProd = useMutation((id: string) => {
    return makeRequest(`products/${id}/soft-delete`, 'delete');
  });

  return {
    deleteSanction: tempDeleteProd.mutate,
    isLoading: tempDeleteProd.isLoading,
  };
};

export const useRemoveSanction = () => {
  const removeSanctionMutation = useMutation((id: string) => {
    return makeRequest(`products/${id}/approve`, 'patch');
  });

  return {
    removeSanction: removeSanctionMutation.mutate,
    isLoading: removeSanctionMutation.isLoading,
  };
};

export const useRestore = () => {
  const restoreDeletedProd = useMutation((id: string) => {
    return makeRequest(`products/${id}/restore`, 'patch');
  });

  return {
    restoreProd: restoreDeletedProd.mutate,
    isLoading: restoreDeletedProd.isLoading,
  };
};

export const useDeleteProd = () => {
  const deleteSanctionedProd = useMutation((id: string) => {
    return makeRequest(`products/${id}`, 'delete');
  });

  return {
    deleteSanction: deleteSanctionedProd.mutate,
    isLoading: deleteSanctionedProd.isLoading,
  };
};

// export const useGetFilterPro = (filter?: string) => {
//   return useQuery(['get-filter-prod', filter], async () => {
//     return makeRequest(
//       `products/all/page=${page}${search ? `&search=${search}` : ''}${status ? `&status=${status}` : ''}`,
//       'get',
//     );
//   });
// };

//vendors
export const useGetAllVendor = (page: number, search: string, status?: string) => {
  return useQuery(['get-vendor', page, search, status], async () => {
    return makeRequest(
      `shops/all?page=${page}${search ? `&search=${search}` : ''}${status ? `&status=${status}` : ''}`,
      'get',
    );
  });
};

export const useGetShop = (id: string) => {
  return useQuery(['get-vendor', id], async () => {
    return makeRequest(`shops/${id}`, 'get');
  });
};

export const useRemoveBan = () => {
  const removeBan = useMutation((id: string) => {
    return makeRequest(`shops/${id}/unban`, 'put');
  });

  return {
    removeBan: removeBan.mutate,
    isLoading: removeBan.isLoading,
  };
};

export const useBanShop = () => {
  const banShop = useMutation((id: string) => {
    return makeRequest(`shops/${id}/ban`, 'put');
  });

  return {
    banShop: banShop.mutate,
    isLoading: banShop.isLoading,
  };
};

export const useRestoreShop = () => {
  const restoreShop = useMutation((id: string) => {
    return makeRequest(`shops/${id}/restore`, 'patch');
  });

  return {
    restoreShop: restoreShop.mutate,
    isLoading: restoreShop.isLoading,
  };
};

export const useTempDeleteShop = () => {
  const tempDeleteShop = useMutation((id: string) => {
    return makeRequest(`shops/${id}/soft-delete`, 'patch');
  });

  return {
    tempDeleteShop: tempDeleteShop.mutate,
    isLoading: tempDeleteShop.isLoading,
  };
};

export const useDeleteShop = () => {
  const deleteShop = useMutation((id: string) => {
    return makeRequest(`shops/${id}`, 'delete');
  });

  return {
    deleteShop: deleteShop.mutate,
    isLoading: deleteShop.isLoading,
  };
};
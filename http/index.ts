import axios from 'axios';
import $http from './axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { RecentlyViewedProductProp } from '../@types';

const AUTH_HTTP_URL = 'https://auth.akuya.tech';

export const getUserByName = async (props: { name: string }) => {
  try {
    const res = await $http.get(`/user/${props?.name}`);
    return res?.data;
  } catch (e: any) {
    console.log(e);
    return e.response.data ?? { message: e.message };
  }
};
export const loginUser = async (props: { email: string; password: string }) => {
  const $http = axios.create({
    baseURL: AUTH_HTTP_URL,
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  try {
    const res = await $http.post('/api/auth/login', props);
    console.log(res?.data);
    return res?.data;
  } catch (e: any) {
    console.log(e);
    return e.response.data ?? { message: e.message };
  }
};

export const getUserCart = async (token: string) => {
  try {
    const response = await $http.get('https://zuri-cart-checkout.onrender.com/api/checkout/api/carts', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return [];
  }
};

export const removeFromCart = async (productId: string, token: string) => {
  try {
    const apiUrl = `https://zuri-cart-checkout.onrender.com/api/checkout/api/carts/${productId}`;
    const response = await $http.delete(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error making payment:', error);
    throw error;
  }
};

// 'https://coral-app-8bk8j.ondigitalocean.app/api/recently-viewed/fecfd17b-51a3-4288-9bd0-77ac4b7d60a0/'

export const getRecentlyViewedProducts = async (user_id: string, token: string) => {
  try {
    const apiUrl = `https://coral-app-8bk8j.ondigitalocean.app/api/recently-viewed/${user_id}`;
    const response = await $http.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data', error);
    return [];
  }
};

export const signUpUserWithEmail = async (props: { email: string }) => {
  try {
    const res = await $http.post('https://auth.akuya.tech/api/auth/check-email', props);
    console.log(res?.data);
    return res?.data;
  } catch (e: any) {
    const errorData = e.response.data;
    console.log('Error in catch', errorData);
    // throw new Error(errorData);
    return e.response.data ?? { message: e.message };
  }
};

export const resetPassword = async (props: { token: string | string[] | undefined; password: string }) => {
  try {
    const response = await axios.patch('https://auth.akuya.tech/api/auth/reset-password', props);
    console.log(response);
    return response?.data;
  } catch (e: any) {
    console.log(e);
    throw new Error(e);
  }
};

export const signUpUser = async (props: { firstName: string; lastName: string; email: string; password: string }) => {
  try {
    const res = await $http.post('https://auth.akuya.tech/api/auth/signup', props);
    console.log(res?.data);
    return res?.data;
  } catch (e: any) {
    console.log(e);
    throw new Error(e);
    // return e.response.data ?? { message: e.message };
  }
};

// export const loginUser = async () => {
//   const $http = axios.create({
//     baseURL: 'https://reqres.in/',
//     timeout: 30000,
//     headers: {
//       'Content-Type': 'application/json; charset=UTF-8',
//       // 'Access-Control-Allow-Origin': '*',
//     },
//     // withCredentials: true,
//   });

//   try {
//     const res = await $http.get('/api/users?page=2');
//     return res?.data;
//   } catch (e: any) {
//     console.log(e);
//     return e.response.data ?? { message: e.message };
//   }
// }
// https://zuriportfolio-frontend-pw1h.vercel.app/marketplace/cart

export const makePayment = async (selectedPaymentMethod: string) => {
  if (selectedPaymentMethod) {
    try {
      const apiUrl = 'https://zuri-cart-checkout.onrender.com/api/checkout/api/orders';
      const data = {
        redirect_url: 'https://zuriportfolio-frontend-pw1h.vercel.app/marketplace/cart',
        payment_method: selectedPaymentMethod,
      };

      const response = await $http.post(apiUrl, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZlN2EyZWVhLWI3MDgtNGQ5NS1hYjFhLTgxYjhjY2FkZmNiZCIsImlhdCI6MTY5NzEyMjA4NX0.e4fKa18WW2wL0lbUfJkvp2Jk9KP2YadUdAMx1VDGaZU`,
        },
      });

      console.log('API Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error making payment:', error);
      throw error;
    }
  } else {
    throw new Error('Please select a payment method before making the payment.');
  }
};

// export const verfiy2FA = async (props: { email: string; token: string }) => {
//   const $http = axios.create({
//     baseURL: "https://auth.akuya.tech",
//     timeout: 30000,
//     headers: {
//       'Content-Type': 'application/json; charset=UTF-8',
//     },
//   });

//   try {
//     const res = await $http.post('/api/auth/2fa/verify-code', props);
//     return res;
//   } catch (e: any) {
//     console.log(e)
//   return e;
//   }
// };

export const getAllProducts = async (token: string) => {
  const $http = axios.create({
    baseURL: 'https://spitfire-superadmin-1.onrender.com/',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: `Bearer ${token}`,
    },
  });
  try {
    const resp = await $http.get('api/admin/product/all');
    console.log(resp?.data?.data);
    return resp?.data?.data;
  } catch (error) {
    console.log(error);
    toast.error('Error loading products');
  }
};

//super-admin1
const makeRequest = async (apiUrl: string, method = 'get', data = null, config = {}) => {
  try {
    const token = localStorage.getItem('authToken');
    const requestConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
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

export const useGetProdDetails = (id: string) => {
  return useQuery(['get-sanctioned-prod-details', id], async () => {
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

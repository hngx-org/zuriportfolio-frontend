import axios from 'axios';
import $http from './axios';
import { useMutation, useQuery } from '@tanstack/react-query';

const AUTH_HTTP_URL = 'https://auth.akuya.tech';
import { toast } from 'react-toastify';

import { AxiosResponse } from 'axios';

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

export const verfiy2FA = async (props: { email: string; token: string }) => {
  const $http = axios.create({
    baseURL: 'https://auth.akuya.tech',
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  });

  try {
    const res = await $http.post('/api/auth/2fa/verify-code', props);
    return res;
  } catch (e: any) {
    console.log(e);
    return e;
  }
};

// remove from wishlist

export const removeFromWishlist = async (userId: any, productId: any, token: any): Promise<AxiosResponse> => {
  try {
    const apiUrl = `https://coral-app-8bk8j.ondigitalocean.app/api/wishlist/delete/${userId}/${productId}`;
    const response = await axios.delete(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.error('Error deleting:', error);
    throw error;
  }
};

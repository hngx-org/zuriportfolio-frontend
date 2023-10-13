import axios from 'axios';
import $http from './axios';

// test
export const getUserByName = async (props: { name: string }) => {
  try {
    const res = await $http.get(`/user/${props?.name}`);
    return res?.data;
  } catch (e: any) {
    console.log(e);
    return e.response.data ?? { message: e.message };
  }
};

export const getUserCart = async () => {
  try {
    const response = await $http.get('https://zuri-cart-checkout.onrender.com/api/carts');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const removeFromCart = async (productId: string) => {
  try {
    const apiUrl = `https://zuri-cart-checkout.onrender.com/api/carts/${productId}`;
    const response = await $http.delete(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error making payment:', error);
    throw error;
  }
};

export const makePayment = async (selectedPaymentMethod: string) => {
  if (selectedPaymentMethod) {
    try {
      const apiUrl = 'https://zuri-cart-checkout.onrender.com/api/orders';
      const data = {
        redirect_url: 'https://zuriportfolio-frontend-pw1h.vercel.app/marketplace/cart',
        payment_method: selectedPaymentMethod,
      };

      const response = await $http.post(apiUrl, data, {
        headers: {
          'Content-Type': 'application/json',
          // accept: 'application/json',
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

export const getAllProducts = async () => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZiNzVkZDIyLTBhMTAtNGY0NC05Yjc1LWE3NDI1Nzg0NzFiMiIsImZpcnN0TmFtZSI6InNhcHBoaXJlQGdtYWlsLmNvbSIsImVtYWlsIjoic2FwcGhpcmVqdWRpdGhAZ21haWwuY29tIiwiaWF0IjoxNjk3MjA3OTQ2fQ.9cWy9mxCLtLZIfDzFoV0KOwwiHP36BcPYXs4P6YDIZA';
  const $http = axios.create({
    baseURL: 'https://spitfire-superadmin-1.onrender.com/',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: `Bearer ${token}`,
    },
  });
  try {
    const resp = await $http.get('api/product/all');
    console.log(resp?.data?.data);
    return resp?.data?.data;
  } catch (error) {
    console.log(error);
  }
};

import axios from 'axios';
import $http from './axios';

const AUTH_HTTP_URL = 'https://hng-stage-six.onrender.com/';

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
    console.log(e);
    throw new Error(e);
    // return e.response.data ?? { message: e.message };
  }
};

export const verfiy2FA = async (props: { email: string; token: string }) => {
  const $http = axios.create({
    baseURL: AUTH_HTTP_URL,
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  });

  try {
    const res = await $http.post('/api/auth/2fa/verify-code', props);
    console.log(res);
  } catch (e: any) {
    console.log(e);
    if (e?.response?.data && e?.response?.data?.message) {
      console.log(e?.response.data.message);
    }
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

export const makePayment = async (selectedPaymentMethod: string) => {
  if (selectedPaymentMethod) {
    // Payment method is selected, proceed with the payment
    try {
      const apiUrl = 'https://zuri-cart-checkout.onrender.com/api/orders';
      const data = {
        redirect_url: 'http://localhost:3000/marketplace/cart',
        payment_method: selectedPaymentMethod,
      };

      const response = await axios.post(apiUrl, data, {
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
      });

      // Handle the error response
      console.log('API Response:', response.data);
      return response.data; // You can return the response to handle it in your component
    } catch (error) {
      console.error('Error making payment:', error);
      throw error; // You can also throw an error if needed
    }
  } else {
    // No payment method selected, set an error message
    throw new Error('Please select a payment method before making the payment.');
  }
};

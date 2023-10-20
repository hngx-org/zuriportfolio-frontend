import { CartItemProps } from '../@types';
import { useAuth } from '../context/AuthContext';
import $http from './axios';
import axios from 'axios';

export const CART_ENDPOINT =
  process.env.NEXT_PUBLIC_CART_API_URL || 'https://zuri-cart-checkout.onrender.com/api/checkout_cart';
export const STAGING_URL = process.env.NEXT_PUBLIC_APP_STAGING_URL || 'https://staging.zuri.team';
export const RECENTLY_VIEWED_ENDPOINT =
  process.env.NEXT_PUBLIC_RECENTLY_VIEWED_ENDPOINT ||
  'https://coral-app-8bk8j.ondigitalocean.app/api/marketplace/recently-viewed';

export const addToCart = async (cartItems: string[], token: string) => {
  try {
    const response = await $http.post(
      `${CART_ENDPOINT}/carts`,
      { product_ids: cartItems },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (response.data.status == 201) {
      return { status: response.data.status, data: response.data.data };
    }
    return { status: 400 };
  } catch (error) {
    console.log(error);
    return { status: false, error: error };
  }
};

export const getUserCart = async (token: string) => {
  try {
    const response = await $http.get(`${CART_ENDPOINT}/carts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    return [];
  }
};

export const removeFromCart = async (productId: string, token: string) => {
  try {
    const apiUrl = `${CART_ENDPOINT}/carts/${productId}`;
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

export const createTempUser = async (datas: { email: string; firstName: string; lastName: string }) => {
  try {
    const apiUrl = 'https://staging.zuri.team/api/auth/api/auth/signup-guest';
    const response = await $http.post(apiUrl, datas);
    return response.data;
    // return { data: { token: guestToken } };
  } catch (error) {
    return { error: error, data: { token: '' } };
  }
};

export const getCartSummary = async (token: string) => {
  try {
    const apiUrl = `${CART_ENDPOINT}/carts/cart-summary`;

    const response = await $http.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (error) {
    console.error('Error making payment:', error);
    return {};
  }
};

export const getGuestCartSummary = async (products: any[]) => {
  try {
    const apiUrl = `${CART_ENDPOINT}/carts/guest-cart-summary`;

    const response = await $http.post(
      apiUrl,
      { product_ids: products },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data.data;
  } catch (error) {
    console.error('Error Fetching guestCart Summary:', error);
    return {};
  }
};

export const makePayment = async (selectedPaymentMethod: string, token: string) => {
  if (selectedPaymentMethod) {
    try {
      const apiUrl = `${CART_ENDPOINT}/orders`;
      const data = {
        redirect_url: `${STAGING_URL}/marketplace/success`,
        payment_method: selectedPaymentMethod,
      };

      const response = await $http.post(apiUrl, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error making payment:', error);
      return { status: false, data: null };
    }
  } else {
    throw new Error('Please select a payment method before making the payment.');
  }
};

const getTokenDetails = async (token: string) => {
  try {
    const response = await $http.post('https://staging.zuri.team/api/auth/api/authorize', { token });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getRecentlyViewedProducts = async (token: string) => {
  const user_res = await getTokenDetails(token);
  const user_id = user_res.user.id;

  try {
    const apiUrl = `${RECENTLY_VIEWED_ENDPOINT}/${user_id}`;
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching data', error);
    return [];
  }
};

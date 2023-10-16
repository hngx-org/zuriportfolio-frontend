import { CartItemProps } from '../@types';
import $http from './axios';

const CART_ENDPOINT = process.env.NEXT_PUBLIC_CART_API_URL || 'https://zuri-cart-checkout.onrender.com/api/checkout';
const STAGING_URL = process.env.NEXT_PUBLIC_APP_STAGING_URL || 'https://zuriportfolio-frontend-pw1h.vercel.app';
const RECENTLY_VIEWED_ENDPOINT =
  process.env.NEXT_PUBLIC_RECENTLY_VIEWED_ENDPOINT || 'https://coral-app-8bk8j.ondigitalocean.app/api/recently-viewed';
// Guest: 
// akuyaekorot+hng19@gmail.com
// b7590768-6af5-4ab1-a4a0-fb6d9738cbf0
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI3NTkwNzY4LTZhZjUtNGFiMS1hNGEwLWZiNmQ5NzM4Y2JmMCIsImlhdCI6MTY5NzQ0NjY1NH0.BGIinA0uWtPFlf0tu2J_i_oCLOwWCKSVA5kwRX2oMiQ
const guestToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI3NTkwNzY4LTZhZjUtNGFiMS1hNGEwLWZiNmQ5NzM4Y2JmMCIsImlhdCI6MTY5NzQ0NjY1NH0.BGIinA0uWtPFlf0tu2J_i_oCLOwWCKSVA5kwRX2oMiQ"

export const addToCart = async (cartItems: string[],token: string) => {
  try {
    const response = await $http.post(`${CART_ENDPOINT}/api/carts`,{product_ids: cartItems},{
      headers: {
        'Authorization': `Bearer ${token}`
      }});
    if (response.status == 200) {
      return {status: true}
    }
    return {status: false}
  } catch (error) {
    console.log(error);
    return {status: false,error: error} 
  }
}

export const getUserCart = async (token: string) => {
  try {
    const response = await $http.get(`${CART_ENDPOINT}/api/carts`, {
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
    const apiUrl = `${CART_ENDPOINT}/api/carts/${productId}`;
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



export const createTempUser = async (datas:{email:string,firstName:string,lastName:string}) => {
    try {
        const apiUrl = "https://staging.zuri.team/api/auth/api/auth/signup-guest";
        // const response = await $http.post(apiUrl,datas)
        // return response.data
        return {data:{token: guestToken}}
    } catch (error) {
        return {error: error,data:{token: ""}}
    }
}

export const getCartSummary = async (token:string) => {
    try {
    const apiUrl = `${CART_ENDPOINT}/api/carts/cart-summary`;

    const response = await $http.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
    } catch (error) {
    console.error('Error making payment:', error)
    return {}
    }
};

// sicoj92691@elixirsd.com
// myPassword2021

// {
//     "email": "akuyaekorot+hng6@gmail.com",
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE5NDE3MzIxLTk0OTQtNDQwNC05MjgyLWI3YjgyZDI4ZWQwZiIsImlhdCI6MTY5NzQ0MjY0N30.iWAHaXHssvsuG6Gb6MBOOZjtA8zvUhOfBwb9EqQamv0",
//     "password": "password_akuya"
// }

export const getGuestCartSummary = async (products:any[]) => {
    
    try {
    const apiUrl = "https://zuri-cart-checkout.onrender.com/api/checkout/api/carts/guest-cart-summary";

    const response = await $http.post(apiUrl,{product_ids: products}, {
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE3YjRiOThiLWFlMzMtNGQ0Yy1hNmUzLTQ4YzY5MGQ5NDUyMyIsImlhdCI6MTY5NzM3MDcxNH0.dBJSQ3zzSXiw55fqjLlWE6cmk1xmtpQxSSne9cZbOAg`
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error Fetching guestCart Summary:', error);
    return {};
  }
};

export const makePayment = async (selectedPaymentMethod: string, token: string) => {
  if (selectedPaymentMethod) {
    try {
      const apiUrl = `${CART_ENDPOINT}/api/orders`;
      const data = {
        redirect_url: `http://localhost:3000/marketplace/success`,
        payment_method: selectedPaymentMethod,
      };

      const response = await $http.post(apiUrl, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
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

export const getRecentlyViewedProducts = async (user_id: string, token: string) => {
  try {
    // user_id = '1972d345-44fb-4c9a-a9e3-d286df2510ae';
    const apiUrl = `${RECENTLY_VIEWED_ENDPOINT}/${user_id}`;
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

import axios from 'axios';
import $http from './axios';

// type LoginResponse = {
//   token: string;
//   data: {
//     id: string;
//     username: string;
//     first_name: string;
//     last_name: string;
//     email: string;
//     token: string;
//     section_order: unknown;
//     password: string;
//     provider: unknown;
//     profile_pic: unknown;
//     refresh_token: string;
//     role_id: number;
//     is_verified: boolean;
//     two_factor_auth: boolean;
//     location: unknown;
//     country: unknown;
//     created_at: string;
//     // message: string;
//   };
//   statusCode: number;
// };
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

export const resetPassword = async (props: { token: string | string[] | undefined; password: string }) => {
  try {
    const response = await axios.patch('https://9735-102-219-208-41.ngrok-free.app/api/auth/reset-password', props);
    console.log(response);
    return response?.data;
  } catch (e: any) {
    console.log(e);
    throw new Error(e);
  }
};

// export const loginUser = async (props: { email: string; password: string }) => {
//   const $http = axios.create({
//     baseURL: 'https://auth.akuya.tech/api/auth',
//     timeout: 30000,
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });

//   const res = await $http.post('/login', props);
//   // console.log("response", res.data);
//   if (res.data === 'User not found ') {
//     // throw new Error('not found');
//   }
//   return res?.data;
// };

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

import axios from 'axios';
import $http from './axios';

type LoginResponse = {
  token: string;
  data: {
    id: string;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    token: string;
    section_order: unknown;
    password: string;
    provider: unknown;
    profile_pic: unknown;
    refresh_token: string;
    role_id: number;
    is_verified: boolean;
    two_factor_auth: boolean;
    location: unknown;
    country: unknown;
    created_at: string;
    // message: string;
  };
  statusCode: number;
};

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

export const loginUser = async (props: { email: string; password: string }): Promise<LoginResponse> => {
  const $http = axios.create({
    baseURL: 'https://hng-stage-six.onrender.com/api/auth',
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  try {
    const res = await $http.post('/login', props);
    return res?.data;
  } catch (e: any) {
    console.log(e);
    return e.response.data ?? { message: e.message };
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

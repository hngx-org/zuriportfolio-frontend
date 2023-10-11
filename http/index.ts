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

export const loginUser = async (props: {email: string; password: string}) => {
  const $http = axios.create({
    baseURL: "https://auth.akuya.tech",
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    withCredentials: true,
  });

  try {
    const res = await $http.post('/api/auth/login', props);
    return res?.data;
  } catch (e: any) {
    console.log(e);
    return e.response.data ?? { message: e.message };
  }
}

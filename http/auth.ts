import axios from 'axios';

const AUTH_HTTP_URL = 'https://staging.zuri.team/api/auth/api/auth';

const $http = axios.create({
  baseURL: AUTH_HTTP_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
});

export const verfiy2FA = async (props: { email: string; code: string }) => {
  try {
    const res = await $http.post('/2fa/verify-code', props);
    return res;
  } catch (e: any) {
    return e.response.data ?? { message: e.message };
  }
};

export const resetPassword = async (props: { token: string | string[] | undefined; password: string }) => {
  try {
    const response = await axios.patch('/reset-password', props);
    console.log(response);
    return response?.data;
  } catch (e: any) {
    console.log(e);
    return e.response.data ?? { message: e.message };
  }
};

export const signUpUser = async (props: { firstName: string; lastName: string; email: string; password: string }) => {
  try {
    const res = await $http.post('/signup', props);
    console.log(res?.data);
    return res?.data;
  } catch (e: any) {
    console.log(e);
    return e.response.data ?? { message: e.message };
  }
};

export const loginUser = async (props: { email: string; password: string }) => {
  try {
    const res = await $http.post('/login', props);
    console.log(res?.data);
    return res?.data;
  } catch (e: any) {
    console.log(e);
    return e.response.data ?? { message: e.message };
  }
};

export const signUpUserWithEmail = async (props: { email: string }) => {
  try {
    const res = await $http.post('/check-email', props);
    console.log(res?.data);
    return res?.data;
  } catch (e: any) {
    const errorData = e.response.data;
    console.log('Error in catch', errorData);
    // throw new Error(errorData);
    return e.response.data ?? { message: e.message };
  }
};

export const checkEmail = async (props: { email: string }) => {
  try {
    const res = await $http.post('/check-email', props);
    console.log(res?.data);
    return res?.data;
  } catch (e: any) {
    const errorData = e.response.data;
    console.log('Error in catch', errorData);
    // throw new Error(errorData);
    return e.response.data ?? { message: e.message };
  }
};

export const verifyUser = async (props: { token: string }) => {
  try {
    const res = await $http.get(`/verify/${props.token}`);
    console.log(props.token);
    return res?.data;
  } catch (e: any) {
    console.log(e);
    return e.response.data ?? { message: e.message };
  }
};

export const resendVerification = async (props: { email: string }) => {
  try {
    const res = await $http.post('/resend-verification/', props);
    console.log(res?.data);
    return res?.data;
  } catch (e: any) {
    console.log(e);
    return e.response.data ?? { message: e.message };
  }
};

export const guestSignup = async (props: { email: string; firstName: string; lastName: string; password: string }) => {
  try {
    const res = await $http.post('/signup', props);
    console.log(res?.data);
    return res?.data;
  } catch (e: any) {
    console.log(e);
    return e.response.data ?? { message: e.message };
  }
};

export const forgetPassword = async (props: { email: string }) => {
  try {
    const res = await $http.post('/reset-password', props);
    console.log(res);
    return res?.data;
  } catch (e: any) {
    console.log(e);
    if (e?.response?.data && e?.response?.data?.message) {
      console.log(e?.response.data.message);
    }
    return e.response.data ?? { message: e.message };
  }
};

export const resendForgetPassword = async (props: { email: string }) => {
  try {
    const res = await $http.post('/reset-password', props);
    console.log(res);
    return res?.data;
  } catch (e: any) {
    console.log(e);
    if (e?.response?.data && e?.response?.data?.message) {
      console.log(e?.response.data.message);
    }
    return e.response.data ?? { message: e.message };
  }
};

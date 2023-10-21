import axios from 'axios';

const AUTH_HTTP_URL = 'https://staging.zuri.team/api/auth/api/auth';
const AUTH_HTTP_URL_2 = 'https://staging.zuri.team/api/auth/api';

const $http = axios.create({
  baseURL: AUTH_HTTP_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
});

const $http_2 = axios.create({
  baseURL: AUTH_HTTP_URL_2,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
});

export const verfiy2FA = async (props: { token: string; code: string }) => {
  try {
    const res = await $http.post('/2fa/verify-code', props);
    return res?.data;
  } catch (e: any) {
    return e.response.data ?? { message: e.message };
  }
};

export const resend2FACode = async (props: { email: string }) => {
  try {
    const res = await $http.post('/2fa/send-code', props);
    return res?.data;
  } catch (e: any) {
    return e.response.data ?? { message: e.message };
  }
};

export const enabled2FA = async (props: { token: string }) => {
  try {
    const res = await $http.post('/2fa/enable', props);
    return res?.data;
  } catch (e: any) {
    return e.response.data ?? { message: e.message };
  }
};

export const disable2FA = async (props: { token: string }) => {
  try {
    const res = await $http.post('/2fa/disable', props);
    return res?.data;
  } catch (e: any) {
    return e.response.data ?? { message: e.message };
  }
};

export const resetPassword = async (props: { token: string | string[] | undefined; password: string }) => {
  try {
    const response = await $http.patch('/reset-password', props);
    return response?.data;
  } catch (e: any) {
    return e.response.data ?? { message: e.message };
  }
};

export const signUpUser = async (props: { firstName: string; lastName: string; email: string; password: string }) => {
  try {
    const res = await $http.post('/signup', props);
    return res?.data;
  } catch (e: any) {
    throw e.response.data;
  }
};

export const loginUser = async (props: { email: string; password: string }) => {
  try {
    const res = await $http.post('/login', props);
    console.log("Login", res.data);
    return res?.data;
  } catch (e: any) {
    console.log("login error", e.response.data);
    throw e.response.data;
  }
};

export const signUpUserWithEmail = async (props: { email: string }) => {
  try {
    const res = await $http.post('/check-email', props);
    return res?.data;
  } catch (e: any) {
    throw e.response.data;
  }
};

export const checkEmail = async (props: { email: string }) => {
  try {
    const res = await $http.post('/check-email', props);
    return res?.data;
  } catch (e: any) {
    const errorData = e.response.data;
    // throw new Error(errorData);
    return e.response.data ?? { message: e.message };
  }
};

export const verifyUser = async (props: { token: string }) => {
  try {
    const res = await $http.get(`/verify/${props.token}`);
    return res?.data;
  } catch (e: any) {
    return e.response.data ?? { message: e.message };
  }
};

export const resendVerification = async (props: { email: string }) => {
  try {
    const res = await $http.post('/verify/resend', props);
    return res?.data;
  } catch (e: any) {
    return e.response.data ?? { message: e.message };
  }
};

export const guestSignup = async (props: { email: string; firstName: string; lastName: string; password: string }) => {
  try {
    const res = await $http.post('/signup', props);
    return res?.data;
  } catch (e: any) {
    return e.response.data ?? { message: e.message };
  }
};

export const forgetPassword = async (props: { email: string }) => {
  try {
    const res = await $http.post('/reset-password', props);
    return res?.data;
  } catch (e: any) {
    return e.response.data ?? { message: e.message };
  }
};

export const resendForgetPassword = async (props: { email: string }) => {
  try {
    const res = await $http.post('/reset-password', props);
    return res?.data;
  } catch (e: any) {
    return e.response.data ?? { message: e.message };
  }
};

export const revalidateAuth = async (props: { token: string }) => {
  try {
    const res = await $http.get(`/revalidate-login/${props.token}`);
    return res?.data;
  } catch (e: any) {
    return e.response.data ?? { message: e.message };
  }
};

export const signUpWithOAuth = async (props: { query: string; oAuth: string }) => {
  try {
    const res = await $http.get(`/${props.oAuth}/redirect?${props.query}`);
    return res?.data;
  } catch (e: any) {
    throw e.response.data;
    // return e.response.data ?? { message: e.message };
  }
};

export const authorizeToken = async (props: { token: string }) => {
  try {
    const res = await $http_2.post('/authorize', props);
    return res?.data;
  } catch (e: any) {
    const error = JSON.stringify(e.response.data);
    throw error;
  }
};

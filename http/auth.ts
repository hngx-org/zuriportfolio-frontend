import axios from 'axios';

const AUTH_HTTP_URL = 'https://zuri-auth.up.railway.app/api/v1';

const $http = axios.create({
  baseURL: AUTH_HTTP_URL,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
});


export const verfiy2FA = async (props: { token: string; code: string }) => {
  try {
    const res = await $http.post('/auth/2fa/verify-code', props);
    return res?.data;
  } catch (e: any) {
    throw e?.response?.data || { message: e.message };
  }
};

export const resend2FACode = async (props: { email: string }) => {
  try {
    const res = await $http.post('/auth/2fa/send-code', props);
    return res?.data;
  } catch (e: any) {
    throw e?.response?.data || { message: e.message };
  }
};

export const enabled2FA = async (props: { token: string }) => {
  try {
    const res = await $http.post('/auth/2fa/enable', props);
    return res?.data;
  } catch (e: any) {
    throw e?.response?.data || { message: e.message };
  }
};

export const disable2FA = async (props: { token: string }) => {
  try {
    const res = await $http.post('/auth/2fa/disable', props);
    return res?.data;
  } catch (e: any) {
    throw e?.response?.data || { message: e.message };
  }
};

export const resetPassword = async (props: { token: string | string[] | undefined; password: string }) => {
  try {
    const response = await $http.patch('/auth/reset-password', props);
    return response?.data;
  } catch (e: any) {
    throw e?.response?.data || { message: e.message };
  }
};

export const signUpUser = async (props: { firstName: string; lastName: string; email: string; password: string }) => {
  try {
    const res = await $http.post('/auth/signup', props);
    return res?.data;
  } catch (e: any) {
    throw e?.response?.data || { message: e.message };
  }
};

export const loginUser = async (props: { email: string; password: string }) => {
  try {
    const res = await $http.post('/auth/login', props);
    console.log('Login response', res);
    return res?.data;
  } catch (e: any) {
    console.log('login call error from api call', e);
    throw e?.response?.data || { message: e.message };
  }
};

export const signUpUserWithEmail = async (props: { email: string }) => {
  try {
    const res = await $http.post('/auth/check-email', props);
    return res?.data;
  } catch (e: any) {
    throw e?.response?.data || { message: e.message };
  }
};

export const checkEmail = async (props: { email: string }) => {
  try {
    const res = await $http.post('/auth/check-email', props);
    return res?.data;
  } catch (e: any) {
    throw e?.response?.data || { message: e.message };
  }
};

export const verifyUser = async (props: { token: string }) => {
  try {
    const res = await $http.get(`/auth/verify/${props.token}`);
    return res?.data;
  } catch (e: any) {
    throw e?.response?.data || { message: e.message };
  }
};

export const resendVerification = async (props: { email: string }) => {
  try {
    const res = await $http.post('/auth/verify/resend', props);
    return res?.data;
  } catch (e: any) {
    throw e?.response?.data || { message: e.message };
  }
};

export const guestSignup = async (props: { email: string; firstName: string; lastName: string; password: string }) => {
  try {
    const res = await $http.post('/auth/signup', props);
    return res?.data;
  } catch (e: any) {
    throw e?.response?.data || { message: e.message };
  }
};

export const forgetPassword = async (props: { email: string }) => {
  try {
    const res = await $http.post('/auth/reset-password', props);
    return res?.data;
  } catch (e: any) {
    throw e?.response?.data || { message: e.message };
  }
};

export const resendForgetPassword = async (props: { email: string }) => {
  try {
    const res = await $http.post('/auth/reset-password', props);
    return res?.data;
  } catch (e: any) {
    throw e?.response?.data || { message: e.message };
  }
};

export const revalidateAuth = async (props: { token: string }) => {
  try {
    const res = await $http.get(`/auth/revalidate-login/${props.token}`);
    return res?.data;
  } catch (e: any) {
    throw e?.response?.data || { message: e.message };
  }
};

export const signUpWithOAuth = async (props: { query: string; oAuth: string }) => {
  try {
    const res = await $http.get(`/auth/${props.oAuth}/redirect?${props.query}`);
    return res?.data;
  } catch (e: any) {
    throw e?.response?.data || { message: e.message };
  }
};

export const authorizeToken = async (props: { token: string }) => {
  try {
    const res = await $http.post('/authorize', props);
    return res?.data;
  } catch (e: any) {
    throw e?.response?.data || { message: e.message };
  }
};

export const Google = () => {
  return $http.get('/auth/google');
};

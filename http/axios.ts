import axios from 'axios';
// http://localhost:8080/api
// axios config for server
const $http = axios.create({
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    credentials: 'include',
    // 'Access-Control-Allow-Origin': '*',
  },
  // withCredentials: false,
});

let isAuthenticated = true;

if (typeof window === 'undefined') {
  $http.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response) {
        const { status } = error.response;

        if (typeof isAuthenticated !== 'undefined') {
          if (status === 401 || status === 403) {
            if (isAuthenticated) {
              isAuthenticated = false;
              window.location.href = '/auth/login';
            }
          }
        }
      }
      return Promise.reject(error);
    },
  );
}

export default $http;

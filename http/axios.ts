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

const isServer = typeof window === 'undefined';

let isAuthenticated = true;

function handleSessionExpiration() {
  isAuthenticated = false;
  window.location.href = '/login';
}

if (!isServer) {
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
              handleSessionExpiration();
            }
          }
        }
      }
      return Promise.reject(error);
    },
  );
}

export default $http;

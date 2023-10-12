import axios from 'axios';
// http://localhost:8080/api
// axios config for server
const $http = axios.create({
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    // 'Access-Control-Allow-Origin': '*',
  },
  // withCredentials: true,
});

export default $http;

import axios from 'axios';

// axios config for server
const API_URL = process.env.NODE_ENV === 'development' ? 'https://team-liquid-repo.onrender.com/api/review' : '';
const $http = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  // headers: {
  //     'Content-Type': 'application/json',
  //     'Access-Control-Allow-Origin': '*',
  //   },
  // withCredentials: true,
});

export default $http;

// headers: {
//   'Content-Type': 'application/json',
//   'Access-Control-Allow-Origin': '*',
// },
// withCredentials: true,

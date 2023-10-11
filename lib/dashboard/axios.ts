import axios from 'axios';

export const axiosDashboardInstance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

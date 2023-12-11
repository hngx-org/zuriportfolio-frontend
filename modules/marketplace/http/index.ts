import axios from 'axios';
export const MARKETPLACE_API_URL = process.env.NEXT_PUBLIC_MARKETPLACE_API_URL || "https://zuri-marketplace-backend.onrender.com/api/marketplace/v1/"
// export let API_URI = 'https://staging.zuri.team/api/marketplace/v1';

const http = axios.create({
  baseURL: MARKETPLACE_API_URL,
});

http.defaults.headers.post['Content-Type'] = 'application/json';

export default http;

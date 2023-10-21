import axios from 'axios';

export let API_URI = 'https://coral-app-8bk8j.ondigitalocean.app/api/marketplace/v1';
// export let API_URI = 'https://staging.zuri.team/api/marketplace/v1';

const http = axios.create({
  baseURL: API_URI,
});

http.defaults.headers.post['Content-Type'] = 'application/json';

export default http;

import axios from 'axios';
import { notify } from '@ui/Toast';

const fetchErrorToast = (data: string) => notify({ type: 'error', message: `Error fetching ${data}`, theme: 'light' });

const userID = '3e9a1d54-826a-4d0b-8a48-a4e92f857fd5';
const baseURL = `https://demerzel-badges-production.up.railway.app/api`;

const $http = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchAssessmentHistory = async () => {
  try {
    const res: any = await $http.get(`/user/${userID}/badges`, {});
    // console.log(res);
    return res.data.data.badges;
  } catch (error) {
    fetchErrorToast('Assessment History');
    console.error('Error Assessment History:', error);
    throw error;
  }
};

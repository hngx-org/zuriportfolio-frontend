import axios from 'axios';
import { notify } from '@ui/Toast';
import $http from './axios';

const fetchErrorToast = (data: string) => notify({ type: 'error', message: `Error fetching ${data}`, theme: 'light' });

const userID = '3e9a1d54-826a-4d0b-8a48-a4e92f857fd5';
const baseURL = `https://demerzel-badges-production.up.railway.app/api`;

const $httpInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchAssessmentHistory = async () => {
  try {
    const res: any = await $httpInstance.get(`/user/${userID}/badges`, {});
    // console.log(res);
    return res.data.data.badges;
  } catch (error) {
    fetchErrorToast('Assessment History');
    console.error('Error Assessment History:', error);
    throw error;
  }
};

export const getAssessmentDetails = async () => {
  try {
    const response = await $http.get(
      'http://104.248.143.148/api/assessments/4?fake_token=l3h5.34jb3%2C4mh346gv%2C34h63vk3j4h5k43hjg54kjhkg4j6h45g6kjh45gk6jh6k6g34hj6',
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

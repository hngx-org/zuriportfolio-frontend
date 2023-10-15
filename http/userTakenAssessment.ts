import axios from 'axios';
import { notify } from '@ui/Toast';
import $http from './axios';

const fetchErrorToast = (data: string) => notify({ type: 'error', message: `Error fetching ${data}`, theme: 'light' });

const userID = '3e9a1d54-826a-4d0b-8a48-a4e92f857fd5';
const baseURL = `https://demerzel-badges-production.up.railway.app/api`;

const assessmentBaseUrl = `http://104.248.143.148/api`;

// const TaskeAssessmentURL = 'http://104.248.143.148/api'
const fetchToken = 'l3h5.34jb3%2C4mh346gv%2C34h63vk3j4h5k43hjg54kjhkg4j6h45g6kjh45gk6jh6k6g34hj6';

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

// export const getAssessmentDetails = async (id: string, token: string) => {
//   try {
//   //   const id = getAllAssessments(token).then((response) => {
//   //     response.assessments.map((item: any) => {
//   //       return item.skill_id
//   //     })
//   //   })
//     const response = await $http.get(
//       `${assessmentBaseUrl}/assessments/${id}`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       }
//     );
//     return response.data;
//   } catch (error) {
//     console.log(error);
//   }
// };

export const getAllAssessments = async (token: string) => {
  try {
    const response = await $http.get(`${assessmentBaseUrl}/assessments`, {
      headers: {
        token: token,
      },
    });
    return response.data;
  } catch (error) {
    fetchErrorToast('All Assessment Error');
    console.log(error);
  }
};

const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchUserTakenAssessment = async (token: string, skill_id: any) => {
  try {
    const res = await axiosInstance.post(
      `http://104.248.143.148/api/assessments/start-assessment`,
      {assessment_id: skill_id},
      { 
        headers: {
          'Content-Type': 'application/json',
          token: token
        },
      }
    )
    // console.log(res);
    return res;
  } catch (error) {
    console.error('Error fetching user taken assessment:', error);
    throw new Error('Failed to fetch user taken assessment')
  }
};

export const submitAssessment = async ({
  assessment_id,
  question_id,
  user_answer_id,
  answer_text,
  token,
}: {
  assessment_id: number;
  question_id: number;
  user_answer_id: number;
  answer_text: string;
  token: string;
}) => {
  const axiosInstance = axios.create({
    headers: {
      'Content-Type': 'application/json',
      token: token
    },
  });
  try {
    const res = await axiosInstance.post(`http://104.248.143.148/api/assessments/submit?fake_token=${fetchToken}`, {
      assessment_id,
      response: {
        question_id: question_id,
        user_answer_id: user_answer_id,
        answer_text: answer_text,
      },
    });
  } catch (error) {
    console.error('Error submitting assessment:', error);
    throw error;
  }
};

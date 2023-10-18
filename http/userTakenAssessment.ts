import axios from 'axios';
import $http from './axios';

const assessmentBaseUrl = `https://assessment.cofucan.tech/api`;

export const fetchAssessmentHistory = async (token: string) => {
  try {
    const res: any = await $http.get(`${assessmentBaseUrl}/assessments/get-user-assessments`, {
      headers: {
        token: token,
      },
    });
    return res.data;
  } catch (error) {
    console.error('Error Assessment History:', error);
    throw error;
  }
};

export const getAssessmentDetails = async (token: string, data: string) => {
  try {
    const response = await $http.get(`${assessmentBaseUrl}/assessments/${data}`, {
      headers: {
        token: token,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAllAssessments = async (token: string) => {
  try {
    const response = await $http.get(`${assessmentBaseUrl}/assessments`, {
      headers: {
        token: token,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchUserTakenAssessment = async (token: string, id: any) => {
  try {
    const res = await axios.post(
      `${assessmentBaseUrl}/assessments/start-assessment`,
      { assessment_id: id },
      {
        headers: {
          'Content-Type': 'application/json',
          token: token,
        },
      },
    );
    console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    console.error('Error fetching user taken assessment:', error);
    throw new Error('Failed to fetch user taken assessment');
  }
};

export const fetchUserAssessmentSession = async (token: string, id: any) => {
  try {
    const res = await axios.get(`${assessmentBaseUrl}/assessments/session/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        token: token,
      },
    });
    return res.data.data;
  } catch (error) {
    console.error('Error fetching user taken assessment:', error);
    throw new Error('Failed to fetch user taken assessment');
  }
};

export const submitAssessment = async ({
  assessment_id,
  question_id,
  user_answer_id,
  answer_text,
  token,
}: {
  assessment_id: number | string | string[];
  question_id: number;
  user_answer_id: number;
  answer_text: string;
  token: string;
}) => {
  const axiosInstance = axios.create({
    headers: {
      'Content-Type': 'application/json',
      token: token,
    },
  });
  try {
    const res = await axiosInstance.post(`${assessmentBaseUrl}/assessments/submit`, {
      assessment_id,
      response: {
        question_id: question_id,
        user_answer_id: user_answer_id,
        answer_text: answer_text,
      },
    });
    console.log(res);
  } catch (error) {
    console.error('Error submitting assessment:', error);
    throw error;
  }
};

export const submitFinalAssessment = async ({
  assessment_id,
  token,
}: {
  assessment_id: string | string[] | undefined;
  token: string;
}) => {
  const axiosInstance = axios.create({
    headers: {
      'Content-Type': 'application/json',
      token: token,
    },
  });
  try {
    const res = await axiosInstance.post(`${assessmentBaseUrl}/assessments/submit`, {
      assessment_id,
      is_submitted: true,
    });
    console.log(res);
  } catch (error) {
    console.error('Error submitting assessment:', error);
    throw error;
  }
};

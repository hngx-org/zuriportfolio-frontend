import axios from 'axios';

const API_URL = 'https://team-liquid-repo.onrender.com/api/review';
const axiosReviewInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isAuthenticated = true;

if (typeof window === 'undefined') {
  axiosReviewInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response) {
        const { status } = error.response;

        if (typeof isAuthenticated !== 'undefined') {
          if (status === 401 || status === 403) {
            if (isAuthenticated) {
              isAuthenticated = false;
              window.location.href = '/auth/login';
            }
          }
        }
      }
      return Promise.reject(error);
    },
  );
}

export const postReplyByReviewId = async (props: { id: string }, payload: { name: string; feedback: string }) => {
  try {
    const res: any = await axiosReviewInstance.post(`/shop/reviews/${props?.id}`, payload);
    const productReview = res?.data;
    return productReview;
  } catch (error) {
    // fetchErrorToast("product's reviews");
    // console.error('Error fetching reviews:', error);
    throw error;
  }
};

export const postReviewByProductId = async (
  props: { id: number },
  payload: { customerName: string; title: string; description: string; isHelpful: number; rateNo: number },
) => {
  try {
    const res = await axiosReviewInstance.post(`/products/1/reviews`, payload);
    return res?.data;
  } catch (e: any) {
    console.log(e);
    return e.response?.data ?? { message: e.message };
  }
};

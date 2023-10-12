import $http from '../axios';

// test
export const postReplyById = async (props: { id: string }) => {
  try {
    const res = await $http.post(`/shop/review/${props?.id}`);
    return res?.data;
  } catch (e: any) {
    console.log(e);
    return e.response?.data ?? { message: e.message };
  }
};

export const getReviewByProductId = async (props: { id: string }) => {
  try {
    const res = await $http.get(`/shop/${props?.id}/reviews`);
    return res?.data;
  } catch (e: any) {
    console.log(e);
    return e.response?.data ?? { message: e.message };
  }
};

export const getMarketplaceReviewByProductId = async (props: { id: string }) => {
  try {
    const res = await $http.get(`/marketplace/products/1reviews`);
    return res?.data;
  } catch (e: any) {
    console.log(e);
    return e.response?.data ?? { message: e.message };
  }
};

export const postReviewByProductId = async (
  props: { id: string },
  payload: { customerName: string; title: string; description: string; isHelpful: number; rateNo: number },
) => {
  try {
    const res = await $http.post(`/products/1/reviews`, payload);
    return res?.data;
  } catch (e: any) {
    console.log(e);
    return e.response?.data ?? { message: e.message };
  }
};

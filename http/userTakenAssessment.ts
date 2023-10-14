import $http from './axios';

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

import axios from 'axios';

export const sendArrayOfObjects = async (objectsArray: any[], endpoint: string) => {
  const promises = objectsArray.map((data) => {
    return axios.post(endpoint, data);
  });

  try {
    const responses = await Promise.all(promises);
    // Map over the responses and extract the data
    const responseDataArray = responses.map((response) => response.data);
    return responseDataArray;
  } catch (error) {
    throw error; // Handle any errors that occurred during the requests
  }
};

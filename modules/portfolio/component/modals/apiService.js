import axios from 'axios';

const BASE_URL = 'https://hng6-r5y3.onrender.com/api';

export const updateProfileDetails = async (userId, newProfileDetails) => {
  try {
    const apiUrl = `${BASE_URL}/profile/${userId}`;

    const requestBody = {
      name: newProfileDetails.name,
      city: newProfileDetails.city,
      country: newProfileDetails.country,
      trackId: newProfileDetails.trackId,
    };

    const response = await axios.put(apiUrl, requestBody, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      return 'Profile details updated successfully';
    } else {
      return 'Profile details update failed';
    }
  } catch (error) {
    return 'API request failed';
  }
};

export default apiService;

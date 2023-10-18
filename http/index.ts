import axios from 'axios';
import $http from './axios';
import { useMutation, useQuery } from '@tanstack/react-query';

const AUTH_HTTP_URL = 'https://auth.akuya.tech';

import { AxiosResponse } from 'axios';

export const getUserByName = async (props: { name: string }) => {
  try {
    const res = await $http.get(`/user/${props?.name}`);
    return res?.data;
  } catch (e: any) {
    console.log(e);
    return e.response.data ?? { message: e.message };
  }
};

// remove from wishlist

export const removeFromWishlist = async (userId: any, productId: any, token: any): Promise<AxiosResponse> => {
  try {
    const apiUrl = `https://coral-app-8bk8j.ondigitalocean.app/api/wishlist/delete/${userId}/${productId}`;
    const response = await $http.delete(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.error('Error deleting:', error);
    throw error;
  }
};

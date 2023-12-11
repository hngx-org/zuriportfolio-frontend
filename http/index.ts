import axios from 'axios';
import $http from './axios';
import { useMutation, useQuery } from '@tanstack/react-query';
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

import { MARKETPLACE_API_URL } from '@modules/marketplace/http';

// remove from wishlist

export const removeFromWishlist = async (userId: any, productId: any, token: any): Promise<AxiosResponse> => {
  try {
    const apiUrl = `${MARKETPLACE_API_URL}/user-wishlist/${userId}/${productId}`;
    const response = await axios.delete(apiUrl, {
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

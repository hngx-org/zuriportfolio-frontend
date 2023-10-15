import useAuthMutation from './useAuthMutation';
import { revalidateAuth } from '../../http/auth';
import { useAuth } from '../../context/AuthContext';
import { useEffect } from 'react';
import persistedToken from '../../helpers/persistedToken';
import useAuthQuery from './useAuthQuery';

const useAuthRevalidate = () => {
  const { handleAuth } = useAuth();

  let token = '';

  if (typeof window !== 'undefined') {
    token = localStorage.getItem('zpt') as string;
  }
  console.log(token);
  const { isLoading, isSuccess, data } = useAuthQuery(['revalidate'], () => revalidateAuth({ token }), {
    onSuccess: (response) => {
      console.log(response);

      // console.log(isSuccess);

      if (response.status === 200) {
        handleAuth(response);

        return;
      }
    },
    onError: ({ response }: any) => {
      if (response.data.message) {
        return;
      }
    },
  });
};

export default useAuthRevalidate;

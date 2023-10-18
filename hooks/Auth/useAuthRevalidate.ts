import useAuthMutation from './useAuthMutation';
import { revalidateAuth } from '../../http/auth';
import { useAuth } from '../../context/AuthContext';
import { useEffect } from 'react';
import isAuthenticated from '../../helpers/isAuthenticated';

const useAuthRevalidate = () => {
  const { auth, handleAuth } = useAuth();

  let token = '';

  if (typeof window !== 'undefined') {
    token = localStorage.getItem('zpt') as string;
  }

  const { mutate: revalidateUser } = useAuthMutation(revalidateAuth, {
    onSuccess: (response) => {
      if (response.status === 200) {
        handleAuth(response.data);

        return;
      }
    },
    onError: ({ response }: any) => {
      if (response.data.message) {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('zpt');
        }
        console.log(response.data.message, 'from the useAuthRevalidate hook');
        return;
      }
    },
  });

  useEffect(() => {
    // only runs when
    if (!auth && isAuthenticated(token)) {
      revalidateUser({ token });
    }
  }, [auth, token, revalidateUser]);
};

export default useAuthRevalidate;

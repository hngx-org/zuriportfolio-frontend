import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { authorizeToken } from '../http/auth';

const useIsAuthenticated = () => {
  const [authenticatedState, setAuthenticatedState] = useState<boolean>();

  const { mutate } = useMutation(authorizeToken, {
    onSuccess: (res) => {
      if (res.status === 200) {
        console.log(res);
        setAuthenticatedState(true);
        return true;
      }
    },
    onError: (res: any) => {
      const error = JSON.parse(res);
      if (error.status === 401 || error.status === 400) {
        console.log(error);
        setAuthenticatedState(false);
        return false;
      }
    },
  });

  useEffect(() => {
    let token = '';

    if (typeof window !== 'undefined') {
      token = localStorage.getItem('zpt') as string;
    }
    mutate({ token: token as string });
  }, []);

  return { mutate, authenticatedState };
};

export default useIsAuthenticated;

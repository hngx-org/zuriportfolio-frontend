import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import isAuthenticated from './isAuthenticated';
import useAuthRevalidate from '../hooks/Auth/useAuthRevalidate';

const withoutAuth = <P extends { children: React.ReactNode }>(WrappedComponent: React.ComponentType<P>) => {
  const Wrapper: React.FC<P> = (props) => {
    const router = useRouter();

    // const { revalidateUser } = useAuthRevalidate()

    useEffect(() => {
      const token = localStorage.getItem('zpt');
      const isLoggedIn = isAuthenticated(token as string);

      if (isLoggedIn) {
        router.push('/');
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const wrappedComponent = React.createElement(WrappedComponent, props);
    return wrappedComponent;
  };

  return Wrapper;
};

export default withoutAuth;

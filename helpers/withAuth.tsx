import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import isAuthenticated from './isAuthenticated';
import useAuthRevalidate from '../hooks/Auth/useAuthRevalidate';
import { ADMIN_ID, USER_ID, useAuth } from '../context/AuthContext';
import Loader from '@ui/Loader';

// this would change later on once backend has the authentication
// working.
const withAuth = <P extends { children: React.ReactNode }>(WrappedComponent: React.ComponentType<P>) => {
  const Wrapper: React.FC<P> = (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('zpt');
      const isLoggedIn = isAuthenticated(token as string);
      if (!isLoggedIn) {
        router.push('/auth/login');
        localStorage.removeItem('zpt');
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const wrappedComponent = React.createElement(WrappedComponent, props);
    return wrappedComponent;
  };

  return Wrapper;
};

export const withAdminAuth = <P extends { children?: React.ReactNode }>(WrappedComponent: React.ComponentType<P>) => {
  const Wrapper: React.FC<P> = (props) => {
    const [isPageLoading, setIsPageLoading] = useState(true);
    const router = useRouter();
    const { auth } = useAuth();
    useAuthRevalidate();

    useEffect(() => {
      let token = '';

      if (typeof window !== 'undefined') {
        token = localStorage.getItem('zpt') as string;
      }

      // there is no token found in the localstorage
      if (!isAuthenticated(token)) {
        router.push('/auth/login');
        return;
      }

      if (!auth) return;

      if (auth?.user.roleId !== ADMIN_ID) {
        router.push('/access-denied');
        return;
      }

      setIsPageLoading(false);
    }, [auth, router]);

    if (isPageLoading) {
      return (
        <div className="flex items-center justify-center h-screen">
          <Loader />
        </div>
      );
    }

    const wrappedComponent = React.createElement(WrappedComponent, props);
    return wrappedComponent;
  };

  return Wrapper;
};

export const withUserAuth = <P extends { children: React.ReactNode }>(WrappedComponent: React.ComponentType<P>) => {
  const Wrapper: React.FC<P> = (props) => {
    const [isPageLoading, setIsPageLoading] = useState(true);
    const router = useRouter();
    const { auth } = useAuth();
    useAuthRevalidate();

    useEffect(() => {
      let token = '';

      if (typeof window !== 'undefined') {
        token = localStorage.getItem('zpt') as string;
      }

      // there is no token found in the localstorage
      if (!isAuthenticated(token)) {
        router.push('/auth/login');
        return;
      }

      // auth is undefined means user just landed on page
      if (!auth) return;

      if (auth?.user.roleId !== USER_ID) {
        router.push('/access-denied');
        return;
      }

      setIsPageLoading(false);
    }, [auth, router]);

    if (isPageLoading) {
      return (
        <div className="flex items-center justify-center h-screen">
          <Loader />
        </div>
      );
    }

    const wrappedComponent = React.createElement(WrappedComponent, props);
    return wrappedComponent;
  };

  return Wrapper;
};

export default withAuth;

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useIsAuthenticated from '../hooks/useIsAuthenticated';
import Loader from '@ui/Loader';

const withoutAuth = <P extends { children: React.ReactNode }>(WrappedComponent: React.ComponentType<P>) => {
  const Wrapper: React.FC<P> = (props) => {
    const [isPageLoading, setIsPageLoading] = useState(true);
    const router = useRouter();

    const { authenticatedState } = useIsAuthenticated();

    useEffect(() => {
      if (authenticatedState) {
        router.replace('/');
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      setIsPageLoading(false);
    }, []);

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

export default withoutAuth;

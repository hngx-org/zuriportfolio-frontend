import { useEffect } from 'react';
import { useRouter } from 'next/router';
import isAuthenticated from './isAuthenticated';

const withoutAuth = <P extends {}>(WrappedComponent: React.ComponentType<P>) => {
  const Wrapper: React.FC<P> = (props) => {
    const router = useRouter();
    useEffect(() => {
      const token = localStorage.getItem('zpt');
      const isLoggedIn = isAuthenticated(token as string);

      if (isLoggedIn) {
        router.push('/dashboard');
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withoutAuth;

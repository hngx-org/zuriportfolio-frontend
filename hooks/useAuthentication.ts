import { useEffect, useState } from 'react';
import isAuthenticated from '../helpers/isAuthenticated';

export const useAuthentication = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const _authenticated = isAuthenticated(localStorage.getItem('zpt') as string);
    if (_authenticated) {
      setAuthenticated(true);
    }
  }, []);

  return { authenticated };
};

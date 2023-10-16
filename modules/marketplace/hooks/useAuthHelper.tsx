import jwtDecode from 'jwt-decode';
import { isEmpty } from '../../../helpers';

export function isUserAuthenticated() {
  if (typeof localStorage === 'undefined') return;

  const token = localStorage.getItem('zpt');

  if (!token || isEmpty(token)) {
    return null;
  }

  const decodedToken = jwtDecode(token);
  console.log(decodedToken);

  return decodedToken;
}

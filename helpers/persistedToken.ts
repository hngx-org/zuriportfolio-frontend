import jwtDecode from 'jwt-decode';
import { isEmpty } from '.';

const clearLocalStorage = () => {
  localStorage.removeItem('zpt');
};

function persistedToken(token: string) {
  if (!token || isEmpty(token)) {
    return false;
  }
  try {
    const decodedToken = jwtDecode(token);
    const expirationTime = (decodedToken as any).exp * 1000; // convert to milliseconds

    if (Date.now() >= expirationTime) {
      clearLocalStorage();
      return false;
    }

    return decodedToken;
  } catch (error) {
    console.error(`Error verifying jwt token: ${error}`);
    clearLocalStorage();
    return false;
  }
}

export default persistedToken;

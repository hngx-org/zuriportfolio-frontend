import { notify } from '@ui/Toast';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';

const useUserSession = () => {
    const router = useRouter();
    const url = router.route;
    const { handleAuth, handleUserCameFrom } = useAuth();

    const signUp = () => {
      // set the route the user came from to context
      handleUserCameFrom(url);
      router.push('/auth/signup')
    }

    const signIn = () => {
      // set the route the user came from to context
      handleUserCameFrom(url);
      router.push('/auth/login');
    }

    const logout = () => {
      const token = localStorage.getItem('zpt');

      if (token) {
        localStorage.removeItem('zpt');
        notify({
          message: 'Logged out',
          type: 'success',
          theme: 'dark',
        });
        handleAuth(undefined);
        router.push('/');
      }
    };

    return {signUp, signIn, logout}
}

export default useUserSession
import React, { createContext, useContext, useState } from 'react';
import { AuthContextProps } from '../@types';
import { AuthResponse } from '../@types';

export const ADMIN_ID = 3;

export const USER_ID = 2;

const AuthContext = createContext<AuthContextProps>({} as any);

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<AuthResponse>();
  const [email, setEmail] = useState('');
  const [redirect, setRedirect] = useState('');
  const [userCameFrom, setUserCameFrom] = useState<string | undefined>();
  const [userCameFromForOAuth, setUserCameFromForOAuth] = useState<string | undefined>();

  const handleAuth = (value: AuthResponse | undefined) => {
    setAuth(value);
  };

  const handleEmail = (value: string) => {
    setEmail(value);
  };

  const handleRedirect = (value: string) => {
    setRedirect(value);
  };

  const handleUserCameFrom = (value: string | undefined) => {
    setUserCameFrom(value);
  };

  const handleUserCameFromForOAuth = (value: string | undefined) => {
    setUserCameFromForOAuth(value);
  };

  const contextValue: AuthContextProps = {
    auth,
    handleAuth,
    email,
    handleEmail,
    redirect,
    handleRedirect,
    userCameFrom,
    handleUserCameFrom,
    userCameFromForOAuth,
    handleUserCameFromForOAuth,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

// use this hook in your component to have access to the AuthContext
export const useAuth = () => {
  const authContext = useContext(AuthContext)

  if(!authContext) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return authContext;
};

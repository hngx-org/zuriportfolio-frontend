import React, { createContext, useContext, useState } from 'react';
import { AuthContextProps } from '../@types';
import { AuthResponse } from '../@types';

const AuthContext = createContext<AuthContextProps>({} as any);

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<AuthResponse>();
  const [email, setEmail] = useState('');
  const [redirect, setRedirect] = useState('');

  const handleAuth = (value: AuthResponse) => {
    setAuth(value);
  };

  const handleEmail = (value: string) => {
    setEmail(value);
  };

  const handleRedirect = (value: string) => {
    setRedirect(value);
  };

  const contextValue: AuthContextProps = { auth, handleAuth, email, handleEmail, redirect, handleRedirect };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

// use this hook in your component to have access to the AuthContext
export const useAuth = () => useContext(AuthContext);

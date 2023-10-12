import React, { createContext, useState } from 'react';
import { AuthContextProps } from '../@types';
import { LoginBodyResponse, Email } from '../@types';

const AuthContext = createContext<AuthContextProps>({} as any);
export default AuthContext;

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [email, setEmail] = useState<Email>();

  const handleEmail = (value: Email) => {
    setEmail(value);
  };

  const [user, setUser] = useState<LoginBodyResponse>();
  const handleUser = (value: LoginBodyResponse) => {
    setUser(value);
  };
  const contextValue: AuthContextProps = { email, user, handleUser, handleEmail };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

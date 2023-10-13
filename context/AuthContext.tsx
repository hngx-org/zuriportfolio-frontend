import React, { createContext, useState } from 'react';
import { AuthContextProps } from '../@types';
import { LoginResponse } from '../@types';

const AuthContext = createContext<AuthContextProps>({} as any);
export default AuthContext;

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<LoginResponse>();
  const handleAuth = (value: LoginResponse) => {
    setAuth(value);
  };
  const contextValue: AuthContextProps = { auth, handleAuth };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

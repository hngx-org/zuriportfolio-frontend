import React, { createContext, useState } from 'react';
import { AuthContextProps } from '../@types';
import { LoginBodyResponse } from '../@types';

const AuthContext = createContext<AuthContextProps>({} as any);
export default AuthContext;

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<LoginBodyResponse>();
  const handleUser = (value: LoginBodyResponse) => {
    setUser(value);
  };
  const contextValue: AuthContextProps = { user, handleUser };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

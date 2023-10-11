import React, { createContext, useState } from 'react';
import { AuthContextProps } from '../@types';

const AuthContext = createContext<AuthContextProps>({} as any);
export default AuthContext;

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const contextValue: AuthContextProps = {};

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

import React, { createContext, useContext, ReactNode } from 'react';

// Define the shape of your context data
interface YourContextData {
  // Define your context properties and their types here
  // For example:
  value: string;
}

// Create a context with an initial value (this can be changed later)
const YourContext = createContext<YourContextData | undefined>(undefined);

// Create a custom provider component for your context
interface YourContextProviderProps {
  children: ReactNode;
  // You can add any additional props required by your context here
}

export function YourContextProvider({ children }: YourContextProviderProps) {
  // Define the state and any context-specific functions here
  const value = 'Your context value';

  return <YourContext.Provider value={{ value }}>{children}</YourContext.Provider>;
}

// Custom hook to consume the context
export function useYourContext() {
  const context = useContext(YourContext);
  if (!context) {
    throw new Error('useYourContext must be used within a YourContextProvider');
  }
  return context;
}

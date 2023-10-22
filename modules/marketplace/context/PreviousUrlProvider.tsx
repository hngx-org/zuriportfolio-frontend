import { ReactNode, createContext, useState } from 'react';

export const PreviousUrlContext = createContext({ previousUrl: '', updatePath: (path: string): void => {} });

const PreviousUrlProvider = ({ children }: { children: ReactNode }) => {
  const [url, setUrl] = useState('');

  const handlerRoute = (path: string) => {
    setUrl(path);
  };

  const dataState = {
    previousUrl: url,
    updatePath: handlerRoute,
  };

  return <PreviousUrlContext.Provider value={dataState}>{children}</PreviousUrlContext.Provider>;
};
export default PreviousUrlProvider;

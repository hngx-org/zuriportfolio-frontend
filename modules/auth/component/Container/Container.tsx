import React, { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}
const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className="max-w-[1240px] mx-6 xl:mx-auto">{children}</div>;
};

export default Container;

import React from 'react';
import Wrapper from './placeholders/Wrapper';

const SkeletonLoader = () => {
  return (
    <div className="mt-10">
      <div className="backdrop-blur-md relative w-full flex-col justify-center items-center shadow-[0_0px_6px_1px_rgba(0,0,0,0.14)] rounded-b-lg mt h-[400px] animate-pulse">
        <div className="absolute bottom-28 left-3 w-[140px] sm:w-[180px] md:w-[200px] aspect-square rounded-full bg-gray-100 bg-opacity-25 border-green-400 border-[2px] animate-pulse"></div>
      </div>
      <Wrapper className="h-[50px] w-full animate-pulse mt-10" disableEdit={true} />
    </div>
  );
};

export default SkeletonLoader;

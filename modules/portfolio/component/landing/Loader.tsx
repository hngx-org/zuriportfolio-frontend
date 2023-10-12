import React from 'react';

const Loader = () => {
  return (
    <div className="flex flex-col gap-3 justify-center items-center h-[25vh] max-w-fit mx-auto scale-150">
      <div className="w-6 h-6 border-t-2 border-brand-success-primary border-solid rounded-full animate-spin"></div>
      <p className="animate-pulse text-brand-success-primary text-2xl font-semibold font-ppReg">Loading...</p>
    </div>
  );
};

export default Loader;

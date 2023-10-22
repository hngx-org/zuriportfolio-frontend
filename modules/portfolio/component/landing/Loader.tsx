import React from 'react';

const Loader = () => {
  return (
    <div className="flex flex-col gap-3 justify-center items-center h-[25vh] max-w-fit mx-auto scale-150">
      <div className="w-6 h-6 border-t-2 border-brand-success-primary border-solid rounded-full animate-spin"></div>
      <p className="animate-pulse text-brand-success-primary font-semibold font-ppReg text-xs">Loading...</p>
    </div>
  );
};

export default Loader;
  {
    /* <div className="backdrop-blur-md relative w-full flex-col justify-center items-center shadow-[0_0px_6px_1px_rgba(0,0,0,0.14)] rounded-b-lg mt-5 h-[400px] animate-pulse">
        <div className="relative w-full flex-col justify-center items-center shadow-[0_0px_6px_1px_rgba(0,0,0,0.14)] rounded-b-lg mt-5 h-full">
          <div className="absolute bottom-28 left-3 w-[140px] sm:w-[180px] md:w-[200px] aspect-square rounded-full bg-gray-100 bg-opacity-25 border-green-400 border-[2px]">
            Cover
          </div>
        </div>
      </div> */
  }

  
    //  <div className="backdrop-blur-md relative w-full flex-col justify-center items-center shadow-[0_0px_6px_1px_rgba(0,0,0,0.14)] rounded-b-lg mt-5 h-[400px] animate-pulse">
    //     <div className="relative w-full flex-col justify-center items-center shadow-[0_0px_6px_1px_rgba(0,0,0,0.14)] rounded-b-lg mt-5 h-full">
    //       <div className="absolute bottom-28 left-3 w-[140px] sm:w-[180px] md:w-[200px] aspect-square rounded-full bg-gray-100 bg-opacity-25 border-green-400 border-[2px]">
    //         Cover
    //       </div>
    //     </div>
    //   </div> 
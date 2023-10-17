export const LoadingSkeleton = () => {
  return (
    <div className="backdrop-blur-md">
      <div className="flex items-center justify-between gap-4">
        <div className="flex gap-3 md:gap-9 md:max-w-[500px] lg:max-w-[550px]">
          <div className="w-36 h-36 md:w-40 md:h-40 bg-gray-300 animate-pulse"></div>
          <div className="flex flex-col gap-2 md:gap-3">
            <div className="flex flex-col gap-2 md:gap-3">
              <div className="flex gap-2 md:gap-3 items-center">
                <div className="flex flex-col gap-2">
                  <div className="w-16 h-3 md:w-24 md:h-5 bg-gray-300 animate-pulse"></div>
                  <div className="w-36 h-4 md:w-48 md:h-6 bg-gray-300 animate-pulse"></div>
                </div>
                <div className="w-16 h-4 md:w-20 md:h-6 bg-gray-300 animate-pulse"></div>
              </div>
              <div className="gap-1 self-start hidden md:flex">
                <div className="w-16 h-4 md:w-24 md:h-6 bg-gray-300 animate-pulse"></div>
                <div className="w-16 h-4 md:w-20 md:h-6 bg-gray-300 animate-pulse"></div>
              </div>
              <div className="md:hidden flex gap-1 self-start">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-300 animate-pulse"></div>
                <div className="w-16 h-5 md:w-20 md:h-6 bg-gray-300 animate-pulse"></div>
              </div>
              <div className="md:hidden">
                <div className="w-24 h-5 md:w-28 md:h-6 bg-gray-300 animate-pulse"></div>
              </div>
              <div className="md:hidden">
                <div className="w-24 h-8 md:w-28 md:h-10 bg-gray-300 animate-pulse"></div>
              </div>
            </div>
            <div className="hidden md:flex gap-3 self-start">
              <div className="w-24 h-6 md:w-32 md:h-10 bg-gray-300 animate-pulse"></div>
              <div className="w-32 h-6 md:w-36 md:h-10 bg-gray-300 animate-pulse"></div>
            </div>
          </div>
        </div>
        <div className="md:hidden self-start mt-1 cursor-pointer">
          <div className="w-9 h-9 md:w-10 md:h-10 bg-gray-300 animate-pulse"></div>
        </div>
        <div className="hidden md:block">
          <div className="w-24 h-10 md:w-28 md:h-12 bg-gray-300 animate-pulse"></div>
        </div>
      </div>
      <div
        className="mt-5
              h-[1px] w-full bg-custom-color19
              "
      ></div>
    </div>
  );
};

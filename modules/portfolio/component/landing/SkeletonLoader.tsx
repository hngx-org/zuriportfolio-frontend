import React from 'react';
import Wrapper from './placeholders/Wrapper';
import Button from '@ui/Button';
import { useRouter } from 'next/router';

type SkeletonLoaderProps = {
  error: boolean;
  message: string;
  pulse: boolean;
};

const SkeletonLoader = ({ error, message, pulse }: SkeletonLoaderProps) => {
  const router = useRouter();
  const isLoading = pulse ? 'animate-pulse' : '';
  return (
    <div className="-mt-10">
      <div
        className={`backdrop-blur-md relative w-full flex-col justify-center items-center shadow-[0_0px_6px_1px_rgba(0,0,0,0.14)] rounded-b-lg mt h-[300px] ${isLoading}`}
      >
        <div
          className={`absolute bottom-5 left-5 w-[120px] sm:w-[150px] md:w-[180px] aspect-square rounded-full bg-gray-200 bg-opacity-10 ${isLoading}`}
        ></div>
      </div>
      {error ? (
        <Wrapper className={`h-[200px] w-full mt-10 ${isLoading}`} disableEdit={true}>
          <div className="flex justify-center items-center flex-col gap-5">
            <p className="text-red-200 text-sm font-semibold text-center">{message}</p>
            <button
              className="border-[1px] py-1 px-3 text-brand-green-primary border-brand-green-primary rounded-lg text-sm"
              onClick={() => router.reload()}
            >
              Retry
            </button>
          </div>
        </Wrapper>
      ) : (
        <>
          <Wrapper className={`h-[200px] w-full ${isLoading} mt-10`} disableEdit={true} />
          <Wrapper className={`h-[200px] w-full ${isLoading} mt-10`} disableEdit={true} />
          <Wrapper className={`h-[200px] w-full ${isLoading} mt-10`} disableEdit={true} />
        </>
      )}
    </div>
  );
};

export default SkeletonLoader;

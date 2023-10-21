import React from 'react';
import Image from 'next/image';
import loader from '../../public/assets/loader/loader2.svg';

const Loader: React.FC = () => {
  const centerStyles: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };

  return (
    <div style={centerStyles}>
      <div className="relative flex justify-center items-center">
        <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-green-500 spinner"></div>
        <Image
          src={loader}
          alt="Loader"
          width={80}
          height={80}
          //   className='animate-ping'
        />
      </div>
      <style jsx>{`
        .spinner {
          border-top-color: #006f37;
        }
      `}</style>
    </div>
  );
};

export default Loader;

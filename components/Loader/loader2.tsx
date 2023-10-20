import React from 'react';
import Image from 'next/image';
import loder from '../../public/assets/loader/loader.svg';

const Loader2: React.FC = () => {
  const centerStyles: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };

  const textStyles: React.CSSProperties = {
    fontSize: '18px',
    color: '#009254',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '10px',
    fontFamily: 'Manrope',
  };

  return (
    <div style={centerStyles}>
      <p style={textStyles}>Please Wait. Your page is Loading.</p>

      <br />
      <br />
      <div className="relative flex justify-center items-center">
        <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-green-500"></div>
        <img
          src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg"
          alt="Loader"
          className="rounded-full h-28 w-28"
        />
      </div>
    </div>
  );
};

export default Loader2;

import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-12 h-12 border-4 border-green-500 border-t-4 border-black rounded-full animate-spin" />
    </div>
  );
};

export default Spinner;

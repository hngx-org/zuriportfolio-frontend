import React from 'react';

const Loader3: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="rounded-full h-40 w-40 bg-green-500 animate-ping">
        <p className="text-green-500 font-semibold">Zuri ..</p>
        <p className="text-white font-semibold">Zuri ..</p>
        <p className="text-green-500 font-semibold">Zuri ..</p>
        <p className="text-white font-semibold">Zuri ..</p>
        <p className="text-green-500 font-semibold">Zuri ..</p>
      </div>
    </div>
  );
};

export default Loader3;

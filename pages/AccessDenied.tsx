import React from 'react';
import deniedIcon from '../../public/assets/images/denied-icon.svg';
import accessDeniedImage from '../../public/assets/images/denied-images.svg';
import logo from '../../public/assets/images/logo.svg';


const AccessDenied = () => {
  return (
    <div>
      <div className="w-full h-16 px-4 md:px-8 lg:px-16 flex flex-row items-center border-b border-gray-300">
        <img className="h-12" src={logo} alt="logo-image" />
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center m-5 space-y-5 md:space-y-0 md:space-x-20 sm:space-y-3 sm:space-x-0 sm:flex-col">
        <div className="flex flex-row space-x-2">
          <p className="text-3xl font-semibold">Access Denied</p>
          <img src={deniedIcon} alt="denied-icon" />
        </div>
        <p className="text-gray-500 text-xl md:w-96 sm:text-base sm:w-full">Whoa there, hold on! It looks like this area is off-limits. Our virtual police officer is here to ensure your safety and privacy. You might need special credentials or permissions to enter this zone</p>
        <button className="w-full md:w-96 sm:w-full h-16 p-3 rounded-lg text-xl sm:text-base font-semibold bg-green-500 text-white focus:outline-none">Back to homepage</button>
      </div>
      <img src={accessDeniedImage} alt="Access denied" className="w-full md:w-96 sm:w-full h-auto md:h-96" />
    </div>
  );
}

export default AccessDenied;

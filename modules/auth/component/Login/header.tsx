import React from 'react';
import Image from 'next/image';
import loginLogo from '../../../../public/assets/loginPageAssets/loginLogo.svg';
import tabletheadershape from '../../../../public/assets/loginPageAssets/tabletheadershape.svg';
import vector from '../../../../public/assets/loginPageAssets/Vector.png';

function Header() {
  return (
    <div className="mt-[1.5rem] relative hidden lg:hidden md:block">
      <div className="ml-[2.5rem]">
        <Image src={loginLogo} alt="Logo" />
      </div>
      <div className="w-full h-[1px] bg-[#EBEEEF] mt-[1.5rem]"></div>
      <div className="absolute right-0 top-12">
        <Image src={vector} alt="shape" className="h-[10rem] w-[8rem]  object-cover" />
      </div>
    </div>
  );
}

export default Header;

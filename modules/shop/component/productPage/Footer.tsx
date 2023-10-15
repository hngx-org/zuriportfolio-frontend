import React from 'react';
import Image from 'next/image';
import { Instagram } from 'iconsax-react';
import TechVerse from '../../../../public/assets/TechVerse.png';
const Footer: React.FC = () => {
  return (
    <footer className="bg-green-600 w-full  text-white-100 ">
      <div className="container mx-auto py-10 px-4 sm:px-6 md:px-3">
        <div className="flex  md:flex-row flex-col  items-center justify-between">
          <div className="flex md:flex-col flex-row items-center md:gap-2 gap-6 md:text-left mb-4 md:mb-0">
            <Image src={TechVerse} alt="Your Logo" width={100} height={50} /> {/* Name of Shop*/}
            <p className="text-base font-manropeEL">by {} Shop</p> {/* Name of Shop Owner*/}
          </div>
          <div className=" flex md:flex-row flex-col md:space-y-0 space-y-6 md:items-center items-start   md:space-x-6">
            <div className="flex flex-row items-center gap-6 justify-between">
              <h1 className="text-sm cursor-pointer font-manropeEL text-normal">Contact Us</h1>
              <h1 className="font-manropeB cursor-pointer text-base">{}</h1> {/* EMAIL OF SHOP*/}
            </div>

            <div className="flex flex-row items-center gap-6 justify-between">
              <h1 className="text-sm cursor-pointer font-manropeEL text-normal">Follow Us</h1>

              <div className="flex items-center space-x-4">
                <a href="#" className="text-white cursor-pointer bg-[#1DA1F2] rounded-full p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32">
                    <path
                      d="M31.999 6.075c-1.177.523-2.448.875-3.999 1.033 1.439-.865 2.542-2.232 3.057-3.866-1.34.794-2.826 1.369-4.411 1.684-1.266-1.352-3.062-2.196-5.055-2.196-3.815 0-6.914 3.097-6.914 6.911 0 .543.062 1.073.18 1.587-5.748-.288-10.859-3.041-14.291-7.236-.599 1.034-.944 2.244-.944 3.535 0 2.448 1.248 4.61 3.15 5.879-1.16-.038-2.25-.354-3.216-.878-.001.032-.001.065-.001.097 0 3.415 2.434 6.265 5.667 6.921-.592.162-1.221.248-1.867.248-.455 0-.898-.043-1.331-.125.9 2.773 3.522 4.792 6.623 4.852-2.422 1.887-5.469 3.014-8.774 3.014-.571 0-1.136-.034-1.693-.1 3.144 2.019 6.871 3.204 10.887 3.204 13.063 0 20.202-10.831 20.202-20.202 0-.309-.007-.617-.018-.924 1.389-1 2.589-2.248 3.536-3.669z"
                      fill="#ffffff"
                    />
                  </svg>
                </a>
                <a href="" className="bg-[#F00073] cursor-pointer rounded-full p-2 text-white">
                  <Instagram size={18} color="#fff" />
                </a>
                <a href="#" className="text-white cursor-pointer rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="39" height="39" viewBox="0 0 48 48">
                    <path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"></path><path fill="#fff" d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center text-xs py-8">
        <p>&copy; 2023 Zuri. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

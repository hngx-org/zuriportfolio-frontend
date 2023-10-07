import React from 'react';
import Image from 'next/image';
import { Instagram } from 'iconsax-react';
import TechVerse from '../../../../public/assets/TechVerse.png';
const Footer: React.FC = () => {
  return (
    <footer className="bg-[#009254] w-full text-[#fff]">
      <div className="container mx-auto py-20 px-4 sm:px-6 md:px-8">
        <div className="md:flex  md:flex-row grid grid-cols-1  items-center justify-between">
          <div className="text-left md:text-left mb-4 md:mb-0">
            <Image src={TechVerse} alt="Your Logo" width={100} height={50} />
            <p className="text-base">by Mark Essien</p>
          </div>
          <div className=" flex md:flex-row flex-col md:space-y-0 space-y-6 md:items-center items-start   md:space-x-6">
            <div>
              <h1 className="text-sm text-normal">Contact Us</h1>
            </div>
            <div>
              <h1 className="font-semibold text-base">info@techverse.com</h1>
            </div>
            <div>
              <h1 className="text-sm text-normal">Follow Us</h1>
            </div>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-white bg-[#1DA1F2] rounded-full p-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32">
                  <path
                    d="M31.999 6.075c-1.177.523-2.448.875-3.999 1.033 1.439-.865 2.542-2.232 3.057-3.866-1.34.794-2.826 1.369-4.411 1.684-1.266-1.352-3.062-2.196-5.055-2.196-3.815 0-6.914 3.097-6.914 6.911 0 .543.062 1.073.18 1.587-5.748-.288-10.859-3.041-14.291-7.236-.599 1.034-.944 2.244-.944 3.535 0 2.448 1.248 4.61 3.15 5.879-1.16-.038-2.25-.354-3.216-.878-.001.032-.001.065-.001.097 0 3.415 2.434 6.265 5.667 6.921-.592.162-1.221.248-1.867.248-.455 0-.898-.043-1.331-.125.9 2.773 3.522 4.792 6.623 4.852-2.422 1.887-5.469 3.014-8.774 3.014-.571 0-1.136-.034-1.693-.1 3.144 2.019 6.871 3.204 10.887 3.204 13.063 0 20.202-10.831 20.202-20.202 0-.309-.007-.617-.018-.924 1.389-1 2.589-2.248 3.536-3.669z"
                    fill="#ffffff"
                  />
                </svg>
              </a>
              <a href="" className="bg-[#F00073] rounded-full p-2 text-white">
                <Instagram size={18} color="#fff" />
              </a>
              <a href="#" className="text-white bg-[#000] rounded-full p-2">
                <svg width="20" height="20" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    id="githab"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.4671 0.5C5.52607 0.5 0.707275 5.31879 0.707275 11.2598C0.707275 16.0126 3.80979 20.0392 8.03448 21.4915C8.56257 21.5575 8.7606 21.2274 8.7606 20.9634C8.7606 20.6993 8.7606 20.0392 8.7606 19.1151C5.79011 19.7752 5.13 17.6628 5.13 17.6628C4.66793 16.4086 3.94181 16.0786 3.94181 16.0786C2.95165 15.4185 4.00782 15.4185 4.00782 15.4185C5.06399 15.4845 5.65809 16.5406 5.65809 16.5406C6.64826 18.1909 8.16651 17.7288 8.7606 17.4648C8.82662 16.7387 9.15667 16.2766 9.42071 16.0126C7.04432 15.7485 4.53591 14.8244 4.53591 10.6657C4.53591 9.47748 4.93197 8.55333 5.65809 7.7612C5.59208 7.56316 5.19602 6.44098 5.79011 4.98874C5.79011 4.98874 6.71427 4.7247 8.7606 6.11092C9.61875 5.84688 10.5429 5.78087 11.4671 5.78087C12.3912 5.78087 13.3154 5.91289 14.1735 6.11092C16.2198 4.7247 17.144 4.98874 17.144 4.98874C17.7381 6.44098 17.342 7.56316 17.276 7.82721C17.9361 8.55333 18.3982 9.54349 18.3982 10.7317C18.3982 14.8904 15.8898 15.7485 13.5134 16.0126C13.9095 16.3426 14.2395 17.0027 14.2395 17.9929C14.2395 19.4451 14.2395 20.5673 14.2395 20.9634C14.2395 21.2274 14.4375 21.5575 14.9656 21.4915C19.2563 20.0392 22.2928 16.0126 22.2928 11.2598C22.2268 5.31879 17.408 0.5 11.4671 0.5Z"
                    fill="white"
                  />
                </svg>
              </a>
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

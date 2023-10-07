import React, { useState } from 'react';
import logo from '../../../../public/assets/shop/techverse_logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Button from '@ui/Button';
import MobileNav from '@modules/dashboard/component/MobileNav';

function ShopNavbar(props: { activePage: string; showDashBorad: boolean }) {
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle(!toggle);
    console.log('toggle', toggle);
  };
  const router = useRouter();
  const activeLink = (path: string) =>
    router.pathname === path
      ? 'text-green-950 group-hover:text-white text-base font-semibold  leading-normal tracking-tight'
      : 'text-gray-600 text-base font-semibold  leading-normal tracking-tight';

  return (
    <nav className="w-full py-6  bg-white-100 border-b border-[#EBEEEF] justify-between items-center px-4  z-[1] relative ">
      <div className="max-w-[1240px] mx-auto flex items-center justify-between  ">
        <div className=" flex gap-4">
          <Image className="object-contain" width={126} height={24} src={logo} alt="Zuri Portfolio Logo" />
        </div>

        {/* Right Items */}

        <div
          className={`flex items-center gap-4 lg:static absolute lg:flex-row flex-col ${
            toggle ? 'left-0' : 'left-[-100dvw]'
          }  bg-white-100 w-[100%] py-8 lg:py-0 lg:w-auto lg:opacity-100 transition-all ease-in-out duration-500 top-[9vh]   z-[1]`}
        >
          {/* Search Input */}
          <div className="max-w-[796px] h-auto lg:h-12 p-4 rounded-lg border border-neutral-200 justify-start items-center gap-3 flex lg:flex-row flex-col">
            <div className="grow shrink basis-0 h-6 justify-start items-center gap-2 flex lg:w-[45dvw] w-auto">
              <div className="w-4 h-4 justify-center items-center flex">
                <div className="w-4 h-4 relative">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                    <g>
                      <g stroke="#464646" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                        <path d="M7.667 14a6.333 6.333 0 100-12.667 6.333 6.333 0 000 12.667z"></path>
                        <path d="M14.667 14.667l-1.333-1.334"></path>
                      </g>
                    </g>
                  </svg>
                </div>
              </div>
              <input
                placeholder="Search"
                className="text-neutral-400 text-base font-normal leading-normal tracking-tight focus:border-0 focus:outline-none focus:ring-0 w-[100%]"
              />
            </div>
          </div>
          {/* Action Buttons */}
          <div className="w-[267px]  p-2 justify-center items-center gap-4 lg:flex-row flex flex-col mt-5  lg:mt-0">
            <div className="w-6 h-6 justify-center items-center flex  gap-2">
              <div className="w-6 h-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <g>
                    <g
                      stroke="#5B5F5E"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeMiterlimit="10"
                      strokeWidth="1.5"
                    >
                      <path d="M2 2h1.74c1.08 0 1.93.93 1.84 2l-.83 9.96a2.796 2.796 0 002.79 3.03h10.65c1.44 0 2.7-1.18 2.81-2.61l.54-7.5c.12-1.66-1.14-3.01-2.81-3.01H5.82"></path>
                      <path d="M16.25 22a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5z"></path>
                      <path d="M8.25 22a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5z"></path>
                      <path d="M9 8h12"></path>
                    </g>
                  </g>
                </svg>
              </div>
              <span className=" lg:hidden">Cart</span>
            </div>
          </div>
        </div>
        <MenuIcon toggle={toggle} style="lg:hidden" toggler={handleToggle} />
      </div>
    </nav>
  );
}

export default ShopNavbar;

function MenuIcon({ style, toggle, toggler }: { style?: string; toggle?: boolean; toggler: () => void }) {
  if (toggle) {
    // Close Icon
    return (
      <div className={`${style}`} onClick={toggler}>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 32 32">
          <g>
            <mask
              id="mask0_1327_22604"
              style={{ maskType: 'alpha' }}
              width="32"
              height="32"
              x="0"
              y="0"
              maskUnits="userSpaceOnUse"
            >
              <path fill="#D9D9D9" d="M0 0H32V32H0z"></path>
            </mask>
            <g mask="url(#mask0_1327_22604)">
              <path
                fill="#1C1B1F"
                d="M8.534 25.333l-1.867-1.866L14.134 16 6.667 8.533l1.867-1.866L16 14.133l7.467-7.466 1.867 1.866L17.867 16l7.467 7.467-1.867 1.866L16 17.867l-7.466 7.466z"
              ></path>
            </g>
          </g>
        </svg>
      </div>
    );
  }

  return (
    // Open Icon
    <div className={`${style}`} onClick={toggler}>
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 32 32">
        <g>
          <g fill="#000">
            <path d="M28 10.333H4c-.547 0-1-.453-1-1 0-.546.453-1 1-1h24c.547 0 1 .454 1 1 0 .547-.453 1-1 1z"></path>
            <path d="M28 17H4c-.547 0-1-.453-1-1 0-.547.453-1 1-1h24c.547 0 1 .453 1 1 0 .547-.453 1-1 1z"></path>
            <path d="M28 23.667H4c-.547 0-1-.454-1-1 0-.547.453-1 1-1h24c.547 0 1 .453 1 1 0 .546-.453 1-1 1z"></path>
          </g>
        </g>
      </svg>
    </div>
  );
}

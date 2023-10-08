import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import MobileNav from '@modules/dashboard/component/MobileNav';
import Button from '@ui/Button';
import logo from './assets/zuriLogo.svg';
import notificationIcon from './assets/notification.svg';
import documentUploadIcon from './assets/document-upload.svg';
import cartIcon from './assets/shopping-cart.svg';
import briefCaseIcon from './assets/briefcase.svg';
import errorBoxIcon from './assets/bx-error-alt.svg';
import dashBoard from './assets/home-2.svg';
import likesIcon from './assets/like-shapes.svg';
import settingsIcon from './assets/setting-2.svg';
import { Input, SelectInput } from '@ui/Input';
import { SearchNormal1 } from 'iconsax-react';

function TopBar(props: { activePage: string; showDashBorad: boolean }) {
  const [auth, setAuth] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [authMenu, setAuthMenu] = useState(false);
  const handleAuthMenu = () => {
    setAuthMenu(!authMenu);
  };

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
      <div className="max-w-[1240px] mx-auto flex items-center justify-between  relative gap-1">
        <div className=" flex max-w-[368px] lg:w-[100%] gap-14">
          <Link href={'/'}>
            <Image
              draggable={false}
              className="object-contain w-20 lg:w-auto "
              width={126}
              height={24}
              src={logo}
              alt="Zuri Portfolio Logo"
            />
          </Link>
          <div className=" hidden lg:flex gap-10 items-start">
            <div className="group h flex flex-col ali justify-center items-center gap-1">
              <Link className={activeLink('/')} href={'/'}>
                Explore
              </Link>
              {router.pathname === '/' ? <div className="w-6 h-0.5 bg-emerald-600 rounded-lg" /> : null}
            </div>
            <div className=" group flex flex-col ali justify-center items-center gap-1 ">
              <Link className={activeLink('/marketplace')} href={'/marketplace'}>
                Marketplace
              </Link>
              {router.pathname === '/marketplace' ? <div className="w-6 h-0.5 bg-emerald-600 rounded-lg" /> : null}
            </div>
          </div>
        </div>

        {/* Right Items */}

        <div
          className={`lg:flex hidden items-center gap-4   lg:flex-row flex-col  bg-white-100 w-[100%] py-8 lg:py-0 lg:w-auto lg:opacity-100 transition-all ease-in-out duration-500 top-[9vh]   z-[1]`}
        >
          {/* <Search></Search>

          Input */}
          <div className="max-w-[496px] h-auto lg:h-12 p-4 rounded-lg border border-neutral-200 justify-start items-center gap-3 flex lg:flex-row flex-col">
            <div className="grow shrink basis-0 h-6 justify-start items-center gap-2 flex lg:w-[20dvw] w-auto">
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
            <div className="justify-start items-center gap-4 flex ">
              <label
                htmlFor="explore"
                className="justify-start items-center gap-2 flex lg:border-l-2 border-neutral-200 pl-4 relative"
              >
                <select
                  id="explore"
                  className="text-zinc-900 text-base font-normal background-transparent pr-7 leading-normal tracking-tight appearance-none focus:border-0 focus:outline-none focus:ring-0
                  bg-opacity-0 hover:cursor-pointer "
                >
                  <option className="hover:cursor-pointer hover:bg-orange-800">Explore</option>
                  <option className="hover:cursor-pointer hover:bg-orange-800">Marketplace</option>
                </select>
                <div className="w-6 h-6 justify-center items-center flex absolute right-0 pointer-events-none">
                  <div className="w-6 h-6  ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <g>
                        <g>
                          <path
                            fill="#8D9290"
                            d="M12 16.8c-.7 0-1.4-.27-1.93-.8L3.55 9.48a.754.754 0 010-1.06c.29-.29.77-.29 1.06 0l6.52 6.52c.48.48 1.26.48 1.74 0l6.52-6.52c.29-.29.77-.29 1.06 0 .29.29.29.77 0 1.06L13.93 16c-.53.53-1.23.8-1.93.8z"
                          ></path>
                        </g>
                      </g>
                    </svg>
                  </div>
                </div>
              </label>
            </div>
          </div>
          {/* Action Buttons */}
          {auth || (
            <div className=" p-2 justify-center items-center gap-4 lg:flex-row flex flex-col mt-5  lg:mt-0">
              <Cart items={6} />
              <div className="justify-center hidden items-center lg:w-auto w-[100%] gap-2 lg:flex-row lg:flex flex-col">
                <Button
                  href="/auth/login"
                  className="rounded-lg py-3 px-6 border-0 bg-green-50 bg-opacity-50"
                  intent={'secondary'}
                  size={'md'}
                >
                  Sign In
                </Button>

                <Button href="/auth/signup" className="rounded-lg px-6 py-3" intent={'primary'} size={'md'}>
                  Sign Up
                </Button>
              </div>
            </div>
          )}
          {auth && AuthUser()}
        </div>
        {authMenu && (
          <div className="absolute flex flex-col right-0 top-[73px] bg-white-100 shadow-lg">
            <ul>
              <li className="border-b cursor-pointer hover:bg-[#F4FBF6] border-[#EBEEEF] py-3 px-4 flex gap-3">
                <div className="w-10 h-10 relative bg-gray-400 rounded-[100px]" />
                <div className="flex flex-col gap-[2px]">
                  <h3 className="font-bold ">John Doe</h3>
                  <p>View Live Profile</p>
                </div>
              </li>
              <li className="border-b cursor-pointer hover:bg-[#F4FBF6] border-[#EBEEEF] py-5 px-4 flex gap-6 ">
                <Image draggable={false} src={cartIcon} alt="cart icon" />
                <p>Your Shop</p>
              </li>
              <li className="border-b cursor-pointer hover:bg-[#F4FBF6] border-[#EBEEEF] py-5 px-4 flex gap-6 ">
                <Image draggable={false} src={dashBoard} alt="dashboard" />
                <p>Customer Dashboard</p>
              </li>
              <li className=" border-[#EBEEEF] cursor-pointer hover:bg-[#F4FBF6] py-5 px-4 flex gap-6 ">
                <Image draggable={false} src={briefCaseIcon} alt="Briefcase icon" />
                <p>Manage Portfolio</p>
              </li>
              <li className="border-b cursor-pointer hover:bg-[#F4FBF6] border-[#EBEEEF] py-5 px-4 flex gap-6 ">
                <Image draggable={false} src={likesIcon} alt="Like" />
                <p>Assessments & Badges</p>
              </li>
              <li className=" border-[#EBEEEF] cursor-pointer hover:bg-[#F4FBF6] py-5 px-4 flex gap-6 ">
                <Image draggable={false} src={settingsIcon} alt="Setting" />
                <p>Settings</p>
              </li>
              <li className="border-b cursor-pointer hover:bg-[#F4FBF6] border-[#EBEEEF] py-5 px-4 flex gap-6 text-[#FF2E2E]">
                <Image draggable={false} src={errorBoxIcon} alt="SignOut" />
                <p>Sign Out</p>
              </li>
            </ul>
          </div>
        )}
        <div className="flex items-center ">
          {auth && (
            <div className="lg:hidden flex items-center gap-1 ">
              <div className="flex gap-1">
                <span>
                  <Image draggable={false} src={documentUploadIcon} alt="document upload icon" />
                </span>
                <Cart items={6} />
                <span>
                  <Image draggable={false} src={notificationIcon} alt="notification icon" />
                </span>
              </div>
              <div className="auth flex items-center scale-75 gap-1 cursor-pointer" onClick={handleAuthMenu}>
                <div className="details ">
                  <p className=" font-bold text-sm">John Doe</p>
                  <p className="text-xs ">Zuri Team</p>
                </div>
                <div className="w-6 h-6 aspect-square relative bg-gray-400 rounded-[100px]" />
              </div>
            </div>
          )}
          {!auth && (
            <Cart2
              items={6}
              style={{
                marginRight: '20px',
              }}
            />
          )}
          <MenuIcon toggle={toggle} style="lg:hidden" toggler={handleToggle} />
        </div>
      </div>
      <MenuUI
        authMenu={authMenu}
        cart={6}
        toggle={toggle}
        toggler={handleToggle}
        handleAuthMenu={handleAuthMenu}
        auth={auth}
      />
    </nav>
  );

  function AuthUser(): React.ReactNode {
    return (
      <>
        <span>
          <Image draggable={false} src={documentUploadIcon} alt="document upload icon" />
        </span>

        <Cart items={6} />
        <span>
          <Image draggable={false} src={notificationIcon} alt="notification icon" />
        </span>
        <div className="auth flex items-center gap-3 cursor-pointer" onClick={handleAuthMenu}>
          <div className="details">
            <p className=" font-bold">John Doe</p>
            <p className="text-sm ">Zuri Team</p>
          </div>
          <div className="w-10 h-10 relative bg-gray-400 rounded-[100px]" />
        </div>
      </>
    );
  }
}

export default TopBar;

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

function MenuUI({
  toggle,
  toggler,
  style,
  cart,
  auth,
  handleAuthMenu,
  authMenu,
}: {
  toggle?: boolean;
  toggler: () => void;
  style?: string;
  cart?: number;
  auth?: boolean;
  handleAuthMenu: () => void;
  authMenu?: boolean;
}) {
  const router = useRouter();
  const activeLink = (path: string) =>
    router.pathname === path
      ? 'text-green-950 group-hover:text-white text-base font-semibold  leading-normal tracking-tight'
      : 'text-gray-600 text-base font-semibold  leading-normal tracking-tight';

  // JSX Return
  return (
    <nav
      className={`menu lg:hidden bg-white-100 min-h-[100dvh] absolute top-0 left-0 right-0 ${
        toggle ? 'left-0' : 'left-[-300dvw] hidden'
      }`}
    >
      <div className="flex justify-between px-4 py-6 border-[#EBEEEF] border-b-[1px] ">
        <Image className="object-contain" width={126} height={24} src={logo} alt="Zuri Portfolio Logo" />

        <MenuIcon toggle={toggle} style="lg:hidden" toggler={toggler} />
      </div>
      <ul className="p-4 flex gap-4 flex-col items-center">
        <Input placeHolder="Search" leftIcon={<SearchNormal1 size="20" color="#464646" />} />
        <SelectInput
          placeholder="Explore"
          className=""
          size={1}
          options={[
            {
              value: 'helpme2',
              label: 'Explore',
            },
            {
              value: 'helpme',
              label: 'Market place',
            },
          ]}
          disabled={false}
          intent="default"
          onChange={(e) => {
            console.log(e.target.value);
          }}
        />

        <li className=" flex flex-col lg:hidden gap-5 ">
          <div className="group h flex flex-col ali justify-center items-center gap-1">
            <Link className={activeLink('/')} href={'/'}>
              Explore
            </Link>
            {router.pathname === '/' ? <div className="w-6 h-0.5 bg-emerald-600 rounded-lg" /> : null}
          </div>
          <div className=" group flex flex-col ali justify-center items-center gap-1 ">
            <Link className={activeLink('/marketplace')} href={'/marketplace'}>
              Marketplace
            </Link>
            {router.pathname === '/marketplace' ? <div className="w-6 h-0.5 bg-emerald-600 rounded-lg" /> : null}
          </div>
        </li>
        {!auth && (
          <>
            <Button
              href="/auth/login"
              className="rounded-lg border-0 bg-green-50 bg-opacity-50 w-[100%] max-w-sm"
              intent={'secondary'}
              size={'md'}
            >
              Sign In
            </Button>
            <Button href="/auth/signup" className="rounded-lg w-[100%] max-w-sm" intent={'primary'} size={'md'}>
              Sign Up
            </Button>
          </>
        )}
      </ul>
    </nav>
  );
}

function Cart({ items, style }: { items?: number; style?: {} }) {
  return (
    <Link style={style} href={'/marketplace/cart'} className="w-6 h-6 justify-center items-center flex  gap-2">
      <div className="w-6 h-6 relative">
        {items && (
          <span className="text-[#fff] text-[8px] font-bold  leading-3 tracking-tight w-3 h-3 px-1 absolute bg-emerald-600 rounded-[80px] flex-col justify-center items-center gap-2.5 inline-flex top-[-4px] left-[-2px]">
            {items}
          </span>
        )}

        <Image src={cartIcon} draggable={false} objectFit="contain" width={24} height={24} alt="Cart Icon" />
      </div>
      {/* <span className=" lg:hidden">Cart</span> */}
    </Link>
  );
}

function Cart2({ items, style }: { items?: number; style?: {} }) {
  return (
    <Link style={style} href={'/marketplace/cart'} className="w-6 h-6 justify-center items-center flex  gap-2">
      <div className="w-6 h-6 relative lg:hidden">
        {items && (
          <span className="text-[#fff] text-[8px] font-bold  leading-3 tracking-tight w-3 h-3 px-1 absolute bg-emerald-600 rounded-[80px] flex-col justify-center items-center gap-2.5 inline-flex top-[-4px] left-[-2px]">
            {items}
          </span>
        )}

        <Image src={cartIcon} draggable={false} objectFit="contain" width={24} height={24} alt="Cart Icon" />
      </div>
      {/* <span className=" lg:hidden">Cart</span> */}
    </Link>
  );
}

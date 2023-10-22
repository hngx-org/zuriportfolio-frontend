import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Button from '@ui/Button';
import notificationIcon from './assets/notification.svg';
import cartIcon from './assets/shopping-cart.svg';
import briefCaseIcon from './assets/briefcase.svg';
import dashBoard from './assets/home-2.svg';
import likesIcon from './assets/like-shapes.svg';
import settingsIcon from './assets/setting-2.svg';
import { Input, SelectInput } from '@ui/Input';
import { SearchNormal1, UserSquare } from 'iconsax-react';
import MobileNav from '@modules/dashboard/component/MobileNav';
import { CartItemProps, ProductResult } from '../../@types';
import { useAuth } from '../../context/AuthContext';
import isAuthenticated from '../../helpers/isAuthenticated';
import Logout, { MobileLogout } from '@modules/auth/component/logout/Logout';
import CustomDropdown from '@modules/explore/components/CustomDropdown';
import useUserSession from '../../hooks/Auth/useUserSession';
import { getUserCart } from '../../http/checkout';
import { useCart } from '@modules/shop/component/CartContext';
import { toast } from 'react-toastify';
import Notifications from '../Modals/Notifications';
import axios from 'axios';

function TopBar(props: { activePage: string; showDashBorad: boolean }) {
  // change auth to True to see Auth User Header
  const { auth: globalAuth } = useAuth();
  const { signIn, signUp } = useUserSession();
  const [auth, setAuth] = useState(false);
  const authMenuRef = useRef<HTMLDivElement | null>(null);
  const notificationsRef = useRef<HTMLDivElement | null>(null);
  const searchRef1 = useRef<HTMLDivElement | null>(null);
  const searchRef2 = useRef<HTMLDivElement | null>(null);
  const [searchMobile, setSearchMobile] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [authMenu, setAuthMenu] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [notificationMenu, setNotificationMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [dropDown, setDropDown] = useState<string>('Explore');
  const { cartCount, setCartCountNav } = useCart();
  const [shopId, setShopId] = useState('');
  useEffect(() => {
    async function cartFetch() {
      let carts;
      let token = localStorage.getItem('zpt') as string;

      if (token) {
        carts = await getUserCart(token as string);
      } else {
        carts = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products') as string) : [];
      }
      setCartCountNav(carts.length);
    }
    cartFetch();
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);
  const getShopId = async () => {
    try {
      const { data } = await axios.get('https://zuriportfolio-shop-internal-api.onrender.com/api/v1/shops/merchant', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('zpt')}`,
        },
      });

      setShopId(data?.data.id);
    } catch (error) {}
  };
  const handleAuthMenu = () => {
    setAuthMenu(!authMenu);
  };
  const handleClose = () => {};
  const handleToggle = () => {
    setToggle(!toggle);
  };
  const router = useRouter();
  const activeLink = (path: string) =>
    router.pathname === path
      ? 'text-green-950 group-hover:text-white text-base font-semibold  leading-normal tracking-tight'
      : 'text-gray-600 text-base font-semibold  leading-normal tracking-tight';

  useEffect(() => {
    const token = localStorage.getItem('zpt');
    const isLoggedIn = isAuthenticated(token as string);
    if (isLoggedIn) {
      setAuth(true);
      getShopId();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const targetNode = event.target as Node | null;
      if (authMenuRef.current && !authMenuRef.current.contains(targetNode)) {
        setAuthMenu(false);
      }
      if (searchRef1.current && !searchRef1.current.contains(targetNode)) {
        setSearchMobile(false);
      }
      if (searchRef2.current && !searchRef2.current.contains(targetNode)) {
        setToggle(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(targetNode)) {
        console.log(notificationsRef.current);
        setNotificationMenu(false);
      }
    }

    if (authMenu || searchMobile || toggle || notificationMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [authMenu, searchMobile, toggle, notificationMenu]);

  const handleSearch = async (e: React.KeyboardEvent) => {
    e.preventDefault();
    if (e.key === 'Enter') {
      if (searchQuery.trim() === '') {
        toast.error('A search term must be provided.');
      } else {
        if (dropDown === 'Marketplace') {
          router.push(`/marketplace/search?q=${searchQuery}`);
        }
        if (dropDown === 'Explore') {
          localStorage.setItem('searchQuery', searchQuery);
          router.push(`/explore/search?searchQuery=${searchQuery}`);
        }
      }
    }
  };

  function handleDropdown(option: string) {
    setDropDown(option);
  }

  const handleNotificationsToggle = () => {
    setNotificationMenu(!notificationMenu);
  };

  return (
    <>
      <nav className="w-full py-6  bg-white-100 border-b border-[#EBEEEF] justify-between items-center px-4  z-[40]  isolate sticky top-0  ">
        <div className="max-w-[1240px] mx-auto flex items-center justify-between  relative gap-1">
          <div className=" flex lg:max-w-[368px] max-w-none lg:w-[100%] lg:gap-14 gap-6">
            <div className="flex items-center gap-1">
              {auth && (
                <>
                  <MenuIcon toggle={toggle} style="lg:hidden" toggler={handleToggle} />
                  <Link className="sm:flex hidden" href={'/'}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="126" height="24" fill="none" viewBox="0 0 126 24">
                      <path
                        fill="#009254"
                        d="M18.056 2H1.945A1.945 1.945 0 000 3.944v16.112A1.944 1.944 0 001.945 22h16.111a1.945 1.945 0 001.945-1.944V3.944A1.945 1.945 0 0018.056 2zm-2.402 12.008v1.484a.627.627 0 01-.548.56H6.732c-.62 0-1.148-.2-1.585-.598-.437-.4-.655-.883-.655-1.45 0-.452.148-.854.443-1.208.295-.352.67-.598 1.122-.737l7.318-2.091H4.492V8.552a.629.629 0 01.495-.605h8.427c.62 0 1.148.199 1.585.594.437.397.655.87.655 1.42 0 .46-.149.865-.446 1.215-.298.35-.68.595-1.149.732l-7.327 2.1h8.922zM28.321 18v-.264l4.576-6.688h-4.112V9.36h7.112v.272l-4.56 6.68h4.368V18h-7.384zm12.651.248c-.64 0-1.168-.107-1.584-.32a2.797 2.797 0 01-.992-.816 3.555 3.555 0 01-.544-1.056A5.66 5.66 0 0137.62 15a8.993 8.993 0 01-.048-.816V9.36h1.952v4.16c0 .267.019.568.056.904.038.33.123.65.256.96.139.304.342.555.608.752.272.197.638.296 1.096.296.246 0 .488-.04.728-.12.24-.08.456-.216.648-.408.198-.197.355-.467.472-.808.118-.341.176-.773.176-1.296l1.144.488c0 .736-.144 1.403-.432 2a3.401 3.401 0 01-1.256 1.432c-.554.352-1.237.528-2.048.528zM43.796 18v-2.68h-.232V9.36H45.5V18h-1.704zm4.032 0V9.36h1.704v2.104l-.208-.272a3.08 3.08 0 01.424-.784 2.36 2.36 0 01.648-.592c.213-.144.448-.256.704-.336.261-.085.528-.136.8-.152.272-.021.536-.01.792.032v1.8a2.472 2.472 0 00-.888-.072c-.33.027-.63.12-.896.28a2.013 2.013 0 00-.656.552c-.166.224-.288.48-.368.768-.08.283-.12.59-.12.92V18h-1.936zm6.63-9.952V6.28h1.928v1.768h-1.928zm0 9.952V9.36h1.928V18h-1.928zm8.557.24c-.843 0-1.55-.2-2.12-.6-.57-.4-1-.944-1.288-1.632-.288-.693-.432-1.47-.432-2.328 0-.87.144-1.648.432-2.336.288-.688.71-1.23 1.264-1.624.56-.4 1.25-.6 2.072-.6.816 0 1.523.2 2.12.6a3.93 3.93 0 011.4 1.624c.33.683.496 1.461.496 2.336 0 .864-.163 1.64-.488 2.328a3.972 3.972 0 01-1.376 1.632c-.592.4-1.285.6-2.08.6zm-4.168 3.6V9.36h1.704v6.064h.24v6.416h-1.944zm3.872-5.328c.501 0 .914-.125 1.24-.376.325-.25.565-.59.72-1.016.16-.432.24-.912.24-1.44 0-.523-.08-.997-.24-1.424a2.19 2.19 0 00-.744-1.024c-.336-.256-.763-.384-1.28-.384-.49 0-.89.12-1.2.36-.31.235-.539.565-.688.992-.144.421-.216.915-.216 1.48 0 .56.072 1.053.216 1.48.15.427.381.76.696 1 .32.235.739.352 1.256.352zm9.9 1.728c-.865 0-1.62-.195-2.265-.584a4.012 4.012 0 01-1.504-1.608c-.352-.688-.528-1.477-.528-2.368 0-.907.182-1.701.544-2.384a4.011 4.011 0 011.512-1.6c.646-.384 1.392-.576 2.24-.576.87 0 1.627.195 2.272.584.646.39 1.147.928 1.504 1.616.358.683.536 1.47.536 2.36 0 .896-.181 1.688-.544 2.376a4.01 4.01 0 01-1.504 1.608c-.645.384-1.4.576-2.264.576zm0-1.808c.767 0 1.338-.256 1.711-.768.374-.512.56-1.173.56-1.984 0-.837-.19-1.504-.568-2-.378-.501-.946-.752-1.704-.752-.517 0-.944.117-1.28.352-.33.23-.576.552-.736.968-.16.41-.24.888-.24 1.432 0 .837.19 1.507.568 2.008.384.496.947.744 1.688.744zM78.772 18V9.36h1.704v2.104l-.208-.272a3.08 3.08 0 01.424-.784 2.36 2.36 0 01.648-.592c.213-.144.448-.256.704-.336.261-.085.528-.136.8-.152.272-.021.536-.01.792.032v1.8a2.472 2.472 0 00-.888-.072c-.33.027-.63.12-.896.28a2.013 2.013 0 00-.656.552c-.166.224-.288.48-.368.768-.08.283-.12.59-.12.92V18h-1.936zm11.535 0c-.571.107-1.131.152-1.68.136a3.85 3.85 0 01-1.465-.296 2.029 2.029 0 01-.983-.904 2.575 2.575 0 01-.313-1.144c-.01-.39-.016-.83-.016-1.32V6.96h1.92v7.4c0 .347.003.65.008.912.011.261.067.475.169.64.192.32.498.499.92.536.42.037.9.016 1.44-.064V18zm-6.025-7.128V9.36h6.025v1.512h-6.025zM92.998 18V9.224c0-.219.008-.459.024-.72.016-.267.062-.53.136-.792.075-.261.211-.499.408-.712.246-.272.51-.459.792-.56.288-.107.571-.165.848-.176.278-.016.52-.024.728-.024h1.08v1.568h-1c-.368 0-.642.093-.824.28-.176.181-.264.421-.264.72V18h-1.928zm-1.392-7.128V9.36h5.408v1.512h-5.408zm10.271 7.368c-.864 0-1.619-.195-2.264-.584a4.012 4.012 0 01-1.504-1.608c-.352-.688-.528-1.477-.528-2.368 0-.907.181-1.701.544-2.384a4.011 4.011 0 011.512-1.6c.645-.384 1.392-.576 2.24-.576.869 0 1.626.195 2.272.584.645.39 1.146.928 1.504 1.616.357.683.536 1.47.536 2.36 0 .896-.182 1.688-.544 2.376a4.018 4.018 0 01-1.504 1.608c-.646.384-1.4.576-2.264.576zm0-1.808c.768 0 1.338-.256 1.712-.768.373-.512.56-1.173.56-1.984 0-.837-.19-1.504-.568-2-.379-.501-.947-.752-1.704-.752-.518 0-.944.117-1.28.352-.331.23-.576.552-.736.968-.16.41-.24.888-.24 1.432 0 .837.19 1.507.568 2.008.384.496.946.744 1.688.744zM108.19 18V6.24h1.928V18h-1.928zm4.565-9.952V6.28h1.928v1.768h-1.928zm0 9.952V9.36h1.928V18h-1.928zm8.22.24c-.864 0-1.619-.195-2.264-.584a4.01 4.01 0 01-1.504-1.608c-.352-.688-.528-1.477-.528-2.368 0-.907.181-1.701.544-2.384a4.015 4.015 0 011.512-1.6c.645-.384 1.392-.576 2.24-.576.869 0 1.627.195 2.272.584.645.39 1.147.928 1.504 1.616.357.683.536 1.47.536 2.36 0 .896-.181 1.688-.544 2.376a4.01 4.01 0 01-1.504 1.608c-.645.384-1.4.576-2.264.576zm0-1.808c.768 0 1.339-.256 1.712-.768s.56-1.173.56-1.984c0-.837-.189-1.504-.568-2-.379-.501-.947-.752-1.704-.752-.517 0-.944.117-1.28.352-.331.23-.576.552-.736.968-.16.41-.24.888-.24 1.432 0 .837.189 1.507.568 2.008.384.496.947.744 1.688.744z"
                      ></path>
                    </svg>
                  </Link>
                </>
              )}
              {!auth && (
                <Link className="flex" href={'/'}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="126" height="24" fill="none" viewBox="0 0 126 24">
                    <path
                      fill="#009254"
                      d="M18.056 2H1.945A1.945 1.945 0 000 3.944v16.112A1.944 1.944 0 001.945 22h16.111a1.945 1.945 0 001.945-1.944V3.944A1.945 1.945 0 0018.056 2zm-2.402 12.008v1.484a.627.627 0 01-.548.56H6.732c-.62 0-1.148-.2-1.585-.598-.437-.4-.655-.883-.655-1.45 0-.452.148-.854.443-1.208.295-.352.67-.598 1.122-.737l7.318-2.091H4.492V8.552a.629.629 0 01.495-.605h8.427c.62 0 1.148.199 1.585.594.437.397.655.87.655 1.42 0 .46-.149.865-.446 1.215-.298.35-.68.595-1.149.732l-7.327 2.1h8.922zM28.321 18v-.264l4.576-6.688h-4.112V9.36h7.112v.272l-4.56 6.68h4.368V18h-7.384zm12.651.248c-.64 0-1.168-.107-1.584-.32a2.797 2.797 0 01-.992-.816 3.555 3.555 0 01-.544-1.056A5.66 5.66 0 0137.62 15a8.993 8.993 0 01-.048-.816V9.36h1.952v4.16c0 .267.019.568.056.904.038.33.123.65.256.96.139.304.342.555.608.752.272.197.638.296 1.096.296.246 0 .488-.04.728-.12.24-.08.456-.216.648-.408.198-.197.355-.467.472-.808.118-.341.176-.773.176-1.296l1.144.488c0 .736-.144 1.403-.432 2a3.401 3.401 0 01-1.256 1.432c-.554.352-1.237.528-2.048.528zM43.796 18v-2.68h-.232V9.36H45.5V18h-1.704zm4.032 0V9.36h1.704v2.104l-.208-.272a3.08 3.08 0 01.424-.784 2.36 2.36 0 01.648-.592c.213-.144.448-.256.704-.336.261-.085.528-.136.8-.152.272-.021.536-.01.792.032v1.8a2.472 2.472 0 00-.888-.072c-.33.027-.63.12-.896.28a2.013 2.013 0 00-.656.552c-.166.224-.288.48-.368.768-.08.283-.12.59-.12.92V18h-1.936zm6.63-9.952V6.28h1.928v1.768h-1.928zm0 9.952V9.36h1.928V18h-1.928zm8.557.24c-.843 0-1.55-.2-2.12-.6-.57-.4-1-.944-1.288-1.632-.288-.693-.432-1.47-.432-2.328 0-.87.144-1.648.432-2.336.288-.688.71-1.23 1.264-1.624.56-.4 1.25-.6 2.072-.6.816 0 1.523.2 2.12.6a3.93 3.93 0 011.4 1.624c.33.683.496 1.461.496 2.336 0 .864-.163 1.64-.488 2.328a3.972 3.972 0 01-1.376 1.632c-.592.4-1.285.6-2.08.6zm-4.168 3.6V9.36h1.704v6.064h.24v6.416h-1.944zm3.872-5.328c.501 0 .914-.125 1.24-.376.325-.25.565-.59.72-1.016.16-.432.24-.912.24-1.44 0-.523-.08-.997-.24-1.424a2.19 2.19 0 00-.744-1.024c-.336-.256-.763-.384-1.28-.384-.49 0-.89.12-1.2.36-.31.235-.539.565-.688.992-.144.421-.216.915-.216 1.48 0 .56.072 1.053.216 1.48.15.427.381.76.696 1 .32.235.739.352 1.256.352zm9.9 1.728c-.865 0-1.62-.195-2.265-.584a4.012 4.012 0 01-1.504-1.608c-.352-.688-.528-1.477-.528-2.368 0-.907.182-1.701.544-2.384a4.011 4.011 0 011.512-1.6c.646-.384 1.392-.576 2.24-.576.87 0 1.627.195 2.272.584.646.39 1.147.928 1.504 1.616.358.683.536 1.47.536 2.36 0 .896-.181 1.688-.544 2.376a4.01 4.01 0 01-1.504 1.608c-.645.384-1.4.576-2.264.576zm0-1.808c.767 0 1.338-.256 1.711-.768.374-.512.56-1.173.56-1.984 0-.837-.19-1.504-.568-2-.378-.501-.946-.752-1.704-.752-.517 0-.944.117-1.28.352-.33.23-.576.552-.736.968-.16.41-.24.888-.24 1.432 0 .837.19 1.507.568 2.008.384.496.947.744 1.688.744zM78.772 18V9.36h1.704v2.104l-.208-.272a3.08 3.08 0 01.424-.784 2.36 2.36 0 01.648-.592c.213-.144.448-.256.704-.336.261-.085.528-.136.8-.152.272-.021.536-.01.792.032v1.8a2.472 2.472 0 00-.888-.072c-.33.027-.63.12-.896.28a2.013 2.013 0 00-.656.552c-.166.224-.288.48-.368.768-.08.283-.12.59-.12.92V18h-1.936zm11.535 0c-.571.107-1.131.152-1.68.136a3.85 3.85 0 01-1.465-.296 2.029 2.029 0 01-.983-.904 2.575 2.575 0 01-.313-1.144c-.01-.39-.016-.83-.016-1.32V6.96h1.92v7.4c0 .347.003.65.008.912.011.261.067.475.169.64.192.32.498.499.92.536.42.037.9.016 1.44-.064V18zm-6.025-7.128V9.36h6.025v1.512h-6.025zM92.998 18V9.224c0-.219.008-.459.024-.72.016-.267.062-.53.136-.792.075-.261.211-.499.408-.712.246-.272.51-.459.792-.56.288-.107.571-.165.848-.176.278-.016.52-.024.728-.024h1.08v1.568h-1c-.368 0-.642.093-.824.28-.176.181-.264.421-.264.72V18h-1.928zm-1.392-7.128V9.36h5.408v1.512h-5.408zm10.271 7.368c-.864 0-1.619-.195-2.264-.584a4.012 4.012 0 01-1.504-1.608c-.352-.688-.528-1.477-.528-2.368 0-.907.181-1.701.544-2.384a4.011 4.011 0 011.512-1.6c.645-.384 1.392-.576 2.24-.576.869 0 1.626.195 2.272.584.645.39 1.146.928 1.504 1.616.357.683.536 1.47.536 2.36 0 .896-.182 1.688-.544 2.376a4.018 4.018 0 01-1.504 1.608c-.646.384-1.4.576-2.264.576zm0-1.808c.768 0 1.338-.256 1.712-.768.373-.512.56-1.173.56-1.984 0-.837-.19-1.504-.568-2-.379-.501-.947-.752-1.704-.752-.518 0-.944.117-1.28.352-.331.23-.576.552-.736.968-.16.41-.24.888-.24 1.432 0 .837.19 1.507.568 2.008.384.496.946.744 1.688.744zM108.19 18V6.24h1.928V18h-1.928zm4.565-9.952V6.28h1.928v1.768h-1.928zm0 9.952V9.36h1.928V18h-1.928zm8.22.24c-.864 0-1.619-.195-2.264-.584a4.01 4.01 0 01-1.504-1.608c-.352-.688-.528-1.477-.528-2.368 0-.907.181-1.701.544-2.384a4.015 4.015 0 011.512-1.6c.645-.384 1.392-.576 2.24-.576.869 0 1.627.195 2.272.584.645.39 1.147.928 1.504 1.616.357.683.536 1.47.536 2.36 0 .896-.181 1.688-.544 2.376a4.01 4.01 0 01-1.504 1.608c-.645.384-1.4.576-2.264.576zm0-1.808c.768 0 1.339-.256 1.712-.768s.56-1.173.56-1.984c0-.837-.189-1.504-.568-2-.379-.501-.947-.752-1.704-.752-.517 0-.944.117-1.28.352-.331.23-.576.552-.736.968-.16.41-.24.888-.24 1.432 0 .837.189 1.507.568 2.008.384.496.947.744 1.688.744z"
                    ></path>
                  </svg>
                </Link>
              )}
            </div>
            <div className=" hidden lg:flex gap-10 items-start">
              <div className="group h flex flex-col ali justify-center items-center gap-1">
                <Link className={activeLink('/explore')} href={'/explore'}>
                  Explore
                </Link>
                {router.pathname === '/explore' ? <div className="w-6 h-0.5 bg-emerald-600 rounded-lg" /> : null}
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
            className={`lg:flex hidden items-center gap-4  lg:flex-row flex-col  bg-white-100 w-[100%] py-8 lg:py-0 lg:justify-end lg:opacity-100 transition-all ease-in-out duration-500 top-[9vh]   z-[1]`}
          >
            <div className="max-w-[53%] h-auto lg:h-12 p-4 rounded-lg border border-neutral-200 justify-start items-center gap-3 flex lg:flex-row flex-col basis-[100%]">
              <div className="grow shrink basis-0 h-6 justify-start items-center gap-2 flex lg:w-full w-auto">
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
                  value={searchQuery}
                  onKeyUp={handleSearch}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search"
                  className="placeholder:text-neutral-400 text-gray-900 text-base font-normal leading-normal tracking-tight focus:border-0 focus:outline-none focus:ring-0 w-[100%] font-manropeL"
                />
              </div>
              <div className="justify-start items-center gap-4 flex ">
                <label
                  htmlFor="explore"
                  className="justify-start items-center gap-2 flex lg:border-l-2 border-neutral-200 pl-4 relative"
                >
                  <CustomDropdown
                    selectedValue={dropDown}
                    onChange={handleDropdown}
                    placeholder="Explore"
                    options={['Explore', 'Marketplace']}
                    className="border-none"
                  />
                </label>
              </div>
            </div>
            {/* Action Buttons */}
            {!globalAuth && (
              <div className=" p-2 justify-center relative items-center gap-4 lg:flex-row flex flex-col mt-5  lg:mt-0">
                <Cart items={cartCount} />
                
                
        


{/* {notificationMenu && 
<div className="absolute z-[300000] mt-4 w-fit" ref={notificationsRef}>

<Notifications notificationsRef={notificationsRef}  unreadNotifications={setUnreadNotifications}/> 
</div>
 } */}
                <div className="justify-center hidden items-center lg:w-auto w-[100%] gap-2 lg:flex-row lg:flex flex-col">
                  <Button
                    href="/auth/login"
                    onClick={signIn}
                    className="rounded-lg py-3 px-6 border-0 bg-green-50 bg-opacity-50"
                    intent={'secondary'}
                    size={'md'}
                  >
                    Sign In
                  </Button>

                  <Button
                    href="/auth/signup"
                    onClick={signUp}
                    className="rounded-lg px-6 py-3"
                    intent={'primary'}
                    size={'md'}
                  >
                    Sign Up
                  </Button>
                </div>
              </div>
            )}
            {globalAuth && AuthUser()}
          </div>
          {authMenu && (
            <div
              ref={authMenuRef}
              className="absolute hidden lg:flex flex-col right-0 lg:top-[71px] top-[60px] bg-white-100 shadow-lg z-[60]"
            >
              <ul>
                <li className="border-b cursor-pointer hover:bg-[#F4FBF6] border-[#EBEEEF] py-3 px-4 flex gap-3">
                  <UserSquare size="32" color="#555555" />{' '}
                  <div className="flex flex-col gap-[2px]">
                    <h3 className="font-bold font-manropeEB">
                      {globalAuth?.user?.firstName} {globalAuth?.user?.lastName}
                    </h3>
                    <p className="font-manropeL">View Live Profile</p>
                  </div>
                </li>
                {shopId && (
                  <Link
                    onClick={handleAuthMenu}
                    href={`/shop?shop_id=${shopId}`}
                    className="border-b cursor-pointer hover:bg-[#F4FBF6] border-[#EBEEEF] py-5 px-4 flex gap-6 "
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <g>
                        <g
                          stroke="#8D9290"
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
                    <p className="font-manropeL">Your Shop</p>
                  </Link>
                )}
                <Link
                  onClick={handleAuthMenu}
                  href="/dashboard"
                  className="border-b cursor-pointer hover:bg-[#F4FBF6] border-[#EBEEEF] py-5 px-4 flex gap-6 "
                >
                  <Image draggable={false} src={dashBoard} alt="dashboard" />
                  <p className="font-manropeL">Customer Dashboard</p>
                </Link>
                <Link
                  onClick={handleAuthMenu}
                  href="/user/customer-purchase-dashboard"
                  className=" border-[#EBEEEF] cursor-pointer hover:bg-[#F4FBF6] py-5 px-4 flex gap-6 "
                >
                  <Image draggable={false} src={dashBoard} alt="Setting" />
                  <p className="font-manropeL">Customer Purchase Dashboard</p>
                </Link>
                <Link
                  onClick={handleAuthMenu}
                  href={`/portfolio/${globalAuth?.user?.slug}/manage`}
                  className=" border-[#EBEEEF] cursor-pointer hover:bg-[#F4FBF6] py-5 px-4 flex gap-6 "
                >
                  <Image draggable={false} src={briefCaseIcon} alt="Briefcase icon" />
                  <p className="font-manropeL">Manage Portfolio</p>
                </Link>
                <Link
                  onClick={handleAuthMenu}
                  href="/assessments/dashboard"
                  className="border-b cursor-pointer hover:bg-[#F4FBF6] border-[#EBEEEF] py-5 px-4 flex gap-6 "
                >
                  <Image draggable={false} src={likesIcon} alt="Like" />
                  <p className="font-manropeL">Assessments & Badges</p>
                </Link>
                <Link
                  onClick={handleAuthMenu}
                  href="/settings"
                  className=" border-[#EBEEEF] cursor-pointer hover:bg-[#F4FBF6] py-5 px-4 flex gap-6 "
                >
                  <Image draggable={false} src={settingsIcon} alt="Setting" />
                  <p className="font-manropeL">Settings</p>
                </Link>

                {/* Import Logout button */}
                <div className="font-manropeL" onClick={handleAuthMenu}>
                  <Logout />
                </div>
              </ul>
            </div>
          )}
          <div className="flex lg:hidden items-center ">
            {auth && (
              <div className="lg:hidden flex items-center gap-1 ">
                <div className="flex gap-3">
                  <Link href={'/marketplace/wishlist'}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <mask
                        id="mask0_1377_22486"
                        style={{ maskType: 'alpha' }}
                        width="24"
                        height="24"
                        x="0"
                        y="0"
                        maskUnits="userSpaceOnUse"
                      >
                        <path fill="#D9D9D9" d="M0 0H24V24H0z"></path>
                      </mask>
                      <g mask="url(#mask0_1377_22486)">
                        <path
                          fill="#5B5F5E"
                          d="M17.95 15.82l-2.494-2.47 1.069-1.054 1.425 1.41 3.525-3.525 1.07 1.044-4.595 4.594zM11 20.326L8.835 18.38a112.583 112.583 0 01-3.444-3.246c-.935-.927-1.691-1.774-2.269-2.54-.577-.766-.992-1.486-1.244-2.16A5.911 5.911 0 011.5 8.35c0-1.42.479-2.605 1.436-3.557S5.08 3.365 6.5 3.365c.873 0 1.698.205 2.475.613.777.408 1.452.994 2.025 1.757.573-.763 1.248-1.349 2.025-1.757a5.244 5.244 0 012.475-.613c1.254 0 2.312.37 3.174 1.11a5.065 5.065 0 011.678 2.775h-1.577c-.23-.744-.649-1.327-1.258-1.75a3.458 3.458 0 00-2.017-.635c-.83 0-1.566.23-2.205.688-.639.458-1.241 1.107-1.807 1.947h-.976c-.562-.846-1.174-1.497-1.835-1.952A3.76 3.76 0 006.5 4.865c-.963 0-1.787.331-2.472.993C3.343 6.519 3 7.35 3 8.35c0 .556.117 1.121.35 1.694.233.573.65 1.234 1.25 1.982s1.417 1.624 2.45 2.629C8.083 15.659 9.4 16.875 11 18.3c.472-.422.977-.87 1.515-1.344.539-.475.993-.888 1.362-1.24l1.07 1.069c-.38.352-.833.76-1.358 1.223-.525.463-1.02.905-1.485 1.327L11 20.327z"
                        ></path>
                      </g>
                    </svg>
                  </Link>
                  <span onClick={() => setSearchMobile(!searchMobile)} className="">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <g>
                        <g stroke="#464646" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                          <path d="M11.5 21a9.5 9.5 0 100-19 9.5 9.5 0 000 19z"></path>
                          <path d="M22 22l-2-2"></path>
                        </g>
                      </g>
                    </svg>
                  </span>
                  <Cart items={cartCount} />
                  <div className="w-fit flex h-fit relative cursor-pointer" ref={notificationsRef}>
                    <span className="text-[#fff] text-[8px] font-bold  leading-3 tracking-tight w-3 h-3 px-1 absolute bg-emerald-600 rounded-[80px] flex-col justify-center items-center gap-2.5 inline-flex top-[-4px] left-[-2px]">
                      {unreadNotifications}
                    </span>
                    <Image
                      src={notificationIcon}
                      onClick={handleNotificationsToggle}
                      draggable={false}
                      width={24}
                      height={24}
                      alt="Cart Icon"
                    />


      </div>
                </div>
                <div className="auth flex items-center scale-75 gap-1 cursor-pointer" onClick={handleAuthMenu}>
                  <div className="details hidden ">
                    <p className=" font-bold ">
                      {globalAuth?.user?.firstName} {globalAuth?.user?.lastName}
                    </p>
                  </div>
                  <UserSquare size="32" color="#555555" />{' '}
                </div>
              </div>
            )}
            {!auth && (
              <>
                <span onClick={() => setSearchMobile(!searchMobile)} className="mr-[20px]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <g>
                      <g stroke="#464646" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                        <path d="M11.5 21a9.5 9.5 0 100-19 9.5 9.5 0 000 19z"></path>
                        <path d="M22 22l-2-2"></path>
                      </g>
                    </g>
                  </svg>
                </span>
                <Cart2
                  items={cartCount}
                  style={{
                    marginRight: '20px',
                  }}
                />
                <MenuIcon toggle={toggle} style="lg:hidden" toggler={handleToggle} />
              </>
            )}
          </div>
        </div>
        <MenuUI
          authMenu={authMenu}
          cart={6}
          toggle={toggle}
          toggler={handleToggle}
          handleAuthMenu={handleAuthMenu}
          auth={auth}
          refMenu={searchRef2}
          globalAuth={globalAuth}
        />

        {/* Search Mobile Nav */}
        {searchMobile && (
          <div className="absolute min-h-screen lg:hidden bg-white-610 right-0 left-0 top-20">
            <div ref={searchRef1} className="bg-white-100 p-6">
              <div className="max-w-[496px] mx-auto  h-12 p-4 rounded-lg border border-neutral-200 justify-start items-center gap-3 flex flex-row ">
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
                    value={searchQuery}
                    onKeyUp={handleSearch}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search"
                    className="text-neutral-400 text-base font-normal leading-normal tracking-tight focus:border-0 focus:outline-none focus:ring-0 w-[100%]"
                  />
                </div>
                <div className="justify-start items-center gap-4 flex ">
                  <label
                    htmlFor="explore"
                    className="justify-start items-center gap-2 flex lg:border-l-2 border-neutral-200 pl-4 relative"
                  >
                    <CustomDropdown
                      selectedValue={dropDown}
                      onChange={handleDropdown}
                      placeholder="Explore"
                      options={['Explore', 'Marketplace']}
                      className="border-none px-1"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

{notificationMenu && 
<div className="absolute bg-white-100 top-full w-fit md:2/4 lg:w-1/4 right-0 " ref={notificationsRef}>

<Notifications notificationsRef={notificationsRef}  unreadNotifications={setUnreadNotifications}/> 
 </div>
}
      </nav>
    </>
  );

  function AuthUser(): React.ReactNode {
    return (
      
      <div className='flex gap-4 justify-center items-center align-middle relative'>

        <Link href={'/marketplace/wishlist'}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <mask
              id="mask0_1377_22486"
              style={{ maskType: 'alpha' }}
              width="24"
              height="24"
              x="0"
              y="0"
              maskUnits="userSpaceOnUse"
            >
              <path fill="#D9D9D9" d="M0 0H24V24H0z"></path>
            </mask>
            <g mask="url(#mask0_1377_22486)">
              <path
                fill="#5B5F5E"
                d="M17.95 15.82l-2.494-2.47 1.069-1.054 1.425 1.41 3.525-3.525 1.07 1.044-4.595 4.594zM11 20.326L8.835 18.38a112.583 112.583 0 01-3.444-3.246c-.935-.927-1.691-1.774-2.269-2.54-.577-.766-.992-1.486-1.244-2.16A5.911 5.911 0 011.5 8.35c0-1.42.479-2.605 1.436-3.557S5.08 3.365 6.5 3.365c.873 0 1.698.205 2.475.613.777.408 1.452.994 2.025 1.757.573-.763 1.248-1.349 2.025-1.757a5.244 5.244 0 012.475-.613c1.254 0 2.312.37 3.174 1.11a5.065 5.065 0 011.678 2.775h-1.577c-.23-.744-.649-1.327-1.258-1.75a3.458 3.458 0 00-2.017-.635c-.83 0-1.566.23-2.205.688-.639.458-1.241 1.107-1.807 1.947h-.976c-.562-.846-1.174-1.497-1.835-1.952A3.76 3.76 0 006.5 4.865c-.963 0-1.787.331-2.472.993C3.343 6.519 3 7.35 3 8.35c0 .556.117 1.121.35 1.694.233.573.65 1.234 1.25 1.982s1.417 1.624 2.45 2.629C8.083 15.659 9.4 16.875 11 18.3c.472-.422.977-.87 1.515-1.344.539-.475.993-.888 1.362-1.24l1.07 1.069c-.38.352-.833.76-1.358 1.223-.525.463-1.02.905-1.485 1.327L11 20.327z"
              ></path>
            </g>
          </svg>
        </Link>

        <Cart items={cartCount} />
        <div className="w-fit flex h-fit relative cursor-pointer" ref={notificationsRef}>
          <span className="text-[#fff] text-[8px] font-bold  leading-3 tracking-tight w-3 h-3 px-1 absolute bg-emerald-600 rounded-[80px] flex-col justify-center items-center gap-2.5 inline-flex top-[-4px] left-[-2px]">
            {unreadNotifications}
          </span>
          <Image
            src={notificationIcon}
            onClick={handleNotificationsToggle}
            draggable={false}
            width={24}
            height={24}
            alt="Cart Icon"
          />

    </div>

        <div className="auth flex items-center gap-3 cursor-pointer" onClick={handleAuthMenu}>
          <p className=" font-bold font-manropeEB">
            {globalAuth?.user?.firstName} {globalAuth?.user?.lastName}
          </p>

          <div className="w-10 h-10 relative bg-gray-400 rounded-[100px]" />
        </div>

        {/* {notificationMenu && 
<div className="absolute mr-3 bg-white-100 top-full w-full left-12 " ref={notificationsRef}>

<Notifications notificationsRef={notificationsRef}  unreadNotifications={setUnreadNotifications}/> 
 </div>
} */}
      </div>
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
  globalAuth,
  toggle,
  toggler,
  style,
  cart,
  auth,
  handleAuthMenu,
  authMenu,
}: {
  globalAuth?: any;
  toggle?: boolean;
  toggler: () => void;
  style?: string;
  cart?: number;
  auth?: boolean;
  handleAuthMenu: () => void;
  authMenu?: boolean;
  refMenu?: any;
}) {
  const router = useRouter();
  const { signIn, signUp } = useUserSession();
  const activeLink = (path: string) =>
    router.pathname === path
      ? 'text-green-950 group-hover:text-white text-base font-semibold  leading-normal tracking-tight'
      : 'text-gray-600 text-base font-semibold  leading-normal tracking-tight';

  // JSX Return
  return (
    <nav
      className={`menu lg:hidden bg-white-610 min-h-[100dvh] absolute top-0 left-0 right-0 ${
        toggle ? 'left-0' : 'left-[-300dvw] hidden'
      }`}
    >
      <div className="flex justify-between px-4 py-6 bg-white-100 border-[#EBEEEF] border-b-[1px] ">
        <svg xmlns="http://www.w3.org/2000/svg" width="126" height="24" fill="none" viewBox="0 0 126 24">
          <path
            fill="#009254"
            d="M18.056 2H1.945A1.945 1.945 0 000 3.944v16.112A1.944 1.944 0 001.945 22h16.111a1.945 1.945 0 001.945-1.944V3.944A1.945 1.945 0 0018.056 2zm-2.402 12.008v1.484a.627.627 0 01-.548.56H6.732c-.62 0-1.148-.2-1.585-.598-.437-.4-.655-.883-.655-1.45 0-.452.148-.854.443-1.208.295-.352.67-.598 1.122-.737l7.318-2.091H4.492V8.552a.629.629 0 01.495-.605h8.427c.62 0 1.148.199 1.585.594.437.397.655.87.655 1.42 0 .46-.149.865-.446 1.215-.298.35-.68.595-1.149.732l-7.327 2.1h8.922zM28.321 18v-.264l4.576-6.688h-4.112V9.36h7.112v.272l-4.56 6.68h4.368V18h-7.384zm12.651.248c-.64 0-1.168-.107-1.584-.32a2.797 2.797 0 01-.992-.816 3.555 3.555 0 01-.544-1.056A5.66 5.66 0 0137.62 15a8.993 8.993 0 01-.048-.816V9.36h1.952v4.16c0 .267.019.568.056.904.038.33.123.65.256.96.139.304.342.555.608.752.272.197.638.296 1.096.296.246 0 .488-.04.728-.12.24-.08.456-.216.648-.408.198-.197.355-.467.472-.808.118-.341.176-.773.176-1.296l1.144.488c0 .736-.144 1.403-.432 2a3.401 3.401 0 01-1.256 1.432c-.554.352-1.237.528-2.048.528zM43.796 18v-2.68h-.232V9.36H45.5V18h-1.704zm4.032 0V9.36h1.704v2.104l-.208-.272a3.08 3.08 0 01.424-.784 2.36 2.36 0 01.648-.592c.213-.144.448-.256.704-.336.261-.085.528-.136.8-.152.272-.021.536-.01.792.032v1.8a2.472 2.472 0 00-.888-.072c-.33.027-.63.12-.896.28a2.013 2.013 0 00-.656.552c-.166.224-.288.48-.368.768-.08.283-.12.59-.12.92V18h-1.936zm6.63-9.952V6.28h1.928v1.768h-1.928zm0 9.952V9.36h1.928V18h-1.928zm8.557.24c-.843 0-1.55-.2-2.12-.6-.57-.4-1-.944-1.288-1.632-.288-.693-.432-1.47-.432-2.328 0-.87.144-1.648.432-2.336.288-.688.71-1.23 1.264-1.624.56-.4 1.25-.6 2.072-.6.816 0 1.523.2 2.12.6a3.93 3.93 0 011.4 1.624c.33.683.496 1.461.496 2.336 0 .864-.163 1.64-.488 2.328a3.972 3.972 0 01-1.376 1.632c-.592.4-1.285.6-2.08.6zm-4.168 3.6V9.36h1.704v6.064h.24v6.416h-1.944zm3.872-5.328c.501 0 .914-.125 1.24-.376.325-.25.565-.59.72-1.016.16-.432.24-.912.24-1.44 0-.523-.08-.997-.24-1.424a2.19 2.19 0 00-.744-1.024c-.336-.256-.763-.384-1.28-.384-.49 0-.89.12-1.2.36-.31.235-.539.565-.688.992-.144.421-.216.915-.216 1.48 0 .56.072 1.053.216 1.48.15.427.381.76.696 1 .32.235.739.352 1.256.352zm9.9 1.728c-.865 0-1.62-.195-2.265-.584a4.012 4.012 0 01-1.504-1.608c-.352-.688-.528-1.477-.528-2.368 0-.907.182-1.701.544-2.384a4.011 4.011 0 011.512-1.6c.646-.384 1.392-.576 2.24-.576.87 0 1.627.195 2.272.584.646.39 1.147.928 1.504 1.616.358.683.536 1.47.536 2.36 0 .896-.181 1.688-.544 2.376a4.01 4.01 0 01-1.504 1.608c-.645.384-1.4.576-2.264.576zm0-1.808c.767 0 1.338-.256 1.711-.768.374-.512.56-1.173.56-1.984 0-.837-.19-1.504-.568-2-.378-.501-.946-.752-1.704-.752-.517 0-.944.117-1.28.352-.33.23-.576.552-.736.968-.16.41-.24.888-.24 1.432 0 .837.19 1.507.568 2.008.384.496.947.744 1.688.744zM78.772 18V9.36h1.704v2.104l-.208-.272a3.08 3.08 0 01.424-.784 2.36 2.36 0 01.648-.592c.213-.144.448-.256.704-.336.261-.085.528-.136.8-.152.272-.021.536-.01.792.032v1.8a2.472 2.472 0 00-.888-.072c-.33.027-.63.12-.896.28a2.013 2.013 0 00-.656.552c-.166.224-.288.48-.368.768-.08.283-.12.59-.12.92V18h-1.936zm11.535 0c-.571.107-1.131.152-1.68.136a3.85 3.85 0 01-1.465-.296 2.029 2.029 0 01-.983-.904 2.575 2.575 0 01-.313-1.144c-.01-.39-.016-.83-.016-1.32V6.96h1.92v7.4c0 .347.003.65.008.912.011.261.067.475.169.64.192.32.498.499.92.536.42.037.9.016 1.44-.064V18zm-6.025-7.128V9.36h6.025v1.512h-6.025zM92.998 18V9.224c0-.219.008-.459.024-.72.016-.267.062-.53.136-.792.075-.261.211-.499.408-.712.246-.272.51-.459.792-.56.288-.107.571-.165.848-.176.278-.016.52-.024.728-.024h1.08v1.568h-1c-.368 0-.642.093-.824.28-.176.181-.264.421-.264.72V18h-1.928zm-1.392-7.128V9.36h5.408v1.512h-5.408zm10.271 7.368c-.864 0-1.619-.195-2.264-.584a4.012 4.012 0 01-1.504-1.608c-.352-.688-.528-1.477-.528-2.368 0-.907.181-1.701.544-2.384a4.011 4.011 0 011.512-1.6c.645-.384 1.392-.576 2.24-.576.869 0 1.626.195 2.272.584.645.39 1.146.928 1.504 1.616.357.683.536 1.47.536 2.36 0 .896-.182 1.688-.544 2.376a4.018 4.018 0 01-1.504 1.608c-.646.384-1.4.576-2.264.576zm0-1.808c.768 0 1.338-.256 1.712-.768.373-.512.56-1.173.56-1.984 0-.837-.19-1.504-.568-2-.379-.501-.947-.752-1.704-.752-.518 0-.944.117-1.28.352-.331.23-.576.552-.736.968-.16.41-.24.888-.24 1.432 0 .837.19 1.507.568 2.008.384.496.946.744 1.688.744zM108.19 18V6.24h1.928V18h-1.928zm4.565-9.952V6.28h1.928v1.768h-1.928zm0 9.952V9.36h1.928V18h-1.928zm8.22.24c-.864 0-1.619-.195-2.264-.584a4.01 4.01 0 01-1.504-1.608c-.352-.688-.528-1.477-.528-2.368 0-.907.181-1.701.544-2.384a4.015 4.015 0 011.512-1.6c.645-.384 1.392-.576 2.24-.576.869 0 1.627.195 2.272.584.645.39 1.147.928 1.504 1.616.357.683.536 1.47.536 2.36 0 .896-.181 1.688-.544 2.376a4.01 4.01 0 01-1.504 1.608c-.645.384-1.4.576-2.264.576zm0-1.808c.768 0 1.339-.256 1.712-.768s.56-1.173.56-1.984c0-.837-.189-1.504-.568-2-.379-.501-.947-.752-1.704-.752-.517 0-.944.117-1.28.352-.331.23-.576.552-.736.968-.16.41-.24.888-.24 1.432 0 .837.189 1.507.568 2.008.384.496.947.744 1.688.744z"
          ></path>
        </svg>
        <MenuIcon toggle={toggle} style="lg:hidden" toggler={toggler} />
      </div>
      <ul className="p-6 flex gap-6 flex-col place-items-start bg-white-100">
        <li className=" flex flex-col lg:hidden gap-5 ">
          <div className="group h flex flex-col ali justify-center gap-1">
            <Link className={activeLink('/explore')} href={'/explore'}>
              Explore
            </Link>
            {router.pathname === '/explore' ? <div className="w-[100%] h-0.5 bg-emerald-600 rounded-lg" /> : null}
          </div>
          <div className=" group flex flex-col ali justify-center  gap-1 ">
            <Link className={activeLink('/marketplace')} href={'/marketplace'}>
              Marketplace
            </Link>
            {router.pathname === '/marketplace' ? <div className="w-[100%] h-0.5 bg-emerald-600 rounded-lg" /> : null}
          </div>
        </li>

        {auth && (
          <div className="mt-4 flex flex-col items-baseline gap-6 w-[100%]">
            <div className=" group flex flex-col  justify-center  gap-1 ">
              <Link className={activeLink('/profile')} href={'/View Live Profile'}>
                View Live Profile
              </Link>
              {router.pathname === '/profile' ? <div className="w-[100%] h-0.5 bg-emerald-600 rounded-lg" /> : null}
            </div>
            <div className=" group flex flex-col ali justify-center  gap-1 ">
              <Link className={activeLink('/shop')} href={'/shop'}>
                Your Shop
              </Link>
              {router.pathname === '/shop' ? <div className="w-[100%] h-0.5 bg-emerald-600 rounded-lg" /> : null}
            </div>
            <div className=" group flex flex-col ali justify-center  gap-1 ">
              <Link className={activeLink('/dashboard')} href={'/dashboard'}>
                Customer Dashboard
              </Link>
              {router.pathname === '/dashboard' ? <div className="w-[100%] h-0.5 bg-emerald-600 rounded-lg" /> : null}
            </div>
            <div className=" group flex flex-col ali justify-center  gap-1 ">
              <Link className={activeLink('/dashboard')} href={'/user/customer-purchase-dashboard'}>
                Customer Purchase Dashboard
              </Link>
              {router.pathname === '/user/customer-purchase-dashboard' ? (
                <div className="w-[100%] h-0.5 bg-emerald-600 rounded-lg" />
              ) : null}
            </div>
            <div className=" group flex flex-col ali justify-center  gap-1 ">
              <Link
                className={activeLink(`/portfolio/${globalAuth?.user?.slug}/manage`)}
                href={`/portfolio/${globalAuth?.user?.slug}/manage`}
              >
                Manage Portfolio
              </Link>
              {router.pathname === '/portfolio' ? <div className="w-[100%] h-0.5 bg-emerald-600 rounded-lg" /> : null}
            </div>
            <div className=" group flex flex-col ali justify-center  gap-1 ">
              <Link className={activeLink('/assessments/dashboard')} href={'/assessments/dashboard'}>
                Assessments & Badges
              </Link>
              {router.pathname === '/assessments/dashboard' ? (
                <div className="w-[100%] h-0.5 bg-emerald-600 rounded-lg" />
              ) : null}
            </div>
            <div className=" group flex flex-col ali justify-center  gap-1 ">
              <Link className={activeLink('/settings')} href={'/settings'}>
                Settings
              </Link>
              {router.pathname === '/settings' ? <div className="w-[100%] h-0.5 bg-emerald-600 rounded-lg" /> : null}
            </div>

            <MobileLogout />
          </div>
        )}
        {!auth && (
          <>
            <Button
              href="/auth/login"
              onClick={signIn}
              className="rounded-lg border-0 bg-green-50 bg-opacity-50  w-[100%]"
              intent={'secondary'}
              size={'md'}
            >
              Sign In
            </Button>
            <Button
              href="/auth/signup"
              onClick={signUp}
              className="rounded-lg  w-[100%]"
              intent={'primary'}
              size={'md'}
            >
              Sign Up
            </Button>
          </>
        )}
      </ul>
    </nav>
  );
}

function Cart({ items, style }: { items: number; style?: {} }) {
  return (
    <Link style={style} href={'/marketplace/cart'} className="w-6 h-6 justify-center items-center flex  gap-2">
      <div className="w-6 h-6 relative">
        {items > 0 && (
          <span className="text-[#fff] text-[8px] font-bold  leading-3 tracking-tight w-3 h-3 px-1 absolute bg-emerald-600 rounded-[80px] flex-col justify-center items-center gap-2.5 inline-flex top-[-4px] left-[-2px]">
            {items}
          </span>
        )}

        <Image src={cartIcon} draggable={false} width={24} height={24} alt="Cart Icon" />
      </div>
    </Link>
  );
}

function Cart2({ items, style }: { items: number; style?: {} }) {
  return (
    <Link style={style} href={'/marketplace/cart'} className="w-6 h-6 justify-center items-center flex  gap-2">
      <div className="w-6 h-6 relative lg:hidden">
        {items > 0 && (
          <span className="text-[#fff] text-[8px] font-bold  leading-3 tracking-tight w-3 h-3 px-1 absolute bg-emerald-600 rounded-[80px] flex-col justify-center items-center gap-2.5 inline-flex top-[-4px] left-[-2px]">
            {items}
          </span>
        )}

        <Image src={cartIcon} draggable={false} width={24} height={24} alt="Cart Icon" />
      </div>
    </Link>
  );
}

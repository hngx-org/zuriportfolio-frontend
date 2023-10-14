import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import ButtonCat from './ButtonCat';
import styles from '.././landingpage/productCardWrapper/product-card-wrapper.module.css';
import Image from 'next/image';
import more from '../../../../public/assets/ic_outline-arrow-back-ios.svg';
import menu from '../../../../public/assets/ic_outline-menu.svg';
import { useAuthentication } from '../../../../hooks/useAuthentication';

import axios from 'axios';

interface CategoriesNavProps {
  navItems: string[];
}

const CategoriesNav = (props: CategoriesNavProps) => {
  const [active, setActive] = useState(-1);
  const [allCatActive, setAllCatActive] = useState(false);
  const [categories, setCategories] = useState([]);

  const { authenticated } = useAuthentication();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get('https://coral-app-8bk8j.ondigitalocean.app/api/category-name/');

        setCategories(data.categories);
      } catch (err) {
        console.error(err);
      }
    };

    return () => {
      fetchCategories();
    };
  }, []);

  const navContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (active >= 0) setAllCatActive(false);
  }, [active]);

  const handleActiveNav = (i: number) => {
    setActive(i);
  };

  const handleScrollLeft = () => {
    if (navContainerRef.current) {
      const scrollAmount = -100;
      navContainerRef.current.scrollTo({
        left: navContainerRef.current.scrollLeft - scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className={`font-ppReg shadow-sm -mt-4 px-4`}>
      <aside className="max-w-[1240px] mx-auto hidden xl:flex gap-8 items-center z-50">
        <button
          className={`${allCatActive ? 'text-brand-green-shade50' : ''}  items-center gap-1 whitespace-nowrap flex`}
          onClick={() => {
            setAllCatActive(true);
            setActive(-1);
          }}
        >
          <Image src={menu} alt="menu icon" />
          <Link href="/marketplace/categories/all">All Categories</Link>
        </button>
        <div className={`overflow-x-scroll  ${styles['hide-scroll']}`} ref={navContainerRef}>
          <ul className={`list flex whitespace-nowrap gap-8 py-5 bg-white-100 text-base `}>
            {authenticated && (
              <li>
                <Link href={`/marketplace/wishlist`}>WishList</Link>
              </li>
            )}
            {categories.map((category, i: number) => {
              return (
                <li key={i + 1} className="">
                  <ButtonCat active={active} handleActiveNav={handleActiveNav} category={category} index={i} />
                </li>
              );
            })}
          </ul>
        </div>

        <Image className="cursor-pointer" src={more} alt="move icon" onClick={handleScrollLeft} />
      </aside>
    </div>
  );
};

export default CategoriesNav;

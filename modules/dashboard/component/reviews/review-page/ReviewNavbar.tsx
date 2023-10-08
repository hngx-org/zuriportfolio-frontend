import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Input } from '@ui/Input';
import { SearchNormal1, ShoppingCart } from 'iconsax-react';

function ReviewNavbar() {
  return (
    <nav className="flex justify-between items-center lg:px-24 md:px-20 sm:px-10 py-6 w-full border-b border-brand-disabled font-manropeB lg:text-2xl md:text-xl sm:text-lg">
      <span className="flex gap-1 text-blue-800">
        <Image src="/assets/reviews/review-navbar-icon.svg" height={12} width={12} alt="navbar logo" />
        TechVerse
      </span>
      <span className="lg:w-[576px]">
        <Input
          className="w-auto"
          type="search"
          intent={'default'}
          inputSize="lg"
          leftIcon={<SearchNormal1 />}
          placeHolder="Search"
        />
      </span>
      <Link href="#">
        <ShoppingCart />
      </Link>
    </nav>
  );
}

export default ReviewNavbar;

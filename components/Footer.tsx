import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import footerLogo from '../public/assets/images/logo/zuriporfolio-footer-logo.png';

function Footer() {
  return (
    <footer className="font-manropeL bg-brand-green-pressed text-md text-white-100 leading-[1.5]">
      <section
        className="px-6 py-[4rem] flex
      flex-col gap-12 md:py-[4rem] md:flex-row md:justify-between xl:max-w-[77.5rem] xl:mx-auto"
      >
        <div className="flex flex-col gap-8 md:w-[20rem] xl:w-[32.5rem]">
          <Link href="/" className="flex gap-2 hover:underline">
            <Image src={footerLogo} alt="Zuriportfolio" width={20} height={20} className="object-contain" />
            <span className="font-bold tracking-[0.008rem]">zuriportfolio</span>
          </Link>

          <p className="font-normal">
            Zuri Portfolio shows you with the brightest and most creative talents from across the globe. Whether
            you&apos;re searching for the best designers, developers, engineers or any other talent, we&apos;ve got you
            covered. Explore our page and discover the talent that will take your projects to new heights. Your next
            masterpiece begins here.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-[4rem] justify-between md:gap-[4rem] lg:grid-cols-3 xl:gap-16">
          <div className="flex flex-col gap-2">
            <h4 className="font-semibold text-[1.375rem] leading-[1.75]">Social Media</h4>

            <ul className="flex flex-col gap-2 font-normal">
              <li>
                <a href="" className="hover:underline">
                  Instagram
                </a>
              </li>
              <li>
                <a href="" className="hover:underline">
                  Twitter
                </a>
              </li>
              <li>
                <a href="" className="hover:underline">
                  Facebook
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="font-semibold text-[1.375rem] leading-[1.75]">Services</h4>

            <ul className="flex flex-col gap-2 font-normal">
              <li>
                <a href="" className="hover:underline">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="" className="hover:underline">
                  Explore
                </a>
              </li>
              <li>
                <a href="" className="hover:underline">
                  Marketplace
                </a>
              </li>
              <li>
                <a href="" className="hover:underline">
                  Shop
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="font-semibold text-[1.375rem] leading-[1.75]">Links</h4>

            <ul className="flex flex-col gap-2 font-normal">
              <li>
                <a href="" className="hover:underline">
                  Zuri Training
                </a>
              </li>
              <li>
                <a href="" className="hover:underline">
                  Zuri Internship
                </a>
              </li>
              <li>
                <a href="" className="hover:underline">
                  Partner with Us
                </a>
              </li>
              <li>
                <a href="" className="hover:underline">
                  Recruit Talent
                </a>
              </li>
              <li>
                <a href="" className="hover:underline">
                  Partner to Train
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="w-full p-4 bg-[#003A1B]  text-center">
        <p>&copy; 2023 Zuriportfolio</p>
      </section>
    </footer>
  );
}

export default Footer;

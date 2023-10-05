import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import footerLogo from '../public/zuriporfolio-footer-logo.png';

function Footer() {
  return (
    <footer className={`font-manropeL bg-[#006F37] text-md text-white-100 leading-[1.5]`}>
      <section
        className="px-6 py-[4rem] flex
      flex-col gap-10 md:py-[4rem] md:flex-row md:justify-between xl:max-w-[77.5rem] xl:mx-auto"
      >
        <div className="flex flex-col gap-5 md:w-[20rem] xl:w-[32.5rem]">
          <Link href="/" className="flex gap-2">
            <Image src={footerLogo} alt="Zuriportfolio" />
            <span className="font-bold tracking-[0.008rem]">zuriportfolio</span>
          </Link>

          <p className="font-normal">
            Zuri Portfolio shows you with the brightest and most creative talents from across the globe. Whether
            you&apos;re searching for the best designers, developers, engineers or any other talent, we&apos;ve got you
            covered. Explore our page and discover the talent that will take your projects to new heights. Your next
            masterpiece begins here.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 gap-y-8 justify-between md:gap-[4rem] lg:grid-cols-3 xl:gap-16">
          <div className="flex flex-col gap-2">
            <h4 className="font-semibold text-2xl leading-[1.75]">Social Media</h4>

            <ul className="flex flex-col gap-2 font-normal">
              <li>
                <a href="">Instagram</a>
              </li>
              <li>
                <a href="">Twitter</a>
              </li>
              <li>
                <a href="">Facebook</a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="font-semibold text-2xl leading-[1.75]">Services</h4>

            <ul className="flex flex-col gap-2 font-normal">
              <li>
                <a href="">Portfolio</a>
              </li>
              <li>
                <a href="">Explore</a>
              </li>
              <li>
                <a href="">Marketplace</a>
              </li>
              <li>
                <a href="">Shop</a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="font-semibold text-2xl leading-[1.75]">Links</h4>

            <ul className="flex flex-col gap-2 font-normal">
              <li>
                <a href="">Zuri Training</a>
              </li>
              <li>
                <a href="">Zuri Internship</a>
              </li>
              <li>
                <a href="">Partner with Us</a>
              </li>
              <li>
                <a href="">Recruit Talent</a>
              </li>
              <li>
                <a href="">Partner to Train</a>
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

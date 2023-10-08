import React from 'react';
import Link from 'next/link';

function Footer() {
  return (
    <footer className="font-manropeL bg-brand-green-pressed text-md text-white-100 leading-[1.5]">
      <section
        className="px-6 py-[4rem] flex
      flex-col gap-12 md:py-[4rem] md:flex-row md:justify-between xl:max-w-[77.5rem] xl:mx-auto"
      >
        <div className="flex flex-col gap-8 md:w-[20rem] xl:w-[32.5rem]">
          <Link href="/" className="flex items-center gap-2 hover:underline">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18.0563 -0.000488281H1.94452C1.4288 -0.000488281 0.934207 0.204381 0.569538 0.56905C0.204869 0.933718 0 1.42832 0 1.94404V18.0558C0 18.5715 0.204869 19.0661 0.569538 19.4308C0.934207 19.7955 1.4288 20.0003 1.94452 20.0003H18.0563C18.572 20.0003 19.0666 19.7955 19.4313 19.4308C19.7959 19.0661 20.0008 18.5715 20.0008 18.0558V1.94404C20.0008 1.42832 19.7959 0.933718 19.4313 0.56905C19.0666 0.204381 18.572 -0.000488281 18.0563 -0.000488281ZM15.6542 12.0083V13.4914C15.6403 13.6333 15.5783 13.7662 15.4787 13.8681C15.3791 13.9701 15.2477 14.0351 15.1062 14.0523L6.73222 14.0529C6.11219 14.0529 5.58356 13.8529 5.14688 13.4537C4.71047 13.0542 4.49213 12.5711 4.49213 12.0033C4.49213 11.5516 4.63963 11.1502 4.93492 10.7963C5.23049 10.4435 5.60467 10.198 6.05747 10.0585L13.3747 7.96761H4.4924V6.552C4.49452 6.41024 4.54448 6.27336 4.63419 6.16358C4.72391 6.05379 4.84809 5.97756 4.98659 5.94725H13.4142C14.0342 5.94725 14.5623 6.14559 14.9989 6.54144C15.4356 6.93785 15.6542 7.41092 15.6542 7.9615C15.6542 8.42124 15.5054 8.8257 15.2078 9.17572C14.9103 9.52629 14.5275 9.77046 14.0595 9.90769L6.73222 12.0083H15.6542Z"
                fill="white"
              />
            </svg>
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
                <Link href="/portfolio" className="hover:underline">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/explore" className="hover:underline">
                  Explore
                </Link>
              </li>
              <li>
                <Link href="/marketplace" className="hover:underline">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:underline">
                  Shop
                </Link>
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

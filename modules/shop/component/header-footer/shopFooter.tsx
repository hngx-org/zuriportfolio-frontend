import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import footerLogo from '../../../../public/assets/shop/techverse_light.svg';
import twitterLogo from '../../../../public/assets/shop/twitter_icon.svg'
import instaLogo from '../../../../public/assets/shop/instagram_icon.svg'
import githubLogo from '../../../../public/assets/shop/github_icon.svg'


function ShopFooter() {
  return (
    <footer className="font-manropeL bg-brand-green-pressed text-md text-white-100">
      <section
        className="md:px-[6.25rem] py-[2.5rem] px-[2rem] flex
      flex-col items-center md:flex-row md:justify-between xl:max-w-[77.5rem] xl:mx-auto"
      >
        <div className="flex gap-8 md:w-[20rem] xl:w-[32.5rem]">
          <Link href="/" className="flex flex-col gap-2 hover:underline">
            <Image src={footerLogo} alt="Zuriportfolio" className="object-contain" />
            <span className="font-bold tracking-[0.008rem]">by Mark Essien</span>
          </Link>
        </div>

        <div className="flex flex-col md:flex-row gap-x-[1.5rem] pt-[2rem] md:pt-0 items-center">
            <h4 className="cursor-pointer font-normal md:text-[1.1rem] text-[0.75rem]">Contact Us</h4>

            <h4 className="cursor-pointer font-bold md:text-[1.2rem] text-[1rem]">info@techverse.com</h4>

          <div className="flex flex-row gap-3 mt-[1px]">
            <h4 className="cursor-pointer font-normal md:text-[1.1rem] text-[0.75rem]">Follow Us</h4>
            <Image src={twitterLogo} alt="Twitter" width={20} height={20}/>
            <Image src={instaLogo} alt="Instagram" width={20} height={20}/>
            <Image src={githubLogo} alt="Github" width={20} height={20}/>
          </div>
        </div>
      </section>

      <section className="w-full p-4 text-center">
        <p>&copy; 2023 Zuri. All rights reserved.</p>
      </section>
    </footer>
  );
}

export default ShopFooter;

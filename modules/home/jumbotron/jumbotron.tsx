import React from 'react';
import JumboBg from '../../../public/assets/home/jumbo_background.png';
import Button from '@ui/Button';

const Jumbotron = () => {
  return (
    <div className="w-full md:w-[80%]">
      <div className="bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${JumboBg.src})` }}>
        <div className="pt-[60px] px-2 md:pt-[100px] text-center flex flex-col justify-center items-center">
          <div>
            <h2 className="text-[#1A1C1B] text-[36px] md:text-[48px] font-manropeEB leading-[44px]">
              Explore. Showcase. Sell. Connect.
            </h2>
            <h3 className="text-[#1A1C1B] text-[24px] md:text-[36px] font-manropeB">
              A link in bio, <span className="text-[#009254] underline decoration-1">But</span> for Talents!
            </h3>
          </div>
          <div className="mt-[10px] text-center text-[#1A1C1B] text-[16px] font-manropeL">
            <p className="sm:flex sm:flex-col">
              <span>Join Talents using Zuri Portfolio to increase audience for things digital</span>{' '}
              <span> - Your Portfolio. Your shop!</span>
            </p>
          </div>
          <div className="mt-[20px] flex justify-center items-center">
            <Button href="/auth/signup" className="text-[16px] rounded-[8px]">
              Get Started
            </Button>
            <Button
              href="/auth/signup"
              className="text-[16px] bg-white-100 hover:bg-white-100 text-green-500 underline underline-offset-[12px]"
            >
              Portfolio Explore
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jumbotron;

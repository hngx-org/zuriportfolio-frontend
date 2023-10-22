import JumboBg from '../../../public/assets/home/jumbo_background.webp';
import JumboIconOne from '../../../public/assets/home/jumbo-circle-one.webp';
import JumboIconTwo from '../../../public/assets/home/jumbo-circle-two.webp';
import JumboIconThree from '../../../public/assets/home/jumbo-circle-three.webp';
import Button from '@ui/Button';
import Image from 'next/image';

const Jumbotron = () => {
  return (
    <div className="w-full md:w-[80%]">
      <div className="bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${JumboBg.src})` }}>
        <div className="space-y-2 bg-gradient-to-b from-[#ffffff83] to-white-100 px-2 md:pt-[100px] text-center flex flex-col justify-center items-center">
          <div className="relative pt-[50px] space-y-2">
            <div
              style={{ animationDuration: '2500ms', animationDelay: '3000ms' }}
              className="absolute -right-20 -top-[20px] hidden md:block animate-bounce"
            >
              <Image src={JumboIconOne.src} alt="Jumbo Icon One" width={84} height={84} />
            </div>
            <h2 className="text-[#1A1C1B] text-[36px] md:text-[48px] font-manropeEB leading-[44px]">
              Explore. Showcase. Sell. Connect.
            </h2>
            <h3 className="text-[#1A1C1B] text-[24px] md:text-[36px] font-manropeB">
              A link in bio, <span className="text-[#009254] underline decoration-1">But</span> for Talents!
            </h3>
          </div>
          <div className=" relative text-center text-[#1A1C1B] text-[16px] font-manropeL">
            <div
              style={{ animationDuration: '2500ms', animationDelay: '3000ms' }}
              className="absolute -left-[100px] -top-[30px] hidden md:block animate-pulse fade-400"
            >
              <Image src={JumboIconThree.src} alt="Jumbo Icon Three" width={84} height={84} className="-ml-[45px]" />
              <Image src={JumboIconTwo.src} alt="Jumbo Icon Two" width={84} height={84} className="-mt-[84px]" />
            </div>
            <p className="sm:flex sm:flex-col">
              <span>Join Talents using Zuri Portfolio to increase audience for things digital</span>{' '}
              <span> - Your Portfolio. Your shop!</span>
            </p>
          </div>
          <div className="pt-[15px] flex justify-center items-center">
            <Button
              href="/auth/signup"
              className="text-[16px] rounded-[8px] active:bg-brand-green-primary visited:bg-brand-green-primary focus:bg-brand-green-primary hover:bg-brand-green-primary"
            >
              Get Started
            </Button>
            {/* <Button
              href="/explore"
              className="text-[16px] bg-white-100 active:bg-white-100 visited:bg-white-100 focus:bg-white-100 hover:bg-white-100 text-green-500 underline underline-offset-[12px]"
            >
              Portfolio Explore
            </Button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jumbotron;

import Image from 'next/image';
import heroBg from '../assets/hero-bg.png';
import heroMan from '../assets/hero-image.png';
import JumboIconTwo from '../../../public/assets/home/jumbo-circle-two.webp';
import JumboIconThree from '../../../public/assets/home/jumbo-circle-three.webp';

const Banner = () => {
  return (
    <section
      style={{ backgroundImage: `url(${heroBg.src})` }}
      className="-mt-5 bg-[#ebfef6] bg-[95%_25%] bg-no-repeat lg:pt-[4rem] 2xl:bg-[45%_25%]"
    >
      <div className="relative -mt-5 py-12 pb-[8rem] px-6 grid gap-4 font-manropeL text-base xl:w-[77.5rem] xl:mx-auto xl:px-0">
        <span className="w-fit p-3 px-8 bg-custom-color25 rounded-full font-manropeB text-white-100">
          Zuri Portfolio-Explore
        </span>

        <h1 className="max-w-[24rem] relative xl:max-w-[36rem] pr-3 font-regular text-3xl leading-[2] md:text-3xl xl:text-5xl">
          Find the best Talent for your next Project!
          <div className="absolute right-6 -bottom-6 hidden md:block xl:right-16">
            <Image src={JumboIconThree.src} alt="Jumbo Icon Three" width={64} height={64} className="-ml-[45px]" />
            <Image src={JumboIconTwo.src} alt="Jumbo Icon Two" width={64} height={64} className="-mt-[60px]" />
          </div>
        </h1>

        <p className="max-w-[25rem] mt-3 xl:max-w-[30rem]">
          Find the best Talent who matches your needs and exceeds your expectations.
        </p>
        <Image
          src={heroMan}
          alt="Hero Section image"
          className="hidden absolute right-0 bottom-0 object-contain md:block"
          priority
        />
      </div>
    </section>
  );
};

export default Banner;

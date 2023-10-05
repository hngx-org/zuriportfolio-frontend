import Button from '@ui/Button';
import Image from 'next/image';
import logo from '../public/assets/404/logo-zuri-auth.svg';
import oops from '../public/assets/404/oops.svg';
import Link from 'next/link';

const title = `Oops! You've wandered off the path 🗺️`;
const text = `Even the best explorers take wrong turns. Don't worry, we've got your back .Let's get you back on track!`;
const btnText = `Back to homepage`;
function Error404() {
  return (
    <main className=" bg-white-100 min-h-screen">
      <header className="max-w-[1240px] py-6 mx-6 xl:mx-auto md:py-[38px]">
        <Link href={'/'}>
          <Image src={logo} alt="logo" />
        </Link>
      </header>
      <div className=" border-b border-[#EBEEEF] border-style: solid" />
      <section
        className=" flex flex-col gap-9 sm:gap-[72px] min-h-[calc(100vh-105px)] max-w-[1240px] 
      mx-6 sm:mx-[105] xl:mx-auto items-center justify-center xl:flex-row-reverse xl:gap-[162px]"
      >
        <Image
          src={oops}
          alt="oops"
          className="w-[180px] h-[180px] sm:w-[280px] sm:h-[280px] xl:w-[480px] xl:h-[480px]"
        />
        <div className=" flex flex-col justify-center items-center xl:items-start gap-6">
          <h2 className=" text-2xl md:text-[32px] xl:text-[45px] md:leading-[36px] xl:leading-[52px] sm:font-bold xl:text-left max-w-[504px] text-center font-semibold font-manropeL xl:font-manropeB">
            {title}
          </h2>
          <p className=" text-[#737876] max-w-[623px]  text-sm sm:text-2xl sm:left-8 sm:text-[#8D9290] text-center xl:text-left ">
            {text}
          </p>
          <Button className=" w-full h-[52px] xl:w-[517px] rounded-lg text-base mt-3" href="/">
            {btnText}
          </Button>
        </div>
      </section>
    </main>
  );
}
export default Error404;

'use client';
import Button from '@ui/Button';
import Image from 'next/image';
import oops from '../../../../public/assets/404/oops.svg'
import Container from '@modules/auth/component/Container/Container';
import Head from 'next/head';

const title = `Oops! You've wandered off the path 🗺️`;
const text = `Even the best explorers take wrong turns. Don't worry, we've got your back .Let's get you back on track!`;
const btnText = `Back to homepage`;
function Error404() {
  return (
    <>
    <Head>
        <link rel="icon" href="/assets/zuriLogo.svg" />
        <title>No Products Available</title>
    </Head>
    <main className=" bg-white-100 max-h-[65vh]">
      <Container>
        <section
          className=" flex flex-col gap-9 sm:gap-[72px] min-h-[calc(100vh-105px)]  
      sm:mx-[105] items-center justify-center xl:flex-row-reverse xl:gap-[162px]"
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
            <p className="text-white-650 max-w-[623px]  text-sm sm:text-2xl sm:left-8 sm:text-gray-300 text-center xl:text-left ">
              {text}
            </p>
            <Button className=" w-full h-[52px] xl:w-[517px] rounded-lg text-base mt-3" href="/">
              {btnText}
            </Button>
          </div>
        </section>
      </Container>
    </main>
    </> 
  );
}
export default Error404;

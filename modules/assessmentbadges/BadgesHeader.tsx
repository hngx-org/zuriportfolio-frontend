import Image from 'next/image';

const BadgesHeader = () => {
  return (
    <div className=" flex h-[92px] sm:h-[128px]  bg-brand-green-pressed justify-between relative overflow-hidden">
      <div className=" flex flex-col text-white-100 justify-center pl-6  sm:pl-[96px]">
        <h1 className=" font-manropeB sm:text-[32px] text-[25px]">Wireframe Challenge</h1>
        <p className=" text-[14px] font-manropeL">Design Assessment</p>
      </div>
      <div className="absolute -bottom-8 sm:-bottom-4 right-2 sm:right-28 lg:right-72 lg:bottom-0">
        <Image src='/assets/images/assbase.png' alt="assbase" width={200} height={200} />
      </div>
      <div className="absolute w-[52px] sm:w-[119px] -right-5 sm:-right-9 lg:right-0">
        <Image src='/assets/images/bubble.png' alt="bubble" width={139} height={139} />
      </div>
    </div>
  );
};

export default BadgesHeader;

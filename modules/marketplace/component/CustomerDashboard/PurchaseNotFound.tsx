import Image from 'next/image';
import Button from '@ui/Button';

// loacal imports
import NotFound from '../../../../public/assets/404/nothing_here.png';

const PurchaseNotFound = ({ back }: { back?: () => void }) => {
  const browseProdutLink = '#';

  return (
    <div className="w-full mx-auto my-[3rem] flex items-center justify-center h-fit">
      <div className="w-full md:w-3/4 flex flex-col">
        <p className="text-center text-5xl md:text-[4.5rem] font-bold sm:translate-y-[70%] md:translate-y-[65%] lg:translate-y-[100%] font-manropeEB">
          OOPS!
        </p>
        <div className="cus-2-image ">
          <Image
            className="w-[15rem] sm:w-3/4 lg:w-[50%] mx-auto"
            src={NotFound}
            width={20}
            alt="Not Found"
            unoptimized
          />
        </div>
        <p className="text-center text-4xl sm:text-[3.5rem] mt-[2rem]">There is nothing here</p>
        <div className="cus-2-btn flex flex-col md:flex-row gap-[2rem] justify-center items-center mt-[4rem]">
          <Button onClick={back} intent={'secondary'} href={browseProdutLink} size={'lg'}>
            Back
          </Button>
          <Button intent={'primary'} href={browseProdutLink} size={'lg'}>
            Browse Products
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseNotFound;

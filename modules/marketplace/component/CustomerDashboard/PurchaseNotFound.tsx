import Image from 'next/image';
import Button from '@ui/Button';

// loacal imports
import NotFound from '../../../../public/assets/404/nothing_here.png';

const PurchaseNotFound = () => {
  const browseProdutLink = '#';

  return (
    <div className="w-[80%] mx-auto my-[3rem]">
      <p className="text-center text-[4.5rem] font-bold translate-y-[100%] font-manropeEB">OOPS!</p>
      <div className="cus-2-image ">
        <Image className="w-[50%] mx-auto" src={NotFound} width={20} alt="Not Found" unoptimized />
      </div>
      <p className="text-center text-[3.5rem] mt-[2rem]">There is nothing here</p>
      <div className="cus-2-btn flex justify-center mt-[4rem]">
        <Button intent={'primary'} href={browseProdutLink} size={'lg'}>
          Browse Products
        </Button>
      </div>
    </div>
  );
};

export default PurchaseNotFound;

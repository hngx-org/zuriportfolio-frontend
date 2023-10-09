import Image from 'next/image';
import slider1 from '../../../../public/assets/slider1.png';
import slider2 from '../../../../public/assets/slider2.png';
import slider3 from '../../../../public/assets/slider3.png';
import slider4 from '../../../../public/assets/slider4.png';
import slider5 from '../../../../public/assets/slider5.png';
import arrownext from '../../../../public/assets/arrownext.svg';

export default function Slider() {
  return (
    <div className="flex gap-x-3 md:overflow-x-auto ">
      <Image src={slider1} alt="slider image 1" className="object-contain w-1/6  md:w-[94.4px]" />
      <Image src={slider2} alt="slider image 1" className="object-contain w-1/6 md:w-[94.4px] " />
      <Image src={slider3} alt="slider image 1" className="object-contain w-1/6 md:w-[94.4px]  " />
      <Image src={slider4} alt="slider image 1" className="object-contain w-1/6 md:w-[94.4px] " />
      <Image src={slider5} alt="slider image 1" className="relative object-contain w-1/6 md:w-[94.4px]" />
      <Image
        src={arrownext}
        alt="arrownext"
        className="absolute md:right-[14.7rem] md:bottom-[19.5rem] right-0 lg:hidden"
      />
    </div>
  );
}

import Image from 'next/image';
import slider1 from '../../../../public/assets/slider1.png';
import slider2 from '../../../../public/assets/slider2.png';
import slider3 from '../../../../public/assets/slider3.png';
import slider4 from '../../../../public/assets/slider4.png';
import slider5 from '../../../../public/assets/slider5.png';
import arrownext from '../../../../public/assets/arrownext.svg';

export default function Slider() {
  return (
    <div className="relative max-w-fit ">
      <div className="overflow-scroll no-scrollbar max-h-fit h-auto ">
        <div className="flex gap-x-3">
          <Image src={slider1} alt="slider image 1" className="object-contain   md:w-[94.4px]" />
          <Image src={slider2} alt="slider image 1" className="object-contain  md:w-[94.4px] " />
          <Image src={slider3} alt="slider image 1" className="object-contain  md:w-[94.4px]  " />
          <Image src={slider4} alt="slider image 1" className="object-contain  md:w-[94.4px] " />
          <Image src={slider5} alt="slider image 1" className="object-contain  md:w-[94.4px]" />
        </div>
      </div>
      <Image
        src={arrownext}
        alt="arrownext"
        className=" absolute top-1/2 -right-7  lg:hidden transform  -translate-y-1/2 "
      />
    </div>
  );
}

import Image from 'next/image';
import React, { useState } from 'react';
import slider1 from '../../../public/assets/slider1.png';
import slider2 from '../../../public/assets/slider2.png';
import slider3 from '../../../public/assets/slider3.png';
import slider4 from '../../../public/assets/slider4.png';
import slider5 from '../../../public/assets/slider5.png';

export default function Slider() {
  return (
    <div className="flex w-full md:gap-x-0 gap-x-9">
      <Image
        src={slider1}
        alt="slider image 1"
        className="object-contain lg:w-[105px] md:w-[180px] w-[90px] lg:h-[94px] md:h-[131px] h-[95px]"
      />
      <Image
        src={slider2}
        alt="slider image 1"
        className="object-contain lg:w-[105px] md:w-[180px] w-[90px] lg:h-[94px] md:h-[131px] h-[95px]"
      />
      <Image
        src={slider3}
        alt="slider image 1"
        className="object-contain lg:w-[105px] md:w-[180px] w-[90px] lg:h-[94px] md:h-[131px] h-[95px]"
      />
      <Image
        src={slider4}
        alt="slider image 1"
        className="object-contain lg:w-[105px] md:w-[180px] w-[90px] lg:h-[94px] md:h-[131px] h-[95px] md:block hidden"
      />
      <Image
        src={slider5}
        alt="slider image 1"
        className="object-contain lg:w-[105px] md:w-[180px] w-[90px] lg:h-[94px] md:h-[131px] h-[95px] lg:block hidden"
      />
    </div>
  );
}

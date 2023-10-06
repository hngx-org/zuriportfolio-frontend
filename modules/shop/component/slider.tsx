import Image from 'next/image';
import React, { useState } from 'react';
import slider1 from '../../../public/assets/slider1.png';
import slider2 from '../../../public/assets/slider2.png';
import slider3 from '../../../public/assets/slider3.png';
import slider4 from '../../../public/assets/slider4.png';
import slider5 from '../../../public/assets/slider5.png';
import arrowCircleRight from '../../../public/assets/arrow-circle-right.svg';

export default function Slider() {
  return (
    <div className='flex items-center lg:justify-start md:justify-center mt-2 w-full'>
    <div className="flex lg:w-full md:w-4/5 justify-between lg:gap-x-3">
      <Image
        src={slider1}
        alt="slider image 1"
        className="object-cover lg:w-[18%] w-1/5 lg:h-[94px] md:h-[131px] h-[95px] rounded-lg"
      />
      <Image
        src={slider2}
        alt="slider image 1"
        className="object-cover lg:w-[18%] w-1/5 lg:h-[94px] md:h-[131px] h-[95px] rounded-lg"
      />
      <Image
        src={slider3}
        alt="slider image 1"
        className="object-cover lg:w-[18%] w-1/5 lg:h-[94px] md:h-[131px] h-[95px] rounded-lg"
      />
      <Image
        src={slider4}
        alt="slider image 1"
        className="object-cover lg:w-[18%] w-1/5 lg:h-[94px] md:h-[131px] h-[95px] md:block hidden rounded-lg"
      />
      <Image
        src={slider5}
        alt="slider image 1"
        className="object-cover lg:w-[18%] w-1/5 lg:h-[94px] md:h-[131px] h-[95px] lg:block hidden md:rounded-lg"
      />
    </div>
    <Image
    src={arrowCircleRight}
    alt='Next'
    className='-ml-2 shadow-[0px_1px_18px_-0px_rgba(0,0,0,0.12)] p-0 rounded-full'
    />
    </div>
  );
}

import Image from 'next/image';
import React from 'react';
import mainImage from '../../../public/assets/mainImage.png';
import slider1 from '../../../public/assets/slider1.png';
import slider2 from '../../../public/assets/slider2.png';
import slider3 from '../../../public/assets/slider3.png';
import slider4 from '../../../public/assets/slider4.png';
import arrowCircleRight from '../../../public/assets/arrow-circle-right.svg';

export default function Slider({ updateImage }: any) {
  const handleUpdateImage1 = () => {
    updateImage(slider1);
  };

  const handleUpdateImage2 = () => {
    updateImage(slider2);
  };

  const handleUpdateImage3 = () => {
    updateImage(slider3);
  };

  const handleUpdateImage4 = () => {
    updateImage(slider4);
  };

  const handleUpdateImage5 = () => {
    updateImage(mainImage);
  };

  return (
    <div className="flex items-center lg:justify-start md:justify-center mt-2 w-full">
      <div className="flex lg:w-full md:w-4/5 justify-between lg:gap-x-3">
        <Image
          src={slider1}
          alt="slider image 1"
          id="slider1"
          onClick={handleUpdateImage1}
          className="object-cover lg:w-[18%] w-1/5 lg:h-[94px] md:h-[131px] h-[95px] rounded-lg"
        />
        <Image
          src={slider2}
          alt="slider image 2"
          id="slider2"
          onClick={handleUpdateImage2}
          className="object-cover lg:w-[18%] w-1/5 lg:h-[94px] md:h-[131px] h-[95px] rounded-lg"
        />
        <Image
          src={slider3}
          alt="slider image 3"
          id="slider3"
          onClick={handleUpdateImage3}
          className="object-cover lg:w-[18%] w-1/5 lg:h-[94px] md:h-[131px] h-[95px] rounded-lg"
        />
        <Image
          src={slider4}
          alt="slider image 4"
          onClick={handleUpdateImage4}
          className="object-cover lg:w-[18%] w-1/5 lg:h-[94px] md:h-[131px] h-[95px] md:block rounded-lg"
        />
        <Image
          src={mainImage}
          alt="slider image 5"
          id="slider5"
          onClick={handleUpdateImage5}
          className="object-cover lg:w-[18%] w-1/5 lg:h-[94px] md:h-[131px] h-[95px] lg:block hidden md:rounded-lg"
        />
      </div>
      <Image
        src={arrowCircleRight}
        alt="Next"
        className="-ml-2 shadow-[0px_1px_18px_-0px_rgba(0,0,0,0.12)] p-0 rounded-full"
      />
    </div>
  );
}

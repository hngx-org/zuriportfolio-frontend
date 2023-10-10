import Image from 'next/image';
import React, { useState } from 'react';
import slider1 from '../../../public/assets/slider1.jpg';
import slider2 from '../../../public/assets/slider2.jpg';
import slider3 from '../../../public/assets/slider3.jpg';
import slider4 from '../../../public/assets/slider4.jpg';
import slider5 from '../../../public/assets/slider5.jpg';
import mainImage from '../../../public/assets/mainImage.png';
import slider from '../../../public/assets/icons/slider.svg';

const slides = [mainImage, slider1, slider2, slider3, slider4, slider5];

export default function Slider({ updateImage }: any) {
  const handleUpdateImage1 = () => {
    updateImage(slides[0]);
  };

  const handleUpdateImage2 = () => {
    updateImage(slides[1]);
  };

  const handleUpdateImage3 = () => {
    updateImage(slides[2]);
  };

  const handleUpdateImage4 = () => {
    updateImage(slides[3]);
  };

  const handleUpdateImage5 = () => {
    updateImage(slides[4]);
  };
  const handleUpdateImage6 = () => {
    updateImage(slides[5]);
  };
  return (
    <div className="relative">
      <div className="flex w-full max-w-[700px]  justify-between md:gap-x-0 gap-x-9 mx-auto overflow-hidden">
        <Image
          src={slides[0]}
          onClick={handleUpdateImage1}
          alt="slider image 1"
          className="object-cover lg:w-[105px] md:w-[180px] w-[90px] lg:h-[94px] md:h-[131px] h-[95px] rounded-lg"
        />
        <Image
          src={slides[1]}
          onClick={handleUpdateImage2}
          alt="slider image 2"
          className="object-cover lg:w-[105px] md:w-[180px] w-[90px] lg:h-[94px] md:h-[131px] h-[95px] rounded-lg "
        />
        <Image
          src={slides[2]}
          onClick={handleUpdateImage3}
          alt="slider image 3"
          className="object-cover lg:w-[105px] md:w-[180px] w-[90px] lg:h-[94px] md:h-[131px] h-[95px] rounded-lg"
        />
        <Image
          src={slides[3]}
          onClick={handleUpdateImage4}
          alt="slider image 4"
          className="object-cover lg:w-[105px] md:w-[180px] w-[90px] lg:h-[94px] md:h-[131px] h-[95px] rounded-lg md:block hidden"
        />
        <Image
          src={slides[4]}
          onClick={handleUpdateImage5}
          alt="slider image 5"
          className="object-cover lg:w-[105px] md:w-[180px] w-[90px] lg:h-[94px] md:h-[131px] h-[95px] rounded-lg lg:block hidden"
        />
      </div>
      <div className="px-2.5 py-2 rounded-full shadow-lg w-fit absolute bg-white-100 top-8 -right-[10px] lg:block hidden">
        <Image src={slider} alt="slider" />
      </div>
    </div>
  );
}

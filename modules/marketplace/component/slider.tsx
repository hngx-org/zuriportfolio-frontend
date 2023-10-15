import Image from 'next/image';
import React, { useState } from 'react';
import slider1 from '../../../public/assets/slider1.jpg';
import slider2 from '../../../public/assets/slider2.jpg';
import slider3 from '../../../public/assets/slider3.jpg';
import slider4 from '../../../public/assets/slider4.jpg';
import slider5 from '../../../public/assets/slider5.jpg';
import mainImage from '../../../public/assets/mainImage.png';
import { ArrowLeft2, ArrowRight2 } from 'iconsax-react';

const slides = [mainImage, slider1, slider2, slider3, slider4];

export default function Slider({ updateImage }: any) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const getDisplayImages = () => {
    const displayIndexes = [
      (currentIndex - 4 + slides.length) % slides.length,
      (currentIndex - 3 + slides.length) % slides.length,
      (currentIndex - 2 + slides.length) % slides.length,
      (currentIndex - 1 + slides.length) % slides.length,
      currentIndex,
    ];

    return displayIndexes.map((index) => (
      <Image
        key={index}
        onClick={() => handleUpdateImage(index)}
        src={slides[index]}
        alt={`Image ${index + 1}`}
        className={`object-cover lg:w-[105px] md:w-[180px] w-[90px] lg:h-[94px] md:h-[131px] h-[95px] rounded-lg cursor-pointer`}
      />
    ));
  };
  const handleUpdateImage = (i: number) => {
    updateImage(slides[i]);
  };

  return (
    <div className="relative w-full mx-auto">
      <button
        disabled={currentIndex === 0}
        onClick={handlePrev}
        className="px-2 py-2 rounded-full shadow-lg w-fit absolute bg-white-100 top-8 -left-[10px] lg:block hidden cursor-pointer"
      >
        <ArrowLeft2 size="8" color="#444846" />
      </button>

      <div className="flex w-full max-w-[700px]  justify-evenly md:gap-x-2 gap-x-2 mx-auto overflow-hidden overflow-x-hidden">
        {getDisplayImages()}
      </div>

      <button
        disabled={currentIndex === slides.length - 1}
        onClick={handleNext}
        className="px-2 py-2 rounded-full shadow-lg w-fit absolute bg-white-100 top-8 -right-[10px] lg:block hidden cursor-pointer"
      >
        <ArrowRight2 size="8" color="#444846" />
      </button>
    </div>
  );
}

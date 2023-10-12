import Image from 'next/image';
import React, { useState } from 'react';

export default function Slider({ updateImage, slides }: { updateImage: any; slides: string[] }) {
  const handleUpdateImage = (slide: string) => {
    updateImage(slide);
  };

  return (
    <div className="relative w-full mx-auto">
      <div className="flex w-full max-w-[700px]  md:justify-between justify-around md:gap-x-2 gap-x-2 mx-auto overflow-hidden">
        {Array.isArray(slides) &&
          slides.map((slide, i) => {
            return (
              <Image
                key={i}
                src={slide}
                width={200}
                height={200}
                onClick={() => handleUpdateImage(slide)}
                alt="slider image 1"
                className="object-cover lg:w-[105px] md:w-[180px] w-[90px] lg:h-[94px] md:h-[131px] h-[95px] rounded-lg"
              />
            );
          })}
      </div>
    </div>
  );
}

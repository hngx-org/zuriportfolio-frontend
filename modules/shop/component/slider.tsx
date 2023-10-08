import Image from 'next/image';
import React from 'react';
import mainImage from '../../../public/assets/mainImage.png';
import slider1 from '../../../public/assets/slider1.png';
import slider2 from '../../../public/assets/slider2.png';
import slider3 from '../../../public/assets/slider3.png';
import slider4 from '../../../public/assets/slider4.png';
import slider5 from '../../../public/assets/slider5.png';

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
    updateImage(slider5);
  };

  const handleUpdateImage6 = () => {
    updateImage(mainImage);
  };

  return (
    <div className="flex items-center lg:justify-start md:justify-center mt-2 w-full overflow-x-scroll">
      <div className="flex w-full gap-x-3 md:gap-x-3 lg:w-4/5">
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
          src={slider5}
          alt="slider image 5"
          onClick={handleUpdateImage5}
          className="object-cover lg:w-[18%] w-1/5 lg:h-[94px] md:h-[131px] h-[95px] md:block rounded-lg"
        />
        <Image
          src={mainImage}
          alt="slider image 6"
          id="slider5"
          onClick={handleUpdateImage6}
          className="object-cover lg:w-[18%] w-1/5 lg:h-[94px] md:h-[131px] h-[95px] md:block md:rounded-lg"
        />
      </div>
    </div>
  );
}

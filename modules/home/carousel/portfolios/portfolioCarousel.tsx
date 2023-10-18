import Image from 'next/image';
import Slider from 'react-slick';
import { Key } from 'react';
import link from '../../../../public/assets/home/link.webp';
import badge from '../../../../public/assets/home/badge.svg';
import portraitOne from '../../../../public/assets/home/portraitOne.webp';
import portraitTwo from '../../../../public/assets/home/portraitTwo.webp';
import portraitThree from '../../../../public/assets/home/portraitThree.webp';
import portraitFour from '../../../../public/assets/home/portraitFour.webp';
import portraitFive from '../../../../public/assets/home/portraitFive.webp';
import portraitSix from '../../../../public/assets/home/portraitSix.webp';
import portraitSeven from '../../../../public/assets/home/portraitSeven.webp';
import portraitEight from '../../../../public/assets/home/portraitEight.webp';
import shopOne from '../../../../public/assets/home/shopOne.webp';
import shopTwo from '../../../../public/assets/home/shopTwo.webp';

interface Slide {
  src: string;
  alt?: string;
  name?: string;
  role?: string;
  skills?: string[];
  section: 'portrait' | 'portfolio' | 'shop';
  products?: number;
}

const slides: Slide[] = [
  {
    src: portraitOne.src,
    section: 'portrait',
  },
  {
    src: portraitTwo.src,
    alt: 'portfolio',
    name: 'Daniel Buffa',
    role: 'Frontend Developer',
    skills: ['HTML', 'CSS'],
    section: 'portfolio',
  },
  {
    src: shopOne.src,
    alt: 'shop',
    section: 'shop',
    name: "Lani's Tech Couture",
    products: 110,
  },
  {
    src: portraitThree.src,
    alt: 'portfolio',
    name: 'Mimi Kaye',
    role: 'Product Designer',
    skills: ['Animation', 'Figma'],
    section: 'portfolio',
  },
  {
    src: portraitFour.src,
    section: 'portrait',
  },
  {
    src: portraitFive.src,
    alt: 'portfolio',
    name: 'Rob Davies',
    role: 'Art Director',
    skills: ['Design', 'Art'],
    section: 'portfolio',
  },
  {
    src: shopTwo.src,
    alt: 'shop',
    section: 'shop',
    name: "Tife's Illustrations",
    products: 400,
  },
  {
    src: portraitSix.src,
    alt: 'portfolio',
    name: 'Marlene Garcia',
    role: 'Teacher',
    skills: ['Math', 'English'],
    section: 'portfolio',
  },
  {
    src: portraitSeven.src,
    section: 'portrait',
  },
  {
    src: portraitEight.src,
    alt: 'portfolio',
    name: 'Nazar Ali',
    role: 'Product Designer',
    skills: ['Animation', 'Design'],
    section: 'portfolio',
  },
];

const PortfolioCarousel = () => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: false,
    autoplay: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  return (
    <div className="overflow-hidden p-2 w-full mx-0 mt-[50px]">
      <Slider {...settings}>
        {slides.map((logo, index) => (
          <div key={index} className="relative h-[250px] sm:h-[300px] w-[182.71]">
            {/* Portfolio section */}
            {logo?.section === 'portfolio' && (
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat flex flex-col justify-end items-start rounded-[11px] p-3 mr-2 md:mr-6"
                style={{ backgroundImage: `url(${logo?.src})` }}
              >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-30 rounded-[11px]"></div>

                <div className="z-10">
                  <Image src={badge} alt="badge" width={24} height={24} className="absolute top-4 right-4" />
                  <div className="text-white-100 text-[15px] mb-4">
                    <p className="font-manropeEB">{logo?.name}</p>
                    <p className="font-manropeL">{logo?.role}</p>
                  </div>

                  <div className="flex">
                    {logo?.skills &&
                      logo?.skills.map((skill: string, index: Key | null | undefined) => (
                        <div key={index} className="border border-[#ffffff62] rounded-md p-2 mx-1">
                          <p className="text-white-100 text-[12px] font-manropeL">{skill}</p>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}

            {/* Shop section */}
            {logo?.section === 'shop' && (
              <div
                className="absolute border-white-200 border-[1px] inset-0 bg-cover bg-center bg-no-repeat flex flex-col justify-end mr-2 md:mr-6 rounded-md"
                style={{ backgroundImage: `url(${logo?.src})` }}
              >
                <div className="flex justify-center w-full items-center bg-white-100 p-2 rounded-b">
                  <div className="flex justify-center w-full space-x-2 items-center">
                    <Image src={link} alt="link" width={30} height={30} />
                    <div className="text-left flex flex-col">
                      <p className="text-[11px] xl:text-[12px] font-manropeEB">{logo?.name}</p>
                      <p className="text-[11px] xl:text-[12px] font-manropeL">{logo?.products} Digital Products</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Portrait section */}
            {logo?.section === 'portrait' && (
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat flex items-center rounded-[40%] mr-2 md:mr-6"
                style={{ backgroundImage: `url(${logo?.src})` }}
              ></div>
            )}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PortfolioCarousel;

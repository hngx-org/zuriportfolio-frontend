import Image from 'next/image';
import Slider from 'react-slick';
import {
  JSXElementConstructor,
  Key,
  PromiseLikeOfReactNode,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from 'react';
import badge from '../../../../public/assets/home/badge.svg';
import axios from 'axios';
import { ArrowCircleLeft, ArrowCircleRight } from 'iconsax-react';
import { useQuery } from '@tanstack/react-query';

const DynamicPortfolioCarousel = () => {
  const fetchSlides = async () => {
    const response = await axios.get(
      'https://hngstage6-eagles.azurewebsites.net/api/explore/GetAllPortfolio?pageNumber=1&pageSize=10',
    );
    return response.data.data.map((item: any) => ({
      id: item.id,
      src: item.profilePictureUrl,
      alt: item.track,
      name: item.firstName + ' ' + item.lastName,
      role: item.track,
      skills: item.skills.slice(0, 2),
      section: 'portfolio',
    }));
  };

  const { data: slides, isError: error } = useQuery(['slides'], fetchSlides, {
    refetchOnWindowFocus: false,
  });

  /**
   *
   * @param {Object} props - The props for the component.
   * @param {string} props.className - The class name for the component.
   * @param {Object} props.style - The style object for the component.
   * @param {function} props.onClick - The click event handler for the component.
   * @return {JSX.Element} - The Next Arrow component.
   */
  function NextArrow(props: { className?: string; style?: Object; onClick?: any }): JSX.Element {
    const { className, style, onClick } = props;
    return (
      <ArrowCircleRight
        className={className}
        style={{ ...style, zIndex: 10, right: 20, width: '36px', height: '36px' }}
        onClick={onClick}
        color="#fff"
        variant="Bold"
      />
    );
  }

  /**
   *
   * @param {Object} props - The props object.
   * @param {string} props.className - The class name for the component.
   * @param {Object} props.style - The inline style object for the component.
   * @param {function} props.onClick - The click event handler for the component.
   * @return {JSX.Element} The rendered previous arrow component.
   */
  function PrevArrow(props: { className?: string; style?: Object; onClick?: any }): JSX.Element {
    const { className, style, onClick } = props;
    return (
      <ArrowCircleLeft
        className={className}
        style={{ ...style, zIndex: 10, left: 20, width: '36px', height: '36px' }}
        onClick={onClick}
        color="#fff"
        variant="Bold"
      />
    );
  }

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          infinite: true,
          arrows: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          arrows: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          arrows: true,
        },
      },
    ],
  };

  if (error) {
    return null;
  }

  return (
    <>
      <div className="overflow-hidden p-2 w-full mx-0 mt-[0]">
        <Slider {...settings}>
          {slides?.map(
            (logo: { section: string; src: any; name: string; role: string; skills: string[]; id: string }) => (
              <div key={logo?.id} className="relative h-[250px] sm:h-[300px] w-[182.71]">
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
                            <div key={index} className="border border-[#ffffff62] rounded-md p-[6px] mx-1">
                              <p className="text-white-100 text-[11px] font-manropeL">{skill}</p>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ),
          )}
        </Slider>
      </div>
    </>
  );
};

export default DynamicPortfolioCarousel;

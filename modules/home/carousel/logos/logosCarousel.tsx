import Image from 'next/image';
import Slider from 'react-slick';

interface LogoCarouselProps {
  logos: Array<any>;
  color?: boolean;
}

const LogoCarousel: React.FC<LogoCarouselProps> = ({ logos, color }) => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: false,
    autoplay: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={`${color ? 'bg-[#009254]' : 'bg-[#80c9aa]'} overflow-hidden p-2 w-full`}>
      {/* <Slider {...settings}> */}
        {logos.map((logo, index) => (
          <div key={index}>
            <div className="flex justify-center items-center flex-row space-x-3 md:space-x-[30px]">
              <p className="text-white-100 text-[15px] font-manropeL tracking-wider">{logo.alt}</p>
              <Image src={logo.src} alt={logo.alt} width={24} height={24} />
            </div>
          </div>
        ))}
      {/* </Slider> */}
    </div>
  );
};

export default LogoCarousel;

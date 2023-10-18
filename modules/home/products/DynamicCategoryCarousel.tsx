import Image from 'next/image';
import Slider from 'react-slick';
import { useEffect, useState } from 'react';
import link from '../../../public/assets/home/link.webp';
import axios from 'axios';
import { ArrowCircleLeft, ArrowCircleRight } from 'iconsax-react';
import { notify } from '@ui/Toast';

interface Slide {
  src?: string;
  name?: string;
  products?: number;
  section?: string;
}

const DynamicCategoryCarousel = () => {
  const [slides, setSlides] = useState<Slide[]>([]);

  useEffect(() => {
    const fetchCategoryNames = async () => {
      try {
        const categoriesResponse = await axios.get('https://coral-app-8bk8j.ondigitalocean.app/api/categoryNames/');
        const categories = categoriesResponse.data['categories name'].slice(0, 8);
        return categories;
      } catch (error) {
        console.error('Error fetching category names:', error);
      }
    };

    const fetchProducts = async (category: string) => {
      try {
        const response = await axios.get(`https://coral-app-8bk8j.ondigitalocean.app/api/products/${category}`);
        return response.data;
      } catch (error) {
        console.error(`Error fetching products for category ${category}:`, error);
      }
    };

    const fetchSlides = async () => {
      const categories = await fetchCategoryNames();
      const fetchedSlides = [];

      try {
        for (const category of categories) {
          const products = await fetchProducts(category);

          fetchedSlides.push({
            src: products?.products[0]?.images[0]?.url,
            alt: 'shop',
            section: 'shop',
            name: category,
            products: products?.products?.length,
          });
        }
      } catch (error) {
        notify({
          type: 'error',
          message: 'Error fetching category',
          theme: 'light',
        });
      }

      setSlides(fetchedSlides);
    };

    fetchSlides();
  }, []);

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
        style={{ ...style, zIndex: 999, right: 20, width: '36px', height: '36px' }}
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
        style={{ ...style, zIndex: 999, left: 20, width: '36px', height: '36px' }}
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

  return (
    <>
      {slides.length > 0 && (
        <div className="overflow-hidden p-2 w-full mx-0 mt-[0]">
          <Slider {...settings}>
            {slides.map((category, index) => (
              <div key={index} className="relative h-[250px] sm:h-[300px] w-[182.71]">
                {category?.section === 'shop' && (
                  <div
                    className="absolute border-white-200 border-[1px] inset-0 bg-cover bg-center bg-no-repeat flex flex-col justify-end mr-2 md:mr-6 rounded-md"
                    style={{ backgroundImage: `url(${category?.src})` }}
                  >
                    <div className="flex justify-center w-full items-center bg-white-100 p-2 h-16 rounded-b">
                      <div className="flex justify-center w-full space-x-2 items-center">
                        <Image src={link} alt="link" width={30} height={30} />
                        <div className="text-left flex flex-col">
                          <p className="text-[11px] xl:text-[12px] font-manropeEB">{category?.name}</p>
                          <p className="text-[11px] xl:text-[12px] font-manropeL">
                            {category?.products} Digital Products
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </Slider>
        </div>
      )}
    </>
  );
};

export default DynamicCategoryCarousel;

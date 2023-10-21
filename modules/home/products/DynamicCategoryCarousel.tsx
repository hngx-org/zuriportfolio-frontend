import Image from 'next/image';
import Slider from 'react-slick';
import { useEffect, useState } from 'react';
import link from '../../../public/assets/home/link.webp';
import axios from 'axios';
import { ArrowCircleLeft, ArrowCircleRight } from 'iconsax-react';
import shopOne from '../../../public/assets/home/shopOne.webp';
import shopTwo from '../../../public/assets/home/shopTwo.webp';
import { useQuery } from '@tanstack/react-query';

interface Slide {
  src?: string;
  name?: string;
  products?: number;
  section?: string;
}

const sliders: Slide[] = [
  {
    src: shopOne.src,
    section: 'shop',
    name: "Lani's Tech Couture",
    products: 110,
  },
  {
    src: shopTwo.src,
    section: 'shop',
    name: "Tife's Illustrations",
    products: 400,
  },
  {
    src: shopOne.src,
    section: 'shop',
    name: "Lani's Tech Couture",
    products: 110,
  },
  {
    src: shopTwo.src,
    section: 'shop',
    name: "Tife's Illustrations",
    products: 400,
  },
  {
    src: shopOne.src,
    section: 'shop',
    name: "Lani's Tech Couture",
    products: 110,
  },
  {
    src: shopTwo.src,
    section: 'shop',
    name: "Tife's Illustrations",
    products: 400,
  },
  {
    src: shopOne.src,
    section: 'shop',
    name: "Lani's Tech Couture",
    products: 110,
  },
  {
    src: shopTwo.src,
    section: 'shop',
    name: "Tife's Illustrations",
    products: 400,
  },
];

const DynamicCategoryCarousel = () => {
  const [slides, setSlides] = useState<Slide[]>(sliders);

  const {
    data: categoryNamesQuery,
    isLoading: isCategoryNamesLoading,
    isError: isCategoryNamesError,
  } = useQuery(['categoryNames'], async () => {
    const response = await axios.get('https://staging.zuri.team/api/marketplace/v1/category-name/');
    return response.data.data.slice(0, 12);
  });

  const { data: productsQuery, isError: isProductsError } = useQuery(['products', categoryNamesQuery], async () => {
    const fetchedSlides = [];
    try {
      for (const categoryObj of categoryNamesQuery) {
        const category = categoryObj.name;
        const response = await axios.get(`https://staging.zuri.team/api/marketplace/v1/products/${category}`);
        const products = response.data;

        fetchedSlides.push({
          src: products?.data[0]?.images[0]?.url,
          alt: 'shop',
          section: 'shop',
          name: category,
          products: products?.products?.length,
        });
      }
    } catch (error) {
      console.error('Error fetching slides:', error);
      for (const category of sliders) {
        fetchedSlides.push({
          src: category.src,
          alt: 'shop',
          section: 'shop',
          name: category.name,
          products: category.products,
        });
      }
    }

    return fetchedSlides;
  });

  useEffect(() => {
    if (productsQuery) {
      setSlides(productsQuery);
    }
  }, [productsQuery]);

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
    dots: false,
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

  if (isCategoryNamesError || isProductsError) {
    return null;
  }

  return (
    <>
      {slides.length > 0 && (
        <div className="overflow-hidden p-2 w-full mx-0 mt-[0]">
          <Slider {...settings}>
            {slides.map((category) => (
              <div key={category?.name} className="relative h-[250px] sm:h-[300px] w-[182.71]">
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

            {isCategoryNamesLoading ||
              (slides.length === 0 &&
                sliders.map((category, index) => (
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
                )))}
          </Slider>
        </div>
      )}
    </>
  );
};

export default DynamicCategoryCarousel;

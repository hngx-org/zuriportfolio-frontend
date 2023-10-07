import Image from 'next/image';
import mainImage from '../../public/assets/mainImage.png';
import star1 from '../../public/assets/star1.svg';
import star2 from '../../public/assets/star2.svg';
import Slider from './component/slider';
import React, { useRef, useState } from 'react';
import Button from '@ui/Button';
import { ProfileCircle } from 'iconsax-react';
import { ArrowLeft } from 'iconsax-react';
import { ProductCardProps } from '../../@types';
import ProductCardWrapper from '../marketplace/component/landingpage/productCardWrapper/product-card-wrapper';
import { useRouter } from 'next/router';
import Breadcrumbs from '../../components/Breadcrumbs';
import ShopNavbar from './component/header-footer/shopNavbar';
import ShopFooter from './component/header-footer/shopFooter';


const otherProducts: ProductCardProps[] = [
  {
    image: '/assets/products-banner/Image-1.png',
    productName: 'Webinar and Course Slide Templa...',
    productPrice: '100',
    productOwner: 'Mark Essien',
    productRating: 3,
    showLimitedOffer: false,
    showTopPicks: true,
    showDiscount: false,
    discount: 0,
  },
  {
    image: '/assets/products-banner/Image-2.png',
    productName: 'Webinar and Course Slide Templa...',
    productPrice: '100',
    productOwner: 'Mark Essien',
    productRating: 3,
    showLimitedOffer: false,
    showTopPicks: true,
    showDiscount: false,
    discount: 0,
  },
  {
    image: '/assets/products-banner/Image-3.png',
    productName: 'Webinar and Course Slide Templa...',
    productPrice: '100',
    productOwner: 'Mark Essien',
    productRating: 3,
    showLimitedOffer: false,
    showTopPicks: true,
    showDiscount: false,
    discount: 0,
  },
  {
    image: '/assets/products-banner/Image-4.png',
    productName: 'Webinar and Course Slide Templa...',
    productPrice: '100',
    productOwner: 'Mark Essien',
    productRating: 3,
    showLimitedOffer: false,
    showTopPicks: true,
    showDiscount: false,
    discount: 0,
  },
];

export default function ProductDetails() {
  const router = useRouter();

  const [image, setImage] = useState(mainImage);

  const updateImage = (newImage: any) => {
    setImage(newImage);
  };

  const [isClickedDesc, setIsClickedDesc] = useState(true);
  const [isClickedSpec, setIsClickedSpec] = useState(false);
  const [isClickedRev, setIsClickedRev] = useState(false);

  const handleClick0 = () => {
    setIsClickedDesc(true);
    setIsClickedSpec(false);
    setIsClickedRev(false);
  };

  const handleClick1 = () => {
    setIsClickedSpec(true);
    setIsClickedDesc(false);
    setIsClickedRev(false);
  };

  const handleClick2 = () => {
    setIsClickedRev(true);
    setIsClickedSpec(false);
    setIsClickedDesc(false);
  };

  const lensRef = useRef<HTMLDivElement | null>(null);
  const secondRef = useRef<HTMLDivElement | null>(null);

  const [lensStyle, setLensStyle] = useState<React.CSSProperties>({ display: 'none' });
  const [secondStyle, setSecondStyle] = useState<React.CSSProperties>({});

  function zoomOnHover(e: React.MouseEvent<HTMLDivElement>) {
    const target = e.target as HTMLDivElement;
    const offsetLeft = target.offsetLeft;
    const offsetTop = target.offsetTop;

    var x = e.clientX - offsetLeft;
    var y = e.clientY - offsetTop;

    setLensStyle({
      ...lensStyle,
      display: 'block',
      left: x - 10 + 'px',
      top: y + 200 + 'px',
    });

    setSecondStyle({
      ...secondStyle,
      backgroundPosition: (x - 500 / 2 / 6) * -6 + 'px ' + (y - 500 / 2 / 6 + 20) * -6 + 'px',
    });
  }

  function mouseOut() {
    setLensStyle({
      ...lensStyle,
      display: 'none',
    });
  }

  return (
    <>
      {/* Navbar */}
      <ShopNavbar activePage={router.pathname} showDashBorad={false} />

      {/* Main */}
      <main className={`flex flex-col items-center lg:px-12 md:px-10 px-6 lg:pt-6 pt-4`}>
        <span className="self-start mb-[0.75rem] ml-4">
          <Breadcrumbs />
        </span>
        <a onClick={() => router.back()} className="self-start mb-4 ml-2">
          <ArrowLeft size="27" color="#000000" />
        </a>

        {/* Product Details  */}
        <div className="flex lg:flex-row flex-col items-center justify-center gap-x-6 w-full">
          {/* Product Detail Images  */}
          <div className="flex flex-col w-full item-center lg:gap-y-4">
            <div>
              <div id="first" onMouseOut={mouseOut} onMouseMove={(e) => zoomOnHover(e)} className="peer h-fit">
                <span
                  ref={lensRef}
                  style={lensStyle}
                  className="w-32 h-32 bg-black/40 absolute border-2 translate-x-3/4 -translate-y-2/4 hidden"
                  id="lens"
                ></span>
                <Image
                  src={image}
                  alt="Main Image"
                  className="lg:w-full md:w-[750px] w-[350px] lg:h-[520px] md:h-[600px] h-[340px] object-cover rounded-3xl"
                />
              </div>
              <div
                ref={secondRef}
                style={secondStyle}
                className='absolute w-2/4 h-[65vh] left-[50%] top-32 overflow-hidden bg-black bg-[size:600%_600%] bg-[url("../public/assets/mainImage.png")] rounded-3xl hidden peer-hover:block'
                id="second"
              ></div>
            </div>
            <Slider updateImage={updateImage} />
          </div>

          {/* Product Detail Data */}
          <div className="space-y-6 w-full self-start">
            <h1 className="md:text-4xl text-base font-semibold font-manropeEB md:leading-[44px] leading-[24px] mt-8 lg:mt-0">
              Webinar and Course Slide (Soft Copy)
            </h1>
            <div className="flex items-center">
              <ProfileCircle size="32" color="#464646" variant="Bulk" />
              <p className="w-fit ml-2">Fola Kingsley</p>
            </div>
            <p className="text-lg font-normal font-manropeL leading-normal tracking-tight flex flex-col">
              <span>Empower your educational endeavors with our Webinar and Course Template.</span>
              <span>Craft immersive online learning experiences that captivate audiences. </span>
              <span>Seamlessly integrate multimedia elements, quizzes, and discussions to enrich t...</span>
            </p>

            <div className="flex flex-col gap-y-2">
              <div className="flex gap-x-1">
                <p className=" text-base font-semibold font-manropeB leading-normal tracking-tight">3.3/5</p>
                <Image src={star1} alt="rating star" />
                <Image src={star1} alt="rating star" />
                <Image src={star1} alt="rating star" />
                <Image src={star2} alt="rating star" />
                <Image src={star2} alt="rating star" />
              </div>
              <p className="text-black text-base font-normal font-manropeL leading-normal tracking-tight">
                (50 Customers)
              </p>
            </div>

            <div>
              <hr className="bg-white-110 text-white-110 h-[2px] border-0 lg:block hidden mt-12" />
            </div>

            <div className="flex flex-col gap-y-2">
              <p className="text-base font-normal font-manropeL leading-normal tracking-tight  mt-7">
                Total Payment (Incl. taxes)
              </p>
              <p className="flex gap-x-4 items-center">
                <span className="text-black text-[32px] font-semibold font-manropeEB leading-10">$100.00</span>
                <span className="text-[22px] font-normal font-manrope line-through leading-7 text-gray-300">
                  $120.00
                </span>
              </p>
            </div>

            <Button intent={'primary'} size={'lg'} className="w-5/12 text-xs">
              Add to cart
            </Button>
          </div>
        </div>

        {/* Description, Specification, Reviews  */}
        <div className="my-10 w-full">
          <div className="flex justify-around items-center mt-10 mb-4 w-full">
            <p
              onClick={handleClick0}
              className={`font-manrope text-base tracking-wide cursor-pointer ${
                isClickedDesc ? 'text-green-600 underline' : 'text-dark-115'
              }`}
            >
              Description
            </p>
            <p
              onClick={handleClick1}
              className={`font-manrope text-base tracking-wide cursor-pointer ${
                isClickedSpec ? 'text-green-600 underline' : 'text-dark-115'
              }`}
            >
              Specification
            </p>
            <p
              onClick={handleClick2}
              className={`font-manrope text-base tracking-wide cursor-pointer ${
                isClickedRev ? 'text-green-600 underline' : 'text-dark-115'
              }`}
            >
              Review
            </p>
          </div>
          <div className="p-6 border border-white-110 rounded-lg flex gap-y-6 flex-col">
            <h1 className="font-manropeB text-2xl text-white-700">
              {isClickedDesc ? 'Description' : `${isClickedSpec ? 'Specification' : 'Review'}`}
            </h1>
            <p>
              Empower your educational endeavors with our Webinar and Course Template. Craft immersive online learning
              experiences that captivate audiences. Seamlessly integrate multimedia elements, quizzes, and discussions
              to enrich the learning journey. Tailor the template to your brand with customizable design options. Track
              learner progress, foster collaboration, and gain insights through built-in analytics. Whether you're an
              educator or a business, this template streamlines course creation, webinar hosting, and community
              building. Elevate your online education with a user-friendly, responsive, and feature-rich solution that
              engages and enlightens learners.
            </p>
          </div>
        </div>

        {/* favorite products  */}
        <div className="mt-10"></div>
        <ProductCardWrapper title="Other Products by Fola Kingsley" productsList={otherProducts} />
      </main>
      <ShopFooter />
    </>
  );
}

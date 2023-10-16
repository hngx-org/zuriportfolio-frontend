import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { ArrowLeft, ArrowRight, ArrowRight2, ProfileCircle } from 'iconsax-react';
import { useCart } from './component/CartContext';
import { Products } from '../../@types';
import { toast } from 'react-toastify';
import Image from 'next/image';
import star1 from '../../public/assets/star1.svg';
import star2 from '../../public/assets/star2.svg';
import Slider from './component/slider';
import Button from '@ui/Button';
import ShopProductList from './component/otherProductList';
import Breadcrumbs from '../../components/Breadcrumbs';
import Link from 'next/link';
import TabContainer from '../shop/component/Tabbed';
import likeIcon from '../../public/assets/icons/like.svg';
import verifyIcon from '../../public/assets/icons/verify.svg';
import profileImg from '../../public/assets/images/profile-img.png';
import Layout from './component/productPage/Layout';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export default function ProductDetails() {
  const router = useRouter();
  const [products, setProducts] = useState<Products[]>([]);

  const [product, setProduct] = useState<Products | null>(null);
  const [currentProducts, setCurrentProducts] = useState<Products[]>([]);
  const [image, setImage] = useState(product?.image);
  const [showAll, setShowAll] = useState(false);
  const [shopOwnerQuery, setShopOwnerQuery] = useState('');
  const [categoryQuery, setCategoryQuery] = useState('');
  const [cartItemCount, setCartItemCount] = useState(0);
  const categories: string[] = [];
  const [selectedCategory, setSelectedCategory] = useState('');
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);

  const handleCategoryChange = () => {};
  const handleShowMoreClick = () => {
    setShowAll(!showAll);
  };

  const handleShowLessClick = () => {
    setShowAll(!showAll);
  };

  const ZOOM = 250;

  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetch(`https://zuriportfolio-shop-internal-api.onrender.com/api/product/${id}`)
        .then((response) => response.json())
        .then((response) => {
          setProduct(response.data);
        })
        .catch((error) => {
          console.error('Error fetching product details:', error);
          setProduct(null);
        });
    }
  }, [id]);

  useEffect(() => {
    axios
      .get('https://zuriportfolio-shop-internal-api.onrender.com/api/products/marketplace')
      .then((response) => {
        console.log('Fetched product data:', response.data);
        setProducts(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching product data:', error);
      });
  }, []);

  const imgContRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const imgContElm = imgContRef.current;
    const imgElm = imgRef.current;

    const handleMouseEnter = () => {
      console.log(imgContElm);
      if (imgElm) {
        console.log(imgElm);
        imgElm.style.width = ZOOM + '%';
        imgElm.style.height = ZOOM + '%';
      }
      console.log('entered');
    };

    const handleMouseLeave = () => {
      if (imgElm) {
        resetImageStyles();
      }
      console.log('left');
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (imgElm) {
        const { clientX, clientY } = event;
        const { offsetLeft, offsetTop, clientWidth, clientHeight } = imgContElm!;
        const imgWidth = imgElm.clientWidth;
        const imgHeight = imgElm.clientHeight;

        const left = -(((imgWidth - clientWidth) * (clientX - offsetLeft)) / clientWidth);
        const top = -(((imgHeight - clientHeight) * (clientY - offsetTop)) / clientHeight);

        imgElm.style.left = left + 'px';
        imgElm.style.top = top + 'px';
      }
    };

    if (imgContElm && imgElm) {
      imgContElm.addEventListener('mouseenter', handleMouseEnter);
      imgContElm.addEventListener('mouseleave', handleMouseLeave);
      imgContElm.addEventListener('mousemove', handleMouseMove);
    }

    const resetImageStyles = () => {
      if (imgElm && imgContElm) {
        imgElm.style.width = '100%';
        imgElm.style.height = '100%';
        imgElm.style.top = '0';
        imgElm.style.left = '0';
      }
    };

    return () => {
      if (imgContElm) {
        imgContElm.removeEventListener('mouseenter', handleMouseEnter);
        imgContElm.removeEventListener('mouseleave', handleMouseLeave);
        imgContElm.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [product]);

  if (!product) {
    return null;
  }

  const updateImage = (newImage: any) => {
    setImage(newImage);
  };

  const handleAddToCart = () => {
    addToCart(product);
    toast.success('Added to Cart', {
      position: 'top-right',
      autoClose: 3000,
    });
  };

  const renderRatingStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const starType = i <= rating ? 'star1' : 'star2';
      stars.push(<Image src={starType === 'star1' ? star1 : star2} alt={`Star ${i}`} key={i} />);
    }
    return stars;
  };

  const specificationData = [
    'Adaptable with HTML5 and CSS3',
    'Comprehensive documentation and customer support',
    'Similar products you might like',
    'WC3 valid HTML codes',
    'Compatible with all device interfaces',
    'Compatible with all Google web fonts',
    'Active and Hover options',
    'Ensure the template adheres to WCAG guidelines.',
    'Allow users to upload and share additional resources.',
    'Support recording for later playback and distribution.',
    'Offers tutorials to set up and customize the template.',
  ];

  const readMoreBtn = document.querySelector('.read-more-btn') as HTMLElement | null;
  const text = document.querySelector('.text-wrapper') as HTMLElement | null;

  const readMore = () => {
    text?.classList.toggle('line-clamp-3');
    text?.classList.toggle('line-clamp-none');
    if (readMoreBtn?.textContent === 'Read more') {
      readMoreBtn.textContent = 'Read less';
      console.log('it reads more');
    } else if (readMoreBtn?.textContent === 'Read less') {
      readMoreBtn.textContent = 'Read more';
      console.log('it reads less');
    }
  };

  return (
    <>
      {/* Navbar */}
      <Layout
        setSearchQuery={setSearchQuery}
        cartItemCount={cartItemCount}
        setShopOwnerQuery={setShopOwnerQuery}
        setCategoryQuery={setCategoryQuery}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        handleCategoryChange={handleCategoryChange}
      >
        {/* Main */}
        <main className={`p-4 container mx-auto`}>
          <div className="self-start mb-[8px]">
            <span className="font-manropeEL text-xs md:text-sm tracking-[0.00375rem] md:tracking-[0.00088rem] font-normal lg:text-base">
              <Breadcrumbs />
            </span>
          </div>
          <a onClick={() => router.back()} className="self-start">
            <ArrowLeft size="27" color="#000000" className="mb-[8px]" />
          </a>

          {/* Product Details  */}
          <div className="flex lg:flex-row flex-col items-center justify-center gap-x-6 w-full">
            {/* Product Detail Images  */}
            <div className="flex flex-col w-full item-center lg:gap-y-2">
              <div
                className="img-container w-full lg:h-[27rem] md:h-[20rem] sm:h-[17rem] h-[11.25rem] hover:cursor-zoom-in relative overflow-hidden rounded-lg"
                ref={imgContRef}
              >
                <Image
                  src={product.image && product.image[0] ? product.image[0].url : ''}
                  alt={product.name}
                  fill
                  objectFit="cover"
                  className="img max-w-none w-full h-full absolute"
                />
              </div>
              <Slider updateImage={updateImage} />
            </div>

            {/* Product Detail Data */}
            <div className="lg:space-y-2 space-y-4 w-full self-start">
              <h1 className="md:text-2xl md:font-bold text-black lg:text-3xl lg:font-semibold md:mt-4 text-base font-semibold font-manropeL mt-6 tracking-[0.005rem] lg:mt-0">
                {product.name}
              </h1>
              <div className="flex items-center">
                <ProfileCircle color="#464646" variant="Bulk" className="w-6 h-6 md:w-9 md:h-9" />
                <p className="w-fit font-manropeL font-bold text-xs tracking-[0.003rem] md:tracking-[0.005rem] ml-1 md:font-semibold md:text-base">
                  {product.category.name}
                </p>
              </div>
              <div>
                <p className="lg:hidden text-base font-semibold md:font-bold md:text-lg font-manropeL tracking-[0.00088rem] pb-2 md:pb-1">
                  Description
                </p>
                <p className="font-normal font-manropeL text-sm md:text-base lg:text-lg tracking-[0.005rem] w-full line-clamp-3 lg:mt-6 text-wrapper">
                  {product.description}
                </p>
                <span
                  onClick={() => router.push('#description')}
                  className="text-[#009254] font-manropeL font-bold md:block hidden"
                >
                  Read more
                </span>
                <span className="text-[#009254] font-manropeL font-bold md:hidden read-more-btn" onClick={readMore}>
                  Read more
                </span>
              </div>
              <div className="lg:flex flex-col gap-y-2 hidden">
                <div className="flex gap-x-1 mt-4">
                  <p className=" text-base font-semibold font-manropeB leading-normal tracking-tight">3.0/5</p>
                  <div className="flex items-center ">{renderRatingStars(product.rating)}</div>
                </div>
                <p className="text-black text-base font-normal font-manropeL leading-normal tracking-tight">
                  (50 Customers)
                </p>
              </div>

              <div>
                <hr className="bg-white-110 text-white-110 h-[2px] border-0 lg:block hidden mt-[4.625rem] mb-[3.625rem]" />
              </div>

              <div className="flex flex-col gap-y-1 md:gap-y-2">
                <p className="text-base lg:text-lg font-normal font-manropeL leading-normal tracking-tight mt-4">
                  Total Payment (Incl. taxes)
                </p>
                <p className="flex gap-x-4 items-center">
                  <span className="text-black text-xl md:text-3xl lg:text-3xl font-normal lg:font-semibold font-manropeEB leading-10">
                    {product.currency} {product.price}
                  </span>
                  <span className="text-xl font-light md:text-2xl lg:text-[1.375rem] font-manrope line-through leading-7 text-gray-300">
                    {product.currency} {product.discount_price}
                  </span>
                </p>
              </div>

              <div>
                <hr className="bg-white-110 text-white-110 h-[2px] border-0 block md:hidden" />
              </div>

              <Button
                intent={'primary'}
                size={'md'}
                className="md:w-1/3 lg:w-1/2 w-full text-base font-manropeL tracking-[0.005rem] rounded-lg"
                onClick={handleAddToCart}
              >
                Add to cart
              </Button>
            </div>
          </div>

          {/* Description, Specification, Reviews (Desktop View)  */}
          <span id="description">
            <TabContainer />
          </span>
          {/* Description, Specification, Reviews (Mobile & Tablet View)  */}
          <div className="md:hidden block mt-[26px] mr-auto">
            <h2 className="text-green-900 font-manropeB font-semibold text-[22px] text-left">Specifications</h2>

            <ul className="mt-6 flex flex-col gap-4 list-inside">
              {specificationData.slice(0, showAll ? specificationData.length : 4).map((item) => (
                <li key={item} className="list-disc font-manropeL text-base">
                  {item}
                </li>
              ))}
            </ul>
            {!showAll && (
              <button
                onClick={handleShowMoreClick}
                className="text-base mt-3 mb-4 font-bold font-manropeB text-green-600"
              >
                Show more
              </button>
            )}
            {showAll && (
              <button
                onClick={handleShowLessClick}
                className="text-base mt-3 mb-4 font-bold font-manropeB text-green-600"
              >
                Show less
              </button>
            )}

            <hr className="bg-brand-disabled text-brand-disabled h-[1px] w-full border-0  sm:hidden" />

            <div className="mt-4">
              <h2 className="text-[#101928] font-manropeB font-semibold text-[22px] text-left">Customer Feedback</h2>
              <p className="text-sm font-manropeL mt-4">
                VERIFIED RATINGS <span>(173)</span>
              </p>

              <div className="mt-10 grid gap-10 grid-rows-[1fr] sm:grid-cols-[0.5fr_1fr] items-start">
                <div className="w-full py-8 px-6 flex flex-col gap-[20px] rounded-2xl border-custom-color32 border-[1px] items-center">
                  <h2 className="text-4xl font-manropeB font-semibold">3.0/5</h2>
                  <div className="flex mr-[17px]">
                    <Image src={star1} alt="rating star" />
                    <Image src={star1} alt="rating star" />
                    <Image src={star1} alt="rating star" />
                    <Image src={star2} alt="rating star" />
                    <Image src={star2} alt="rating star" />
                  </div>
                  <p className="text-base font-manropeL font-normal text-center">
                    <span>12,000</span> verified users
                  </p>
                </div>

                <div>
                  <div className="flex mb-4 sm:hidden">
                    <div className="flex align-center gap-[5.3px]">
                      <Image src={profileImg} alt="Profile Img" className="block sm:hidden" />
                      <h3 className="text-green-900 sm:text-custom-color39 font-manropeL text-xs  mr-3.5">Dorcas</h3>
                    </div>
                    <hr className="hidden sm:block w-px h-3.5 bg-brand-disabled2 text-brand-disabled2 border-0" />
                    <span className="font-manropeL text-xs text-custom-color39 ml-3.5">September 22, 2023.</span>
                  </div>
                  <div className="flex item-center gap-4 sm:inline-block">
                    <div className="flex ">
                      <Image src={star1} alt="rating star" />
                      <Image src={star1} alt="rating star" />
                      <Image src={star1} alt="rating star" />
                      <Image src={star2} alt="rating star" />
                      <Image src={star2} alt="rating star" />
                    </div>

                    <div className="flex gap-2 align-center sm:hidden">
                      <Image src={verifyIcon} alt="Verify Icon" />
                      <p className="color-green-300 font-manropeB text-sm font-semibold text-brand-green-shade50">
                        Verified Purchase
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:flex mt-4">
                    <h3 className="text-green-900 sm:text-custom-color39 font-manropeL text-xs  mr-3.5">Dorcas</h3>
                    <hr className="hidden sm:block w-px h-3.5 bg-brand-disabled2 text-brand-disabled2 border-0" />
                    <span className="font-manropeL text-xs text-custom-color39 ml-3.5">September 22, 2023.</span>
                  </div>

                  <p className="font-manropeL text-sm font-normal color-green-900 mt-4">
                    Having this product is the best thing that has happened to me in a very long time. Thank you so much
                    for this product. The shipping and delivery was also very good. But there a few tweaks that this can
                    actually have though.
                  </p>

                  <p className="text-custom-color39 font-manropeB text-xs font-semibold my-3">
                    322 people found this helpful
                  </p>

                  <button className="hidden sm:flex text-gray-300 items-center gap-2.5 font-manropeB text-sm font-medium rounded-[10px] border-[1px] border-gray-300 px-3 py-2 mr-3.5">
                    <Image src={likeIcon} alt="Like Icon" />
                    Helpful
                  </button>

                  <div className="flex sm:hidden pt-4 items-center">
                    <button className="text-gray-300 font-manropeB text-xs font-medium rounded-[5.897px] border-[1px] border-gray-300 py-[3px] px-[8px] mr-3.5">
                      Helpful
                    </button>
                    <hr className="w-px h-[15px] bg-brand-disabled2 text-brand-disabled2 border-0" />

                    <button className="text-gray-300 font-manropeB text-xs font-medium ml-3.5">Report</button>
                  </div>

                  <div className="mt-5 pt-[18px] pb-[46px] pr-[70px] pl-[16px] bg-custom-color38">
                    <div className="flex items-center justify-between w-full">
                      <h3 className="font-manropeB text-sm font-semibold">ZuriMarket</h3>
                      <p className="font-manropeL text-xs font-normal text-custom-color39">September 22, 2023.</p>
                    </div>
                    <p className="font-manropeL text-sm font-normal mt-4">
                      Having this product is the best thing that has happened to me in a very long time. Thank you so
                      much for this product. The shipping and delivery was also very good. But there a few tweaks that
                      this can actually have though.
                    </p>
                  </div>

                  <button
                    type="button"
                    className="hidden sm:flex text-base leading-6 mt-7  font-manropeB font-bold text-brand-green-primary mx-auto"
                  >
                    See more reviews
                  </button>
                </div>
                <div className="block sm:hidden">
                  <div className="flex mb-4 sm:hidden">
                    <div className="flex align-center gap-[5.3px]">
                      <Image src={profileImg} alt="Profile Img" className="block sm:hidden" />
                      <h3 className="text-green-900 sm:text-custom-color39 font-manropeL text-xs  mr-3.5">Dorcas</h3>
                    </div>
                    <hr className="hidden sm:block w-px h-3.5 bg-brand-disabled2 text-brand-disabled2 border-0" />
                    <span className="font-manropeL text-xs text-custom-color39 ml-3.5">September 22, 2023.</span>
                  </div>
                  <div className="flex item-center gap-4 sm:inline-block">
                    <div className="flex ">
                      <Image src={star1} alt="rating star" />
                      <Image src={star1} alt="rating star" />
                      <Image src={star1} alt="rating star" />
                      <Image src={star2} alt="rating star" />
                      <Image src={star2} alt="rating star" />
                    </div>

                    <div className="flex gap-2 align-center sm:hidden">
                      <Image src={verifyIcon} alt="Verify Icon" />
                      <p className="color-green-300 font-manropeB text-sm font-semibold text-brand-green-shade50">
                        Verified Purchase
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:flex mt-4">
                    <h3 className="text-green-900 sm:text-custom-color39 font-manropeL text-xs  mr-3.5">Dorcas</h3>

                    <hr className="hidden sm:block w-px h-3.5 bg-brand-disabled2 text-brand-disabled2 border-0" />
                    <span className="font-manropeL text-xs text-custom-color39 ml-3.5">September 22, 2023.</span>
                  </div>

                  <p className="font-manropeL text-sm font-normal color-green-900 mt-4">
                    Having this product is the best thing that has happened to me in a very long time. Thank you so much
                    for this product. The shipping and delivery was also very good. But there a few tweaks that this can
                    actually have though.
                  </p>

                  <p className="text-custom-color39 font-manropeB text-xs font-semibold my-3">
                    322 people found this helpful
                  </p>

                  <button className="hidden sm:flex text-gray-300 items-center gap-2.5 font-manropeB text-sm font-medium rounded-[10px] border-[1px] border-gray-300 px-3 py-2 mr-3.5">
                    <Image src={likeIcon} alt="Like Icon" />
                    Helpful
                  </button>

                  <div className="flex sm:hidden pt-4 items-center">
                    <button className="text-gray-300 font-manropeB text-xs font-medium rounded-[5.897px] border-[1px] border-gray-300 py-[3px] px-[8px] mr-3.5">
                      Helpful
                    </button>
                    <hr className="w-px h-[15px] bg-brand-disabled2 text-brand-disabled2 border-0" />

                    <button className="text-gray-300 font-manropeB text-xs font-medium ml-3.5">Report</button>
                  </div>

                  <div className="mt-5 pt-[18px] pb-[46px] pr-[70px] pl-[16px] bg-custom-color38">
                    <div className="flex items-center justify-between w-full">
                      <h3 className="font-manropeB text-sm font-semibold">ZuriMarket</h3>
                      <p className="font-manropeL text-xs font-normal text-custom-color39">September 22, 2023.</p>
                    </div>
                    <p className="font-manropeL text-sm font-normal mt-4">
                      Having this product is the best thing that has happened to me in a very long time. Thank you so
                      much for this product. The shipping and delivery was also very good. But there a few tweaks that
                      this can actually have though.
                    </p>
                  </div>

                  <button
                    type="button"
                    className="flex  leading-6 mt-7 text-base font-manropeB font-bold text-brand-green-primary"
                  >
                    <Link href={'/dashboard/reviews/product-details/1'}>See more reviews</Link>
                  </button>
                </div>

                <form action="" className="block sm:hidden">
                  <Link href={'/dashboard/reviews/new'}>
                    <textarea
                      id="about"
                      name="about"
                      rows={3}
                      className="block w-full rounded-xl text-custom-color39 border-0 border-custom-color32  py-2  shadow-sm ring-1 ring-inset ring-gray-300  min-h-[116px] placeholder:text-custom-color39  sm:text-sm sm:leading-6 pl-2 text-base font-bold "
                      placeholder="Write a customer review"
                      required
                    ></textarea>
                  </Link>
                </form>
              </div>
            </div>
          </div>

          {/* favorite products  */}
          <div className="mt-[4.4rem] mb-[2.37rem]">
            <div className="flex justify-between items-center mb-5 md:mb-2 lg:mb-[1.13rem]">
              <h3 className="text-custom-color31 font-manropeL font-bold md:text-2xl text-sm md:px-2 truncate w-[13.1875rem] md:w-full">
                Other Products By {product.category.name}{' '}
              </h3>
              <span className="flex items-center text-[#00894C] text-xs font-semibold font-manropeL gap-x-2 md:hidden">
                <Link href={'/shop'}>View all</Link> <ArrowRight2 size="20" color="#00894c" />
              </span>
            </div>
            <div className="md:mx-[0.66rem] mx-0 hidden lg:block">
              <ShopProductList products={products.slice(0, 8)} />
            </div>
            <div className="md:mx-[0.66rem] mx-0 hidden lg:hidden md:block">
              <ShopProductList products={products.slice(0, 6)} />
            </div>
            <div className="md:mx-[0.66rem] mx-0 md:hidden block">
              <ShopProductList products={products.slice(0, 4)} />
            </div>
            <div className="md:flex w-full justify-end hidden">
              <span className="flex py-3 px-5 gap-1 border-solid border border-white-120 rounded-lg mt-6 mb-[4.44rem] font-manropeL font-semibold tracking-[0.00088rem] text-sm items-center">
                <span className="text-[#009444]">
                  <Link href={'/shop'}>View All</Link>
                </span>
                <ArrowRight size="24" color="#009254" />
              </span>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
}

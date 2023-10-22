import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { ArrowLeft, ProfileCircle } from 'iconsax-react';
import { useCart } from './component/CartContext';
import { useAuth } from '../../context/AuthContext';
import { Products, ShopData } from '../../@types';
import { toast } from 'react-toastify';
import Image from 'next/image';
import star1 from '../../public/assets/star1.svg';
import star2 from '../../public/assets/star2.svg';
import Button from '@ui/Button';
import ShopProductList from './component/otherProductList';
import Breadcrumbs from '../shop/component/Breadcrumbs';
import TabContainer from '../shop/component/Tabbed';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Header from './component/productPage/Header';
import Footer from '../../components/Footer';
import Loader from '@ui/Loader';
import Head from 'next/head';
import Error from './component/error/Error';
import { formatToNigerianNaira } from '../../helpers/formatCurrency';
import { RatsData } from '../../@types';

export const CART_ENDPOINT =
  process.env.NEXT_PUBLIC_CART_API_URL || 'https://zuriportfolio-shop-internal-api.onrender.com/api/v1/checkout_cart/carts';

export default function ProductDetails() {
  const router = useRouter();
  const { auth } = useAuth();
  const { addToCart, cart } = useCart();
  const [product, setProduct] = useState<Products | null>(null);
  const [shopID, setShopID] = useState('');
  const [shopName, setShopName] = useState('');
  const [otherProducts, setOtherProducts] = useState<Products[]>([]);
  const [shopOwnerQuery, setShopOwnerQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const cartItemCount = cart.length;
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [rats, setRats] = useState<RatsData>();
  const { id } = router.query;


  const handleCategoryChange = () => {};
  const ZOOM = 250;

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`https://zuriportfolio-shop-internal-api.onrender.com/api/v1/product/${id}`)
        .then((response) => response.json())
        .then((response) => {
          setProduct(response.data);
          setShopID(response.data.shop.id);
          setShopName(response.data.shop.name);

          setTimeout(() => {
            setLoading(false);
          }, 1500);
        })
        .catch((error) => {
          console.error('Error fetching product details:', error);
          setProduct(null);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [router.query, auth]);

  useEffect(() => {
    if (shopID) {
      fetch(`https://zuriportfolio-shop-internal-api.onrender.com/api/shop/${shopID}`)
        .then((response) => response.json())
        .then((response) => {
          setOtherProducts(response.data.products);
        })
        .catch((error) => {
          console.error('Error fetching product details:', error);
          setOtherProducts([]);
        });
    }
  }, [shopID]);

  

  useEffect(() => {
    if (id) {
      const apiUrl: string = `https://team-liquid-repo.onrender.com/api/review/products/${id}/rating`;
      fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => setRats(data.data))
        .catch((e) => console.log(e));
    }
  }, [id]);

  const imgContRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const imgContElm = imgContRef.current;
    const imgElm = imgRef.current;

    const handleMouseEnter = () => {
      if (imgElm) {
        imgElm.style.width = ZOOM + '%';
        imgElm.style.height = ZOOM + '%';
      }
    };

    const handleMouseLeave = () => {
      if (imgElm) {
        resetImageStyles();
      }
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

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!product) {
    return (
      <>
        <Header
          setSearchQuery={setSearchQuery}
          setShopOwnerQuery={setShopOwnerQuery}
          cartItemCount={cartItemCount}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          handleCategoryChange={handleCategoryChange}
        />
        <div className="h-[85vh] flex items-center justify-center">
          <Error />
        </div>
        <Footer/>
      </>
    );
  }

  const handleAddToCart = async () => {
    if (isAddedToCart) {
      toast.error('This product is already in your cart', {
        position: 'top-right',
        autoClose: 3000,
      });
    } else if (!auth) {
      toast.error('Please Log in before Adding to the Cart', {
        position: 'top-right',
        autoClose: 3000,
      });
    } else {
      try {
        const response = await axios.post(
          `${CART_ENDPOINT}/carts`,
          {
            product_ids: [product.id],
          },
          {
            headers: {
              Authorization: `Bearer ${auth?.token}`,
            },
          },
        );
        if (response.status === 400) {
          // setIsAddedToCart(false);
          toast.success('Already in cart', {
            position: 'top-right',
            autoClose: 3000,
          });
        } else if (response.status === 201) {
          addToCart(product);
          setIsAddedToCart(true);
          toast.success('Added to Cart', {
            position: 'top-right',
            autoClose: 3000,
          }); 
        } else {
          toast.error('Failed to add to Cart', {
            position: 'top-right',
            autoClose: 3000,
          });
        }
      } catch (error) {
        console.error('Error adding to cart:', error);
      }
    }
  };

  const handleReadMoreClick = () => {
    setShowFullDescription(!showFullDescription); // Step 2
  };

  const description =
    product.description?.length <= 400
      ? product.description
      : showFullDescription
      ? product.description
      : product.description?.slice(0, 400);


    function getStars(avgRating: number) {
      let stars = [];
      for (let i = 0; i < 5; i++) {
        if (avgRating >= 1) {
          stars.push(<Image key={i} src={star1} alt="star" />);
        } else if (avgRating > 0) {
          stars.push(<Image key={i} src={star2} alt="star" />);
        } else {
          stars.push(<Image key={i} src={star2} alt="star" />);
        }
        avgRating--;
      }
      return stars;
    }

    const stars = getStars(rats?.averageRating! || 0) 
    

  return (
    <>
      <Head>
        <link rel="icon" href="/assets/zuriLogo.svg" />
        <title>{shopName ? `${shopName} Shop - ${product?.name} Details` : ''}</title>
        <meta name="description" content={`Explore the details of ${product?.name}. ${product?.description}`} />
        <meta property="og:title" content={shopName ? `${shopName} Shop - ${product?.name} Details` : ''} />
        <meta
          property="og:description"
          content={`Discover and explore the details of ${product?.name} by ${shopName} - ${product?.description}.`}
        />
        <meta
          property="og:url"
          content="https://zuriportfolio-frontend-pw1h.vercel.app/shop/product?id=ad509f1d-efa4-4f00-a6a4-20b30d3f10f9&shopName=Martinez%20and%20Sons"
        />
      </Head>

      <Header
          setSearchQuery={setSearchQuery}
          setShopOwnerQuery={setShopOwnerQuery}
          cartItemCount={cartItemCount}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          handleCategoryChange={handleCategoryChange}
        />
      <main className={`p-4 container mx-auto`}>
        <div className="self-start mb-[8px]">
          <span className="font-manropeEL text-xs md:text-sm tracking-[0.00375rem] md:tracking-[0.00088rem] font-normal lg:text-base">
            <Breadcrumbs shopId={shopID} productName={product.name} />
          </span>
        </div>
        <a onClick={() => router.back()} className="self-start">
          <ArrowLeft size="27" color="#000000" className="mb-[8px] cursor-pointer" />
        </a>

        {/* Product Details  */}
        <div className="flex lg:flex-row lg:h-[542px] h-full flex-col items-center justify-center gap-x-6 w-full">
          {/* Product Detail Images  */}
          <div className="flex flex-col w-full lg:h-[542px] h-full item-center lg:gap-y-2">
            <div
              className="img-container w-full lg:h-full md:h-[20rem] sm:h-[17rem] h-[11.25rem] hover:cursor-zoom-in relative overflow-hidden rounded-lg"
              ref={imgContRef}
            >
              <Image
                ref={imgRef}
                src={product.image && product.image[0] ? product.image[0].url : ''}
                alt={product.name}
                fill
                style={{ objectFit: 'cover' }}
                sizes="100vw"
                priority
                className="img max-w-none w-full h-auto absolute"
              />
            </div>
          </div>

          {/* Product Detail Data */}
          <div className="lg:space-y-0 space-y-4 w-full lg:h-[542px] h-full flex flex-col justify-between">
            <div>
              <div>
                <h1 className="md:text-2xl md:font-bold text-black capitalize lg:text-3xl lg:font-semibold md:mt-4 text-base font-semibold font-manropeL mt-6 tracking-[0.005rem] lg:mt-0">
                  {product?.name}
                </h1>
                <div className="flex py-2 items-center">
                  <ProfileCircle color="#464646" variant="Bulk" className="w-6 h-6 md:w-9 md:h-9" />
                  <p className="w-fit  font-manropeB font-bold capitalize text-xs tracking-[0.003rem] md:tracking-[0.005rem] ml-1 md:font-semibold md:text-base">
                    {shopName}
                  </p>
                </div>
              </div>
              <div>
                <p className="lg:hidden text-base font-semibold md:font-bold md:text-lg font-manropeL tracking-[0.00088rem] py-2 md:pb-1">
                  Description
                </p>
                <p className="font-normal font-manropeL capitalize  text-custom-color43 text-sm md:text-base lg:text-lg tracking-[0.005rem] w-full line-clamp-3 lg:mt-6 lg:mb-8 text-wrapper">
                  {description}{' '}
                </p>
                {product.description.length > 400 && ( // Step 3
                  <span
                    onClick={handleReadMoreClick}
                    className="text-[#009254] font-manropeL font-bold md:block hidden"
                  >
                    {showFullDescription ? 'Read less' : 'Read more'}
                  </span>
                )}

                <div className="lg:flex flex-col gap-y-2 hidden">
                  <div className="flex gap-x-1 mt-">
                    <p className=" text-base font-semibold font-manropeB leading-normal tracking-tight"></p>
                    <div className="flex items-center font-manropeL">
                      {stars}
                      {getStars(0) ? 
                        `(no ratings for this product)` : null
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <hr className="bg-white-110 text-white-110 h-[2px] border-0 lg:block hidden  mb-[3.625rem]" />
            </div>

            <div className="flex flex-col gap-y-1 md:gap-y-2">
              <p className="text-base lg:text-lg font-normal font-manropeL leading-normal tracking-tight mt-2">
                Total Payment (Incl. taxes)
              </p>
              <p className="flex gap-x-4 items-center">
                <span className="text-black text-xl md:text-3xl lg:text-3xl font-normal lg:font-semibold font-manropeEB leading-10">
                  {product?.discount_price === '0.00'
                    ? formatToNigerianNaira(product?.price)
                    : formatToNigerianNaira(product?.discount_price)}
                </span>
                <span className="text-xl font-light md:text-2xl lg:text-[1.375rem] font-manrope line-through leading-7 text-gray-300">
                  {product?.discount_price === '0.00' ? null : formatToNigerianNaira(product?.price)}
                </span>
              </p>

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
        </div>

        {/* Description, Specification, Reviews (Desktop View)  */}
        <span id="description" className="mt-10">
          <TabContainer />
        </span>

        {/* favorite products  */}
        <div className="mt-[4.4rem] mb-[2.37rem]">
          <div className="flex justify-between items-center mb-5 md:mb-2 lg:mb-[1.13rem]">
            <h3 className="text-custom-color31 font-manropeL font-bold md:text-2xl text-sm md:px-2 truncate w-full">
              Other Products By {shopName}{' '}
            </h3>
          </div>
          {otherProducts.length > 0 ? (
            <>
              <div className="md:mx-[0.66rem] mx-0 hidden lg:block">
                <ShopProductList products={otherProducts.slice(0, 8)} productId={product.id} shopName={shopName} />
              </div>
              <div className="md:mx-[0.66rem] mx-0 hidden lg:hidden md:block">
                <ShopProductList products={otherProducts.slice(0, 6)} productId={product.id} shopName={shopName} />
              </div>
              <div className="md:mx-[0.66rem] mx-0 md:hidden block">
                <ShopProductList products={otherProducts.slice(0, 4)} productId={product.id} shopName={shopName} />
              </div>
            </>
          ) : (
            <div className="mt-8 py-8 px-4 text-center rounded-2xl border border-dark-110/20 text-dark-110 font-manropeL text-xl md:text-2xl font-semibold">
              No Product To Show
            </div>
          )}
        </div>
      </main>
      <Footer/>
    </>
  );
}

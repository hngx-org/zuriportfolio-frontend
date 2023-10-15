import Image from 'next/image';
import mainImage from '../../public/assets/mainImage.png';
import star1 from '../../public/assets/star1.svg';
import star2 from '../../public/assets/star2.svg';
import likeIcon from '../../public/assets/icons/like.svg';
import verifyIcon from '../../public/assets/icons/verify.svg';
import profileImg from '../../public/assets/images/profile-img.png';
import Slider from './component/slider';
import { useRouter } from 'next/router';
import Button from '@ui/Button';
import TabContainer from './component/Tabbed';
import { useEffect, useState } from 'react';
import CategoryLayout from './component/layout/category-layout';
import { ArrowRight } from 'iconsax-react';
import axios from 'axios';
import { ProductData } from '../../@types';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../context/AuthContext';
import { isUserAuthenticated } from '@modules/marketplace/hooks/useAuthHelper';

export default function ProductDetailsDescription() {
  const { auth } = useAuth();
  const [product, setProduct] = useState<ProductData | null>(null);
  const [image, setImage] = useState(product?.images[0].url);
  const router = useRouter();
  const { id } = router.query;
  const token: any = isUserAuthenticated();

  const apiUrl: string = token
    ? `https://coral-app-8bk8j.ondigitalocean.app/api/getproduct/${id}/${token?.id}/?guest=false`
    : `https://coral-app-8bk8j.ondigitalocean.app/api/getproduct/${id}/none/?guest=true`;

  useEffect(() => {
    // Fetch data using Axios
    const headers = {
      accept: 'application/json',
      'X-CSRFToken': 'auL3OR9xSygssFcGGBdq8TOqKbedQO41syRGOb1XXFCvkhMssKudWDxIrgEQp2YC',
    };
    axios
      .get<ProductData>(apiUrl, { headers })
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [apiUrl, id]);

  const addToCart = async () => {
    const apiUrl = `https://zuri-cart-checkout.onrender.com/api/checkout/api/carts`;
    if (token?.id) {
      try {
        const response = await axios.post(
          apiUrl,
          { product_ids: [`${id}`] },
          {
            headers: {
              Authorization: `Bearer ${auth?.token}`,
            },
          },
        );

        if (response.status === 200) {
          toast.success('Added to Cart');
          console.log('success');
        }
      } catch (error: any) {
        console.error(error);
        toast.error(error.message);
      }
    } else {
      const products: any[] = [];

      let productData = {
        productId: product?.id,
        productImage: product?.images[0]?.url,
        productTitle: product?.name,
        productSize: product?.quantity,
        productSeller: `${product?.user?.first_name} ${product?.user.last_name}`,
        productPrice: product?.price,
      };
      products.push(productData);
      localStorage.setItem('products', JSON.stringify(products));
      console.log(products);
      toast.success('Item added to cart🎊');
    }
  };

  const addToWishlist = async () => {
    const data = {
      product_id: product?.id,
      user_id: token?.id,
    };

    try {
      const response = await axios.post('https://coral-app-8bk8j.ondigitalocean.app/api/wishlist/', data);

      console.log(response);
      if (response.status === 201) {
        toast.success(response.data.message);
      }

      if (response.status === 200) {
        toast.success(response.data.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const renderRatingStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const starType = i <= rating ? 'star1' : 'star2';
      stars.push(<Image src={starType === 'star1' ? star1 : star2} alt={`Star ${i}`} key={i} />);
    }
    return stars;
  };

  const updateImage = (newImage: any) => {
    setImage(newImage);
  };
  const [showAll, setShowAll] = useState(false);
  const specificationData = [
    'Adaptable with HTML5  and CSS3',
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

  const handleShowMoreClick = () => {
    setShowAll(!showAll);
  };

  return (
    <CategoryLayout>
      <div className="whitespace-nowrap overflow-hidden ml-[70px]"></div>
      {/* lg:px-[100px] md:px-10*/}
      <main className={`flex flex-col items-center max-w-[1240px] mx-auto lg:px-0 px-4 lg:pt-6 pt-4 lg:pb-6 pb-4`}>
        {/* Product Details  */}
        <div className="flex lg:flex-row flex-col items-center justify-center gap-x-6 w-full">
          {/* Product Detail Images  */}
          <div className="flex flex-col w-full item-center lg:gap-y-4 md:gap-y-2 gap-y-3 gap-x-10 mx-auto pb-6">
            <Image
              src={product?.images[0]?.url}
              width={500}
              height={500}
              alt="Main Image"
              className="w-full lg:h-[520px] md:h-[600px] h-[340px] object-cover lg:rounded-3xl rounded-lg"
            />
            {product?.images[0]?.url > 1 && <Slider updateImage={updateImage} slider0={product?.images[0]?.url} />}
          </div>

          {/* Product Detail Data */}
          <div className="space-y-6 w-full">
            <h1 className="sm:text-4xl text-base font-semibold font-manropeEB md:leading-[44px] leading-[24px] tracking-tighter">
              {product?.name}
            </h1>

            <div>
              <p className="lg:hidden block sm:text-2xl text-sm sm:leading-8 leading-5 font-semibold">Description</p>
              <p className="text-base font-normal font-manropeL leading-normal tracking-tight flex flex-col">
                {product?.description} <b className="text-green-600 hidden">Read More...</b>
              </p>
            </div>

            <div className="flex flex-col gap-y-2">
              <div className="flex gap-x-1">
                <p className=" text-base font-semibold font-manropeB leading-normal tracking-tight">
                  {product?.rating ? product?.rating : '3'}/5
                </p>
                {product?.rating ? (
                  renderRatingStars(product?.rating)
                ) : (
                  <>
                    <Image src={star1} alt="rating star" />
                    <Image src={star1} alt="rating star" />
                    <Image src={star1} alt="rating star" />
                    <Image src={star2} alt="rating star" />
                    <Image src={star2} alt="rating star" />
                  </>
                )}
              </div>
              <p className="text-black text-base font-normal font-manropeL leading-normal tracking-tight">
                (50 Customers)
              </p>
            </div>

            <hr className="bg-white-110 text-white-110 h-[2px] border-0 lg:block hidden" />

            <div className="flex flex-col gap-y-2 lg:pb-10 pb-0">
              <p className="text-base font-normal font-manropeL leading-normal tracking-tight">
                Total Payment (Incl. taxes)
              </p>
              <p className="flex gap-x-4 items-center">
                <span className="text-black text-[32px] font-semibold font-manropeEB leading-10">
                  {product?.discount_price === '0.00'
                    ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
                        parseFloat(product?.price),
                      )
                    : product?.discount_price}
                </span>
                <span className="text-[22px] font-normal font-manrope line-through leading-7 text-gray-300">
                  {product?.discount_price === '0.00' ? null : `${product?.price}`}
                </span>
              </p>
            </div>

            <div className="flex md:flex-row flex-col gap-[10px] font-normal font-base leading-6">
              <Button
                onClick={() => addToCart()}
                intent={'primary'}
                size={'lg'}
                className="md:px-14 sm:w-fit w-full font-normal text-base leading-6 rounded-lg tracking-[0.08px]"
              >
                Add to cart
              </Button>

              {/* Remove the "auth &&" to to view it in localhost  */}
              {token?.id && (
                <Button
                  className="lg:px-6 md:px-14 sm:w-fit w-full font-normal text-base leading-6 rounded-lg text-custom-color11 tracking-[0.08px]"
                  rightIcon={<ArrowRight color="#009254" />}
                  intent={'secondary'}
                  size={'lg'}
                  onClick={() => addToWishlist()}
                >
                  Add to Wishlist
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Description, Specification, Reviews (Desktop View)  */}
        {/* Pass all the data down to this component as props  */}
        <TabContainer desc={product?.description} />

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

          <hr className="bg-brand-disabled text-brand-disabled h-[1px] w-full border-0  sm:hidden" />

          <div className="mt-4">
            <h2 className="text-[#101928] font-manropeB font-semibold text-[22px] text-left">Customer Feedback</h2>
            <p className="text-sm font-manropeL mt-4">
              VERIFIED RATINGS <span>(173)</span>
            </p>

            <div className="mt-10 grid gap-10 grid-rows-[1fr] sm:grid-cols-[0.5fr_1fr] items-start">
              <div className="w-6/12 py-8 px-6 flex flex-col gap-[20px] rounded-2xl border-custom-color32 border-[1px] items-center sm:w-full">
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
                    Having this product is the best thing that has happened to me in a very long time. Thank you so much
                    for this product. The shipping and delivery was also very good. But there a few tweaks that this can
                    actually have though.
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
                    Having this product is the best thing that has happened to me in a very long time. Thank you so much
                    for this product. The shipping and delivery was also very good. But there a few tweaks that this can
                    actually have though.
                  </p>
                </div>

                <button
                  type="button"
                  className="flex  leading-6 mt-7 text-base font-manropeB font-bold text-brand-green-primary"
                >
                  See more reviews
                </button>
              </div>

              <form action="" className="block sm:hidden">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  className="block w-full rounded-xl text-custom-color39 border-0 border-custom-color32  py-2  shadow-sm ring-1 ring-inset ring-gray-300  min-h-[116px] placeholder:text-custom-color39  sm:text-sm sm:leading-6 pl-2 text-base font-bold "
                  placeholder="Write a customer review"
                  required
                ></textarea>
              </form>
            </div>
          </div>
        </div>

        {/* favorite products  */}
        <div></div>
      </main>
      <ToastContainer />
    </CategoryLayout>
  );
}

// 656525652ad33a@beaconmessenger.com656525652ad33a@beaconmessenger.com
// TeaBread1234

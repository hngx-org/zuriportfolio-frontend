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
import MainLayout from '../../components/Layout/MainLayout';
import TabContainer from './component/Tabbed';
import { useState } from 'react';
import CategoriesNav from './component/CategoriesNav/CategoriesNav';

export default function ProductDetailsDescription() {
  const [showAll, setShowAll] = useState(false);
  const router = useRouter();
  const specificationData = [
    'Adaptable with HTML5  and CSS3',
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

  const navItems: string[] = [
    'All Categories',
    ' Design & Graphics',
    ' Development & Programming',
    ' Content Creation',
    ' Digital Arts & Media',
    ' Audio & Sound',
    ' Photography',
    ' More...',
  ];

  return (
    <MainLayout activePage="product-details" showDashboardSidebar={false} showFooter={true} showTopbar={true}>
      <div className="whitespace-nowrap overflow-hidden">
        <CategoriesNav navItems={navItems} />
      </div>
      {/* lg:px-[100px] md:px-10*/}
      <main className={`flex flex-col items-center max-w-[1240px] mx-auto  px-6 lg:pt-6 pt-4 lg:pb-6 pb-4`}>
        {/* Product Details  */}
        <div className="flex lg:flex-row flex-col items-center lg:justify-between justify-center gap-y-3 xl:gap-x-0 lg:gap-x-10 gap-x-0 w-full">
          {/* Product Detail Images  */}
          <div className="flex flex-col w-full item-center lg:gap-y-4">
            <Image
              src={mainImage}
              alt="Main Image"
              className="lg:w-[520px] md:w-[750px] w-[350px] lg:h-[520px] md:h-[600px] h-[340px] lg:object-cover object-contain rounded-3xl"
            />
            <Slider />
          </div>

          {/* Product Detail Data */}
          <div className="space-y-6 w-full">
            <h1 className="md:text-4xl text-base font-semibold font-manropeEB md:leading-[44px] leading-[24px] gap-x-">
              Webinar and Course Slide
              <span> Templates by Sarah Rino (Soft Copy)</span>
            </h1>
            <p className="text-base font-normal font-manropeL leading-normal tracking-tight flex flex-col">
              Empower your educational endeavors with our Webinar and Course Template. Craft immersive online learning
              experiences that captivate audiences. Seamlessly integrate multimedia elements, quizzes, and discussions
              to enrich <b className="text-green-600 lg:hidden flex">Read More...</b>
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

            <hr className="bg-white-110 text-white-110 h-[2px] border-0 lg:block hidden" />

            <div className="flex flex-col gap-y-2 lg:pb-10 pb-0">
              <p className="text-base font-normal font-manropeL leading-normal tracking-tight">
                Total Payment (Incl. taxes)
              </p>
              <p className="flex gap-x-4 items-center">
                <span className="text-black text-[32px] font-semibold font-manropeEB leading-10">$100.00</span>
                <span className="text-[22px] font-normal font-manrope line-through leading-7 text-gray-300">
                  $120.00
                </span>
              </p>
            </div>

            <Button intent={'primary'} size={'lg'} className="lg:px-5 md:px-14 sm:w-fit  w-full">
              Add to cart
            </Button>
          </div>
        </div>

        {/* Description, Specification, Reviews (Desktop View)  */}
        <TabContainer />

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
                  className="hidden sm:flex text-base font-semibold leading-6 mt-7 text-base font-manropeB font-bold text-brand-green-primary mx-auto"
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
                  className="flex text-base font-semibold leading-6 mt-7 text-base font-manropeB font-bold text-brand-green-primary"
                >
                  See more reviews
                </button>
              </div>

              <form action="" className="block sm:hidden">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  className="block w-full rounded-xl text-custom-color39 border-0 border-custom-color32 text-base font-bold py-2  shadow-sm ring-1 ring-inset ring-gray-300 pl-2 min-h-[116px] placeholder:text-custom-color39  sm:text-sm sm:leading-6 pl-2 text-base font-bold "
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
    </MainLayout>
  );
}

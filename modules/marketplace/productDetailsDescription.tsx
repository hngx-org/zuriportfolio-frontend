import Image from 'next/image';
import mainImage from '../../public/assets/mainImage.png';
import star1 from '../../public/assets/star1.svg';
import star2 from '../../public/assets/star2.svg';
import Slider from './component/slider';
import { useRouter } from 'next/router';
import Button from '@ui/Button';

export default function ProductDetailsDescription() {
  const router = useRouter();

  return (
    <main className={`flex flex-col items-center lg:px-[100px] md:px-10 px-6 lg:pt-6 pt-4 lg:pb-6 pb-4`}>
      {/* Product Details  */}
      <div className="flex lg:flex-row flex-col items-center justify-center gap-y-3 w-full">
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
            <span>Templates by Sarah Rino (Soft Copy)</span>
          </h1>
          <p className="text-base font-normal font-manropeL leading-normal tracking-tight flex flex-col">
            <span>Empower your educational endeavors with our Webinar and Course Template.</span>
            <span>Craft immersive online learning experiences that captivate audiences. </span>
            <span>Seamlessly integrate multimedia elements, quizzes, and discussions to enrich...</span>
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

          <hr className="bg-[#EEEEEE] text-[#EEEEEE] h-[2px] border-0 lg:block hidden" />

          <div className="flex flex-col gap-y-2 pb-10">
            <p className="text-base font-normal font-manropeL leading-normal tracking-tight">
              Total Payment (Incl. taxes)
            </p>
            <p className="flex gap-x-4 items-center">
              <span className="text-black text-[32px] font-semibold font-manropeEB leading-10">$100.00</span>
              <span className="text-[22px] font-normal font-manrope line-through leading-7 text-gray-200/">
                $120.00
              </span>
            </p>
          </div>

          <Button intent={'primary'} size={'lg'}>
            Add to cart
          </Button>
        </div>
      </div>

      {/* Description, Specification, Reviews  */}
      <div> </div>

      {/* favorite products  */}
      <div></div>
    </main>
  );
}

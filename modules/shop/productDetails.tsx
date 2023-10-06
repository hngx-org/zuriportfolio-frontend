import Image from 'next/image';
import mainImage from '../../public/assets/mainImage.png';
import star1 from '../../public/assets/star1.svg';
import star2 from '../../public/assets/star2.svg';
import Slider from './component/slider';
import { useRouter } from 'next/router';
import Button from '@ui/Button';
import { ProfileCircle } from 'iconsax-react';
import { ArrowLeft } from 'iconsax-react';


const lens = document.getElementById('lens');
const second = document.getElementById('second');

function zoomOnHover(e: React.MouseEvent<HTMLDivElement>) {
    const target = e.target as HTMLDivElement;
    const offsetLeft = target.offsetLeft;
    const offsetTop = target.offsetTop;
  
    var x = e.clientX - offsetLeft
    var y = e.clientY - offsetTop

    if (lens && lens.style) {
        lens.style.display = 'block';
        lens.style.left = x + 'px';
        lens.style.top = y + 40 + 'px';
      }

    if (second && second.style) {
        second.style.backgroundPosition = (x - (500 / 2 / 6)) * -6 + 'px ' + (y - (500 / 2 / 6) + 250) * -6 + 'px';
    }
  }

function mouseOut() {
    if(lens && lens.style){
        lens.style.display = 'none';
    }
}

export default function ProductDetails() {
  const router = useRouter();

  return (
    
    <main className={`flex flex-col items-center lg:px-12 md:px-10 px-6 lg:pt-6 pt-4 lg:pb-6 pb-4`}>
    <ArrowLeft size="32" color="#000000" className='self-start'/>
      {/* Product Details  */}
      <div className="flex lg:flex-row flex-col items-center justify-center gap-x-6 w-full">
        {/* Product Detail Images  */}
        <div className="flex flex-col w-full item-center lg:gap-y-4">
            <div>
                <div id='first' onMouseOut={mouseOut} onMouseMove={e => zoomOnHover(e)} className='peer'>
                <span className='w-32 h-32 bg-black/40 absolute border-2 translate-x-2/4 -translate-y-2/4 hidden' id='lens'></span>
                <Image
                src={mainImage}
                alt="Main Image"
                className="lg:w-full md:w-[750px] w-[350px] lg:h-[520px] md:h-[600px] h-[340px] lg:object-cover object-contain rounded-3xl"
                />
                </div>
                <div className='absolute w-2/4 h-[65vh] left-[50%] top-8 overflow-hidden bg-black bg-[size:600%_600%] bg-[url("../public/assets/mainImage.png")] rounded-3xl hidden peer-hover:block' id='second'>
                </div>
            </div>
          <Slider />
        </div>

        {/* Product Detail Data */}
        <div className="space-y-6 w-full md:mt-8">
          <h1 className="md:text-4xl text-base font-semibold font-manropeEB md:leading-[44px] leading-[24px] gap-x-">
            Webinar and Course Slide (Soft Copy)
          </h1>
          <div className="flex items-center">
            <ProfileCircle size="32" color="#464646" variant="Bulk" />
            <p className="w-fit ml-2">Fola Kingsley</p>
          </div>
          <p className="text-base font-normal font-manropeL leading-normal tracking-tight flex flex-col">
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
            <hr className="bg-[#EEEEEE] text-[#EEEEEE] h-[2px] border-0 lg:block hidden mt-12" />
          </div>

          <div className="flex flex-col gap-y-2">
            <p className="text-base font-normal font-manropeL leading-normal tracking-tight  mt-7">
              Total Payment (Incl. taxes)
            </p>
            <p className="flex gap-x-4 items-center">
              <span className="text-black text-[32px] font-semibold font-manropeEB leading-10">$100.00</span>
              <span className="text-[22px] font-normal font-manrope line-through leading-7 text-[#8D9290]">
                $120.00
              </span>
            </p>
          </div>

          <Button intent={'primary'} size={'lg'} className="w-5/12">
            Add to cart
          </Button>
        </div>
      </div>

      {/* Description, Specification, Reviews  */}
      <div></div>

      {/* favorite products  */}
      <div className="self-start mt-20">
        <h2 className="font-manropeB text-2xl text-[#2E3130] font-bold">Other Products by Fola Kingsley</h2>
      </div>
    </main>
  );
}

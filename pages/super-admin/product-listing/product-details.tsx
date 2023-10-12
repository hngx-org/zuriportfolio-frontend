import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Slider from '../../../modules/super-admin/components/slider/slider';
import mainImage from '../../../public/assets/mainImage.png';
import arrowRight from '../../../public/assets/arrowtoRight.svg';
import profileimage from '../../../public/assets/profile.png';
import badgesanctioned from '../../../public/assets/BadgeSanctioned.svg';
import star1 from '../../../public/assets/star1.svg';
import star2 from '../../../public/assets/star2.svg';
import Button from '@ui/Button';
import Navbar from '../../../modules/super-admin/components/navigations/SuperAdminNavbar';

const productsDetail = () => {
  return (
    <div className="max-w-[95%] m-auto ">
      <div className="lg:mx-5 mx-3">
        <Navbar />

        <div className="flex gap-[16px] py-3 border-b-[1px] border-custom-color1">
          <Image src={arrowRight} alt="arrowRight" />
          <p className="font-manropeB text-[18px] font-medium text-gray-900">Products Details</p>
        </div>

        <div className="flex gap-[28px] flex-col lg:flex-row">
          <div className="flex flex-col mt-6 gap-[16px] lg:w-1/2">
            <Image src={mainImage} alt="Main Image" className="w-90% lg:object-cover object-contain rounded-2xl" />
            <Slider />
          </div>

          <div className="flex lg:w-1/2 lg:mt-6 flex-col">
            <h1 className="font-manropeEB md:text-[32px] text-[22px] mb-2 lg:font-semibold text-custom-color11 font-bold  ">
              Webinar and Course Slide Templates (Soft Copy)
            </h1>

            <div className="flex justify-between items-start mb-6">
              <div className="flex gap-[4px] items-start ">
                <Image src={profileimage} alt="profileimg" />
                <p className="font-manropeB font-semibold tracking-[0.035px] md:tracking-[0.08px]">Fola Kingsley</p>
              </div>
              <div className="flex space-y-2 items-end flex-col">
                <div className="flex font-manropeB gap-[18px] text-custom-color43 text-[12px]">
                  <p className="font-bold">Date Added</p>
                  <p>08-01-23</p>
                </div>
                <div className="flex font-manropeB text-custom-color43  gap-[18px] text-[12px]">
                  <p className="font-bold">Date Sanctioned</p>
                  <p>08-01-23</p>
                </div>
                <Image src={badgesanctioned} alt="badgeStatus" />
              </div>
            </div>

            <div className="flex space-y-4 flex-col pb-6">
              <p className="font-manropeL text-[12px] md:text-[16px] md:tracking-[0.08px] text-white-700 lg:text-[16px]">
                Empower your educational endeavors with our Webinar and Course Template. Craft immersive online learning
                experiences that captivate audiences. Seamlessly integrate multimedia elements, quizzes, and discussions
                to enrich the learning journey. Tailor the template to your brand with customizable design options.
                Track learner progress, foster collaboration, and gain insights through built-in analytics. Whether
                you&apos;re an educator or a business, this template streamlines course creation, webinar hosting, and
                community building. Elevate your online education with a user-friendly, responsive, and feature-rich
                solution that engages and enlightens learners.
              </p>

              <div className="flex flex-col gap-y-2 ">
                <div className="flex gap-x-1">
                  <p className=" text-base font-semibold font-manropeB leading-normal tracking-[0.08px]">3.3/5</p>
                  <Image src={star1} alt="rating star" />
                  <Image src={star1} alt="rating star" />
                  <Image src={star1} alt="rating star" />
                  <Image src={star2} alt="rating star" />
                  <Image src={star2} alt="rating star" />
                </div>
                <p className="text-base font-manropeL text-[14px] leading-normal tracking-[0.035px] md:text-[16px] lg:tracking-[0.08px]">
                  (50 Customers)
                </p>
              </div>
            </div>
            <div className="flex space-y-8  lg:space-y-4 flex-col">
              <div className="flex flex-col space-y-3">
                <div className="flex justify-between items-center">
                  <p className="font-manropeB text-[14px]  tracking-[0.035px] text-custom-color43  md:text-[16px]">
                    Sales Price (Incl. taxes)
                  </p>
                  <p className="font-manropeB text-[16px]  font-semibold md:text-[24px]"> $100.00</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="font-manropeB text-[14px]  tracking-[0.035px] text-custom-color43  md:text-[16px]">
                    Collection(s)
                  </p>
                  <p className="font-manropeB text-[16px]  font-semibold md:text-[24px]"> Templates, Courses</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="font-manropeB text-[14px]  tracking-[0.035px] text-custom-color43  md:text-[16px]">
                    Total Sold
                  </p>
                  <p className="font-manropeB text-[16px]  font-semibold md:text-[24px] "> 123</p>
                </div>
              </div>

              <div className="flex py-8 justify-center space-x-9">
                <Button
                  intent={'secondary'}
                  className="text-brand-red-primary border-brand-red-primary lg:w-[284.5px] lg:h-[60px] md:w-[359px] md:h-[52px] w-[145.5px] "
                >
                  <span className="font-manropeL text-[12px]">Permanently Delete</span>
                </Button>
                <Button
                  intent={'primary'}
                  className="lg:w-[284.5px] lg:h-[60px]lg:w-[284.5px] lg:h-[60px] md:w-[359px] md:h-[52px] w-[145.5px]"
                >
                  <span className="font-manropeL text-[12px]">Remove Sanction</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default productsDetail;

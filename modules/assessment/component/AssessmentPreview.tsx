import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft2 } from 'iconsax-react';

export default function Preview() {
  return (
    <div className="mb-32 mt-[-7%] md:mt-[-2%]">
      <Image
        src="/assets/header-image/header-body.png"
        width={1440}
        height={48}
        style={{ width: '100%' }}
        alt="header-image"
      />
      <div className="flex items-center justify-between px-12 pb-1 pt-7 md:px-24">
        <div>
          <Link href={'/'} className="hover:underline flex items-center gap-1">
            <ArrowLeft2 size="20" color="#000" />
            Go back
          </Link>
        </div>

        {/* <div className="flex gap-2 ">
          <button className='bg-white-100 text-brand-green-primary hover:bg-[#F4FBF6] focus:shadow-brand-green-shd active:bg-brand-green-shd disabled:bg-brand-disabled border-solid border-[2px] border-brand-green-primary text-base py-3 px-4 rounded-[16px]'>
            Secondary
          </button>
          <button className='bg-brand-green-primary text-white-100 hover:bg-brand-green-hover focus:bg-brand-green-focused active:bg-brand-green-pressed disabled:bg-brand-disabled disabled:cursor-not-allowed text-base py-3 px-4 rounded-[16px]'>
            Publish announcements
          </button>
        </div>*/}
      </div>

      <div className=" border-b border-[#CAEAD4] pb-0">
        <div className="flex justify-center items-center gap-12">
          <Link href={'/assessment/preview'}>
            <button
              style={{
                color: 'rgba(191, 132, 67, 1)',
                borderBottom: '4px solid #BF8443',
                borderRadius: '2px',
                fontSize: '16px',
              }}
              className="font-manrope font-semibold py-2 text-base tracking-[0.5%]"
            >
              Preview
            </button>
          </Link>
          <Link href={'/assessment/response'}>
            <button className="font-manrope font-semibold text-base text-[#546069] tracking-[0.5%]">Response</button>
          </Link>
        </div>
      </div>

      {/* Q&A container*/}
      <div className="flex flex-col justify-center items-center">
        {/* first */}
        <div className="py-[32px] px-[24px] border border-[#DFE3E6] rounded-[16px] mt-6 w-[328px] md:w-[608px]">
          <h1 className=" text-[#009254] font-bold text-[22px] text-center font-manrope leading-7 mb-5">
            Question 1 out of 10
          </h1>
          <div className="pl-6">
            <p className="font-normal mb-3 font-manrope leading-5 text-[#2E3130]">
              What is the primary goal of a &apos;landing page in digital marketing?
            </p>
            <span className=" text-[#004FC4] text-sm tracking-[0.5%] font-normal">Pick only one correct answer</span>
          </div>

          {/* Checkbox Q&A*/}
          <div className="mt-12 flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <input
                type="radio"
                value=""
                name="default-radio"
                className="min-w-[24px] min-h-[24px] accent-[#009254]"
              />
              <label className="text-[#5B5F5E] font-normal text-sm tracking-[0.5%]">To provide customer support</label>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="radio"
                value=""
                name="default-radio"
                className="min-w-[24px] min-h-[24px] accent-[#009254]"
              />
              <label className="text-[#5B5F5E] font-normal text-sm tracking-[0.5%]">
                To showcase the company&apos;s history
              </label>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="radio"
                value=""
                name="default-radio"
                className="min-w-[24px] min-h-[24px] accent-[#009254]"
              />
              <label className="text-[#5B5F5E] font-normal text-sm tracking-[0.5%]">
                To collect visitor information or encourage a specific action
              </label>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="radio"
                value=""
                name="default-radio"
                className="min-w-[24px] min-h-[24px] accent-[#009254]"
              />
              <label className="text-[#5B5F5E] font-normal text-sm tracking-[0.5%]">To display a blog</label>
            </div>
          </div>
        </div>

        {/* second */}
        <div className="py-[32px] px-[24px] border border-[#DFE3E6] rounded-[16px] mt-6 w-[328px] md:w-[608px]">
          <h3 className="text-[#009254] font-bold text-[22px] text-center font-manrope leading-7 mb-5">
            Question 2 out of 10
          </h3>
          <div className="">
            <p className="font-normal mb-3 font-manrope leading-5 text-[#2E3130]">
              In digital marketing, a higher bounce rate on a website is always a negative indicator of performance.
            </p>
            <label className=" text-[#004FC4] text-sm tracking-[0.5%] font-normal">Choose either true of false</label>
          </div>

          {/* Checkbox Q&A*/}
          <div className="mt-12 flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <input
                type="radio"
                value=""
                name="default-radio"
                className="min-w-[24px] min-h-[24px] accent-[#009254]"
              />
              <label className="text-[#5B5F5E] font-normal text-sm tracking-[0.5%]">True</label>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="radio"
                value=""
                name="default-radio"
                className="min-w-[24px] min-h-[24px] accent-[#009254]"
              />
              <label className="text-[#5B5F5E] font-normal text-sm tracking-[0.5%]">false</label>
            </div>
          </div>
        </div>

        {/* third */}
        <div className="py-[32px] px-[24px] border border-[#DFE3E6] rounded-[16px] mt-6 w-[328px] md:w-[608px]">
          <h1 className=" text-[#009254] font-bold text-[22px] text-center font-manrope leading-7 mb-5">
            Question 3 out of 10
          </h1>
          <div className="pl-6">
            <p className="font-normal mb-3 font-manrope leading-5 text-[#2E3130]">
              What is the primary goal of a &apos;landing page in digital marketing?
            </p>
            <span className=" text-[#004FC4] text-sm tracking-[0.5%] font-normal">Pick only one correct answer</span>
          </div>

          {/* Checkbox Q&A*/}
          <div className="mt-12 flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <input
                type="radio"
                value=""
                name="default-radio"
                className="min-w-[24px] min-h-[24px] accent-[#009254]"
              />
              <label className="text-[#5B5F5E] font-normal text-sm tracking-[0.5%]">To provide customer support</label>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="radio"
                value=""
                name="default-radio"
                className="min-w-[24px] min-h-[24px] accent-[#009254]"
              />
              <label className="text-[#5B5F5E] font-normal text-sm tracking-[0.5%]">
                To showcase the company&apos;s history
              </label>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="radio"
                value=""
                name="default-radio"
                className="min-w-[24px] min-h-[24px] accent-[#009254]"
              />
              <label className="text-[#5B5F5E] font-normal text-sm tracking-[0.5%]">
                To collect visitor information or encourage a specific action
              </label>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="radio"
                value=""
                name="default-radio"
                className="min-w-[24px] min-h-[24px] accent-[#009254]"
              />
              <label className="text-[#5B5F5E] font-normal text-sm tracking-[0.5%]">To display a blog</label>
            </div>
          </div>
        </div>

        {/*fourth*/}
        <div className="py-[32px] px-[24px] border border-[#DFE3E6] rounded-[16px] mt-6 w-[328px] md:w-[608px]">
          <h3 className="text-[#009254] font-bold text-[22px] text-center font-manrope leading-7 mb-5">
            Question 4 out of 10
          </h3>
          <div className="">
            <p className="font-normal mb-3 font-manrope leading-5 text-[#2E3130]">
              In digital marketing, a higher bounce rate on a website is always a negative indicator of performance.
            </p>
            <label className=" text-[#004FC4] text-sm tracking-[0.5%] font-normal">Choose either true of false</label>
          </div>

          {/* Checkbox Q&A*/}
          <div className="mt-12 flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <input
                type="radio"
                value=""
                name="default-radio"
                className="min-w-[24px] min-h-[24px] accent-[#009254]"
              />
              <label className="text-[#5B5F5E] font-normal text-sm tracking-[0.5%]">True</label>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="radio"
                value=""
                name="default-radio"
                className="min-w-[24px] min-h-[24px] accent-[#009254]"
              />
              <label className="text-[#5B5F5E] font-normal text-sm tracking-[0.5%]">false</label>
            </div>
          </div>
        </div>

        {/* fifth */}
        <div className="py-[32px] px-[24px] border border-[#DFE3E6] rounded-[16px] mt-6 w-[328px] md:w-[608px]">
          <h1 className=" text-[#009254] font-bold text-[22px] text-center font-manrope leading-7 mb-5">
            Question 5 out of 10
          </h1>
          <div className="pl-6">
            <p className="font-normal mb-3 font-manrope leading-5 text-[#2E3130]">
              What is the primary goal of a &apos;landing page in digital marketing?
            </p>
            <span className=" text-[#004FC4] text-sm tracking-[0.5%] font-normal">Pick only one correct answer</span>
          </div>

          {/* Checkbox Q&A*/}
          <div className="mt-12 flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <input
                type="radio"
                value=""
                name="default-radio"
                className="min-w-[24px] min-h-[24px] accent-[#009254]"
              />
              <label className="text-[#5B5F5E] font-normal text-sm tracking-[0.5%]">To provide customer support</label>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="radio"
                value=""
                name="default-radio"
                className="min-w-[24px] min-h-[24px] accent-[#009254]"
              />
              <label className="text-[#5B5F5E] font-normal text-sm tracking-[0.5%]">
                To showcase the company&apos;s history
              </label>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="radio"
                value=""
                name="default-radio"
                className="min-w-[24px] min-h-[24px] accent-[#009254]"
              />
              <label className="text-[#5B5F5E] font-normal text-sm tracking-[0.5%]">
                To collect visitor information or encourage a specific action
              </label>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="radio"
                value=""
                name="default-radio"
                className="min-w-[24px] min-h-[24px] accent-[#009254]"
              />
              <label className="text-[#5B5F5E] font-normal text-sm tracking-[0.5%]">To display a blog</label>
            </div>
          </div>
        </div>

        {/* sixth */}
        <div className="py-[32px] px-[24px] border border-[#DFE3E6] rounded-[16px] mt-6 w-[328px] md:w-[608px]">
          <h3 className="text-[#009254] font-bold text-[22px] text-center font-manrope leading-7 mb-5">
            Question 6 out of 10
          </h3>
          <div className="">
            <p className="font-normal mb-3 font-manrope leading-5 text-[#2E3130]">
              In digital marketing, a higher bounce rate on a website is always a negative indicator of performance.
            </p>
            <label className=" text-[#004FC4] text-sm tracking-[0.5%] font-normal">Choose either true of false</label>
          </div>

          {/* Checkbox Q&A*/}
          <div className="mt-12 flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <input
                type="radio"
                value=""
                name="default-radio"
                className="min-w-[24px] min-h-[24px] accent-[#009254]"
              />
              <label className="text-[#5B5F5E] font-normal text-sm tracking-[0.5%]">True</label>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="radio"
                value=""
                name="default-radio"
                className="min-w-[24px] min-h-[24px] accent-[#009254]"
              />
              <label className="text-[#5B5F5E] font-normal text-sm tracking-[0.5%]">false</label>
            </div>
          </div>
        </div>

        {/* seven */}
        <div className="py-[32px] px-[24px] border border-[#DFE3E6] rounded-[16px] mt-6 w-[328px] md:w-[608px]">
          <h1 className=" text-[#009254] font-bold text-[22px] text-center font-manrope leading-7 mb-5">
            Question 7 out of 10
          </h1>
          <div className="pl-6">
            <p className="font-normal mb-3 font-manrope leading-5 text-[#2E3130]">
              What is the primary goal of a &apos;landing page in digital marketing?
            </p>
            <span className=" text-[#004FC4] text-sm tracking-[0.5%] font-normal">Pick only one correct answer</span>
          </div>

          {/* Checkbox Q&A*/}
          <div className="mt-12 flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <input
                type="radio"
                value=""
                name="default-radio"
                className="min-w-[24px] min-h-[24px] accent-[#009254]"
              />
              <label className="text-[#5B5F5E] font-normal text-sm tracking-[0.5%]">To provide customer support</label>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="radio"
                value=""
                name="default-radio"
                className="min-w-[24px] min-h-[24px] accent-[#009254]"
              />
              <label className="text-[#5B5F5E] font-normal text-sm tracking-[0.5%]">
                To showcase the company&apos;s history
              </label>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="radio"
                value=""
                name="default-radio"
                className="min-w-[24px] min-h-[24px] accent-[#009254]"
              />
              <label className="text-[#5B5F5E] font-normal text-sm tracking-[0.5%]">
                To collect visitor information or encourage a specific action
              </label>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="radio"
                value=""
                name="default-radio"
                className="min-w-[24px] min-h-[24px] accent-[#009254]"
              />
              <label className="text-[#5B5F5E] font-normal text-sm tracking-[0.5%]">To display a blog</label>
            </div>
          </div>
        </div>

        {/* eight */}
        <div className="py-[32px] px-[24px] border border-[#DFE3E6] rounded-[16px] mt-6 w-[328px] md:w-[608px]">
          <h3 className="text-[#009254] font-bold text-[22px] text-center font-manrope leading-7 mb-5">
            Question 8 out of 10
          </h3>
          <div className="">
            <p className="font-normal mb-3 font-manrope leading-5 text-[#2E3130]">
              In digital marketing, a higher bounce rate on a website is always a negative indicator of performance.
            </p>
            <label className=" text-[#004FC4] text-sm tracking-[0.5%] font-normal">Choose either true of false</label>
          </div>

          {/* Checkbox Q&A*/}
          <div className="mt-12 flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <input
                type="radio"
                value=""
                name="default-radio"
                className="min-w-[24px] min-h-[24px] accent-[#009254]"
              />
              <label className="text-[#5B5F5E] font-normal text-sm tracking-[0.5%]">True</label>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="radio"
                value=""
                name="default-radio"
                className="min-w-[24px] min-h-[24px] accent-[#009254]"
              />
              <label className="text-[#5B5F5E] font-normal text-sm tracking-[0.5%]">false</label>
            </div>
          </div>
        </div>

        {/* nine */}
        <div className="py-[32px] px-[24px] border border-[#DFE3E6] rounded-[16px] mt-6 w-[328px] md:w-[608px]">
          <h1 className=" text-[#009254] font-bold text-[22px] text-center font-manrope leading-7 mb-5">
            Question 9 out of 10
          </h1>
          <div className="pl-6">
            <p className="font-normal mb-3 font-manrope leading-5 text-[#2E3130]">
              What is the primary goal of a &apos;landing page in digital marketing?
            </p>
            <span className=" text-[#004FC4] text-sm tracking-[0.5%] font-normal">Pick only one correct answer</span>
          </div>

          {/* Checkbox Q&A*/}
          <div className="mt-12 flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <input
                type="radio"
                value=""
                name="default-radio"
                className="min-w-[24px] min-h-[24px] accent-[#009254]"
              />
              <label className="text-[#5B5F5E] font-normal text-sm tracking-[0.5%]">To provide customer support</label>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="radio"
                value=""
                name="default-radio"
                className="min-w-[24px] min-h-[24px] accent-[#009254]"
              />
              <label className="text-[#5B5F5E]">To showcase the company&apos;s history</label>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="radio"
                value=""
                name="default-radio"
                className="min-w-[24px] min-h-[24px] accent-[#009254]"
              />
              <label className="text-[#5B5F5E]">To collect visitor information or encourage a specific action</label>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="radio"
                value=""
                name="default-radio"
                className="min-w-[24px] min-h-[24px] accent-[#009254]"
              />
              <label className="text-[#5B5F5E]">To display a blog</label>
            </div>
          </div>
        </div>

        {/* ten */}
        <div className="py-[32px] px-[24px] border border-[#DFE3E6] rounded-[16px] mt-6 w-[328px] md:w-[608px]">
          <h3 className="text-[#009254] font-bold text-[22px] text-center font-manrope leading-7 mb-5">
            Question 10 out of 10
          </h3>
          <div className="">
            <p className="font-normal mb-3 font-manrope leading-5 text-[#2E3130]">
              In digital marketing, a higher bounce rate on a website is always a negative indicator of performance.
            </p>
            <label className=" text-[#004FC4] text-sm tracking-[0.5%] font-normal">Choose either true of false</label>
          </div>

          {/* Checkbox Q&A*/}
          <div className="mt-12 flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <input
                type="radio"
                value=""
                name="default-radio"
                className="min-w-[24px] min-h-[24px] accent-[#009254]"
              />
              <label className="text-[#5B5F5E] font-normal text-sm tracking-[0.5%]">True</label>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="radio"
                value=""
                name="default-radio"
                className="min-w-[24px] min-h-[24px] accent-[#009254]"
              />
              <label className="text-[#5B5F5E] font-normal text-sm tracking-[0.5%]">false</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

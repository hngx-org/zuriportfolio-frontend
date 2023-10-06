import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft2 } from 'iconsax-react';

export default function Preview() {
  return (
    <div className="">
      <Image
        src="/assets/header-image/header-body.png"
        width={1440}
        height={558}
        style={{ width: '100%' }}
        alt="header-image"
      />
      <div className="flex items-center justify-between px-12 py-6 md:px-24 md:py-8">
        <div>
          <Link href={'/'} className="hover:underline flex         items-center gap-1">
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

      <div className=" border-b border-gray-500 pb-0">
        <div className="flex justify-center items-center gap-12">
          <Link href={'/assessment/preview'}>
            <button
              style={{
                color: 'rgba(191, 132, 67, 1)',
                borderBottom: '4px solid rgba(191, 132, 67, 1)',
                borderRadius: '2px',
              }}
              className="font-bold font-manropeL"
            >
              Preview
            </button>
          </Link>
          <Link href={'/assessment/response'}>
            <button className="font-manropeL">Response</button>
          </Link>
        </div>
      </div>

      {/* Q&A container*/}
      <div className="flex flex-col justify-center items-center">
        {/* first */}
        <div className="py-[32px] px-[24px] border border-gray-100 rounded-[16px] mt-6 w-[328px] md:w-[608px]">
          <h1 className=" text-green-400 font-bold text-2xl text-center">Question 1 out of 10</h1>
          <div className="pl-6">
            <p className="font-light">What is the primary goal of a &apos;landing page in digital marketing?</p>
            <span className=" text-blue-105 cursor-pointer">Pick only one correct answer</span>
          </div>

          {/* Checkbox Q&A*/}
          <div className="mt-12 flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <input type="radio" value="" name="default-radio" className="min-w-[24px] min-h-[24px]" />
              <label>To provide customer support</label>
            </div>
            <div className="flex items-center gap-4">
              <input type="radio" value="" name="default-radio" className="min-w-[24px] min-h-[24px]" />
              <label>To showcase the company&apos;s history</label>
            </div>
            <div className="flex items-center gap-4">
              <input type="radio" value="" name="default-radio" className="min-w-[24px] min-h-[24px]" />
              <label>To collect visitor information or encourage a specific action</label>
            </div>
            <div className="flex items-center gap-4">
              <input type="radio" value="" name="default-radio" className="min-w-[24px] min-h-[24px]" />
              <label>To display a blog</label>
            </div>
          </div>
        </div>

        {/* second */}
        <div className="py-[32px] px-[24px] border border-gray-100 rounded-[16px] mt-6 w-[328px] md:w-[608px]">
          <h3 className="text-green-400 font-bold text-2xl text-center">Question 2 out of 10</h3>
          <div className="">
            <p className="font-light">
              In digital marketing, a higher bounce rate on a website is always a negative indicator of performance.
            </p>
            <label className=" text-blue-105 cursor-pointer">Choose either true of false</label>
          </div>

          {/* Checkbox Q&A*/}
          <div className="mt-12 flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <input type="radio" value="" name="default-radio" className="min-w-[24px] min-h-[24px]" />
              <label>True</label>
            </div>
            <div className="flex items-center gap-4">
              <input type="radio" value="" name="default-radio" className="min-w-[24px] min-h-[24px]" />
              <label>false</label>
            </div>
          </div>
        </div>

        {/* third */}
        <div className="py-[32px] px-[24px] border border-gray-100 rounded-[16px] mt-6 w-[328px] md:w-[608px]">
          <h1 className=" text-green-400 font-bold text-2xl text-center">Question 3 out of 10</h1>
          <div className="">
            <p className="font-light">What is the primary goal of a &apos;landing page&apos; in digital marketing?</p>
            <span className=" text-blue-105 cursor-pointer">Pick only one correct answer</span>
          </div>

          {/* Checkbox Q&A*/}
          <div className="mt-12 flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <input type="radio" value="" name="default-radio" className="min-w-[24px] min-h-[24px]" />
              <label>To provide customer support</label>
            </div>
            <div className="flex items-center gap-4">
              <input type="radio" value="" name="default-radio" className="min-w-[24px] min-h-[24px]" />
              <label>To showcase the company&apos;s history</label>
            </div>
            <div className="flex items-center gap-4">
              <input type="radio" value="" name="default-radio" className="min-w-[24px] min-h-[24px]" />
              <label>To collect visitor information or encourage a specific action</label>
            </div>
            <div className="flex items-center gap-4">
              <input type="radio" value="" name="default-radio" className="min-w-[24px] min-h-[24px]" />
              <label>To display a blog</label>
            </div>
          </div>
        </div>

        {/*fourth*/}
        <div className="py-[32px] px-[24px] border border-gray-100 rounded-[16px] mt-6 w-[328px] md:w-[608px]">
          <h3 className="text-green-400 font-bold text-2xl text-center">Question 4 out of 10</h3>
          <div className="">
            <p className=" font-light">
              In digital marketing, a higher bounce rate on a website is always a negative indicator of performance.
            </p>
            <label className=" text-blue-105 cursor-pointer">Choose either true of false</label>
          </div>

          {/* Checkbox Q&A*/}
          <div className="mt-12 flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <input type="radio" value="" name="default-radio" className="min-w-[24px] min-h-[24px]" />
              <label>True</label>
            </div>
            <div className="flex items-center gap-4">
              <input type="radio" value="" name="default-radio" className="min-w-[24px] min-h-[24px]" />
              <label>false</label>
            </div>
          </div>
        </div>

        {/* fifth */}
        <div className="py-[32px] px-[24px] border border-gray-100 rounded-[16px] mt-6 w-[328px] md:w-[608px]">
          <h1 className=" text-green-400 font-bold text-2xl text-center">Question 5 out of 10</h1>
          <div className="">
            <p className=" font-light">What is the primary goal of a &apos;landing page&apos; in digital marketing?</p>
            <span className=" text-blue-105 cursor-pointer">Pick only one correct answer</span>
          </div>

          {/* Checkbox Q&A*/}
          <div className="mt-12 flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <input type="radio" value="" name="default-radio" className="min-w-[24px] min-h-[24px]" />
              <label>To provide customer support</label>
            </div>
            <div className="flex items-center gap-4">
              <input type="radio" value="" name="default-radio" className="min-w-[24px] min-h-[24px]" />
              <label>To showcase the company&apos;s history</label>
            </div>
            <div className="flex items-center gap-4">
              <input type="radio" value="" name="default-radio" className="min-w-[24px] min-h-[24px]" />
              <label>To collect visitor information or encourage a specific action</label>
            </div>
            <div className="flex items-center gap-4">
              <input type="radio" value="" name="default-radio" className="min-w-[24px] min-h-[24px]" />
              <label>To display a blog</label>
            </div>
          </div>
        </div>

        {/* sixth */}
        <div className="py-[32px] px-[24px] border border-gray-100 rounded-[16px] mt-6 w-[328px] md:w-[608px]">
          <h3 className="text-green-400 font-bold text-2xl text-center">Question 6 out of 10</h3>
          <div className="">
            <p className=" font-light">
              In digital marketing, a higher bounce rate on a website is always a negative indicator of performance.
            </p>
            <label className=" text-blue-105 cursor-pointer">Choose either true of false</label>
          </div>

          {/* Checkbox Q&A*/}
          <div className="mt-12 flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <input type="radio" value="" name="default-radio" className="min-w-[24px] min-h-[24px]" />
              <label>True</label>
            </div>
            <div className="flex items-center gap-4">
              <input type="radio" value="" name="default-radio" className="min-w-[24px] min-h-[24px]" />
              <label>false</label>
            </div>
          </div>
        </div>

        {/* seven */}
        <div className="py-[32px] px-[24px] border border-gray-100 rounded-[16px] mt-6 w-[328px] md:w-[608px]">
          <h1 className=" text-green-400 font-bold text-2xl text-center">Question 7 out of 10</h1>
          <div className="">
            <p className=" font-light">What is the primary goal of a &apos;landing page&apos; in digital marketing?</p>
            <span className=" text-blue-105 cursor-pointer">Pick only one correct answer</span>
          </div>

          {/* Checkbox Q&A*/}
          <div className="mt-12 flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <input type="radio" value="" name="default-radio" className="min-w-[24px] min-h-[24px]" />
              <label>To provide customer support</label>
            </div>
            <div className="flex items-center gap-4">
              <input type="radio" value="" name="default-radio" className="min-w-[24px] min-h-[24px]" />
              <label>To showcase the company&apos;s history</label>
            </div>
            <div className="flex items-center gap-4">
              <input type="radio" value="" name="default-radio" className="min-w-[24px] min-h-[24px]" />
              <label>To collect visitor information or encourage a specific action</label>
            </div>
            <div className="flex items-center gap-4">
              <input type="radio" value="" name="default-radio" className="min-w-[24px] min-h-[24px]" />
              <label>To display a blog</label>
            </div>
          </div>
        </div>

        {/* eight */}
        <div className="py-[32px] px-[24px] border border-gray-100 rounded-[16px] mt-6 w-[328px] md:w-[608px]">
          <h3 className="text-green-400 font-bold text-2xl text-center">Question 8 out of 10</h3>
          <div className="">
            <p className=" font-light">
              In digital marketing, a higher bounce rate on a website is always a negative indicator of performance.
            </p>
            <label className=" text-blue-105 cursor-pointer">Choose either true of false</label>
          </div>

          {/* Checkbox Q&A*/}
          <div className="mt-12 flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <input type="radio" value="" name="default-radio" className="min-w-[24px] min-h-[24px]" />
              <label>True</label>
            </div>
            <div className="flex items-center gap-4">
              <input type="radio" value="" name="default-radio" className="min-w-[24px] min-h-[24px]" />
              <label>false</label>
            </div>
          </div>
        </div>

        {/* nine */}
        <div className="py-[32px] px-[24px] border border-gray-100 rounded-[16px] mt-6 w-[328px] md:w-[608px]">
          <h1 className=" text-green-400 font-bold text-2xl text-center">Question 9 out of 10</h1>
          <div className="">
            <p className=" font-light">What is the primary goal of a &apos;landing page&apos; in digital marketing?</p>
            <span className=" text-blue-105 cursor-pointer">Pick only one correct answer</span>
          </div>

          {/* Checkbox Q&A*/}
          <div className="mt-12 flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <input type="radio" value="" name="default-radio" className="min-w-[24px] min-h-[24px]" />
              <label>To provide customer support</label>
            </div>
            <div className="flex items-center gap-4">
              <input type="radio" value="" name="default-radio" className="min-w-[24px] min-h-[24px]" />
              <label>To showcase the company&apos;s history</label>
            </div>
            <div className="flex items-center gap-4">
              <input type="radio" value="" name="default-radio" className="min-w-[24px] min-h-[24px]" />
              <label>To collect visitor information or encourage a specific action</label>
            </div>
            <div className="flex items-center gap-4">
              <input type="radio" value="" name="default-radio" className="min-w-[24px] min-h-[24px]" />
              <label>To display a blog</label>
            </div>
          </div>
        </div>

        {/* ten */}
        <div className="py-[32px] px-[24px] border border-gray-100 rounded-[16px] mt-6 w-[328px] md:w-[608px]">
          <h3 className="text-green-400 font-bold text-2xl text-center">Question 10 out of 10</h3>
          <div className="">
            <p className=" font-light">
              In digital marketing, a higher bounce rate on a website is always a negative indicator of performance.
            </p>
            <label className=" text-blue-105 cursor-pointer">Choose either true of false</label>
          </div>

          {/* Checkbox Q&A*/}
          <div className="mt-12 flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <input type="radio" value="" name="default-radio" className="min-w-[24px] min-h-[24px]" />
              <label>True</label>
            </div>
            <div className="flex items-center gap-4">
              <input type="radio" value="" name="default-radio" className="min-w-[24px] min-h-[24px]" />
              <label>false</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

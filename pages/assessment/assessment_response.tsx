import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft2 } from 'iconsax-react';
import { ArrowRight2 } from 'iconsax-react';
import styles from './assessment_response.module.css';
import MainLayout from '../../components/Layout/MainLayout';

export default function AssessmentResponse() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages: number = 5;

  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <MainLayout showTopbar={true} showDashboardSidebar={false} activePage="dashboard">
      <>
        <Image
          src="/assets/header-image/header-body.png"
          width={1440}
          height={558}
          style={{ width: '100%' }}
          alt="header-image"
        />

        <div className="flex items-center justify-between px-12 pt-6 md:px-24 md:pt-8">
          <div>
            <Link href={'/'} className="hover:underline flex items-center gap-1">
              <ArrowLeft2 size="20" color="#000" />
              Go back
            </Link>
          </div>
        </div>

        <div className="flex justify-center">
          <div className={`${styles.student_name}`}>
            <p>Bryan Odjede</p>
          </div>
        </div>

        <div className="flex justify-center mb-5">
          <div className={`${styles.student_score}`}>
            <p>90/100</p>
          </div>
        </div>

        {/* Pagination */}
        <div className="my-4 flex justify-end px-12  md:px-24">
          {currentPage > 1 && (
            <button onClick={() => handlePageClick(currentPage - 1)} className="px-4 py-2 rounded-lg mr-2">
              <ArrowLeft2 />
            </button>
          )}

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageClick(i + 1)}
              className={`px-4 py-2 rounded-lg mr-2 ${currentPage === i + 1 ? 'bg-green-500 text-white-100' : ''}`}
            >
              {i + 1}
            </button>
          ))}

          {currentPage < totalPages && (
            <button onClick={() => handlePageClick(currentPage + 1)} className="px-4 py-2 rounded-lg">
              <ArrowRight2 />
            </button>
          )}
        </div>

        <div className=" border-b border-gray-500 pb-0">
          <div className="flex justify-center items-center gap-12">
            <Link href={'/assessment/assessment'}>
              <button className="font-manropeL">Preview</button>
            </Link>

            <Link href={'/assessment/assessment_response'}>
              <button
                style={{
                  color: 'rgba(191, 132, 67, 1)',
                  borderBottom: '4px solid rgba(191, 132, 67, 1)',
                  borderRadius: '2px',
                }}
                className="font-bold font-manropeL"
              >
                Responses
              </button>
            </Link>
          </div>
        </div>

        {/* Q&A Responses*/}
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
                <input
                  type="radio"
                  checked
                  value=""
                  name="default-radio1"
                  className={`min-w-[24px] min-h-[24px] ${styles.checked}`}
                />
                <label>To provide customer support</label>
              </div>
              <div className="flex items-center gap-4">
                <input type="radio" value="" name="default-radio1" className="min-w-[24px] min-h-[24px]" />
                <label>To showcase the company&apos;s history</label>
              </div>
              <div className="flex items-center gap-4">
                <input type="radio" value="" name="default-radio1" className="min-w-[24px] min-h-[24px]" />
                <label>To collect visitor information or encourage a specific action</label>
              </div>
              <div className="flex items-center gap-4">
                <input type="radio" value="" name="default-radio1" className="min-w-[24px] min-h-[24px]" />
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
                <input
                  type="radio"
                  value=""
                  name="default-radio2"
                  checked
                  className={`min-w-[24px] min-h-[24px] ${styles.checked}`}
                />
                <label>True</label>
              </div>
              <div className="flex items-center gap-4">
                <input type="radio" value="" name="default-radio2" className="min-w-[24px] min-h-[24px]" />
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
                <input
                  type="radio"
                  value=""
                  name="default-radio3"
                  checked
                  className={`min-w-[24px] min-h-[24px] ${styles.checked}`}
                />
                <label>To provide customer support</label>
              </div>
              <div className="flex items-center gap-4">
                <input type="radio" value="" name="default-radio3" className="min-w-[24px] min-h-[24px]" />
                <label>To showcase the company&apos;s history</label>
              </div>
              <div className="flex items-center gap-4">
                <input type="radio" value="" name="default-radio3" className="min-w-[24px] min-h-[24px]" />
                <label>To collect visitor information or encourage a specific action</label>
              </div>
              <div className="flex items-center gap-4">
                <input type="radio" value="" name="default-radio3" className="min-w-[24px] min-h-[24px]" />
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
                <input
                  type="radio"
                  value=""
                  name="default-radio4"
                  checked
                  className={`min-w-[24px] min-h-[24px] ${styles.checked}`}
                />
                <label>True</label>
              </div>
              <div className="flex items-center gap-4">
                <input type="radio" value="" name="default-radio4" className="min-w-[24px] min-h-[24px]" />
                <label>false</label>
              </div>
            </div>
          </div>

          {/* fifth */}
          <div className="py-[32px] px-[24px] border border-gray-100 rounded-[16px] mt-6 w-[328px] md:w-[608px]">
            <h1 className=" text-green-400 font-bold text-2xl text-center">Question 5 out of 10</h1>
            <div className="">
              <p className=" font-light">
                What is the primary goal of a &apos;landing page&apos; in digital marketing?
              </p>
              <span className=" text-blue-105 cursor-pointer">Pick only one correct answer</span>
            </div>

            {/* Checkbox Q&A*/}
            <div className="mt-12 flex flex-col gap-8">
              <div className="flex items-center gap-4">
                <input
                  type="radio"
                  value=""
                  name="default-radio5"
                  checked
                  className={`min-w-[24px] min-h-[24px] ${styles.checked}`}
                />
                <label>To provide customer support</label>
              </div>
              <div className="flex items-center gap-4">
                <input type="radio" value="" name="default-radio5" className="min-w-[24px] min-h-[24px]" />
                <label>To showcase the company&apos;s history</label>
              </div>
              <div className="flex items-center gap-4">
                <input type="radio" value="" name="default-radio5" className="min-w-[24px] min-h-[24px]" />
                <label>To collect visitor information or encourage a specific action</label>
              </div>
              <div className="flex items-center gap-4">
                <input type="radio" value="" name="default-radio5" className="min-w-[24px] min-h-[24px]" />
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
                <input
                  type="radio"
                  value=""
                  name="default-radio6"
                  checked
                  className={`min-w-[24px] min-h-[24px] ${styles.checked}`}
                />
                <label>True</label>
              </div>
              <div className="flex items-center gap-4">
                <input type="radio" value="" name="default-radio6" className="min-w-[24px] min-h-[24px]" />
                <label>false</label>
              </div>
            </div>
          </div>

          {/* seven */}
          <div className="py-[32px] px-[24px] border border-gray-100 rounded-[16px] mt-6 w-[328px] md:w-[608px]">
            <h1 className=" text-green-400 font-bold text-2xl text-center">Question 7 out of 10</h1>
            <div className="">
              <p className=" font-light">
                What is the primary goal of a &apos;landing page&apos; in digital marketing?
              </p>
              <span className=" text-blue-105 cursor-pointer">Pick only one correct answer</span>
            </div>

            {/* Checkbox Q&A*/}
            <div className="mt-12 flex flex-col gap-8">
              <div className="flex items-center gap-4">
                <input
                  type="radio"
                  value=""
                  name="default-radio7"
                  checked
                  className={`min-w-[24px] min-h-[24px] ${styles.checked}`}
                />
                <label>To provide customer support</label>
              </div>
              <div className="flex items-center gap-4">
                <input type="radio" value="" name="default-radio7" className="min-w-[24px] min-h-[24px]" />
                <label>To showcase the company&apos;s history</label>
              </div>
              <div className="flex items-center gap-4">
                <input type="radio" value="" name="default-radio7" className="min-w-[24px] min-h-[24px]" />
                <label>To collect visitor information or encourage a specific action</label>
              </div>
              <div className="flex items-center gap-4">
                <input type="radio" value="" name="default-radio7" className="min-w-[24px] min-h-[24px]" />
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
                <input
                  type="radio"
                  value=""
                  name="default-radio8"
                  checked
                  className={`min-w-[24px] min-h-[24px] ${styles.checked}`}
                />
                <label>True</label>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="radio"
                  value=""
                  name="default-radio8"
                  className={`min-w-[24px] min-h-[24px] ${styles.checked}`}
                />
                <label>false</label>
              </div>
            </div>
          </div>

          {/* nine */}
          <div className="py-[32px] px-[24px] border border-gray-100 rounded-[16px] mt-6 w-[328px] md:w-[608px]">
            <h1 className=" text-green-400 font-bold text-2xl text-center">Question 9 out of 10</h1>
            <div className="">
              <p className=" font-light">
                What is the primary goal of a &apos;landing page&apos; in digital marketing?
              </p>
              <span className=" text-blue-105 cursor-pointer">Pick only one correct answer</span>
            </div>

            {/* Checkbox Q&A*/}
            <div className="mt-12 flex flex-col gap-8">
              <div className="flex items-center gap-4">
                <input
                  type="radio"
                  value=""
                  name="default-radio9"
                  checked
                  className={`min-w-[24px] min-h-[24px] ${styles.checked}`}
                />
                <label>To provide customer support</label>
              </div>
              <div className="flex items-center gap-4">
                <input type="radio" value="" name="default-radio9" className="min-w-[24px] min-h-[24px]" />
                <label>To showcase the company&apos;s history</label>
              </div>
              <div className="flex items-center gap-4">
                <input type="radio" value="" name="default-radio9" className="min-w-[24px] min-h-[24px]" />
                <label>To collect visitor information or encourage a specific action</label>
              </div>
              <div className="flex items-center gap-4">
                <input type="radio" value="" name="default-radio9" className="min-w-[24px] min-h-[24px]" />
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
                <input
                  type="radio"
                  value=""
                  name="default-radio10"
                  checked
                  className={`min-w-[24px] min-h-[24px] ${styles.checked}`}
                />
                <label>True</label>
              </div>
              <div className="flex items-center gap-4">
                <input type="radio" value="" name="default-radio10" className="min-w-[24px] min-h-[24px]" />
                <label>false</label>
              </div>
            </div>
          </div>
        </div>
      </>
    </MainLayout>
  );
}

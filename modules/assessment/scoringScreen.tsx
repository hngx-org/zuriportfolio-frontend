import Image from 'next/image';
import React from 'react';
import ScoreDropdown from './component/scoreDropdown';
import Header from './component/Header';
import Link from 'next/link';

const ScoringScreen = () => {
  const arr = ['Intermediate', 'Expert'];
  return (
    <div>
      <Header heading={'Preview/Edit'} body={'An overview of all questions and answers.'} />
      <div>
        <div className="flex items-center justify-between px-12 py-6 md:px-24 md:py-8">
          <Link href={'/'} className="hover:underline flex items-center gap-1">
            <Image src="/assets/arrow-left.svg" alt="arro left icon" width={20} height={20} color="#000" />
            Go back
          </Link>
          <button className="rounded-2xl text-white-300 px-3 py-2 text-xs sm:text-lg sm:py-3 sm:px-5 bg-green-600">
            Save Changes
          </button>
        </div>

        <div className=" border-b border-gray-500 pb-0">
          <div className="flex justify-center items-center gap-12">
            <Link href={'/assessment/create-assessment'}>
              <button className="font-bold text-gray-400 font-manropeL">Questions & Answer</button>
            </Link>
            <Link href={'/assessment/scoring'}>
              <button
                style={{
                  color: 'rgba(191, 132, 67, 1)',
                  borderBottom: '4px solid rgba(191, 132, 67, 1)',
                  borderRadius: '2px',
                }}
                className="font-manropeL"
              >
                Scoring
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="py-14 flex justify-center items-center w-full">
        <form action="" className="px-6 flex flex-col items-center gap-[45px] w-full">
          {/* Badge Option */}

          <div className="w-full rounded-tr-2xl rounded-tl-2xl overflow-hidden sm:w-[604px] border border-[#DFE3E6] border-solid">
            <div className="text w-full h-5 bg-[#BF8443]"></div>
            <div className="mt-5 mb-7 px-3 sm:px-14">
              <h3 className="text-2xl text-[#191C1E] font-manropeB mb-8">Badge Option</h3>
              <p className="text-[#191C1E] text-4 font-manropeB mb-4">Issue users badges</p>
              {/* options....... */}
              <div className="flex gap-4 mb-2">
                <input
                  type="radio"
                  name="badge-option"
                  id="on-completion"
                  value="on-completion"
                  className="sm:w-5 sm:h-5"
                />
                <label htmlFor="on-completion" className="text-gray-500 text-sm">
                  Later, upon course completion
                </label>
              </div>
              <div className="flex gap-4">
                <input
                  type="radio"
                  name="badge-option"
                  id="average-performance"
                  value="average-performance"
                  className="sm:w-5 sm:h-5"
                />
                <label htmlFor="average-performance" className="text-gray-500 text-sm">
                  Instantly, based on student’s average performance in assessment
                </label>
              </div>
            </div>
          </div>

          {/* Grading System */}
          <div className="w-full rounded-tr-2xl rounded-tl-2xl overflow-hidden h-[412px] sm:w-[604px] border border-[#DFE3E6] border-solid">
            <div className="text w-full h-5 bg-[#BF8443]"></div>
            <div className="mt-5 mb-7 px-3 sm:px-14">
              <h3 className="text-2xl text-[#191C1E] font-manropeB mb-8">Grading System</h3>
              <p className="text-[#191C1E] text-4 font-manropeB mb-4">Set the scoring range for issuing badges</p>
              <div className="flex flex-col sm:flex-row sm:items-center">
                <p className="w-[112px] text-base font-manropeL mb-1">Beginner</p>
                <div className="flex gap-5">
                  <input
                    type="number"
                    className="border border-solid border-[#BFC8CC] rounded-xl outline-none px-5 py-1 w-full sm:w-[149px]"
                  />
                  <input
                    type="number"
                    className="border border-solid border-[#BFC8CC] rounded-xl outline-none px-5 py-1 w-full sm:w-[149px]"
                  />
                </div>
              </div>
              {arr.map((item, index) => (
                <ScoreDropdown key={index} item={item} />
              ))}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScoringScreen;

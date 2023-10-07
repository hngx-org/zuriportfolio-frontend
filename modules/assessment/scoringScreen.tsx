import Image from 'next/image';
import React from 'react';
import ScoreDropdown from './component/scoreDropdown';
import Header from './component/Header';

const ScoringScreen = () => {
  const arr = ['Intermediate', 'Expert'];
  return (
    <div>
      <Header heading={'Preview/Edit'} body={'An overview of all questions and answers.'} />
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

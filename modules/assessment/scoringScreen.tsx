import React, { ChangeEvent, useEffect, useState } from 'react';
import ScoreDropdown from './component/scoreDropdown';
import { Input } from '@ui/Input';

type MyScoreRangeType = {
  hours: string;
  minutes: string;
  seconds: string;
  // Add more properties as needed
};

const ScoringScreen = () => {
  const arr = ['Beginner', 'Intermediate', 'Expert'];
  const [isSliderOn, setIsSliderOn] = useState<boolean>(false);
  const [examTime, setExamTime] = useState<MyScoreRangeType>({
    hours: '',
    minutes: '',
    seconds: '',
  }); // Explicitly specify the type as string

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const name = e.target.name;

    // Check if the new value is an empty string (no characters entered)
    if (newValue === '') {
      setExamTime({
        hours: '',
        minutes: '',
        seconds: '',
      }); // Reset the input to an empty string
    } else {
      const numericValue = parseInt(newValue, 10);
      if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 60) {
        setExamTime({
          ...examTime,
          [name]: numericValue.toString(),
        });
      }
      // You can add additional validation or error handling here if needed
    }
  };

  const handleSlider = () => {
    setIsSliderOn(!isSliderOn);
  };

  // const [drafts, setDrafts] = useState([]);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const response = await fetch('https://piranha-assessment.onrender.com/api/admin/drafts/');
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch data');
  //         console.log('Failed to fetch data');
  //       }
  //       const data = await response.json();
  //       setDrafts(data);
  //       console.log(drafts);
  //     } catch (error) {
  //       // Handle the error, e.g., display an error message
  //       console.error('Error fetching data:', error);
  //     }
  //   }
  //   fetchData();
  // }, []);

  return (
    <div>
      <div className="flex justify-center items-center w-full">
        <form action="" className="text-left px-6 flex flex-col items-center gap-[45px] w-full">
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
                  value="Later, Upon course completion"
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
                  value="Instantly based on the students assessment performance"
                  className="sm:w-5 sm:h-5"
                />
                <label htmlFor="average-performance" className="text-gray-500 text-sm">
                  Instantly, based on student’s average performance in assessment
                </label>
              </div>
            </div>
          </div>

          {/* Grading System */}
          <div className="w-full rounded-tr-2xl rounded-tl-2xl overflow-hidden min-h-[412px] sm:w-[604px] border border-[#DFE3E6] border-solid">
            <div className="w-full h-5 bg-[#BF8443]"></div>
            <div className="mt-5 mb-7 px-3 sm:px-14">
              <h3 className="text-2xl text-[#191C1E] font-manropeB mb-8">Grading System</h3>
              <p className="text-[#191C1E] text-4 font-manropeB mb-4">Set the scoring range for issuing badges</p>
              <div className="flex flex-col gap-5">
                {arr.map((item, index) => (
                  <ScoreDropdown key={index} item={item} />
                ))}
              </div>
            </div>
          </div>

          {/* Timing System */}
          <div className="w-full rounded-tr-2xl rounded-tl-2xl overflow-hidden sm:w-[604px] border border-[#DFE3E6] border-solid">
            <div className="w-full h-5 bg-[#BF8443]"></div>
            <div className="mt-5 mb-7 px-3 sm:px-14">
              <h3 className="text-2xl text-[#191C1E] font-manropeB mb-8">Timing System</h3>
              <p className="text-[#191C1E] text-4 font-manropeB mb-4">
                Set the maximum time allotted to each assessment
              </p>
              <div className="flex gap-5">
                <div>
                  <label htmlFor="hours" className="text-xs text-gray-400">
                    Hours
                  </label>
                  <Input
                    type="text"
                    name="hours"
                    value={examTime.hours}
                    id="min-score"
                    onChange={handleInputChange}
                    placeHolder=""
                    className="h-8 w-14 sm:w-20 rounded-md border text-base font-bold text-black"
                    style={{ textAlign: 'center' }}
                  />
                </div>
                <div>
                  <label htmlFor="hours" className="text-xs text-gray-400">
                    Minutes
                  </label>
                  <Input
                    type="text"
                    name="minutes"
                    value={examTime.minutes}
                    id="min-score"
                    onChange={handleInputChange}
                    placeHolder=""
                    className="h-8 w-14 sm:w-20 rounded-md border text-base font-bold text-black"
                    style={{ textAlign: 'center' }}
                  />
                </div>
                <div>
                  <label htmlFor="hours" className="text-xs text-gray-400">
                    Seconds
                  </label>
                  <Input
                    type="text"
                    name="seconds"
                    value={examTime.seconds}
                    id="min-score"
                    onChange={handleInputChange}
                    placeHolder=""
                    className="h-8 w-14 sm:w-20 rounded-md border text-base font-bold text-black"
                    style={{ textAlign: 'center' }}
                  />
                </div>
              </div>
              <div className="flex gap-4 items-center mt-8">
                <p className="text-sm w-full text-gray-200">
                  Automatically submit assessment for review when time elapses
                </p>
                <div
                  onClick={handleSlider}
                  className={`slider flex items-center px-1  w-6 h-4 rounded-2xl ${
                    isSliderOn ? 'bg-gray-900' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`slider-circle w-2 h-2 rounded-full bg-white-100 ${isSliderOn ? 'ml-auto' : 'mr-auto'}`}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScoringScreen;

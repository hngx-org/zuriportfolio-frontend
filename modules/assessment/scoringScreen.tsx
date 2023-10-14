import React, { ChangeEvent, useEffect, useState } from 'react';
import ScoreDropdown from './component/scoreDropdown';
import { Input } from '@ui/Input';
import { useCreatingAssessmentContext } from '../../context/assessment/CreatingAssessmentContext';

type TimingSystemType = {
  hours: string;
  minutes: string;
  seconds: string;
  // Add more properties as needed
};

type AssessmentScoringType = {
  badge_option: string;
  beginner_score_range: string;
  intermediate_score_range: string;
  advanced_score_range: string;
};

type MyGradingRangeType = {
  minScore: string;
  maxScore: string;
  // Add more properties as needed
};

const ScoringScreen = () => {
  const arr = ['Beginner', 'Intermediate', 'Expert'];
  const { isAutoSubmitOn, setIsAutoSubmitOn, assessmentScoring, setAssessmentScoring, setExamDuration } =
    useCreatingAssessmentContext();
  const [incompleteLevels, setIncompleteLevels] = useState<string[]>([]);

  //State for the timing value
  const [examTime, setExamTime] = useState<TimingSystemType>({
    hours: '',
    minutes: '',
    seconds: '',
  });

  //State for the grading values
  const initialGradingValues: MyGradingRangeType = {
    minScore: '',
    maxScore: '',
  };

  const [gradingValues, setGradingValues] = useState<{ [key: string]: MyGradingRangeType }>({
    Beginner: { ...initialGradingValues },
    Intermediate: { ...initialGradingValues },
    Expert: { ...initialGradingValues },
  });

  const handleBatchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAssessmentScoring({
      ...assessmentScoring,
      badge_option: value,
    });
    console.log(assessmentScoring);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const name = e.target.name;

    // Check if the new value is an empty string (no characters entered)
    if (newValue === '') {
      setExamTime((prevExamTime) => ({
        ...prevExamTime,
        [name]: newValue,
      }));
    } else {
      const numericValue = parseInt(newValue, 10);
      if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 60) {
        setExamTime((prevExamTime) => ({
          ...prevExamTime,
          [name]: numericValue.toString(),
        }));
        if (examTime.hours || examTime.minutes || examTime.seconds) {
          const hours = parseInt(examTime.hours, 10) || 0;
          const minutes = parseInt(examTime.minutes, 10) || 0;
          const seconds = parseInt(examTime.seconds, 10) || 0;
          const totalMinutes = hours * 60 + minutes + seconds / 60;
          console.log('Total time in minutes:', totalMinutes);

          setExamDuration(totalMinutes.toString());
        }
      }
    }
  };

  const convertToMinutes = (hours: string, minutes: string, seconds: string): number => {
    const hoursInMinutes = parseInt(hours, 10) * 60;
    const minutesValue = parseInt(minutes, 10);
    const secondsValue = parseInt(seconds, 10) / 60;
    return hoursInMinutes + minutesValue + secondsValue;
  };

  const handleGradingChange = (e: ChangeEvent<HTMLInputElement>, level: string) => {
    const newValue = e.target.value;
    const name = e.target.name;

    if (name === 'minScore' || name === 'maxScore') {
      const numericValue = newValue === '' ? '' : parseInt(newValue, 10);

      if (
        newValue === '' ||
        (!isNaN(numericValue as number) && (numericValue as number) >= 0 && (numericValue as number) <= 100)
      ) {
        // Update grading values
        setGradingValues((prevValues) => ({
          ...prevValues,
          [level]: {
            ...prevValues[level],
            [name]: newValue,
          },
        }));

        // Update assessmentScoring state based on the level
        const minScore = name === 'minScore' ? newValue : gradingValues[level].minScore;
        const maxScore = name === 'maxScore' ? newValue : gradingValues[level].maxScore;
        const range = `${minScore}% - ${maxScore}%`;
        setAssessmentScoring((prevAssessmentScoring) => ({
          ...prevAssessmentScoring,
          [`${level.toLowerCase()}_score_range`]: range,
        }));

        // Update incomplete levels
        if (minScore === '' || maxScore === '') {
          if (!incompleteLevels.includes(level)) {
            setIncompleteLevels([...incompleteLevels, level]);
          }
        } else {
          setIncompleteLevels(incompleteLevels.filter((item) => item !== level));
        }
      }
      console.log(assessmentScoring);
    }
  };

  const handleSlider = () => {
    setIsAutoSubmitOn(!isAutoSubmitOn);
  };

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
                  onChange={handleBatchChange}
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
                  onChange={handleBatchChange}
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
                  <ScoreDropdown
                    key={index}
                    item={item}
                    handleGradingChange={(e) => handleGradingChange(e, item)}
                    gradingValue={gradingValues[item]}
                  />
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
                    max="100"
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
                <p className="text-xs sm:text-sm w-full text-gray-200">
                  Automatically submit assessment for review when time elapses
                </p>
                <div
                  onClick={handleSlider}
                  className={`slider flex items-center px-1  w-6 h-4 rounded-2xl ${
                    isAutoSubmitOn ? 'bg-gray-900' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`slider-circle w-2 h-2 rounded-full bg-white-100 ${
                      isAutoSubmitOn ? 'ml-auto' : 'mr-auto'
                    }`}
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

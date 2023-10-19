import React, { ChangeEvent, useEffect, useState } from 'react';
import ScoreDropdown from './component/scoreDropdown';
import { Input } from '@ui/Input';
import { ToastContainer, toast } from 'react-toastify';
import { useCreatingAssessmentContext } from '../../context/assessment/CreatingAssessmentContext';
import axios from 'axios';
type TimingSystemType = {
  hours: string;
  minutes: string;
  seconds: string;
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
};

interface ScoringScreenProps {
  skillId: number; // Define skillId as a prop

  assessment: {
    id: number;
    title: string;
    createdAt: Date;
    duration_minutes: number;
    questions: {
      answers: {}[];
      question_no: number;
      question_text: string;
      question_type: string;
    }[];
    updatedAt: Date;
  };
}

const debounce = <F extends (...args: any[]) => void>(func: F, delay: number) => {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<F>): void => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

const ScoringScreen: React.FC<ScoringScreenProps> = ({ assessment, skillId }) => {
  const arr = ['Beginner', 'Intermediate', 'Expert'];
  const [incompleteLevels, setIncompleteLevels] = useState<string[]>([]);
  const [examTime, setExamTime] = useState<TimingSystemType>({
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

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

    skillId;
    if (newValue === '') {
      setExamTime((prevExamTime) => ({
        ...prevExamTime,
        [name]: '00',
      }));
    } else {
      const numericValue = parseInt(newValue, 10);
      if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 60) {
        setExamTime((prevExamTime) => ({
          ...prevExamTime,
          [name]: numericValue.toString().padStart(2, '0'),
        }));
      }
    }

    // Call the debounced function instead of handleFormSubmit directly
    debouncedHandleFormSubmit();
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
        setGradingValues((prevValues) => ({
          ...prevValues,
          [level]: {
            ...prevValues[level],
            [name]: newValue,
          },
        }));

        const minScore = name === 'minScore' ? newValue : gradingValues[level].minScore;
        const maxScore = name === 'maxScore' ? newValue : gradingValues[level].maxScore;
        const range = `${minScore}% - ${maxScore}%`;
        setAssessmentScoring((prevAssessmentScoring) => ({
          ...prevAssessmentScoring,
          [`${level.toLowerCase()}_score_range`]: range,
        }));

        if (minScore === '' || maxScore === '') {
          if (!incompleteLevels.includes(level)) {
            setIncompleteLevels([...incompleteLevels, level]);
          }
        } else {
          setIncompleteLevels(incompleteLevels.filter((item) => item !== level));
        }
      }
    }
    saveScore(level);
  };

  const handleSlider = () => {
    setIsAutoSubmitOn(!isAutoSubmitOn);
  };

  const { isAutoSubmitOn, setIsAutoSubmitOn, assessmentScoring, setAssessmentScoring, setExamDuration } =
    useCreatingAssessmentContext();

  const saveScore = async (level: string) => {
    const token = localStorage.getItem('zpt');

    try {
      const response = await fetch('https://staging.zuri.team/api/badges', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          min_score: gradingValues[level].minScore,
          max_score: gradingValues[level].maxScore,
          name: level.toLowerCase(),
          skill_id: skillId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(`Scoring for ${level} saved successfully!`);
        // Handle success if needed
      } else {
        const errorData = await response.json();
        toast.error(`Failed to save scoring for ${level}: ${errorData.message}`);
        // Handle error if needed
      }
    } catch (error) {
      console.error(`Error while saving scoring for ${level}:`, error);
      toast.error(`Error while saving scoring for ${level}`);
      // Handle error if needed
    }
  };

  const handleFormSubmit = async () => {
    const { hours, minutes, seconds } = examTime;
    const durationInMinutes = Math.round(parseInt(hours, 10) * 60 + parseInt(minutes, 10) + parseInt(seconds, 10) / 60);

    const apiUrl = `https://piranha-assessment-jco5.onrender.com/api/admin/assessments/${assessment.id}/`;

    try {
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('zpt')}`,
          'X-CSRFTOKEN': localStorage.getItem('zpt') ?? '',
        },
        body: JSON.stringify({
          duration_minutes: durationInMinutes,
          title: assessment.title,
        }),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }

      toast.success('Assessment duration updated successfully');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error updating assessment data');
    }
  };
  const debouncedHandleFormSubmit = debounce(handleFormSubmit, 1000);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const response = await fetch(`https://piranha-assessment-jco5.onrender.com/api/admin/drafts/${skillId}`, {
  //         headers: {
  //           'Authorization': `Bearer ${token}`,
  //         },
  //       });
  //       if (!response.ok) {
  //         console.log('Failed to fetch data');
  //         throw new Error('Failed to fetch data');
  //       }
  //       const data = await response.json();
  //       // setDrafts(data);
  //       console.log(data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   }
  //   if (token) {
  //     fetchData();
  //   }
  // }, [token, skillId]);

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

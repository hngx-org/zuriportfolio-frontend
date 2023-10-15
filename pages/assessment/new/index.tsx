import React, { useEffect, useState } from 'react';
import Button from '@ui/Button';
import MainLayout from '../../../components/Layout/MainLayout';
import { AssessmentBanner } from '@modules/assessment/component/banner';
import Edithead from '@modules/assessment/component/edittitleHead';
import CreateTemplate from '@modules/assessment/component/createnewassessments';
import ScoringScreen from '@modules/assessment/scoringScreen';
import Modal from '@modules/assessment/modals/Loadingpopup';
import { FaSpinner } from 'react-icons/fa';

const CreateAssessment = () => {
  const [active, setActive] = useState<null | string>('button1');
  const [requestValues, setRequestValues] = useState<{ [key: string]: string }>({});
  const [headInput, setHeadInput] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [err, setErr] = useState('');
  const closeModal = () => {
    setModalOpen(false);
  };
  const handleClick = (button: string) => {
    setActive(button);
  };

  const [ass, setAss] = useState(true);
  const handleInput = (value: string) => {
    setHeadInput(value);
  };
  // Merge headInput with other requestValues

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const mergedValues = {
    ...requestValues,
    headInput: headInput,
  };

  useEffect(() => {
    setRequestValues(mergedValues);
  }, [headInput, mergedValues]);
  const publishAssessment = async () => {
    const { headInput, correct_option, Question1, option1, option2, option3, option4 } = requestValues;
    if ((headInput || Question1 || option1) === undefined) {
      window.alert('Fields cannot be Empty');
      return;
    }
    setRequestValues(mergedValues);
    setModalOpen(true);

    // split question and string and number
    const url = 'https://piranha-assessment-jco5.onrender.com/api/admin/assessments/';
    const reqOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFTOKEN': 'NbABSnKRbU6iJVZcevcUXUPDkZgy8sMoCG4LTI94QliFKISRlQujvNxzkzZ89fai',
      },
      body: JSON.stringify({
        skill_id: 2,
        questions_and_answers: [
          {
            question_no: Question1?.match(/\d+/)?.[0] ?? 1,
            question_text: Question1?.match(/([a-zA-Z])+/)?.[0] ?? '',
            question_type: 'multiple_choice',
            options: [option1, option2, option3, option4],
            correct_option: correct_option?.match(/\d+/)?.[0] ?? 2,
          },
        ],
        assessment_name: headInput || `New Assessment${Math.floor(Math.random() * 0.5)}`,
        duration_in_minutes: 30,
      }),
    };
    console.log(reqOptions);
    const postEnd = await fetch(url, reqOptions);

    if (!postEnd.ok) {
      console.log(requestValues);
      console.log('Error' + postEnd.status);
      // setModalOpen(false);
      setErr(`Failed: Error${postEnd.status}`);
      setTimeout(() => {
        setModalOpen(false);
      }, 4000);
    }
    const response = await postEnd.json();
    if (postEnd.ok) {
      setErr(`Succesfully Created!`);
    }
    console.log(response);
    setTimeout(() => {
      setModalOpen(false);
    }, 4000);
  };

  // save to drafts
  const saveDrafts = async () => {
    const { headInput, correct_option, Question1, option1, option2, option3, option4 } = requestValues;
    if ((headInput || Question1 || option1) === undefined) {
      window.alert('Fields cannot be Empty');
      return;
    }
    setAss(false);
    setRequestValues(mergedValues);
    setModalOpen(true);

    // split question and string and number
    const url = 'https://piranha-assessment-jco5.onrender.com/api/admin/drafts/';

    const reqOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFTOKEN': 'NbABSnKRbU6iJVZcevcUXUPDkZgy8sMoCG4LTI94QliFKISRlQujvNxzkzZ89fai',
      },
      body: JSON.stringify({
        skill_id: 2,
        questions_and_answers: [
          {
            question_no: Question1?.match(/\d+/)?.[0] ?? 1,
            question_text: Question1?.match(/([a-zA-Z])+/)?.[0] ?? '',
            question_type: 'multiple_choice',
            options: [option1, option2, option3, option4],
            correct_option: correct_option?.match(/\d+/)?.[0] ?? 2,
          },
        ],
        assessment_name: headInput || `New Assessment${Math.floor(Math.random() * 0.5)}`,
        duration_in_minutes: 30,
      }),
    };
    console.log(reqOptions);
    const postEnd = await fetch(url, reqOptions);

    if (!postEnd.ok) {
      console.log(requestValues);
      console.log('Error' + postEnd.status);
      // setModalOpen(false);
      setErr(`Failed: Error${postEnd.status}`);
      setTimeout(() => {
        setModalOpen(false);
      }, 4000);
    }
    const response = await postEnd.json();
    if (postEnd.ok) {
      setErr(`Saved Created!`);
    }
    console.log(response);
    setTimeout(() => {
      setModalOpen(false);
    }, 4000);
  };
  return (
    <MainLayout activePage="" showTopbar showFooter showDashboardSidebar={false}>
      <main className="w-full">
        <AssessmentBanner
          title="Create New Assessment"
          subtitle="Create single choice quiz with scoring conditions"
          bannerImageSrc="/assets/images/banner/assessmentOverview.svg"
        />
        <div className="pt-10 pb-10 flex justify-between flex-wrap px-[24px] md:px-[40px] lg:px-[100px] gap-y-4 :">
          <div
            className="flex space-x-1 items-center cursor-pointer"
            onClick={() => {
              window.history.back();
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12.4984 17.225C12.3401 17.225 12.1818 17.1667 12.0568 17.0417L6.62344 11.6084C5.7401 10.725 5.7401 9.27502 6.62344 8.39168L12.0568 2.95835C12.2984 2.71668 12.6984 2.71668 12.9401 2.95835C13.1818 3.20002 13.1818 3.60002 12.9401 3.84168L7.50677 9.27502C7.10677 9.67502 7.10677 10.325 7.50677 10.725L12.9401 16.1583C13.1818 16.4 13.1818 16.8 12.9401 17.0417C12.8151 17.1584 12.6568 17.225 12.4984 17.225Z"
                fill="#1A1C1B"
              />
            </svg>
            <p className="text-dark[100]">Go back</p>
          </div>
          <div className="flex space-x-4 items-center">
            <Button
              className="p-4 border-2 border-green-500 text-green-500 text-center  bg-white-100 hover:text-white-100"
              onClick={saveDrafts}
            >
              Save To Drafts
            </Button>
            <Button className="p-3 text-white-100 text-center" onClick={publishAssessment}>
              Publish Assesments
            </Button>
          </div>
        </div>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <div className="text-center text-white-100 text-[25px] font-semibold w-max">
            {ass ? 'Creating Assessment' : 'Saving Drafts'}
          </div>
          <FaSpinner color="#fff" className="animate-spin" size={100} />
          {err ? (
            <p className={`${err.includes('Error') ? 'text-red-200' : 'text-white-100'} w-max text-center text-[20px]`}>
              {err}
            </p>
          ) : null}
        </Modal>
        <div className="pt-4 pb-2 flex space-x-10 justify-center">
          <div
            className={` cursor-pointer ${
              active === 'button1' ? 'text-[#BF8443] font-bold border-b-4 border-[#BF8443] ' : 'text-dark-100'
            }`}
            onClick={() => handleClick('button1')}
          >
            Questions &amp; Answers
          </div>
          <div
            className={` cursor-pointer ${
              active === 'button2' ? 'text-[#BF8443] font-bold border-b-4 border-[#BF8443]' : 'text-dark-100'
            }`}
            onClick={() => handleClick('button2')}
          >
            Scoring
          </div>
        </div>
        <div className="w-[\100%\] bg-[#DFE3E6] h-[2px] translate-y-[-8px] "></div>
        {/* Actual layouts */}

        <div className="">
          <div className="pt-[4rem] pb-[8rem] text-center container mx-auto max-w-xl px-[12px] sm:px-[0] ">
            {active === 'button1' ? (
              <>
                <Edithead onInputChange={handleInput} />
                <div className="pt-4 ">
                  <CreateTemplate
                    dataValues={(dataContent) => {
                      setRequestValues(dataContent);
                    }}
                  />
                </div>
              </>
            ) : (
              <ScoringScreen />
            )}
          </div>
        </div>
      </main>
    </MainLayout>
  );
};

export default CreateAssessment;

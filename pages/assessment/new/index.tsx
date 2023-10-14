import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Button from '@ui/Button';
import { Edit } from 'iconsax-react';
import MainLayout from '../../../components/Layout/MainLayout';
import { AssessmentBanner } from '@modules/assessment/component/banner';
import CreateTemplate from '@modules/assessment/component/createnewassessments';
import ScoringScreen from '@modules/assessment/scoringScreen';
import backarrow from '../../../modules/assessment/component/backarrow.svg';
import Image from 'next/image';

export const ToPushContext = React.createContext({});
export const UpdateContext: any = React.createContext({});
const CreateAssessment = () => {
  const router = useRouter();
  const data = router.query;
  const skillid = data.name;
  const [newobject, setObject] = useState({
    skill_id: skillid,
    questions_and_answers: [
      {
        question_no: 0,
        question_text: '',
        question_type: 'multiple_choice',
        options: [''],
        correct_option: 0,
      },
    ],
    assessment_name: '',
    duration_in_minutes: 0,
  });

  const [active, setActive] = useState<null | string>('button1');
  const [listupdate, setListupdate] = useState('waiting');
  const handleClick = (button: string) => {
    setActive(button);
  };

  const publishClick = () => {
    const newt = { ...newobject };
    setObject(newt);
    setListupdate('save');
  };
  const draftsClick = () => {
    setListupdate('save');
  };
  const [disable, setDisable] = useState(true);

  const readInput = (e: any) => {
    const newt = { ...newobject };
    newt.assessment_name = e.target.value;
    setObject(newt);
    console.log(newobject);
  };

  if (listupdate === 'post') {
    console.log('posting');
    console.log(newobject.questions_and_answers);
    postObject();
  }

  function postObject() {
    // The API endpoint URL
    const apiUrl = 'https://piranha-assessment-jco5.onrender.com//api/admin/assessments';

    // Create the request options
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newobject),
    };

    // Send the POST request using the fetch API
    fetch(apiUrl, requestOptions)
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the JSON response
      })
      .then((responseData) => {
        // Handle the response data here
        console.log('Response:', responseData);
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error('Error:', error);
      });
  }

  return (
    <ToPushContext.Provider value={[newobject, setObject]}>
      <UpdateContext.Provider value={[listupdate, setListupdate]}>
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
                <Image alt="go back" src={backarrow} width={'20'} height={'20'} />
                <p className="text-dark[100]">Go back</p>
              </div>
              {active === 'button1' ? (
                <div className="flex space-x-4 items-center">
                  <Button intent={'secondary'} size={'sm'} spinnerColor="#000" onClick={draftsClick}>
                    Save To Drafts
                  </Button>
                  <Button className="p-3" intent={'primary'} size={'sm'} spinnerColor="#000" onClick={publishClick}>
                    Publish Assesments
                  </Button>
                </div>
              ) : (
                <Button className="p-3" intent={'primary'} size={'sm'} spinnerColor="#000">
                  Save Changes
                </Button>
              )}
            </div>
            <div className="pt-4 pb-2 flex space-x-10 justify-center">
              <div
                className={` cursor-pointer ${
                  active === 'button1'
                    ? 'text-[#BF8443] font-bold border-b-4 border-[#BF8443] '
                    : 'text-dark-100 rounded-sm'
                }`}
                onClick={() => handleClick('button1')}
              >
                Questions &amp; Answers
              </div>
              <div
                className={` cursor-pointer ${
                  active === 'button2'
                    ? 'text-[#BF8443] font-bold rounded-sm border-b-4 border-[#BF8443]'
                    : 'text-dark-100'
                }`}
                onClick={() => handleClick('button2')}
              >
                Scoring
              </div>
            </div>
            <div className="w-[\100%\] bg-[#DFE3E6] h-[2px] translate-y-[-8px] "></div>
            {/* Actual layouts */}
            <div className="pt-[4rem] pb-[8rem] text-center container mx-auto max-w-xl px-[0px] ">
              {active === 'button1' ? (
                <>
                  <div className="border-[1px] border-[#DFE3E6] rounded-t-[20px]">
                    <div className="bg-[#BF8443] p-2 rounded-t-[20px]"></div>
                    <div className="p-4 flex justify-between items-center">
                      <div className="text-[20px]">
                        <input
                          type="text"
                          id="input_assessment"
                          className="outline-none border-none bg-transparent placeholder-black focus:placeholder-transparent focus:border-transparent focus:ring-transparent"
                          placeholder="Untitled Assessment"
                          disabled={disable}
                          onChange={(e) => readInput(e)}
                        />
                      </div>
                      <div>
                        <label htmlFor="input_assessment">
                          <Edit className="w-[25px] cursor-pointer" onClick={() => setDisable(false)} />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="pt-4">
                    <CreateTemplate />
                  </div>
                </>
              ) : (
                <ScoringScreen />
              )}
            </div>
          </main>
        </MainLayout>
      </UpdateContext.Provider>
    </ToPushContext.Provider>
  );
};

export default CreateAssessment;

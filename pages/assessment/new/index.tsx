import React, { useState } from 'react';
import Button from '@ui/Button';
import MainLayout from '../../../components/Layout/MainLayout';
import { AssessmentBanner } from '@modules/assessment/component/banner';
import Edithead from '@modules/assessment/component/edittitleHead';
import CreateTemplate from '@modules/assessment/component/createnewassessments';
import ScoringScreen from '@modules/assessment/scoringScreen';
import Backarrow from '../../../public/assets/assessment/backarrow';
export const ToPushContext = React.createContext({});
export const UpdateContext: any = React.createContext({});
const CreateAssessment = () => {
  const [newobject, setObject] = useState({
    skill_id: 0,
    questions_and_answers: [
      {
        question_no: 0,
        question_text: '',
        options: [''],
        correct_option: 0,
      },
    ],
    is_published: false,
    assessment_name: '',
    assessment_duration: 0,
  });

  const [active, setActive] = useState<null | string>('button1');
  const [listupdate, setListupdate] = useState(false);
  const handleClick = (button: string) => {
    setActive(button);
  };
  const savetodrafts = () => {
    console.log('tugytf');
  };
  const publishClick = () => {
    const newt = { ...newobject };
    newt.is_published = true;
    setObject(newt);
    setListupdate(true);
  };
  const draftsClick = () => {
    newobject.is_published = false;
    setListupdate(true);
  };

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
                <div>
                  <Backarrow />
                </div>
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
                  <Edithead />
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

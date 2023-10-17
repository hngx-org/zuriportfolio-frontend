import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Button from '@ui/Button';
import { Edit } from 'iconsax-react';
import { FaSpinner } from 'react-icons/fa';

import Modal from '@modules/assessment/modals/Loadingpopup';
import MainLayout from '../../../../components/Layout/MainLayout';
import { AssessmentBanner } from '@modules/assessment/component/banner';
import CreateTemplate from '@modules/assessment/component/createnewassessments';
import ScoringScreen from '@modules/assessment/scoringScreen';
import backarrow from '../../../../modules/assessment/component/backarrow.svg';
import Image from 'next/image';
import { useCreatingAssessmentContext } from '../../../../context/assessment/CreatingAssessmentContext';

export const ToPushContext = React.createContext({});
export const UpdateContext: any = React.createContext({});
const CreateAssessment = () => {
  //Please edit for scoring screen
  //const [examDuration, setExamDuration]:any = useContext(useCreatingAssessmentContext)

  const router = useRouter();
  const data = router.query;
  const skillid: any = data.name;
  const [destination, setDestination] = useState('');
  const [newobject, setObject] = useState({
    skill_id: skillid,
    questions_and_answers: [
      {
        question_no: 1,
        question_text: '',
        question_type: 'multiple_choice',
        options: [''],
        correct_option: 0,
      },
    ],
    assessment_name: '',
    duration_in_minutes: 0,
  });
  const closeModal = () => {
    setModalOpen(false);
  };
  const [active, setActive] = useState<null | string>('button1');
  const [isModalOpen, setModalOpen] = useState(false);
  const [err, setErr] = useState('');
  const [errstate, setErrstate] = useState(false);
  const [listupdate, setListupdate] = useState('waiting');
  const [postLoading, setPostLoading] = useState(false);
  const handleClick = (button: string) => {
    setActive(button);
  };

  const publishClick = () => {
    const newt = { ...newobject };
    setObject(newt);
    setListupdate('save');
    setDestination('Publishing assessments');
  };
  const draftsClick = () => {
    setListupdate('save');
    setDestination('Saving drafts');
  };
  const [disable, setDisable] = useState(true);

  const readInput = (e: any) => {
    const newt = { ...newobject };
    newt.assessment_name = e.target.value;
    setObject(newt);
  };

  const publishAssessment = async () => {
    // split question and string and number
    var url = '';
    if (destination === 'Publishing assessments') {
      url = 'https://piranha-assessment-jco5.onrender.com/api/admin/assessments/';
    } else {
      url = 'https://piranha-assessment-jco5.onrender.com/api/admin/drafts/';
    }

    const reqOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('zpt')}`,
      },
      body: JSON.stringify(newobject),
    };
    const postEnd = await fetch(url, reqOptions);
    if (!postEnd.ok) {
      console.log('Error' + postEnd.status);
      // setModalOpen(false);
      setErr(`Failed: Error${postEnd.status}`);
      setErrstate(true);
      setPostLoading(false);
      setTimeout(() => {
        setModalOpen(false);
      }, 4000);
    }
    const response = await postEnd.json();
    if (postEnd.ok) {
      setErr(`Succesfully Created!`);
      setPostLoading(false);
      setErrstate(false);
    }
    console.log(response);
  };

  useEffect(() => {
    if (listupdate === 'post') {
      publishAssessment();
      setModalOpen(true);
      setPostLoading(true);
      setListupdate('waiting');
    }
  }, [listupdate, publishAssessment]);

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
                <Button className="p-3" intent={'primary'} size={'sm'} spinnerColor="#000" /*onClick={updateDuration}*/>
                  Save Changes
                </Button>
              )}
            </div>
            <div className="pt-4 pb-2 flex space-x-10 justify-center">
              <Modal isOpen={isModalOpen} onClose={closeModal}>
                <div className="text-center text-white-100 text-[25px] font-semibold w-max">{destination}</div>
                {postLoading && <FaSpinner color="#fff" className="animate-spin" size={100} />}
                {err ? (
                  <p
                    className={`${
                      err.includes('Error') ? 'text-red-200' : 'text-white-100'
                    } w-max text-center text-[20px]`}
                  >
                    {err}
                  </p>
                ) : null}
                {postLoading ? (
                  ''
                ) : (
                  <Button
                    className="p-3"
                    intent={'secondary'}
                    size={'md'}
                    spinnerColor="#000"
                    href={'/super-admin/assessment'}
                  >
                    Check assessments
                  </Button>
                )}
              </Modal>
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
                <ScoringScreen skillId={newobject.skill_id} />
              )}
            </div>
          </main>
        </MainLayout>
      </UpdateContext.Provider>
    </ToPushContext.Provider>
  );
};

export default CreateAssessment;

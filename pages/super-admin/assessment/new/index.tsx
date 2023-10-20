import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Edit } from 'iconsax-react';
import Link from 'next/link';
import Head from 'next/head';
import Button from '@ui/Button';
import MainLayout from '../../../../components/Layout/MainLayout';
import { AssessmentBanner } from '@modules/assessment/component/banner';
import CreateTemplate from '@modules/assessment/component/createnewassessments';
import ScoringScreen from '@modules/assessment/scoringScreen';
import backarrow from '../../../../modules/assessment/component/backarrow.svg';
import Spinner from '@ui/Spinner';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import assessment from '..';
import useDisclosure from '../../../../hooks/useDisclosure';
import Modal from '@ui/Modal';
export const ToPushContext = React.createContext({});
export const UpdateContext: any = React.createContext({});
const CreateAssessment = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const router = useRouter();
  const data = router.query;
  const skillid: any = data.name;
  const [destination, setDestination] = useState('');
  const [newtitle, setNewTitle] = useState('');

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

  const [active, setActive] = useState<null | string>('button1');
  const [listupdate, setListupdate] = useState('waiting');
  const [postLoading, setPostLoading] = useState(false);
  const handleClick = (button: string) => {
    setActive(button);
  };

  const publishClick = () => {
    var i = 0;
    var total = newobject.questions_and_answers.length;
    newobject.questions_and_answers.forEach((obj) => {
      if (obj.correct_option !== 0) {
        i++;
      }
    });
    if (total != i) {
      toast.error('Ensure all correct options are selected');
    } else if (newobject.assessment_name === '') {
      toast.error('OOPS! Looks like you forgot to write the assessment name');
    } else if (newobject.duration_in_minutes === 0) {
      toast.error('Oops! You did not set assessment duration? Click on scoring and set');
    } else {
      setListupdate('save');
      setDestination('Publishing assessments');
    }
  };
  const [modalopen, setModalOpen] = useState(false);
  const draftsClick = () => {
    if (newobject.assessment_name === '') {
      toast.error('OOPS! Looks like you forgot to write the assessment name');
    } else {
      setListupdate('save');
      setDestination('Saving to drafts');
    }
  };
  const [disable, setDisable] = useState(true);

  const readInput = (e: any) => {
    const newt = { ...newobject };
    newt.assessment_name = e.target.value;
    setObject(newt);
  };

  const scoringClick = () => {
    setListupdate('scoreclick');
    handleClick('button2');
  };
  const questionClick = () => {
    setListupdate('addquest');
    handleClick('button1');
  };

  const publishAssessment = async (assessmentsInfo: any, id: any) => {
    // split question and string and number
    try {
      var url = '';
      console.log(destination);
      if (destination === 'Publishing assessments') {
        url = 'https://piranha-assessment-jco5.onrender.com/api/admin/assessments/';
      } else {
        url = 'https://piranha-assessment-jco5.onrender.com/api/admin/drafts/';
      }

      const transformedAssesment = { ...assessmentsInfo, skill_id: id };
      const reqOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('zpt')}`,
        },
        body: JSON.stringify(transformedAssesment),
      };

      const postEnd = await fetch(url, reqOptions);
      const response = await postEnd.json();

      if (!postEnd.ok) {
        console.log('Error' + postEnd.status);
        if (postEnd.status === 409) {
          toast.error('Looks like the assessment name exists already! Give a unique name');
        } else if (postEnd.status === 406) {
          toast.error(`${postEnd.status}, Please make sure fields are correectly field`);
        } else {
          toast.error(postEnd.status, response?.message);
        }

        // setPostLoading(false);
        setListupdate('waiting');
      }
      if (postEnd.ok) {
        if (destination === 'Publishing assessments') {
          setNewTitle(`${newobject.assessment_name} Succesfully Published!`);
        } else {
          setNewTitle(`${newobject.assessment_name} added to drafts!`);
        }
        setPostLoading(false);
        setModalOpen(true);
        onclose;
        setListupdate('clear');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPostLoading(false);
    }
  };

  useEffect(() => {
    const assessments = newobject;
    const sendAssesment = async () => {
      if (listupdate === 'post') {
        publishAssessment(assessments, skillid);
        setPostLoading(true);
        setListupdate('waiting');
      }
    };
    sendAssesment();
  }, [listupdate]);

  return (
    <>
      <Head>
        <title>Create new assessment</title>
        <meta
          name="description"
          content="Discover a versatile online marketplace where sellers can showcase their products, and buyers can find a wide range of goods. Shop for unique handcrafted items, everyday essentials, and more."
        />
        <meta property="og:title" content="Create a new assessment" />
        <meta
          property="og:description"
          content="Create an assessment to be published or save to drafts to be worked on later"
        />

        <meta property="og:url" content="https://staging.Zuri.team/assessment/new" />
      </Head>
      <ToPushContext.Provider value={[newobject, setObject]}>
        {postLoading && <Spinner />}

        <UpdateContext.Provider value={[listupdate, setListupdate]}>
          <MainLayout activePage="" showTopbar showFooter showDashboardSidebar={false}>
            {modalopen && (
              <Modal isOpen={!isOpen} closeModal={onOpen} title={newtitle} isCloseIconPresent={false} size="sm">
                {' '}
                {destination === 'Publishing assessments' ? (
                  <Link href={'/super-admin/assessment/'}>
                    <Button className="w-full my-4">View assessments</Button>
                  </Link>
                ) : (
                  <div className="p-4">
                    <Link href={'/super-admin/assessment/drafts'}>
                      <Button className="w-full my-3">View drafts</Button>
                    </Link>
                    <Link href={'/super-admin/assessment'}>
                      {' '}
                      <Button className="w-full">Go back to home page</Button>
                    </Link>
                  </div>
                )}{' '}
              </Modal>
            )}
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
                    router.back();
                  }}
                >
                  <Image alt="go back" src={backarrow} width={'20'} height={'20'} />
                  <p className="text-dark[100]">Go back</p>
                </div>{' '}
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
                  <Button
                    className="p-3"
                    intent={'primary'}
                    size={'sm'}
                    spinnerColor="#000" /*onClick={updateDuration}*/
                  >
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
                  onClick={questionClick}
                >
                  Questions &amp; Answers
                </div>
                <div
                  className={` cursor-pointer ${
                    active === 'button2'
                      ? 'text-[#BF8443] font-bold rounded-sm border-b-4 border-[#BF8443]'
                      : 'text-dark-100'
                  }`}
                  onClick={scoringClick}
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
                            value={newobject.assessment_name}
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
                  <ScoringScreen assessment={assessment} skillId={newobject.skill_id} />
                )}
              </div>
            </main>
          </MainLayout>
        </UpdateContext.Provider>
      </ToPushContext.Provider>
    </>
  );
};

export default CreateAssessment;

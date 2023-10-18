import React, { useEffect, useState } from 'react';
import MainLayout from '../../../../components/Layout/MainLayout';
import { AssessmentBanner } from '@modules/assessment/component/banner';
import Button from '@ui/Button';
import ScoringScreen from '../../../../modules/assessment/scoringScreen';
import backarrow from '../../../../modules/assessment/component/backarrow.svg';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Edit } from 'iconsax-react';
import { ToastContainer, toast } from 'react-toastify';
import CreateAssessment from '../new';
import CreateDraftQuestion from '@modules/assessment/component/CreateDraftQuestion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { withAdminAuth } from '../../../../helpers/withAuth';

type Props = {
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
};
const DraftPreview = () => {
  const [draftData, setDraftData] = useState<{ questions: any[]; title: string }>({ questions: [], title: '' });

  const arr = [1, 2, 3];
  const router = useRouter();
  const params = useParams();
  const id = params?.id;
  console.log(params);
  // const draftId = data.id;
  const skillid = 2;

  const [assessment, setAssessment] = useState({
    id: 0,
    title: '',
    createdAt: new Date(), // Initialize with a default date or null if needed
    duration_minutes: 0,
    questions: [
      {
        answers: [{}],
        question_no: 1,
        question_text: 'question',
        question_type: 'multiple_choice',
      },
    ],
    updatedAt: new Date(), // Similarly for updatedAt
  });

  const setDuration = (data: any) => {
    setAssessment((prevAssessment) => ({
      ...prevAssessment,
      duration_minutes: data,
    }));
  };
  const [active, setActive] = useState<null | string>('button1');
  const handleClick = (button: string) => {
    setActive(button);
  };
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = `https://piranha-assessment-jco5.onrender.com/api/admin/drafts/${id}/`;

    const token = localStorage.getItem('zpt') ?? '';

    if (id != null) {
      fetch(apiUrl, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,

          'X-CSRFTOKEN': token,
        },
      })
        .then((response) => {
          toast.info('Loading draft data...');
          if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
          }
          return response.json(); // Parse the JSON response
        })
        .then((responseData) => {
          console.log('This is the data', responseData);
          setDraftData(responseData);
          setAssessment(responseData);
          setLoading(false);
          toast.success('Draft data loaded successfully');
        })
        .catch((error) => {
          console.error('Error:', error);
          setLoading(false);
          toast.error('Error loading draft data');
        });
    }
  }, [id]);

  const [disable, setDisable] = useState(true);

  const updateDraft = () => {
    const apiUrl = `https://piranha-assessment-jco5.onrender.com/api/admin/drafts/${id}/`;
    const token = localStorage.getItem('zpt') ?? '';

    // Ensure that the draftData is not empty
    if (draftData && draftData.questions && draftData.title) {
      // Define the PUT request options
      const requestOptions = {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'X-CSRFTOKEN': token,
        },
        body: JSON.stringify(draftData), // Convert draftData to JSON string
      };

      fetch(apiUrl, requestOptions)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
          }
          return response.json(); // Parse the JSON response
        })
        .then((responseData) => {
          console.log('Draft updated successfully:', responseData);
          toast.success('Draft updated successfully');
        })
        .catch((error) => {
          console.error('Error updating draft:', error);
          toast.error('Error updating draft');
        });
    } else {
      console.error('Draft data is empty. Cannot update.');
      toast.error('Draft data is empty. Cannot update.');
    }
  };

  return (
    <MainLayout activePage="" showTopbar showFooter showDashboardSidebar={false}>
      <AssessmentBanner
        title="Preview/Edit"
        subtitle="An overview of all questions and answers."
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
            <Button intent={'secondary'} size={'sm'} spinnerColor="#000" onClick={() => {}}>
              Save To Drafts
            </Button>
            <Button className="p-3" intent={'primary'} size={'sm'} spinnerColor="#000" onClick={() => {}}>
              Publish Assesments
            </Button>
          </div>
        ) : (
          <Button className="p-3" intent={'primary'} size={'sm'} spinnerColor="#000" onClick={updateDraft}>
            Save Changes
          </Button>
        )}
      </div>
      <div className="pt-4 pb-2 flex space-x-10 justify-center">
        <div
          className={` cursor-pointer ${
            active === 'button1' ? 'text-[#BF8443] font-bold border-b-4 border-[#BF8443] ' : 'text-dark-100 rounded-sm'
          }`}
          onClick={() => handleClick('button1')}
        >
          Questions &amp; Answers
        </div>
        <div
          className={` cursor-pointer ${
            active === 'button2' ? 'text-[#BF8443] font-bold rounded-sm border-b-4 border-[#BF8443]' : 'text-dark-100'
          }`}
          onClick={() => handleClick('button2')}
        >
          Scoring
        </div>
      </div>
      <div className="w-[\100%\] bg-[#DFE3E6] h-[2px] translate-y-[-8px] "></div>
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
                    placeholder={draftData.title}
                    disabled={disable}
                    onChange={(e) => {}}
                  />
                </div>
                <div>
                  <label htmlFor="input_assessment">
                    <Edit className="w-[25px] cursor-pointer" onClick={() => setDisable(false)} />
                  </label>
                </div>
              </div>
            </div>
            {draftData.questions?.map((item, index) => (
              <div key={index} className="mt-8 text-left">
                <div className="border-[1px] border-[#DFE3E6] rounded-[20px] p-4">
                  <div className="flex justify-between mb-4">
                    <h3 className="text-green-300 font-manropeEB text-xl">{`Question ${item.question_no} out of ${draftData.questions.length}`}</h3>
                    <Link href={`/super-admin/assessment/draft/edit/${id}`}>
                      <button className="text-md font-manropeB text-black">Edit</button>
                    </Link>
                  </div>
                  <p className="text-sm text-[#2E3130]">{item.question_text}</p>
                  <p className="text-xs text-blue-700">Pick only one correct answer</p>
                  <div className="mt-8 flex flex-col gap-[22px]">
                    {item.answer.options.map((option: any, optionIndex: any) => (
                      <div key={index} className="flex gap-4">
                        <input type="radio" name={`Question${item.question_no}`} id={`option${optionIndex + 1}`} />
                        <label htmlFor={`option${optionIndex + 1}`} className="text-xs text-gray-700">
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            <div className="mt-8">
              <CreateDraftQuestion />
            </div>
          </>
        ) : (
          <ScoringScreen assessment={assessment} skillId={skillid} />
        )}
      </div>
    </MainLayout>
  );
};

export default withAdminAuth(DraftPreview);

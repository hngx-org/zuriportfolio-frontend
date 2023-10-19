import React, { useEffect, useState } from 'react';
import MainLayout from '../../../../../components/Layout/MainLayout';
import { AssessmentBanner } from '@modules/assessment/component/banner';
import Button from '@ui/Button';
import ScoringScreen from '@modules/assessment/scoringScreen';
import { useRouter } from 'next/router';
import EditDraft from '@modules/assessment/component/editDraft';
import Loader from '@ui/Loader';
import { Edit } from 'iconsax-react';
import { ToastContainer, toast } from 'react-toastify';

interface AssessmentData {
  questions: Array<{
    question_no: number;
    question_text: string;
    question_type: string;
    answer: {
      options: string[];
      correct_option: string;
    };
  }>;
  title: string;
  duration_minutes: number;
  assessment_name: string;
}

const DraftPreviewEdit: React.FC = () => {
  const [draftData, setDraftData] = useState<AssessmentData>({
    questions: [],
    assessment_name: '',
    duration_minutes: 0,
    title: '',
  });

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

  const [loading, setLoading] = useState(true);
  const [disable, setDisable] = useState(true);

  const router = useRouter();
  const data = router.query;
  const draftId = data.id;

  const [active, setActive] = useState<null | string>('button1');

  const handleClick = (button: string) => {
    setActive(button);
  };

  //Fetch the required draft that with the same id
  useEffect(() => {
    const apiUrl = `https://piranha-assessment-jco5.onrender.com/api/admin/drafts/${draftId}/`;
    const token = localStorage.getItem('zpt') ?? '';

    if (draftId != null) {
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
  }, [draftId]);

  //Updates the draft question
  const updateDraft = (updatedData: AssessmentData) => {
    const apiUrl = `https://piranha-assessment-jco5.onrender.com/api/admin/drafts/${draftId}/`;
    const zptToken = localStorage.getItem('zpt') ?? '';
    console.log(updatedData);

    fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${zptToken}`,
        // Add any authorization headers you need here
      },
      body: JSON.stringify(updatedData), // Convert the updated data to JSON
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update draft');
        }
        return response.json();
      })
      .then((responseData) => {
        // Show a success message in the modal
        toast.success('Draft updated successfully');

        // Close the modal after a delay (4 seconds in this case)
        setTimeout(() => {
          router.push(`/super-admin/assessment/draft/${draftId}`);
        }, 4000);
      })
      .catch((error) => {
        console.error('Error updating draft:', error);
        console.log('error side', updatedData);

        // Show an error message in the modal
        toast.error('Error updating draft');
      });
  };

  return (
    <MainLayout activePage="" showTopbar showFooter showDashboardSidebar={false}>
      <main className="w-full">
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
              className="p-3 text-white-100 text-center "
              onClick={() => {
                updateDraft(draftData); // Call the updateDraft function with the updated data
              }}
            >
              Save Changes
            </Button>
          </div>
        </div>
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
        <div className="pt-[4rem] pb-[8rem] text-center container mx-auto max-w-xl px-[12px] sm:px-[0]">
          {active === 'button1' ? (
            <>
              <div className="border-[1px] border-[#DFE3E6] rounded-t-[20px]">
                <div className="bg-[#BF8443] p-2 rounded-t-[20px]"></div>
                <div className="p-4 flex justify-between items-center">
                  <div className="text-[20px] w-full">
                    <input
                      type="text"
                      id="input_assessment"
                      className="w-full text-left outline-none border-none bg-transparent placeholder-black focus:placeholder-transparent focus:border-transparent focus:ring-transparent"
                      value={draftData.title}
                      disabled={disable}
                      onChange={(e) => setDraftData({ ...draftData, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="input_assessment">
                      <Edit className="w-[25px] cursor-pointer" onClick={() => setDisable(false)} />
                    </label>
                  </div>
                </div>
              </div>
              {loading ? (
                <div className="mt-8">
                  <Loader />
                </div>
              ) : (
                <div className="pt-4">
                  <EditDraft draftData={draftData} setDraftData={setDraftData} />
                </div>
              )}
            </>
          ) : (
            <ScoringScreen assessment={assessment} skillId={2} />
          )}
        </div>
      </main>
    </MainLayout>
  );
};

export default DraftPreviewEdit;

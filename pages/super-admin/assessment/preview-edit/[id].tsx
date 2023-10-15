
import MainLayout from '../../../../components/Layout/MainLayout';
import { AssessmentBanner } from '@modules/assessment/component/banner';
import Button from '@ui/Button';
import Edithead from '@modules/assessment/component/edittitleHead';
import React, { useState, useEffect } from 'react';
import EditLayout from '@modules/assessment/component/editLayout';
import { useRouter } from 'next/router';
// import ScoringS from '@modules/assessment/component/scoreDropdown';
import ScoringScreen from '@modules/assessment/scoringScreen';



const EditAssesment = () => {
  const [active, setActive] = useState<null | string>('button1');
  const [assessment, setAssessment] = useState({
    title: '',
    createdAt: new Date(), // Initialize with a default date or null if needed
    duration_minutes: 0,
    questions: [{ 
      answers: [{}], 
      question_no: 1, 
      question_text: "question", 
      question_type: "multiple_choice"
    }],
    updatedAt: new Date() // Similarly for updatedAt
  });
  // const [headInput, setHeadInput] = useState('');
    
  // const handleInput = (value: string) => {
  //   setHeadInput(value);
  // };
  const router = useRouter();
  const { id } = router.query;
  
  const handleClick = (button: string) => {
    setActive(button);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://piranha-assessment-jco5.onrender.com/api/admin/assessments/${id}/`;
        const csrfToken = localStorage.getItem('zpt') ?? '';
  
        const response = await fetch(url, {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${csrfToken}`, 
            'X-CSRFTOKEN': csrfToken, 
          },
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        setAssessment(data);
        console.log('assessment data:', data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [id]);
  

  
  const setTitle = (data:any) => {
    setAssessment(prevAssessment => ({
        ...prevAssessment,
        title: data
    }));
  }
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
            <Button className="p-4 border-2 border-green-500 text-green-500 text-center  bg-white-100 hover:text-white-100">
              Save To Drafts
            </Button>
            <Button className="p-3 text-white-100 text-center ">Publish Assesments</Button>
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
            
              <Edithead assessment={assessment} onInputChange={setTitle} />
              <div className="pt-4">
                <EditLayout />
              </div>
            </>
          ) : (
            <ScoringScreen />
          )}
        </div>
      </main>
    </MainLayout>
  );
};

export default EditAssesment;

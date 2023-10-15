import React, { useEffect, useState } from 'react';
import MainLayout from '../../../components/Layout/MainLayout';
import { AssessmentBanner } from '@modules/assessment/component/banner';
import Button from '@ui/Button';
import ScoringScreen from '@modules/assessment/scoringScreen';
import backarrow from '../../../modules/assessment/component/backarrow.svg';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Edit } from 'iconsax-react';
import Link from 'next/link';
import CreateDraftQuestion from '@modules/assessment/component/CreateDraftQuestion';

export default function DraftPreview() {
  const [draftData, setDraftData] = useState<{ questions: any[]; title: string }>({ questions: [], title: '' });
  const router = useRouter();
  const data = router.query;
  const draftId = data.id;

  const [active, setActive] = useState<null | string>('button1');
  const handleClick = (button: string) => {
    setActive(button);
  };

  useEffect(() => {
    const apiUrl = `https://piranha-assessment-jco5.onrender.com/api/admin/drafts/${draftId}/`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the JSON response
      })
      .then((responseData) => {
        console.log('This is the data', responseData);
        setDraftData(responseData);
        // setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        // setLoading(false);
      });
  }, [draftId]);

  const [disable, setDisable] = useState(true);

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
          <Button className="p-3" intent={'primary'} size={'sm'} spinnerColor="#000">
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
            {draftData.questions.map((item, index) => (
              <div key={index} className="mt-8 text-left">
                <div className="border-[1px] border-[#DFE3E6] rounded-[20px] p-4">
                  <div className="flex justify-between mb-4">
                    <h3 className="text-green-300 font-manropeEB text-xl">{`Question ${item.question_no} out of ${draftData.questions.length}`}</h3>
                    <Link href={`/assessment/draft/edit/${draftId}`}>
                      <button className="text-md font-manropeB text-black">Edit</button>
                    </Link>
                  </div>
                  <p className="text-sm text-[#2E3130]">{item.question_text}</p>
                  <p className="text-xs text-blue-700">Pick only one correct answer</p>
                  <div className="mt-8 flex flex-col gap-[22px]">
                    {item.answers.map((answer: any, index: number) =>
                      answer.options.map((option: any, optionIndex: any) => (
                        <div key={index} className="flex gap-4">
                          <input type="radio" name={`Question${item.question_no}`} id={`option${optionIndex + 1}`} />
                          <label htmlFor={`option${optionIndex + 1}`} className="text-xs text-gray-700">
                            {option}
                          </label>
                        </div>
                      )),
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div className="mt-8">
              <CreateDraftQuestion />
            </div>
          </>
        ) : (
          <ScoringScreen />
        )}
      </div>
    </MainLayout>
  );
}

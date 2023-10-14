import { FC } from 'react';
import MainLayout from '../../../../components/Layout/MainLayout';
import { ArrowLeft } from 'iconsax-react';
import Link from 'next/link';
import Button from '@ui/Button';
import { useRouter } from 'next/router';
import { AssessmentBanner } from '@modules/assessment/component/banner';
import { fetchUserTakenAssessment } from '../../../../http/userTakenAssessment';
const TakeTest: FC = () => {
  const router = useRouter();

  const handleGetStarted = async () => {
    try{
      const data = await fetchUserTakenAssessment()
      console.log('data',data.statusText)
      const assessmentData = data.data[0].data
      // console.log('assessmentData', assessmentData)
      localStorage.setItem('assessmentData', JSON.stringify(assessmentData))
      if (data) {
        router.push(`/assessments/take-test/questions`)
      }
    }catch(error){
      console.log('catch error',error)
    }
  }
  return (
    <>
      <MainLayout activePage={'intro'} showTopbar showFooter showDashboardSidebar={false}>
        <AssessmentBanner
          bannerImageSrc="/assets/images/banner/assm_1.svg"
          title="Assessment test"
          subtitle="You are currently writing the  user persona quiz"
        />
        <div className="container mx-auto pt-16 px-8 pb-36 md-pb-4 md:h-screen">
          <div className="mx-auto sm:w  md:w-fit rounded-lg border border-slate-100 pt-10 pb-5 md:pb-10 md:px-10 px-5">
            <button className="text-custom-color43" onClick={() => router.back()}>
              <ArrowLeft />
            </button>
            <h1 className="text-brand-green-primary font-manropeEB mt-4 mb-6 font-extrabold text-2xl">
              Welcome to the User persorna quiz
            </h1>
            <p className="mb-8 text-sm md:text-base text-custom-color43">
              Test Duration: This assessment would take approximately one minute to complete
            </p>
            <h5 className="text-custom-color43">Instructions:</h5>
            <ul className="pl-5 list-decimal text-sm md:text-base text-custom-color43">
              <li>Focus: Find a quite, distraction free environment.</li>
              <li>Tech Requirements: Ensure a stable internet connection and device.</li>
              <li>Honesty: Answer honestly to access your skills accurately.</li>
              <li>Time Management: Manage your time wisely. Skip difficult questions if needed.</li>
              <li>No Asistence: Do not seek help or use external resources.</li>
              <li>Submission: Complete all questions and submit within the time limit</li>
            </ul>
            <div className="flex items-center justify-end mt-8">
              <Link href="/assessments/take-test/questions">
                <Button
                  intent={'primary'}
                  size={'md'}
                  isLoading={false}
                  spinnerColor="#000"
                  onClick={handleGetStarted}
                  className="px-5 py-0 md:py-2 md:px-10 text-sm md:text-base font-manropeL"
                >
                  Start assessment
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};
export default TakeTest;

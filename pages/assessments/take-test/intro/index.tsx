import { FC } from 'react';
import MainLayout from '../../../../components/Layout/MainLayout';
import { ArrowLeft } from 'iconsax-react';
import Link from 'next/link';
import Button from '@ui/Button';
import { useRouter } from 'next/router';
const TakeTest: FC = () => {
  const router = useRouter();
  return (
    <>
      <MainLayout activePage={'intro'} showTopbar showFooter showDashboardSidebar={false}>
        <div className="container pt-16 px-8 pb-36 md-pb-4 md:h-screen">
          <div className="mx-auto sm:w  md:w-fit rounded-lg border border-slate-300 pt-10 pb-5 md:pb-10 md:px-10 px-5">
            <button onClick={() => router.back()}>
              <ArrowLeft />
            </button>
            <h1 className="text-brand-green-primary font-manropeEB mt-4 mb-6 font-extrabold text-2xl">
              Welcome to the User persornal quiz
            </h1>
            <p className="mb-8 text-sm md:text-base">
              Test Duration: This assessment would take approximately one minute to complete
            </p>
            <h5>Instructions:</h5>
            <ul className="pl-5 list-decimal text-sm md:text-base">
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

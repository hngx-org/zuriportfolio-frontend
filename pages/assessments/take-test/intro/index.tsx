import React, { FC, useEffect, useRef } from 'react';
import MainLayout from '../../../../components/Layout/MainLayout';
import { ArrowLeft } from 'iconsax-react';
import Link from 'next/link';
import Button from '@ui/Button';
import { useRouter } from 'next/router';
import { AssessmentBanner } from '@modules/assessment/component/banner';
import { getAssessmentDetails } from '../../../../http/userTakenAssessment';
import { withUserAuth } from '../../../../helpers/withAuth';
import Loader from '@ui/Loader';
import { useQuery } from '@tanstack/react-query';
import Head from 'next/head';

type AssessmentDetails = {
  assessment_id: number;
  skill_id: number;
  title?: string;
  description: string;
  question_count: number;
  duration_minutes: string;
  status: string;
  start_date: Date;
  end_date: Date;
};

const TakeTest: FC = () => {
  const router = useRouter();
  const tokenRef = useRef<string | null>(null);
  const { data } = router.query;

  React.useEffect(() => {
    tokenRef.current = localStorage.getItem('zpt');
  }, []);

  const {
    isLoading,
    isError,
    error,
    data: assessment,
  } = useQuery(['allAssessment'], () => getAssessmentDetails(tokenRef.current as string, data as string));
  console.log('assessment', assessment);

  const result = assessment;

  return (
    <>
      <Head>
        <link rel="icon" href="/assets/zuriLogo.svg" />
        <title>{result?.title}</title>
        <meta name="description" content={result?.description} />
      </Head>
      <MainLayout activePage={'intro'} showTopbar showFooter showDashboardSidebar={false}>
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <Loader />
          </div>
        ) : (
          <>
            <AssessmentBanner
              bannerImageSrc="/assets/images/banner/assm_1.svg"
              title="Assessment test"
              subtitle={`You are currently writing the ${result?.title} quiz`}
            />
            <div className="container mx-auto pt-16 px-8 pb-36 md-pb-4 md:h-screen mb-24">
              <div className="mx-auto sm:w  md:w-fit rounded-lg border border-slate-100 pt-10 pb-5 md:pb-10 md:px-10 px-5 mb-16">
                <button className="text-custom-color43" onClick={() => router.back()}>
                  <ArrowLeft />
                </button>
                <h1 className="text-brand-green-primary font-manropeEB mt-4 mb-6 font-extrabold text-2xl">
                  Welcome to the <span className="capitalize">{result?.title}</span> quiz
                </h1>
                <p className="mb-8 text-sm md:text-base text-custom-color43">{result?.description}</p>
                <p className="mb-8 text-sm md:text-base text-custom-color43">
                  Test Duration: This assessment would take approximately {result?.duration_minutes} minute to complete
                </p>
                <p className="mb-8 text-sm md:text-base text-custom-color43">
                  Question Count: This assessment has {result?.question_count} questions
                </p>

                <div className="flex items-center justify-end mt-8">
                  <Link href={`/assessments/take-test/questions?data=${result?.skill_id}&id=${result?.assessment_id}`}>
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
          </>
        )}
      </MainLayout>
    </>
  );
};
export default withUserAuth(TakeTest);

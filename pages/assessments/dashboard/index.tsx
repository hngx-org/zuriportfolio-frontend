import React from 'react';
import Image from 'next/image';
import Button from '@ui/Button';
import { LevelData, AssesMentData } from '../../../helpers/dashboardui';
import MainLayout from '../../../components/Layout/MainLayout';
import Link from 'next/link';
import { getAllAssessments } from '../../../http/userTakenAssessment';

import task from '../../../public/assets/dashboard/task.svg';
import timer from '../../../public/assets/dashboard/timer.svg';
import medal from '../../../public/assets/dashboard/medal-star.svg';

type AssessmentDetails = {
  id?: string;
  assessment_id: number;
  skill_id: number;
  title?: string;
  description: string;
  duration_minutes: string;
  status: string;
  start_date: Date;
  end_date: Date;
};

const Dashboard = () => {

  const [result, setResult] = React.useState<AssessmentDetails[]>([]);

  React.useEffect(() => {
    const token = localStorage.getItem('zpt');
    const fetchData = async () => {
      try {
        const data = await getAllAssessments(token as string);
        const res = data.assessments;
        // console.log(res);

        setResult(res);
      } catch (error) {
        // Handle errors, e.g., set an error state or display an error message.
        console.error(error);
      }
    };

    fetchData();
  }, []);


  return (
    <MainLayout showTopbar activePage="dashboard" showFooter showDashboardSidebar={false}>
      <div className="w-[100%] mb-[3rem]">
        <div className="w-full bg-brand-green-shade40">
          <div className="2xl:max-w-[1240px] 2xl:mx-auto h-[3.5rem] grow md:h-[5.6rem] lg:h-[8rem] font-manropeL text-white-100 flex items-center justify-between pl-[1.5rem] md:pl-[2.5rem] lg:pl-[3rem] xl:pl-[5rem] 2xl:pl-0">
            <div className="md:w-[70%]">
              <h1 className="text-[.75rem] md:text-[1.25rem] mb-[.1rem] lg:text-[1.5rem] xl:text-[2rem] font-bold leading-1">
                My Dashboard
              </h1>
              <p className="text-[.375rem] md:text-[.65rem] lg:text-[.9rem] xl:text-[1.05rem] font-normal">
                Level Up Your UX Superpowers! Earn Badges, Build Trust, and Land the Dream Projects!
              </p>
            </div>
            <div className="h-full">
              <Image
                src="/assets/dashboard/dashboard-top.svg"
                alt="checklist"
                width={150}
                height={150}
                className="h-[100%] md:w-[300px] lg:w-[350px] xl:w-[400px]"
              />
            </div>
          </div>
        </div>
        <div className="lg:mx-[3rem] md:mx-[2.5rem] mx-[1.5rem] xl:mx-[5rem] 2xl:mx-auto 2xl:max-w-[1240px] 2xl:px-[1rem]">
          <Link href={`/assessments/history`}>
            <Button className="mt-[1rem] ml-auto text-[.6rem] md:text-[.75rem] lg:text-[.95rem] xl:text-[1rem] py-[.8rem] lg:py-[1rem] xl:py-[1.3rem] h-0 rounded-md">
              View Past assessment
            </Button>
          </Link>
          <div className="mt-[2rem] border-[.58px] border-white-400 rounded-md py-[.6rem] px-[1rem] md:p-[1.9rem] lg:p-[2.3rem] xl:p-[2.7rem] 2xl:p-[4rem]">
            <div className="">
              <h2 className="text-green-950 text-[.875rem] md:text-[.9rem] lg:text-[1.2rem] xl:text-[1.5rem] mb-[.4rem] md:mb-[1.2rem] xl:mb-[1.5rem] font-semibold">
                Skill Level
              </h2>
              <div className="md:flex">
                {LevelData().map((item, index) => (
                  <Link
                    href={`/assessments/dashboard/[badges]`}
                    as={`/assessments/dashboard/${item.level}`}
                    key={index}
                    className="flex md:mx-2 xl:mx-4 items-center gap-[.5rem] my-[1rem] md:my-0 md:gap-[.7rem] lg:gap-[1rem] p-[.7rem] lg:p-[1rem] border-[.58px] border-white-400 md:w-[14.4rem] lg:w-[35%] xl:w-[35%] 2xl:w-[35%] rounded-md h-[6rem] md:h-[7rem] lg:h-[9rem]"
                  >
                    <div className="relative group">
                      <div className="rounded-full overflow-hidden">
                        <Image
                          src={item.img}
                          alt={item.level}
                          width={200}
                          height={200}
                          className="object-cover w-[50px] lg:w-[70px] xl:w-[90px] h-full"
                        />
                      </div>
                    </div>
                    <div>
                      <p className="text-brand-green-shade10 font-medium text-[.75rem] md:text-[.85rem] lg:text-[1rem] xl:text-[1.3rem] leading-1 mb-1">
                        Level: <span className="capitalize">{item.level}</span>
                      </p>
                      <p className="text-white-650 text-[.5rem] md:text-[.625rem] lg:text-[.85rem] xl:text-[1rem]">
                        {item.desc}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {result?.map((item, index) => (
            <div key={index} className="mt-[2.5rem] border-[.58px] p-[1rem] lg:p-[1.5rem] rounded-md border-[#A8ACAB]">
              <div className="flex gap-[.8rem] md:gap-[.98rem] xl:gap-[1.5rem] items-center border-b-[1px] border-b-[#A8ACAB]">
                <Image
                  src="/assets/dashboard/assesment.svg"
                  alt="progress"
                  width={150}
                  height={200}
                  className="w-[70px] md:w-[76px] lg:w-[100px] xl:w-[116px]"
                />
                <h2 className="text-[#191C1E] leading-1 font-medium text-[.875rem] md:text-[1rem] lg:text-[1.5rem] uppercase">
                  {item.title}
                </h2>
              </div>
              <div className="mt-[1rem]">
                <p className="text-[#2E3130] text-[.5rem] md:text-[.625rem] lg:text-[.85rem] xl:text-[1.rem] leading-1">
                  Unlock your potential and level up your skills – take the assessment now!
                </p>

                <div className="flex items-center gap-[1rem] xl:gap-[2rem] my-[1rem] px-3 ml-3">
                  <Image

                    src={task}
                    alt="task"
                    width={20}
                    height={30}
                    className="overflow-hidden w-[.819rem] md:w-[1rem] lg:w-[1.5rem]"
                  />
                  <span className="text-[#444846] text-[.5rem] md:text-[.625rem] lg:text-[.85rem] xl:text-[1rem]">
                    10 multiple choice questions
                  </span>
                </div>
                <div className="flex items-center gap-[1rem] xl:gap-[2rem] my-[1rem] px-3 ml-3">
                  <Image
                    src={timer}

                    alt="timer"
                    width={20}
                    height={30}
                    className="overflow-hidden w-[.819rem] md:w-[1rem] lg:w-[1.5rem]"
                  />
                  <span className="text-[#444846] text-[.5rem] md:text-[.625rem] lg:text-[.85rem] xl:text-[1rem]">
                    {item.duration_minutes} minutes assessment
                  </span>
                </div>

                <div className="flex items-center gap-[1rem] xl:gap-[2rem] my-[1rem] px-3 ml-3">
                  <Image
                    src={medal}
                    alt="medal"
                    width={20}
                    height={30}
                    className="overflow-hidden w-[.819rem] md:w-[1rem] lg:w-[1.5rem]"
                  />
                  <span className="text-[#444846] text-[.5rem] md:text-[.625rem] lg:text-[.85rem] xl:text-[1rem]">
                    Score points to earn a badge
                  </span>
                </div>
              </div>
              <Button
                href={`/assessments/take-test/intro`}
                className="mt-[1.5rem] lg:mt-[1.8rem] xl:mt-[2.9rem] mx-auto text-[.6rem] md:text-[.75rem] lg:text-[.95rem] xl:text-[1.125rem] py-[.8rem] lg:py-[1rem] xl:py-[1.3rem] h-0 rounded-md"
              >
                Take Assessment
              </Button>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;

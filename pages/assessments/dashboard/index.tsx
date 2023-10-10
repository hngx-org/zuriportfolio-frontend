import React from 'react';
import Image from 'next/image';
import Button from '@ui/Button';
import { LevelData, AssesMentData } from '../../../helpers/dashboardui';
import MainLayout from '../../../components/Layout/MainLayout';

const Dashboard = () => {
  const [locked, setLocked] = React.useState<boolean>(false);

  return (
    <MainLayout showTopbar activePage="dashboard" showFooter showDashboardSidebar={false}>
      <div className="w-[100%] mb-[3rem]">
        <div className="w-full h-[3.5rem] grow md:h-[5.6rem] lg:h-[8rem] font-manropeL bg-brand-green-shade40 text-white-100 flex items-center justify-between pl-[1.5rem] md:pl-[2.5rem] lg:pl-[3rem] xl:pl-[5rem]">
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
        <div className="lg:mx-[3rem] md:mx-[2.5rem] mx-[1.5rem] xl:mx-[5rem] 2xl:mx-auto 2xl:w-[70%]">
          <Button className="mt-[1rem] ml-auto text-[.6rem] md:text-[.75rem] lg:text-[.95rem] xl:text-[1rem] py-[.8rem] lg:py-[1rem] xl:py-[1.3rem] h-0 rounded-md">
            View Past assessment
          </Button>
          <div className="mt-[2rem] border border-[.58px] border-white-400 rounded-md py-[.6rem] px-[1rem] md:p-[1.9rem] lg:p-[2.3rem] xl:p-[2.7rem] 2xl:p-[4rem]">
            <div className="">
              <h2 className="text-green-950 text-[.875rem] md:text-[.9rem] lg:text-[1.2rem] xl:text-[1.5rem] mb-[.4rem] md:mb-[1.2rem] xl:mb-[1.5rem] font-semibold">
                Current Skill Level
              </h2>
              <div className="md:flex">
                {LevelData().map((item, index) => (
                  <div
                    key={index}
                    className="flex md:mx-2 xl:mx-4 items-center gap-[.5rem] my-[1rem] md:my-0 md:gap-[.7rem] lg:gap-[1rem] p-[.7rem] lg:p-[1rem] border border-[.58px] border-white-400 md:w-[14.4rem] lg:w-[35%] xl:w-[35%] 2xl:w-[35%] rounded-md h-[6rem] md:h-[7rem] lg:h-[9rem] xl:h-[10rem]"
                  >
                    <div className="relative group">
                      <div
                        className={`${
                          locked !== item.locked ? 'block' : 'hidden'
                        } absolute inset-0 rounded-full group:opacity-0 transition duration-300 bg-[rgba(168,172,171,0.8)]`}
                      >
                        <Image
                          src="/assets/dashboard/lock.svg"
                          alt="lock"
                          width={30}
                          height={50}
                          className="mx-auto w-[25px] md:w-[15px] lg:w-[20px] xl:w-[30px] mt-[.7rem] md:mt-[.5rem] lg:mt-[.7rem] xl:mt-[1rem]"
                        />
                      </div>
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
                      <p className="text-brand-green-shade10 font-medium text-[.75rem] md:text-[.85rem] lg:text-[1rem] xl:text-[1.3rem] leading-1">
                        Level: {item.level}
                      </p>
                      <p className="text-brand-green-shade10 font-medium text-[.75rem] md:text-[.85rem] lg:text-[1rem] lg:text-[1.3rem] leading-1">
                        Score: {item.score}
                      </p>
                      <p className="text-white-650 text-[.5rem] md:text-[.625rem] lg:text-[.85rem] xl:text-[1rem]">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-[2.5rem] border-[.58px] p-[1rem] lg:p-[1.5rem] rounded-md border-[#A8ACAB]">
            <div className="flex gap-[.8rem] md:gap-[.98rem] xl:gap-[1.5rem] items-center border-b-[1px] border-b-[#A8ACAB]">
              <Image
                src="/assets/dashboard/assesment.svg"
                alt="progress"
                width={150}
                height={200}
                className="w-[70px] md:w-[76px] lg:w-[100px] xl:w-[116px]"
              />
              <h2 className="text-[#191C1E] leading-1 font-medium text-[.875rem] md:text-[1rem] lg:text-[1.5rem]">
                Assessment Name
              </h2>
            </div>
            <div className="mt-[1rem]">
              <p className="text-[#2E3130] text-[.5rem] md:text-[.625rem] lg:text-[.85rem] xl:text-[1.rem] leading-1">
                Unlock your potential and level up your skills – take the assessment now!
              </p>
              {AssesMentData().map((item, index) => (
                <div className="flex items-center gap-[1rem] xl:gap-[2rem] my-[1rem] px-3 ml-3" key={index}>
                  <Image
                    src={item.img}
                    alt={item.title}
                    width={20}
                    height={30}
                    className="overflow-hidden w-[.819rem] md:w-[1rem] lg:w-[1.5rem]"
                  />
                  <span className="text-[#444846] text-[.5rem] md:text-[.625rem] lg:text-[.85rem] xl:text-[1rem]">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
            <Button
              href="/assessments/take-test/intro"
              className="mt-[1.5rem] lg:mt-[1.8rem] xl:mt-[2.9rem] mx-auto text-[.6rem] md:text-[.75rem] lg:text-[.95rem] xl:text-[1.125rem] py-[.8rem] lg:py-[1rem] xl:py-[1.3rem] h-0 rounded-md"
            >
              Take Assessment
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;

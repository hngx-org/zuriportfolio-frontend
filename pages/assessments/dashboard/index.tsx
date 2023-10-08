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
        <div className="w-full h-[3.5rem] md:h-[5.6rem] lg:h-[8rem] font-manropeL pl-[.6rem] bg-brand-green-shade40 text-white-100 flex items-center md:justify-between md:px-4 lg:px-8">
          <div className="w-[70%]">
            <h1 className="text-[1rem] md:text-[1.75rem] font-bold leading-1">My Dashboard</h1>
            <p className="text-[.4rem] md:text-[.7rem] lg:text-[1rem] font-normal">
              Level Up Your UX Superpowers! Earn Badges, Build Trust, and Land the Dream Projects!
            </p>
          </div>
            <div className='h-full'>
              <Image
                src="/assets/dashboard/dashboard-top.svg"
                alt="checklist"
                width={120}
                height={120}
                className="h-[100%] md:w-[400px]"
              />
            </div>
        </div>
        <Button className="mt-[1rem] ml-auto me-4 text-[.7rem] md:text-[1rem]">View Past assessment</Button>
        <div className="mt-[2rem] mx-[.75rem] md:mx-8 border border-[1px] border-white-400 rounded-md py-[1rem] px-2 md:p-4">
          <div className="px-[2px]">
            <h2 className="text-green-950 text-[1.45rem] font-semibold">Current Skill Level</h2>
            <div className="md:flex">
              {LevelData().map((item, index) => (
                <div
                  key={index}
                  className="flex md:mx-2 items-center gap-2 border border-[1px] mb-[.75rem] my-[1rem] border-white-400 px-2 rounded-md h-[8rem] md:h-[9.5rem]"
                >
                  <div className="relative group">
                    <div
                      className={`${
                        locked !== item.locked ? 'block' : 'hidden'
                      } absolute inset-0 rounded-full group:opacity-0 transition duration-300 bg-[rgba(0,0,0,0.5)]`}
                    >
                      <Image src="/assets/dashboard/lock.svg" alt="lock" width={50} height={50} className="mx-auto" />
                    </div>
                    <div className="rounded-full overflow-hidden">
                      <Image
                        src={item.img}
                        alt={item.level}
                        width={200}
                        height={200}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-brand-green-shade10 font-medium text-[1.2rem] md:text-[1rem] lg:text-[1.5rem] leading-1">
                      Level: {item.level}
                    </p>
                    <p className="text-brand-green-shade10 font-medium text-[1.2rem] md:text-[1.5rem] leading-1">Score: {item.score}</p>
                    <p className="text-white-650 text-[.8rem] md:text-[1rem]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-[4rem] mx-[.75rem] md:mx-8 border-[1px] lg:border-[1px] rounded-md border-[#A8ACAB]">
          <div className="flex gap-[.8rem] items-center border-b-[1px] border-b-[#A8ACAB] mx-[.75rem] mx-8">
            <Image
              src="/assets/dashboard/assesment.svg"
              alt="progress"
              width={150}
              height={200}
              className="overflow-hidden"
            />
            <h2 className="text-[#191C1E] leading-1 font-medium text-[1.2rem] md:text-[2rem]">Assessment Name</h2>
          </div>
          <div className="mt-[1rem] px-4 md:px-8">
            <p className="text-[#2E3130] text-[.65rem] md:text-[1rem] leading-1">
              Unlock your potential and level up your skills – take the assessment now!
            </p>
            {AssesMentData().map((item, index) => (
              <div className="flex items-center gap-[1rem] md:gap-[2rem] my-[1rem] px-3" key={index}>
                <Image src={item.img} alt={item.title} width={20} height={30} className="overflow-hidden" />
                <span className="text-[#444846] text-[.8rem] md:text-[1.2rem]">{item.title}</span>
              </div>
            ))}
          </div>
          <Button className="my-[3rem] mx-auto text-[.7rem] md:text-[1rem]">Take assessment</Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;

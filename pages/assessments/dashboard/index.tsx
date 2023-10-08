import React from 'react';
import Image from 'next/image';
import Button from '@ui/Button';
import { LevelData, AssesMentData } from '../../../helpers/dashboardui';
import MainLayout from '../../../components/Layout/MainLayout';

const Dashboard = () => {
  const [locked, setLocked] = React.useState<boolean>(false);

  return (
    <MainLayout showTopbar activePage="dashboard" showFooter showDashboardSidebar={false}>
      <div className="w-[56.4rem] md:w-[57rem] lg:w-[81.6rem] mb-[3rem]">
        <div className="w-full h-[8rem] font-manropeL pl-[1.5rem] bg-brand-green-shade40 text-white-100 flex items-center justify-between">
          <div className="w-[70%]">
            <h1 className="text-[1.75rem] font-bold leading-10">My Dashboard</h1>
            <p className="text-[.8rem] lg:text-[1rem]">
              Level Up Your UX Superpowers! Earn Badges, Build Trust, and Land the Dream Projects!
            </p>
          </div>
          <div className="flex gap-[2px] h-full">
            <Image
              src="/assets/dashboard/checklist.svg"
              alt="checklist"
              width={200}
              height={200}
              className="overflow-hidden mt-8"
            />
            <Image
              src="/assets/dashboard/catayst.svg"
              alt="catayst"
              width={250}
              height={300}
              className="overflow-hidden"
            />
          </div>
        </div>
        <div className="mt-[2rem] mx-8 border-[2px] md:border-[1px] border-white-400 rounded-md p-4">
          <div className="px-2">
            <h2 className="text-green-950 text-[1.45rem] font-semibold">Current Skill Level</h2>
            <div className="md:flex">
              {LevelData().map((item, index) => (
                <div
                  key={index}
                  className="flex md:mx-3 items-center gap-4  md:border-[1px] border-[2px] my-[2.5rem] border-white-400 px-3 rounded-md h-[11rem]"
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
                    <p className="text-brand-green-shade10 font-medium text-[1.5rem] md:text-[1rem] lg:text-[1.5rem] leading-1">
                      Level: {item.level}
                    </p>
                    <p className="text-brand-green-shade10 font-medium text-[1.5rem] leading-1">Score: {item.score}</p>
                    <p className="text-white-650 text-[1rem]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-[4rem] mx-8 border-[2px] lg:border-[1px] rounded-md border-[#A8ACAB]">
          <div className="flex items-center border-b-[2px] border-b-[#A8ACAB] mx-8">
            <Image
              src="/assets/dashboard/assesment.svg"
              alt="progress"
              width={200}
              height={200}
              className="overflow-hidden"
            />
            <h2 className="text-[#191C1E] leading-1 font-medium text-[2rem]">Assessment Name</h2>
          </div>
          <div className="mt-[1rem] px-8">
            <p className="text-[#2E3130] md:text-[1.5rem] leading-1">
              Unlock your potential and level up your skills – take the assessment now!
            </p>
            {AssesMentData().map((item, index) => (
              <div className="flex items-center gap-[2rem] my-[1rem] px-3" key={index}>
                <Image src={item.img} alt={item.title} width={30} height={830} className="overflow-hidden" />
                <span className="text-[#444846] md:text-[1.2rem]">{item.title}</span>
              </div>
            ))}
          </div>
          <Button className="my-[3rem] mx-auto">Take assessment</Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;

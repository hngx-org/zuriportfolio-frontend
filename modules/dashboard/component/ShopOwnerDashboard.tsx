'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import {
  activityData,
  metricsCardData,
  metricsChartData,
  metricsChartMonths,
  metricsChartTimeline,
} from '../../../db/dashboard';
import { ActivityCardProps, MetricCardProps, MetricChartProps, MetricMonthsProps, MetricTimelineProps } from '../../../@types';


const MetricCard = ({ title, percentage, isCurrency, value }: MetricCardProps) => {
  return (
    <div className="shadow rounded-md px-5 py-3 space-y-3">
      <p className="flex items-center justify-between">
        <span className="text-xs md:text-sm text-[#737876]">{title}</span>
        <button className="mr-1">
          <Image src="/assets/images/more.png" width={16} height={16} alt={title} />
        </button>
      </p>
      <p className="flex items-center justify-between">
        <span className="text-2xl font-bold md:text-3xl">{`${isCurrency ? '$' : ''}${value}`}</span>
        <span
          className={`${
            percentage > 0 ? 'bg-[#E6F5EA] text-brand-green-primary' : 'bg-[#FFDCDC] text-[#FF2E2E]'
          } flex items-center rounded-full px-2 py-1 font-medium gap-1`}
        >
          <Image
            src={`/assets/images/arrow-${percentage > 0 ? 'up' : 'down'}.png`}
            width={16}
            height={16}
            alt={title}
          />
          <span className="flex items-center text-xs md:text-sm">{percentage}%</span>
        </span>
      </p>
    </div>
  );
};

const MetricChart = ({ title, src, isBarChart }: MetricChartProps) => {
  const [timeline, setTimeline] = useState({ active: false, index: 0 });
  return (
    <div className="shadow rounded-md px-5 py-5 space-y-1.5 md:space-y-3">
      <p className="flex items-center justify-between font-light">
        <span className="text-base md:text-lg">{title}</span>
        <button className="p-1.5 md:p-2 border border-[#E1E3E2] rounded-md text-sm md:text-base">View report</button>
      </p>
      <p className="space-x-2">
        {metricsChartTimeline.map((data, index) => {
          return (
            <MetricTimeline
              key={index}
              index={index}
              timespan={data.timespan}
              setTimeline={setTimeline}
              active={timeline.active === true && timeline.index === index}
            />
          );
        })}
      </p>
      <div className="h-[100px] md:h-[176px] relative flex flex-col justify-between">
        {Array(5)
          .fill(null)
          .map((_, index) => (
            <div key={index} className="h-1 border-b border-gray-100 border-opacity-10"></div>
          ))}
        <Image
          src={`/assets/images/${src}.png`}
          width={1000}
          height={250}
          alt={title}
          className={`${isBarChart && 'bottom-0'} absolute`}
        />
      </div>
      <p className="flex items-center justify-between px-3 lg:px-4 xl:px-5">
        {metricsChartMonths.map((data, index) => {
          return <MetricMonths key={index} month={data.month} />;
        })}
      </p>
    </div>
  );
};

const MetricTimeline = ({ timespan, index, active, setTimeline }: MetricTimelineProps) => {
  return (
    <button
      onClick={() => setTimeline({ active: true, index })}
      className={`${
        active ? 'bg-[#E6F5EA] text-brand-green-primary' : 'text-[#737876]'
      } p-1.5 md:p-2 rounded-md font-semibold text-sm md:text-base hover:text-brand-green-primary`}
    >
      {timespan}
    </button>
  );
};

const MetricMonths = ({ month }: MetricMonthsProps) => {
  return <span className="font-light text-xs md:text-sm">{month}</span>;
};

const ActivityCard = ({ name, item }: ActivityCardProps) => {
  return (
    <div className="text-sm md:text-base">
      <p className="font-semibold">{name}</p>
      <p className="text-[#737876] font-normal">
        Purchased <span className="text-[#F1AE67] font-medium">{item}</span>
      </p>
    </div>
  );
};

const ShopOwnerDashboard = () => {
  return (
    <div className="grid grid-cols-1 pb-[209px] gap-x-6 space-y-6 md:pb-[418px] md:grid-cols-4 md:space-y-0">
      {/* Main */}
      <div className="col-span-1 md:col-span-3 space-y-[24px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-[24px] md:gap-y-0 md:gap-x-[24px]">
          {metricsCardData.map((data, index) => (
            <MetricCard
              key={index}
              title={data.title}
              percentage={data.percentage}
              isCurrency={data.isCurrency}
              value={data.value}
            />
          ))}
        </div>
        {metricsChartData.map((data, index) => (
          <MetricChart key={index} title={data.title} src={data.src} isBarChart={data.isBarChart} />
        ))}
      </div>

      {/* Activity SideBar */}
      <div className="shadow rounded-md px-5 py-3 space-y-4">
        <p className="flex items-center justify-between font-medium">
          <span className="text-xl md:text-2xl">Activity</span>
          <span className="text-sm text-[#737876] md:text-base">View all</span>
        </p>
        {activityData.map((data, index) => (
          <ActivityCard key={index} name={data.name} item={data.item} />
        ))}
      </div>
    </div>
  );
};

export default ShopOwnerDashboard;

'use client';

import Image from 'next/image';
import { useState } from 'react';
import { MetricChartProps, MetricMonthsProps, MetricTimelineProps } from '../../../../@types';
import { metricsChartMonths, metricsChartTimeline } from '../../../../db/dashboard';

export const MetricChart = ({ title, src, isBarChart }: MetricChartProps) => {
  const [timeline, setTimeline] = useState({ active: true, index: 0 });
  return (
    <div className="shadow rounded-md px-5 py-5 space-y-1.5 md:space-y-3">
      <p className="flex items-center justify-between font-light">
        <span className="text-base md:text-lg">{title}</span>
        <button className="p-1.5 md:p-2 border border-brand-green-disabled rounded-md text-sm md:text-base">
          View report
        </button>
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
      <p className="flex items-center justify-between px-1 md:px-3 lg:px-4 xl:px-5">
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
        active ? 'bg-brand-green-30 text-brand-green-primary' : 'text-brand-white-650'
      } p-1.5 md:p-2 rounded-md font-semibold text-sm md:text-base hover:text-brand-green-primary`}
    >
      {timespan}
    </button>
  );
};

const MetricMonths = ({ month }: MetricMonthsProps) => {
  return <span className="font-light text-xs md:text-sm">{month}</span>;
};

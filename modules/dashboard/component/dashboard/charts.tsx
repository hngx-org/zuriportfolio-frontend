'use client';

import { useState } from 'react';
import { MetricChartProps, MetricTimelineProps } from '../../../../@types';
import { metricsChartTimeline, monthNames } from '../../../../db/dashboard';
import { BarChart, Bar, XAxis, CartesianGrid, LineChart, Line, ResponsiveContainer } from 'recharts';

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
      <ResponsiveContainer height={250}>
        {isBarChart ? (
          <BarChart
            width={800}
            height={250}
            data={salesReportData}
            margin={{
              top: 5,
              right: 20,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray="1 0" />
            <XAxis dataKey="month" />
            <Bar barSize={30} dataKey="income" fill="#CBEAD4" />
          </BarChart>
        ) : (
          <LineChart
            width={800}
            height={250}
            data={storeTrafficData}
            margin={{
              top: 5,
              right: 20,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray="1 0" />
            <XAxis dataKey="month" />
            <Line dot={false} type="monotone" dataKey="income1" stroke="#F1D5BA" strokeWidth={2.5} />
            <Line dot={false} type="monotone" dataKey="income2" stroke="#E1BD90" strokeWidth={2.5} />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

const MetricTimeline = ({ timespan, index, active, setTimeline }: MetricTimelineProps) => {
  return (
    <button
      onClick={() => setTimeline({ active: true, index })}
      className={`${
        active ? 'bg-green-30 text-brand-green-primary' : 'text-brand-white-650'
      } p-1.5 md:p-2 rounded-md font-semibold text-sm md:text-base hover:text-brand-green-primary`}
    >
      {timespan}
    </button>
  );
};

const salesReportData: { month: string; income: number }[] = [];

for (let i = 0; i < 12; i++) {
  const income: number = Math.floor(Math.random() * 1001) + 500;
  const month: string = monthNames[i];
  salesReportData.push({ month, income });
}
// console.log(salesReportData);

const storeTrafficData: { month: string; income1: number; income2: number }[] = [];

for (let i = 0; i < 12; i++) {
  const income1: number = Math.floor(Math.random() * 1001) + 500;
  const income2: number = Math.floor(Math.random() * 1001) + 500;
  const month: string = monthNames[i];

  storeTrafficData.push({ month, income1, income2 });
}

// console.log(storeTrafficData);

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { MetricChartProps, MetricTimelineProps } from '../../../../@types';
import {
  metricsChartTimeline,
  twelveMonths,
  threeMonths,
  thirtyDays,
  sevenDays,
  twentyFourHours,
} from '../../../../db/dashboard';
import { fetchSalesReports, fetchStoreTraffic } from '../../../../http/dashboard';
import Chart from './chart';

export const MetricChart = ({ title, src, isBarChart }: MetricChartProps) => {
  let data;
  const [timeline, setTimeline] = useState({ active: true, index: 0 });
  const [chartData, setChartData] = useState(twelveMonths);

  const {
    data: querySalesReportData,
    isFetched,
    isFetching,
  } = useQuery({
    queryFn: () => fetchSalesReports(),
    queryKey: ['sales-reports'],
    enabled: true,
  });
  // console.log(querySalesReportData);

  const { data: queryStoreTrafficData } = useQuery({
    queryFn: () => fetchStoreTraffic(),
    queryKey: ['store-traffic'],
    enabled: true,
  });
  // console.log(queryStoreTrafficData);

  const updateChartData = (index: number) => {
    switch (index) {
      case 0:
        setChartData(twelveMonths);
        break;
      case 1:
        setChartData(threeMonths);
        break;
      case 2:
        setChartData(thirtyDays);
        break;
      case 3:
        setChartData(sevenDays);
        break;
      case 4:
        setChartData(twentyFourHours);
        break;
      default:
        setChartData(twelveMonths);
        break;
    }
    setTimeline({ active: true, index });
  };

  const numBars = {
    0: 12,
    1: 3,
    2: 30,
    3: 7,
    4: 24,
  }[timeline.index];

  const numBarsAsNumber: number = numBars as number;

  const mockSalesReportData = Array.from({ length: numBarsAsNumber }, (_, i) => {
    const income: number = Math.floor(Math.random() * 1001) + 500;
    const timeline: string = chartData[i % chartData.length];
    return { timeline, income };
  });

  const mockStoreTrafficData = Array.from({ length: numBarsAsNumber }, (_, i) => {
    const income1: number = Math.floor(Math.random() * 1001) + 500;
    const income2: number = Math.floor(Math.random() * 1001) + 500;
    const timeline: string = chartData[i % chartData.length];
    return { timeline, income1, income2 };
  });

  if (isBarChart) {
    if (querySalesReportData?.timeline) {
      data = querySalesReportData;
    } else {
      data = mockSalesReportData;
    }
  } else {
    if (queryStoreTrafficData?.timeline) {
      data = queryStoreTrafficData;
    } else {
      data = mockStoreTrafficData;
    }
  }

  return (
    <div className="shadow rounded-md px-5 py-5 space-y-1.5 md:space-y-3">
      <p className="flex items-center justify-between font-light">
        <span className="text-base md:text-lg">{title}</span>
        {/* <button className="p-1.5 md:p-2 border border-brand-green-disabled rounded-md text-sm md:text-base">
          View report
        </button> */}
      </p>
      <p className="space-x-2">
        {metricsChartTimeline.map((data, index) => {
          return (
            <MetricTimeline
              key={index}
              index={index}
              timespan={data.timespan}
              setTimeline={() => updateChartData(index)}
              active={timeline.active === true && timeline.index === index}
            />
          );
        })}
      </p>
      <Chart isBarChart={isBarChart} data={data} isFetching={isFetching} isFetched={isFetched} />
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

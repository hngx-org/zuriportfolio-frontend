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
import { logQueryResult } from '../../../../helpers/dashboard';
import {
  fetch12MonthStoreTraffic,
  fetch24HourStoreTraffic,
  fetch30DayStoreTraffic,
  fetch3MonthStoreTraffic,
  fetch7DayStoreTraffic,
  fetchSalesReports,
  fetchStoreTraffic,
} from '../../../../http/dashboard';
import Chart from './chart';

export const MetricChart = ({ title, src, isBarChart }: MetricChartProps) => {
  let data;
  const [timeline, setTimeline] = useState({ active: true, index: 0 });
  const [chartData, setChartData] = useState(twelveMonths);

  // fetch sales report data
  const {
    data: querySalesReportData,
    isFetched,
    isFetching,
  } = useQuery({
    queryFn: () => fetchSalesReports(),
    queryKey: ['sales-reports'],
    enabled: true,
  });
  // logQueryResult('Query Sales Report', querySalesReportData);

  // fetch store traffic data
  const { data: query12MonthStoreTrafficData } = useQuery({
    queryFn: () => fetch12MonthStoreTraffic(),
    queryKey: ['store-traffic-12m'],
    enabled: true,
  });
  logQueryResult('Query Store Traffic 12m', query12MonthStoreTrafficData);

  const { data: query3MonthStoreTrafficData } = useQuery({
    queryFn: () => fetch3MonthStoreTraffic(),
    queryKey: ['store-traffic-3m'],
    enabled: true,
  });
  logQueryResult('Query Store Traffic 3m', query3MonthStoreTrafficData);

  const { data: query30DayStoreTrafficData } = useQuery({
    queryFn: () => fetch30DayStoreTraffic(),
    queryKey: ['store-traffic-30d'],
    enabled: true,
  });
  logQueryResult('Query Store Traffic 30d', query30DayStoreTrafficData);

  const { data: query7DayStoreTrafficData } = useQuery({
    queryFn: () => fetch7DayStoreTraffic(),
    queryKey: ['store-traffic-7d'],
    enabled: true,
  });
  logQueryResult('Query Store Traffic 7d', query7DayStoreTrafficData);

  const { data: query24HourStoreTrafficData } = useQuery({
    queryFn: () => fetch24HourStoreTraffic(),
    queryKey: ['store-traffic-24h'],
    enabled: true,
  });
  logQueryResult('Query Store Traffic 24h', query24HourStoreTrafficData);

  //  create mock sales and report data
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
    // update timeline
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
    const income: number = Math.floor(Math.random() * 1001) + 500;
    const timeline: string = chartData[i % chartData.length];
    return { timeline, income };
  });

  // if fetch is successful, use queried data, else use mock data
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

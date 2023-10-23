import { useQueries, useQuery, UseQueryResult } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { MetricChartProps, MetricTimelineProps } from '../../../../@types';
import { metricsChartTimeline, salesReportFrames, storeTrafficFrames } from '../../../../db/dashboard';
import { logQueryResult } from '../../../../helpers/dashboard';
import { fetchSalesReports, fetchShopID, fetchStoreTraffic } from '../../../../http/dashboard';
import Chart from './chart';

export const MetricChart = ({ title, src, isBarChart }: MetricChartProps) => {
  // fetch shop id
  const {
    data: shop_id,
    isFetching,
    isFetched,
  } = useQuery({
    queryFn: () => fetchShopID(),
    queryKey: ['shop-id'],
  });
  logQueryResult('shop-id', shop_id);

  // fetch sales report
  const salesReportQueryResults = useQueries({
    queries: salesReportFrames.map((frame) => ({
      queryKey: ['sales-report', frame],
      queryFn: () => fetchSalesReports(frame),
      staleTime: Infinity,
    })),
  });
  logQueryResult('sales-report', salesReportQueryResults);

  // fetch sales report
  const storeTrafficQueryResults = useQueries({
    queries: storeTrafficFrames.map((frame) => ({
      queryKey: ['store-traffic', frame],
      queryFn: () => fetchStoreTraffic(shop_id, frame),
      staleTime: Infinity,
    })),
  });
  logQueryResult('store-traffic', storeTrafficQueryResults);

  const query12MonthStoreTrafficData = storeTrafficQueryResults[0];
  const query3MonthStoreTrafficData = storeTrafficQueryResults[1];
  const query30DayStoreTrafficData = storeTrafficQueryResults[2];
  const query7DayStoreTrafficData = storeTrafficQueryResults[3];
  const query24HourStoreTrafficData = storeTrafficQueryResults[4];

  const query12MonthSalesReportData = salesReportQueryResults[0];
  const query3MonthSalesReportData = salesReportQueryResults[1];
  const query30DaySalesReportData = salesReportQueryResults[2];
  const query7DaySalesReportData = salesReportQueryResults[3];
  const query24HourSalesReportData = salesReportQueryResults[4];

  const [timeline, setTimeline] = useState({ active: true, index: 0 });
  const [trafficChartData, setTrafficChartData] = useState<UseQueryResult<any, unknown>>(query12MonthStoreTrafficData);
  const [salesChartData, setSalesChartData] = useState<UseQueryResult<any, unknown>>(query12MonthSalesReportData);

  let data = isBarChart ? trafficChartData : salesChartData;

  // logQueryResult('trafficChartData', trafficChartData);

  const updateChartData = (index: number) => {
    if (isBarChart) {
      switch (index) {
        case 0:
          setTrafficChartData(query12MonthStoreTrafficData);
          break;
        case 1:
          setTrafficChartData(query3MonthStoreTrafficData);
          break;
        case 2:
          setTrafficChartData(query30DayStoreTrafficData);
          break;
        case 3:
          setTrafficChartData(query7DayStoreTrafficData);
          break;
        case 4:
          setTrafficChartData(query24HourStoreTrafficData);
          break;
        default:
          setTrafficChartData(query12MonthStoreTrafficData);
          break;
      }
    } else {
      switch (index) {
        case 0:
          setSalesChartData(query12MonthSalesReportData);
          break;
        case 1:
          setSalesChartData(query3MonthSalesReportData);
          break;
        case 2:
          setSalesChartData(query30DaySalesReportData);
          break;
        case 3:
          setSalesChartData(query7DaySalesReportData);
          break;
        case 4:
          setSalesChartData(query24HourSalesReportData);
          break;
        default:
          setSalesChartData(query12MonthSalesReportData);
          break;
      }
    }
    // update timeline
    setTimeline({ active: true, index });
  };

  useEffect(() => {
    if (isBarChart) {
      setTrafficChartData(query12MonthStoreTrafficData);
    } else {
      setSalesChartData(query12MonthSalesReportData);
    }
  }, [isBarChart, query12MonthStoreTrafficData, query12MonthSalesReportData]);

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

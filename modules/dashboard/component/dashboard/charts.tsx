import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { MetricChartProps, MetricTimelineProps } from '../../../../@types';
import { metricsChartTimeline, nullSalesData } from '../../../../db/dashboard';
import { logQueryResult } from '../../../../helpers/dashboard';
import {
  fetch12MonthStoreTraffic,
  fetch24HourStoreTraffic,
  fetch30DayStoreTraffic,
  fetch3MonthStoreTraffic,
  fetch7DayStoreTraffic,
  fetchSalesReports,
  fetchShopID,
} from '../../../../http/dashboard';
import Chart from './chart';

export const MetricChart = ({ title, src, isBarChart }: MetricChartProps) => {
  // fetch shop id
  const { data: shop_id } = useQuery({
    queryFn: () => fetchShopID(),
    queryKey: ['shop-id'],
    enabled: true,
  });

  // fetch sales report data
  const { data: querySalesReportData } = useQuery({
    queryFn: () => fetchSalesReports(),
    queryKey: ['sales-reports'],
    enabled: true,
  });
  // logQueryResult('Query Sales Report', querySalesReportData);

  // fetch store traffic data
  const {
    data: query12MonthStoreTrafficData,
    isFetched,
    isFetching,
  } = useQuery({
    queryFn: () => fetch12MonthStoreTraffic(shop_id),
    queryKey: ['store-traffic-12m'],
    enabled: true,
  });
  // logQueryResult('Query Store Traffic 12m', query12MonthStoreTrafficData);

  const { data: query3MonthStoreTrafficData } = useQuery({
    queryFn: () => fetch3MonthStoreTraffic(shop_id),
    queryKey: ['store-traffic-3m'],
    enabled: true,
  });
  // logQueryResult('Query Store Traffic 3m', query3MonthStoreTrafficData);

  const { data: query30DayStoreTrafficData } = useQuery({
    queryFn: () => fetch30DayStoreTraffic(shop_id),
    queryKey: ['store-traffic-30d'],
    enabled: true,
  });
  // logQueryResult('Query Store Traffic 30d', query30DayStoreTrafficData);

  const { data: query7DayStoreTrafficData } = useQuery({
    queryFn: () => fetch7DayStoreTraffic(shop_id),
    queryKey: ['store-traffic-7d'],
    enabled: true,
  });
  // logQueryResult('Query Store Traffic 7d', query7DayStoreTrafficData);

  const { data: query24HourStoreTrafficData } = useQuery({
    queryFn: () => fetch24HourStoreTraffic(shop_id),
    queryKey: ['store-traffic-24h'],
    enabled: true,
  });
  // logQueryResult('Query Store Traffic 24h', query24HourStoreTrafficData);

  const [timeline, setTimeline] = useState({ active: true, index: 0 });
  const [trafficChartData, setTrafficChartData] = useState(query12MonthStoreTrafficData);
  const [salesChartData, setSalesChartData] = useState(querySalesReportData[0]);

  // Initialize data with the default value
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
          setSalesChartData(querySalesReportData[0]);
          break;
        case 1:
          setSalesChartData(querySalesReportData[1]);
          break;
        case 2:
          setSalesChartData(querySalesReportData[2]);
          break;
        case 3:
          setSalesChartData(querySalesReportData[3]);
          break;
        case 4:
          setSalesChartData(querySalesReportData[4]);
          break;
        default:
          setSalesChartData(querySalesReportData[0]);
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
      setSalesChartData(querySalesReportData[0]);
    }
  }, [isBarChart, query12MonthStoreTrafficData, querySalesReportData]);

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

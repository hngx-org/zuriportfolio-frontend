import { useQuery } from '@tanstack/react-query';
import Loader from '@ui/Loader';
import Image from 'next/image';
import { MetricCardProps } from '../../../../@types';
import { logQueryResult } from '../../../../helpers/dashboard';
import {
  fetchTodaysAverageOrderValue,
  fetchTodaysOrders,
  fetchTodaysRevenue,
  fetchYesterdaysAverageOrderValue,
  fetchYesterdaysOrders,
  fetchYesterdaysRevenue,
} from '../../../../http/dashboard';

export const MetricCard = ({ title, percentage, isCurrency, value }: MetricCardProps) => {
  let todaysFinalCardValue;
  let yesterdaysFinalCardValue;
  let finalPercentage = 0;

  const {
    data: queryTodaysAverageOrderValue,
    isFetched,
    isFetching,
  } = useQuery({
    queryFn: () => fetchTodaysAverageOrderValue(),
    queryKey: ['todays-average-order-value'],
    enabled: true,
  });
  // logQueryResult("Today's Average Order Value", queryTodaysAverageOrderValue);

  const { data: queryTodaysOrders } = useQuery({
    queryFn: () => fetchTodaysOrders(),
    queryKey: ['todays-orders'],
    enabled: true,
  });
  // logQueryResult("Today's Orders", queryTodaysOrders);

  const { data: queryTodaysRevenue } = useQuery({
    queryFn: () => fetchTodaysRevenue(),
    queryKey: ['todays-revenue'],
    enabled: true,
  });
  // logQueryResult("Today's Revenue", queryTodaysRevenue);

  const { data: queryYesterdaysAverageOrderValue } = useQuery({
    queryFn: () => fetchYesterdaysAverageOrderValue(),
    queryKey: ['yesterdays-average-order-value'],
    enabled: true,
  });
  // logQueryResult("Yesterday's Average Order Value", queryYesterdaysAverageOrderValue);

  const { data: queryYesterdaysOrders } = useQuery({
    queryFn: () => fetchYesterdaysOrders(),
    queryKey: ['yesterdays-orders'],
    enabled: true,
  });
  // logQueryResult("Yesterday's Orders", queryYesterdaysOrders);

  const { data: queryYesterdaysRevenue } = useQuery({
    queryFn: () => fetchYesterdaysRevenue(),
    queryKey: ['yesterdays-revenue'],
    enabled: true,
  });
  // logQueryResult("Yesterday's Revenue", queryYesterdaysRevenue);

  if (title === 'Average order value') {
    todaysFinalCardValue = queryTodaysAverageOrderValue;
    yesterdaysFinalCardValue = queryYesterdaysAverageOrderValue;
  } else if (title === "Today's orders") {
    todaysFinalCardValue = queryTodaysOrders;
    yesterdaysFinalCardValue = queryYesterdaysOrders;
  } else if (title === "Today's revenue") {
    todaysFinalCardValue = queryTodaysRevenue;
    yesterdaysFinalCardValue = queryYesterdaysRevenue;
  }

  if (todaysFinalCardValue === undefined || todaysFinalCardValue === null) {
    todaysFinalCardValue = 0;
  }
  if (yesterdaysFinalCardValue === undefined || yesterdaysFinalCardValue === null) {
    yesterdaysFinalCardValue = 0;
  }
  if (yesterdaysFinalCardValue !== undefined && yesterdaysFinalCardValue !== null && yesterdaysFinalCardValue !== 0) {
    finalPercentage = ((todaysFinalCardValue - yesterdaysFinalCardValue) / yesterdaysFinalCardValue) * 100;
  }

  return (
    <div className="shadow rounded-md px-5 py-3 space-y-3">
      <p className="flex items-center justify-between">
        <span className="text-xs md:text-sm text-brand-white-650">{title}</span>
      </p>
      {isFetching && (
        <div className="p-2 font-medium">
          <Loader />
        </div>
      )}
      {!isFetching && isFetched && (
        <p className="flex items-center justify-between">
          <span className="text-2xl font-bold md:text-3xl">{`${isCurrency ? '$' : ''}${todaysFinalCardValue}`}</span>
          <span
            className={`${
              finalPercentage > 0 ? 'bg-green-30 text-brand-green-primary' : 'bg-pink-120 text-brand-red-primary'
            } flex items-center rounded-full px-2 py-1 font-medium gap-1`}
          >
            <Image
              src={`/assets/images/arrow-${finalPercentage > 0 ? 'up' : 'down'}.png`}
              width={16}
              height={16}
              alt={title}
            />
            <span className="flex items-center text-xs md:text-sm">{finalPercentage}%</span>
          </span>
        </p>
      )}
    </div>
  );
};

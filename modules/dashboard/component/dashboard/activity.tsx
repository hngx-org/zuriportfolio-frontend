import { useQuery } from '@tanstack/react-query';
import Loader from '@ui/Loader';
import Link from 'next/link';
import React from 'react';
import { ActivityCardProps, DashboardActivity, ExtendedDashboardActivity } from '../../../../@types';
import { fetchActivity } from '../../../../http/dashboard';

//  {
//   id: "57f0925e-86c1-4af9-826a-54f0f43e4f65",
//   action: "ORDER PLACED",
//   user_id: "a87be40d-8632-4c45-9b44-c893560d58c9",
//   title: "order placed by user A",
//   description: "A user from your store placed an order",
//   createdAt: "2023-10-22T03:26:01.583Z"
// }

export const Activity: React.FC<{ isPage: boolean }> = ({ isPage }) => {
  const {
    data: queryActivity,
    isFetched,
    isFetching,
  } = useQuery({
    queryFn: () => fetchActivity(),
    queryKey: ['activity'],
    enabled: true,
  });

  const isDisplayedDataEmpty: boolean = queryActivity?.length === 0;

  const displayedData: DashboardActivity[] =
    isPage && !isDisplayedDataEmpty
      ? queryActivity
      : queryActivity?.slice(queryActivity.length - 10, queryActivity.length);

  return (
    <div className={isPage ? 'pb-[50px]' : ''}>
      <div className={`${isPage ? '' : 'space-y-4 shadow rounded-md p-5'} font-manropeL`}>
        <p className="flex items-center justify-between font-medium">
          <span className={isPage ? 'text-2xl md:text-3xl font-bold' : 'text-xl md:text-2xl'}>Activity</span>
          {!isPage && !isDisplayedDataEmpty && (
            <Link href="/dashboard/activity" className="text-sm text-brand-white-650 md:text-base">
              View all
            </Link>
          )}
        </p>
        {isFetching && (
          <div className="bg-white-100 grid place-items-center z-50 inset-0 min-h-[300px]">
            <Loader />
          </div>
        )}
        {!isFetching && isFetched && (
          <div className={`${isPage ? 'grid grid-cols-1 lg:grid-cols-2 gap-4 mt-2' : 'space-y-4'}`}>
            {!isDisplayedDataEmpty ? (
              displayedData?.map((data, index) => (
                <ActivityCard key={index} action={data?.action} title={data?.title} isPage={isPage} />
              ))
            ) : (
              <p className="text-brand-white-650 font-normal">No activity to display</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const ActivityCard = ({ action, title, isPage }: ExtendedDashboardActivity) => {
  return (
    <div className={`${isPage ? 'shadow rounded-md p-5 md:flex gap-1 text-base md:text-lg' : 'text-sm md:text-base'}`}>
      {/* <p className="font-semibold">{name}</p> */}
      <p className="text-brand-white-650 font-normal">
        {action}: <span className="text-orange-110 font-semibold capitalize">{title}</span>
      </p>
    </div>
  );
};

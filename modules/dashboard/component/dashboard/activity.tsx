import { useQuery } from '@tanstack/react-query';
import Loader from '@ui/Loader';
import Link from 'next/link';
import React from 'react';
import { ActivityCardProps } from '../../../../@types';
import { activityData } from '../../../../db/dashboard';
import { fetchActivity } from '../../../../http/dashboard';

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

  // const displayedData = isPage ? queryActivity : queryActivity.slice(queryActivity.length - 10, queryActivity.length);

  const displayedData: any[] = [];

  return (
    <div className={isPage ? 'pb-[50px]' : ''}>
      <div className={`${isPage ? '' : 'space-y-4 shadow rounded-md p-5'} font-manropeL`}>
        <p className="flex items-center justify-between font-medium">
          <span className={isPage ? 'text-2xl md:text-3xl font-bold' : 'text-xl md:text-2xl'}>Activity</span>
          {!isPage && displayedData.length > 0 && (
            <Link href="/dashboard/activity" className="text-sm text-brand-white-650 md:text-base">
              View all
            </Link>
          )}
        </p>
        <div className={`${isPage ? 'grid grid-cols-1 lg:grid-cols-2 gap-4 mt-2' : 'space-y-4'}`}>
          {/* {displayedData ? (
            displayedData?.map((data, index) => (
              <ActivityCard key={index} name={data?.name} item={data?.item} isPage={isPage} />
            ))
          ) : ( */}
          <p className="text-brand-white-650 font-normal">No activity to display</p>
          {/* )} */}
        </div>
        {isFetching ? (
          <div className="bg-white-100 grid place-items-center z-50 inset-0 min-h-[300px]">
            <Loader />
          </div>
        ) : (
          <div className={`${isPage ? 'grid grid-cols-1 lg:grid-cols-2 gap-4 mt-2' : 'space-y-4'}`}>
            {displayedData ? (
              displayedData?.map((data, index) => (
                <ActivityCard key={index} name={data?.name} item={data?.item} isPage={isPage} />
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

const ActivityCard = ({ name, item, isPage }: ActivityCardProps) => {
  return (
    <div className={`${isPage ? 'shadow rounded-md p-5 md:flex gap-1 text-base md:text-lg' : 'text-sm md:text-base'}`}>
      <p className="font-semibold">{name}</p>
      <p className="text-brand-white-650 font-normal">
        Purchased <span className="text-orange-110 font-semibold">{item}</span>
      </p>
    </div>
  );
};

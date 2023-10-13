import Link from 'next/link';
import React from 'react';
import { ActivityCardProps } from '../../../../@types';
import { activityData } from '../../../../db/dashboard';

export const Activity: React.FC<{ isPage: boolean }> = ({ isPage }) => {
  const displayedData = isPage ? activityData : activityData.slice(0, 10);

  return (
    <div className={isPage ? 'pb-[50px]' : ''}>
      <div className={`${isPage ? '' : 'space-y-4 shadow rounded-md p-5'} font-manropeL`}>
        <p className="flex items-center justify-between font-medium">
          <span className={isPage ? 'text-2xl md:text-3xl font-bold' : 'text-xl md:text-2xl'}>Activity</span>
          {!isPage && (
            <Link href="/dashboard/activity" className="text-sm text-brand-white-650 md:text-base">
              View all
            </Link>
          )}
        </p>
        <div className={`${isPage ? 'grid grid-cols-1 lg:grid-cols-2 gap-4 mt-2' : 'space-y-4'}`}>
          {displayedData.map((data, index) => (
            <ActivityCard key={index} name={data.name} item={data.item} isPage={isPage} />
          ))}
        </div>
      </div>
    </div>
  );
};

const ActivityCard = ({ name, item, isPage }: ActivityCardProps) => {
  return (
    <div className={`${isPage ? 'shadow rounded-md p-5 flex gap-1 text-base md:text-lg' : 'text-sm md:text-base'}`}>
      <p className="font-semibold">{name}</p>
      <p className="text-brand-white-650 font-normal">
        Purchased <span className="text-orange-110 font-semibold">{item}</span>
      </p>
    </div>
  );
};

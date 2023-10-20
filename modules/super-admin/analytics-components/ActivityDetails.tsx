import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { activity } from '../../../@types';

interface ActivityDetailsProps {
  token: string;
}

const fetchActivityDetails = async (token: string) => {
  const response = await fetch(
    'https://team-mirage-super-amind2.onrender.com/api/superadmin/analytics/activities/',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch data. Status: ${response.status}`);
  }

  const data = await response.json();
  return data.data.slice(0, 11);
};

const ActivityDetails: React.FC<ActivityDetailsProps> = ({ token }) => {
  const { data: activityDetails, isLoading, isError } = useQuery<activity[]>(
    ['activityDetails', token],
    () => fetchActivityDetails(token)
  );

  return (
    <section className="lg:w-[25%]">
      <div
        className={`${
          isLoading
            ? 'py-[22px] px-5 whitespace-nowrap text-ellipsis overflow-hidden lg:bg-white-100 lg:border lg:border-white-200 lg:rounded-lg mx-auto'
            : 'py-[60px] px-5 whitespace-nowrap text-ellipsis overflow-hidden lg:bg-white-100 lg:border lg:border-white-200 lg:rounded-lg mx-auto'
        }`}
      >
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-[19px]">Activities</h3>
        </div>
        <div className="space-y-5 md:space-y-[15.5px] max-w-[200px]">
          {isLoading
            ? Array.from({ length: 10 }, (_, index) => (
                <div key={index}>
                  <div className="h-4 w-2/3 bg-green-300 bg-opacity-10 mb-[22px] animate-pulse" />
                  <div className="h-4 w-1/2 bg-black bg-opacity-10 animate-pulse" />
                </div>
              ))
            : isError
            ? 'Error fetching data. Please try again.'
            : Array.isArray(activityDetails) &&
              activityDetails.map((item, index) => (
                <div key={index}>
                  <h3 className="text-custom-color15 text-[16px]">
                    {item.user_details.first_name} {item.user_details.last_name}
                  </h3>
                  <div className="flex gap-1.5">
                    <p className="text-custom-color22 font-light text-[15px]">{item.action}</p>
                    <span className="text-orange-110 text-[15px] text-ellipsis">{item.title}</span>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default ActivityDetails;

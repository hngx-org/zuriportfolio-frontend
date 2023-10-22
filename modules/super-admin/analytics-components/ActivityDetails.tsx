import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { activity, ActivityDetailsProps } from '../../../@types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const fetchActivityDetails = async (token: string) => {
  const response = await fetch(
    'https://staging.zuri.team/api/v1/super-admin/analytics/activities/',
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
  return data.data.slice(0, 10);
};

const ActivityDetails: React.FC<ActivityDetailsProps> = ({ token }) => {
  const {
    data: activityDetails,
    isLoading,
    isError,
  } = useQuery<activity[]>(
    ['activityDetails', token],
    () => fetchActivityDetails(token),
    {
      onError: (error) => {
        console.error('Error fetching data:', error);
        if (!toast.isActive('activityError')) {
          toast.error('Could not load activity details. Try again!', { toastId: 'activityError' });
        }
      },
    }
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
      <ToastContainer />
    </section>
  );
};

export default ActivityDetails;

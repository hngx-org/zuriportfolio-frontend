import React, { useState, useEffect } from 'react';
import { activity } from '../../../@types';

interface ActivityDetailsProps {
  token: string;
}

const ActivityDetails: React.FC<ActivityDetailsProps> = ({ token }) => {
  const [activityDetails, setActivityDetails] = useState<activity[]>([]);
  const [loadingState, setLoadingState] = useState<boolean>(true); // Set initial loading state to true
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://team-mirage-super-amind2.onrender.com/api/superadmin/analytics/activities/',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }

        const res = await response.json();

        const limitedData = res.data.slice(0, 11);
        setActivityDetails(limitedData);
      } catch (error) {
        setError('Error fetching data. Please try again.');
      } finally {
        setLoadingState(false); 
      }
    };

    fetchData();
  }, [token]);

  return (
    <section className="lg:w-[25%]">
      <div className={`${loadingState ? "py-[22px] px-5 whitespace-nowrap text-ellipsis overflow-hidden bg-white-100 border border-white-200 rounded-lg  mx-auto" : "py-[60px] px-5 whitespace-nowrap text-ellipsis overflow-hidden bg-white-100 border border-white-200 rounded-lg  mx-auto"}`}>
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-[19px]">Activities</h3>
        </div>
        <div className="space-y-5 md:space-y-[15.5px] max-w-[200px]">
          {loadingState ? (
            Array.from({ length: 10 }, (_, index) => (
              <div key={index}>
                <div className="h-4 w-2/3 bg-green-300 bg-opacity-10 mb-[22px] animate-pulse" />
                <div className="h-4 w-1/2 bg-black bg-opacity-10  animate-pulse" />
              </div>
            ))
          ) : (
            Array.isArray(activityDetails) &&
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
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default ActivityDetails;

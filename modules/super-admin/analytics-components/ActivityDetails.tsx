import React, { useState, useEffect } from 'react';
import { activity } from '../../../@types';

interface ActivityDetailsProps {
  token: string;
}



const ActivityDetails: React.FC<ActivityDetailsProps> = ({ token }) => {
  const [activityDetails, setActivityDetails] = useState<activity[]>([]);
  const [loadingState, setLoadingState] = useState<boolean>(false); // Corrected: Specify the type as boolean
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingState(true); // Corrected: Invoking setLoadingState as a function
      try {
        const response = await fetch('https://team-mirage-super-amind2.onrender.com/api/superadmin/analytics/activities/', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }

        const res = await response.json();

        const limitedData = res.data.slice(0, 11);
        console.log(limitedData);
        setActivityDetails(limitedData);
      } catch (error) {
        setError('Error fetching data. Please try again.');
      } finally {
        setLoadingState(false); // Corrected: Set loading state to false in the finally block
      }
    };

    fetchData();
  }, [token]);

  return (
    <section className="lg:w-[25%]">
      <div className="py-[40px] px-5 whitespace-nowrap text-ellipsis overflow-hidden bg-white-100 lg:border-white-200 lg:border lg:rounded-lg xl:px-10 xl:max-w-[1270px]">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-[19px]">Activities</h3>
        </div>
        <div className="space-y-5 md:space-y-[15.5px] max-w-[200px]">
          {loadingState ? (
            <div className="h-[39rem] w-full bg-black bg-opacity-20 shadow-lg mx-auto rounded-md animate-pulse" />
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

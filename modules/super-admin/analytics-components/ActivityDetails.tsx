import React, { useState, useEffect } from 'react';

type activity = {
  name: string;
  user_details: {
    first_name: string;
    last_name: string;
  };
  action: string;
  title: string;
  purchased: string;
  pItem: string;
  id: number;
};

const ActivityDetails = () => {
  const [activityDetails, setActivityDetails] = useState<activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://team-mirage-super-amind2.onrender.com/api/superadmin/analytics/activities/'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }

        const res= await response.json();
        
        const limitedData = res.data.slice(0, 11)

        setActivityDetails(limitedData);
        setLoading(false);
      } catch (error) {
        setError('Error fetching data. Please try again.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log(activityDetails)
 

  return (
    <section className="lg:w-[25%]">
      <div className="py-[50px] px-5 whitespace-nowrap bg-white-100 lg:border-white-200 lg:border lg:rounded-lg xl:px-10 xl:max-w-[1270px]">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-[19px]">Activity</h3>
          <p className="text-custom-color15 text-[15px]">View All</p>
        </div>
        <div className="space-y-5 md:space-y-[15.5px]">
          {Array.isArray(activityDetails) &&
            activityDetails.map((item) => (
              <div key={item.id}>
                <h3 className="text-custom-color15 text-[16px]">
                  {item.user_details.first_name} {item.user_details.last_name}
                </h3>
                <div className="flex gap-1.5">
                  <p className="text-custom-color22 font-light text-[15px]">{item.action}</p>
                  <span className="text-orange-110 text-[15px]">{item.title}</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default ActivityDetails;

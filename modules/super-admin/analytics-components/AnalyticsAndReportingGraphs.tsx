
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type Graph = {
  id: number;
  title: string;
  btn: string;
  calender: {
    twelveM: string;
    threeM: string;
    thirtyD: string;
    sevenD: string;
    twentyFourH: string;
    md: boolean;
  };
};

type activity = {
  name: string;
  purchased: string;
  pItem: string;
  id: number;
};

const AnalyticsAndReportingGraphs = () => {
const [isGraph, setIsGraph] = useState (false)

useEffect(() => {
  if (window.innerWidth > 768) {
    setIsGraph(true);
  }
}, []);


  const graphDetails: Graph[] = [
    {
      id: 1,
      title: 'Sales report',
      btn: 'View report',
      calender: {
        twelveM: '12 mon',
        threeM: '3 mon',
        thirtyD: '30 days',
        sevenD: '7 days',
        twentyFourH: '24 hrs',
        md: true,
      },
     
    },
    {
      id: 2,
      title: 'Sales',
      btn: 'View report',
      calender: {
        twelveM: '12 mon',
        threeM: '3 mon',
        thirtyD: '30 days',
        sevenD: '7 days',
        twentyFourH: '24 hrs',
        md: true,
      },
    },
  ];

  const activityDetails: activity[] = [
    {
      name: 'Demi Wikinson',
      purchased: 'Purchased',
      pItem: 'Webflow101',
      id: 1,
    },
    {
      name: 'John Doe',
      purchased: 'Purchased',
      pItem: 'ProductX',
      id: 2,
    },
    {
      name: 'Jane Smith',
      purchased: 'Purchased',
      pItem: 'ServiceY',
      id: 3,
    },
    {
      name: 'Bob Johnson',
      purchased: 'Purchased',
      pItem: 'ProductZ',
      id: 4,
    },
    {
      name: 'Alice Brown',
      purchased: 'Purchased',
      pItem: 'ServiceA',
      id: 5,
    },
    {
      name: 'Charlie Davis',
      purchased: 'Purchased',
      pItem: 'ProductB',
      id: 6,
    },
    {
      name: 'Eva White',
      purchased: 'Purchased',
      pItem: 'ServiceC',
      id: 7,
    },
    {
      name: 'Frank Miller',
      purchased: 'Purchased',
      pItem: 'ProductD',
      id: 8,
    },
    {
      name: 'Grace Wilson',
      purchased: 'Purchased',
      pItem: 'ServiceE',
      id: 9,
    },
    {
      name: 'Grace Wilson',
      purchased: 'Purchased',
      pItem: 'ServiceE',
      id: 10,
    },
    {
      name: 'Grace Wilson',
      purchased: 'Purchased',
      pItem: 'ServiceE',
      id: 11,
    },
  ];

  const chartData = [
    { name: 'January', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'February', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'March', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'April', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'June', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'July', uv: 3490, pv: 4300, amt: 2100 },
    { name: 'August', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'September', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'October', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'November', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'December', uv: 1890, pv: 4800, amt: 2181 },
  ];

  return (
    <>
      <section className="my-10 mx-auto px-6 font-sans gap-2 space-y-6  md:max-w-[1270px] md:space-y-0 lg:flex lg:justify-between lg:items-center lg:max-w-[1100px] xl:max-w-[1270px] ">
        <div className="space-y-6 md:space-y-0  md:flex-grow">
          {graphDetails.map((item, index) => (
            <div key={item.id} className="mb-8 lg:w-[98%]">
              <div className=" shadow-sm rounded-sm border border-white-200 bg-white-100">
                <div className="flex justify-between items-center px-6 mt-5 text-[#2E3130]">
                  <h3 className="text-[18px] font-light">{item.title}</h3>
                  <button className="font-light rounded-lg border border-white-100 py-2.5 px-4 text-[15px] md:bg-brand-green-primary md:text-white-100 md:border-0">
                    {item.btn}
                  </button>
                </div>
                <div className="flex justify-center items-center font-light text-[#8D9290] px-6 mt-8 md:justify-between">
                  <div className="flex justify-center items-center text-center  gap-3 text-[13px] sm:text-[15px] md:gap-5">
                    <p className="rounded-md bg-green-300 bg-opacity-20 py-1.5 px-2 text-green-900">
                      {isGraph ? '12 months' : item.calender.twelveM }
                    </p>
                    <p>{isGraph ? '3 months' : item.calender.threeM }</p>
                    <p>{item.calender.thirtyD}</p>
                    <p>{item.calender.sevenD}</p>
                    <p>{isGraph ? '24 hours' : item.calender.twentyFourH}</p>
                  </div>
                  {index === 1 && (
                    <div className="hidden md:flex gap-3 text-[15px]">
                      <p>Sales</p>
                      <p>Order</p>
                      <p>Users</p>
                    </div>
                  )}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} className=''>
                  <ResponsiveContainer height={230} className="mx-auto mt-8 0 ">
                    <LineChart data={chartData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                      <Tooltip   />
                      <Legend />
                      <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          ))}
        </div>
        <section className="lg:w-[25%]">
          <div className="py-7 px-6 sm:px-10 lg:shadow-sm bg-white-100 lg:border-white-200 lg:border lg:rounded-lg xl:max-w-[1270px]">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-[19px]">Activity</h3>
              <p className="text-[#5B5F5E] text-[15px]">View All</p>
            </div>
            <div className="space-y-5 md:space-y-[15.5px]">
              {activityDetails.map((item) => (
                <div key={item.id}>
                  <h3 className="text-[#5B5F5E] text-[17px]">{item.name}</h3>
                  <div className="flex gap-2">
                    <p className="text-[#737876] font-light">{item.purchased}</p>
                    <span className="text-[#F1AE67]">{item.pItem}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default AnalyticsAndReportingGraphs;

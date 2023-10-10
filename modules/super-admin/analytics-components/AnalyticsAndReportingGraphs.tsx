import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, ReferenceLine, ResponsiveContainer } from 'recharts';
import { Graph, activity } from '../../../@types';
import Link from 'next/link';

const AnalyticsAndReportingGraphs = () => {
  const [isGraph, setIsGraph] = useState(false);

  useEffect(() => {
    const updateIsGraph = () => {
      setIsGraph(window.innerWidth > 768);
    };

    updateIsGraph(); // Initial check
    window.addEventListener('resize', updateIsGraph);

    return () => {
      window.removeEventListener('resize', updateIsGraph);
    };
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
      pItem: 'Webflow 101',
      id: 1,
    },
    {
      name: 'John Doe',
      purchased: 'Purchased',
      pItem: 'Figma Course',
      id: 2,
    },
    {
      name: 'Jane Smith',
      purchased: 'Purchased',
      pItem: 'Webflow 101',
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
      pItem: 'Webflow 101',
      id: 5,
    },
    {
      name: 'Charlie Davis',
      purchased: 'Purchased',
      pItem: 'Website Template',
      id: 6,
    },
    {
      name: 'Eva White',
      purchased: 'Purchased',
      pItem: 'SEO Masterclass',
      id: 7,
    },
    {
      name: 'Frank Miller',
      purchased: 'Purchased',
      pItem: 'Webflow 101',
      id: 8,
    },
    {
      name: 'Grace Wilson',
      purchased: 'Purchased',
      pItem: 'Webflow 101',
      id: 9,
    },
    {
      name: 'Grace Wilson',
      purchased: 'Purchased',
      pItem: 'Webflow 101',
      id: 10,
    },
    {
      name: 'Grace Wilson',
      purchased: 'Purchased',
      pItem: 'Webflow 101',
      id: 11,
    },
  ];

  const barChartData = [
    { name: 'Jan', value: 500 },
    { name: 'Feb', value: 700 },
    { name: 'Mar', value: 400 },
    { name: 'Apr', value: 900 },
    { name: 'May', value: 600 },
    { name: 'Jun', value: 1200 },
    { name: 'Jul', value: 950 },
    { name: 'Aug', value: 550 },
    { name: 'Sep', value: 450 },
    { name: 'Oct', value: 300 },
    { name: 'Nov', value: 400 },
    { name: 'Dec', value: 600 },
  ];

  const snakeLineData = [
    { name: 'Jan', uv: 4000, pv: 2400 },
    { name: 'Feb', uv: 6000, pv: 2000 },
    { name: 'Mar', uv: 7000, pv: 4800 },
    { name: 'Apr', uv: 5800, pv: 5398 },
    { name: 'May', uv: 3000, pv: 4508 },
    { name: 'Jun', uv: 2840, pv: 1398 },
    { name: 'Jul', uv: 5100, pv: 3298 },
    { name: 'Aug', uv: 3700, pv: 5398 },
    { name: 'Sep', uv: 4200, pv: 4398 },
    { name: 'Oct', uv: 1700, pv: 4398 },
    { name: 'Nov', uv: 4060, pv: 2398 },
    { name: 'Dec', uv: 3060, pv: 3398 },
  ];
  const reportRoute = "/super-admin/analytics-and-reporting/reports";
  
  return (
    <>
      <section className="my-10 mx-auto px-6 font-manropeL gap-2 space-y-6  md:max-w-[1270px] md:space-y-0 lg:flex lg:justify-between lg:items-center lg:max-w-[1100px] xl:max-w-[1270px] 2xl:max-w-[1520px] ">
        <div className="space-y-6 md:space-y-0  md:flex-grow">
          {graphDetails.map((item, index) => (
            <div key={item.id} className="mb-8 lg:w-[98%]">
              <div className="  rounded-sm border border-white-200 bg-white-100">
                <div className="flex justify-between items-center px-6 mt-5 text-custom-color15">
                  <h3 className="text-[18px] font-light">{item.title}</h3>
                  <Link href={reportRoute}>
                  <button className="font-light rounded-lg border border-white-300 py-2.5 px-4  text-[14px] md:bg-brand-green-primary md:text-[15px] md:text-white-100 md:border-0">
                    {item.btn}
                  </button>
                  </Link>
                </div>
                <div className="flex justify-center items-center whitespace-nowrap font-light text-custom-color27 px-6 mt-8 md:justify-between">
                  <div className="flex justify-center items-center text-center  gap-3 text-[13px] sm:text-[15px] md:gap-5">
                    <p className="rounded-md bg-[#E6F5EA] py-1.5 px-2 text-brand-green-focused">
                      {isGraph ? '12 months' : item.calender.twelveM}
                    </p>
                    <p>{isGraph ? '3 months' : item.calender.threeM}</p>
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
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} className="">
                  <ResponsiveContainer height={230} className="mx-auto mt-8 ">
                    {index === 0 ? (
                      <LineChart data={snakeLineData}>
                        <XAxis dataKey="name" />
                        <ReferenceLine y={1000} stroke="#F2F4F7" />
                        <ReferenceLine y={3200} stroke="#F2F4F7" />
                        <ReferenceLine y={5200} stroke="#F2F4F7" />
                        <ReferenceLine y={7200} stroke="#F2F4F7" />
                        <ReferenceLine y={9200} stroke="#F2F4F7" />
                        <Line type="natural" dataKey="uv" stroke="#EABE95" strokeWidth={3} dot={false} />
                        <Line type="natural" dataKey="pv" stroke="#D7A068" strokeWidth={3} dot={false} />
                      </LineChart>
                    ) : (
                      <BarChart data={barChartData}>
                        <XAxis dataKey="name" />
                        <ReferenceLine y={300} stroke="#F2F4F7" />
                        <ReferenceLine y={600} stroke="#F2F4F7" />
                        <ReferenceLine y={900} stroke="#F2F4F7" />
                        <ReferenceLine y={1200} stroke="#F2F4F7" />
                        <Bar dataKey="value" fill="#CAEAD4" barSize={35} />
                      </BarChart>
                    )}
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          ))}
        </div>
        <section className="lg:w-[25%]">
          <div className="py-11 px-5  whitespace-nowrap  bg-white-100 lg:border-white-200 lg:border lg:rounded-lg xl:px-10 xl:max-w-[1270px]">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-[19px]">Activity</h3>
              <p className="text-custom-color15 text-[15px]">View All</p>
            </div>
            <div className="space-y-5 md:space-y-[15.5px]">
              {activityDetails.map((item) => (
                <div key={item.id}>
                  <h3 className="text-custom-color15 text-[16px]">{item.name}</h3>
                  <div className="flex gap-1.5">
                    <p className="text-custom-color22 font-light text-[15px]">{item.purchased}</p>
                    <span className="text-orange-110 text-[15px]">{item.pItem}</span>
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

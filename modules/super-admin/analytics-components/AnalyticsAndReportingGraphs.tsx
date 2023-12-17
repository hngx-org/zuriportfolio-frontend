import React, { useState, useEffect, useMemo } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, ReferenceLine, ResponsiveContainer, Tooltip } from 'recharts';
import Link from 'next/link';
import Image from 'next/image';
import ActivityDetails from './ActivityDetails';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const fetchData = async (url: any) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    toast.error('Internal Server Error');
    throw error;
  }
};

const getTokenFromLocalStorage = () => {
  const tokenFromLocalStorage = localStorage.getItem('zpt') as string;
  return tokenFromLocalStorage;
};

const AnalyticsAndReportingGraphs = () => {
  const [isGraph, setIsGraph] = useState(false);
  const [graphData, setGraphData] = useState<any[][]>([]);
  const [loadingStates, setLoadingStates] = useState<{ [key: number]: boolean }>({
    0: false,
    1: false,
  });
  const [activePeriodGraph1, setActivePeriodGraph1] = useState('12months');
  const [activePeriodGraph2, setActivePeriodGraph2] = useState('12months');
  const bearerToken = useMemo(() => getTokenFromLocalStorage(), []);

  useEffect(() => {
    const fetchDataForGraph = async (period: any, graphIndex: number) => {
      setLoadingStates((prevLoadingStates) => ({
        ...prevLoadingStates,
        [graphIndex]: true,
      }));

      try {
        if (bearerToken) {
          const url = `https://team-mirage-super-amind2.onrender.com/api/v1/super-admin/analytics/total-sales-orders-users/?last=${period}`;
          const response = await fetch(url, {
            headers: {
              Authorization: `Bearer ${bearerToken}`,
            },
          });

          if (!response.ok) {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
          }

          const data = await response.json();

          const combineInfo = (entry: any) => {
            if (period === '12months' || period === '3months') {
              return entry.month;
            } else if (period === '30days') {
              return entry.date_range;
            } else if (period === '7days' || period === '24hours') {
              return entry.day_of_week;
            }
          };

          const newData = data.sales_graph.map((salesEntry: any) => {
            const ordersEntry = data.orders_graph.find((o: any) => o.month === salesEntry.month);
            const usersEntry = data.users_graph.find((u: any) => u.month === salesEntry.month);

            const monthData = {
              month: combineInfo(salesEntry),
              sales: salesEntry.sales,
              orders: ordersEntry ? ordersEntry.orders : 0,
              users: usersEntry ? usersEntry.users : 0,
              combinedInfo: combineInfo(salesEntry),
            };

            return monthData;
          });

          setGraphData((prevData: any[][]) => {
            const updatedData: any[][] = [...prevData];
            updatedData[graphIndex] = newData;
            return updatedData;
          });
        }
      } catch (error) {
        console.error('Error fetching data for period:', error);
        if (!toast.isActive('error')) {
          toast.error('Server error, graph details unavailable!', { toastId: 'error' });
        }
      } finally {
        setLoadingStates((prevLoadingStates) => ({
          ...prevLoadingStates,
          [graphIndex]: false,
        }));
      }
    };

    fetchDataForGraph(activePeriodGraph1, 0);
    fetchDataForGraph(activePeriodGraph2, 1);
  }, [activePeriodGraph1, activePeriodGraph2, bearerToken]);

  useEffect(() => {
    const updateIsGraph = () => {
      setIsGraph(window.innerWidth > 768);
    };
    updateIsGraph();

    window.addEventListener('resize', updateIsGraph);

    return () => {
      window.removeEventListener('resize', updateIsGraph);
    };
  }, []);

  const handlePeriodChange = (period: any, graphIndex: number) => {
    setLoadingStates((prevLoadingStates) => ({
      ...prevLoadingStates,
      [graphIndex]: true,
    }));

    if (graphIndex === 0) {
      setActivePeriodGraph1(period);
    } else if (graphIndex === 1) {
      setActivePeriodGraph2(period);
    }

    const otherGraphIndex = graphIndex === 0 ? 1 : 0;
    setLoadingStates((prevLoadingStates) => ({
      ...prevLoadingStates,
      [otherGraphIndex]: false,
    }));
  };

  const graphDetails = [
    {
      id: 1,
      title: 'Sales Trend',
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

  const calendarButtons = [
    { label: '12 months', period: '12 mon', value: '12months' },
    { label: '3 months', period: '3 mon', value: '3months' },
    { label: '30 days', period: '30 days', value: '30days' },
    { label: '7 days', period: '7 days', value: '7days' },
    { label: '24 hours', period: '24 hrs', value: '24hours' },
  ];

  return (
    <>
      <section className="my-10 mx-auto px-6 font-manropeL gap-2 space-y-6 md:max-w-[1270px] md:space-y-0 lg:flex lg:justify-between lg:items-center lg:max-w-[1100px] xl:max-w-[1270px] 2xl:max-w-[1520px] ">
        <div className="space-y-6 md:space-y-0 md:flex-grow">
          {graphDetails.map((item, index) => (
            <div key={item.id} className="mb-8 lg:w-[98%]">
              <div className="rounded-sm border border-white-200 bg-white-100 relative">
                <div className="flex justify-between items-center px-6 mt-5 text-custom-color15">
                  <h3 className="text-[18px] font-light">{item.title}</h3>
                  <Link href="/super-admin/analytics-and-reporting/reports">
                    <button
                      className={`${
                        index === 0
                          ? 'font-light rounded-lg border border-white-300 py-2.5 px-4  text-[14px] md:bg-brand-green-primary md:text-[15px] md:text-white-100 md:border-0'
                          : 'rounded-lg border-0 border-opacity-0 py-2.5 px-4 opacity-0 cursor-default'
                      }`}
                    >
                      {item.btn}
                    </button>
                  </Link>
                </div>
                <div className="flex justify-center items-center whitespace-nowrap font-light text-custom-color27 px-6 mt-6 md:justify-between">
                  <div className="flex justify-center items-center text-center gap-3 text-[13px] sm:text-[15px] md:gap-5">
                    {calendarButtons.map(({ label, period, value }) => (
                      <button
                        key={period}
                        onClick={() => {
                          handlePeriodChange(value, index);
                        }}
                        className={`${
                          (index === 0 && activePeriodGraph1 === value) || (index === 1 && activePeriodGraph2 === value)
                            ? 'selected rounded-md bg-[#E6F5EA] py-1.5 px-2 text-brand-green-focused'
                            : ''
                        }`}
                      >
                        {isGraph ? label : isGraph && period === '12 mon' ? '12 months' : period}
                      </button>
                    ))}
                  </div>

                  {index === 1 && (
                    <div className="hidden md:flex gap-3 text-[15px]">
                      <div className="flex items-center gap-1.5">
                        <Image
                          src="/assets/tsImages/sales.svg"
                          alt="sales indicator"
                          width={8}
                          height={8}
                          className="object-contain"
                        />
                        <p>Sales</p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Image
                          src="/assets/tsImages/orders.svg"
                          alt="order indicator"
                          width={8}
                          height={8}
                          className="object-contain"
                        />
                        <p>Order</p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Image
                          src="/assets/tsImages/users.svg"
                          alt="users indicator"
                          width={8}
                          height={8}
                          className="object-contain"
                        />
                        <p>Users</p>
                      </div>
                    </div>
                  )}
                </div>
                <div style={{ position: 'relative' }} className="mt-6">
                  {index === 0 ? (
                    <ResponsiveContainer height={230} width="95%" className="mx-auto text-[14px]">
                      {loadingStates[0] ? (
                        <div className="h-[13rem] w-full bg-black bg-opacity-10 shadow-lg mx-auto rounded-md animate-pulse" />
                      ) : (
                        <LineChart data={graphData[0]}>
                          <XAxis dataKey="combinedInfo" height={60} width={80} />
                          <Tooltip />
                          <YAxis />
                          <ReferenceLine y={100} stroke="#F2F4F7" />
                          <ReferenceLine y={75} stroke="#F2F4F7" />
                          <ReferenceLine y={50} stroke="#F2F4F7" />
                          <ReferenceLine y={25} stroke="#F2F4F7" />
                          <Line type="natural" dataKey="sales" stroke="#EABE95" strokeWidth={3} />
                        </LineChart>
                      )}
                    </ResponsiveContainer>
                  ) : (
                    <ResponsiveContainer height={230} width="95%" className="mx-auto text-[14px]">
                      {loadingStates[1] ? (
                        <div className="h-[13rem] w-full bg-black bg-opacity-10 shadow-lg mx-auto rounded-md animate-pulse" />
                      ) : (
                        <BarChart data={graphData[1]}>
                          <XAxis dataKey="combinedInfo" height={60} width={80} />
                          <Tooltip />
                          <ReferenceLine y={300} stroke="#F2F4F7" />
                          <ReferenceLine y={600} stroke="#F2F4F7" />
                          <ReferenceLine y={900} stroke="#F2F4F7" />
                          <ReferenceLine y={1200} stroke="#F2F4F7" />
                          <Bar dataKey="sales" fill="#F1AE67" barSize={10} />
                          <Bar dataKey="orders" fill="#06C270" barSize={10} />
                          <Bar dataKey="users" fill="#A46A26" barSize={10} />
                        </BarChart>
                      )}
                    </ResponsiveContainer>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <ToastContainer />
        <ActivityDetails token={bearerToken} />
      </section>
    </>
  );
};

export default AnalyticsAndReportingGraphs;

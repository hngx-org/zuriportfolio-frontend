import React, { useState, useEffect, useCallback } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, ReferenceLine, ResponsiveContainer } from 'recharts';
import { Graph} from '../../../@types';
import Link from 'next/link';
import Image from 'next/image';
import ActivityDetails from './ActivityDetails';

interface MonthlyData {
  name: string;
  sales: number;
  orders: number;
  users: number;
}
type PeriodType = '12 mon' | '3 mon' | '30 days' | '7 days' | '24 hrs';
const calendarMonths = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const AnalyticsAndReportingGraphs = () => {
  const [isGraph, setIsGraph] = useState(false);
  const [selectedPeriodGraph1, setSelectedPeriodGraph1] = useState<PeriodType>('12 mon');
  const [selectedPeriodGraph2, setSelectedPeriodGraph2] = useState<PeriodType>('12 mon');
  const [salesDataGraph1, setSalesDataGraph1] = useState<MonthlyData[]>([]);
  const [salesDataGraph2, setSalesDataGraph2] = useState<MonthlyData[]>([]);

  const fetchSalesData = useCallback(async (period: string, graphIndex: number) => {
    try {
      const response = await fetch(
        `https://team-mirage-super-amind2.onrender.com/api/superadmin/analytics/total-sales-orders-users?last=${period}`
      );

      if (!response.ok) {
        console.error(`Error fetching sales data for graph ${graphIndex}. Status: ${response.status}`);
        console.error('Response:', await response.text());
        return;
      }

      const apiResponse = await response.json();
      const { status, message, sales, orders, users } = apiResponse;

      // Calculate the number of months based on the selected period
      const numMonths = getNumMonths(period);

      // Get the index of the current month in calendarMonths
      const currentMonthIndex = new Date().getMonth();

      // Calculate the starting index for the data based on the current month
      const startIndex = currentMonthIndex - numMonths + 1;
      const adjustedStartIndex = startIndex < 0 ? calendarMonths.length + startIndex : startIndex;

      // Filter the data based on the selected period
      const filteredData = Array.from({ length: numMonths }, (_, i) => {
        const monthIndex = (adjustedStartIndex + i) % calendarMonths.length;
        const month = calendarMonths[monthIndex];
      
        return {
          name: month,
          sales: sales || 0,
          orders: orders || 0,
          users: users || 0,
        };
      });
      
      // Sort the data array by the index of each month in calendarMonths
      const sortedData = filteredData.sort((a, b) => {
        return calendarMonths.indexOf(a.name) - calendarMonths.indexOf(b.name);
      });
      
      if (graphIndex === 1) {
        setSalesDataGraph1(sortedData);
      } else if (graphIndex === 2) {
        setSalesDataGraph2(sortedData);
      }
    } catch (error) {
      console.error(`Error fetching sales data for graph ${graphIndex}`, error);
    }
  }, []);

  // Helper function to get the number of months based on the selected period
  const getNumMonths = (period: string) => {
    switch (period) {
      case '12 mon':
        return 12;
      case '3 mon':
        return 3;
      case '30 days':
        return 1;
      case '7 days':
        return 1; // Change this if you want a different behavior for '7 days'
      case '24 hrs':
        return 1; // Change this if you want a different behavior for '24 hrs'
      default:
        return 12; // Default to 12 months
    }
  };

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

  
  const calendarButtons = [
    { label: '12 months', value: '12 mon' },
    { label: '3 months', value: '3 mon' },
    { label: '30 days', value: '30 days' },
    { label: '7 days', value: '7 days' },
    { label: '24 hours', value: '24 hrs' },
  ];

  const handlePeriodClick = (period: string, graphIndex: number) => {
    console.log('Clicked on period:', period, 'for graph index:', graphIndex);
    if (graphIndex === 0) {
      setSelectedPeriodGraph1(period as PeriodType);
      fetchSalesData(period, 1);
    } else if (graphIndex === 1) {
      setSelectedPeriodGraph2(period as PeriodType);
      fetchSalesData(period, 2);
    }
  };

  useEffect(() => {
    const updateIsGraph = () => {
      setIsGraph(window.innerWidth > 768);
    };

    updateIsGraph();
    window.addEventListener('resize', updateIsGraph);

    fetchSalesData(selectedPeriodGraph1, 1);
    fetchSalesData(selectedPeriodGraph2, 2);

    return () => {
      window.removeEventListener('resize', updateIsGraph);
    };
  }, [selectedPeriodGraph1, selectedPeriodGraph2, fetchSalesData]);


  const reportRoute = '/super-admin/analytics-and-reporting/reports';

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
                <div className="flex justify-center items-center whitespace-nowrap font-light text-custom-color27 px-6 mt-6 md:justify-between">
                  <div className="flex justify-center items-center text-center  gap-3 text-[13px] sm:text-[15px] md:gap-5">
                    {calendarButtons.map(({ label, value }) => (
                      <button
                        key={value}
                        onClick={() => { console.log('Button clicked:', value); handlePeriodClick(value, index) }}
                        className={`${
                          (index === 0 && selectedPeriodGraph1 === value) ||
                          (index === 1 && selectedPeriodGraph2 === value)
                            ? 'selected rounded-md bg-[#E6F5EA] py-1.5 px-2 text-brand-green-focused'
                            : ''
                        }`}
                      >
                        {isGraph ? label : isGraph && value === '12 mon' ? '12 months' : value}
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
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} className=" mt-6">
                  {index === 0 ? (
                    <ResponsiveContainer height={230} className="mx-auto mt-6 ">
                      <LineChart data={salesDataGraph1}>
                        <XAxis dataKey="name" axisLine={false}/>
                        <ReferenceLine y={1000} stroke="#F2F4F7" />
                        <ReferenceLine y={3200} stroke="#F2F4F7" />
                        <ReferenceLine y={5200} stroke="#F2F4F7" />
                        <ReferenceLine y={7200} stroke="#F2F4F7" />
                        <ReferenceLine y={9200} stroke="#F2F4F7" />
                        <Line type="natural" dataKey="sales" stroke="#EABE95" strokeWidth={3} dot={false} />
                        <Line type="natural" dataKey="orders" stroke="#D7A068" strokeWidth={3} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <ResponsiveContainer height={230} className={`mx-auto mt-4`}>
                      {isGraph ? (
                        <BarChart data={salesDataGraph2}>
                          <XAxis dataKey="name" axisLine={false} />
                          <ReferenceLine y={1800} stroke="#F2F4F7" />
                          <ReferenceLine y={3600} stroke="#F2F4F7" />
                          <ReferenceLine y={7200} stroke="#F2F4F7" />
                          <Bar dataKey="sales" fill="#F1AE67" barSize={10} />
                          <Bar dataKey="orders" fill="#06C270" barSize={10} />
                          <Bar dataKey="users" fill="#A46A26" barSize={10} />
                        </BarChart>
                      ) : (
                        <BarChart data={salesDataGraph2}>
                          <XAxis dataKey="name" />
                          <ReferenceLine y={300} stroke="#F2F4F7" />
                          <ReferenceLine y={600} stroke="#F2F4F7" />
                          <ReferenceLine y={900} stroke="#F2F4F7" />
                          <Bar dataKey="sales" fill="#CAEAD4" barSize={35} />
                        </BarChart>
                      )}
                    </ResponsiveContainer>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <ActivityDetails />
      </section>
    </>
  );
};

export default AnalyticsAndReportingGraphs;

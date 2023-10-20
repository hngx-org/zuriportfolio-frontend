import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import { FaMinusSquare, FaPlusSquare } from 'react-icons/fa';

type ApiEndpoint = {
  endpoint: string;
  status: string;
};

type ApiData = {
  Assessments: ApiEndpoint[];
  'TAKE ASSESSMENTS': ApiEndpoint[];
};

const ApiStatusPage = () => {
  const [isAssessmentsDropdownOpen, setIsAssessmentsDropdownOpen] = useState(false);
  const [isTakeAssessmentsDropdownOpen, setIsTakeAssessmentsDropdownOpen] = useState(false);
  const [assessmentsData, setAssessmentsData] = useState<ApiEndpoint[]>([]); // Initialize with an empty array
  const [takeAssessmentsData, setTakeAssessmentsData] = useState<ApiEndpoint[]>([]); // Initialize with an empty array

  useEffect(() => {
    const fetchApiData = async () => {
      try {
        const response = await fetch('https://spitfire-superadmin-1.onrender.com/api/admin/health/', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        });
        if (response.status === 200) {
          const data: ApiData = await response.json();

          // Check if the 'Assessments' and 'TAKE ASSESSMENTS' properties exist
          if (data && data.Assessments && data['TAKE ASSESSMENTS']) {
            setAssessmentsData(data.Assessments);
            setTakeAssessmentsData(data['TAKE ASSESSMENTS']);
          }
        } else {
          console.error('API returned an error status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching API data:', error);
      }
    };

    // Fetch data when the component mounts
    fetchApiData();
  }, []);

  const toggleAssessmentsDropdown = () => {
    setIsAssessmentsDropdownOpen(!isAssessmentsDropdownOpen);
  };

  const toggleTakeAssessmentsDropdown = () => {
    setIsTakeAssessmentsDropdownOpen(!isTakeAssessmentsDropdownOpen);
  };

  return (
    <>
      <div className="w-full max-sm:x-4 md:px-4 lg:px-0 font-manropeL lg:max-w-[1240px] mx-auto mb-5">
        <div className="w-full bg-custom-color17">
          <Image
            src={'/assets/apiStatus/zuri work.png'}
            alt="zuri work"
            layout="responsive"
            width={1200}
            height={1080}
          />
        </div>
        <div className="w-full max-sm:px-4 md:px-0 lg:px-0">
          <div className="py-10">
            <h1 className="text-3xl max-sm:text-xl mb-[11px] font-manropeB">About This Site</h1>
            <p className="text-sm max-sm:text-sm text-gray-100">
              This is Zuri&apos;s status page, where you can get updates on how our systems are doing. If there are
              interruptions to service, we will post a note here.
            </p>
          </div>
          <table className="my-6 w-full table-auto">
            <thead className="border border-1 border-gray-100">
              <tr className="flex justify-between content-center max-sm:text-sm p-4">
                <th>Zuri-Portfolio</th>
                <th>
                  {assessmentsData.some((assessment) => assessment.status === 'inactive') ? (
                    <span className="text-red-200">Major Outage</span>
                  ) : (
                    <span className="text-green-500">Operational</span>
                  )}
                </th>
              </tr>
            </thead>
            <tbody className="border border-1 border-gray-100">
              <tr className="flex justify-between content-center max-sm:text-sm p-4">
                <td className="flex items-center gap-2" onClick={toggleAssessmentsDropdown}>
                  {isAssessmentsDropdownOpen ? (
                    <FaMinusSquare style={{ color: '#b8b7b7' }} />
                  ) : (
                    <FaPlusSquare style={{ color: '#b8b7b7' }} />
                  )}{' '}
                  Zuri Assessments
                </td>
                {!isAssessmentsDropdownOpen && (
                  <td className=" ">
                    {assessmentsData.some((assessment) => assessment.status === 'inactive') ? (
                      <span className="text-red-200">Major Outage</span>
                    ) : (
                      <span className="text-green-500">Operational</span>
                    )}
                  </td>
                )}
              </tr>
              {isAssessmentsDropdownOpen && (
                <tr className="flex justify-between content-center max-sm:text-sm py-2 pl-10 pr-3">
                  <td className="col-span-2 w-full">
                    <ul className="">
                      {assessmentsData.map((assessment, index) => (
                        <li className="flex items-center justify-between max-sm:text-xs p-1" key={index}>
                          <span className=" truncate md:max-w-[500px] max-sm:max-w-[210px] lg:max-w-full">
                            {assessment.endpoint}
                          </span>
                          <span className="">
                            {assessment.status === 'active' ? (
                              <span className="text-green-500">Operational</span>
                            ) : (
                              <span className="text-red-200">Major Outage</span>
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              )}
            </tbody>
            <tbody className="border border-1 border-gray-100">
              <tr className="flex justify-between content-center max-sm:text-sm p-4">
                <td className="flex items-center gap-2" onClick={toggleTakeAssessmentsDropdown}>
                  {isTakeAssessmentsDropdownOpen ? (
                    <FaMinusSquare style={{ color: '#b8b7b7' }} />
                  ) : (
                    <FaPlusSquare style={{ color: '#b8b7b7' }} />
                  )}{' '}
                  Zuri Take Assessments
                </td>
                {!isTakeAssessmentsDropdownOpen && (
                  <td className=" ">
                    {assessmentsData.some((assessment) => assessment.status === 'inactive') ? (
                      <span className="text-red-200">Major Outage</span>
                    ) : (
                      <span className="text-green-500">Operational</span>
                    )}
                  </td>
                )}
              </tr>
              {isTakeAssessmentsDropdownOpen && (
                <tr className="flex justify-between content-center max-sm:text-sm py-2 pl-10 pr-3">
                  <td className="col-span-2 w-full">
                    <ul className="">
                      {takeAssessmentsData.map((assessment, index) => (
                        <li className="flex items-center justify-between p-1 max-sm:text-xs" key={index}>
                          <span className="truncate md:max-w-[500px] max-sm:max-w-[210px] lg:max-w-full">
                            {assessment.endpoint}
                          </span>
                          <span>
                            {assessment.status === 'active' ? (
                              <span className="text-green-500">Operational</span>
                            ) : (
                              <span className="text-red-200">Major Outage</span>
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="w-full bg-custom-color17">
          <Image
            src={'/assets/apiStatus/zuri work.png'}
            alt="zuri work"
            layout="responsive"
            width={1200}
            height={1080}
          />
        </div>
      </div>
    </>
  );
};

export default ApiStatusPage;

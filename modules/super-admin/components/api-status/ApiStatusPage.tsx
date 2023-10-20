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
  Authentication: ApiEndpoint[];
  'SUPERADMIN 1': ApiEndpoint[];
  REVIEWS: ApiEndpoint[];
  SHOP: ApiEndpoint[];
  'Market Place': ApiEndpoint[];
  'Cart Checkout': ApiEndpoint[];
  'MESSAGING/ EMAIL': ApiEndpoint[];
  BADGES: ApiEndpoint[];
};

const ApiStatusPage = () => {
  const [isAssessmentsDropdownOpen, setIsAssessmentsDropdownOpen] = useState(false);
  const [isTakeAssessmentsDropdownOpen, setIsTakeAssessmentsDropdownOpen] = useState(false);
  const [assessmentsData, setAssessmentsData] = useState<ApiEndpoint[]>([]); // Initialize with an empty array
  const [takeAssessmentsData, setTakeAssessmentsData] = useState<ApiEndpoint[]>([]); // Initialize with an empty array

  const [isAuthenticationDropdownOpen, setIsAuthenticationDropdownOpen] = useState(false);
  const [authenticationData, setAuthenticationData] = useState<ApiEndpoint[]>([]); // Initialize with an empty array
  // Initialize with an empty array

  const [isSuperAdmin1DropdownOpen, setIsSuperAdmin1DropdownOpen] = useState(false);
  const [superAdmin1Data, setSuperAdmin1Data] = useState<ApiEndpoint[]>([]);

  const [isReviewsDropdownOpen, setIsReviewsDropdownOpen] = useState(false);
  const [reviewsData, setReviewsData] = useState<ApiEndpoint[]>([]);

  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const [shopData, setShopData] = useState<ApiEndpoint[]>([]);

  const [isMarketPlaceDropdownOpen, setIsMarketPlaceDropdownOpen] = useState(false);
  const [marketPlaceData, setMarketPlaceData] = useState<ApiEndpoint[]>([]);

  const [isCartCheckoutDropdownOpen, setIsCartCheckoutDropdownOpen] = useState(false);
  const [cartCheckoutData, setCartCheckoutData] = useState<ApiEndpoint[]>([]);

  const [isMessageDropdownOpen, setIsMessageDropdownOpen] = useState(false);
  const [messageData, setMessageData] = useState<ApiEndpoint[]>([]);

  const [isBadgesDropdownOpen, setIsBadgesDropdownOpen] = useState(false);
  const [badgesData, setBadgesData] = useState<ApiEndpoint[]>([]);

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
            setAuthenticationData(data.Authentication);
            setTakeAssessmentsData(data['TAKE ASSESSMENTS']);
            setSuperAdmin1Data(data['SUPERADMIN 1']);
            setReviewsData(data['REVIEWS']);
            setShopData(data['SHOP']);
            setMarketPlaceData(data['Market Place']);
            setCartCheckoutData(data['Cart Checkout']);
            setMessageData(data['MESSAGING/ EMAIL']);
            setBadgesData(data['BADGES']);
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

  const toggleAuthenticationDropdown = () => {
    setIsAuthenticationDropdownOpen(!isAuthenticationDropdownOpen);
  };

  const toggleSuperAdmin1Dropdown = () => {
    setIsSuperAdmin1DropdownOpen(!isSuperAdmin1DropdownOpen);
  };

  const toggleReviewsDropdown = () => {
    setIsReviewsDropdownOpen(!isReviewsDropdownOpen);
  };

  const toggleShopDropdown = () => {
    setIsShopDropdownOpen(!isShopDropdownOpen);
  };

  const toggleMarketPlaceDropdown = () => {
    setIsMarketPlaceDropdownOpen(!isMarketPlaceDropdownOpen);
  };

  const toggleCartCheckoutDropdown = () => {
    setIsCartCheckoutDropdownOpen(!isCartCheckoutDropdownOpen);
  };

  const toggleMessageDropdown = () => {
    setIsMessageDropdownOpen(!isMessageDropdownOpen);
  };

  const toggleBadgesDropdown = () => {
    setIsBadgesDropdownOpen(!isBadgesDropdownOpen);
  };

  return (
    <>
      <div className="container px-5 md:px-0 lg:px-0 font-manropeL mx-auto mb-5">
        <div className="w-full bg-custom-color17">
          <Image
            src={'/assets/apiStatus/zuri work.png'}
            alt="zuri work"
            layout="responsive"
            width={1200}
            height={1080}
          />
        </div>
        <div className="w-full">
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
                <th>Zuri-Website</th>
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
                    {takeAssessmentsData.every((assessment) => assessment.status === 'active') ? (
                      <span className="text-green-500">Operational</span>
                    ) : (
                      <span className="text-red-200">Major Outage</span>
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
            <tbody className="border border-1 border-gray-100">
              <tr className="flex justify-between content-center max-sm:text-sm p-4">
                <td className="flex items-center gap-2" onClick={toggleAuthenticationDropdown}>
                  {isAuthenticationDropdownOpen ? (
                    <FaMinusSquare style={{ color: '#b8b7b7' }} />
                  ) : (
                    <FaPlusSquare style={{ color: '#b8b7b7' }} />
                  )}{' '}
                  Zuri Authentication
                </td>
                {!isAuthenticationDropdownOpen && (
                  <td className=" ">
                    {authenticationData.some((assessment) => assessment.status === 'inactive') ? (
                      <span className="text-red-200">Major Outage</span>
                    ) : (
                      <span className="text-green-500">Operational</span>
                    )}
                  </td>
                )}
              </tr>
              {isAuthenticationDropdownOpen && (
                <tr className="flex justify-between content-center max-sm:text-sm py-2 pl-10 pr-3">
                  <td className="col-span-2 w-full">
                    <ul className="">
                      {authenticationData.map((assessment, index) => (
                        <li className="flex items-center justify-between p-1 max-sm:text-xs" key={index}>
                          <span className="truncate md:max-w-[500px] max-sm:max-w-[210px] lg:max-w-[600px]">
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
            <tbody className="border border-1 border-gray-100">
              <tr className="flex justify-between content-center max-sm:text-sm p-4">
                <td className="flex items-center gap-2" onClick={toggleSuperAdmin1Dropdown}>
                  {isSuperAdmin1DropdownOpen ? (
                    <FaMinusSquare style={{ color: '#b8b7b7' }} />
                  ) : (
                    <FaPlusSquare style={{ color: '#b8b7b7' }} />
                  )}{' '}
                  Zuri Super Admin 1
                </td>
                {!isSuperAdmin1DropdownOpen && (
                  <td className=" ">
                    {superAdmin1Data.some((assessment) => assessment.status === 'inactive') ? (
                      <span className="text-red-200">Major Outage</span>
                    ) : (
                      <span className="text-green-500">Operational</span>
                    )}
                  </td>
                )}
              </tr>
              {isSuperAdmin1DropdownOpen && (
                <tr className="flex justify-between content-center max-sm:text-sm py-2 pl-10 pr-3">
                  <td className="col-span-2 w-full">
                    <ul className="">
                      {superAdmin1Data.map((assessment, index) => (
                        <li className="flex items-center justify-between p-1 max-sm:text-xs" key={index}>
                          <span className="truncate md:max-w-[500px] max-sm:max-w-[210px] lg:max-w-[600px]">
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
            <tbody className="border border-1 border-gray-100">
              <tr className="flex justify-between content-center max-sm:text-sm p-4">
                <td className="flex items-center gap-2" onClick={toggleReviewsDropdown}>
                  {isReviewsDropdownOpen ? (
                    <FaMinusSquare style={{ color: '#b8b7b7' }} />
                  ) : (
                    <FaPlusSquare style={{ color: '#b8b7b7' }} />
                  )}{' '}
                  Zuri Reviews
                </td>
                {!isReviewsDropdownOpen && (
                  <td className=" ">
                    {reviewsData.some((assessment) => assessment.status === 'inactive') ? (
                      <span className="text-red-200">Major Outage</span>
                    ) : (
                      <span className="text-green-500">Operational</span>
                    )}
                  </td>
                )}
              </tr>
              {isReviewsDropdownOpen && (
                <tr className="flex justify-between content-center max-sm:text-sm py-2 pl-10 pr-3">
                  <td className="col-span-2 w-full">
                    <ul className="">
                      {reviewsData.map((assessment, index) => (
                        <li className="flex items-center justify-between p-1 max-sm:text-xs" key={index}>
                          <span className="truncate md:max-w-[500px] max-sm:max-w-[210px] lg:max-w-[600px]">
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
            <tbody className="border border-1 border-gray-100">
              <tr className="flex justify-between content-center max-sm:text-sm p-4">
                <td className="flex items-center gap-2" onClick={toggleShopDropdown}>
                  {isShopDropdownOpen ? (
                    <FaMinusSquare style={{ color: '#b8b7b7' }} />
                  ) : (
                    <FaPlusSquare style={{ color: '#b8b7b7' }} />
                  )}{' '}
                  Zuri Shop
                </td>
                {!isShopDropdownOpen && (
                  <td className=" ">
                    {shopData.some((assessment) => assessment.status === 'inactive') ? (
                      <span className="text-red-200">Major Outage</span>
                    ) : (
                      <span className="text-green-500">Operational</span>
                    )}
                  </td>
                )}
              </tr>
              {isShopDropdownOpen && (
                <tr className="flex justify-between content-center max-sm:text-sm py-2 pl-10 pr-3">
                  <td className="col-span-2 w-full">
                    <ul className="">
                      {shopData.map((assessment, index) => (
                        <li className="flex items-center justify-between p-1 max-sm:text-xs" key={index}>
                          <span className="truncate md:max-w-[500px] max-sm:max-w-[210px] lg:max-w-[600px]">
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
            <tbody className="border border-1 border-gray-100">
              <tr className="flex justify-between content-center max-sm:text-sm p-4">
                <td className="flex items-center gap-2" onClick={toggleMarketPlaceDropdown}>
                  {isMarketPlaceDropdownOpen ? (
                    <FaMinusSquare style={{ color: '#b8b7b7' }} />
                  ) : (
                    <FaPlusSquare style={{ color: '#b8b7b7' }} />
                  )}{' '}
                  Zuri Market Place
                </td>
                {!isMarketPlaceDropdownOpen && (
                  <td className=" ">
                    {marketPlaceData.every((assessment) => assessment.status === 'active') ? (
                      <span className="text-green-500">Operational</span>
                    ) : (
                      <span className="text-red-200">Major Outage</span>
                    )}
                  </td>
                )}
              </tr>
              {isMarketPlaceDropdownOpen && (
                <tr className="flex justify-between content-center max-sm:text-sm py-2 pl-10 pr-3">
                  <td className="col-span-2 w-full">
                    <ul className="">
                      {marketPlaceData.map((assessment, index) => (
                        <li className="flex items-center justify-between p-1 max-sm:text-xs" key={index}>
                          <span className="truncate md:max-w-[500px] max-sm:max-w-[210px] lg:max-w-[600px]">
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
            <tbody className="border border-1 border-gray-100">
              <tr className="flex justify-between content-center max-sm:text-sm p-4">
                <td className="flex items-center gap-2" onClick={toggleCartCheckoutDropdown}>
                  {isCartCheckoutDropdownOpen ? (
                    <FaMinusSquare style={{ color: '#b8b7b7' }} />
                  ) : (
                    <FaPlusSquare style={{ color: '#b8b7b7' }} />
                  )}{' '}
                  Zuri Cart & Checkout
                </td>
                {!isCartCheckoutDropdownOpen && (
                  <td className=" ">
                    {cartCheckoutData.every((assessment) => assessment.status === 'active') ? (
                      <span className="text-green-500">Operational</span>
                    ) : (
                      <span className="text-red-200">Major Outage</span>
                    )}
                  </td>
                )}
              </tr>
              {isCartCheckoutDropdownOpen && (
                <tr className="flex justify-between content-center max-sm:text-sm py-2 pl-10 pr-3">
                  <td className="col-span-2 w-full">
                    <ul className="">
                      {cartCheckoutData.map((assessment, index) => (
                        <li className="flex items-center justify-between p-1 max-sm:text-xs" key={index}>
                          <span className="truncate md:max-w-[500px] max-sm:max-w-[210px] lg:max-w-[600px]">
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
            <tbody className="border border-1 border-gray-100">
              <tr className="flex justify-between content-center max-sm:text-sm p-4">
                <td className="flex items-center gap-2" onClick={toggleMessageDropdown}>
                  {isMessageDropdownOpen ? (
                    <FaMinusSquare style={{ color: '#b8b7b7' }} />
                  ) : (
                    <FaPlusSquare style={{ color: '#b8b7b7' }} />
                  )}{' '}
                  Zuri Message & Emails
                </td>
                {!isMessageDropdownOpen && (
                  <td className=" ">
                    {messageData.every((assessment) => assessment.status === 'active') ? (
                      <span className="text-green-500">Operational</span>
                    ) : (
                      <span className="text-red-200">Major Outage</span>
                    )}
                  </td>
                )}
              </tr>
              {isMessageDropdownOpen && (
                <tr className="flex justify-between content-center max-sm:text-sm py-2 pl-10 pr-3">
                  <td className="col-span-2 w-full">
                    <ul className="">
                      {messageData.map((assessment, index) => (
                        <li className="flex items-center justify-between p-1 max-sm:text-xs" key={index}>
                          <span className="truncate md:max-w-[500px] max-sm:max-w-[210px] lg:max-w-[600px]">
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
            <tbody className="border border-1 border-gray-100">
              <tr className="flex justify-between content-center max-sm:text-sm p-4">
                <td className="flex items-center gap-2" onClick={toggleBadgesDropdown}>
                  {isBadgesDropdownOpen ? (
                    <FaMinusSquare style={{ color: '#b8b7b7' }} />
                  ) : (
                    <FaPlusSquare style={{ color: '#b8b7b7' }} />
                  )}{' '}
                  Zuri Badges
                </td>
                {!isBadgesDropdownOpen && (
                  <td className=" ">
                    {badgesData.every((assessment) => assessment.status === 'active') ? (
                      <span className="text-green-500">Operational</span>
                    ) : (
                      <span className="text-red-200">Major Outage</span>
                    )}
                  </td>
                )}
              </tr>
              {isBadgesDropdownOpen && (
                <tr className="flex justify-between content-center max-sm:text-sm py-2 pl-10 pr-3">
                  <td className="col-span-2 w-full">
                    <ul className="">
                      {badgesData.map((assessment, index) => (
                        <li className="flex items-center justify-between p-1 max-sm:text-xs" key={index}>
                          <span className="truncate md:max-w-[500px] max-sm:max-w-[210px] lg:max-w-[600px]">
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

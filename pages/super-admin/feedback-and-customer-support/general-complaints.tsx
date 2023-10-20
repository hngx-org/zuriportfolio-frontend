import { Input } from '@ui/Input';
import React, { useEffect, useState } from 'react';
import Pagination from '../../view-components/super-admin/pagination';
import Nav from '../../view-components/super-admin/navbar';
import Image from 'next/image';
import Link from 'next/link';
import VendorComplaint from '../../../public/assets/images/vendorComplaint.png';
import { useRouter } from 'next/navigation';
import Button from '@ui/Button';
import SuperAdminPagination from '@modules/super-admin/components/pagination';
import ComplaintsDetails from './general-complaints/[complaintsId]';

interface ComplainType {
  total_complaints: number;
  percentage_increment: number;
  // Add other properties as needed
}

interface ResolvedType {
  total_Resolved: number;
  percentage_increment: number;
  // Add other properties as needed
}

interface PendingType {
  percentage_increment: number;
  total_Pending: number;
  // Add other properties as needed
}

interface InProgressType {
  total_In_Progress: number;
  percentage_increment: number;
  // Add other properties as needed
}

interface Complain {
  id: number; // ID of the complaint
  status: string; // Status of the complaint (e.g., "pending" or "resolved")
  message: string; // A message describing the complaint
  data: {
    user: string; // User information
    product: null; // Product information (can be null)
    complaint_text: string;
    status: string;
    next: string;
    prev: string;
    user_details: {
      id: string; // User details
      first_name: string;
      last_name: string;
      email: string;
      profile_pic: string;
    };
    createdAt: string;
    updatedAt: string;
  };
  // Add other properties based on your data structure
}
interface Complaint {
  id: number;
  // other properties...
}

function GeneralComplaints({ complain }: { complain: Complain }) {
  const initialStatus = complain ? complain.status : '';
  const [complainStatus, setComplainStatus] = useState('pending');
  const [fetchComplains, setfetchComplains] = useState([]);

  const [filteredComplaints, setFilteredComplaints] = useState<Complain[]>([]); // Initialize as an empty array

  // Function to filter complaints based on search input
  const filterComplaints = (searchQuery: string) => {
    if (fetchComplains && Array.isArray(fetchComplains)) {
      const filtered = fetchComplains.filter((item: Complain) => {
        const itemsName = item.data?.user_details.first_name || '';
        return searchQuery.toLowerCase() === '' || itemsName.toLowerCase().includes(searchQuery.toLowerCase());
      });
      setFilteredComplaints(filtered);
    }
  };

  // Use the filtered complaints for rendering
  const complaintsToRender = filteredComplaints.length > 0 ? filteredComplaints : fetchComplains;

  const newStatus = 'In Progress';

  async function updateComplaintStatus(complaintId: number, newStatus: string) {
    try {
      // Create the URL for the specific complaint using complaintId
      const apiUrl = `https://team-mirage-super-amind2.onrender.com/api/v1/super-admin/feedback/complaints/${complaintId}/`;

      const bearertoken = localStorage.getItem('zpt');
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${bearertoken}`,
      };

      // Fetch the complaint using the specific URL
      const response = await fetch(apiUrl, {
        method: 'GET', // Use GET to retrieve the complaint data
        headers,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const complaint = await response.json();

      // Update the status of the complaint
      if (complaint.status === 'Pending' || complaint.status === 'pending') {
        complaint.status = newStatus;
      } else {
        return;
      }

      // Send a PATCH request to update the complaint on the server
      const patchResponse = await fetch(apiUrl, {
        method: 'PATCH', // Use PATCH to update the complaint
        headers: headers,
        body: JSON.stringify(complaint),
      });

      if (!patchResponse.ok) {
        throw new Error('Network response for the PATCH request was not ok');
      }

      console.log(`Status of complaint ${complaintId} updated to ${newStatus}`);
    } catch (error) {
      console.error('Error updating complaint status:', error);
    }
  }

  const [search, setSearch] = React.useState<string>('');
  const [filter, setFilter] = React.useState<string>('');
  const [tag, setTag] = React.useState<string>('pending');

  const router = useRouter();

  function changeTag() {
    setTag('In Review');
  }

  const [pageCount, setpageCount] = useState(0);

  React.useEffect(() => {
    const bearertoken = localStorage.getItem('zpt');
    fetch('https://team-mirage-super-amind2.onrender.com/api/v1/super-admin/feedback/complaints', {
      headers: {
        Authorization: `Bearer ${bearertoken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const dataArray = data.results.data;
        const total = data.count;
        setpageCount(total / 10);
        console.log(total);

        setfetchComplains(dataArray);
        console.log(dataArray);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        // Handle the error or set an error state in your component
      });
  }, []);

  const pageComplain = async (currentPage: number) => {
    const bearertoken = localStorage.getItem('zpt');
    const res = await fetch(
      `https://team-mirage-super-amind2.onrender.com/api/v1/super-admin/feedback/complaints?page=${currentPage}`,
      {
        headers: {
          Authorization: `Bearer ${bearertoken}`,
        },
      },
    );
    const data = await res.json();
    if (data && data.results && data.results.data) {
      const result = data.results.data;
      return result;
      // Now you can safely work with 'result'
    } else {
      // Handle the case where 'data' or its properties are undefined
      console.log('error');
    }
  };

  // State to store the API data
  const [totalComplaint, settotalComplaint] = useState<ComplainType | null>(null);

  // Fetch data from the API
  useEffect(() => {
    const bearertoken = localStorage.getItem('zpt');
    async function fetchData() {
      try {
        const response = await fetch(
          'https://team-mirage-super-amind2.onrender.com/api/v1/super-admin/feedback/total-complaints/',
          {
            headers: {
              Authorization: `Bearer ${bearertoken}`,
            },
          },
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        settotalComplaint(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    filterComplaints(search);
  }, [search, fetchComplains]);
  // State to store the API data
  const [pending, setpending] = useState<PendingType | null>(null);

  // Fetch data from the API
  useEffect(() => {
    const bearertoken = localStorage.getItem('zpt');
    async function fetchData() {
      try {
        const response = await fetch(
          'https://team-mirage-super-amind2.onrender.com/api/v1/super-admin/feedback/complaints/pending/',
          {
            headers: {
              Authorization: `Bearer ${bearertoken}`,
            },
          },
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setpending(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  // State to store the API data
  const [inProgress, setinProgress] = useState<InProgressType | null>(null);

  // Fetch data from the API
  useEffect(() => {
    const bearertoken = localStorage.getItem('zpt');
    async function fetchData() {
      try {
        const response = await fetch(
          'https://team-mirage-super-amind2.onrender.com/api/v1/super-admin/feedback/complaints/in-progress/',
          {
            headers: {
              Authorization: `Bearer ${bearertoken}`,
            },
          },
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setinProgress(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  // State to store the API data
  const [resolved, setResolved] = useState<ResolvedType | null>(null);

  // Fetch data from the API
  useEffect(() => {
    const bearertoken = localStorage.getItem('zpt');
    async function fetchData() {
      try {
        const response = await fetch(
          'https://team-mirage-super-amind2.onrender.com/api/v1/super-admin/feedback/complaints/resolved/',
          {
            headers: {
              Authorization: `Bearer ${bearertoken}`,
            },
          },
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setResolved(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const [pageNum, setpageNum] = useState(1);

  const handlePageClick = async (action: any) => {
    let newPage = pageNum;

    if (action === 'next') {
      newPage++;
    } else if (action === 'prev') {
      newPage--;
    } else {
      // Handle the case when a specific page number is clicked
      newPage = action;
    }

    if (newPage > 0 && newPage <= pageCount) {
      const serverComplaint = await pageComplain(newPage);
      setfetchComplains(serverComplaint);
      setpageNum(newPage);
    }

    console.log(fetchComplains);
  };

  const createdDate = new Date(complain?.data.createdAt);
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  const formattedDate = createdDate.toLocaleDateString('en-US');

  return (
    <>
      <Nav />
      <div className="w-full flex flex-col items-center justify-center">
        <div className="w-4/5 flex justify-center pb-20 items-center flex-col">
          <div className="w-full flex flex-col items-start justify-between h-42 ">
            <h1 className="font-manropeL text-2xl mb-2.5 mt-2.5  font-semibold">Complaints Overview</h1>
            <div className="w-full flex flex-row justify-between gap-4 max-md:flex max-md:flex-col">
              <div className="w-96 flex flex-col justify-between p-6 items-start h-28 hover:shadow-md border border-white-115 rounded-lg max-lg:w-60 max-md:w-full">
                <div className="flex justify-between w-full ">
                  <h2 className="font-manropeL text-sm font-normal h-5 text-neutral-500">Total Complaints</h2>
                </div>
                <div className="flex justify-between items-center w-full mt-2">
                  {totalComplaint ? (
                    <h1 className="h-10 text-2xl font-manropeL font-bold ">{totalComplaint.total_complaints}</h1>
                  ) : (
                    <div className="bg-white-115 w-30 h-5 rounded-lg text-white-115 "> loading... </div>
                  )}
                  {/* <div className="flex flex-row items-center justify-center h-6 w-16 rounded-xl gap-1 bg-gray-50">
                    <Image src="/assets/complaintsassets/greenIcon-left.svg" alt="back" width={15} height={15} />
                    <p className="text-white-400">
                      {totalComplaint && totalComplaint.percentage_increment !== undefined
                        ? `${totalComplaint.percentage_increment}%`
                        : ''}
                    </p>
                  </div> */}
                </div>
              </div>
              <div className="w-96 flex flex-col justify-between p-6 items-start h-28 hover:shadow-md border border-white-115 rounded-lg max-lg:w-60 max-md:w-full">
                <div className="flex justify-between w-full ">
                  <h2 className="font-manropeL text-sm font-normal h-5 text-neutral-500">Resolved</h2>
                </div>
                <div className="flex justify-between items-center w-full mt-2">
                  {resolved ? (
                    <h1 className="h-10 text-2xl font-manropeL font-bold ">{resolved.total_Resolved}</h1>
                  ) : (
                    <div className="bg-white-115 w-30 h-5 rounded-lg text-white-115 "> loading... </div>
                  )}
                  {/* <div className="flex flex-row items-center justify-center h-6 w-16 rounded-xl gap-1 bg-green-50">
                    <Image src="/assets/complaintsassets/greenIcon-left.svg" alt="back" width={15} height={15} />
                    <p className="text-green-200">{resolved?.percentage_increment}%</p>
                  </div> */}
                </div>
              </div>
              <div className="w-96 flex flex-col justify-between p-6 items-start h-28 hover:shadow-md border border-white-115 rounded-lg max-lg:w-60 max-md:w-full">
                <div className="flex justify-between w-full ">
                  <h2 className="font-manropeL text-sm font-normal h-5 text-neutral-500">Pending</h2>
                </div>
                <div className="flex justify-between items-center w-full mt-2">
                  {pending ? (
                    <h1 className="h-10 text-2xl font-manropeL font-bold ">{pending.total_Pending}</h1>
                  ) : (
                    <div className="bg-white-115 w-30 h-5 rounded-lg text-white-115 "> loading... </div>
                  )}
                  {/* <div className="flex flex-row items-center justify-center gap-1 h-6 w-16 rounded-xl bg-yellow-50">
                    <Image src="/assets/complaintsassets/yellowIcon-left-1.svg" alt="back" width={15} height={15} />
                    <p className="text-yellow-200">
                      {pending && pending.percentage_increment !== undefined ? `${pending.percentage_increment}%` : ''}
                    </p>
                  </div> */}
                </div>
              </div>
              <div className="w-96 flex flex-col justify-between p-6 items-start h-28 hover:shadow-md border border-white-115 rounded-lg max-lg:w-60 max-md:w-full">
                <div className="flex justify-between w-full ">
                  <h2 className="font-manropeL text-sm font-normal h-5 text-neutral-500">In Progress</h2>
                  <div className="relative flex flex-row"></div>
                </div>
                <div className="flex justify-between items-center w-full mt-2">
                  {inProgress ? (
                    <h1 className="h-10 text-2xl font-manropeL font-bold ">{inProgress.total_In_Progress}</h1>
                  ) : (
                    <div className="bg-white-115 w-30 h-5 rounded-lg text-white-115 "> loading... </div>
                  )}
                  {/* <div className="flex flex-row items-center justify-center h-6 w-16 rounded-xl bg-blue-50 gap-1">
                    <Image src="/assets/complaintsassets/blueIcon-left-2.svg" alt="back" width={15} height={15} />
                    <p className="text-blue-105">{inProgress?.percentage_increment}%</p>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 w-full h-auto border border-zinc-200 max-md:overflow-x-scroll rounded-xl overflow-x-scroll">
            <div className="complaintHeading h-18 p-3 flex flex-row items-center max-md:flex-col max-md:items-start justify-between ">
              <div className="headerText min-w-[300px] mr-2">
                <h2 className="font-manropeL text-xl font-semibold">My Complaint</h2>
                <h3 className="font-manropeL text-base font-normal text-slate-600">
                  List of all complaint and their details
                </h3>
              </div>
              <div className="searchFunc flex flex-row max-md:mt-1.5 items-center ">
                <div className="search h-11 rounded-lg border-solid border border-zinc-200 px-2 w-auto flex flex-row justify-evenly items-center">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z"
                      stroke="#667085"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <Input
                    type="search"
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search"
                    className="  border-none focus:outline-none ml-1 h-6 w-96 max-md:w-56"
                  />
                </div>
                <div className="filter cursor-pointer rounded-lg ml-2 p-2.5 flex flex-row h-auto w-auto justify-center items-center border-solid border-zinc-200 border">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M5 10H15M2.5 5H17.5M7.5 15H12.5"
                      stroke="#344054"
                      strokeWidth="1.67"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <select
                    name=""
                    onChange={(e) => setFilter(e.target.value)}
                    id=""
                    className="border-none outline-none pl-2 text-slate-600 font-manropeL text-xs font-normal"
                  >
                    <option value="Filter">All</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Pending">Pending</option>
                    <option value="In-progress">In-progress</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="complaintList">
              <div className="tableHead border-solid border-b border-t max-md:w-max max-lg:w-max border-zinc-200">
                <div className="vendorComplaints py-3 px-10  flex flex-row items-center justify-between ">
                  <div className="w-80 name flex flex-row gap-3 items-center justify-start min-w-[250px]">
                    <p className=" pr-2 font-manropeL font-medium text-base text-slate-500">Name</p>
                    {/* <svg
                      className="cursor-pointer"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.00065 3.33398V12.6673M8.00065 12.6673L12.6673 8.00065M8.00065 12.6673L3.33398 8.00065"
                        stroke="#667085"
                        strokeWidth="1.33333"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg> */}
                  </div>
                  <p className="w-40 font-manropeL flex items-center justify-center font-medium text-base text-slate-500 max-lg:min-w-[160px] min-w-[120px]">
                    Description
                  </p>
                  <p className="w-40 font-manropeL flex items-center justify-center font-medium text-base text-slate-500  min-w-[120px]">
                    Date
                  </p>
                  <p className=" w-36 font-manropeL flex items-center justify-center font-medium text-base text-slate-500  min-w-[120px]">
                    Status
                  </p>
                </div>
              </div>
              {complaintsToRender
                .filter((item) => {
                  const firstName = item?.data?.user_details.first_name.toLowerCase();
                  return search.toLowerCase() === '' ? item : firstName?.includes(search);
                })
                .map((complain: any) => {
                  const handleClick = () => {
                    router.push(`/super-admin/feedback-and-customer-support/general-complaints/${complain.id}`);
                  };

                  function product() {
                    updateComplaintStatus(complain.id, newStatus);
                    handleClick();
                  }

                  return (
                    <>
                      <div
                        onClick={product}
                        key={complain.id}
                        className="vendorComplaints py-3 pr-16 pl-10 flex flex-row items-center justify-between border-solid border-b cursor-pointer border-zinc-200"
                      >
                        <div className="name w-80 flex flex-row gap-3 items-center min-w-[250px]" key={complain.id}>
                          {/* <input className="w-6 h-5 cursor-pointer min-w-[30px]" type="checkbox" name="" id="" /> */}
                          <div className="displayPicture">
                            <Image
                              alt=""
                              src={
                                complain?.data?.user_details?.profile_pic ||
                                'https://i.pinimg.com/736x/17/57/1c/17571cdf635b8156272109eaa9cb5900.jpg'
                              } // Provide a fallback image source
                              className="h-10 w-10 rounded-full object-contain"
                              width={40}
                              height={40}
                            />

                            {/* <img src="" className="h-10 w-10 rounded-full object-contain" alt="" /> */}
                          </div>
                          <div key={complain.id} id={complain.id} className="identity pl-2">
                            <div>
                              {complain.user_details ? (
                                <h2 className="font-manropeL font-semibold text-base">
                                  {complain.user_details.first_name} {complain.user_details.last_name}
                                </h2>
                              ) : (
                                <h2 className="font-manropeL font-semibold text-base">User Details Unavailable</h2>
                              )}
                              {complain.user_details ? (
                                <p className="font-manropeL text-xs font-normal text-slate-500">
                                  {complain.user_details.email}
                                </p>
                              ) : (
                                <p className="font-manropeL text-xs font-normal text-slate-500">Email Unavailable</p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="description w-40  min-w-[120px] max-lg:min-w-[160px] flex items-center justify-center">
                          {complain.user_details ? (
                            <p className="font-manropeL text-base truncate font-normal text-slate-500">
                              {complain.complaint_text}
                            </p>
                          ) : (
                            <p className="font-manropeL text-md truncate font-normal text-slate-500">
                              Description Unavailable
                            </p>
                          )}
                        </div>
                        <div className="date w-40 min-w-[120px] flex items-center justify-center">
                          {complain.user_details && complain.createdAt ? (
                            <p className="font-manropeL font-medium text-base truncate text-slate-500">
                              {new Date(complain.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                // hour: '2-digit',
                                // minute: '2-digit',
                              })}
                            </p>
                          ) : (
                            <p className="font-manropeL font-medium text-base text-slate-500">Date Unavailable</p>
                          )}
                        </div>
                        <div className="flex items-start">
                          {complain.status === 'Pending' ? (
                            <div className="bg-yellow-50 px-3 py-2 flex items-center gap-2 rounded-full">
                              <div className="w-2 h-2 bg-yellow-300 rounded-md"></div>
                              <p className="text-xs text-yellow-300">Pending</p>
                            </div>
                          ) : complain.status === 'In Progress' ||
                            complain.status === 'in Progress' ||
                            complain.status === 'in progress' ? (
                            <div className="bg-blue-50 px-3 py-2 flex items-center gap-2 rounded-full">
                              <div className="w-2 h-2 bg-blue-300 rounded-md"></div>
                              <p className="text-xs text-blue-300">In Progress</p>
                            </div>
                          ) : complain.status === 'Resolved' ? (
                            <div className="bg-green-50 px-3 py-2 flex items-center gap-2 rounded-full">
                              <div className="w-2 h-2 bg-green-300 rounded-md"></div>
                              <p className="text-xs text-green-300">Resolved</p>
                            </div>
                          ) : (
                            <div>No Status</div> // You can add a default case if none of the above conditions match
                          )}
                        </div>
                      </div>
                    </>
                  );
                })}
            </div>
          </div>

          <SuperAdminPagination currentPage={pageNum} totalPages={pageCount} setCurrentPage={handlePageClick} />
        </div>
      </div>
    </>
  );
}

export default GeneralComplaints;

import { Input } from '@ui/Input';
import React, { useEffect, useState } from 'react';
import Pagination from '../../view-components/super-admin/pagination';
import Nav from '../../view-components/super-admin/navbar';
import Image from 'next/image';
import Link from 'next/link';
import VendorComplaint from '../../../public/assets/images/vendorComplaint.png';
import { useRouter } from 'next/navigation';
import Button from '@ui/Button';

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
  total_In_progress: number;
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

  const newStatus = 'in Progress';

  const handleStatusUpdate = async (complaintId: any, newStatus: string) => {
    try {
      // Fetch the data from the API
      const response = await fetch('https://team-mirage-super-amind2.onrender.com/api/superadmin/feedback/complaint/');

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      // Find the complaint you want to update in the 'data' array
      const updatedData = data.results.data.map((complaint: any) => {
        if (complaint.id === complaintId) {
          // Update the 'status' property
          complaint.status = newStatus;
        }
        return complaint;
      });

      // Send a PUT request to update the complaint on the server
      const putResponse = await fetch(
        `https://team-mirage-super-amind2.onrender.com/api/superadmin/feedback/complaint/${complaintId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        },
      );

      if (!putResponse.ok) {
        throw new Error('Network response for the PUT request was not ok');
      }

      // Optionally, update your local state with the modified data
      setfetchComplains({ ...data.results, data: updatedData });

      console.log('Status updated successfully');
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 10;

  const [search, setSearch] = React.useState<string>('');
  const [filter, setFilter] = React.useState<string>('');
  const [tag, setTag] = React.useState<string>('pending');

  const router = useRouter();

  function changeTag() {
    setTag('In Review');
  }

  React.useEffect(() => {
    fetch('https://team-mirage-super-amind2.onrender.com/api/superadmin/feedback/complaint/')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const dataArray = data.results.data;
        setfetchComplains(dataArray);
        console.log(dataArray);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        // Handle the error or set an error state in your component
      });
  }, []);

  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const displayedData = fetchComplains && fetchComplains.length > 0 ? fetchComplains.slice(startIndex, endIndex) : [];

  // State to store the API data
  const [totalComplaint, settotalComplaint] = useState<ComplainType | null>(null);

  // Fetch data from the API
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          'https://team-mirage-super-amind2.onrender.com/api/superadmin/feedback/total_complaints/',
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

  // State to store the API data
  const [pending, setpending] = useState<PendingType | null>(null);

  // Fetch data from the API
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          'https://team-mirage-super-amind2.onrender.com/api/superadmin/feedback/complaints/pending/',
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
    async function fetchData() {
      try {
        const response = await fetch(
          'https://team-mirage-super-amind2.onrender.com/api/superadmin/feedback/complaints/in_progress/',
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
    async function fetchData() {
      try {
        const response = await fetch(
          'https://team-mirage-super-amind2.onrender.com/api/superadmin/feedback/complaints/resolved/',
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

  const [next, setNext] = useState('#');

  async function apiData() {
    try {
      const response = await fetch(
        'https://team-mirage-super-amind2.onrender.com/api/superadmin/feedback/complaints/resolved/',
      );
      if (!response.ok) {
        throw new Error('network issues');
      }
      const data = await response.json();
      setNext(data);
      const url = data.next;
      console.log(url, 'url');
    } catch (error) {
      console.log('unable to get link');
    }
  }

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
                  <svg
                    className="h-5 cursor-pointer"
                    width="21"
                    height="20"
                    viewBox="0 0 21 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.66797 15.8333C8.66797 16.75 9.41797 17.5 10.3346 17.5C11.2513 17.5 12.0013 16.75 12.0013 15.8333C12.0013 14.9167 11.2513 14.1667 10.3346 14.1667C9.41797 14.1667 8.66797 14.9167 8.66797 15.8333Z"
                      fill="#C4C7C6"
                      stroke="#C4C7C6"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M8.66797 4.16732C8.66797 5.08398 9.41797 5.83398 10.3346 5.83398C11.2513 5.83398 12.0013 5.08398 12.0013 4.16732C12.0013 3.25065 11.2513 2.50065 10.3346 2.50065C9.41797 2.50065 8.66797 3.25065 8.66797 4.16732Z"
                      fill="#C4C7C6"
                      stroke="#C4C7C6"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M8.66797 9.99935C8.66797 10.916 9.41797 11.666 10.3346 11.666C11.2513 11.666 12.0013 10.916 12.0013 9.99935C12.0013 9.08268 11.2513 8.33268 10.3346 8.33268C9.41797 8.33268 8.66797 9.08268 8.66797 9.99935Z"
                      fill="#C4C7C6"
                      stroke="#C4C7C6"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
                <div className="flex justify-between items-center w-full mt-2">
                  {totalComplaint ? (
                    <h1 className="h-10 text-2xl font-manropeL font-bold ">{totalComplaint.total_complaints}</h1>
                  ) : (
                    <p>Loading....</p>
                  )}
                  <div className="flex flex-row items-center justify-center h-6 w-16 rounded-xl gap-1 bg-gray-50">
                    <Image src="/assets/complaintsassets/greenIcon-left.svg" alt="back" width={15} height={15} />
                    <p className="text-white-400">
                      {totalComplaint && totalComplaint.percentage_increment !== undefined
                        ? `${totalComplaint.percentage_increment}%`
                        : ''}
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-96 flex flex-col justify-between p-6 items-start h-28 hover:shadow-md border border-white-115 rounded-lg max-lg:w-60 max-md:w-full">
                <div className="flex justify-between w-full ">
                  <h2 className="font-manropeL text-sm font-normal h-5 text-neutral-500">Resolved</h2>
                  <svg
                    className="h-5 cursor-pointer"
                    width="21"
                    height="20"
                    viewBox="0 0 21 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.66797 15.8333C8.66797 16.75 9.41797 17.5 10.3346 17.5C11.2513 17.5 12.0013 16.75 12.0013 15.8333C12.0013 14.9167 11.2513 14.1667 10.3346 14.1667C9.41797 14.1667 8.66797 14.9167 8.66797 15.8333Z"
                      fill="#C4C7C6"
                      stroke="#C4C7C6"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M8.66797 4.16732C8.66797 5.08398 9.41797 5.83398 10.3346 5.83398C11.2513 5.83398 12.0013 5.08398 12.0013 4.16732C12.0013 3.25065 11.2513 2.50065 10.3346 2.50065C9.41797 2.50065 8.66797 3.25065 8.66797 4.16732Z"
                      fill="#C4C7C6"
                      stroke="#C4C7C6"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M8.66797 9.99935C8.66797 10.916 9.41797 11.666 10.3346 11.666C11.2513 11.666 12.0013 10.916 12.0013 9.99935C12.0013 9.08268 11.2513 8.33268 10.3346 8.33268C9.41797 8.33268 8.66797 9.08268 8.66797 9.99935Z"
                      fill="#C4C7C6"
                      stroke="#C4C7C6"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
                <div className="flex justify-between items-center w-full mt-2">
                  {resolved ? (
                    <h1 className="h-10 text-2xl font-manropeL font-bold ">{resolved.total_Resolved}</h1>
                  ) : (
                    <p>Loading....</p>
                  )}
                  <div className="flex flex-row items-center justify-center h-6 w-16 rounded-xl gap-1 bg-green-50">
                    <Image src="/assets/complaintsassets/greenIcon-left.svg" alt="back" width={15} height={15} />
                    <p className="text-green-200">{resolved?.percentage_increment}%</p>
                  </div>
                </div>
              </div>
              <div className="w-96 flex flex-col justify-between p-6 items-start h-28 hover:shadow-md border border-white-115 rounded-lg max-lg:w-60 max-md:w-full">
                <div className="flex justify-between w-full ">
                  <h2 className="font-manropeL text-sm font-normal h-5 text-neutral-500">Pending</h2>
                  <svg
                    className="h-5 cursor-pointer"
                    width="21"
                    height="20"
                    viewBox="0 0 21 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.66797 15.8333C8.66797 16.75 9.41797 17.5 10.3346 17.5C11.2513 17.5 12.0013 16.75 12.0013 15.8333C12.0013 14.9167 11.2513 14.1667 10.3346 14.1667C9.41797 14.1667 8.66797 14.9167 8.66797 15.8333Z"
                      fill="#C4C7C6"
                      stroke="#C4C7C6"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M8.66797 4.16732C8.66797 5.08398 9.41797 5.83398 10.3346 5.83398C11.2513 5.83398 12.0013 5.08398 12.0013 4.16732C12.0013 3.25065 11.2513 2.50065 10.3346 2.50065C9.41797 2.50065 8.66797 3.25065 8.66797 4.16732Z"
                      fill="#C4C7C6"
                      stroke="#C4C7C6"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M8.66797 9.99935C8.66797 10.916 9.41797 11.666 10.3346 11.666C11.2513 11.666 12.0013 10.916 12.0013 9.99935C12.0013 9.08268 11.2513 8.33268 10.3346 8.33268C9.41797 8.33268 8.66797 9.08268 8.66797 9.99935Z"
                      fill="#C4C7C6"
                      stroke="#C4C7C6"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
                <div className="flex justify-between items-center w-full mt-2">
                  {pending ? (
                    <h1 className="h-10 text-2xl font-manropeL font-bold ">{pending.total_Pending}</h1>
                  ) : (
                    <p>Loading...</p>
                  )}
                  <div className="flex flex-row items-center justify-center gap-1 h-6 w-16 rounded-xl bg-yellow-50">
                    <Image src="/assets/complaintsassets/yellowIcon-left-1.svg" alt="back" width={15} height={15} />
                    <p className="text-yellow-200">
                      {pending && pending.percentage_increment !== undefined ? `${pending.percentage_increment}%` : ''}
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-96 flex flex-col justify-between p-6 items-start h-28 hover:shadow-md border border-white-115 rounded-lg max-lg:w-60 max-md:w-full">
                <div className="flex justify-between w-full ">
                  <h2 className="font-manropeL text-sm font-normal h-5 text-neutral-500">In Progress</h2>
                  <div className="relative flex flex-row">
                    <svg
                      className=" cursor-pointer h-5"
                      width="21"
                      height="20"
                      viewBox="0 0 21 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.66797 15.8333C8.66797 16.75 9.41797 17.5 10.3346 17.5C11.2513 17.5 12.0013 16.75 12.0013 15.8333C12.0013 14.9167 11.2513 14.1667 10.3346 14.1667C9.41797 14.1667 8.66797 14.9167 8.66797 15.8333Z"
                        fill="#C4C7C6"
                        stroke="#C4C7C6"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M8.66797 4.16732C8.66797 5.08398 9.41797 5.83398 10.3346 5.83398C11.2513 5.83398 12.0013 5.08398 12.0013 4.16732C12.0013 3.25065 11.2513 2.50065 10.3346 2.50065C9.41797 2.50065 8.66797 3.25065 8.66797 4.16732Z"
                        fill="#C4C7C6"
                        stroke="#C4C7C6"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M8.66797 9.99935C8.66797 10.916 9.41797 11.666 10.3346 11.666C11.2513 11.666 12.0013 10.916 12.0013 9.99935C12.0013 9.08268 11.2513 8.33268 10.3346 8.33268C9.41797 8.33268 8.66797 9.08268 8.66797 9.99935Z"
                        fill="#C4C7C6"
                        stroke="#C4C7C6"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex justify-between items-center w-full mt-2">
                  {inProgress ? (
                    <h1 className="h-10 text-2xl font-manropeL font-bold ">{inProgress.total_In_progress}</h1>
                  ) : (
                    <p>Loading...</p>
                  )}
                  <div className="flex flex-row items-center justify-center h-6 w-16 rounded-xl bg-blue-50 gap-1">
                    <Image src="/assets/complaintsassets/blueIcon-left-2.svg" alt="back" width={15} height={15} />
                    <p className="text-blue-105">{inProgress?.percentage_increment}%</p>
                  </div>
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
                    <option value="Filter">Filter</option>
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
                  <input className="w-6 min-w-[32px] h-5 cursor-pointer" type="checkbox" name="" id="" />
                  <div className="w-80 name flex flex-row items-center justify-start min-w-[250px]">
                    <p className=" pr-2 font-manropeL font-medium text-base text-slate-500">Name</p>
                    <svg
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
                    </svg>
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
              {fetchComplains && Array.isArray(fetchComplains) ? (
                fetchComplains
                  .filter((item: Complain) => {
                    return search.toLowerCase() === ''
                      ? item
                      : item.data.user_details.first_name.toLowerCase().includes(search);
                  })
                  .map((complain: any) => {
                    const handleClick = () => {
                      router.push(`/super-admin/feedback-and-customer-support/general-complaints/${complain.id}`);
                    };

                    function product() {
                      if (complain) {
                        handleStatusUpdate(complain.id, newStatus);
                        handleClick();
                      }
                    }

                    return (
                      <>
                        <div
                          onClick={product}
                          key={complain.id}
                          className="vendorComplaints py-3 px-10 flex flex-row items-center justify-between border-solid border-b cursor-pointer border-zinc-200"
                        >
                          <input className="w-6 h-5 cursor-pointer min-w-[32px]" type="checkbox" name="" id="" />
                          <div className="name w-80 flex flex-row items-center min-w-[250px]">
                            <div className="displayPicture">
                              <Image
                                alt=""
                                src="https://images.unsplash.com/photo-1595152452543-e5fc28ebc2b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVuJTIwcG9ydHJhaXR8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
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
                            <p className="font-manropeL font-medium text-base max-md:text-xs text-slate-500 truncate">
                              {complain.complaint_text}
                            </p>
                          </div>
                          <div className="date w-40 min-w-[120px] flex items-center justify-center">
                            {complain.user_details && complain.createdAt ? (
                              <p className="font-manropeL font-medium text-base truncate text-slate-500">
                                {complain.createdAt}
                              </p>
                            ) : (
                              <p className="font-manropeL font-medium text-base text-slate-500">Date Unavailable</p>
                            )}
                          </div>
                          <div>
                            <div className="bg-yellow-50 px-3 py-2 flex items-center gap-2 rounded-full">
                              <div className="w-2 h-2 bg-yellow-300 rounded-md "></div>
                              <p className="text-xs text-yellow-300">{complainStatus}</p>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })
              ) : (
                <p>Loading....</p>
              )}
            </div>
          </div>
          <div className="p-10  w-full rounded"></div>
        </div>
      </div>
    </>
  );
}

export default GeneralComplaints;

// import Input from "../../components/ui/Input"
import React from 'react';
// import { Complains } from '../../../@types';
import Nav from '../../view-components/super-admin/navbar';
type Complains = {
  id: number;
  name: string;
  email: string;
  image: string;
  complaintDescription: string;
  date: string;
  status: string;
};

export default function GeneralComplaints() {
  const complaintsArray = [
    {
      id: 1,
      name: 'Jeffery Dahmer',
      email: 'dahmerbones@gmail.com',
      complaintDescription: 'Order Eaten',
      image: '/../../images/vendorComplaint.png',
      date: '07-09-99',
      status: 'Pending',
    },
    {
      id: 2,
      name: 'Mark Essien',
      email: 'markessien@gmail.com',
      image: '/../../images/vendorComplaint.png',
      complaintDescription: 'Bad Product',
      date: '09-07-23',
      status: 'Resolved',
    },
    {
      id: 3,
      name: 'John Kennedy',
      email: 'ken006john@yahoo.com',
      image: '/../../images/vendorComplaint.png',
      complaintDescription: 'Order not recieved',
      date: '09-07-23',
      status: 'InProgress',
    },
  ];
  const [filteredComplaintsArray, setFilteredComplaintsArray] = React.useState<Complains[]>([]);
  const [filteredState, setFilteredState] = React.useState('Filter');
  React.useEffect(() => {
    if (filteredState === 'Filter') {
      let filterArray = complaintsArray.filter((complains) => complains.status);
      setFilteredComplaintsArray(filterArray);
    } else if (filteredState === 'Resolved') {
      let resolvedArray = complaintsArray.filter((complains) => complains.status === 'Resolved');
      setFilteredComplaintsArray(resolvedArray);
    } else if (filteredState === 'Pending') {
      let pendingArray = complaintsArray.filter((complains) => complains.status === 'Pending');
      setFilteredComplaintsArray(pendingArray);
    } else {
      let inProgressArray = complaintsArray.filter((complains) => complains.status === 'InProgress');
      setFilteredComplaintsArray(inProgressArray);
    }
  }, [filteredState]);
  const [searchedItem, setSearchedItem] = React.useState('');
  return (
    <>
      <Nav />
      <div className="w-full flex flex-col items-center justify-center">
        <div className="w-5/6 flex justify-center items-start flex-col">
          {/* complaints overview */}
          <div className="w-full flex flex-col items-start justify-between h-42 ">
            <h1 className="font-manropeL text-2xl mb-2.5 mt-2.5  font-semibold">Complaints Overview</h1>
            <div className="w-full flex flex-row justify-between max-md:flex max-md:flex-col">
              <div className="w-80 flex flex-col justify-between p-6 items-start h-28 shadow-md rounded-lg max-lg:w-60 max-md:w-full">
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
                  <h1 className="h-10 text-2xl font-manropeL font-bold ">94</h1>
                  <div className="flex flex-row items-center justify-center h-6 w-16 rounded-xl bg-green-100">
                    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12.3804 6.38065L8.33378 2.33398L4.28711 6.38065"
                        stroke="#009254"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8.33398 13.6673V2.44727"
                        stroke="#009254"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="text-green-700">10%</p>
                  </div>
                </div>
              </div>
              <div className="w-80 flex flex-col justify-between p-6 items-start h-28 shadow-md rounded-lg max-lg:w-60 max-md:w-full">
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
                  <h1 className="h-10 text-2xl font-manropeL font-bold ">66</h1>
                  <div className="flex flex-row items-center justify-center h-6 w-16 rounded-xl bg-yellow-50">
                    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12.7144 6.38065L8.66776 2.33398L4.62109 6.38065"
                        stroke="#E5B800"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8.66797 13.6673V2.44727"
                        stroke="#E5B800"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="text-yellow-500">10%</p>
                  </div>
                </div>
              </div>
              <div className="w-80 flex flex-col justify-between p-6 items-start h-28 shadow-md rounded-lg max-lg:w-60 max-md:w-full">
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
                    {/* <div className="h-10 w-24 flex items-center justify-center rounded-md border-2 border-slate-300 absolute bottom-6 text-slate-800">
                                    View
                                </div> */}
                  </div>
                </div>
                <div className="flex justify-between items-center w-full mt-2">
                  <h1 className="h-10 text-2xl font-manropeL font-bold ">51</h1>
                  <div className="flex flex-row items-center justify-center h-6 w-16 rounded-xl bg-blue-50">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12.0465 6.38065L7.99979 2.33398L3.95312 6.38065"
                        stroke="#004FC4"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8 13.6673V2.44727"
                        stroke="#004FC4"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="text-blue-700">10%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* general complaints */}
          <div className="mt-8 w-full h-auto border-2 border-slate-100 max-md:overflow-x-scroll overflow-x-scroll">
            <div className="complaintHeading h-18 p-3 flex flex-row items-center justify-between border-b-2 border-slate-100">
              <div className="headerText min-w-[190px] mr-2">
                <h2 className="font-manropeL text-xl font-semibold text-base">My Complaint</h2>
                <h3 className="font-manropeL text-base font-normal text-slate-600">
                  List of all complaint and their details
                </h3>
              </div>
              <div className="searchFunc flex flex-row items-center ">
                <div className="search h-11 rounded-lg border-solid border-2 border-slate-200 px-2 w-auto flex flex-row justify-evenly items-center">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z"
                      stroke="#667085"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <input
                    type="search"
                    onChange={(e) => setSearchedItem(e.target.value)}
                    placeholder="Search"
                    className="  border-none focus:outline-none ml-1.5 h-6 w-96"
                  />
                </div>
                <div className="filter cursor-pointer rounded-lg ml-2 w-28 p-2.5 flex flex-row h-auto w-auto justify-center items-center border-solid border-slate-200 border-2">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M5 10H15M2.5 5H17.5M7.5 15H12.5"
                      stroke="#344054"
                      strokeWidth="1.67"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {/* <p className="pl-2 text-slate-600 font-manropeL text-l font-normal ">Filters</p> */}
                  <select
                    name=""
                    onChange={(e) => setFilteredState(e.target.value)}
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
              <div className="tableHead">
                <div className="vendorComplaints p-3 flex flex-row items-center justify-between ">
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
                  <p className="w-40 font-manropeL font-medium text-base text-slate-500  min-w-[120px]">Description</p>
                  <p className="w-40 font-manropeL font-medium text-base text-slate-500  min-w-[120px]">Date</p>
                  <p className=" w-36 font-manropeL font-medium text-base text-slate-500  min-w-[120px]">Status</p>
                  <div className="action w-20 cursor-pointer min-w-max font-manropeL font-medium text-base text-slate-500 ">
                    Action
                  </div>
                </div>
              </div>
              {searchedItem
                ? filteredComplaintsArray
                    .filter((e) => e.name.toLowerCase().includes(searchedItem.toLowerCase()))
                    .map((complains) => {
                      return (
                        <div
                          key={complains.id}
                          className="vendorComplaints p-3 flex flex-row items-center justify-between "
                        >
                          <input
                            className="w-6 min-w-[32px] h-5 cursor-pointer min-w-[32px]"
                            type="checkbox"
                            name=""
                            id=""
                          />
                          <div className="name w-80 flex flex-row items-center min-w-[250px]">
                            <div className="displayPicture">
                              <image
                                alt=""
                                src="/../../assets/images/vendorComplaint.png"
                                className="h-10 w-10 rounded-full object-contain"
                                width={40}
                                height={40}
                              />
                              {/* <image src="" className="h-10 w-10 rounded-full object-contain" alt="" /> */}
                            </div>
                            <div className="identity pl-2">
                              <h2 className="font-manropeL text-l font-semibold text-base">{complains.name}</h2>
                              <p className="font-manropeL text-xs font-normal text-base text-slate-500">
                                {complains.email}
                              </p>
                            </div>
                          </div>
                          <div className="description w-40  min-w-[120px]">
                            <p className="font-manropeL font-medium text-base text-slate-500">
                              {complains.complaintDescription}
                            </p>
                          </div>
                          <div className="date w-40 min-w-[120px]">
                            <p className="font-manropeL font-medium text-base text-slate-500">{complains.date}</p>
                          </div>
                          {complains.status === 'Resolved' && (
                            <div className="status flex flex-row items-center w-36 min-w-[120px]">
                              <svg
                                width="9"
                                height="8"
                                viewBox="0 0 9 8"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <circle cx="4.5" cy="4" r="3" fill="#33A467" />
                              </svg>
                              <p className="text-green-400 text-xs font-medium pl-2">{complains.status}</p>
                            </div>
                          )}
                          {complains.status === 'Pending' && (
                            <div className="status flex flex-row items-center w-36 min-w-[120px]">
                              <svg
                                width="9"
                                height="8"
                                viewBox="0 0 9 8"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <circle cx="4.5" cy="4" r="3" fill="#E5B800" />
                              </svg>
                              <p className="text-yellow-300 text-xs font-medium pl-2">{complains.status}</p>
                            </div>
                          )}
                          {complains.status === 'InProgress' && (
                            <div className="status flex flex-row items-center w-36 min-w-[120px]">
                              <svg
                                width="9"
                                height="8"
                                viewBox="0 0 9 8"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <circle cx="4.5" cy="4" r="3" fill="#3F7EEE" />
                              </svg>
                              <p className="text-blue-300 text-xs font-medium pl-2">In-progress</p>
                            </div>
                          )}
                          <div className="action w-20 cursor-pointer min-w-[80px]">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M5 10C3.9 10 3 10.9 3 12C3 13.1 3.9 14 5 14C6.1 14 7 13.1 7 12C7 10.9 6.1 10 5 10Z"
                                stroke="#464646"
                                strokeWidth="1.5"
                              />
                              <path
                                d="M19 10C17.9 10 17 10.9 17 12C17 13.1 17.9 14 19 14C20.1 14 21 13.1 21 12C21 10.9 20.1 10 19 10Z"
                                stroke="#464646"
                                strokeWidth="1.5"
                              />
                              <path
                                d="M12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"
                                stroke="#464646"
                                strokeWidth="1.5"
                              />
                            </svg>
                          </div>
                        </div>
                      );
                    })
                : filteredComplaintsArray.map((complains) => {
                    return (
                      <div
                        key={complains.id}
                        className="vendorComplaints p-3 flex flex-row items-center justify-between "
                      >
                        <input className="w-6 min-w-[32px] h-5 cursor-pointer" type="checkbox" name="" id="" />
                        <div className="name w-80 flex flex-row items-center min-w-[250px]">
                          <div className="displayPicture">
                            <image
                              alt=""
                              src="/../../assets/images/vendorComplaint.png"
                              className="h-10 w-10 rounded-full object-contain"
                              width={40}
                              height={40}
                            />
                            {/* <image src="" className="h-10 w-10 rounded-full object-contain" alt="" /> */}
                          </div>
                          <div className="identity pl-2">
                            <h2 className="font-manropeL text-l font-semibold text-base">{complains.name}</h2>
                            <p className="font-manropeL text-xs font-normal text-base text-slate-500">
                              {complains.email}
                            </p>
                          </div>
                        </div>
                        <div className="description w-40 min-w-[120px]">
                          <p className="font-manropeL font-medium text-base text-slate-500">
                            {complains.complaintDescription}
                          </p>
                        </div>
                        <div className="date w-40 min-w-[120px]">
                          <p className="font-manropeL font-medium text-base text-slate-500">{complains.date}</p>
                        </div>
                        {complains.status === 'Resolved' && (
                          <div className="status flex flex-row items-center w-36 min-w-[120px]">
                            <svg width="9" height="8" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="4.5" cy="4" r="3" fill="#33A467" />
                            </svg>
                            <p className="text-green-400 text-xs font-medium pl-2">{complains.status}</p>
                          </div>
                        )}
                        {complains.status === 'Pending' && (
                          <div className="status flex flex-row items-center w-36 min-w-[120px]">
                            <svg width="9" height="8" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="4.5" cy="4" r="3" fill="#E5B800" />
                            </svg>
                            <p className="text-yellow-300 text-xs font-medium pl-2">{complains.status}</p>
                          </div>
                        )}
                        {complains.status === 'InProgress' && (
                          <div className="status flex flex-row items-center w-36 min-w-[120px]">
                            <svg width="9" height="8" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="4.5" cy="4" r="3" fill="#3F7EEE" />
                            </svg>
                            <p className="text-blue-300 text-xs font-medium pl-2">In-progress</p>
                          </div>
                        )}
                        <div className="action w-20 cursor-pointer min-w-[80px]">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5 10C3.9 10 3 10.9 3 12C3 13.1 3.9 14 5 14C6.1 14 7 13.1 7 12C7 10.9 6.1 10 5 10Z"
                              stroke="#464646"
                              strokeWidth="1.5"
                            />
                            <path
                              d="M19 10C17.9 10 17 10.9 17 12C17 13.1 17.9 14 19 14C20.1 14 21 13.1 21 12C21 10.9 20.1 10 19 10Z"
                              stroke="#464646"
                              strokeWidth="1.5"
                            />
                            <path
                              d="M12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"
                              stroke="#464646"
                              strokeWidth="1.5"
                            />
                          </svg>
                        </div>
                      </div>
                    );
                  })}
              <div className="pages w-auto items-center justify-center flex my-5">
                <p className="cursor-pointer font-manropeL font-medium text-base text-slate-500">Previous</p>
                <p className="cursor-pointer page1 flex items-center justify-center bg-green-600 h-8 w-8 rounded-lg ont-manropeL font-medium text-base text-slate-50 ml-1.5">
                  1
                </p>
                <p className="cursor-pointer page2 flex items-center justify-center h-8 w-8 rounded-lg ont-manropeL font-medium text-base text-slate-500 ml-1.5">
                  2
                </p>
                <p className="cursor-pointer page3 flex items-center justify-center h-8 w-8 rounded-lg ont-manropeL font-medium text-base text-slate-500 ml-1.5">
                  3
                </p>
                <p className="cursor-pointer page4 flex items-center justify-center h-8 w-8 rounded-lg ont-manropeL font-medium text-base text-slate-500 ml-1.5">
                  4
                </p>
                <p className="cursor-pointer font-manropeL font-medium text-base text-slate-500 ml-1.5">Next</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
